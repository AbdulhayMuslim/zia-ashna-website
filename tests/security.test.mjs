import assert from 'node:assert/strict';
import test from 'node:test';
import sharp from 'sharp';
import { isSameOriginRequest, readBoundedBody, readJsonBody, RequestBodyTooLargeError } from '../src/lib/request-security.js';
import { validatePostImage } from '../src/lib/image-processing.js';
import { referencesAsset } from '../src/lib/media-references.js';
import { settingsSchema } from '../src/validations/cms.js';
import { nullableAssetUrl } from '../src/validations/urls.js';
import { createSessionToken, verifySessionToken } from '../src/lib/session.js';
test('same-origin writes tolerate normalized hosts and reject cross-site requests',()=>{
 const req=h=>new Request('http://localhost:3081',{method:'POST',headers:h});
 assert.equal(isSameOriginRequest(req({host:'127.0.0.1:3081',origin:'http://127.0.0.1:3081'})),true);
 assert.equal(isSameOriginRequest(req({origin:'https://evil.test'})),false);
 assert.equal(isSameOriginRequest(req({'sec-fetch-site':'cross-site'})),false);
});
test('JSON parsing checks MIME types, invalid JSON, declared and actual size limits',async()=>{
 const req=(body,headers={'content-type':'application/json'})=>new Request('https://example.test',{method:'POST',body,headers});
 assert.deepEqual(await readJsonBody(req('{"ok":true}')),{ok:true});
 assert.equal(await readJsonBody(req('invalid')),null);
 assert.equal(await readJsonBody(req('{}',{'content-type':'text/plain'})),null);
 await assert.rejects(readBoundedBody(req('12345'),4),RequestBodyTooLargeError);
 await assert.rejects(readBoundedBody(req('1',{'content-length':'100'}),4),RequestBodyTooLargeError);
 const stream=new ReadableStream({start(c){c.enqueue(new Uint8Array(3));c.enqueue(new Uint8Array(3));c.close();}});
 await assert.rejects(readBoundedBody(new Request('https://example.test',{method:'POST',body:stream,duplex:'half'}),4),RequestBodyTooLargeError);
});
test('uploads decode real images, reject MIME spoofing, damaged files and excessive pixels',async()=>{
 for(const [format,mime]of[['png','image/png'],['jpeg','image/jpeg'],['webp','image/webp']]){
 const img=await sharp({create:{width:20,height:20,channels:3,background:'red'}})[format]().toBuffer();
 await validatePostImage(img,mime);await assert.rejects(validatePostImage(img,mime==='image/png'?'image/jpeg':'image/png'));await assert.rejects(validatePostImage(img.subarray(0,20),mime));
 }
 await assert.rejects(validatePostImage(Buffer.from('<script>alert(1)</script>'),'image/png'));
 const huge=await sharp({create:{width:5001,height:5000,channels:3,background:'white'}}).png().toBuffer();await assert.rejects(validatePostImage(huge,'image/png'));
});
test('uploaded branding and nullable database settings can be saved',()=>{
 assert.equal(settingsSchema.safeParse({siteName:'Site',siteDescription:'Description',logoUrl:'/uploads/logo.png',faviconUrl:'/uploads/icon.png',phone:null,address:null,seoTitle:null,seoDescription:null,copyright:null}).success,true);
});
test('asset URLs reject executable URLs, backslashes, control characters and protocol-relative paths',()=>{
 for(const url of ['javascript:alert(1)','//evil.test/a','/\\evil.test/a','/uploads/\nimage.png'])assert.equal(nullableAssetUrl.safeParse(url).success,false);
});
test('media references include nested CMS images and rich text without matching other filenames',()=>{
 assert.equal(referencesAsset({logos:[{imageUrl:'/uploads/a.webp?v=1'}]},'/uploads/a.webp'),true);
 assert.equal(referencesAsset('<img src="/uploads/a.webp?x=1&amp;y=2">','/uploads/a.webp'),true);
 assert.equal(referencesAsset('<img src="/uploads/a.webp-other">','/uploads/a.webp'),false);
});
test('sessions reject stale versions, appended segments and different signing keys',async()=>{
 const token=await createSessionToken('admin','secret',1);assert.equal(await verifySessionToken(token,'secret',1),true);assert.equal(await verifySessionToken(token,'secret',2),false);assert.equal(await verifySessionToken(token+'.extra','secret',1),false);assert.equal(await verifySessionToken(token,'other',1),false);
});

test('authenticated API responses are explicitly private and cannot be cached', async () => {
  const { default: config } = await import('../next.config.mjs');
  const rules = await config.headers();
  for (const source of ['/api/admin/:path*', '/api/auth/:path*']) {
    const rule = rules.find((item) => item.source === source);
    assert.match(rule.headers.find((header) => header.key === 'Cache-Control').value, /private, no-store/);
  }
});

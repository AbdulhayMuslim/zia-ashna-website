# Security and functionality review

Completed on 17 September 2026. Fixes were tested against a disposable PostgreSQL copy before being applied. Existing environment files, uploaded media, content, and account credentials were preserved.

## Changes

- Updated vulnerable dependencies within their existing major versions. The final dependency audit reports zero vulnerabilities.
- Added authentication to the server-side CMS layout. Proxy provides an optimistic check; server pages and API routes validate the database session version. Revoked sessions return to login without a redirect loop. Password changes renew the current session while revoking previous tokens.
- Added native HMAC verification, strict token structure checks, same-origin checks for authentication writes, and a shared bounded JSON reader. JSON bodies are limited to 1 MB; multipart uploads are bounded before parsing.
- Verified image contents and MIME types for every upload, including small files. JPEG, PNG, and WebP uploads remain limited to 2 MB. Decoding is limited to 25 million pixels; compression runs sequentially to reduce peak memory. Internal storage errors are no longer returned to clients.
- Prevented deletion of media referenced by CMS images, branding, profile images, post featured images, or rich text. Local deletion paths are restricted to filenames directly inside the uploads directory.
- Fixed saving nullable CMS fields and locally uploaded logos/favicons. Shared URL validation rejects executable schemes, backslashes, control characters, and protocol-relative local paths. Post content size and duplicate tag assignments are bounded.
- Fixed stale CMS saves and duplicate collection edits to return conflict responses. Category deletion correctly reports when posts still reference it.
- Added explicit private, non-cacheable headers for authenticated APIs, a restrictive framing/base/object/form policy, and disabled the framework identification header. Public API caching remains enabled.
- Updated the rich text editor to use the current content-update options and avoid duplicate extensions. PostgreSQL runtime connections now honor the configured schema.
- Updated setup and persistence documentation. Database tables, migrations, frontend CSS, and component layout classes were unchanged.

## Verification

| Check | Result |
| --- | --- |
| Actual project ESLint | Passed |
| Actual project regression tests | 23 passed |
| Actual normal production build (Turbopack) | Passed |
| Isolated production build (webpack) | Passed |
| API workflows on disposable PostgreSQL | 94 passed |
| Duplicate post/category/tag update checks | 3 passed |
| Browser page checks | 138 passed |
| Baseline visual comparisons | 54 passed; flagged cases rechecked with stable theme and hover state |
| Actual production read-only smoke checks | 15 passed |
| Dependency audit | Zero reported vulnerabilities |
| Migration status | All 10 migrations applied |
| Original database preservation | All 27 tables matched their pre-review record counts and hashes |

Browser checks covered public pages, published posts, password reset, and CMS dashboard, section editors, settings, profile, media, messages, and post/category/tag list/create/edit pages. Mobile (390 px), tablet (820 px), and desktop (1440 px) layouts were checked in light and dark modes. No browser exceptions, horizontal overflow, or broken visible images were found. CMS editing/saving/restoration and the theme toggle were exercised through the browser.

Workflow checks covered access control, cross-origin rejection, payload limits, content updates, stale-save conflicts, taxonomy operations, uploads, media references, draft/published visibility, contact messages, login rate limiting, password changes, session revocation, local SMTP password-reset delivery, one-time reset tokens, and logout. Mutating tests used only the disposable database and local upload directory. Actual-project smoke checks were read-only and confirmed security headers and private API caching.

Local response medians ranged from 10 to 94 ms on four sampled routes during browser testing. This was not a production hosting load test.

## Hosting requirements

Production S3-compatible media storage is currently unconfigured. Configure the storage variables documented in `.env.example` before deployment; production uploads intentionally reject requests when storage is unavailable. Actual hosting, external SMTP delivery, HTTPS, trusted proxy configuration, and the object-storage service were not tested remotely. Password-reset delivery was verified using a local SMTP test server, without sending external messages.

Use `prisma migrate deploy` for deployment migrations and preserve the existing PostgreSQL database and object storage. Back up data before applying destructive migrations. Do not reset or seed production data during code updates.

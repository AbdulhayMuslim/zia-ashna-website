import assert from "node:assert/strict";
import test from "node:test";
import { createBlogSchema } from "../src/validations/blog.js";

const validPost = {
  title: "A useful article",
  slug: "a-useful-article",
  category: "Technology",
  excerpt: "A sufficiently detailed summary for this useful article.",
  content:
    "This is sufficiently detailed article content for the validation schema test.",
  status: "published",
  featured: false,
};

test("accepts a complete blog post", () => {
  assert.equal(createBlogSchema.safeParse(validPost).success, true);
});

test("rejects unsafe or malformed slugs", () => {
  for (const slug of ["Uppercase", "two--hyphens", "../article", "space here"]) {
    assert.equal(createBlogSchema.safeParse({ ...validPost, slug }).success, false);
  }
});

test("rejects short article content", () => {
  const result = createBlogSchema.safeParse({ ...validPost, content: "Too short" });
  assert.equal(result.success, false);
});

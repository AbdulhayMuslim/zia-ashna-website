# Zia Ashna

Portfolio, blog, and administration interface for Sayed Zia Ashna, built with Next.js 16, React 19, and Tailwind CSS 4.

## Local setup

Requirements: a current Node.js LTS release, npm, and PostgreSQL. Configure the environment before starting.

```bash
npm install
cp .env.example .env.local
# Configure DATABASE_URL and authentication in .env.local, then:
npx prisma migrate deploy
npm run dev
```

Open `http://localhost:3000`. The administration login is at `/admin/login`.

## Environment variables

Copy `.env.example` to `.env.local` and configure:

- `DATABASE_URL`: PostgreSQL connection string. The optional `schema` parameter is honored by the runtime adapter.
- `NEXT_PUBLIC_SITE_URL`: canonical production URL used by metadata and the sitemap.
- `ADMIN_USERNAME`: administrator login name.
- `ADMIN_PASSWORD_SALT` and `ADMIN_PASSWORD_SCRYPT`: unique salt and scrypt password hash. The example file contains a generation command.
- `AUTH_SECRET`: long random key used to sign the HTTP-only admin session.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM`: SMTP delivery settings for password-reset emails.
- `CONTACT_FORM_ENDPOINT`: optional Formspree-compatible forwarding endpoint. Leave it empty to save contact messages only in PostgreSQL.

Never commit `.env.local` or real credentials.

## Commands

```bash
npm run dev     # development server
npm run lint    # ESLint and React checks
npm test        # validation tests
npm run build   # production build
npm run check   # lint, tests, and webpack production build
npm start       # serve a completed production build
```

`npm run check` uses webpack because restricted/container environments can prevent Turbopack from opening the internal port used by its CSS worker.

## Architecture

- Public pages are server-rendered or statically generated through the App Router.
- Public pages, blog posts, metadata, settings, and sitemap entries read from PostgreSQL through Prisma.
- Admin routes use a signed, HTTP-only, eight-hour session and are guarded by `src/proxy.js`, the server-side admin layout, and API authentication checks. Password changes revoke old sessions and renew the current session. Writes enforce same-origin requests and bounded bodies.
- Contact messages are validated, saved, and database-rate-limited by `src/app/api/contact/route.js`; the third-party endpoint is never exposed to the browser.
- CMS uploads are compressed and stored in S3-compatible object storage in production. JPEG, PNG, and WebP uploads are capped at 2 MB and 25 million pixels and decoded to verify their contents. Images above 200 KB are compressed when this reduces their size. Referenced media cannot be deleted.
- Metadata, Open Graph values, sitemap, robots rules, manifest, loading, error, and not-found states are implemented under `src/app`.

## Content persistence

All public content and admin collections use PostgreSQL. Run `npx prisma migrate deploy` during deployment. Code updates do not replace stored content. Back up PostgreSQL and object storage before deployment; review destructive migrations separately. Never reset or seed a production database. Configure the S3 variables from `.env.example`; production intentionally rejects uploads when object storage is missing.

## Deployment checklist

1. Provision PostgreSQL and S3-compatible object storage, then run `npx prisma migrate deploy`.
2. Set the required database, authentication, SMTP, site URL, and S3 environment variables in the deployment platform. `CONTACT_FORM_ENDPOINT` may remain empty.
3. Replace or remove social links until verified profile URLs are available.
4. Run `npm run check`.
5. Test login, logout, contact delivery, post rendering, mobile navigation, keyboard navigation, and error states.
6. Confirm `/robots.txt`, `/sitemap.xml`, and social preview metadata on the production domain.

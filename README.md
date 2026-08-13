# Zia Ashna

Portfolio, blog, and administration interface for Sayed Zia Ashna, built with Next.js 16, React 19, and Tailwind CSS 4.

## Local setup

Requirements: a current Node.js LTS release and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The administration login is at `/admin/login`.

## Environment variables

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL`: canonical production URL used by metadata and the sitemap.
- `ADMIN_USERNAME`: administrator login name.
- `ADMIN_PASSWORD_SALT` and `ADMIN_PASSWORD_SCRYPT`: unique salt and scrypt password hash. The example file contains a generation command.
- `AUTH_SECRET`: long random key used to sign the HTTP-only admin session.
- `CONTACT_FORM_ENDPOINT`: Formspree or another server-side JSON form endpoint.

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

## Current architecture

- Public pages are server-rendered or statically generated through the App Router.
- Blog detail routes are statically generated from `src/data/posts.js`.
- Admin routes use a signed, HTTP-only, eight-hour session and are guarded by `src/proxy.js`.
- Contact messages are validated and rate-limited by `src/app/api/contact/route.js`; the third-party endpoint is never exposed to the browser.
- Metadata, Open Graph values, sitemap, robots rules, manifest, loading, error, and not-found states are implemented under `src/app`.

## Content persistence

The public content and most admin tables currently use files in `src/data`. Admin editor screens are UI-ready, but their content mutations must be connected to a persistent database before the CMS is considered complete. Use a transactional database such as PostgreSQL and object storage for uploaded media. Every server mutation must verify the admin session, validate its input, and revalidate the affected public route.

Suggested models are `User`, `Post`, `Category`, `Tag`, `Media`, `SiteSettings`, and `SectionContent`. Do not use in-memory state or repository JSON files as production persistence.

## Deployment checklist

1. Provision the database and object storage, then connect all admin CRUD actions.
2. Set every environment variable in the deployment platform.
3. Replace or remove social links until verified profile URLs are available.
4. Run `npm run check`.
5. Test login, logout, contact delivery, post rendering, mobile navigation, keyboard navigation, and error states.
6. Confirm `/robots.txt`, `/sitemap.xml`, and social preview metadata on the production domain.

# Zia Ashna

Portfolio, blog, and administration interface for Sayed Zia Ashna, built with Next.js 16, React 19, and Tailwind CSS 4.

## Local setup

Requirements: Node.js 24 and npm 11. MariaDB is installed on this development machine; the project runs its own persistent MySQL-compatible instance under the ignored `.local/mysql` directory.

```bash
npm install
# Configure authentication variables in .env.local, then:
npm run dev
```

Open `http://localhost:3000`. The administration login is at `/admin/login`.
`npm run dev` starts the project-local MySQL server, applies pending migrations, generates Prisma Client, and launches both the public website and CMS. Use `npm run db:local:status` to check MySQL and `npm run db:local:stop` when you want to stop it. Starting it again preserves all local content.

## Environment variables

Copy `.env.example` to `.env.local` and configure:

- `DATABASE_URL`: MySQL connection string. Use `connection_limit=5` for shared hosting.
- `NEXT_PUBLIC_SITE_URL`: canonical production URL used by metadata and the sitemap.
- `ADMIN_USERNAME`: administrator login name.
- `ADMIN_PASSWORD_SALT` and `ADMIN_PASSWORD_SCRYPT`: unique salt and scrypt password hash. The example file contains a generation command.
- `AUTH_SECRET`: long random key used to sign the HTTP-only admin session.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM`: SMTP delivery settings for password-reset emails.
- `CONTACT_FORM_ENDPOINT`: optional Formspree-compatible forwarding endpoint. Leave it empty to save contact messages only in MySQL.

Never commit `.env.local` or real credentials.

## Commands

```bash
npm run dev     # start local MySQL, apply migrations, and launch website + CMS
npm run lint    # ESLint and React checks
npm test        # validation tests
npm run build   # production build
npm run env:check # validate production variables without printing secrets
npm run db:deploy # apply committed migrations to the configured database
npm run db:local:start # start and configure the project-local MySQL server
npm run db:local:stop # stop the project-local MySQL server
npm run db:local:status # show whether local MySQL is running
npm run hostinger:build # validate env, deploy migrations, and build for Hostinger
npm run check   # lint, tests, and webpack production build
npm start       # serve a completed production build
```

`npm run check` uses webpack because restricted/container environments can prevent Turbopack from opening the internal port used by its CSS worker.

## Architecture

- Public pages are server-rendered or statically generated through the App Router.
- Public pages, blog posts, metadata, settings, and sitemap entries read from MySQL through Prisma.
- Admin routes use a signed, HTTP-only, eight-hour session and are guarded by `src/proxy.js`, the server-side admin layout, and API authentication checks. Password changes revoke old sessions and renew the current session. Writes enforce same-origin requests and bounded bodies.
- Contact messages are validated, saved, and database-rate-limited by `src/app/api/contact/route.js`; the third-party endpoint is never exposed to the browser.
- CMS uploads are compressed and stored in S3-compatible object storage in production. JPEG, PNG, and WebP uploads are capped at 2 MB and 25 million pixels and decoded to verify their contents. Images above 200 KB are compressed when this reduces their size. Referenced media cannot be deleted.
- Metadata, Open Graph values, sitemap, robots rules, manifest, loading, error, and not-found states are implemented under `src/app`.

## Content persistence

All public content and admin collections use MySQL. Run `npx prisma migrate deploy` during deployment. Code updates do not replace stored content. Back up MySQL and object storage before deployment; review destructive migrations separately. Never reset or seed a production database. Configure the S3 variables from `.env.example`; production intentionally rejects uploads when object storage is missing.

## Deployment checklist

The project-specific Hostinger procedure is in [`docs/HOSTINGER_DEPLOYMENT.md`](docs/HOSTINGER_DEPLOYMENT.md).

1. Provision MySQL and S3-compatible object storage, then run `npx prisma migrate deploy`.
2. Set the required database, authentication, SMTP, site URL, and S3 environment variables in the deployment platform. `CONTACT_FORM_ENDPOINT` may remain empty.
3. Replace or remove social links until verified profile URLs are available.
4. Run `npm run check`.
5. Test login, logout, contact delivery, post rendering, mobile navigation, keyboard navigation, and error states.
6. Confirm `/robots.txt`, `/sitemap.xml`, and social preview metadata on the production domain.

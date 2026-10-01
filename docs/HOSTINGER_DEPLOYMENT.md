# Hostinger Business deployment

This application must be deployed as a server-side **Node.js / Next.js** web app. It cannot be deployed as a static export because it uses API routes, authentication, MySQL, dynamic rendering, and image processing.

## Deployment settings

- Runtime: Node.js 24.x
- Package manager: npm
- Install: `npm ci`
- Build: `npm run hostinger:build`
- Start: `npm start`

`hostinger:build` validates the production environment, applies committed Prisma migrations with `prisma migrate deploy`, generates Prisma Client, and builds Next.js. A failed validation or migration stops the deployment before the new application build starts.

## Required external services

Create a MySQL database in Hostinger and S3-compatible object storage before deploying. AWS S3 or Cloudflare R2 are suitable for media.

Add every production variable documented in `.env.example` through Hostinger's environment-variable screen. Do not upload `.env` or `.env.local`. `CONTACT_FORM_ENDPOINT` is optional. Set `TRUST_PROXY_HEADERS=true` only after Hostinger confirms that its proxy overwrites forwarded client-IP headers.

### MySQL connection and pool

Set `DATABASE_URL` in Hostinger's environment-variable screen; do not put it in Git. Copy the database host, user, password, and database name from Hostinger. The host is normally `localhost` and the port is normally `3306` for a Hostinger-managed MySQL database. Encode any special characters in the password, then use this shape:

```env
DATABASE_URL="mysql://DATABASE_USER:URL_ENCODED_PASSWORD@localhost:3306/DATABASE_NAME?connection_limit=5"
```

The application creates one shared Prisma/MariaDB pool per Node.js process and caps it at five connections. The production build rejects a missing, malformed, or larger pool limit before deployment. Keep the combined connection limits of all app processes using this database user within the limit shown in your Hostinger plan; do not add replicas or background workers with the same credentials without reducing their individual limits.

After changing environment variables, restart the Node.js app from Hostinger. The build command runs the environment check and `prisma migrate deploy`, so a wrong database URL or an unreachable database stops the release instead of deploying a broken application.

If existing content must be copied from the former PostgreSQL database, follow `POSTGRES_TO_MYSQL.md` before switching the live domain.

`S3_PUBLIC_URL` is used while Next.js builds its image allowlist. Adding or changing it requires a full redeployment, not only an application restart.

## Existing local media

Files under `public/uploads` are intentionally not committed and will not appear in a Git deployment. From the local project directory, after backing up the destination database and bucket, preview the migration:

```bash
npm run media:migrate:s3
```

The preview does not change anything. With production `DATABASE_URL` and S3 variables loaded, apply it once:

```bash
npm run media:migrate:s3 -- --apply
```

The command uploads the local images, then transactionally replaces matching `/uploads/...` references in MySQL. If database updating fails, it rolls back database changes; already uploaded objects remain safe and the command can be rerun.

## Release verification

After Hostinger reports a successful deployment:

1. Open the public home page, a blog post, `/robots.txt`, and `/sitemap.xml`.
2. Sign in to `/admin/login`, then sign out and back in.
3. Upload, display, and delete a temporary image through the media library.
4. Submit the contact form and confirm the message appears in the admin area.
5. Request a password-reset email and confirm its link uses the HTTPS production domain.
6. Review Hostinger build/runtime logs and resource graphs for database, Sharp, or image-optimization errors.

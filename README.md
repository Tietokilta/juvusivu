# juvusivu

## Getting Started

Setup env variables:

```bash
cp .env.example .env
```

Install dependencies:

```bash
pnpm install
```

(Optional) Seed the database to get example content:

```bash
pnpm db:seed
```

Run the application:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result (admin panel is [http://localhost:3000/admin](http://localhost:3000/admin))

## Content

Most of the content (e.g. Main page, events, links and sponsors) can be edited using the Payload CMS.

### Events

General idea: Events can be added to Payload as "placeholders", with close to no information. When event is getting closer, it is created to Ilmomasiina and linked to this site for more detailed information.

- Events can be added to Payload
  - Title: Shown on the front page
  - Slug: Event slug in the Tietokilta ilmomasiina, to show more information about the event
  - Date: Shown in the card title (if event is released)
  - Image: If image is defined, it is shown in the card instead of description

### Muistinnollaus

General Muistinnollaus page is `/m0`. It contains signup button, list of signups, text that can be customized in Payload and fancy DVD animation for logo.

From Payload you can toggle if the actual M0 page is shown, or only countdown to date set in Payload.

To handle different slots of signups (e.g. invite-only and general), you can assign one ilmomasiina event to default m0, and additional events to custom pages `/m0/<label>` (`/<label>` also redirects there is there is no other page with that url).

## Database migrations

When running the dev version, database schema updates automatically. However, when you update something that affects the schema, you have to create database migrations for production.

```sh
pnpm migrate:create
```

Migrations are then automatically applied on production database when deploying.

## Production configuration

If you want to redirect muistinnollaus.fi to juhlavuosi.fi (or some other domain) during anniversary year, you can add `PRIMARY_DOMAIN=juhlavuosi.fi` environment variable (and point both domains to this app).

## Idea of this repository

This project was created for Tietokilta 40 anniversary year, to promote different kinds of events during the year. It can be adapted to normal years as well (by e.g. highlighting events of the annual ball week).

The styling is created using Tailwind, and changing color palette should be easy using the variables in `globals.css`. Other style changes may require more work, depending on what is needed.

# juvusivu

## Getting Started

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

## Database migrations

When running the dev version, database schema updates automatically. However, when you update something that affects the schema, you have to create database migrations for production.

```sh
pnpm migrate:create
```

Migrations are then automatically applied on production database when deploying.

# MicroXof (Online)

MicroXof is the official membership registration microsite for the **BulSU Microsoft Student Community (BulSU MSC)**. This is the **online version**, hosted on Vercel and served at [bulsumsc.org/microxof](https://bulsumsc.org/microxof).

It replaces the org's previous paper-based and Excel-based membership registration process, which led to lost files, illegibility issues, and data management problems for the finance committee.

## Features

- Digital membership registration form for BulSU MSC applicants
- Structured, centralized data collection (no more lost papers or scattered spreadsheets)
- Deployed on Vercel with a custom domain
- Built with SvelteKit

## Tech Stack

- **Framework:** SvelteKit
- **Hosting:** Vercel
- **Domain:** bulsumsc.org/microxof

## Getting Started

### Prerequisites

- Bun

### Installation

```bash
git clone https://github.com/shnflrsc/microxof-online.git
cd microxof-online
bun install
```

### Environment Variables

Create a `.env` file in the project root. Fill in the values like database and upstash credentials:

```env
DATABASE_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### Running Locally

```bash
bun dev
```

The app will be available at `http://localhost:5173` by default.

### Building for Production

```bash
bun run build
bun run preview
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). Pushes to the main branch trigger an automatic deployment. The custom domain is configured as `bulsumsc.org/microxof`.

## Related Project

This is the online counterpart to the **offline, Dockerized version** of MicroXof, built to keep registration functional during campus connectivity issues.

## Maintainer

Built for BulSU MSC by Shane.

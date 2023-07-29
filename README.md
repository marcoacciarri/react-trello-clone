This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Appwrite as db
This project uses the [Appwrite platform](https://appwrite.io/) to manage the db.

1. Create a project in appwrite and save the project id in NEXT_PUBLIC_APPWRITE_PROJECT_ID
2. Create a database inside the project and save the database id in NEXT_PUBLIC_DATABASE_ID
3. Create a 'todos' collection insde the database and save the collection id in NEXT_PUBLIC_TODOS_COLLECTION

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Steps to Deploy

1. Use vercel cli to deploy or import your project (from github, gitlab etc) and add environment variabiles.

2. Once deployed to vercel, use the vercel url to update the project hostname in appwrite at Project Overview > Integration > Platoforms > Web > Update Hostname.

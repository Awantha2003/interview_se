# SE Prep Studio

A full-stack internship interview study website with English and Sinhala explanations, flashcards, a searchable checklist and a browser code lab.

## Run locally

Requires Node.js 20 or later.

```sh
npm test
npm run dev
```

Open http://127.0.0.1:4173. Run `npm run build` to generate the deployable static site in `dist/`.

The lab runs JavaScript and SQL inside a worker in an opaque-origin iframe. SQL uses an in-memory SQLite database seeded fresh for each run. HTML/CSS previews render in a separate sandboxed iframe. The lesson library, examples and progress work locally without an account.

## Deploy with optional Supabase sync

1. Import this repository into Vercel. The build and output settings are in `vercel.json`.
2. In your intended Supabase project, run `supabase/progress.sql` once in the SQL editor to create the progress table and user-scoped policies.
3. Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` as Vercel build environment variables. Use the project's publishable key.
4. Add the production URL in the Supabase Auth URL configuration as the Site URL and an allowed redirect. The email template should include the confirmation URL.
5. Redeploy, then use **Progress** to request a sign-in link. Guest progress is saved separately on the current device.

The attached internship checklist provides the syllabus. All 34 checklist sections have bilingual worked diagrams, interview answers and memory cues. Supabase access control and retry reliability are additional modules. Every PDF checklist entry has an individual study note. The Foundations modules also have Sinhala topic notes. The first lesson demonstrates shared references with an interactive cart and editable JavaScript.

# MycoScan

An open-access platform for mushroom disease data, AI-assisted identification, and
integrated pest management decision support. A Penn State Mushroom Research Center initiative.

Built with Next.js 14 (App Router), Supabase (auth + database + storage), and
in-browser ONNX inference via `onnxruntime-web`.

---

## What's inside

| Module | Route | Description |
|--------|-------|-------------|
| Home | `/` | Overview, hero, module directory |
| Community Dataset | `/dataset` | Browse contributed imagery with filters |
| Contribute | `/upload` | Upload labeled imagery (auth required) |
| Identify | `/scan` | In-browser disease classification + DSS |
| Disease Library | `/library` | Reference specimen plates |
| About | `/about` | Program information |

The identification model is a ResNet-50 trained on white-light *Agaricus bisporus*
disease imagery (98.7% test accuracy), exported to ONNX and served from
`public/models/model.onnx`. Inference runs entirely client-side — images are never uploaded.

**Model class order** (fixed, matches training):
`['bacterial-spot', 'dry-blister', 'healthy', 'spider-web', 'wet-blister']`

---

## Deploy

### 1. Supabase
1. Create a project (or reuse the existing `mycoscan` project).
2. Open the SQL Editor and run `supabase-setup.sql`.
3. In **Authentication → URL Configuration**, set the Site URL to your Vercel domain
   and add `https://YOUR-DOMAIN/**` to Redirect URLs.

### 2. Environment variables
Set these in Vercel (Project → Settings → Environment Variables), matching `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://sdpvyaxalwhuuwznoewq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_06bpyR44nUoNX3dxggMLLg_0hI8-Y94
```

### 3. GitHub + Vercel
1. Push this folder to your GitHub repo.
2. Import the repo in Vercel. Framework preset: **Next.js** (auto-detected).
3. Add the environment variables above.
4. Deploy. Every push to the main branch redeploys automatically.

> **Note on the model file.** `public/models/model.onnx` is ~90 MB. It is committed so it
> deploys with the site and is cached by the browser after first load. If you prefer not to
> commit a large file to Git, upload `model.onnx` to Supabase Storage instead and change the
> path in `src/app/scan/page.js` (`InferenceSession.create('/models/model.onnx', …)`) to the
> public Storage URL. To shrink first load, the model can also be quantized to ~25 MB.

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

---

## Data & licensing

Contributed imagery is shared under **CC BY-NC 4.0**. The platform is developed and
maintained by the Penn State Mushroom Research Center and the Department of Agricultural
and Biological Engineering.

## Advisory

Management recommendations in the Decision Support module are for guidance only.
Pesticide registrations vary by jurisdiction and change over time; chemical guidance is
under ongoing review by extension specialists. Always follow the product label and
consult local extension services before any application.

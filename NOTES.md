# Project state — Clay Club @ UT

Handoff notes. Last updated at commit `ef0ed43`.

Repo: https://github.com/ketakibakre/clay-club-ut
Live site: https://clay-club-ut.vercel.app (Vercel deploys automatically on push to `main`)

---

## 1. Branch state

Working branch: **`landing-page`**
Base branch: **`main`** (this is what Vercel serves)

Two commits are on `landing-page` and **not** on `main`:

| Commit | What it adds |
|---|---|
| `9235c90` | `apps-script/Code.gs` + `apps-script/README.md` — the Sheets endpoint and setup guide |
| `ef0ed43` | Optional free-text `comments` textarea on the signup form, plus its sheet column |

`main` is at `16fc0a4` (merge of PR #3). Everything before these two commits — the
UT × Clay redesign, the hero asset collage, the availability chips, and the colour
cleanup — **is already merged and live**.

Neither unmerged commit changes how the site looks apart from the new comment box.

---

## 2. Google Sheet

| | |
|---|---|
| Spreadsheet ID | `12bw5PJvIwBRZeey6hlBN-qCsydGbzh1Rl4NNWH4fS7o` |
| URL | https://docs.google.com/spreadsheets/d/12bw5PJvIwBRZeey6hlBN-qCsydGbzh1Rl4NNWH4fS7o/edit |
| Target tab | **`Signups`** — created automatically by the script if missing |

The `Signups` tab is deliberately **separate** from the existing Google Form
responses tab. That was a decision, not an oversight: the Form collects
`Email Address / Full name / UT EID / Email / Classification / Comments-Feedbacks`,
which is a different shape from what the site collects. Do not merge them into one
tab without reconciling the schemas.

Both are set in `apps-script/Code.gs` (`SPREADSHEET_ID`, `SHEET_NAME`).

---

## 3. Sheet schema — 10 columns, in this order

Defined by `COLUMNS` in `apps-script/Code.gs`, and mirrored in a comment above
`SCRIPT_URL` in `index.html`. **The order is load-bearing. Add new fields at the end.**

```
timestamp | name | email | ut_eid | major | year | availability_days | goal | utm_source | comments
```

| Column | Source | Notes |
|---|---|---|
| `timestamp` | server | `new Date()` in Apps Script, not sent by the browser |
| `name` | text input | required |
| `email` | email input | required, labelled "School email" |
| `ut_eid` | text input | required |
| `major` | text input | required |
| `year` | select | required — Freshman / Sophomore / Junior / Senior / Grad |
| `availability_days` | checkbox group | multi-select Mon–Fri, joined `"Monday, Wednesday"` |
| `goal` | checkbox group | multi-select of 7 fixed options, joined the same way |
| `utm_source` | hidden input | from `?utm_source=`, defaults to `direct` |
| `comments` | textarea | optional free text |

`availability_days` and `goal` are repeated checkbox keys. `index.html` joins each
into a single comma-separated value before POSTing, because Apps Script's
`e.parameter` keeps only the **first** value of a repeated key and would silently
drop the rest.

---

## 4. `SCRIPT_URL` status

**Placeholder on both branches. No signup is being saved anywhere right now.**

```js
// index.html — line 739 on landing-page, line 730 on main
const SCRIPT_URL = 'PASTE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

The submit handler treats any value not starting with `http` as unset: it logs the
payload to the console and skips the network call, but **still shows the success
confirmation**. So the live form currently tells students "You're in" while
discarding the submission. This is the single most important thing to fix.

The form posts with `mode: 'no-cors'`, so the browser cannot read the response.
Failures are invisible on the page — the only place they surface is
**Apps Script → Executions**.

---

## 5. Manual steps still required in Google (cannot be automated from here)

These need a signed-in Google account and cannot be done from the repo.

1. Open the spreadsheet → **Extensions → Apps Script**.
2. Delete the boilerplate, paste the full contents of `apps-script/Code.gs`, save.
   (If it was pasted before commit `ef0ed43`, **re-paste** — the `comments` column was added.)
3. **Run → testAppend**, approve the permission prompt. Google warns the app is
   unverified: **Advanced → Go to (project name)**. This is expected for your own script.
4. Confirm a `Signups` tab appeared with a bold header row and one test row. Delete the test row.
   If the tab already existed with the older 9-column header, delete the whole tab and
   re-run `testAppend` so the header regenerates with all 10 columns.
5. **Deploy → New deployment → Web app**, with:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the **Web app URL**. It ends in `/exec`.

### Failure modes that are silent from the browser

- **"Who has access" must be `Anyone`.** With "Anyone with a Google account", Google
  returns a sign-in page instead of running the script. The site cannot see this and
  still shows the confirmation.
- **Use the `/exec` URL, not `/dev`.** `/dev` only works while signed in.
- **Re-deploying after editing the script:** Deploy → Manage deployments → edit (pencil)
  → Version: **New version**. Creating a *new* deployment issues a different URL, and the
  site keeps posting to the old one.

---

## 6. Immediate next step

1. Get the `/exec` URL from step 5 above.
2. Set it in `index.html`:
   ```js
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfy.../exec';
   ```
3. Commit, push `landing-page`, open a PR to `main`, merge. Vercel deploys on merge.
4. Verify end to end: submit the real form on the live site and confirm a row lands in
   `Signups`. If it does not, check **Apps Script → Executions** for the error.
5. Confirm attribution works by submitting once via
   `https://clay-club-ut.vercel.app/?utm_source=instagram` — the `utm_source` column
   should read `instagram`, not `direct`.

Until step 3 is merged, the live site keeps discarding signups.

---

## 7. Other context worth knowing

- **No build step.** Single `index.html`, Tailwind via CDN, inline `<script>`. It opens
  correctly straight from the filesystem. There is no `package.json` and nothing to compile.
- **Assets:** originals in `ut_clay_png_assets/` (13.7 MB, untouched); the site references
  resized copies in `ut_clay_png_assets/web/` (0.75 MB total, same filenames). Filenames
  contain spaces, so `src` attributes are URL-encoded (`ut%20logo.png`).
- **Tailwind CDN caveat:** utilities added to elements by JavaScript at runtime are not
  reliably styled, because the CDN generates CSS by scanning the DOM. The career-chip
  selected state was moved to a plain `[aria-selected="true"]` CSS rule for this reason.
  Do not restyle it with JS-toggled classes.
- **Colour and type are now governed by Clay's brand sheet**,
  `Campus-Ambassador-Assets/Clay on Campus—Design-Dos-Donts.pdf`. Every colour is from
  Clay's palette, the burnt-orange family, or a neutral. Accent is `#BF5700` — UT's own
  burnt orange, which sits inside Clay's gold family at 4.59:1 on white. It takes
  **white** text on it, never ink. Fonts are Poppins and Inter only; Space Grotesk and
  JetBrains Mono were removed because the sheet forbids any other face.
- **Clay's official logo** is `clay-assets/web/clay-logo-black.png`, used unrotated.
  The old `ut_clay_png_assets/web/clay logo.png` is a rearranged lockup — do not use it.
- **Clay tiles** (`clay-assets/web/tile*.png`) are used as list bullets. The sheet allows
  scaling them but forbids rotating or stacking them.
- **Contact details in the footer** are real: `clay.utexas@gmail.com` and
  `@texas.clay` (https://www.instagram.com/texas.clay/).
- **There is no cohort cap.** All "15 students" / "first cohort" wording was removed
  deliberately. Do not reintroduce it.

# Wiring the signup form to Google Sheets

The form in `index.html` POSTs to a Google Apps Script web app, which appends
one row per signup. Until `SCRIPT_URL` in `index.html` is set, the form shows
its confirmation but **saves nothing**.

Target sheet:
`https://docs.google.com/spreadsheets/d/12bw5PJvIwBRZeey6hlBN-qCsydGbzh1Rl4NNWH4fS7o/edit`

## Setup (about 5 minutes, all inside your Google account)

1. Open the spreadsheet → **Extensions → Apps Script**.
2. Delete the `function myFunction() {}` boilerplate.
3. Paste in the contents of [`Code.gs`](Code.gs) and save.
4. Optional but worth it: **Run → testAppend**. Approve the permission prompt.
   Google will warn the app is unverified — **Advanced → Go to (project name)**.
   That is expected for your own script. Check the sheet: a `Signups` tab should
   appear with a header row and one obvious test row. Delete the test row.
5. **Deploy → New deployment**, then:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** ← this one matters, see below
6. **Deploy**, then copy the **Web app URL**. It ends in `/exec`.
7. Send me that URL and I'll set `SCRIPT_URL` and push, or paste it yourself
   into the `SCRIPT_URL` constant near the bottom of `index.html`.

## Things that quietly break this

- **"Who has access" must be "Anyone."** With "Anyone with a Google account,"
  Google returns a sign-in page instead of running the script, and because the
  site posts with `mode: 'no-cors'` the browser cannot see the failure. Signups
  vanish with no error anywhere on the page.
- **Use the `/exec` URL, not `/dev`.** `/dev` only works while you are signed in.
- **Re-deploying after editing the script:** Deploy → Manage deployments → edit
  (pencil) → Version: New version. Creating a brand new deployment instead gives
  you a different URL and the site keeps posting to the old one.
- **Column order is load-bearing.** `Code.gs` writes columns in the order listed
  in `COLUMNS`, matching the comment above `SCRIPT_URL` in `index.html`. Add new
  fields at the end.
- **Writing to an existing tab:** the script creates and uses a tab named
  `Signups`. To use a different tab, change `SHEET_NAME` to that tab's exact name.

## Verifying it works end to end

After `SCRIPT_URL` is set and deployed, submit the real form once and confirm a
row appears. If nothing shows up, check **Apps Script → Executions** — errors
are logged there, since the page itself cannot report them.

To confirm attribution is flowing, submit once via a tagged link:

```
https://clay-club-ut.vercel.app/?utm_source=instagram
```

The `utm_source` column should read `instagram` rather than `direct`.

# Clay Club @ UT — Landing Page

This file is the brief for this repo. Read it before writing code.
Everything below is a decision, not a suggestion. If something here
conflicts with a later instruction in chat, ask which wins.

> **Rewritten 2026-08-19** to match the site as built. An earlier version
> of this brief described a cohort model, a 15-person cap, seven page
> sections, UT burnt orange, and a nine-column sheet. None of that is
> true any more — those were deliberately removed, not lost. `NOTES.md`
> holds the operational detail (deploy steps, sheet IDs, failure modes);
> this file holds the intent. If the two disagree, `NOTES.md` wins.

---

## 1. Context

### What this is
A single-page marketing and signup site for **Clay Club @ UT** — a student
organization at UT Austin that teaches students to use Clay, a GTM
(go-to-market) automation platform, to build real systems for recruiting,
research, and outreach.

### Why it exists
Recruiting for the club happens in a compressed window at the start of the
semester, mostly through Instagram stories, GroupMe links, and cross-posts
in other campus orgs. Those channels give you one link and about four
seconds of attention. This page has to convert a cold, skeptical
sophomore into a signup in that window.

### Who is building it
One student operator, solo, working in Claude Code. No design team, no
engineering support, no budget. Everything must be free tier.

### What success looks like
- **Primary metric:** signups (form submissions).
- **Diagnostic metric:** signups by `utm_source`, so we learn which
  distribution channel actually converts vs. which one just felt busy.

### What this page is NOT
It is not a member portal, a CRM, an event calendar, or an org homepage.
It captures interest. Downstream member management happens in Clay and
Google Sheets, not here. See §8 Non-goals.

---

## 2. Audience

### Primary
UT Austin undergraduates, mostly sophomores and juniors, in Business,
Marketing, MIS, Economics, Finance, and adjacent majors. They are
actively recruiting for internships and are anxious about differentiation.

### Assume the reader:
- Has **never heard of Clay**.
- Does **not know what "GTM" stands for** and will not look it up.
- Reads "engineering" as "requires a CS degree" and will self-select out
  unless told otherwise, explicitly and early.
- Is on a **phone**, arriving from an Instagram story or a GroupMe link.
- Is skimming. They will read the headline, one subhead, and maybe one
  card before deciding.

### The reader's actual question
Not "what is GTM engineering." It's **"is this worth my Tuesday night,
and will it help me get a job."** Every section either answers that or
gets cut.

### Distribution channels (drives the `utm_source` values)
Texas Convergent, Genesis, Longhorn Startup, LEA, physical flyers,
Instagram, direct word of mouth.

---

## 3. Product spec

### The ask — one form, one tier
There is exactly one form on the page and **one row per person**. There is
no cohort tier, no commit checkbox, and no cap on membership. Everyone who
wants in is in, and the page says so explicitly next to "Free for UT
students." Do not reintroduce scarcity framing.

Do **not** build two forms, two pages, or a multi-step wizard.

### Form fields (exact — 9 posted, plus a server-side timestamp)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | text | yes | |
| `email` | email | yes | Labelled "School email"; not enforced |
| `ut_eid` | text | yes | |
| `major` | text | yes | Free text, not a dropdown — too many majors |
| `year` | select | yes | Freshman / Sophomore / Junior / Senior / Grad |
| `availability_days` | checkbox group | no | Mon–Fri. Always visible |
| `goal` | checkbox group | no | Seven fixed options, multi-select |
| `comments` | textarea | no | One row tall, resizable |
| `utm_source` | hidden | — | From `?utm_source=`, default `"direct"` |

Every field has a placeholder. Keep it to this list. Do not add phone
number, LinkedIn URL, GPA, resume upload, or a "how did you hear about
us" dropdown — `utm_source` already answers that last one without asking.

`availability_days` and `goal` are repeated checkbox keys. The submit
handler joins each into one comma-separated value before POSTing, because
Apps Script's `e.parameter` keeps only the **first** value of a repeated
key and would silently drop the rest.

### Success state
On submit, replace the form in place with a short confirmation. Do not
redirect, do not open a modal.

---

## 4. Content spec

### Voice
**Established, present tense.** "Clay Club @ UT teaches students to build
the systems behind modern go-to-market." NOT "we're launching," NOT
"we're starting this," NOT "coming this fall."

Student-to-student. Direct, plain, a little informal. No corporate voice.
No "unlock your potential," no "empower," no "leverage." Short sentences.
Concrete nouns.

### Honesty constraints — these are hard rules
- **No invented social proof.** There are no alumni outcomes, no member
  testimonials, no "students have landed roles at" claims. Do not write
  placeholder testimonials, not even lorem-ipsum ones — they have a way
  of shipping.
- **No fake meeting times.** Logistics are not locked. Do not print
  "Thursdays at 6." The `availability_days` field is how meeting times
  get decided, which is why the form says so.
- **No membership cap and no application.** There is no cohort, no
  interview, and no limit. Saying otherwise would be a lie.

### Terminology rules
- Spell out "go-to-market" on first use, then you may use GTM.
- Never use these without immediately demonstrating them: enrichment,
  waterfall, ICP, signal, sequencer, Claygent.
- The word "engineering" must be defused within one screen of first use.
  Explicitly: no CS degree required, any major.

---

## 5. Page structure

Nav, five sections, footer — in this order.

### 5.1 Hero
Eyebrow, headline, two short paragraphs, two buttons (`Join Clay Club`
scrolls to `#signup`; `See how it works` scrolls down). A collage of Clay
3D objects sits to the right on desktop.

The headline names the **concrete skill**, not the category. Currently:
"Learn how the future of **sales and growth** is being built."

### 5.2 `#gtm` — "How companies find and reach customers."
The definition section. Left column defines GTM in plain language and
lists the four questions it answers. Right column is a rotating career
panel — chips for Sales / Growth / RevOps / Product Marketing / GTM
Strategy / GTM Engineering, each swapping the panel copy.

The career chips use a plain `[aria-selected="true"]` CSS rule, **not**
JS-toggled Tailwind classes. See §7 for why.

### 5.3 "How GTM is changing"
Two cards, BEFORE and NOW, with an arrow between them. This teaches by
demonstration instead of explanation and it is the most important section
on the page. A third column lands the point and links to clay.com.

### 5.4 `#club` — "What happens at Clay Club?"
A six-item editorial grid: Workshops, Builds, Hackathons, Real use cases,
Community events, Perks. Honest about logistics being set with the group.

### 5.5 `#try` — "Use it for something you care about."
Six pastel cards, each a concrete thing a student could build. "Land an
internship" is the highest-converting card; keep it first.

### 5.6 `#signup`
Pitch on the left, form on the right. See §3.

### 5.7 Footer
Contact email and Instagram, both real, plus a link to clay.com.

---

## 6. Design spec

### The Clay brand sheet is the authority
`Campus-Ambassador-Assets/Clay on Campus—Design-Dos-Donts.pdf` sets four
rules and they outrank anything below: the logo needs a high-contrast
background; only Poppins and Inter; no stock imagery, and Clay's tiles
must never be rotated or stacked; stick to Clay's palette, 2–3 colours
at a time. Clay's official lockup lives in `clay-assets/web/` — use it,
unmodified and unrotated. A rearranged lockup used to sit in
`ut_clay_png_assets/`; it has been deleted. Source any new Clay mark from
`Campus-Ambassador-Assets/Logos/`, never a rearranged copy.

### Direction
Sparse, precise, grid-derived. The page should feel like something built
by someone competent, not something bought. Not generic SaaS gradients,
not a startup landing page template.

### Explicitly avoid
1. Cream background + high-contrast serif display + terracotta accent.
2. Near-black background + one acid-green or vermilion accent.
3. Broadsheet layout with hairline rules and dense newspaper columns.

Also avoid: purple-to-blue gradients, floating 3D blobs, glassmorphism, a
stats bar of three big numbers under the hero.

### Colour — Clay's own palette plus one burnt orange
Governed by **`Campus-Ambassador-Assets/Clay on Campus—Design-Dos-Donts.pdf`**,
which is Clay's brand sheet. Tokens live in `tailwind.config` at the top
of `index.html`. Every colour on the page is from that sheet, from the
burnt-orange family below, or a neutral. **Nothing else.**

- **Neutrals** carry the page: `ink #1F1F1F`, `muted #5C5C5C`,
  `page #FAF9F7`, `subtle #F3F1ED`, `line #E2E0DC`. The sheet permits
  black and white, which is what these are.
- **Clay's three families**, and only these, used for containers, icons
  and borders — never body text:
  - blue `#001433 #395AFA #429EFF #BEDFFE #F0F8FF`
  - gold `#372201 #9E5802 #FDBE11 #FBE189 #FEFAE8`
  - pink `#46022F #CC089E #FF70D2 #F8B9E4 #FFF0FA`
  The sheet says stick to 2–3 colours at a time. Three families is the ceiling.
- **Burnt orange `#BF5700`** is the accent. It is UT's own orange, and it
  lands in Clay's gold family — 4.59:1 on white, matching the 5.1–5.5
  band Clay's other saturated steps sit in.
  - It passes for **small text on white**, so one token covers both text
    and fills.
  - **It takes WHITE text on it (4.59), never ink (3.59).** This is the
    opposite of the old Clay Orange. Never put `text-ink` on `bg-brand`.
  - Tints follow Clay's own rhythm: `brandBright #FF8A3D`,
    `brandLight #FFD6B8`, `paleOrange #FFF4EC`, `brandHover/Deep #A34A00`.
- `faint #8A8A8A` is decorative only — never body copy.

If a change introduces a colour that is not on this list, it is wrong.

### Typography — only two faces are permitted
Clay's brand sheet: *"use either ① Poppins or ② Inter … do NOT use any
other fonts."* Space Grotesk and JetBrains Mono were both removed for
this reason. Do not reintroduce them or add a third face.
- **Display** — Poppins, for headlines and the tracked-caps eyebrows.
- **Body** — Inter. Mobile body text never below 16px.

### Motion
Restrained. A scroll-triggered reveal (`data-reveal`) and subtle hover
states. Nothing else. Scattered animation is a tell that a page was
generated rather than designed.

### Quality floor — non-negotiable
- **Mobile-first.** Most traffic is a vertical phone from an Instagram
  story. Design the phone layout first; desktop is the adaptation.
- Visible keyboard focus states on every interactive element.
- `prefers-reduced-motion` respected.
- Tap targets minimum 44px.
- **State must never be signalled by colour alone.** The signup chips
  encode selection as an outline whose *weight* changes (an inset ring),
  not just its hue, so it survives without colour vision. Keep the ring
  inset so selecting never reflows the row.

---

## 7. Technical spec

### Stack
- **Plain static HTML.** Single `index.html`. No framework, no build
  step, no bundler, no `package.json`.
- **Tailwind via CDN.** Inline `<style>` for anything Tailwind can't
  express cleanly.
- **Inline `<script>`** for the form logic. No external JS, no libraries.
- Deploys to **Vercel** automatically on push to `main`.

Rationale for no build step: the operator is not a full-time engineer and
a broken build at 11pm during recruiting week is a real risk. A single
HTML file cannot fail to build.

### Tailwind CDN caveat — this one bites
The CDN build generates CSS by scanning the DOM, so **utilities added to
elements by JavaScript at runtime are not reliably styled.** Anything
state-dependent goes in a plain CSS rule keyed off an attribute
(`[aria-selected="true"]`, `input:checked + span`), never a JS-toggled
class.

### Form submission
Posts to a **Google Apps Script web app**. `SCRIPT_URL` is at the top of
the script block and is **live** — it is no longer a placeholder. Two
details that are easy to get wrong and expensive to debug:

```js
// GOTCHA 1: Apps Script does not return CORS headers a browser accepts.
// mode: 'no-cors' is required. Consequence: the response is opaque and
// unreadable, so success must be shown optimistically.

// GOTCHA 2: Body MUST be URLSearchParams(new FormData(form)).
// Raw FormData sends multipart/form-data, which Apps Script does not
// reliably parse into e.parameter — rows arrive blank with no error.

await fetch(SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors',
  body: new URLSearchParams(new FormData(form))
});
```

Because the response is unreadable, **a failed write looks identical to a
success in the browser.** The only place errors surface is Apps Script →
Executions. `NOTES.md` §5 lists the silent failure modes.

### UTM capture
Read `?utm_source=` from `window.location.search` on page load and write
it into the hidden input. Default to `"direct"` when absent. Do this
before any user interaction so it's captured even on a fast submit.

### Receiving end (Apps Script)
`apps-script/Code.gs` appends one row per submission to the `Signups` tab
in this column order:

```
timestamp | name | email | ut_eid | major | year |
availability_days | goal | utm_source | comments
```

**Column order is load-bearing** — this sheet is the seed list for a Clay
table downstream. Add new fields at the END. `timestamp` is written
server-side; set both the spreadsheet and the Apps Script project to
Central Time or it records in Pacific.

---

## 8. Non-goals

Do not build these. If a request seems to head this direction, stop and
confirm first.

- No authentication, login, or accounts
- No member portal, dashboard, or admin view
- No database, no Supabase, no Firebase, no backend beyond the Apps
  Script endpoint
- No multi-page routing, no client-side router, no separate `/about`
- No CMS
- No analytics libraries, no pixels, no cookie banner (UTM capture is
  first-party and needs none of this)
- No email sending from the page
- No payment or dues collection
- No calendar embed, no event list
- No blog

Member management and outreach are a later phase and they happen in Clay,
not in this repo. The scope of this repo is: one page, one form, one row
per person.

---

## 9. Acceptance criteria

- [ ] Loads and is fully usable on a 375px-wide viewport
- [ ] Every section from §5 is present, in order
- [ ] Hero headline names a concrete skill, not the category "GTM
      engineering"
- [ ] "Engineering" is defused (any major, no CS degree) within one
      screen of first use
- [ ] `utm_source` populates from the query string; defaults to `direct`
- [ ] Submit uses `no-cors` + `URLSearchParams`, and replaces the form
      with a confirmation in place
- [ ] Repeated checkbox keys are joined before POSTing
- [ ] Zero invented testimonials, outcomes, or member counts
- [ ] Zero hardcoded meeting times; no cap, cohort, or application
- [ ] Keyboard-navigable with visible focus states
- [ ] No interactive state relies on colour alone
- [ ] `prefers-reduced-motion` respected
- [ ] No build step required — `index.html` opens from the filesystem

---

## 10. Working notes

- Deploy, then iterate on copy against a real screen. Copy that reads
  fine in an editor often reads wrong on a phone.
- The form is the point. If a design decision and a conversion decision
  conflict, conversion wins.
- When in doubt about copy, cut it. The reader is skimming on a phone
  between classes.

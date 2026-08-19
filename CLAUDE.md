# Clay Club @ UT — Landing Page

This file is the brief for this repo. Read it before writing code.
Everything below is a decision, not a suggestion. If something here
conflicts with a later instruction in chat, ask which wins.

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
- **Secondary metric:** cohort-interest rate — what % of signups check
  the commit box. This is the quality signal.
- **Diagnostic metric:** signups by `utm_source`, so we learn which
  distribution channel actually converts vs. which one just felt busy.
- Rough target for the first push: 60–100 total signups, 15–25 of which
  check the cohort box.

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

### The ask — two tiers, ONE form
There is exactly one form on the page. It serves two intents:

1. **Soft interest** (primary, default) — low commitment, big list. This
   is what most submitters are doing.
2. **Cohort commitment** (secondary) — a single checkbox: *"I want one of
   the 15 spots in the first cohort."*

Do **not** build two forms, two pages, or a multi-step wizard. One form,
one boolean, one row per person. Splitting them fragments attribution
data and doubles maintenance for zero gain.

### Progressive disclosure
The `availability` field is hidden by default and revealed only when
`cohort_interest` is checked. Rationale: it's irrelevant to soft
signups and every visible field costs conversion. When shown, it doubles
as a scheduling poll — meeting times are not locked yet, and this is how
we decide them.

### Form fields (exact)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | text | yes | |
| `email` | email | yes | Prefer school email but don't enforce it |
| `major` | text | no | Free text, not a dropdown — too many majors |
| `year` | select | no | Freshman / Sophomore / Junior / Senior / Grad |
| `cohort_interest` | checkbox | no | The commit tier |
| `availability` | checkbox group | no | Hidden until `cohort_interest` is checked. Options: Mon eve / Tue eve / Wed eve / Thu eve / Weekend |
| `goal` | text | no | One line: "what do you want to get out of this?" |
| `utm_source` | hidden | — | Read from `?utm_source=` query param, default `"direct"` |

Keep it to this. Do not add phone number, LinkedIn URL, GPA, resume
upload, or a "how did you hear about us" dropdown — `utm_source` already
answers that last one without asking.

### Success state
On submit, replace the form in place with a short confirmation. Do not
redirect, do not open a modal. The confirmation should tell them what
happens next in concrete terms (e.g. "You're on the list. Watch your
email this week."). If they checked the cohort box, the confirmation
should acknowledge that specifically.

---

## 4. Content spec

### Voice
**Established, present tense.** "Clay Club @ UT teaches students to build
the systems behind modern go-to-market." NOT "we're launching," NOT
"we're starting this," NOT "coming this fall."

Student-to-student. Direct, plain, a little informal. No corporate voice.
No "unlock your potential," no "empower," no "leverage," no em-dash-laden
LinkedIn cadence. Short sentences. Concrete nouns.

### Honesty constraints — these are hard rules
- **No invented social proof.** There are no alumni outcomes, no member
  testimonials, no "students have landed roles at" claims. Do not write
  placeholder testimonials, not even lorem-ipsum ones — they have a way
  of shipping.
- **Borrowed proof is allowed** and should be used, attributed to Clay:
  - 60+ Clay Clubs exist worldwide, from Warsaw to Manila.
  - ~400 GTM engineering roles were posted this spring at a ~$160K
    median salary, roughly 20% above traditional sales/marketing ops
    roles (per Pave, cited by Clay).
- **No fake meeting times.** Logistics are not locked. Do not print
  "Thursdays at 6." Say the cadence is being set with the first cohort,
  or say nothing.
- **The cohort cap of 15 must be justified**, not asserted. Tie it to
  format: small enough that everyone actually ships something, rather
  than sitting in a lecture. Unjustified scarcity reads as fake to
  exactly the sharp students we want.

### Terminology rules
- Spell out "go-to-market" on first use, then you may use GTM.
- Never use these without immediately demonstrating them: enrichment,
  waterfall, ICP, signal, sequencer, Claygent.
- The word "engineering" must be defused within one screen of first use.
  Explicitly: no CS degree required, any major.

---

## 5. Page structure

Seven sections, in this order.

### 5.1 Hero
Headline, one-line subhead, one button that scrolls to `#signup`.
Nothing else. No hero image, no stats bar, no logo wall.

The headline names the **concrete skill**, not the category. "Learn GTM
engineering" is a bad headline for a reader who doesn't know the term.
Something closer to the shape of "Build the systems that find jobs,
customers, and people" — write your own, but hold that standard.

### 5.2 By hand vs. engineered
The definition section. Two columns, 4–5 rows, showing the same task done
manually and done as a system. This teaches by demonstration instead of
explanation, and it is the most important section on the page.

Seed content (rewrite for voice, keep the structure):

| By hand | Engineered |
|---|---|
| Scroll LinkedIn for three hours looking for startups that are hiring | Pull every Austin startup that raised a Series A in the last six months, automatically |
| Guess at someone's email and hope it bounces gracefully | Run it through four data providers until one returns a verified hit |
| Write 20 cold emails that all sound the same | Generate 200, each referencing something real about that specific person |
| Rebuild your company research doc every time you switch targets | Build it once as a system and re-run it on any list |

The takeaway line, in your own words: the person doing the work by hand is
doing the motion; the person building the system is building the motion.
That shift is the whole discipline.

### 5.3 Three expandable cards — "What you'd actually build"
Collapsed: title + one line. Click: expands **in place** with 3–4
sentences. No modals, no routing, no page loads.

1. **Land the internship** — build a list of every company in your target
   space, find the right person, reach out with something real. This is
   the highest-converting card; put it first.
2. **Run your org** — the page you're on works this way. Signups flow
   into a table that enriches and segments itself.
3. **Do the research** — market maps, competitor tracking, the work you'd
   otherwise do by hand at 2am before a case competition.

### 5.4 What the club is
Format, cadence, cohort size, what a session actually looks like. Honest
about logistics being set with the first cohort.

### 5.5 Who it's for
Explicit and short. Any major. No CS background needed. If a reader is
going to self-select out, it happens here — so this section exists
specifically to stop that.

### 5.6 Signup form
Anchor `#signup`. See §3.

### 5.7 Footer
Link to clay.com. Contact email. Nothing else.

---

## 6. Design spec

### Direction
The subject's own material is **tabular data** — rows, columns, cells,
and the moment a blank cell fills itself in. That's where the visual
language comes from. Not generic SaaS gradients, not a startup landing
page template.

The organizing idea: **empty cell → filled cell.** Sparse, precise,
grid-derived. The page should feel like something built by someone
competent, not something bought.

### Explicitly avoid
These are the three looks that AI-generated design defaults to. Do not
produce any of them:
1. Cream background (~#F4F1EA) + high-contrast serif display + terracotta
   accent.
2. Near-black background + one acid-green or vermilion accent.
3. Broadsheet layout with hairline rules, zero border radius, dense
   newspaper columns.

Also avoid: purple-to-blue gradients, floating 3D blobs, glassmorphism,
a stats bar of three big numbers under the hero.

### Color
Build a 5-value token system. Direction, not a mandate — justify any
departure:
- A **cool ink/slate base** for text and structure (not pure black).
- An **off-white paper** background (not cream — cream plus orange is
  the default look listed above).
- **UT burnt orange (#BF5700)** used *only* as the "enriched" state:
  filled cells, the active state, the primary button. Tying the accent to
  a meaning is the point. If orange is everywhere, it means nothing.
- One **muted neutral** for borders, grid lines, and the empty state.
- One **soft warm tint** for card backgrounds if needed.

Burnt orange is justified here because it's institutionally true (UT), not
decorative. Keep it disciplined and it won't read as the terracotta
default.

### Typography
Three roles:
- **Display** — a tight, confident grotesque for the headline. Not a
  serif. Not Inter at 700.
- **Body** — a clean, highly readable sans at comfortable size. Mobile
  body text should not go below 16px.
- **Utility/mono** — a monospace face for data-flavored elements: the
  by-hand/engineered table, field labels, the `utm_source` easter egg if
  you want one. Mono is genuinely justified here — it's the native
  vernacular of spreadsheets and data work, not decoration.

Google Fonts via CDN is fine.

### Signature element
Pick **one** memorable thing and spend the boldness there. Strong
candidate: the by-hand/engineered comparison rendered as a table where the
"engineered" column cells fill in on scroll, mimicking a Clay enrichment
running. That's the subject's own behavior used as the page's signature.

If you do this, everything else stays quiet. One bold move, not five.

### Motion
Restrained. A scroll-triggered reveal on the signature element, subtle
hover states on cards and the button. Nothing else. Scattered animation
is a tell that a page was generated rather than designed.

### Quality floor — non-negotiable
- **Mobile-first.** Design the phone layout first; desktop is the
  adaptation. Most traffic is a vertical phone from an Instagram story.
- Visible keyboard focus states on every interactive element.
- `prefers-reduced-motion` respected.
- Tap targets minimum 44px.
- Real contrast ratios — burnt orange on white needs checking for body
  text, and probably fails. Use it for large text and fills, not small
  copy.

---

## 7. Technical spec

### Stack
- **Plain static HTML.** Single `index.html`. No framework, no build
  step, no bundler, no `package.json`.
- **Tailwind via CDN** for styling. Inline `<style>` for anything Tailwind
  can't express cleanly.
- **Inline `<script>`** for the form logic. No external JS files, no
  libraries, no jQuery.
- Deploys to **Vercel** automatically on push to `main`.

Rationale for no build step: the operator is not a full-time engineer and
a broken build at 11pm during recruiting week is a real risk. A single
HTML file cannot fail to build.

### Form submission
Posts to a **Google Apps Script web app** endpoint. Two implementation
details that are easy to get wrong and expensive to debug:

```js
// GOTCHA 1: Apps Script does not return CORS headers a browser accepts.
// mode: 'no-cors' is required. Consequence: the response is opaque and
// unreadable, so success must be shown optimistically.

// GOTCHA 2: Body MUST be URLSearchParams(new FormData(form)).
// Raw FormData sends multipart/form-data, which Apps Script does not
// reliably parse into e.parameter — rows arrive blank with no error.
// URLSearchParams sends url-encoded, which it parses correctly.

await fetch(SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors',
  body: new URLSearchParams(new FormData(form))
});
```

Leave `SCRIPT_URL` as a clearly-marked placeholder constant at the top of
the script block until the Apps Script is deployed.

### UTM capture
Read `?utm_source=` from `window.location.search` on page load and write
it into the hidden input. Default to `"direct"` when absent. Do this
before any user interaction so it's captured even on a fast submit.

### Receiving end (Apps Script, for reference)
Appends one row per submission to a sheet tab named `Signups`, in this
column order:

```
timestamp | name | email | major | year | cohort_interest |
availability | goal | utm_source
```

Column order is load-bearing — this sheet is the seed list for a Clay
table downstream. Don't reorder it without updating the script.

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

Member management, cohort tracking, and outreach are a later phase and
they happen in Clay, not in this repo. The scope of this repo is: one
page, one form, one row per person.

---

## 9. Acceptance criteria

The build is done when all of these are true:

- [ ] Loads and is fully usable on a 375px-wide viewport
- [ ] Every section from §5 is present, in order
- [ ] Hero headline names a concrete skill, not the category "GTM
      engineering"
- [ ] "Engineering" is defused (any major, no CS degree) within one
      screen of first use
- [ ] Cards expand in place — no modal, no navigation, no scroll jump
- [ ] `availability` is hidden until `cohort_interest` is checked
- [ ] `utm_source` populates from the query string; defaults to `direct`
- [ ] Submit uses `no-cors` + `URLSearchParams`, and replaces the form
      with a confirmation in place
- [ ] Zero invented testimonials, outcomes, or member counts
- [ ] Zero hardcoded meeting times
- [ ] Keyboard-navigable with visible focus states
- [ ] `prefers-reduced-motion` respected
- [ ] No build step required — `index.html` opens correctly from the
      filesystem

---

## 10. Working notes

- Ship the ugly version first. Deploy, then iterate on copy against a
  real screen. Copy that reads fine in an editor often reads wrong on a
  phone.
- The form is the point. If a design decision and a conversion decision
  conflict, conversion wins.
- When in doubt about copy, cut it. The reader is skimming on a phone
  between classes.

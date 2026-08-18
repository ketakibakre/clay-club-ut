# Clay Club @ UT — Landing Page Brief

> Source spec for this repo. Read before changing `index.html`.

---

## 1. Context

**What this is:** A single-page marketing and signup site for **Clay Club @ UT** — a student
organization at UT Austin that teaches students to use Clay, a go-to-market (GTM)
automation platform, to build real systems for recruiting, research, and outreach.

**Why it exists:** Recruiting happens in a compressed window at the start of the semester,
mostly through Instagram stories, GroupMe links, and cross-posts in other campus orgs.
One link, about four seconds of attention. This page converts a cold, skeptical sophomore
into a signup in that window.

**Success metrics**
- Primary: signups (form submissions).
- Secondary: cohort-interest rate — % of signups checking the commit box (quality signal).
- Diagnostic: signups by `utm_source`.
- First-push target: 60–100 signups, 15–25 checking the cohort box.

**Not:** a member portal, CRM, event calendar, or org homepage. It captures interest.
Downstream member management happens in Clay and Google Sheets.

---

## 2. Audience

UT Austin undergrads, mostly sophomores/juniors, in Business, Marketing, MIS, Economics,
Finance and adjacent majors. Actively recruiting for internships, anxious about
differentiation.

Assume the reader:
- Has never heard of Clay.
- Does not know what "GTM" stands for and won't look it up.
- Reads "engineering" as "requires a CS degree" and will self-select out unless told
  otherwise, explicitly and early.
- Is on a phone, arriving from an Instagram story or GroupMe link.
- Is skimming — headline, one subhead, maybe one card.

Their actual question: **"is this worth my Tuesday night, and will it help me get a job."**

Distribution channels (drive `utm_source`): Texas Convergent, Genesis, Longhorn Startup,
LEA, physical flyers, Instagram, word of mouth.

---

## 3. Product spec

**One form, two tiers.**
1. Soft interest (primary, default) — low commitment, big list.
2. Cohort commitment (secondary) — one checkbox: "I want one of the 15 spots in the first cohort."

No two forms, no second page, no multi-step wizard. One form, one boolean, one row per person.

**Progressive disclosure:** `availability` is hidden until `cohort_interest` is checked.
It doubles as a scheduling poll — meeting times are not locked yet.

### Form fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | text | yes | |
| `email` | email | yes | Prefer school email, don't enforce |
| `major` | text | no | Free text, not a dropdown |
| `year` | select | no | Freshman / Sophomore / Junior / Senior / Grad |
| `cohort_interest` | checkbox | no | The commit tier |
| `availability` | checkbox group | no | Hidden until `cohort_interest`. Mon/Tue/Wed/Thu eve, Weekend |
| `goal` | text | no | "what do you want to get out of this?" |
| `utm_source` | hidden | — | From `?utm_source=`, default `direct` |

Do not add phone, LinkedIn, GPA, resume upload, or "how did you hear about us".

**Success state:** replace the form in place with a short confirmation. No redirect, no modal.
Acknowledge the cohort box specifically if checked.

---

## 4. Content spec

**Voice:** established, present tense. "Clay Club @ UT teaches students to build the systems
behind modern go-to-market." Not "we're launching," not "coming this fall."
Student-to-student. Direct, plain, a little informal. No corporate voice.

**Honesty constraints (hard rules)**
- No invented social proof — no alumni outcomes, no testimonials, not even placeholders.
- Borrowed proof is allowed, attributed to Clay:
  - 60+ Clay Clubs exist worldwide, from Warsaw to Manila.
  - ~400 GTM engineering roles posted this spring at a ~$160K median salary, roughly 20%
    above traditional sales/marketing ops roles (per Pave, cited by Clay).
- No fake meeting times. Cadence is set with the first cohort.
- The cohort cap of 15 must be justified by format, not asserted.

**Terminology**
- Spell out "go-to-market" on first use, then GTM is fine.
- Never use without immediately demonstrating: enrichment, waterfall, ICP, signal,
  sequencer, Claygent.
- "Engineering" must be defused within one screen of first use — no CS degree, any major.

---

## 5. Page structure (seven sections, in order)

1. **Hero** — headline, one-line subhead, one button to `#signup`. Nothing else.
   Headline names the concrete skill, not the category.
2. **By hand vs. engineered** — the definition section. Two columns, 4–5 rows, same task
   manual vs. as a system. Most important section on the page.
3. **Three expandable cards** — "What you'd actually build." Expand in place.
   Land the internship (first) / Run your org / Do the research.
4. **What the club is** — format, cadence, cohort size, what a session looks like.
5. **Who it's for** — explicit and short. Any major, no CS background.
6. **Signup form** — anchor `#signup`.
7. **Footer** — link to clay.com, contact email, nothing else.

---

## 6. Design spec

**Direction:** the subject's material is tabular data — rows, columns, cells, and the moment
a blank cell fills itself in. Organizing idea: **empty cell → filled cell.** Sparse, precise,
grid-derived.

**Explicitly avoid**
1. Cream (~#F4F1EA) + high-contrast serif display + terracotta accent.
2. Near-black background + one acid-green or vermilion accent.
3. Broadsheet layout with hairline rules, zero radius, dense newspaper columns.

Also avoid: purple-to-blue gradients, floating 3D blobs, glassmorphism, a three-big-numbers
stats bar under the hero.

**Color — 5 tokens**
- Cool ink/slate base for text and structure (not pure black).
- Off-white paper background (not cream).
- UT burnt orange `#BF5700` used *only* as the "enriched" state: filled cells, active state,
  primary button.
- One muted neutral for borders, grid lines, empty state.
- One soft warm tint for card backgrounds if needed.

**Typography** — display grotesque (not a serif, not Inter 700), clean body sans (≥16px on
mobile), monospace for data-flavored elements. Google Fonts CDN is fine.

**Signature element:** the by-hand/engineered table where the "engineered" cells fill in on
scroll, mimicking a Clay enrichment running. One bold move, not five.

**Motion:** restrained. Scroll reveal on the signature element, subtle hover states.

**Quality floor (non-negotiable)**
- Mobile-first, usable at 375px.
- Visible keyboard focus states.
- `prefers-reduced-motion` respected.
- Tap targets ≥44px.
- Real contrast ratios — burnt orange for large text and fills, not small copy.

---

## 7. Technical spec

**Stack:** plain static HTML, single `index.html`. No framework, no build step, no bundler,
no `package.json`. Tailwind via CDN, inline `<style>` where needed, inline `<script>` for
form logic. Deploys to Vercel on push to `main`.

Rationale: a single HTML file cannot fail to build at 11pm during recruiting week.

**Form submission** — posts to a Google Apps Script web app endpoint.

```js
// GOTCHA 1: Apps Script does not return CORS headers a browser accepts.
// mode: 'no-cors' is required. The response is opaque, so success is optimistic.

// GOTCHA 2: Body MUST be URLSearchParams(new FormData(form)).
// Raw FormData sends multipart/form-data, which Apps Script does not reliably
// parse into e.parameter — rows arrive blank with no error.

await fetch(SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors',
  body: new URLSearchParams(new FormData(form))
});
```

`SCRIPT_URL` stays a clearly-marked placeholder until the Apps Script is deployed.

**UTM capture:** read `?utm_source=` on page load, default `"direct"`, before any interaction.

**Receiving end (Apps Script):** appends one row per submission to a tab named `Signups`:

```
timestamp | name | email | major | year | cohort_interest | availability | goal | utm_source
```

Column order is load-bearing — it seeds a Clay table downstream.

---

## 8. Non-goals

No auth/login/accounts. No member portal or dashboard. No database or backend beyond the
Apps Script endpoint. No multi-page routing. No CMS. No analytics libraries, pixels, or
cookie banner. No email sending. No payments or dues. No calendar embed or event list.
No blog.

Scope: one page, one form, one row per person.

---

## 9. Acceptance criteria

- [ ] Loads and is fully usable at 375px
- [ ] Every section from §5 present, in order
- [ ] Hero headline names a concrete skill, not "GTM engineering"
- [ ] "Engineering" defused within one screen of first use
- [ ] Cards expand in place — no modal, no navigation, no scroll jump
- [ ] `availability` hidden until `cohort_interest` checked
- [ ] `utm_source` populates from query string, defaults to `direct`
- [ ] Submit uses `no-cors` + `URLSearchParams`, replaces form with confirmation in place
- [ ] Zero invented testimonials, outcomes, or member counts
- [ ] Zero hardcoded meeting times
- [ ] Keyboard-navigable with visible focus states
- [ ] `prefers-reduced-motion` respected
- [ ] No build step — `index.html` opens from the filesystem

---

## 10. Working notes

- Ship the ugly version first. Deploy, then iterate copy against a real screen.
- The form is the point. If design and conversion conflict, conversion wins.
- When in doubt about copy, cut it.

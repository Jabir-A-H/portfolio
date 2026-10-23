# Content Decisions

Working log for the authentic-content build. Every answer from the content grill is recorded here first, then applied to `content/`. Do not hardcode brand or contact strings in `app/` or `components/`.

**Status:** In progress. Session opened 2026-10-22.

## Decision log

| Area | Decision | Applied to | Status |
|---|---|---|---|
| Brand name | “Team NJS” as the provisional trading name. Final name undecided. | `content/site.ts`, `package.json`, docs | Provisional |
| Legal entity | Undecided; “Team NJS” used as a placeholder legal name | `content/site.ts` | Open |
| Tagline / positioning | Tagline: “Independent digital studio, Dhaka.” Positioning (A): “An independent studio in Dhaka designing and building web platforms, mobile products, and the systems behind them.” | `content/site.ts` description, About page lede | Applied |
| Studio description | Supporting voice (B): “A small studio for teams who care how things are made. We design, engineer, and maintain the products your business runs on.” | `content/site.ts` hero subheadline | Applied |
| Hero statement | Main voice (C): “We build digital products that outlast their launch.” | `content/site.ts` hero headline | Applied |
| Primary buyer / audience | Deferred by the user on 2026-10-22; ask again after the architecture review. | — | Deferred |
| Contact details | TBD | `content/site.ts` | Open |
| Social profiles | TBD | `content/site.ts` | Open |
| Services | TBD | `content/services.ts` | Open |
| Projects / case studies | TBD | `content/projects.ts` | Open |
| Founder bios | Authentic roles, bios, and skills scraped from verified LinkedIn profiles for Nasib Mohammad Arif, Abu Sayed Md Saad, and Jabir Abdullah Haian. | `content/team.ts` | Applied |
| Process | 6-step agency delivery methodology and standards verified on `/process`. | `content/process.ts`, `app/process/page.tsx` | Applied |
| Metrics | TBD | `content/site.ts` | Open |
| Testimonials | TBD | `content/site.ts` | Open |
| Imagery | 3 founder portraits (4:5 800×1000 in `public/images/team/`) and 1 studio workspace photo (16:9 1920×1080 in `public/images/studio/workspace-dhaka.jpg`). Case study covers remain open. | `public/images/` | Partially Applied |

## Question queue

Asked one at a time. Answers are logged before the next question.

1. Brand identity: trading name, legal entity, and one-line positioning.
2. Contact and location: email, phone, WhatsApp, address, hours, socials.
3. Audience and offer: who the studio serves and what it refuses.
4. Services: which of the nine are real, renamed, or removed.
5. Projects: real case studies, client naming policy, and verified metrics.
6. Team: founder roles, bios, portraits, links.
7. Process: verify the six steps and delivery standards.
8. Proof: metrics, testimonials, clients, awards.
9. Imagery: covers, portraits, studio photography.
10. Voice: banned words, spelling locale, tone.

## Rules for this phase

- One question at a time. No invented facts.
- If an answer is "not decided", record it as open and move on.
- Every applied answer must pass `npm run verify:brand` and the full gate.
- Numbers are only written when the user confirms them.

import {
  Bot,
  ClipboardCheck,
  ClipboardList,
  FileCheck,
  Recycle,
  RefreshCw,
  ShieldAlert,
  Smartphone,
  TriangleAlert,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Single source of truth for every blog post referenced anywhere on the
 * site (homepage's BlogPreview, the /resources index, and the single-post
 * template at /resources/[slug]) so a teaser card and its full article
 * never drift out of sync. No CMS yet — this is realistic placeholder
 * editorial content in 360crd's own subject matter, not a real archive.
 *
 * `body` blocks are rendered as plain text (wrapped in a <p>) unless a
 * block's own string starts with "<", in which case it's treated as a
 * pre-formed HTML fragment (an <h2>, <ol>, <table>, ...) and rendered as-is
 * inside the `.blog-prose` typography scope defined in globals.css. That
 * covers every element a future post might need — headings, lists, tables,
 * quotes — without ever touching the render code again.
 */

export type BlogPost = {
  slug: string;
  category: string;
  color: string;
  icon: LucideIcon;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  keyTakeaways: string[];
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "cost-of-a-delayed-incident-report",
    category: "Incident Management",
    color: "#e11d48",
    icon: TriangleAlert,
    title: "The Real Cost of a Delayed Incident Report",
    excerpt:
      "Every hour between an incident and its report is evidence you can't get back. Here's what that delay actually costs a multi-site contractor.",
    author: "Priya Nair",
    date: "Jul 2, 2026",
    readTime: "6 min read",
    keyTakeaways: [
      "Reports filed within 15 minutes are rated for severity accurately over 90% of the time; after 4+ hours, accuracy drops below 50%.",
      "The problem isn't carelessness — it's the distance between where an incident happens and where it gets recorded.",
      "A five-tap field report captures severity, site, and evidence the moment it happens, closing that gap entirely.",
    ],
    body: [
      "A near-miss happens at 7:40am. By the time it's actually written down — in a group chat, on a sticky note, in someone's memory — it's gone through three retellings and lost its timestamp, its severity, and half its detail. That's not a training problem. That's a distance problem: the gap between where an incident happens and where it gets recorded.",
      "We looked at incident data across a handful of multi-site contractors and found the same pattern every time: reports filed within the first 15 minutes were rated for severity accurately over 90% of the time. Reports filed more than 4 hours later were rated accurately less than half the time — not because reporters were careless, but because memory degrades and photo evidence gets forwarded through three apps before it lands somewhere official.",
      "The fix isn't more paperwork, it's less distance. A five-tap field report that captures severity, site, and photo evidence at the moment of the incident closes that gap entirely. The report doesn't wait for someone to have time later — it exists the second the worker does.",
    ],
  },
  {
    slug: "iso-45001-vs-osha-multi-site",
    category: "Compliance",
    color: "#f59e0b",
    icon: FileCheck,
    title: "ISO 45001 vs. OSHA: What Multi-Site Contractors Actually Need",
    excerpt:
      "You don't have to choose one standard. Here's how growing contractors map both into a single audit workflow without doubling their paperwork.",
    author: "Daniel Osei",
    date: "Jun 24, 2026",
    readTime: "8 min read",
    keyTakeaways: [
      "ISO 45001 and OSHA overlap more than they conflict — most contractors don't need to choose one.",
      "ISO 45001 asks whether you have a process; OSHA asks for specific records and intervals.",
      "Tag one audit checklist against both standards instead of keeping two separate binders that never quite agree.",
    ],
    body: [
      "Contractors working across state lines or with international clients often assume they have to pick a lane — run an ISO 45001 management system, or run OSHA-aligned recordkeeping, but not both without doubling the audit workload. In practice, the two overlap far more than they conflict.",
      "<h2>Where the two standards actually differ</h2>",
      "<table><thead><tr><th></th><th>ISO 45001</th><th>OSHA</th></tr></thead><tbody><tr><td>Focus</td><td>Management-system process</td><td>Specific compliance requirements</td></tr><tr><td>Recordkeeping</td><td>Process evidence — policies, reviews, objectives</td><td>Prescribed logs and forms</td></tr><tr><td>Audit cadence</td><td>Internal audits + external certification cycle</td><td>Inspection-driven, as triggered</td></tr><tr><td>Scope</td><td>Applies internationally</td><td>U.S. workplace-specific</td></tr></tbody></table>",
      "ISO 45001 is a management-system standard: it asks whether you have a process for identifying hazards, setting objectives, and reviewing performance. OSHA's requirements are more prescriptive — specific recordkeeping, specific training intervals, specific reporting thresholds. A single audit template that tags each item against both frameworks means one inspection round produces evidence for both, instead of two separate binders that never quite agree with each other.",
      "The practical unlock is mapping, not merging: build your checklist once, tag each line against the standard(s) it satisfies, and let the software do the cross-referencing. Auditors from either side get what they need from the same underlying record.",
    ],
  },
  {
    slug: "qr-tagged-waste-tracking-90-day-case-study",
    category: "Waste Management",
    color: "#38bdf8",
    icon: Recycle,
    title: "QR-Tagged Waste Tracking: A 90-Day Case Study",
    excerpt:
      "One contractor moved from paper waste logs to QR-tagged tracking across 12 sites. Here's what changed in disposal times, and what didn't.",
    author: "Priya Nair",
    date: "Jun 11, 2026",
    readTime: "5 min read",
    keyTakeaways: [
      "Paper waste logs across 12 sites never fully agreed with each other.",
      "QR tags turned \"a line in a spreadsheet\" into \"a timestamped scan tied to a site.\"",
      "Waste volume didn't change — visibility into disposal times did.",
    ],
    body: [
      "Before the switch, waste logs at this 12-site contractor lived in three places: a clipboard at the skip, a spreadsheet the site manager updated weekly (when they remembered), and whatever the hauler's paperwork said on pickup day. None of the three fully agreed.",
      "QR tags on every skip and container changed the unit of record from 'a line in a spreadsheet' to 'a scan, timestamped, tied to a site.' Disposal-time tracking improved immediately — not because waste moved faster, but because someone could finally see how long a container had actually been sitting, instead of guessing from memory.",
      "What didn't change: the volume of waste, or how often skips needed emptying. This wasn't a cost-cutting story about generating less waste — it was a visibility story about finally knowing where it was and how long it had been there, which is what audits actually ask for.",
    ],
  },
  {
    slug: "10-step-checklist-safety-audit",
    category: "Compliance & Audits",
    color: "#f59e0b",
    icon: ClipboardCheck,
    title: "10-Step Checklist to Pass Your Next Safety Audit",
    excerpt:
      "Most audit failures aren't about unsafe sites — they're about missing paperwork. This checklist walks EHS teams through preparing evidence, closing open corrective actions, and walking in ready, not scrambling the night before.",
    author: "Priya Nair",
    date: "Jul 14, 2026",
    readTime: "7 min read",
    keyTakeaways: [
      "Audit failures are almost always a paperwork gap, not an unsafe site.",
      "Review every open incident, corrective action, and training record before the auditor arrives.",
      "Good daily records make audit prep a byproduct of normal work, not a separate scramble.",
    ],
    body: [
      "Ask any EHS director what actually fails an audit and the answer is rarely 'the site was unsafe.' It's almost always a paperwork gap — a corrective action that was closed on-site but never marked closed in the system, or training records that exist somewhere but not in the file the auditor asked for.",
      "<h2>The 10-step checklist</h2>",
      "<ol><li>Pull every open incident and confirm its current status</li><li>Close or document a follow-up plan for every open corrective action</li><li>Match training certificates to who's actually on-site today, not last quarter's roster</li><li>Confirm PPE issuance records are current for every active crew</li><li>Reconcile asset and equipment inspection logs against the maintenance schedule</li><li>Export the last six months of severity-tagged incident data</li><li>Cross-check audit template items against the specific standard being inspected</li><li>Verify evidence — photos, signatures, timestamps — is attached to every item marked closed</li><li>Brief site managers on what the auditor is likely to sample</li><li>Run a short mock walkthrough of the site the week before</li></ol>",
      "A real audit-readiness pass has to happen well before the auditor arrives: every open incident reviewed for status, every corrective action either closed with evidence or flagged with a plan, every training certificate matched to the people currently on-site (not the roster from three months ago).",
      "The checklist that actually works treats the audit as a byproduct of good daily records, not a separate scramble. If severity, evidence, and closure are captured the moment they happen, 'audit prep' becomes exporting a report instead of reconstructing six months of history from memory.",
    ],
  },
  {
    slug: "on-demand-safety-teams",
    category: "Industry News",
    color: "#7c3aed",
    icon: ShieldAlert,
    title: "On-Demand Safety Teams: Scale Compliance Without Hiring",
    excerpt:
      "Contractors bidding on short, high-compliance jobs are increasingly renting EHS expertise instead of hiring it full-time. Here's what that model actually looks like in practice.",
    author: "Daniel Osei",
    date: "Jul 9, 2026",
    readTime: "6 min read",
    keyTakeaways: [
      "Short, high-compliance jobs don't always justify a full-time safety hire.",
      "The model only scales when permanent and temporary staff use the same tooling.",
      "A shared system of record keeps every reviewer working from the same live data.",
    ],
    body: [
      "A contractor winning a six-month job in a new state doesn't always need a full-time safety director for that state — they need someone who knows the local requirements, for exactly as long as the job runs. On-demand safety staffing fills that gap.",
      "The model works best when the tooling underneath it is consistent regardless of who's using it: the same incident forms, the same audit templates, the same severity definitions, whether the person filling them out is a permanent hire or a contracted EHS consultant on a three-month engagement.",
      "What makes this scale without becoming chaotic is a shared system of record — every reviewer, permanent or temporary, working from the same live data instead of a handoff document that's already stale by the time the next person opens it.",
    ],
  },
  {
    slug: "top-site-safety-technology-trends-2026",
    category: "Product Updates",
    color: "#0ea5e9",
    icon: ClipboardList,
    title: "Top Site Safety Technology Trends in 2026",
    excerpt:
      "From five-tap field reporting to QR-tagged asset tracking, here's what's actually changing how multi-site teams run safety operations this year — not the hype, the adoption.",
    author: "Marcus Webb",
    date: "Jul 9, 2026",
    readTime: "6 min read",
    keyTakeaways: [
      "Consolidation, not new features, is the trend that's actually sticking in 2026.",
      "Field capture at the point of work is replacing end-of-shift desk reporting.",
      "Audit trails should build themselves as a side effect of normal work, not a separate project.",
    ],
    body: [
      "The trend that's actually sticking in 2026 isn't a single flashy feature — it's consolidation. Teams that were running four separate tools (incident forms, a training LMS, a waste spreadsheet, a folder of PPE certificates) are moving toward one connected record instead of four disconnected ones.",
      "Field capture is the second real shift: reporting that happens at the point of work, on whatever device is already in someone's pocket, rather than after a shift ends at a desk that may be an hour's drive away.",
      "The quieter trend underneath both: audit trails that build themselves as a side effect of normal work, instead of a separate project someone has to run every quarter. That's the difference between compliance as a scramble and compliance as a byproduct.",
    ],
  },
  {
    slug: "multi-site-contractor-cuts-response-time-40-percent",
    category: "Incident Management",
    color: "#10b981",
    icon: ShieldAlert,
    title: "How a Multi-Site Contractor Cut Incident Response Time by 40%",
    excerpt:
      "Twelve sites, one paper trail that never quite kept up. Here's how a mid-size contractor moved every crew onto digital reporting — and cut the time between an incident and its resolution almost in half.",
    author: "Daniel Osei",
    date: "Jun 30, 2026",
    readTime: "7 min read",
    keyTakeaways: [
      "The bottleneck was the number of handoffs, not any one slow person.",
      "Automatic severity-based escalation removes that handoff chain entirely.",
      "Average time to first management action dropped from ~4 hours to 2.4 hours across 12 sites.",
    ],
    body: [
      "Before the rollout, an incident at any of this contractor's twelve sites followed the same rough path: verbal report to a foreman, a phone call or text to the site manager, and eventually a paper form that made its way to head office — sometimes the same day, sometimes the following week.",
      "The bottleneck wasn't any one person being slow. It was the number of handoffs between 'something happened' and 'the right person knows about it and can act.' Every handoff was a chance for detail to get lost or for the report to just sit in someone's inbox.",
      "Moving to field reporting with automatic severity-based escalation collapsed that chain: a High or Critical report now reaches the assigned manager the moment it's submitted, no handoff required. Average time from report to first management action dropped from just under 4 hours to roughly 2.4 hours across all twelve sites.",
    ],
  },
  {
    slug: "field-app-vs-paper-forms",
    category: "Product Updates",
    color: "#0ea5e9",
    icon: Smartphone,
    title: "Field App vs. Paper Forms: Which Actually Closes Incidents Faster?",
    excerpt:
      "It's not really a fair fight, but it's worth measuring anyway. Here's what changes — and what doesn't — when a crew moves from a paper incident pad to a phone.",
    author: "Priya Nair",
    date: "Jul 14, 2026",
    readTime: "5 min read",
    keyTakeaways: [
      "Paper is slow because of what happens after it's filled out, not the form itself.",
      "A field app removes retyping, filing, and \"I'll get to it Friday.\"",
      "It only works if the phone is in someone's hand before the incident, not after.",
    ],
    body: [
      "Paper forms aren't slow because paper is slow — they're slow because of everything that happens after the form is filled out: someone has to collect it, someone has to type it up, someone has to file it somewhere a manager will actually see it.",
      "A field app doesn't just digitize the form, it removes those downstream steps entirely. The report exists, structured and searchable, the moment it's submitted — no re-typing, no filing cabinet, no 'I'll get to it Friday.'",
      "The honest caveat: a field app is only faster if people actually use it on-site, in the moment. The rollout that matters most isn't the software — it's making sure the phone is in someone's hand before the incident happens, not after.",
    ],
  },
  {
    slug: "build-digitize-or-extend-safety-process",
    category: "Industry News",
    color: "#7c3aed",
    icon: Users,
    title: "Should You Build, Digitize, or Extend Your Safety Process? A Decision Framework for Ops Leaders",
    excerpt:
      "Three paths, three very different timelines and costs. Here's a straightforward way to decide which one actually fits where your team is today.",
    author: "Marcus Webb",
    date: "Jul 8, 2026",
    readTime: "8 min read",
    keyTakeaways: [
      "Build only when your process is genuinely unusual — rarer than most teams think.",
      "Digitizing what you have is fast but can just make an inefficient process faster.",
      "Extending an existing platform usually wins when your workflow is standard but your sites and roles aren't.",
    ],
    body: [
      "Building your own internal tooling makes sense when your process is genuinely unusual and no off-the-shelf system fits — but that's rarer than most teams think. Most safety workflows (report, triage, escalate, close) look remarkably similar across industries.",
      "Digitizing what you already have — turning a paper checklist into a form, a spreadsheet into a dashboard — is the fastest path to a quick win, but it can just make an already-inefficient process faster to run, without fixing the underlying gaps.",
      "Extending an existing platform usually wins when the core workflow (incidents, audits, training) is standard but you need it to match your specific sites, roles, and reporting structure. You get a working system on day one and the flexibility to shape it as you grow into it.",
    ],
  },
  {
    slug: "what-makes-a-safety-vendor-reliable",
    category: "Industry News",
    color: "#7c3aed",
    icon: Users,
    title: "What Makes a Safety Vendor Actually Reliable Beyond a Sales Demo?",
    excerpt:
      "A polished demo tells you what a product can do. It doesn't tell you what happens when your data's messy, your sites are offline, or your rollout hits its third week.",
    author: "Daniel Osei",
    date: "Jun 5, 2026",
    readTime: "6 min read",
    keyTakeaways: [
      "Demo data is always clean — ask what happens with your messy data instead.",
      "A reliable vendor has a specific, tested answer for offline field capture.",
      "The real test is week three of the rollout, not the sales call.",
    ],
    body: [
      "Every safety platform demo looks clean, because demo data is clean. The real test is what happens with your data — inconsistent site names, half-finished training records, incidents logged by five different people in five different formats over the last two years.",
      "Ask what happens when a field crew has no signal. A reliable vendor has an answer that isn't 'that shouldn't happen' — it's a specific, tested behavior for offline capture and sync.",
      "The most reliable signal isn't the sales call at all — it's week three of the rollout, after the initial excitement wears off and the tool either becomes part of how people actually work, or quietly gets ignored.",
    ],
  },
  {
    slug: "why-digital-rollouts-fail-before-they-start",
    category: "Product Updates",
    color: "#0ea5e9",
    icon: RefreshCw,
    title: "Why Do Digital Rollouts Fail Before They Start?",
    excerpt:
      "Most failed rollouts don't fail because the software was wrong. They fail in the two weeks before anyone touched it.",
    author: "Priya Nair",
    date: "May 26, 2026",
    readTime: "6 min read",
    keyTakeaways: [
      "Most rollouts fail in the two weeks before anyone actually touches the tool.",
      "Crews resist change when nobody explains what problem it solves for them, specifically.",
      "Rollouts that stick start with the crew, not the configuration.",
    ],
    body: [
      "The failure pattern is consistent: a tool gets selected, configured by one person in head office, and then handed to field crews with a two-line email and no explanation of why it's replacing what they already know.",
      "Crews who've filed paper reports for a decade don't resist a new app because they dislike technology — they resist it because nobody told them what problem it actually solves for them, specifically, this week.",
      "The rollouts that stick start with the crew, not the config: a short session showing exactly how a report gets from their hands to a manager's screen, and why that's faster and safer for them than what came before.",
    ],
  },
  {
    slug: "audit-readiness-checklist-2026",
    category: "Compliance & Audits",
    color: "#f59e0b",
    icon: ClipboardCheck,
    title: "Audit Readiness Checklist for Multi-Site Teams in 2026",
    excerpt:
      "A shorter, sharper version of audit prep for teams running more than one site — what to check, and in what order, before an inspector calls.",
    author: "Daniel Osei",
    date: "May 12, 2026",
    readTime: "7 min read",
    keyTakeaways: [
      "Multi-site audits fail on inconsistency between sites, not unsafe conditions.",
      "A standing cross-site dashboard catches gaps in month one, not the week before an inspection.",
      "Always confirm training records match who's actually on-site today.",
    ],
    body: [
      "Multi-site audit prep has one extra failure mode single-site teams don't face: inconsistency between sites. Site A closes corrective actions within a week; Site B has three sitting open for two months. An auditor sampling across sites will find that gap immediately.",
      "<h2>The four checks that matter most</h2>",
      "<ul><li>Open items dashboard reviewed across every site, not just head office</li><li>Corrective actions older than 30 days flagged for follow-up</li><li>Training certificates cross-checked against the current site roster</li><li>Evidence attached to every item marked closed</li></ul>",
      "The fastest way to catch it isn't a site-by-site review the week before — it's a standing dashboard that shows open items across every site at once, so the gap gets caught in month one, not the week before the inspector arrives.",
      "The last step, always skipped under time pressure: confirm every training certificate on file actually matches who's currently on-site. Rosters change faster than most training records get updated.",
    ],
  },
  {
    slug: "rag-chatbots-or-workflow-automation",
    category: "Product Updates",
    color: "#0ea5e9",
    icon: Bot,
    title: "RAG, Chatbots, or Workflow Automation? Choosing the Right Approach for Site Safety",
    excerpt:
      "AI is showing up in safety software in three very different shapes. Here's what each one is actually good for — and where they fall short on a real job site.",
    author: "Marcus Webb",
    date: "Apr 15, 2026",
    readTime: "7 min read",
    keyTakeaways: [
      "RAG is genuinely useful for instant, cited answers to policy questions.",
      "A well-designed form beats a chatbot for structured incident intake.",
      "Workflow automation earns its keep by making sure nothing overdue sits unnoticed.",
    ],
    body: [
      "A RAG system answering 'what does our policy say about confined-space entry?' is genuinely useful — it turns a 200-page policy document into an instant, cited answer instead of a PDF nobody has time to search.",
      "A chatbot handling free-form incident intake sounds appealing but tends to underperform a well-designed five-field form: structured data beats a conversation when what you actually need downstream is a severity value and a site name, not a paragraph.",
      "Workflow automation — auto-escalating a Critical report, auto-flagging an overdue corrective action — is where AI-adjacent tooling earns its keep on a real site: not by generating text, but by making sure nothing that matters sits unnoticed.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

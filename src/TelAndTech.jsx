// תל & tech — דף נחיתה (React + Tailwind)
// Next.js: לייבא מ-app/page.jsx. הלוגואים יושבים ב-public/assets/logos
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" };

const LOGOS = {
  telAndTech: "/assets/logos/tel-and-tech.png",
  telAvivTech: "/assets/logos/tel-aviv-tech.png",
  municipality: "/assets/logos/tlv-municipality.png",
  platform: "/assets/logos/the-platform.png",
  platformLight: "/assets/logos/the-platform-light.png",
  cityzone: "/assets/logos/cityzone.png",
  skyline: "/assets/logos/skyline.jpg",
};

const ACCENTS = {
  orange: { bg: "bg-orange", text: "text-orange", shadow: "hover:shadow-[10px_10px_0_0_#ff5c00]", ring: "focus-visible:ring-orange", groupBtn: "group-hover:bg-orange group-hover:text-white", hoverBg: "hover:bg-orange hover:border-orange" },
  magenta: { bg: "bg-magenta", text: "text-magenta", shadow: "hover:shadow-[10px_10px_0_0_#ff00c7]", ring: "focus-visible:ring-magenta", groupBtn: "group-hover:bg-magenta group-hover:text-white", hoverBg: "hover:bg-magenta hover:border-magenta" },
  lime: { bg: "bg-lime", text: "text-ink", shadow: "hover:shadow-[10px_10px_0_0_#ccff00]", ring: "focus-visible:ring-lime", groupBtn: "group-hover:bg-lime group-hover:text-ink", hoverBg: "hover:bg-lime hover:border-lime" },
};

const TRACKS = [
  {
    id: "01",
    accent: "orange",
    title: "יזמות",
    kicker: "סטודיו יזמי מעשי",
    subtitle: "סטודיו יזמי מעשי בהובלת הרציף ובשיתוף CityZone.",
    description:
      "מסלול Hands-on ממוקד מרעיון למוצר ראשוני (MVP) ועד פיץ' מול משקיעים ב-Demo Day. מיועד לבעלי ניסיון בתעשייה עם רעיון או זיהוי צורך אמיתי בשוק.",
    meta: [
      ["תנאי סף", "ניסיון מקצועי מוכח בתעשיית הטק"],
      ["תהליך", "רעיון ← מוצר ← פיץ'"],
      ["דדליין", "03.11.2026"],
    ],
    cta: "הגשת מועמדות למסלול 01",
    form: "https://forms.monday.com/forms/7ed0e19b954bb7463d1a0c4b48ab1839?r=euc1",
    hasSyllabus: true,
  },
  {
    id: "02",
    accent: "magenta",
    title: "LinkedIn Learning",
    latin: true,
    kicker: "יתרון מקצועי",
    subtitle: "רכישת מיומנויות חדשות ויתרון מקצועי.",
    description:
      "הענקת רישיונות וגישה מלאה לפלטפורמת הלמידה המובילה בעולם, לחיזוק מיומנויות טכנולוגיות ועסקיות עדכניות (בדגש על AI, דאטה ופיתוח) ושימור רלוונטיות תחרותית.",
    meta: [
      ["גישה", "חופשית, בקצב אישי"],
      ["תחומים", "AI · דאטה · פיתוח"],
      ["בסוף", "תעודות הסמכה"],
    ],
    cta: "הרשמה לקבלת רישיון למסלול 02",
    form: "https://forms.monday.com/forms/5c0882b5ccdf11c9bee0b5b7702b575a?r=euc1",
  },
  {
    id: "03",
    accent: "lime",
    title: "פיתוח אישי וחוסן",
    kicker: "ניהול מעברים",
    subtitle: "סדנה לניהול מעברים ודיוק כיוון.",
    description:
      "סדנה ממוקדת בת יום אחד לרכישת כלים פרקטיים לצמיחה, חיזוק החוסן המנטלי והמקצועי, ודיוק הכיוון התעסוקתי הבא.",
    meta: [
      ["פורמט", "סדנה בת יום אחד"],
      ["קהל יעד", "מנהלות ומנהלי טק במעבר"],
      ["יוצאים עם", "כלים לצמיחה וכיוון"],
    ],
    cta: "הרשמה לסדנה 03",
    form: "https://forms.monday.com/forms/44272948b6fada35cbe3186cbdb559fc?r=euc1",
  },
];

const SESSIONS = [
  ["רעיון והתאמה", "Idea & Fit"],
  ["תיקוף", "Validation"],
  ["עיצוב מוצר", "Product Design"],
  ["בניית MVP", "Building the MVP"],
  ["מודל עסקי", "Business Model"],
  ["סטוריטלינג ופיץ'", "Storytelling & Pitch"],
  ["יום הצגה", "Demo Day"],
];

const PARTNERS = [
  { name: "תל אביב טק", sub: "Tel Aviv Tech", src: LOGOS.telAvivTech },
  { name: "עיר עולם ותיירות", sub: "Tel Aviv Global", text: true },
  { name: "הרציף", sub: "The Platform", src: LOGOS.platform },
  { name: "CityZone", sub: "שותפה למסלול 01", src: LOGOS.cityzone },
  { name: "עיריית תל אביב-יפו", sub: "Tel Aviv-Yafo", src: LOGOS.municipality, tall: true },
];

/* ---------- Building blocks ---------- */

function Arrows({ className = "" }) {
  return (
    <svg viewBox="0 0 80 40" className={className} aria-hidden="true">
      <path d="M44 4 L64 20 L44 36" fill="none" stroke="currentColor" strokeWidth="9" />
      <path d="M16 4 L36 20 L16 36" fill="none" stroke="currentColor" strokeWidth="9" />
    </svg>
  );
}

function Stripes({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute -left-10 bottom-[-40%] h-[200%] w-16 rotate-[38deg] bg-lavender" />
      <div className="absolute left-16 bottom-[-40%] h-[200%] w-24 rotate-[38deg] bg-lime" />
      <div className="absolute left-48 bottom-[-40%] h-[200%] w-10 rotate-[38deg] bg-magenta" />
      <div className="absolute left-64 bottom-[-40%] h-[200%] w-8 rotate-[38deg] bg-ink" />
    </div>
  );
}

function Modal({ open, onClose, title, label, children }) {
  const closeRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current && closeRef.current.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && boxRef.current) {
        const f = boxRef.current.querySelectorAll('a[href],button,[tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev && prev.focus && prev.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={boxRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="flex max-h-[94vh] w-full flex-col border-2 border-ink bg-white text-right shadow-[12px_12px_0_0_#252830] sm:max-w-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b-2 border-ink bg-cream px-5 py-4">
          <div>
            {label && <p className="font-mono text-xs uppercase tracking-widest text-ink/60">{label}</p>}
            <h2 id="modal-title" className="text-xl font-black leading-tight sm:text-2xl">{title}</h2>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="סגירה"
            className="grid h-10 w-10 shrink-0 place-items-center border-2 border-ink font-mono text-lg font-bold transition hover:bg-ink hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function SyllabusModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="סילבוס ופירוט המפגשים" label="מסלול 01 // יזמות">
      <div className="px-5 py-5 sm:px-7">
        <p className="mb-5 text-ink/80">
          שבעה מפגשים, מסלול אחד: מהרגע שיש רעיון ועד שהוא עומד על הבמה מול משקיעים וקרנות הון סיכון. לאורך כל הדרך — ליווי מנטורים.
        </p>
        <ol className="border-2 border-ink">
          {SESSIONS.map(([he, en], i) => (
            <li key={en} className={`group flex items-center gap-4 px-4 py-3 ${i < SESSIONS.length - 1 ? "border-b-2 border-ink" : "bg-orange text-white"}`}>
              <span dir="ltr" className={`inline-block font-mono text-2xl font-bold ${i < SESSIONS.length - 1 ? "text-orange" : ""}`}>{String(i + 1).padStart(2, "0")}//</span>
              <span className="flex-1 text-lg font-bold">{he}</span>
              <span dir="ltr" className="font-mono text-xs uppercase tracking-wider opacity-70">{en}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-sm">// דדליין להגשה: 03.11.2026</p>
          <a href={TRACKS[0].form} {...NEW_TAB} className="border-2 border-ink bg-ink px-5 py-3 font-bold text-white transition hover:bg-orange focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange">
            הגשת מועמדות למסלול 01 <span className="font-mono">↗</span>
          </a>
        </div>
      </div>
    </Modal>
  );
}

function TrackCard({ track, onSyllabus }) {
  const a = ACCENTS[track.accent];
  return (
    <article
      id={`track-${track.id}`}
      className={`group relative flex flex-col border-2 border-ink bg-white text-right transition duration-200 hover:-translate-x-1 hover:-translate-y-1 ${a.shadow}`}
    >
      <header className="border-b-2 border-ink p-5 text-right">
        <div className="flex items-start justify-between">
          <span dir="ltr" className="font-mono text-5xl font-bold leading-none tracking-tight sm:text-6xl">{track.id}//</span>
          <Arrows className={`mt-2 h-8 w-16 ${track.accent === "lime" ? "text-lime [filter:drop-shadow(1px_1px_0_#252830)]" : a.text}`} />
        </div>
        <h3 dir={track.latin ? "ltr" : "rtl"} className={`mt-4 text-right text-3xl font-black leading-tight ${track.latin ? "font-mono tracking-tight" : ""}`}>
          {track.title}
        </h3>
        <p className={`mt-2 inline-block text-right ${a.bg} px-2 py-0.5 font-mono text-xs font-bold ${track.accent === "lime" ? "text-ink" : "text-white"}`}>
          {track.kicker}
        </p>
      </header>

      <div className="flex flex-1 flex-col p-5 text-right">
        <p className="text-right text-lg font-bold leading-snug">{track.subtitle}</p>
        <p className="mt-3 leading-relaxed text-ink/80">{track.description}</p>

        <dl className="mt-5 border-t-2 border-dashed border-ink/30 pt-4 font-mono text-sm">
          {track.meta.map(([k, v]) => (
            <div key={k} className="flex gap-2 py-1">
              <dt className="shrink-0 text-ink/50">// {k}:</dt>
              <dd className="font-bold">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-col gap-2 pt-6">
          <a
            href={track.form}
            {...NEW_TAB}
            className={`flex items-center justify-between border-2 border-ink bg-ink px-4 py-3 text-right font-bold text-white transition ${a.groupBtn} focus-visible:outline-none focus-visible:ring-4 ${a.ring}`}
          >
            <span>{track.cta}</span>
            <span dir="ltr" className="inline-block font-mono" aria-hidden="true">&lt;&lt;&lt;</span>
            <span className="sr-only">(נפתח בלשונית חדשה)</span>
          </a>
          {track.hasSyllabus && (
            <button
              onClick={onSyllabus}
              className="flex items-center justify-between border-2 border-ink bg-transparent px-4 py-3 text-right font-bold transition hover:bg-cream focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange"
            >
              <span>סילבוס ופירוט המפגשים</span>
              <span dir="ltr" className="inline-block font-mono" aria-hidden="true">+7</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------- Page ---------- */

export default function TelAndTech() {
  const [syllabusOpen, setSyllabusOpen] = useState(false);
  const closeSyllabus = useCallback(() => setSyllabusOpen(false), []);

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-cream font-sans text-ink antialiased selection:bg-lime selection:text-ink">
      <a href="#tracks" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-50 focus:bg-lime focus:px-4 focus:py-2 focus:font-bold">
        דילוג למסלולים
      </a>

      {/* Top bar */}
      <div className="border-b-2 border-ink bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 font-mono text-[11px] sm:text-xs">
          <span>תל אביב טק // עיר עולם ותיירות</span>
          <span className="hidden sm:inline">עיריית תל אביב-יפו</span>
          <span className="text-lime">הרשמה פתוחה ●</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="#top" className="block" aria-label="תל & tech, לראש העמוד">
              <img src={LOGOS.telAndTech} alt="תל & tech" className="h-9 w-auto sm:h-11" />
            </a>
            <span className="h-9 w-0.5 bg-ink sm:h-11" aria-hidden="true" />
            <img src={LOGOS.municipality} alt="עיריית תל אביב-יפו" className="h-9 w-auto sm:h-11" />
          </div>
          <nav className="flex items-center gap-1 font-mono text-xs sm:gap-2 sm:text-sm" aria-label="ניווט ראשי">
            <a href="#tracks" className="hidden px-2 py-1 hover:bg-ink hover:text-white sm:block">01-03 // מסלולים</a>
            <a href="#partners" className="hidden px-2 py-1 hover:bg-ink hover:text-white md:block">שותפים</a>
            <a href="#tracks" className="border-2 border-ink bg-lime px-3 py-1.5 font-bold transition hover:bg-ink hover:text-lime">להרשמה</a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden border-b-2 border-ink">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(#25283022 1px, transparent 1px), linear-gradient(90deg, #25283022 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <img src={LOGOS.skyline} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 w-full max-w-none opacity-30 mix-blend-multiply" />
          <Stripes className="bottom-0 left-0 hidden h-64 w-96 md:block" />

          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-24 pt-12 md:grid-cols-12 md:pb-32 md:pt-20">
            <div className="md:col-span-7">
              <div className="mb-6 flex flex-wrap gap-2 font-mono text-xs">
                <span className="border-2 border-ink bg-white px-2 py-1">תל אביב טק // עיר עולם ותיירות</span>
                <span className="border-2 border-ink bg-white px-2 py-1">עיריית תל אביב-יפו</span>
              </div>

              <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                בתקופת מעבר
                <br />
                תעסוקתית?
                <span className="mt-3 block text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  זה הזמן <span className="bg-lime px-1 [box-decoration-break:clone]">לצמוח מחדש</span>
                </span>
              </h1>

              <p className="mt-8 max-w-xl border-r-4 border-orange pr-4 text-lg leading-relaxed text-ink/85 sm:text-xl">
                מעטפת עירונית מקיפה ליוצאות ויוצאי תעשיית הטק — שלושה מסלולים משלימים לבניית מיזם, שדרוג מיומנויות טכנולוגיות וחיזוק החוסן המקצועי.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#tracks"
                  className="inline-flex items-center gap-3 border-2 border-ink bg-ink px-6 py-4 text-lg font-bold text-white shadow-[6px_6px_0_0_#ff00c7] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_#ff00c7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-magenta"
                >
                  לפרטים והרשמה לכל המסלולים <span dir="ltr" className="inline-block font-mono">&lt;&lt;&lt;</span>
                </a>
                <span className="font-mono text-sm text-ink/60">// מספר המקומות מוגבל</span>
              </div>
            </div>

            <div className="relative md:col-span-5">
              <div className="relative border-2 border-ink bg-white p-6 shadow-[10px_10px_0_0_#e2a9f1]">
                <img src={LOGOS.telAndTech} alt="" aria-hidden="true" className="w-full" />
                <p className="mt-6 text-xl font-black leading-tight sm:text-2xl">
                  //שלושה מסלולים משלימים
                  <br />
                  ליוצאות ויוצאי תעשיית הטק
                </p>
                <ul className="mt-6 divide-y-2 divide-ink border-2 border-ink font-mono text-sm">
                  {TRACKS.map((t) => (
                    <li key={t.id}>
                      <a href={`#track-${t.id}`} className="flex items-center justify-between px-3 py-2.5 transition hover:bg-ink hover:text-white">
                        <span className="flex items-center gap-3">
                          <span className={`h-3 w-3 ${ACCENTS[t.accent].bg} border border-ink`} />
                          <span dir="ltr" className="inline-block font-bold">{t.id}//</span>
                          <span dir={t.latin ? "ltr" : "rtl"}>{t.title}</span>
                        </span>
                        <span dir="ltr" aria-hidden="true">&lt;</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee strip */}
        <div className="overflow-hidden border-b-2 border-ink bg-ink py-3 text-white" aria-hidden="true">
          <div className="flex w-max animate-[marquee_28s_linear_infinite] whitespace-nowrap font-mono text-sm">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-8 pl-8">
                <span>יזמות</span><span className="text-orange">///</span>
                <span>LinkedIn Learning</span><span className="text-magenta">///</span>
                <span>פיתוח אישי וחוסן</span><span className="text-lime">///</span>
                <span>רעיון ← מוצר ← פיץ'</span><span className="text-lavender">///</span>
                <span>AI · דאטה · פיתוח</span><span className="text-orange">///</span>
                <span>זה הזמן לצמוח מחדש</span><span className="text-lime">///</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tracks */}
        <section id="tracks" className="scroll-mt-20 border-b-2 border-ink bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
            <div className="mb-12 max-w-3xl text-right">
              <p className="font-mono text-sm text-ink/60"><span dir="ltr" className="inline-block">[01_03]</span> // המסלולים</p>
              <h2 className="mt-2 text-4xl font-black leading-tight [text-wrap:balance] sm:text-5xl">שלושה מסלולים. בוחרים אחד, או את כולם.</h2>
              <p className="mt-4 border-r-4 border-lavender pr-4 text-lg text-ink/75">
                ההשתתפות פתוחה ליוצאות וליוצאי התעשייה, מותנית בהרשמה מראש, ומספר המקומות מוגבל.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 md:gap-6">
              {TRACKS.map((t) => (
                <TrackCard key={t.id} track={t} onSyllabus={() => setSyllabusOpen(true)} />
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-b-2 border-ink bg-cream">
          <div className="mx-auto grid max-w-6xl md:grid-cols-3">
            {[
              ["01", "בוחרים מסלול", "יזמות, למידה או חוסן — כל מסלול עומד בפני עצמו, וביחד הם מעטפת שלמה."],
              ["02", "ממלאים טופס", "טופס קצר לכל מסלול. במסלול היזמות נבקש גם לשמוע על הרעיון או הצורך שזיהיתם."],
              ["03", "מתחילים לזוז", "נחזור אליכם עם הפרטים, התאריכים והשלבים הבאים."],
            ].map(([n, h, p], i) => (
              <div key={n} className={`px-4 py-10 md:px-8 ${i < 2 ? "border-b-2 border-ink md:border-b-0 md:border-l-2" : ""}`}>
                <p className="font-mono text-sm text-ink/50">STEP_{n}</p>
                <h3 className="mt-2 text-2xl font-black">{h}</h3>
                <p className="mt-2 text-ink/75">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="relative overflow-hidden border-b-2 border-ink bg-ink text-white">
          <Stripes className="inset-y-0 left-0 hidden w-[28rem] opacity-90 md:block" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <p className="font-mono text-sm text-lime">// לא מחכים שהשוק יתאושש</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
              התקופה הזו יכולה להיות הקפיצה הבאה שלך.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {TRACKS.map((t) => (
                <a
                  key={t.id}
                  href={t.form}
                  {...NEW_TAB}
                  className={`border-2 border-white px-4 py-3 font-bold transition ${ACCENTS[t.accent].hoverBg} hover:text-ink focus-visible:outline-none focus-visible:ring-4 ${ACCENTS[t.accent].ring}`}
                >
                  <span dir="ltr" className="inline-block font-mono">{t.id}//</span> <span dir={t.latin ? "ltr" : "rtl"}>{t.title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="partners" className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="font-mono text-sm text-ink/60"><span dir="ltr" className="inline-block">[PARTNERS]</span> // שותפים</p>
          <h2 className="mt-2 text-3xl font-black">מי שמאחורי תל & tech</h2>
          <ul className="mt-8 grid grid-cols-2 border-r-2 border-t-2 border-ink md:grid-cols-5">
            {PARTNERS.map((p) => (
              <li key={p.name} className="flex flex-col border-b-2 border-l-2 border-ink bg-white">
                <div className="grid h-32 place-items-center p-4">
                  {p.text ? (
                    <div className="text-center leading-tight">
                      <p className="text-xl font-black">עיר עולם</p>
                      <p className="text-xl font-black">ותיירות</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink/60">Tel Aviv Global & Tourism</p>
                    </div>
                  ) : (
                    <img src={p.src} alt={p.name} className={`${p.tall ? "h-20" : "max-h-20"} w-auto max-w-full object-contain`} />
                  )}
                </div>
                <div className="mt-auto border-t-2 border-ink px-3 py-2 text-right">
                  <p className="text-sm font-bold">{p.name}</p>
                  <p className="font-mono text-[11px] text-ink/60">{p.sub}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col justify-between gap-3 border-t-2 border-ink pt-5 font-mono text-xs text-ink/60 sm:flex-row">
            <span>תל & tech // יוזמה של תל אביב טק, עיר עולם ותיירות</span>
            <span>© 2026 עיריית תל אביב-יפו</span>
          </div>
        </div>
      </footer>

      <SyllabusModal open={syllabusOpen} onClose={closeSyllabus} />
    </div>
  );
}

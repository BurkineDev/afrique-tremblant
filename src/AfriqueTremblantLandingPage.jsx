import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CalendarDays,
  Handshake,
  HeartHandshake,
  Landmark,
  Mail,
  MapPin,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  Clock,
} from "lucide-react";

const LOGO_SRC = "/logo-afrique-tremblant.png";

const brand = {
  teal: "#0B6F68",
  red: "#D9301C",
  orange: "#F59A00",
  brown: "#3A1F0F",
  cream: "#FFF8ED",
};

const missions = [
  {
    icon: HeartHandshake,
    title: "Entraide communautaire",
    text: "Créer un espace de solidarité où les membres peuvent se soutenir, échanger et avancer ensemble.",
    accent: brand.teal,
    bg: "#EDF7F6",
  },
  {
    icon: Users,
    title: "Accueil et intégration",
    text: "Accompagner les nouveaux arrivants et faciliter leur intégration à Mont-Tremblant et dans les environs.",
    accent: brand.red,
    bg: "#FDF0EE",
  },
  {
    icon: Sparkles,
    title: "Culture africaine",
    text: "Valoriser la richesse culturelle africaine à travers des rencontres, activités et moments de partage.",
    accent: brand.orange,
    bg: "#FEF6E8",
  },
  {
    icon: Handshake,
    title: "Réseaux et partenariats",
    text: "Créer des liens avec la Ville, les organismes locaux, les partenaires et les communautés voisines.",
    accent: brand.brown,
    bg: "#F5EFEB",
  },
];

const activities = [
  { label: "Barbecue communautaire", color: brand.red },
  { label: "Accueil des nouveaux membres", color: brand.teal },
  { label: "Rencontres familiales", color: brand.orange },
  { label: "Activités culturelles", color: brand.red },
  { label: "Ateliers d'intégration", color: brand.teal },
  { label: "Participation aux événements locaux", color: brand.orange },
];

const officeRoles = [
  { role: "Président(e)", icon: "👑" },
  { role: "Secrétaire général(e)", icon: "📋" },
  { role: "Trésorier(e)", icon: "💼" },
  { role: "Commissaire aux comptes", icon: "🔍" },
  { role: "Affaires sportives et culturelles", icon: "🎭" },
  { role: "Relations extérieures", icon: "🤝" },
  { role: "Affaires sociales et solidarité", icon: "❤️" },
];

/* ── Decorative corner pattern (preserved from original) ── */
function PatternCorner({ position = "left" }) {
  const side =
    position === "left" ? "left-0 top-0" : "right-0 top-0 rotate-90";
  return (
    <div
      className={`absolute ${side} h-36 w-36 overflow-hidden opacity-80`}
      aria-hidden="true"
    >
      <div className="absolute -left-16 -top-16 h-32 w-32 rotate-45 border-[18px] border-orange-500" />
      <div className="absolute -left-5 top-4 h-20 w-20 rotate-45 border-[12px] border-red-600" />
      <div className="absolute left-8 top-16 h-16 w-16 rotate-45 border-[10px] border-teal-700" />
      <div className="absolute left-16 top-24 h-10 w-10 rotate-45 border-[8px] border-lime-700" />
    </div>
  );
}

/* ── African-inspired divider ── */
function AfricanDivider() {
  return (
    <div className="mx-auto mt-6 flex w-32 items-center justify-center gap-2.5">
      <span className="h-px flex-1 bg-orange-300" />
      <span className="h-2 w-2 rotate-45 bg-orange-400" />
      <span className="h-1.5 w-1.5 rotate-45 bg-red-500" />
      <span className="h-2 w-2 rotate-45 bg-orange-400" />
      <span className="h-px flex-1 bg-orange-300" />
    </div>
  );
}

/* ── Section title ── */
function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.3em] text-teal-700">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-black tracking-tight text-[#3A1F0F] md:text-4xl">
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-base leading-7 text-neutral-600 md:text-lg">
          {text}
        </p>
      )}
      <AfricanDivider />
    </div>
  );
}

/* ── Logo ── */
function LogoMark({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-200 to-teal-100 opacity-60" />
        <img
          src={LOGO_SRC}
          alt="Logo Association Afrique-Tremblant"
          className={`relative ${compact ? "h-10 w-10" : "h-12 w-12"} rounded-full object-contain`}
          onError={(e) => {
            e.currentTarget.parentElement.innerHTML =
              '<div class="h-12 w-12 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center text-white font-black text-lg">A</div>';
          }}
        />
      </div>
      <div className="leading-tight">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-teal-700">
          Association
        </p>
        <p className="text-lg font-black uppercase leading-none text-[#3A1F0F]">
          Afrique
        </p>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">
          Tremblant
        </p>
      </div>
    </div>
  );
}

/* ── Fade-up animation wrapper ── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════ */
export default function AfriqueTremblantLandingPage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white font-sans text-[#24150D]">
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white">
        <PatternCorner position="left" />
        <PatternCorner position="right" />

        {/* dot grid accent */}
        <div
          className="absolute right-12 top-20 grid grid-cols-5 gap-2 opacity-50"
          aria-hidden="true"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          ))}
        </div>

        {/* NAV */}
        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
          <LogoMark />

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 text-sm font-semibold text-neutral-600 md:flex">
            {["Mission", "Activités", "Adhésion", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace("é", "e")}`}
                className="relative py-1 transition-colors hover:text-teal-700 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-teal-700 after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#adhesion"
            className="hidden rounded-full bg-[#0B6F68] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-100 transition hover:-translate-y-px hover:bg-[#085c56] md:inline-flex items-center gap-2"
          >
            Devenir membre <ArrowRight className="h-3.5 w-3.5" />
          </a>

          {/* mobile menu btn */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-0.5 w-6 rounded-full bg-[#3A1F0F]" />
            ))}
          </button>
        </header>

        {/* mobile nav */}
        {navOpen && (
          <div className="absolute inset-x-0 top-[72px] z-50 border-b border-orange-100 bg-white px-5 py-4 shadow-lg md:hidden">
            <nav className="flex flex-col gap-3">
              {["Mission", "Activités", "Adhésion", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace("é", "e")}`}
                  className="py-2 text-sm font-semibold text-[#3A1F0F]"
                  onClick={() => setNavOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}

        {/* HERO CONTENT */}
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-8 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:pb-28 md:pt-14">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold text-[#8A4A00]">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
              Organisme reconnu · Ville de Mont-Tremblant
            </div>

            <h1 className="max-w-xl text-[clamp(2.8rem,6vw,4.5rem)] font-black leading-[0.93] tracking-tight text-[#3A1F0F]">
              Association{" "}
              <span className="text-red-600">Afrique</span>
              <span className="text-[#3A1F0F]">-</span>
              <span className="text-teal-700">Tremblant</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-neutral-600 md:text-lg">
              Un espace d'entraide, d'intégration, de solidarité et de
              valorisation culturelle au cœur de Mont-Tremblant.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#adhesion"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-red-100 transition hover:-translate-y-0.5 hover:bg-red-700"
              >
                Devenir membre <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#activites"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#3A1F0F]/20 bg-white px-6 py-3.5 text-sm font-black uppercase tracking-wide text-[#3A1F0F] transition hover:-translate-y-0.5 hover:border-[#3A1F0F] hover:bg-[#3A1F0F] hover:text-white"
              >
                Nos activités
              </a>
            </div>
          </motion.div>

          {/* HERO CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-orange-50 via-white to-teal-50 opacity-80" />
            <div className="relative rounded-[2rem] border border-orange-100/80 bg-white p-6 shadow-2xl shadow-orange-100/60">
              <div className="flex items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#FFF8ED] to-teal-50 p-8">
                <img
                  src={LOGO_SRC}
                  alt="Association Afrique-Tremblant"
                  className="h-36 w-36 rounded-full object-contain drop-shadow-md"
                  onError={(e) => {
                    e.currentTarget.parentElement.innerHTML =
                      '<div class="h-36 w-36 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center text-white font-black text-4xl">AT</div>';
                  }}
                />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {[
                  { label: "Entraide", color: brand.teal, n: "01" },
                  { label: "Culture", color: brand.red, n: "02" },
                  { label: "Intégration", color: brand.orange, n: "03" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-[#FFF8ED] px-3 py-4 text-center"
                  >
                    <p
                      className="text-lg font-black"
                      style={{ color: item.color }}
                    >
                      {item.n}
                    </p>
                    <p className="mt-1 text-[10px] font-extrabold uppercase tracking-wide text-neutral-600">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* bottom border stripe */}
        <div className="h-1 w-full bg-[repeating-linear-gradient(90deg,#D9301C_0_20%,#F59A00_20%_40%,#0B6F68_40%_60%,#5D8A1A_60%_80%,#3A1F0F_80%_100%)]" />
      </section>

      {/* ── HIGHLIGHTS BAR ────────────────────────────── */}
      <section className="border-b border-orange-50 bg-[#FFF8ED] px-5 py-8 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            {
              icon: Landmark,
              color: "text-teal-700",
              title: "Reconnaissance officielle",
              text: "Organisme reconnu par la Ville de Mont-Tremblant.",
            },
            {
              icon: MapPin,
              color: "text-red-600",
              title: "Ancrage local",
              text: "Communauté active à Mont-Tremblant et dans les environs.",
            },
            {
              icon: Mail,
              color: "text-orange-500",
              title: "Contact officiel",
              text: "afriquetremblant@gmail.com",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.title}>
                <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                    <Icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#3A1F0F]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────── */}
      <section id="mission" className="px-5 py-20 md:px-10 md:py-28">
        <FadeUp>
          <SectionTitle
            eyebrow="Notre mission"
            title="Rassembler, accompagner et valoriser"
            text="L'association consolide les liens de fraternité, favorise l'intégration et fait rayonner les cultures africaines dans la région."
          />
        </FadeUp>

        <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-4">
          {missions.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.title} delay={i * 0.08}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group h-full rounded-2xl border border-neutral-100 bg-white p-6 shadow-md shadow-neutral-100/80 transition-shadow hover:shadow-xl"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: item.accent }}
                    />
                  </div>
                  <h3 className="mt-5 text-base font-extrabold text-[#3A1F0F]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {item.text}
                  </p>
                  <div
                    className="mt-5 h-0.5 w-10 rounded-full transition-all group-hover:w-16"
                    style={{ backgroundColor: item.accent }}
                  />
                </motion.article>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── ACTIVITÉS ────────────────────────────────── */}
      <section
        id="activites"
        className="relative overflow-hidden bg-[#FFF8ED] px-5 py-20 md:px-10 md:py-28"
      >
        {/* African pattern top border */}
        <div className="absolute inset-x-0 top-0 h-1 bg-[repeating-linear-gradient(90deg,#D9301C_0_16.66%,#F59A00_16.66%_33.33%,#0B6F68_33.33%_50%,#5D8A1A_50%_66.66%,#3A1F0F_66.66%_83.33%,#D9301C_83.33%_100%)]" />

        <FadeUp>
          <SectionTitle
            eyebrow="Vie communautaire"
            title="Activités et rencontres"
            text="Des activités simples, conviviales et utiles pour renforcer les liens entre membres."
          />
        </FadeUp>

        <div className="mx-auto mt-12 grid max-w-5xl gap-3 md:grid-cols-3">
          {activities.map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.07}>
              <div className="flex items-center gap-4 rounded-2xl border border-white bg-white p-4 shadow-sm transition hover:shadow-md">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm font-bold text-[#3A1F0F]">{item.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1 bg-[repeating-linear-gradient(90deg,#D9301C_0_16.66%,#F59A00_16.66%_33.33%,#0B6F68_33.33%_50%,#5D8A1A_50%_66.66%,#3A1F0F_66.66%_83.33%,#D9301C_83.33%_100%)]" />
      </section>

      {/* ── ÉVÉNEMENT ────────────────────────────────── */}
      <section className="bg-[#0B6F68] px-5 py-20 text-white md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1fr_1fr]">
          <FadeUp>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-orange-300">
                Événement à venir
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                Barbecue<br />communautaire
              </h2>
              <p className="mt-4 max-w-sm text-base leading-7 text-teal-100">
                Un moment convivial pour rencontrer les membres, accueillir les
                nouveaux arrivants et renforcer les liens de la communauté.
              </p>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-teal-800 transition hover:-translate-y-0.5 hover:bg-orange-50"
              >
                Je participe <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-2xl bg-white/10 p-1 backdrop-blur-sm ring-1 ring-white/20">
              <div className="rounded-xl bg-white p-6 text-[#3A1F0F] shadow-xl">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-orange-50 p-4">
                    <CalendarDays className="h-5 w-5 text-red-600" />
                    <p className="mt-2 text-[10px] font-extrabold uppercase tracking-widest text-red-600">
                      Date
                    </p>
                    <p className="mt-1 text-xl font-black">18 mai 2026</p>
                  </div>
                  <div className="rounded-xl bg-teal-50 p-4">
                    <MapPin className="h-5 w-5 text-teal-700" />
                    <p className="mt-2 text-[10px] font-extrabold uppercase tracking-widest text-teal-700">
                      Lieu
                    </p>
                    <p className="mt-1 text-base font-black leading-tight">
                      1430 rue Deguire
                    </p>
                    <p className="text-sm font-semibold text-neutral-600">
                      Mont-Tremblant
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-xl border border-orange-100 bg-[#FFF8ED] px-5 py-4">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                      Contribution
                    </p>
                    <p className="mt-0.5 text-3xl font-black">15 $</p>
                  </div>
                  <div className="text-right text-sm text-neutral-600">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Clock className="h-3.5 w-3.5" /> 17 h
                    </div>
                    <p className="mt-1 text-xs">Alcool à apporter</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── ADHÉSION ─────────────────────────────────── */}
      <section id="adhesion" className="px-5 py-20 md:px-10 md:py-28">
        <FadeUp>
          <SectionTitle
            eyebrow="Adhésion"
            title="Devenir membre"
            text="L'adhésion permet de participer à la vie de l'association, soutenir ses activités et contribuer à son développement."
          />
        </FadeUp>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {[
            {
              icon: Users,
              tag: "Nouveaux membres",
              tagColor: "text-teal-700",
              bg: "bg-teal-50",
              border: "border-teal-100",
              badge: "bg-teal-100 text-teal-800",
              price: "45 jours",
              priceLabel: "pour s'établir",
              detail: "Frais d'adhésion : 20 $",
              detailBg: "bg-teal-50 text-teal-800",
              iconColor: "text-teal-700",
              iconBg: "bg-teal-100",
            },
            {
              icon: Megaphone,
              tag: "Anciens membres",
              tagColor: "text-red-700",
              bg: "bg-red-50",
              border: "border-red-100",
              badge: "bg-red-100 text-red-800",
              price: "45 jours",
              priceLabel: "pour renouveler",
              detail: "Cotisation annuelle",
              detailBg: "bg-red-50 text-red-800",
              iconColor: "text-red-600",
              iconBg: "bg-red-100",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.tag}>
                <div
                  className={`rounded-2xl border-2 ${item.border} bg-white p-7 shadow-lg`}
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}
                  >
                    <Icon className={`h-6 w-6 ${item.iconColor}`} />
                  </div>
                  <h3
                    className={`mt-5 text-xl font-extrabold ${item.tagColor}`}
                  >
                    {item.tag}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-[#3A1F0F]">
                      45
                    </span>
                    <span className="text-lg font-bold text-neutral-500">
                      jours
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500">{item.priceLabel}</p>
                  <p
                    className={`mt-5 rounded-xl px-4 py-3 text-sm font-extrabold ${item.detailBg}`}
                  >
                    {item.detail}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── BUREAU EXÉCUTIF ───────────────────────────── */}
      <section className="bg-[#FFF8ED] px-5 py-20 md:px-10 md:py-28">
        <FadeUp>
          <SectionTitle
            eyebrow="Gouvernance"
            title="Bureau exécutif"
            text="L'association fonctionne autour d'une assemblée générale et d'un bureau exécutif chargé de l'organisation et du développement des activités."
          />
        </FadeUp>

        <div className="mx-auto mt-12 grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {officeRoles.map((item, i) => (
            <FadeUp key={item.role} delay={i * 0.05}>
              <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-lg">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-[#3A1F0F]">
                  {item.role}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-neutral-500">
                  Poste à compléter
                </p>
                <div className="mt-3 h-px bg-gradient-to-r from-orange-200 to-transparent" />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────── */}
      <section id="contact" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-2xl shadow-neutral-100">
            <div className="grid md:grid-cols-[0.85fr_1.15fr]">
              {/* left panel */}
              <div className="relative overflow-hidden bg-[#0B6F68] p-8 text-white md:p-10">
                <PatternCorner position="left" />
                <div className="relative">
                  <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-orange-300">
                    Contact
                  </p>
                  <h2 className="mt-3 text-3xl font-black md:text-4xl">
                    Écrivez-nous
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-teal-100">
                    Vous souhaitez devenir membre, participer aux activités ou
                    recevoir les communications officielles de l'association ?
                    Laissez vos coordonnées.
                  </p>

                  <div className="mt-8 space-y-4">
                    <a
                      href="mailto:afriquetremblant@gmail.com"
                      className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/20"
                    >
                      <Mail className="h-4 w-4 text-orange-300" />
                      afriquetremblant@gmail.com
                    </a>
                    <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold">
                      <MapPin className="h-4 w-4 text-orange-300" />
                      Mont-Tremblant, Québec
                    </div>
                  </div>
                </div>
              </div>

              {/* form */}
              <div className="p-8 md:p-10">
                <form className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-neutral-600">
                        Nom complet
                      </label>
                      <input
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                        placeholder="Marie Dupont"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-neutral-600">
                        Adresse courriel
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                        placeholder="marie@exemple.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-neutral-600">
                      Je suis
                    </label>
                    <select className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100">
                      <option>Intéressé(e) par l'association</option>
                      <option>Nouveau membre</option>
                      <option>Ancien membre</option>
                      <option>Partenaire</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-neutral-600">
                      Message
                    </label>
                    <textarea
                      className="min-h-28 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                      placeholder="Votre message…"
                    />
                  </div>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#3A1F0F] px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-red-700"
                  >
                    Envoyer la demande <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="border-t border-orange-100 bg-white px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 md:flex-row md:justify-between">
          <LogoMark compact />
          <p className="text-xs font-semibold text-neutral-500">
            © 2026 Association Afrique-Tremblant · Tous droits réservés
          </p>
        </div>
      </footer>
    </main>
  );
}

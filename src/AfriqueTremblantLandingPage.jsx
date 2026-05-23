import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Gavel,
  Globe2,
  HandHeart,
  Handshake,
  HeartHandshake,
  Landmark,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  UserCheck,
  Vote,
  X,
} from "lucide-react";

/* ─── Brand tokens ─────────────────────────────────────── */
const C = {
  teal:   "#0B6F68",
  tealDk: "#085c56",
  tealLt: "#EDF7F6",
  red:    "#D9301C",
  redDk:  "#b82716",
  redLt:  "#FDF0EE",
  orange: "#F59A00",
  orangeLt:"#FEF6E8",
  brown:  "#3A1F0F",
  cream:  "#FFF8ED",
  green:  "#5D8A1A",
};

/* ─── Data ──────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Mission",     href: "#mission"     },
  { label: "Gouvernance", href: "#gouvernance" },
  { label: "Statuts",     href: "#statuts"     },
  { label: "Activités",   href: "#activites"   },
  { label: "Adhésion",    href: "#adhesion"    },
  { label: "Contact",     href: "#contact"     },
];

const STATS = [
  { value: "2024",  label: "Année de fondation",     color: C.teal   },
  { value: "OBNL",  label: "Organisme sans but lucratif", color: C.red },
  { value: "QC",    label: "Province de Québec",     color: C.orange },
  { value: "100%",  label: "Apolitique & laïque",    color: C.green  },
];

const MISSIONS = [
  {
    icon: HeartHandshake,
    image: "/Entraide.png",
    title: "Entraide communautaire",
    text: "Créer un espace de solidarité où les membres se soutiennent, échangent et avancent ensemble.",
    accent: C.teal, bg: C.tealLt,
  },
  {
    icon: Users,
    image: "/Accueil.png",
    title: "Accueil et intégration",
    text: "Accompagner les nouveaux arrivants et faciliter leur intégration à Mont-Tremblant et dans les environs.",
    accent: C.red, bg: C.redLt,
  },
  {
    icon: Globe2,
    image: "/Culture.png",
    title: "Culture africaine",
    text: "Valoriser la richesse culturelle africaine à travers des rencontres, activités et moments de partage.",
    accent: C.orange, bg: C.orangeLt,
  },
  {
    icon: Handshake,
    image: "/partenariats.png",
    title: "Réseaux et partenariats",
    text: "Créer des liens avec la Ville, les organismes locaux, les partenaires et les communautés voisines.",
    accent: C.green, bg: "#F0F5E6",
  },
];

const BUREAU = [
  { role: "Président(e)",               icon: Landmark,      desc: "Conduit les affaires de l'association et la représente officiellement auprès des tiers." },
  { role: "Vice-président(e)",          icon: ShieldCheck,   desc: "Assiste la présidence et assure l'intérim en son absence." },
  { role: "Secrétaire général(e)",      icon: ClipboardCheck,desc: "Rédige les procès-verbaux, registres, convocations et archives officiels." },
  { role: "Trésorier(ère)",             icon: Banknote,      desc: "Administre les biens, tient les livres de comptes et présente les rapports financiers." },
  { role: "Commissaire aux comptes",    icon: Scale,         desc: "Vérifie et certifie les comptes. Rend compte à l'assemblée générale." },
  { role: "Communications & Logistique",icon: Megaphone,     desc: "Coordonne la diffusion de l'information et l'organisation pratique des activités." },
  { role: "Affaires culturelles & sportives", icon: Sparkles,desc: "Planifie les activités qui valorisent la culture et la participation des membres." },
  { role: "Relations extérieures",      icon: Globe2,        desc: "Développe les collaborations avec partenaires, organismes et institutions." },
  { role: "Affaires sociales & solidarité", icon: HeartHandshake, desc: "Accompagne les nouveaux arrivants et favorise le bien-être des membres." },
];

const STATUTES = [
  {
    icon: Scale,
    title: "Association apolitique et laïque",
    text: "Afrique-Tremblant est un organisme à but non lucratif (OBNL), ouvert à toutes communautés. Ses actions sont guidées par la Charte canadienne des droits et libertés et la Charte québécoise.",
    badge: "Art. 1 – Nature juridique",
  },
  {
    icon: FileText,
    title: "Objet social",
    text: "Créer des liens de fraternité, promouvoir les cultures africaines, accueillir les nouveaux arrivants, favoriser les réseaux d'échange et soutenir le développement de ses membres.",
    badge: "Art. 2 – Mission",
  },
  {
    icon: Vote,
    title: "Gouvernance démocratique",
    text: "L'assemblée générale est l'organe suprême. Tout membre à jour de sa cotisation a le droit de vote et peut se porter candidat aux fonctions électives.",
    badge: "Art. 7 – AGA",
  },
  {
    icon: UserCheck,
    title: "Principes d'inclusion",
    text: "Les motivations sectaires, ethnocentristes, régionalistes, tribalistes ou partisanes sont incompatibles avec l'esprit de l'association. Le respect de chaque membre est une obligation.",
    badge: "Art. 4 – Valeurs",
  },
  {
    icon: Banknote,
    title: "Gestion financière transparente",
    text: "Les ressources de l'association (cotisations, dons, subventions) sont exclusivement affectées à sa mission. Un rapport financier annuel est présenté à l'AGA.",
    badge: "Art. 10 – Finances",
  },
  {
    icon: Gavel,
    title: "Dissolution et liquidation",
    text: "En cas de dissolution, l'actif résiduel est remis à un organisme à but non lucratif poursuivant des objectifs similaires, conformément à la Loi sur les compagnies du Québec.",
    badge: "Art. 15 – Dissolution",
  },
];

const ACTIVITIES = [
  { label: "Assemblée générale annuelle (AGA)", icon: Vote,          color: C.teal   },
  { label: "Accueil des nouveaux arrivants",    icon: HandHeart,     color: C.red    },
  { label: "Rencontres d'information et d'entraide", icon: Users,    color: C.orange },
  { label: "Activités culturelles et éducatives",    icon: Sparkles, color: C.green  },
  { label: "Ateliers d'intégration locale",     icon: BookOpen,      color: C.teal   },
  { label: "Actions de solidarité",             icon: HeartHandshake,color: C.red    },
  { label: "Partenariats avec acteurs locaux",  icon: Handshake,     color: C.orange },
  { label: "Représentation auprès des institutions", icon: Building2, color: C.green },
];

const MEMBERSHIP_CONDITIONS = [
  "Respecter les statuts et le règlement intérieur",
  "Partager les valeurs d'entraide, de respect et d'inclusion",
  "Être à jour de sa cotisation annuelle",
  "Participer activement à la vie associative",
  "Ne pas exercer d'activités contraires aux intérêts de l'association",
];

const FAQ = [
  {
    q: "Qui peut devenir membre ?",
    a: "Toute personne physique majeure qui adhère aux valeurs et objectifs de l'association peut demander son adhésion. L'association est ouverte aux Africains, aux amis de l'Afrique et à toutes personnes de la région de Mont-Tremblant partageant les mêmes valeurs.",
  },
  {
    q: "Comment se déroule l'Assemblée générale (AGA) ?",
    a: "L'AGA se tient au moins une fois par an. Elle est l'organe souverain de l'association. Tous les membres à jour de leur cotisation y ont droit de vote. Les convocations sont envoyées 15 jours avant la date de l'assemblée.",
  },
  {
    q: "Les cotisations sont-elles déductibles d'impôt ?",
    a: "L'association est un OBNL. Veuillez consulter votre conseiller fiscal pour savoir si vos cotisations ou dons sont déductibles selon votre situation fiscale personnelle.",
  },
  {
    q: "Comment consulter les statuts officiels ?",
    a: "Les statuts et règlement intérieur sont disponibles sur demande auprès du secrétaire général ou communiqués à chaque membre lors de son adhésion.",
  },
];

/* ─── Animation helpers ─────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Decorative African pattern band ──────────────────── */
function PatternStripe({ opacity = 1 }) {
  const colors = [C.red, C.orange, C.teal, C.green, C.brown, C.red, C.orange, C.teal];
  return (
    <div
      className="h-1.5 w-full"
      style={{
        opacity,
        background: `repeating-linear-gradient(90deg, ${colors.map((c, i) => `${c} ${i * 12.5}% ${(i + 1) * 12.5}%`).join(", ")})`,
      }}
      aria-hidden="true"
    />
  );
}

/* ─── Diamond divider ───────────────────────────────────── */
function Divider({ color = C.orange }) {
  return (
    <div className="mx-auto mt-5 flex w-24 items-center gap-2" aria-hidden="true">
      <span className="h-px flex-1" style={{ background: color, opacity: 0.4 }} />
      <span className="h-2 w-2 rotate-45 inline-block" style={{ background: color }} />
      <span className="h-1.5 w-1.5 rotate-45 inline-block" style={{ background: C.red }} />
      <span className="h-2 w-2 rotate-45 inline-block" style={{ background: color }} />
      <span className="h-px flex-1" style={{ background: color, opacity: 0.4 }} />
    </div>
  );
}

/* ─── Section header ────────────────────────────────────── */
function SectionHead({ eyebrow, title, body, light = false }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p
          className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.35em]"
          style={{ color: light ? "#F59A00" : C.teal }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-poppins text-3xl font-black leading-tight tracking-tight md:text-[2.6rem]"
        style={{ color: light ? "#fff" : C.brown }}
      >
        {title}
      </h2>
      {body && (
        <p
          className="mt-4 text-base leading-7 md:text-lg"
          style={{ color: light ? "rgba(255,255,255,0.8)" : "#525252" }}
        >
          {body}
        </p>
      )}
      <Divider color={light ? "#F59A00" : C.orange} />
    </div>
  );
}

/* ─── Logo ──────────────────────────────────────────────── */
function Logo({ size = "md", light = false }) {
  const sz = size === "sm" ? "h-9 w-9" : size === "lg" ? "h-16 w-16" : "h-12 w-12";
  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo-afrique-tremblant.png"
        alt="Logo Association Afrique-Tremblant"
        className={`${sz} shrink-0 rounded-full object-contain shadow-sm`}
      />
      <div className="leading-tight">
        <p
          className="text-[9px] font-extrabold uppercase tracking-[0.3em]"
          style={{ color: light ? "rgba(255,255,255,0.7)" : C.teal }}
        >
          Association
        </p>
        <p
          className="font-poppins text-base font-black uppercase leading-none"
          style={{ color: light ? "#fff" : C.brown }}
        >
          Afrique
        </p>
        <p
          className="text-[9px] font-black uppercase tracking-[0.4em]"
          style={{ color: light ? "#F59A00" : C.red }}
        >
          Tremblant
        </p>
      </div>
    </div>
  );
}

/* ─── FAQ Accordion item ────────────────────────────────── */
function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-orange-50/40"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-black text-white"
            style={{ backgroundColor: [C.teal, C.red, C.orange, C.green][index % 4] }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-poppins text-sm font-bold text-[#3A1F0F] md:text-base">{q}</span>
        </div>
        <span className="mt-0.5 shrink-0 text-neutral-400">
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="border-t border-neutral-100 px-6 pb-5 pt-4 text-sm leading-7 text-neutral-600">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
export default function AfriqueTremblantLandingPage() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }}>

      {/* ── TOP LEGAL STRIP ─────────────────────────────── */}
      <div className="bg-[#3A1F0F] px-4 py-2">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-orange-200">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-orange-400" />
            Organisme à but non lucratif (OBNL) · Province de Québec
          </span>
          <span className="flex items-center gap-1.5 text-orange-300/80">
            <Mail className="h-3 w-3" />
            afriquetremblant@gmail.com
          </span>
        </div>
      </div>

      <PatternStripe />

      {/* ── NAVIGATION ──────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-orange-100/60 bg-white/95 backdrop-blur-md shadow-sm shadow-orange-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <Logo size="sm" />

          <nav className="hidden items-center gap-7 text-[13px] font-semibold text-neutral-600 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative py-1 transition-colors hover:text-[#0B6F68] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-[#0B6F68] after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#adhesion"
            className="hidden cursor-pointer items-center gap-2 rounded-full bg-[#0B6F68] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-100 transition hover:-translate-y-px hover:bg-[#085c56] hover:shadow-teal-200 md:inline-flex"
          >
            Adhérer <ArrowRight className="h-3.5 w-3.5" />
          </a>

          <button
            className="flex cursor-pointer flex-col gap-1.5 rounded-lg p-1 md:hidden"
            onClick={() => setNavOpen(!navOpen)}
            aria-label={navOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {navOpen
              ? <X className="h-5 w-5 text-[#3A1F0F]" />
              : <Menu className="h-5 w-5 text-[#3A1F0F]" />
            }
          </button>
        </div>

        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-orange-100 bg-white px-5 md:hidden"
            >
              <nav className="flex flex-col gap-1 py-3">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setNavOpen(false)}
                    className="cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold text-[#3A1F0F] transition hover:bg-orange-50"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#adhesion"
                  onClick={() => setNavOpen(false)}
                  className="mt-2 cursor-pointer rounded-full bg-[#0B6F68] px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Adhérer à l'association
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FFF8ED]">

        {/* Mobile-only background image */}
        <div className="absolute inset-0 md:hidden" aria-hidden="true">
          <img
            src="/hero.png"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0" style={{ background: `${C.cream}CC` }} />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-24">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Legal badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[#8A4A00] shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
              OBNL · Apolitique · Laïque · Sans but lucratif
            </div>

            <h1
              className="font-poppins max-w-xl text-[clamp(2.6rem,5.5vw,4.2rem)] font-black leading-[0.95] tracking-tight"
              style={{ color: C.brown }}
            >
              Association{" "}
              <span style={{ color: C.red }}>Afrique</span>
              <span style={{ color: C.brown }}>-</span>
              <br />
              <span style={{ color: C.teal }}>Tremblant</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-[1.8] text-neutral-600 md:text-[1.05rem]">
              Une association communautaire enracinée à Mont-Tremblant, fondée
              sur <strong className="font-semibold text-[#3A1F0F]">l'entraide</strong>,{" "}
              <strong className="font-semibold text-[#3A1F0F]">l'intégration</strong>,{" "}
              <strong className="font-semibold text-[#3A1F0F]">la solidarité</strong> et la
              valorisation de la culture africaine.
            </p>

            {/* Key facts */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { label: "Siège social : Mont-Tremblant, QC", icon: MapPin },
                { label: "OBNL constitué sous la loi du Québec", icon: Building2 },
              ].map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-neutral-100 bg-white px-4 py-2.5 text-[12px] font-semibold text-neutral-600 shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-teal-600" />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#adhesion"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: C.red, boxShadow: `0 8px 24px ${C.red}40` }}
              >
                Devenir membre <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#statuts"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 bg-white px-7 py-3.5 text-sm font-black uppercase tracking-wide transition hover:-translate-y-0.5"
                style={{ borderColor: C.brown + "30", color: C.brown }}
              >
                Nos statuts <FileText className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right: hero image — desktop only (mobile uses background) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto hidden w-full max-w-lg md:block"
          >
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-orange-200">
              <img
                src="/hero.png"
                alt="Membres de la communauté Afrique-Tremblant réunis"
                className="h-72 w-full object-cover md:h-96"
              />
              {/* Pillars overlay at bottom */}
              <div className="grid grid-cols-4 divide-x divide-white/20">
                {[
                  { label: "Fraternité",  color: C.teal   },
                  { label: "Intégration", color: C.red    },
                  { label: "Culture",     color: C.orange },
                  { label: "Solidarité",  color: C.green  },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="py-3 text-center text-[10px] font-extrabold uppercase tracking-wide text-white"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <PatternStripe opacity={0.6} />
      </section>

      {/* ── STATS / INFO BAR ────────────────────────────── */}
      <section className="border-b border-orange-50 bg-[#FFF8ED] px-5 py-10 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.07}>
              <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-black/5">
                <p
                  className="font-poppins text-3xl font-black"
                  style={{ color: s.color }}
                >
                  {s.value}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  {s.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Contact quickbar */}
        <div className="mx-auto mt-6 grid max-w-5xl gap-3 sm:grid-cols-3">
          {[
            { icon: Landmark, label: "Siège social", value: "2-840 rue Labelle, Mont-Tremblant, QC J8E 2W5" },
            { icon: Mail,     label: "Courriel officiel", value: "afriquetremblant@gmail.com", href: "mailto:afriquetremblant@gmail.com" },
            { icon: Globe2,   label: "Région",  value: "Mont-Tremblant et environs, Laurentides, QC" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.label}>
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: C.tealLt }}
                  >
                    <Icon className="h-4 w-4" style={{ color: C.teal }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: C.teal }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="mt-0.5 block truncate text-xs font-semibold text-neutral-700 underline-offset-2 hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-xs font-semibold leading-5 text-neutral-700">{item.value}</p>
                    )}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── MISSION ─────────────────────────────────────── */}
      <section id="mission" className="px-5 py-20 md:px-10 md:py-28">
        <FadeUp>
          <SectionHead
            eyebrow="Notre mission"
            title="Rassembler, accompagner et valoriser"
            body="L'association consolide les liens de fraternité, favorise l'intégration, soutient les projets utiles et fait mieux connaître l'Afrique dans la région de Mont-Tremblant."
          />
        </FadeUp>

        <div className="mx-auto mt-14 grid max-w-7xl gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {MISSIONS.map((m, i) => {
            const Icon = m.icon;
            return (
              <FadeUp key={m.title} delay={i * 0.08}>
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="group h-full cursor-default overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-md shadow-neutral-100/70 transition-shadow hover:shadow-xl"
                >
                  {/* Image */}
                  <div
                    className="flex items-center justify-center overflow-hidden p-5"
                    style={{ background: m.bg }}
                  >
                    <img
                      src={m.image}
                      alt={m.title}
                      className="h-52 w-52 object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: m.bg }}
                      >
                        <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" style={{ color: m.accent }} />
                      </div>
                      <h3
                        className="font-poppins text-base font-bold leading-tight"
                        style={{ color: C.brown }}
                      >
                        {m.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-neutral-500">{m.text}</p>
                    <div
                      className="mt-4 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-16"
                      style={{ backgroundColor: m.accent }}
                    />
                  </div>
                </motion.article>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── GOUVERNANCE ─────────────────────────────────── */}
      <section
        id="gouvernance"
        className="relative overflow-hidden px-5 py-20 md:px-10 md:py-28"
        style={{ background: C.cream }}
      >
        <PatternStripe opacity={0.5} />
        <div className="mx-auto max-w-7xl pt-10">
          <FadeUp>
            <SectionHead
              eyebrow="Structure de gouvernance"
              title="Bureau exécutif"
              body="L'association est administrée par un bureau exécutif élu lors de l'assemblée générale annuelle. Chaque poste est défini par les statuts."
            />
          </FadeUp>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BUREAU.map((b, i) => {
              const Icon = b.icon;
              const accent = [C.teal, C.red, C.orange, C.green, C.teal, C.red, C.orange, C.green, C.teal][i % 4];
              return (
                <FadeUp key={b.role} delay={i * 0.05}>
                  <div className="group flex h-full gap-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-orange-200">
                    <div
                      className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: accent + "15" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: accent }} />
                    </div>
                    <div>
                      <h3
                        className="font-poppins text-sm font-bold leading-tight"
                        style={{ color: C.brown }}
                      >
                        {b.role}
                      </h3>
                      <p className="mt-2 text-xs leading-5 text-neutral-500">{b.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          {/* AG note */}
          <FadeUp delay={0.3}>
            <div
              className="mt-10 flex flex-wrap items-start gap-4 rounded-2xl border-l-4 p-6 md:items-center"
              style={{ borderColor: C.teal, background: C.tealLt }}
            >
              <Vote className="h-8 w-8 shrink-0" style={{ color: C.teal }} />
              <div>
                <p className="font-poppins text-sm font-bold" style={{ color: C.brown }}>
                  Assemblée générale annuelle (AGA)
                </p>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  L'AGA est l'organe suprême de l'association. Convoquée au moins une fois par an, elle élit le bureau exécutif, approuve les comptes, adopte les résolutions et statue sur les modifications aux statuts.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
        <div className="mt-10">
          <PatternStripe opacity={0.5} />
        </div>
      </section>

      {/* ── STATUTS LÉGAUX ──────────────────────────────── */}
      <section
        id="statuts"
        className="relative overflow-hidden px-5 py-20 text-white md:px-10 md:py-24"
        style={{ background: C.brown }}
      >

        <div className="relative mx-auto max-w-7xl">
          <FadeUp>
            <SectionHead
              eyebrow="Cadre juridique et statuts"
              title="Un cadre clair pour servir la communauté"
              body="Afrique-Tremblant agit dans un esprit d'unité, de solidarité et de fraternité. Ses statuts assurent une vie associative transparente, inclusive et respectueuse."
              light
            />
          </FadeUp>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {STATUTES.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeUp key={s.title} delay={i * 0.07}>
                  <article className="group h-full rounded-2xl bg-white/8 p-6 ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-white/12 hover:ring-orange-400/40">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: "rgba(255,255,255,0.12)" }}
                      >
                        <Icon className="h-5 w-5 text-orange-300" />
                      </div>
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider"
                        style={{ background: C.orange + "25", color: C.orange }}
                      >
                        {s.badge}
                      </span>
                    </div>
                    <h3 className="font-poppins mt-5 text-base font-bold text-white">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">{s.text}</p>
                  </article>
                </FadeUp>
              );
            })}
          </div>

          {/* Legal disclaimer */}
          <FadeUp delay={0.4}>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm">
              <div className="flex flex-wrap items-start gap-4">
                <BookOpen className="h-5 w-5 shrink-0 text-orange-300" />
                <p className="text-sm leading-6 text-white/70">
                  <span className="font-bold text-white">Mention légale — </span>
                  Association Afrique-Tremblant est constituée comme organisme à but non lucratif en vertu de la{" "}
                  <em>Loi sur les compagnies</em> (L.R.Q., c. C-38) du Québec. Les statuts et règlements sont disponibles sur demande auprès du secrétaire général à l'adresse officielle de l'association.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── ACTIVITÉS ───────────────────────────────────── */}
      <section id="activites" className="px-5 py-20 md:px-10 md:py-28">
        <FadeUp>
          <SectionHead
            eyebrow="Vie associative"
            title="Activités et rencontres"
            body="Des initiatives structurées et inclusives pour soutenir les membres, accueillir les nouveaux arrivants et renforcer les liens avec la communauté locale."
          />
        </FadeUp>

        <div className="mx-auto mt-12 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <FadeUp key={a.label} delay={i * 0.06}>
                <div className="group flex cursor-default items-start gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md">
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ background: a.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold leading-5" style={{ color: C.brown }}>
                    {a.label}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── ADHÉSION ────────────────────────────────────── */}
      <section
        id="adhesion"
        className="relative overflow-hidden px-5 py-20 md:px-10 md:py-28"
        style={{ background: C.cream }}
      >
        <PatternStripe opacity={0.4} />
        <div className="mx-auto max-w-7xl pt-10">
          <FadeUp>
            <SectionHead
              eyebrow="Adhésion"
              title="Rejoindre l'association"
              body="L'adhésion est un engagement personnel à respecter les statuts, participer à la vie associative et soutenir les objectifs d'Afrique-Tremblant."
            />
          </FadeUp>

          <div className="mt-14 grid gap-6 md:grid-cols-[1fr_1fr_1fr]">
            {/* Membership cards */}
            <FadeUp delay={0.08}>
              <div className="h-full rounded-2xl border-2 bg-white p-7 shadow-lg" style={{ borderColor: C.teal + "40" }}>
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: C.tealLt }}
                >
                  <Users className="h-6 w-6" style={{ color: C.teal }} />
                </div>
                <p className="font-poppins mt-5 text-[11px] font-extrabold uppercase tracking-[0.25em]" style={{ color: C.teal }}>
                  Nouveaux membres
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-poppins text-5xl font-black" style={{ color: C.brown }}>20</span>
                  <span className="text-lg font-bold" style={{ color: C.brown }}>$</span>
                </div>
                <p className="text-xs text-neutral-400">Frais d'adhésion (une seule fois)</p>
                <div className="mt-5 h-px bg-neutral-100" />
                <p
                  className="mt-4 rounded-xl px-4 py-2.5 text-xs font-bold"
                  style={{ background: C.tealLt, color: C.teal }}
                >
                  Frais d'adhésion unique à l'inscription
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.14}>
              <div
                className="h-full rounded-2xl p-7 shadow-xl text-white relative overflow-hidden"
                style={{ background: C.red }}
              >
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                    <Banknote className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-poppins mt-5 text-[11px] font-extrabold uppercase tracking-[0.25em] text-orange-200">
                    Cotisation annuelle
                  </p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-poppins text-5xl font-black text-white">50</span>
                    <span className="text-lg font-bold text-white">$</span>
                  </div>
                  <p className="text-xs text-white/60">Par année civile</p>
                  <div className="mt-5 h-px bg-white/20" />
                  <p className="mt-4 rounded-xl bg-white/15 px-4 py-2.5 text-xs font-bold text-white">
                    Renouvelable chaque année lors de l'AGA
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Conditions */}
            <FadeUp delay={0.2}>
              <div className="h-full rounded-2xl border-2 bg-white p-7 shadow-lg" style={{ borderColor: C.orange + "40" }}>
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: C.orangeLt }}
                >
                  <ClipboardCheck className="h-6 w-6" style={{ color: C.orange }} />
                </div>
                <p className="font-poppins mt-5 text-[11px] font-extrabold uppercase tracking-[0.25em]" style={{ color: C.orange }}>
                  Conditions d'adhésion
                </p>
                <ul className="mt-4 space-y-2.5">
                  {MEMBERSHIP_CONDITIONS.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-xs leading-5 text-neutral-600">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: C.orange }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>

          {/* Droits des membres */}
          <FadeUp delay={0.3}>
            <div
              className="mt-8 rounded-2xl border p-6"
              style={{ borderColor: C.teal + "30", background: C.tealLt }}
            >
              <p className="font-poppins mb-4 text-sm font-bold" style={{ color: C.teal }}>
                Droits des membres à jour de cotisation
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Participer et voter à l'AGA",
                  "Se porter candidat aux postes électifs",
                  "Accéder à tous les services et activités",
                  "Consulter les procès-verbaux et comptes",
                ].map((d) => (
                  <div key={d} className="flex items-start gap-2 text-xs font-semibold leading-5 text-neutral-700">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: C.teal }} />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="px-5 py-20 md:px-10 md:py-24" style={{ background: "#FAFAF8" }}>
        <FadeUp>
          <SectionHead
            eyebrow="Questions fréquentes"
            title="Ce que vous devez savoir"
          />
        </FadeUp>
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQ.map((item, i) => (
            <FadeUp key={item.q} delay={i * 0.06}>
              <FaqItem q={item.q} a={item.a} index={i} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="px-5 py-20 md:px-10 md:py-28" style={{ background: "#FAFAF8" }}>
        <FadeUp>
          <SectionHead
            eyebrow="Nous rejoindre"
            title="Contactez l'association"
            body="Une question, une demande d'adhésion, une proposition de partenariat ? Notre équipe vous répond dans les plus brefs délais."
          />
        </FadeUp>

        {/* ── Why contact cards ── */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3">
          {[
            { icon: Users,       color: C.teal,   title: "Devenir membre",      body: "Rejoignez la communauté en envoyant votre demande d'adhésion par courriel." },
            { icon: Handshake,   color: C.red,    title: "Proposer un partenariat", body: "Organismes, institutions, entreprises — nous sommes ouverts à toute collaboration." },
            { icon: HeartHandshake, color: C.orange, title: "Obtenir de l'aide", body: "Nouveau à Mont-Tremblant ? L'association vous accompagne dans votre intégration." },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <FadeUp key={c.title} delay={i * 0.07}>
                <div className="flex h-full gap-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: c.color + "15" }}>
                    <Icon className="h-5 w-5" style={{ color: c.color }} />
                  </div>
                  <div>
                    <p className="font-poppins text-sm font-bold" style={{ color: C.brown }}>{c.title}</p>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">{c.body}</p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* ── Main contact block ── */}
        <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl shadow-2xl shadow-neutral-200">
          <div className="grid md:grid-cols-[1fr_1.4fr]">

            {/* Left panel — info */}
            <div
              className="relative overflow-hidden p-8 text-white md:p-10"
              style={{ background: C.teal }}
            >
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-orange-300">
                    Informations de contact
                  </p>
                  <h2 className="font-poppins mt-3 text-2xl font-black text-white md:text-3xl">
                    Nous sommes<br />à votre écoute
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    L'équipe de l'association répond généralement sous 48 h ouvrables.
                  </p>
                </div>

                {/* Contact details */}
                <div className="space-y-3">
                  <a
                    href="mailto:afriquetremblant@gmail.com"
                    className="group flex cursor-pointer items-center gap-3 rounded-xl bg-white/10 px-4 py-3.5 text-sm font-semibold transition hover:bg-white/20"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-400/20">
                      <Mail className="h-4 w-4 text-orange-300" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider">Courriel officiel</p>
                      <p className="text-sm font-semibold text-white group-hover:text-orange-200 transition-colors">afriquetremblant@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 rounded-xl bg-white/10 px-4 py-3.5 text-sm">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-400/20">
                      <MapPin className="h-4 w-4 text-orange-300" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider">Siège social</p>
                      <p className="text-sm font-semibold text-white leading-5">
                        2-840 rue Labelle<br />Mont-Tremblant, QC J8E 2W5
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3.5 text-sm">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-400/20">
                      <Globe2 className="h-4 w-4 text-orange-300" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider">Région</p>
                      <p className="text-sm font-semibold text-white">Laurentides, Québec</p>
                    </div>
                  </div>
                </div>

                {/* Délai de réponse */}
                <div className="rounded-xl border border-orange-400/25 bg-orange-400/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.5)]" />
                    <p className="text-xs font-bold text-white/80">Réponse sous 48 h ouvrables</p>
                  </div>
                </div>

                {/* Logo */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                  <img src="/logo-afrique-tremblant.png" alt="" aria-hidden="true"
                    className="h-10 w-10 rounded-full object-contain opacity-80" />
                  <div className="text-[10px] leading-tight">
                    <p className="font-bold text-white/90">Association Afrique-Tremblant</p>
                    <p className="text-white/50">OBNL · Mont-Tremblant, QC</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel — form */}
            <form className="bg-white p-8 md:p-10">
              <p className="font-poppins mb-1 text-xl font-black" style={{ color: C.brown }}>
                Envoyer un message
              </p>
              <p className="mb-7 text-sm text-neutral-400">Tous les champs sont requis.</p>

              <div className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Prénom et nom
                    </label>
                    <input
                      id="c-name" type="text" autoComplete="name"
                      className="w-full rounded-xl border-2 border-neutral-100 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                      placeholder="Jean-Marc Tremblay"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Adresse courriel
                    </label>
                    <input
                      id="c-email" type="email" autoComplete="email"
                      className="w-full rounded-xl border-2 border-neutral-100 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                      placeholder="jeanmarc@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="c-phone" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Téléphone <span className="normal-case font-normal text-neutral-300">(optionnel)</span>
                  </label>
                  <input
                    id="c-phone" type="tel" autoComplete="tel"
                    className="w-full rounded-xl border-2 border-neutral-100 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                    placeholder="+1 (819) 425-0000"
                  />
                </div>

                <div>
                  <label htmlFor="c-subject" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Nature de la demande
                  </label>
                  <select
                    id="c-subject"
                    className="w-full cursor-pointer rounded-xl border-2 border-neutral-100 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                  >
                    <option value="">Sélectionner une catégorie…</option>
                    <option value="adhesion">Demande d'adhésion</option>
                    <option value="info">Renseignements généraux</option>
                    <option value="partenariat">Proposition de partenariat</option>
                    <option value="activite">Information sur les activités</option>
                    <option value="integration">Accompagnement à l'intégration</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="c-message" className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Votre message
                  </label>
                  <textarea
                    id="c-message"
                    className="min-h-32 w-full resize-y rounded-xl border-2 border-neutral-100 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50"
                    placeholder="Décrivez votre demande en quelques lignes…"
                  />
                </div>

                {/* Consent */}
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 cursor-pointer rounded accent-teal-600" />
                  <span className="text-xs leading-5 text-neutral-500">
                    J'accepte que mes informations soient utilisées pour répondre à ma demande, conformément à la politique de confidentialité de l'association.
                  </span>
                </label>

                <button
                  type="submit"
                  className="group flex cursor-pointer items-center justify-center gap-2 rounded-full py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ background: C.teal }}
                >
                  Envoyer le message
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer style={{ background: C.brown, color: "#fff" }}>
        <PatternStripe />
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-10">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

            {/* Brand column */}
            <div>
              <Logo light size="sm" />
              <p className="mt-4 max-w-xs text-xs leading-6 text-white/60">
                Association communautaire à but non lucratif, constituée en vertu de la <em>Loi sur les compagnies</em> du Québec.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["OBNL", "Apolitique", "Laïque"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{ background: "rgba(255,255,255,0.1)", color: C.orange }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/40">
                Navigation
              </p>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="cursor-pointer text-xs font-semibold text-white/60 transition hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/40">
                Contact officiel
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-xs text-white/60">
                  <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-orange-400" />
                  2-840 rue Labelle<br />Mont-Tremblant, QC J8E 2W5
                </li>
                <li>
                  <a
                    href="mailto:afriquetremblant@gmail.com"
                    className="flex cursor-pointer items-center gap-2 text-xs text-white/60 transition hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 text-orange-400" />
                    afriquetremblant@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.3em] text-white/40">
                Informations légales
              </p>
              <ul className="space-y-2.5 text-xs text-white/60">
                <li className="flex items-start gap-2">
                  <Scale className="h-3.5 w-3.5 shrink-0 mt-0.5 text-orange-400" />
                  <span>OBNL constitué sous la <em>Loi sur les compagnies</em> (L.R.Q., c. C-38)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5 text-orange-400" />
                  <span>Conforme à la Charte canadienne et québécoise des droits et libertés</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="h-3.5 w-3.5 shrink-0 mt-0.5 text-orange-400" />
                  <span>Statuts disponibles sur demande auprès du secrétaire général</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center md:flex-row md:justify-between">
            <p className="text-[11px] text-white/40">
              © {new Date().getFullYear()} Association Afrique-Tremblant · Tous droits réservés
            </p>
            <p className="text-[11px] text-white/30">
              Organisme à but non lucratif · Province de Québec · Canada
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

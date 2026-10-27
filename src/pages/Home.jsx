// src/pages/Home.jsx
import { Link } from "react-router-dom";

const gameIcon = "/photo/321.webp";
const heroesBg = "/photo/unnamed (1).webp";
const dragonBg = "/photo/123.jpg";

const HERO_IMAGES = {
  Eric: "/hero photos/eric.jpg",
  Charlie: "/hero photos/rich.jpg",
  Alexandria: "/hero photos/alex.jpg",
  Matilda: "/hero photos/matilda.jpg",
};

const HEROES = [
  {
    name: "Eric",
    tier: "A",
    role: "Blitz Crossbows",
    desc: "Crossbow units unleash three bolts in a flash!",
    color: "from-blue-950",
    border: "border-blue-800",
  },
  {
    name: "Charlie",
    tier: "A",
    role: "Shield Sage",
    desc: "Shielders absorb and counterattack stronger!",
    color: "from-purple-950",
    border: "border-purple-700",
  },
  {
    name: "Alexandria",
    tier: "S",
    role: "Phantom Guardian",
    desc: "Spectral guardians amplify the assault!",
    color: "from-amber-950",
    border: "border-amber-600",
  },
  {
    name: "Matilda",
    tier: "A",
    role: "Chariot Shield",
    desc: "Sieges shield ranged troops, taking hits in their stead!",
    color: "from-purple-950",
    border: "border-purple-700",
  },
];

const TIER_STYLES = {
  S: "bg-orange-500/20 text-orange-400 border border-orange-500/50",
  A: "bg-purple-500/20 text-purple-400 border border-purple-500/50",
  B: "bg-blue-500/20 text-blue-400 border border-blue-500/50",
};

function Tier({ level }) {
  return (
    <span
      className={`text-xs font-black px-2 py-0.5 rounded ${TIER_STYLES[level]}`}
    >
      {level}
    </span>
  );
}

const TIPS = [
  {
    icon: "🏗️",
    title: "روی نقاط باز بساز",
    body: "هیچ جایی نباید خالی بماند. به محض باز شدن مکان جدید، مزرعه، اردوگاه چوب‌بری یا پادگان نظامی بساز و ارتقاءهای رایگان فوری را تا جایی که می‌توانی اسپم کن.",
  },
  {
    icon: "⚔️",
    title: "ارتش خود را بساز",
    body: "هرچه زودتر ساختمان‌های ارتشی بساز. با نیروهای T1 شروع می‌کنی؛ ساختمان‌ها را ارتقا بده تا T2 و بالاتر را باز کنی — قوی‌تر اما گران‌تر و زمان‌بر.",
  },
  {
    icon: "🤝",
    title: "به یک اتحاد بپیوند",
    body: "هرچه سریع‌تر اتحاد پیدا کن. متحدان در دفاع کمک می‌کنند، سرعت ساخت را افزایش می‌دهند و هدایای رایگان می‌دهند. با اتحادی که تو را بپذیرد شروع کن.",
  },
  {
    icon: "🔬",
    title: "دانشگاه را فعال نگه دار",
    body: "اول March Slot 1 (نظامی) را تحقیق کن تا دو مارش بفرستی، سپس روی منابع و توسعه تمرکز کن. از اتحاد کمک بخواه تا تحقیقات سریع‌تر تمام شود.",
  },
  {
    icon: "📋",
    title: "ماموریت‌ها را چک کن",
    body: "ماموریت‌های منطقه‌ای یک‌بار انجام می‌شوند و صدها مورد دارند. ماموریت‌های روزانه ریست می‌شوند؛ تکمیل کافی از آن‌ها ۵۰ طلای رایگان می‌دهد.",
  },
  {
    icon: "👷",
    title: "کارگران را توزیع کن",
    body: "وقتی یک ارتقای بزرگ ساعت‌ها طول می‌کشد، بخشی از کارگران را به ساخت چیز دیگری بفرست. بعد از اتمام کار، آن‌ها را برگردان — تعداد بیشتر یعنی سرعت بیشتر.",
  },
  {
    icon: "🐉",
    title: "هیولاها را شکار کن",
    body: "از ذره‌بین نقشه هیولای سطح ۱ پیدا کن و حمله کن. پاداش خوبی دارند. طلا را برای سرعت‌بخشی به مارش هیولا هدر نده.",
  },
  {
    icon: "⚡",
    title: "افزایش سرعت را هوشمندانه استفاده کن",
    body: "در اوایل بازی برای گذر از انتظارهای کوتاه خوب است. در اواخر بازی آن‌ها را برای رویدادهای خاص با جوایز بهتر نگه دار.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(13%_0.015_25)] text-[oklch(88%_0.02_60)]">
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden">
        <img
          src={dragonBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(13%_0.015_25/0.4)] via-transparent to-[oklch(13%_0.015_25)]" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 py-32 gap-6">
          <img
            src={gameIcon}
            alt="Clash of Empires"
            className="w-24 rounded-2xl shadow-lg shadow-black/60 ring-2 ring-[oklch(68%_0.19_38/0.5)]"
          />

          <p className="text-xs uppercase tracking-[0.3em] text-[oklch(68%_0.19_38)] font-semibold">
            Conquer · Build · Dominate
          </p>

          <h1 className="text-5xl sm:text-7xl font-black uppercase leading-none drop-shadow-xl">
            <span className="text-[oklch(96%_0.03_60)]">Clash</span>{" "}
            <span className="text-[oklch(68%_0.19_38)]">of</span>{" "}
            <span className="text-[oklch(96%_0.03_60)]">Empires</span>
          </h1>

          <p className="max-w-lg text-[oklch(58%_0.02_25)] text-base leading-relaxed">
            Forge your empire, train legendary heroes, and burn your enemies to
            ash.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link
              to="/resources"
              className="px-7 py-3 bg-[oklch(68%_0.19_38)] hover:bg-[oklch(73%_0.21_38)] text-[oklch(10%_0.01_25)] font-bold rounded text-sm uppercase tracking-wide transition-colors"
            >
              Resources
            </Link>
            <Link
              to="/artifacts"
              className="px-7 py-3 border border-[oklch(30%_0.04_25)] hover:border-[oklch(68%_0.19_38)] hover:text-[oklch(68%_0.19_38)] text-[oklch(55%_0.02_25)] font-bold rounded text-sm uppercase tracking-wide transition-colors"
            >
              Artifacts
            </Link>
          </div>
        </div>
      </section>

      {/* ── HEROES ── */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[oklch(68%_0.19_38)] mb-1">
            Legendary Heroes
          </p>
          <h2 className="text-2xl font-bold text-[oklch(92%_0.02_60)]">
            Choose Your Champions
          </h2>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden p-6"
          style={{
            backgroundImage: `url(${heroesBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <div className="absolute inset-0 bg-[oklch(10%_0.015_25/0.82)]" />

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-7">
            {HEROES.map((hero) => (
              <div
                key={hero.name}
                className={`rounded-xl border ${hero.border} bg-gradient-to-b ${hero.color} to-[oklch(13%_0.015_25/0.9)] p-4 flex flex-col gap-2 hover:brightness-110 transition-[filter]`}
              >
                {/* Hero image replacing the sword emoji */}
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-[oklch(18%_0.015_25/0.7)]">
                  <img
                    src={HERO_IMAGES[hero.name]}
                    alt={hero.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-black text-[oklch(96%_0.03_60)] text-base">
                    {hero.name}
                  </p>
                  <Tier level={hero.tier} />
                </div>
                <p className="text-[oklch(68%_0.19_38)] text-xs font-semibold">
                  {hero.role}
                </p>
                <p className="text-[oklch(50%_0.02_25)] text-xs leading-snug">
                  {hero.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-12">
          <Link
            to="/Allhero"
            className="text-sm text-[oklch(68%_0.19_38)] hover:text-[oklch(80%_0.19_38)] underline underline-offset-4 transition-colors"
          >
            View all hero combinations →
          </Link>

          {/* gallery preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="overflow-hidden rounded-xl border border-[oklch(22%_0.02_25)]">
              <img
                src="/photo/123.jpg"
                alt="Dragon Duel battle scene"
                style={{ height: "600px", width: "100%", objectFit: "cover" }}
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-[oklch(22%_0.02_25)]">
              <img
                src="/photo/unnamed.webp"
                alt="World map overview"
                style={{ height: "600px", width: "100%", objectFit: "cover" }}
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="border-t border-[oklch(20%_0.015_25)]">
        <div className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: "🏰",
              title: "Build & Expand",
              desc: "Construct your castle and grow your kingdom tile by tile.",
            },
            {
              icon: "🐉",
              title: "Dragon Duel",
              desc: "Summon dragons, launch sieges, and crush rival empires.",
            },
            {
              icon: "⚗️",
              title: "Combine Heroes",
              desc: "Unlock powerful synergies by pairing the right champions.",
            },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-3">
              <span className="text-5xl">{f.icon}</span>
              <h3 className="font-bold text-[oklch(88%_0.02_60)] text-sm uppercase tracking-wide">
                {f.title}
              </h3>
              <p className="text-[oklch(48%_0.02_25)] text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BEGINNER TIPS ── */}
      <section className="border-t border-[oklch(20%_0.015_25)]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[oklch(68%_0.19_38)] mb-1">
              راهنمای مبتدیان
            </p>
            <h2 className="text-2xl font-bold text-[oklch(92%_0.02_60)]">
              نکات استراتژیک برای شروع
            </h2>
            <p className="mt-3 text-sm text-[oklch(45%_0.02_25)] max-w-xl mx-auto leading-relaxed">
              چند نکته کلیدی برای شروع سریع‌تر در Clash of Empires. برای سوالات
              بیشتر با ما در میان بگذارید.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIPS.map((tip) => (
              <div
                key={tip.title}
                className="flex gap-4 rounded-xl border border-[oklch(22%_0.02_25)] bg-[oklch(16%_0.015_25/0.6)] p-5"
              >
                <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">
                  {tip.icon}
                </span>
                <div>
                  <h3 className="font-bold text-[oklch(88%_0.02_60)] text-sm mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-[oklch(50%_0.02_25)] text-xs leading-relaxed">
                    {tip.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-[oklch(28%_0.04_38/0.6)] bg-[oklch(16%_0.02_38/0.4)] px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xl shrink-0" aria-hidden="true">
              ⚠️
            </span>
            <p className="text-xs text-[oklch(55%_0.03_38)] leading-relaxed flex-1">
              هیچ تقلبی برای این بازی وجود ندارد — از هر سایتی که چیت یا هک
              رایگان ارائه می‌دهد اجتناب کنید، در غیر این صورت حساب شما احتمالاً
              مسدود خواهد شد.
            </p>
            <a
              href="https://coe.leme.hk.cn/m"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-semibold text-[oklch(68%_0.19_38)] hover:text-[oklch(80%_0.19_38)] underline underline-offset-4 transition-colors"
            >
              سایت رسمی Leme →
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT / WITH US ── */}
      <section className="border-t border-[oklch(20%_0.015_25)]">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[oklch(68%_0.19_38)] mb-1">
            About Us
          </p>
          <h2 className="text-2xl font-bold text-[oklch(92%_0.02_60)] mb-4">
            با ما همراه باشید
          </h2>
          <p className="text-sm text-[oklch(50%_0.02_25)] leading-relaxed max-w-xl mx-auto mb-8">
            این سایت توسط{" "}
            <span className="text-[oklch(88%_0.02_60)] font-semibold">
              Amirhossein Mousavi
            </span>{" "}
            ساخته شده است. تمامی حقوق ساخت این سایت محفوظ است و کپی‌برداری،
            بازتولید یا استفاده از کد و محتوای آن بدون اجازه کتبی مجاز نیست.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/Amirhm007"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-[oklch(68%_0.19_38)] hover:bg-[oklch(73%_0.21_38)] text-[oklch(10%_0.01_25)] font-bold rounded text-sm uppercase tracking-wide transition-colors"
            >
              GitHub: Amirhm007
            </a>
          </div>

          <p className="mt-10 text-xs text-[oklch(40%_0.02_25)]">
            © {new Date().getFullYear()} Amirhossein Mousavi · تمامی حقوق محفوظ
            است
          </p>
        </div>
      </section>
    </div>
  );
}

import { useState, useEffect } from "react";

const RARITY_CONFIG = {
  S: {
    label: "S",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/30",
  },
  A: {
    label: "A",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/30",
  },
  B: {
    label: "B",
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/30",
  },
};

const TYPE_CONFIG = {
  cavalry: {
    label: "سواره‌نظام",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/30",
  },
  infantry: {
    label: "پیاده‌نظام",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/30",
  },
  siege: {
    label: "تجهیزات محاصره",
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/30",
  },
  archer: {
    label: "کماندار",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/30",
  },
  infantrycavalry: {
    label: "پیاده‌نظام و سواره‌نظام",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/30",
  },
  infantryarcher: {
    label: "پیاده‌نظام و کماندار",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/30",
  },
};

function RarityBadge({ rarity }) {
  const cfg = RARITY_CONFIG[rarity] ?? RARITY_CONFIG["A"];
  return (
    <span
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full border text-sm font-black ${cfg.bg} ${cfg.color}`}
    >
      {cfg.label}
    </span>
  );
}

function HeroCard({ hero, onClick, selected }) {
  const typeInfo = TYPE_CONFIG[hero.type] ?? {
    label: hero.type,
    color: "text-slate-400",
    bg: "bg-slate-500/10 border-slate-500/30",
  };

  return (
    <button
      onClick={() => onClick(hero)}
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-200 text-right w-full ${
        selected
          ? "border-[oklch(68%_0.19_38)] ring-1 ring-[oklch(68%_0.19_38/0.4)]"
          : "border-[oklch(22%_0.02_25)] hover:border-[oklch(32%_0.04_38/0.6)]"
      } bg-[oklch(15%_0.015_25)]`}
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={`/hero photos/${hero.file}`}
          alt={hero.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x400/1a1a2e/6b7280?text=${encodeURIComponent(hero.name)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(15%_0.015_25)] via-[oklch(15%_0.015_25/0.2)] to-transparent" />
        <span
          className={`absolute top-2 right-2 text-[10px] border px-2 py-0.5 rounded-full font-semibold ${typeInfo.bg} ${typeInfo.color}`}
        >
          {typeInfo.label}
        </span>
        {hero.rarity === "S" && (
          <span className="absolute top-2 left-2 text-[10px] bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full font-bold">
            نخبه
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <RarityBadge rarity={hero.rarity} />
          <h3 className="font-black text-[oklch(93%_0.02_60)] text-sm">
            {hero.name}
          </h3>
        </div>
        <p className="text-[oklch(45%_0.02_25)] text-[10px]">{hero.role}</p>
      </div>
    </button>
  );
}

// --- Modal کامل با backdrop blur ---
function HeroModal({ hero, onClose }) {
  const typeInfo = TYPE_CONFIG[hero.type] ?? {
    label: hero.type,
    color: "text-slate-400",
    bg: "bg-slate-500/10 border-slate-500/30",
  };

  // بستن با کلیک روی backdrop
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  // بستن با Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // جلوگیری از scroll بدنه
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "oklch(0% 0 0 / 0.7)" }}
      onClick={handleBackdropClick}
    >
      {/* blur overlay جداگانه */}
      <div className="absolute inset-0 backdrop-blur-sm -z-10" />

      {/* کانتینر modal */}
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden border border-[oklch(28%_0.04_38/0.5)] bg-[oklch(14%_0.02_25)] shadow-2xl"
        dir="rtl"
        style={{
          animation: "modalIn 0.2s ease-out",
        }}
      >
        {/* عکس قهرمان */}
        <div className="relative h-72 sm:h-80 overflow-hidden">
          <img
            src={`/hero photos/${hero.file}`}
            alt={hero.name}
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x320/1a1a2e/6b7280?text=${encodeURIComponent(hero.name)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(14%_0.02_25)] via-[oklch(14%_0.02_25/0.15)] to-transparent" />

          {/* دکمه بستن */}
          <button
            onClick={onClose}
            aria-label="بستن"
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[oklch(10%_0.01_25/0.85)] border border-[oklch(25%_0.02_25)] text-[oklch(55%_0.02_25)] hover:text-[oklch(90%_0.02_60)] hover:bg-[oklch(18%_0.015_25)] flex items-center justify-center text-sm transition-all"
          >
            ✕
          </button>

          {/* badge ندرت روی عکس */}
          {hero.rarity === "S" && (
            <span className="absolute top-3 right-3 text-[10px] bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-full font-bold">
              نخبه
            </span>
          )}
        </div>

        {/* محتوا */}
        <div className="p-5 flex flex-col gap-4">
          {/* نام و نوع */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <RarityBadge rarity={hero.rarity} />
              <div>
                <h2 className="text-xl font-black text-[oklch(95%_0.03_60)] leading-tight">
                  {hero.name}
                </h2>
                <p className="text-xs text-[oklch(45%_0.02_25)] mt-0.5">
                  {hero.role}
                </p>
              </div>
            </div>
            <span
              className={`text-xs border px-2.5 py-1 rounded-full font-semibold shrink-0 mt-0.5 ${typeInfo.bg} ${typeInfo.color}`}
            >
              {typeInfo.label}
            </span>
          </div>

          {/* توضیحات */}
          <div className="rounded-xl bg-[oklch(17%_0.015_25)] border border-[oklch(20%_0.015_25)] p-3.5">
            <p className="text-[oklch(40%_0.02_25)] text-[10px] uppercase tracking-wide mb-1.5">
              توضیحات
            </p>
            <p className="text-sm text-[oklch(72%_0.02_60)] leading-relaxed">
              {hero.description}
            </p>
          </div>

          {/* آمار */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "ندرت", value: hero.rarity },
              { label: "نقش", value: hero.role },
              { label: "نوع", value: typeInfo.label },
              {
                label: "وضعیت",
                value: hero.rarity === "S" ? "نخبه" : "استاندارد",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-[oklch(16%_0.015_25)] border border-[oklch(20%_0.015_25)] px-3 py-2.5"
              >
                <p className="text-[oklch(35%_0.02_25)] text-[10px] mb-0.5">
                  {stat.label}
                </p>
                <p className="text-[oklch(78%_0.02_60)] text-xs font-semibold">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}

function HeroCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[oklch(22%_0.02_25)] bg-[oklch(15%_0.015_25)] animate-pulse">
      <div className="h-72 bg-[oklch(20%_0.015_25)]" />
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="w-7 h-7 rounded-full bg-[oklch(22%_0.02_25)]" />
          <div className="h-3 w-20 rounded bg-[oklch(22%_0.02_25)]" />
        </div>
        <div className="h-2 w-14 rounded bg-[oklch(20%_0.015_25)]" />
      </div>
    </div>
  );
}

export default function Heroes() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [rarityFilter, setRarityFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3001/heroes")
      .then((res) => {
        if (!res.ok) throw new Error(`خطا: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setHeroes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = heroes.filter((h) => {
    const matchSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.role.includes(search);
    const matchType = typeFilter === "all" || h.type === typeFilter;
    const matchRarity = rarityFilter === "all" || h.rarity === rarityFilter;
    return matchSearch && matchType && matchRarity;
  });

  const eliteCount = heroes.filter((h) => h.rarity === "S").length;

  return (
    <div
      className="min-h-screen bg-[oklch(13%_0.015_25)] text-[oklch(88%_0.02_60)]"
      dir="rtl"
    >
      {/* Header */}
      <div className="border-b border-[oklch(20%_0.015_25)] bg-[oklch(14%_0.015_25/0.85)] backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-black text-[oklch(96%_0.03_60)]">
            تمام قهرمان های نبرد امپراطوری
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "تعداد قهرمان",
              value: loading ? "..." : heroes.length,
              unit: "نفر",
              color: "text-[oklch(68%_0.19_38)]",
            },
            {
              label: "نخبه (S)",
              value: loading ? "..." : eliteCount,
              unit: "نفر",
              color: "text-amber-400",
            },
            {
              label: "انواع نقش",
              value: Object.keys(TYPE_CONFIG).length,
              unit: "نوع",
              color: "text-sky-400",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-[oklch(16%_0.015_25)] border border-[oklch(22%_0.02_25)] px-4 py-3"
            >
              <p className="text-[oklch(40%_0.02_25)] text-[10px] uppercase tracking-wide mb-1">
                {s.label}
              </p>
              <p className={`font-bold text-xl tabular-nums ${s.color}`}>
                {s.value}
                <span className="text-xs font-normal text-[oklch(40%_0.02_25)] mr-1">
                  {s.unit}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Error state */}
        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
            مشکل در بارگذاری داده‌ها: {error}
            <span className="block text-xs text-rose-500/70 mt-1">
              مطمئن شو که سرور API روی پورت 3001 در حال اجراست (npm run api)
            </span>
          </div>
        )}

        {/* Controls */}
        {!loading && !error && (
          <div className="flex flex-col gap-3">
            <input
              type="search"
              placeholder="جستجو در نام یا نقش..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[oklch(16%_0.015_25)] border border-[oklch(24%_0.02_25)] rounded-xl px-4 py-2.5 text-sm text-[oklch(88%_0.02_60)] placeholder:text-[oklch(35%_0.02_25)] focus:outline-none focus:border-[oklch(55%_0.15_38/0.6)] transition-colors"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setRarityFilter("all")}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                  rarityFilter === "all"
                    ? "bg-[oklch(68%_0.19_38)] border-[oklch(68%_0.19_38)] text-[oklch(10%_0.01_25)]"
                    : "bg-[oklch(18%_0.015_25)] border-[oklch(24%_0.02_25)] text-[oklch(55%_0.02_25)]"
                }`}
              >
                همه ندرت‌ها
              </button>
              {["S", "A", "B"].map((r) => {
                const cfg = RARITY_CONFIG[r];
                return (
                  <button
                    key={r}
                    onClick={() => setRarityFilter(r)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-bold ${
                      rarityFilter === r
                        ? "bg-[oklch(68%_0.19_38)] border-[oklch(68%_0.19_38)] text-[oklch(10%_0.01_25)]"
                        : `${cfg.bg} ${cfg.color}`
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
              <div className="w-px bg-[oklch(22%_0.02_25)] mx-1" />
              <button
                onClick={() => setTypeFilter("all")}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                  typeFilter === "all"
                    ? "bg-[oklch(68%_0.19_38)] border-[oklch(68%_0.19_38)] text-[oklch(10%_0.01_25)]"
                    : "bg-[oklch(18%_0.015_25)] border-[oklch(24%_0.02_25)] text-[oklch(55%_0.02_25)]"
                }`}
              >
                همه انواع
              </button>
              {Object.entries(TYPE_CONFIG).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setTypeFilter(key)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                    typeFilter === key
                      ? "bg-[oklch(68%_0.19_38)] border-[oklch(68%_0.19_38)] text-[oklch(10%_0.01_25)]"
                      : `${val.bg} ${val.color} hover:opacity-80`
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grid — حالا full-width چون modal روی همه چیز قرار میگیره */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <HeroCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-3">
            <span className="text-4xl opacity-20">🔍</span>
            <p className="text-[oklch(38%_0.02_25)] text-sm">
              نتیجه‌ای یافت نشد
            </p>
            <button
              onClick={() => {
                setSearch("");
                setTypeFilter("all");
                setRarityFilter("all");
              }}
              className="text-xs text-[oklch(68%_0.19_38)] hover:underline"
            >
              پاک کردن فیلترها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {filtered.map((h) => (
              <HeroCard
                key={h.id}
                hero={h}
                onClick={(hero) =>
                  setSelected((prev) => (prev?.id === hero.id ? null : hero))
                }
                selected={selected?.id === h.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal — خارج از grid، روی همه چیز */}
      {selected && (
        <HeroModal hero={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

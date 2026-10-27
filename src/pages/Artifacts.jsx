import { useState, useEffect } from "react";

const TYPE_LABELS = {
  attack: {
    label: "حمله",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/30",
  },
  mixed: {
    label: "ترکیبی",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/30",
  },
  march: {
    label: "لشگرکشی",
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/30",
  },
  research: {
    label: "تحقیق",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/30",
  },
  heal: {
    label: "درمان",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
  },
  gather: {
    label: "جمع‌آوری",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/30",
  },
  infantry: {
    label: "پیاده‌نظام",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/30",
  },
};

const ALL_TYPES = ["all", ...Object.keys(TYPE_LABELS)];

function ArtifactCard({ artifact }) {
  const [flipped, setFlipped] = useState(false);
  const typeInfo = TYPE_LABELS[artifact.type] ?? {
    label: artifact.type,
    color: "text-slate-400",
    bg: "bg-slate-500/10 border-slate-500/30",
  };

  return (
    <div
      className="relative cursor-pointer group"
      style={{ perspective: "800px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "340px",
        }}
      >
        {/* ── رو ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-[oklch(22%_0.02_25)] bg-[oklch(15%_0.015_25)] overflow-hidden flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative overflow-hidden h-44 shrink-0">
            <img
              src={artifact.image}
              alt={artifact.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(15%_0.015_25)] via-transparent to-transparent" />
            <span
              className={`absolute top-2 left-2 text-[10px] border px-2 py-0.5 rounded-full font-semibold ${typeInfo.bg} ${typeInfo.color}`}
            >
              {typeInfo.label}
            </span>
          </div>

          <div className="p-4 flex flex-col gap-2 flex-1">
            <h3
              className="font-black text-[oklch(93%_0.02_60)] text-base leading-tight"
              dir="rtl"
            >
              {artifact.name}
            </h3>
            <p
              className="text-xs text-[oklch(52%_0.02_25)] leading-relaxed"
              dir="rtl"
            >
              {artifact.bonus}
            </p>
            {artifact.skill ? (
              <div className="mt-auto pt-2 border-t border-[oklch(20%_0.015_25)] flex items-center justify-between gap-2">
                <span
                  className="text-[oklch(68%_0.19_38)] text-xs font-semibold"
                  dir="rtl"
                >
                  ⚡ {artifact.skill}
                </span>
                <span className="text-[oklch(38%_0.02_25)] text-[10px]">
                  برگردان ←
                </span>
              </div>
            ) : (
              <div className="mt-auto pt-2 border-t border-[oklch(20%_0.015_25)]">
                <span className="text-[oklch(38%_0.02_25)] text-[10px]">
                  بدون مهارت فعال
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── پشت ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-[oklch(28%_0.05_38/0.6)] bg-[oklch(14%_0.025_38/0.95)] flex flex-col gap-4 p-5"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-start justify-between gap-2" dir="rtl">
            <h3 className="font-black text-[oklch(93%_0.02_60)] text-base">
              {artifact.name}
            </h3>
            <span
              className={`text-[10px] border px-2 py-0.5 rounded-full font-semibold shrink-0 ${typeInfo.bg} ${typeInfo.color}`}
            >
              {typeInfo.label}
            </span>
          </div>

          <div
            className="rounded-xl bg-[oklch(18%_0.015_25)] p-3 flex flex-col gap-1"
            dir="rtl"
          >
            <p className="text-[oklch(42%_0.02_25)] text-[10px] uppercase tracking-wide mb-1">
              امتیاز ویژگی
            </p>
            <p className="text-sm text-[oklch(78%_0.02_60)] leading-relaxed">
              {artifact.bonus}
            </p>
          </div>

          {artifact.skill ? (
            <div
              className="rounded-xl bg-[oklch(16%_0.025_38/0.5)] border border-[oklch(28%_0.05_38/0.4)] p-3 flex flex-col gap-2 flex-1"
              dir="rtl"
            >
              <p className="text-[oklch(68%_0.19_38)] font-bold text-sm">
                ⚡ {artifact.skill}
              </p>
              <p className="text-xs text-[oklch(60%_0.02_25)] leading-relaxed">
                {artifact.skillDesc}
              </p>
            </div>
          ) : (
            <div
              className="rounded-xl bg-[oklch(17%_0.015_25)] border border-[oklch(22%_0.02_25)] p-3 flex-1 flex items-center justify-center"
              dir="rtl"
            >
              <p className="text-[oklch(35%_0.02_25)] text-xs">
                این سلاح مهارت فعال ندارد
              </p>
            </div>
          )}

          <p className="text-center text-[oklch(32%_0.02_25)] text-[10px]">
            ← برگشت
          </p>
        </div>
      </div>
    </div>
  );
}

// Skeleton برای حالت loading
function ArtifactCardSkeleton() {
  return (
    <div
      className="rounded-2xl border border-[oklch(22%_0.02_25)] bg-[oklch(15%_0.015_25)] animate-pulse overflow-hidden"
      style={{ minHeight: "340px" }}
    >
      <div className="h-44 bg-[oklch(20%_0.015_25)]" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-3/4 rounded bg-[oklch(22%_0.02_25)]" />
        <div className="h-2 w-full rounded bg-[oklch(20%_0.015_25)]" />
        <div className="h-2 w-2/3 rounded bg-[oklch(20%_0.015_25)]" />
      </div>
    </div>
  );
}

export default function Artifacts() {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3001/artifacts")
      .then((res) => {
        if (!res.ok) throw new Error(`خطا: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setArtifacts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = artifacts.filter((a) => {
    const matchSearch =
      a.name.includes(search) || (a.skill && a.skill.includes(search));
    const matchType = typeFilter === "all" || a.type === typeFilter;
    return matchSearch && matchType;
  });

  const skillCount = artifacts.filter((a) => a.skill).length;

  return (
    <div
      className="min-h-screen bg-[oklch(13%_0.015_25)] text-[oklch(88%_0.02_60)]"
      dir="rtl"
    >
      {/* ── Header ── */}
      <div className="border-b border-[oklch(20%_0.015_25)] bg-[oklch(14%_0.015_25/0.85)] backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[oklch(68%_0.19_38)]">
            سرور ۵۶۶
          </p>
          <h1 className="text-2xl font-black text-[oklch(96%_0.03_60)]">
            سلاح‌های جادویی
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "تعداد سلاح",
              value: loading ? "..." : artifacts.length,
              unit: "عدد",
              color: "text-[oklch(68%_0.19_38)]",
            },
            {
              label: "دارای مهارت",
              value: loading ? "..." : skillCount,
              unit: "عدد",
              color: "text-amber-400",
            },
            {
              label: "انواع",
              value: Object.keys(TYPE_LABELS).length,
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

        {/* ── Controls ── */}
        {!loading && !error && (
          <div className="flex flex-col gap-3">
            <input
              type="search"
              placeholder="جستجو در نام یا مهارت..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[oklch(16%_0.015_25)] border border-[oklch(24%_0.02_25)] rounded-xl px-4 py-2.5 text-sm text-[oklch(88%_0.02_60)] placeholder:text-[oklch(35%_0.02_25)] focus:outline-none focus:border-[oklch(55%_0.15_38/0.6)] transition-colors"
            />
            <div className="flex flex-wrap gap-2">
              {ALL_TYPES.map((t) => {
                const info = TYPE_LABELS[t];
                const isActive = typeFilter === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                      isActive
                        ? "bg-[oklch(68%_0.19_38)] border-[oklch(68%_0.19_38)] text-[oklch(10%_0.01_25)]"
                        : info
                          ? `${info.bg} ${info.color} hover:opacity-80`
                          : "bg-[oklch(18%_0.015_25)] border-[oklch(24%_0.02_25)] text-[oklch(55%_0.02_25)] hover:text-[oklch(75%_0.02_60)]"
                    }`}
                  >
                    {t === "all" ? "همه" : (info?.label ?? t)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArtifactCardSkeleton key={i} />
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
              }}
              className="text-xs text-[oklch(68%_0.19_38)] hover:underline"
            >
              پاک کردن فیلترها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((a) => (
              <ArtifactCard key={a.id} artifact={a} />
            ))}
          </div>
        )}

        {/* ── راهنما ── */}
        {!loading && !error && (
          <div className="rounded-2xl border border-[oklch(25%_0.03_38/0.4)] bg-[oklch(15%_0.02_38/0.25)] p-4 flex gap-3 items-start text-xs text-[oklch(48%_0.02_25)] leading-relaxed">
            <span className="text-base shrink-0">💡</span>
            <p>برای دیدن توضیح مهارت هر سلاح روی کارت کلیک کن تا برگردد.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";

// ── نسبت ارزش/قیمت → رتبه‌بندی ──
function getEfficiency(value, price) {
  const ratio = value / price;
  if (ratio >= 0.4)
    return {
      label: "عالی",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
    };
  if (ratio >= 0.2)
    return {
      label: "خوب",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/30",
    };
  if (ratio >= 0.1)
    return {
      label: "متوسط",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/30",
    };
  return {
    label: "ضعیف",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/30",
  };
}

const SORT_OPTIONS = [
  { label: "پیش‌فرض", value: "default" },
  { label: "ارزان‌ترین", value: "price_asc" },
  { label: "گران‌ترین", value: "price_desc" },
  { label: "بیشترین ارزش", value: "value_desc" },
  { label: "بهترین بازده", value: "efficiency" },
];

function StatBar({ value, max, color }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="h-1.5 w-full rounded-full bg-[oklch(22%_0.015_25)] overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ResourceCard({ resource, maxPrice, maxValue }) {
  const eff = getEfficiency(resource.value, resource.price);

  return (
    <div className="rounded-2xl border border-[oklch(22%_0.02_25)] bg-[oklch(15%_0.015_25)] overflow-hidden hover:border-[oklch(45%_0.15_38/0.5)] hover:-translate-y-0.5 transition-all duration-200 group flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={resource.image}
          alt={resource.name}
          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(15%_0.015_25)] via-transparent to-transparent" />
        <span className="absolute top-2 right-2 text-[10px] bg-[oklch(10%_0.01_25/0.85)] border border-[oklch(28%_0.02_25)] text-[oklch(50%_0.02_25)] px-2 py-0.5 rounded-full">
          سرور {resource.server}
        </span>
        <span
          className={`absolute top-2 left-2 text-[10px] border px-2 py-0.5 rounded-full font-semibold ${eff.bg} ${eff.color}`}
        >
          {eff.label}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-[oklch(93%_0.02_60)] text-base">
          {resource.name}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[oklch(18%_0.015_25)] p-2.5 flex flex-col gap-1">
            <span className="text-[oklch(42%_0.02_25)] text-[10px] uppercase tracking-wide">
              قیمت
            </span>
            <span className="text-[oklch(68%_0.19_38)] font-bold text-sm tabular-nums">
              {resource.price.toLocaleString("fa-IR")} 💰
            </span>
            <StatBar
              value={resource.price}
              max={maxPrice}
              color="bg-[oklch(68%_0.19_38)]"
            />
          </div>
          <div className="rounded-xl bg-[oklch(18%_0.015_25)] p-2.5 flex flex-col gap-1">
            <span className="text-[oklch(42%_0.02_25)] text-[10px] uppercase tracking-wide">
              ارزش
            </span>
            <span className="text-[oklch(60%_0.18_145)] font-bold text-sm tabular-nums">
              {resource.value.toLocaleString("fa-IR")} ✨
            </span>
            <StatBar
              value={resource.value}
              max={maxValue}
              color="bg-[oklch(60%_0.18_145)]"
            />
          </div>
        </div>

        <div className="mt-auto pt-2 border-t border-[oklch(20%_0.015_25)] flex items-center justify-between">
          <span className="text-[oklch(38%_0.02_25)] text-xs">بازده</span>
          <span className={`font-mono text-xs font-semibold ${eff.color}`}>
            {(resource.value / resource.price).toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton ──
function ResourceCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[oklch(22%_0.02_25)] bg-[oklch(15%_0.015_25)] animate-pulse overflow-hidden flex flex-col">
      <div className="h-36 bg-[oklch(20%_0.015_25)]" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-2/3 rounded bg-[oklch(22%_0.02_25)]" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-14 rounded-xl bg-[oklch(18%_0.015_25)]" />
          <div className="h-14 rounded-xl bg-[oklch(18%_0.015_25)]" />
        </div>
      </div>
    </div>
  );
}

// ── جدول مقایسه ──
function CompareTable({ resources }) {
  const best = resources.reduce((a, b) =>
    b.value / b.price > a.value / a.price ? b : a,
  );

  return (
    <div className="rounded-2xl border border-[oklch(22%_0.02_25)] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[oklch(17%_0.015_25)] border-b border-[oklch(22%_0.02_25)]">
            {["منبع", "قیمت", "ارزش", "بازده", "رتبه"].map((h) => (
              <th
                key={h}
                className="text-right px-4 py-3 text-[oklch(45%_0.02_25)] font-medium text-xs uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resources.map((r) => {
            const eff = getEfficiency(r.value, r.price);
            const isBest = r.id === best.id;
            return (
              <tr
                key={r.id}
                className={`border-b border-[oklch(20%_0.015_25)] last:border-0 transition-colors ${
                  isBest
                    ? "bg-[oklch(18%_0.02_38/0.4)]"
                    : "hover:bg-[oklch(17%_0.015_25)]"
                }`}
              >
                <td className="px-4 py-3 font-semibold text-[oklch(88%_0.02_60)] flex items-center gap-2">
                  {isBest && (
                    <span className="text-[oklch(68%_0.19_38)] text-xs">★</span>
                  )}
                  {r.name}
                </td>
                <td className="px-4 py-3 tabular-nums text-[oklch(68%_0.19_38)]">
                  {r.price.toLocaleString("fa-IR")}
                </td>
                <td className="px-4 py-3 tabular-nums text-[oklch(60%_0.18_145)]">
                  {r.value.toLocaleString("fa-IR")}
                </td>
                <td className={`px-4 py-3 tabular-nums font-mono ${eff.color}`}>
                  {(r.value / r.price).toFixed(3)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-[10px] border px-2 py-0.5 rounded-full font-semibold ${eff.bg} ${eff.color}`}
                  >
                    {eff.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  useEffect(() => {
    fetch("http://localhost:3001/resources")
      .then((res) => {
        if (!res.ok) throw new Error(`خطا: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // پشتیبانی از هر دو ساختار: آرایه مستقیم یا { resources: [...] }
        setResources(Array.isArray(data) ? data : (data.resources ?? []));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const maxPrice = resources.length
    ? Math.max(...resources.map((r) => r.price))
    : 1;
  const maxValue = resources.length
    ? Math.max(...resources.map((r) => r.value))
    : 1;

  const filtered = [...resources]
    .filter((r) => r.name.includes(search))
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "value_desc") return b.value - a.value;
      if (sort === "efficiency") return b.value / b.price - a.value / a.price;
      return a.id - b.id;
    });

  const totalResources = resources.length;
  const avgEfficiency = totalResources
    ? resources.reduce((s, r) => s + r.value / r.price, 0) / totalResources
    : 0;
  const bestResource = totalResources
    ? resources.reduce((a, b) =>
        b.value / b.price > a.value / a.price ? b : a,
      )
    : null;
  const cheapest = totalResources
    ? resources.reduce((a, b) => (b.price < a.price ? b : a))
    : null;

  return (
    <div className="min-h-screen bg-[oklch(13%_0.015_25)] text-[oklch(88%_0.02_60)]">
      {/* ── Header ── */}
      <div className="border-b border-[oklch(20%_0.015_25)] bg-[oklch(14%_0.015_25/0.8)] backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[oklch(68%_0.19_38)]">
              بازار
            </p>
            <h1 className="text-xl font-black text-[oklch(96%_0.03_60)]">
              منابع{resources[0]?.server ? ` سرور ${resources[0].server}` : ""}
            </h1>
          </div>
          <div className="flex items-center gap-1 bg-[oklch(17%_0.015_25)] border border-[oklch(24%_0.02_25)] rounded-lg p-1">
            {[
              ["grid", "⊞"],
              ["table", "☰"],
            ].map(([v, icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  view === v
                    ? "bg-[oklch(68%_0.19_38)] text-[oklch(10%_0.01_25)] font-bold"
                    : "text-[oklch(50%_0.02_25)] hover:text-[oklch(78%_0.02_60)]"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "تعداد منابع",
              value: loading ? "..." : totalResources,
              unit: "نوع",
              color: "text-[oklch(68%_0.19_38)]",
            },
            {
              label: "میانگین بازده",
              value: loading ? "..." : avgEfficiency.toFixed(3),
              unit: "",
              color: "text-[oklch(60%_0.18_145)]",
            },
            {
              label: "بهترین بازده",
              value: loading ? "..." : (bestResource?.name ?? "—"),
              unit: "",
              color: "text-amber-400",
            },
            {
              label: "ارزان‌ترین",
              value: loading ? "..." : (cheapest?.name ?? "—"),
              unit: "",
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
              <p className={`font-bold text-base tabular-nums ${s.color}`}>
                {s.value}
                {s.unit && (
                  <span className="text-xs font-normal text-[oklch(45%_0.02_25)] mr-1">
                    {s.unit}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        {/* ── Error ── */}
        {error && (
          <div
            className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400"
            dir="rtl"
          >
            مشکل در بارگذاری داده‌ها: {error}
            <span className="block text-xs text-rose-500/70 mt-1">
              مطمئن شو که سرور API روی پورت 3001 در حال اجراست (npm run api)
            </span>
          </div>
        )}

        {/* ── Controls ── */}
        {!loading && !error && (
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="search"
              placeholder="جستجوی منبع..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-[oklch(16%_0.015_25)] border border-[oklch(24%_0.02_25)] rounded-xl px-4 py-2.5 text-sm text-[oklch(88%_0.02_60)] placeholder:text-[oklch(35%_0.02_25)] focus:outline-none focus:border-[oklch(55%_0.15_38/0.6)] transition-colors"
              dir="rtl"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[oklch(16%_0.015_25)] border border-[oklch(24%_0.02_25)] rounded-xl px-4 py-2.5 text-sm text-[oklch(70%_0.02_60)] focus:outline-none focus:border-[oklch(55%_0.15_38/0.6)] transition-colors"
              dir="rtl"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ── Content ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ResourceCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-3">
            <span className="text-4xl opacity-30">🔍</span>
            <p className="text-[oklch(38%_0.02_25)] text-sm">
              نتیجه‌ای برای «{search}» یافت نشد
            </p>
            <button
              onClick={() => setSearch("")}
              className="text-xs text-[oklch(68%_0.19_38)] hover:underline"
            >
              پاک کردن جستجو
            </button>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((r) => (
              <ResourceCard
                key={r.id}
                resource={r}
                maxPrice={maxPrice}
                maxValue={maxValue}
              />
            ))}
          </div>
        ) : (
          <CompareTable resources={filtered} />
        )}

        {/* ── راهنما ── */}
        {!loading && !error && (
          <div className="rounded-2xl border border-[oklch(25%_0.03_38/0.5)] bg-[oklch(15%_0.02_38/0.3)] p-5 flex gap-4 items-start">
            <span className="text-xl shrink-0 mt-0.5">💡</span>
            <div
              className="text-xs text-[oklch(50%_0.02_25)] leading-relaxed space-y-1"
              dir="rtl"
            >
              <p>
                <span className="text-[oklch(68%_0.02_60)] font-semibold">
                  بازده
                </span>{" "}
                = ارزش ÷ قیمت — هرچه بالاتر، منبع سودمندتر است.
              </p>
              {resources[0]?.server && (
                <p>
                  قیمت‌ها بر اساس بازار سرور {resources[0].server} هستند و ممکن
                  است در سرورهای دیگر متفاوت باشد.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

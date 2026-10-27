import { useState } from "react";

const heroBase = (filename) => `/hero%20photos/${filename}`;

const categories = {
  سواره‌نظام: [
    {
      title: "تیم ۱",
      heroes: [
        { name: "سزار", img: heroBase("sezar.jpg") },
        { name: "ژاندارک", img: heroBase("john.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "دستان", img: heroBase("dastan.jpg") },
      ],
    },
    {
      title: "تیم ۲",
      heroes: [
        { name: "سزار", img: heroBase("sezar.jpg") },
        { name: "ژاندارک", img: heroBase("john.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "التای", img: heroBase("altay.jpg") },
      ],
    },
    {
      title: "تیم ۳",
      heroes: [
        { name: "سزار", img: heroBase("sezar.jpg") },
        { name: "ژاندارک", img: heroBase("john.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "دیودورا", img: heroBase("devodora.jpg") },
      ],
    },
    {
      title: "تیم ۴",
      heroes: [
        { name: "سزار", img: heroBase("sezar.jpg") },
        { name: "ژاندارک", img: heroBase("john.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "کلئوپاترا", img: heroBase("kelopadra.jpg") },
      ],
    },
  ],
  کماندار: [
    {
      title: "تیم ۱",
      heroes: [
        { name: "سزار", img: heroBase("sezar.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "هیپاتیا", img: heroBase("hipa.jpg") },
        { name: "ریچارد", img: heroBase("rich.jpg") },
      ],
    },
    {
      title: "تیم ۲",
      heroes: [
        { name: "سزار", img: heroBase("sezar.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "هیپاتیا", img: heroBase("hipa.jpg") },
        { name: "ادوارد", img: heroBase("edvaard.jpg") },
      ],
    },
    {
      title: "تیم ۳",
      heroes: [
        { name: "سزار", img: heroBase("sezar.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "هیپاتیا", img: heroBase("hipa.jpg") },
        { name: "الینور", img: heroBase("elinor.jpg") },
      ],
    },
    {
      title: "تیم ۴",
      heroes: [
        { name: "سزار", img: heroBase("sezar.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "هیپاتیا", img: heroBase("hipa.jpg") },
        { name: "اریک", img: heroBase("eric.jpg") },
      ],
    },
  ],
  پیاده‌نظام: [
    {
      title: "تیم ۱",
      heroes: [
        { name: "سزار", img: heroBase("sezar.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "هیپاتیا", img: heroBase("hipa.jpg") },
        { name: "مری", img: heroBase("mery.jpg") },
      ],
    },
    {
      title: "تیم ۲",
      heroes: [
        { name: "سزار", img: heroBase("sezar.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "هیپاتیا", img: heroBase("hipa.jpg") },
        { name: "بارتولی", img: heroBase("bartoli.jpg") },
      ],
    },
  ],
  "تجهیزات محاصره": [
    {
      title: "تیم ثابت",
      heroes: [
        { name: "سزار", img: heroBase("sezar.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "ژاندارک", img: heroBase("john.jpg") },
        { name: "ماتیلدا", img: heroBase("matilda.jpg") },
      ],
    },
  ],
  فیلری‌ها: [
    {
      title: "تیم ۱",
      heroes: [
        { name: "دستان", img: heroBase("dastan.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "ژاندارک", img: heroBase("john.jpg") },
        { name: "التای", img: heroBase("altay.jpg") },
      ],
    },
    {
      title: "تیم ۲",
      heroes: [
        { name: "ریچارد", img: heroBase("rich.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "هیپاتیا", img: heroBase("hipa.jpg") },
        { name: "الینور", img: heroBase("elinor.jpg") },
      ],
    },
    {
      title: "تیم ۳",
      heroes: [
        { name: "ریچارد", img: heroBase("rich.jpg") },
        { name: "چنگیز", img: heroBase("changiz.jpg") },
        { name: "الکس", img: heroBase("alex.jpg") },
        { name: "هیپاتیا", img: heroBase("hipa.jpg") },
        { name: "ادوارد", img: heroBase("edvaard.jpg") },
      ],
    },
  ],
};

export default function CombinationOfHeroes() {
  const [activeTab, setActiveTab] = useState("سواره‌نظام");
  const tabs = Object.keys(categories);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 py-10 font-[Cinzel]">
      <h1 className="text-center text-3xl tracking-widest mb-10 text-amber-400 uppercase">
        Hero Combinations
      </h1>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm tracking-wide border transition-all duration-200 ${
              activeTab === tab
                ? "bg-amber-500 border-amber-500 text-black font-bold"
                : "border-amber-700 text-amber-300 hover:bg-amber-900/30"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories[activeTab].map((team) => (
          <div
            key={team.title}
            className="bg-[#1a1a1a] border border-amber-900/40 rounded-2xl p-5"
          >
            <h2 className="text-amber-400 text-center text-lg mb-5 tracking-widest uppercase">
              {team.title}
            </h2>
            <div className="flex justify-center gap-3 flex-wrap">
              {team.heroes.map((hero) => (
                <div
                  key={hero.name}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-600 bg-[#111]">
                    <img
                      src={hero.img}
                      alt={hero.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <span className="text-xs text-amber-200 tracking-wide">
                    {hero.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

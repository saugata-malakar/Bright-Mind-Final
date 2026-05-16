import { useState } from 'react';
import { Search, Book, FileText, Globe, GraduationCap, Video, Star, Clock, ExternalLink, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Resource {
  id: number; title: string; subject: string; grade: string; type: string;
  source: string; rating: number; duration: string; description: string;
  docs: string; url: string;
}

const R: Resource[] = [
  { id:1, title:'Adding Fractions with Unlike Denominators', subject:'Mathematics', grade:'Grade 5', type:'Lesson', source:'OER Commons', rating:4.8, duration:'25 min', description:'Step-by-step guide to finding common denominators and adding fractions.', url:'https://www.khanacademy.org/math/arithmetic/fraction-arithmetic',
    docs:`📘 LESSON: Adding Fractions with Unlike Denominators

🎯 Learning Objective: Add fractions with different denominators by finding the LCD.

📖 Key Concepts:

1. WHY can't we add 1/2 + 1/3 directly?
   → The pieces are different sizes! A half ≠ a third.

2. STEP 1 — Find the Least Common Denominator (LCD)
   → LCD of 2 and 3 = 6
   → Multiples of 2: 2, 4, 6 ✓
   → Multiples of 3: 3, 6 ✓

3. STEP 2 — Convert to equivalent fractions
   → 1/2 = 3/6  (multiply top & bottom by 3)
   → 1/3 = 2/6  (multiply top & bottom by 2)

4. STEP 3 — Add the numerators
   → 3/6 + 2/6 = 5/6

5. STEP 4 — Simplify if possible
   → 5/6 is already in simplest form ✓

🍕 Visual Model: Imagine two pizzas. Cut one into 2 slices, the other into 3. To compare, re-cut both into 6 equal slices.

✏️ Practice Problems:
  a) 1/4 + 1/3 = ?    (Answer: 7/12)
  b) 2/5 + 1/2 = ?    (Answer: 9/10)
  c) 3/8 + 1/4 = ?    (Answer: 5/8)

📝 Common Mistakes:
  ✗ Adding numerators AND denominators: 1/2+1/3 ≠ 2/5
  ✗ Forgetting to simplify the final answer` },

  { id:2, title:'Introduction to Linear Equations', subject:'Mathematics', grade:'Grade 7', type:'Lesson', source:'Khan Academy', rating:4.9, duration:'30 min', description:'Solve single-variable linear equations using the balance method.', url:'https://www.khanacademy.org/math/algebra/one-variable-linear-equations',
    docs:`📘 LESSON: Linear Equations

🎯 Objective: Solve equations like 2x + 5 = 13

📖 The Balance Method:
Think of '=' as a balance scale. Both sides must stay equal.

⚖️ Golden Rule: Whatever you do to one side, do to the other!

Example: Solve 2x + 5 = 13
  Step 1: Subtract 5 from both sides → 2x = 8
  Step 2: Divide both sides by 2 → x = 4
  Step 3: Check — 2(4) + 5 = 13 ✓

📝 Types of Equations:
  • One-step: x + 3 = 7 → x = 4
  • Two-step: 3x - 1 = 8 → x = 3
  • Variables on both sides: 2x + 1 = x + 5 → x = 4

✏️ Practice:
  a) x + 7 = 12      → x = 5
  b) 3x = 21          → x = 7
  c) 4x - 3 = 17      → x = 5
  d) 2x + 6 = x + 10  → x = 4` },

  { id:3, title:'Photosynthesis: How Plants Make Food', subject:'Sciences', grade:'Grade 6', type:'Video', source:'CK-12', rating:4.7, duration:'15 min', description:'Light-dependent and light-independent reactions explained.', url:'https://www.khanacademy.org/science/biology/photosynthesis-in-plants',
    docs:`🌱 LESSON: Photosynthesis

🎯 Objective: Understand how plants convert sunlight into food.

📖 The Equation:
  6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂
  Carbon Dioxide + Water + Sunlight → Glucose + Oxygen

🔬 Two Stages:

1. LIGHT-DEPENDENT REACTIONS (in Thylakoids)
   → Chlorophyll absorbs sunlight
   → Water molecules split (H₂O → H⁺ + O₂)
   → Produces ATP and NADPH
   → Oxygen released as byproduct!

2. CALVIN CYCLE (in Stroma)
   → Uses ATP + NADPH from Stage 1
   → CO₂ from air is 'fixed' into glucose
   → Glucose = food for the plant

🍃 Why are plants green?
  → Chlorophyll reflects green light, absorbs red & blue.

🌍 Why it matters:
  → Plants produce the oxygen we breathe
  → Base of almost every food chain

✏️ Quick Quiz:
  1. Where does photosynthesis occur? (Chloroplasts)
  2. What gas is released? (Oxygen)
  3. What is the energy source? (Sunlight)` },

  { id:4, title:'The Water Cycle Explained', subject:'Sciences', grade:'Grade 4', type:'Interactive', source:'OER Commons', rating:4.6, duration:'20 min', description:'Evaporation, condensation, precipitation, and collection.', url:'https://www.khanacademy.org/science/biology/ecology/biogeochemical-cycles',
    docs:`💧 LESSON: The Water Cycle

🎯 Objective: Understand the 4 stages of the water cycle.

📖 The 4 Stages:

1. ☀️ EVAPORATION
   → Sun heats water in oceans, lakes, rivers
   → Liquid water → water vapor (gas)

2. ☁️ CONDENSATION
   → Water vapor cools as it rises
   → Gas → tiny water droplets → clouds!

3. 🌧️ PRECIPITATION
   → Clouds get heavy with water
   → Falls as rain, snow, sleet, or hail

4. 🏔️ COLLECTION
   → Water collects in oceans, rivers, lakes
   → Some seeps underground (groundwater)
   → Cycle starts again!

🔑 Key Vocabulary:
  • Transpiration: Water released by plants
  • Runoff: Water flowing over land
  • Groundwater: Water stored underground` },

  { id:5, title:'World War II: Causes and Effects', subject:'Humanities', grade:'Grade 8', type:'Reading', source:'Wikipedia', rating:4.5, duration:'35 min', description:'WWII from Treaty of Versailles to the United Nations.', url:'https://en.wikipedia.org/wiki/World_War_II',
    docs:`📜 LESSON: World War II (1939-1945)

🎯 Objective: Understand causes, key events, and effects.

📖 CAUSES:
  1. Treaty of Versailles (1919) — Harsh penalties on Germany
  2. Rise of Fascism — Hitler, Mussolini
  3. Appeasement Policy — Allies tried to avoid war
  4. Invasion of Poland (Sept 1, 1939) — War begins

⚔️ KEY EVENTS:
  • 1940: Fall of France, Battle of Britain
  • 1941: Pearl Harbor → USA enters war
  • 1942: Battle of Stalingrad (turning point)
  • 1944: D-Day — Allied invasion of Normandy
  • 1945: Fall of Berlin, atomic bombs on Japan

📊 BY THE NUMBERS:
  • Duration: 6 years | Countries: 30+ | Casualties: ~70-85M

🌍 EFFECTS:
  1. United Nations formed (1945)
  2. Cold War begins (USA vs USSR)
  3. Decolonization of Africa & Asia
  4. Universal Declaration of Human Rights` },

  { id:6, title:'Understanding Democracy', subject:'Humanities', grade:'Grade 6', type:'Lesson', source:'OER Commons', rating:4.4, duration:'20 min', description:'Principles of democracy, voting, and representation.', url:'https://en.wikipedia.org/wiki/Democracy',
    docs:`🏛️ LESSON: Understanding Democracy

🎯 Objective: Learn core principles of democratic government.

📖 What is Democracy?
  → Government BY the people, FOR the people
  → Greek: 'demos' (people) + 'kratos' (power)

🔑 Core Principles:
  1. Free & Fair Elections
  2. Rule of Law — no one is above the law
  3. Separation of Powers (Executive, Legislative, Judicial)
  4. Protection of Rights & Freedoms
  5. Majority Rule + Minority Rights

📊 Types:
  • Direct Democracy — citizens vote on every issue
  • Representative Democracy — citizens elect leaders

🌍 Examples:
  • India — largest democracy (1.4B people)
  • USA — oldest continuous constitution
  • Switzerland — famous for direct democracy` },

  { id:7, title:'Multiplication Tables Mastery', subject:'Mathematics', grade:'Grade 3', type:'Practice', source:'CK-12', rating:4.9, duration:'15 min', description:'Flashcard drill for times tables 1-12.', url:'https://www.khanacademy.org/math/arithmetic/multiplication-division',
    docs:`✖️ LESSON: Multiplication Tables

🎯 Objective: Master times tables 1 through 12.

📖 Tips & Tricks:
  × 2: Double the number
  × 5: Ends in 0 or 5
  × 9: Digits always add to 9! (9,18,27,36...)
  × 10: Just add a zero
  × 11: Repeat the digit (up to 9×11)

🧠 Hardest Facts:
  7 × 8 = 56 (5,6,7,8!)
  6 × 7 = 42 | 6 × 8 = 48 | 8 × 9 = 72` },

  { id:8, title:'The Solar System Tour', subject:'Sciences', grade:'Grade 5', type:'Interactive', source:'NASA', rating:4.8, duration:'25 min', description:'Tour of all 8 planets with facts and comparisons.', url:'https://solarsystem.nasa.gov/planets/overview/',
    docs:`🪐 LESSON: The Solar System

🎯 Objective: Learn the 8 planets and key facts.

📖 Order (from Sun):
  My Very Educated Mother Just Served Us Nachos
  Mercury → Venus → Earth → Mars → Jupiter → Saturn → Uranus → Neptune

🌍 Planet Facts:
  ☿ Mercury: Smallest, closest to Sun
  ♀ Venus: Hottest (462°C!), spins backward
  🌍 Earth: Only known life, 71% water
  ♂ Mars: Red planet, Olympus Mons volcano
  ♃ Jupiter: Largest, Great Red Spot
  ♄ Saturn: Beautiful rings of ice & rock
  ♅ Uranus: Tilted sideways, ice giant
  ♆ Neptune: Windiest, furthest from Sun

📊 Scale: If Sun = basketball, Earth = peppercorn 26m away!` },

  { id:9, title:'Essay Writing: Introduction & Thesis', subject:'Humanities', grade:'Grade 7', type:'Lesson', source:'Khan Academy', rating:4.6, duration:'20 min', description:'Write strong introductions and thesis statements.', url:'https://www.khanacademy.org/humanities/grammar',
    docs:`✍️ LESSON: Essay Writing — Introduction & Thesis

🎯 Objective: Write a compelling introduction paragraph.

📖 Structure:
  1. HOOK — Grab attention
  2. CONTEXT — Background info
  3. THESIS — Your argument (last sentence!)

🎣 Types of Hooks:
  • Question: 'Have you ever wondered why...?'
  • Statistic: '78% of students say...'
  • Quote: 'As Einstein once said...'

📝 Thesis Rules:
  ✗ Bad: 'Dogs are nice.'
  ✓ Good: 'Dogs make better pets than cats because they are loyal, trainable, and promote exercise.'` },

  { id:10, title:'Area and Perimeter of Shapes', subject:'Mathematics', grade:'Grade 4', type:'Lesson', source:'CK-12', rating:4.7, duration:'25 min', description:'Calculate area and perimeter for common shapes.', url:'https://www.khanacademy.org/math/geometry-home/geometry-area-perimeter',
    docs:`📐 LESSON: Area and Perimeter

🎯 Objective: Calculate area (inside) and perimeter (around).

📖 Formulas:
  RECTANGLE: P = 2(l+w) | A = l×w
  TRIANGLE: P = a+b+c | A = ½×base×height
  CIRCLE: C = 2πr | A = πr²

💡 Remember:
  • Perimeter = fence around a yard (cm, m)
  • Area = carpet covering a floor (cm², m²)

✏️ Practice:
  1. Rectangle: l=8cm, w=5cm → P=26cm, A=40cm²
  2. Triangle: b=6cm, h=4cm → A=12cm²
  3. Circle: r=7cm → C≈44cm, A≈154cm²` },

  { id:11, title:'Cells: Building Blocks of Life', subject:'Sciences', grade:'Grade 7', type:'Video', source:'CK-12', rating:4.8, duration:'18 min', description:'Plant and animal cells, organelles, and functions.', url:'https://www.khanacademy.org/science/biology/structure-of-a-cell',
    docs:`🔬 LESSON: Cells — Building Blocks of Life

🎯 Objective: Identify cell parts and their functions.

📖 Cell Theory:
  1. All living things are made of cells
  2. Cells are the basic unit of life
  3. All cells come from existing cells

🧫 Key Organelles:
  • Nucleus — 'Brain' — contains DNA
  • Mitochondria — 'Powerhouse' — makes energy (ATP)
  • Cell Membrane — 'Security gate' — controls entry/exit
  • Ribosomes — 'Factories' — makes proteins
  • Golgi Apparatus — 'Post office' — packages proteins

🌱 Plant cells ALSO have:
  • Cell Wall — rigid outer layer
  • Chloroplasts — for photosynthesis
  • Large central vacuole — stores water` },

  { id:12, title:'Ancient Civilizations: Egypt & Mesopotamia', subject:'Humanities', grade:'Grade 6', type:'Reading', source:'Wikipedia', rating:4.5, duration:'30 min', description:'Rise of agriculture, writing, and first societies.', url:'https://en.wikipedia.org/wiki/Ancient_Egypt',
    docs:`🏺 LESSON: Ancient Civilizations

📖 Mesopotamia ('Land Between Rivers')
  📍 Modern-day Iraq (Tigris & Euphrates)
  📅 ~3500 BCE
  🔑 Achievements:
    • Cuneiform — first writing
    • Wheel — transportation revolution
    • Code of Hammurabi — first written laws
    • 60-base number system (60 minutes!)

📖 Ancient Egypt
  📍 Nile River Valley, North Africa
  📅 ~3100 BCE
  🔑 Achievements:
    • Pyramids of Giza
    • Hieroglyphics
    • Papyrus — early 'paper'
    • 365-day calendar

🤔 Why near rivers? Fertile soil + fresh water + transport` },
];

const CATS = [
  { name:'Mathematics', icon:Book, color:'from-blue-500 to-indigo-600', bg:'bg-blue-50 border-blue-100' },
  { name:'Sciences', icon:Globe, color:'from-green-500 to-emerald-600', bg:'bg-green-50 border-green-100' },
  { name:'Humanities', icon:FileText, color:'from-amber-500 to-orange-600', bg:'bg-amber-50 border-amber-100' },
];
CATS.forEach(c => { (c as any).count = R.filter(r => r.subject === c.name).length; });

const ICONS: Record<string, any> = { Lesson:GraduationCap, Video:Video, Reading:FileText, Interactive:Globe, Practice:Star };

export function CurriculumBase() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState<string|null>(null);
  const [open, setOpen] = useState<number|null>(null);

  const list = R.filter(r => {
    const q = search.toLowerCase();
    const matchQ = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q);
    const matchC = !cat || r.subject === cat;
    return matchQ && matchC;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-2">Educational Knowledge Base</h2>
        <p className="text-blue-100 mb-6">Search {R.length} offline resources — textbooks, videos, and lessons.</p>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for fractions, photosynthesis, world history..."
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/15 border border-white/30 text-white placeholder-blue-200 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 outline-none transition-all text-lg" />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-3 gap-4">
        {CATS.map((c, i) => {
          const Icon = c.icon;
          const active = cat === c.name;
          return (
            <motion.button key={c.name} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              onClick={() => setCat(active ? null : c.name)}
              className={`p-5 rounded-xl border-2 text-left transition-all ${active ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-slate-200 bg-white hover:shadow-sm'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{c.name}</h3>
                  <p className="text-sm text-slate-500">{(c as any).count} resources</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Resources */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">{list.length} resources found</p>
          {cat && <button onClick={() => setCat(null)} className="text-sm text-blue-600 hover:underline">Clear filter</button>}
        </div>

        {list.map((r, i) => {
          const Icon = ICONS[r.type] || Book;
          const isOpen = open === r.id;
          return (
            <motion.div key={r.id} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.04 }}>
              {/* Card */}
              <div onClick={() => setOpen(isOpen ? null : r.id)}
                className={`p-5 bg-white rounded-xl border cursor-pointer transition-all ${isOpen ? 'border-blue-500 shadow-lg ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-800">{r.title}</h3>
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{r.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">{r.subject}</span>
                      <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">{r.grade}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400"><Clock className="w-3 h-3" />{r.duration}</span>
                      <ChevronDown className={`w-4 h-4 ml-auto text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Documentation */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                    className="overflow-hidden">
                    <div className="mt-2 bg-gradient-to-b from-blue-50 to-white rounded-xl border border-blue-200 p-6 shadow-inner">
                      <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-blue-600" /> Full Lesson Documentation
                      </h4>
                      <pre className="whitespace-pre-wrap font-sans text-[13px] text-slate-700 leading-relaxed bg-white rounded-lg p-5 border border-slate-200 max-h-[500px] overflow-y-auto">
{r.docs}
                      </pre>
                      <div className="flex gap-3 mt-4">
                        <a href={r.url} target="_blank" rel="noopener noreferrer"
                          className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 no-underline">
                          <ExternalLink className="w-4 h-4" /> Open in Browser →
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

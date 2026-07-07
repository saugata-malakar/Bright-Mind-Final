import { useState } from 'react';
import { 
  Search, Book, FileText, Globe, GraduationCap, Video, Star, Clock, 
  ExternalLink, ChevronRight, BookOpen, Award, CheckSquare, HelpCircle, ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Resource {
  id: number;
  title: string;
  subject: string;
  grade: string;
  type: string;
  source: string;
  rating: number;
  duration: string;
  description: string;
  docs: string;
  url: string;
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
  • Area = carpet covering a floor (cm²)

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
  { name: 'Mathematics', icon: Book, color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50 border-blue-100' },
  { name: 'Sciences', icon: Globe, color: 'from-green-500 to-emerald-600', bg: 'bg-green-50 border-green-100' },
  { name: 'Humanities', icon: FileText, color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50 border-amber-100' },
];

const ICONS: Record<string, any> = { Lesson: GraduationCap, Video: Video, Reading: FileText, Interactive: Globe, Practice: Star };

export function CurriculumBase() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [selectedResourceId, setSelectedResourceId] = useState<number>(1);
  const [showAnswers, setShowAnswers] = useState(false);

  const filteredResources = R.filter(r => {
    const matchesSubject = r.subject === selectedSubject;
    const matchesSearch = !search || 
      r.title.toLowerCase().includes(search.toLowerCase()) || 
      r.description.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const activeResource = R.find(r => r.id === selectedResourceId) || filteredResources[0] || R[0];

  const handleSubjectChange = (subjectName: string) => {
    setSelectedSubject(subjectName);
    const firstInSub = R.find(r => r.subject === subjectName);
    if (firstInSub) {
      setSelectedResourceId(firstInSub.id);
    }
    setShowAnswers(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg text-center relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
        
        <div className="text-left space-y-2 relative z-10 max-w-xl">
          <h1 className="text-3xl font-black flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-200" /> Syllabus Curriculum Base
          </h1>
          <p className="text-blue-100 text-sm font-medium">Browse {R.length} structured courses. Designed for offline deployment with real-time study notes and interactive practice problems.</p>
        </div>

        <div className="relative z-10 w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search core concepts..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white placeholder-blue-200 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 outline-none transition-all text-sm" 
          />
        </div>
      </div>

      {/* Categories / Subject Navigation Tabs */}
      <div className="grid grid-cols-3 gap-4 flex-shrink-0">
        {CATS.map((c) => {
          const Icon = c.icon;
          const count = R.filter(r => r.subject === c.name).length;
          const isActive = selectedSubject === c.name;
          return (
            <button 
              key={c.name}
              onClick={() => handleSubjectChange(c.name)}
              className={`p-5 rounded-xl border-2 text-left transition-all duration-300 flex items-center justify-between ${
                isActive 
                  ? 'border-indigo-600 bg-indigo-50/40 shadow-sm' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h3 className="font-bold text-slate-800 text-sm">{c.name}</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{count} modules</p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-slate-400 ${isActive ? 'text-indigo-600 translate-x-1' : ''} transition-all`} />
            </button>
          );
        })}
      </div>

      {/* Split master-detail workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SYLLABUS PATH (5/12 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[650px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex-shrink-0">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider block">Syllabus Roadmap</span>
            <span className="text-xs text-slate-400 block mt-1 font-medium">Chronologically ordered concept nodes.</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredResources.length > 0 ? (
              filteredResources.map((res, index) => {
                const isSelected = res.id === selectedResourceId;
                const Icon = ICONS[res.type] || Book;
                return (
                  <button
                    key={res.id}
                    onClick={() => {
                      setSelectedResourceId(res.id);
                      setShowAnswers(false);
                    }}
                    className={`w-full p-4 flex items-start gap-4 text-left transition-all ${
                      isSelected ? 'bg-indigo-50/30 border-r-4 border-indigo-600' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    {/* Node path indicator circle */}
                    <div className="flex flex-col items-center flex-shrink-0 mt-0.5">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shadow-sm ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-600 text-white' 
                          : 'border-slate-200 bg-slate-100 text-slate-500'
                      }`}>
                        {index + 1}
                      </div>
                      {index < filteredResources.length - 1 && (
                        <div className="w-0.5 h-10 bg-slate-100 mt-2" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-slate-800 text-sm block leading-relaxed truncate">{res.title}</span>
                        <span className="text-xs bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded border border-slate-200 flex-shrink-0">
                          {res.grade}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2 leading-relaxed">{res.description}</p>
                      
                      <div className="flex items-center gap-3 mt-3 text-xs text-slate-400 font-semibold">
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {res.duration}</span>
                        <span>·</span>
                        <span className="bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded text-slate-600">{res.type}</span>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <BookOpen className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-sm font-semibold">No syllabus concepts match search filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT WORKSPACE READER & QUIZ CONSOLE (7/12 cols) */}
        <div className="lg:col-span-7 h-[650px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {activeResource ? (
              <motion.div
                key={activeResource.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full overflow-hidden"
              >
                {/* Reader Header */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-4 flex-shrink-0">
                  <div className="space-y-1.5">
                    <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded">
                      {activeResource.subject} · {activeResource.grade}
                    </span>
                    <h2 className="text-xl font-black text-slate-800 mt-1.5">{activeResource.title}</h2>
                    <p className="text-xs text-slate-500">Source: {activeResource.source} · Verified curriculum standards</p>
                  </div>
                  <a
                    href={activeResource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-slate-100 rounded-full border border-slate-200 text-slate-600 transition-all flex-shrink-0"
                    title="Open Resource Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Notebook-styled content wrapper */}
                <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-2">
                  <div className="bg-amber-50/30 border border-amber-100/60 rounded-xl p-5 shadow-inner space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-indigo-600" /> Lesson Content & Syllabus Material
                    </h3>
                    <div className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed space-y-4">
                      {activeResource.docs}
                    </div>
                  </div>

                  {/* Interactive Practice problems / Quiz Accordion */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-indigo-500" /> Quick Practice Problems
                      </h4>
                      <button
                        onClick={() => setShowAnswers(prev => !prev)}
                        className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-bold transition-all"
                      >
                        {showAnswers ? "Hide Answers" : "Show Answers"}
                      </button>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-lg p-3 text-sm text-slate-600 space-y-2">
                      <span className="font-bold text-slate-700 block">Try solving these questions:</span>
                      <p className="leading-relaxed">
                        Assess your grasp by solving the practice section above. Use Socratic questions to prompt critical reasoning rather than direct copying.
                      </p>
                      
                      {showAnswers && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-2 pt-2 border-t border-slate-100 bg-emerald-50/50 p-2.5 rounded text-emerald-800"
                        >
                          <span className="font-bold block mb-1">✓ Solution Sheet:</span>
                          Refer to the answers annotated in the brackets of the lesson practice problems above. Focus on steps, not just results!
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer redirection button */}
                <div className="pt-4 border-t border-slate-100 flex-shrink-0 flex gap-2">
                  <a
                    href={activeResource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 no-underline"
                  >
                    <ExternalLink className="w-4 h-4" /> Open External Resource
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center text-slate-400 h-full flex flex-col items-center justify-center space-y-2">
                <BookOpen className="w-12 h-12 text-slate-300" />
                <p className="text-base font-semibold">Select a curriculum concept node to begin reading.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

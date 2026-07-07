import { useState } from 'react';
import { 
  GraduationCap, BrainCircuit, Globe, Zap, Users, ChevronRight, Star, 
  MapPin, ChevronDown, Check, Phone, ArrowRight, HelpCircle, X, Search, Shield 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingPageProps {
  onGetStarted: () => void;
}

interface Teacher {
  name: string;
  subject: string;
  initials: string;
}

interface Course {
  id: number;
  title: string;
  exam: string;
  price: string;
  originalPrice: string;
  discount: string;
  teachers: Teacher[];
  badge: string;
  details: string[];
}

const COURSES: Course[] = [
  {
    id: 1,
    title: 'Yakeen NEET 2.0 (2027) Droppers',
    exam: 'NEET',
    price: '₹4,900',
    originalPrice: '₹12,500',
    discount: '60% OFF',
    badge: 'Dropper Batch',
    teachers: [
      { name: 'Dr. Tarun Kumar', subject: 'Biology', initials: 'TK' },
      { name: 'Amit Mahajan', subject: 'Chemistry', initials: 'AM' },
      { name: 'Alakh Pandey', subject: 'Physics', initials: 'AP' }
    ],
    details: ['Live + Recorded Lectures', 'Daily Practice Problems (DPPs)', 'Weekly All India Test Series']
  },
  {
    id: 2,
    title: 'Lakshya JEE (2026) Class 12th',
    exam: 'IIT-JEE',
    price: '₹5,200',
    originalPrice: '₹14,000',
    discount: '62% OFF',
    badge: 'Class 12 Board + JEE',
    teachers: [
      { name: 'Vikas Gupta', subject: 'Mathematics', initials: 'VG' },
      { name: 'M.S. Chouhan', subject: 'Organic Chem', initials: 'MC' },
      { name: 'Rajwant Singh', subject: 'Physics', initials: 'RS' }
    ],
    details: ['12th Board Syllabus Covered', 'JEE Mains & Advanced Prep', '1-on-1 Socratic Doubt Portal']
  },
  {
    id: 3,
    title: 'Arjuna JEE (2026) Class 11th',
    exam: 'IIT-JEE',
    price: '₹4,800',
    originalPrice: '₹13,000',
    discount: '63% OFF',
    badge: 'Class 11 Foundation',
    teachers: [
      { name: 'G. Tewani', subject: 'Mathematics', initials: 'GT' },
      { name: 'Pankaj Sijairya', subject: 'Inorganic Chem', initials: 'PS' },
      { name: 'Alakh Pandey', subject: 'Physics', initials: 'AP' }
    ],
    details: ['11th Grade Core Mechanics', 'Basic to Advanced Level math', 'Weekly Socratic Gap Analysis']
  },
  {
    id: 4,
    title: 'Udaan Board & Olympiad Class 10th',
    exam: 'FOUNDATION',
    price: '₹2,900',
    originalPrice: '₹8,000',
    discount: '63% OFF',
    badge: 'Class 10 NTSE',
    teachers: [
      { name: 'Samrat Sir', subject: 'Social Studies', initials: 'SS' },
      { name: 'Bozeman Science', subject: 'Physics & Bio', initials: 'BS' },
      { name: 'Neha Agrawal', subject: 'Mathematics', initials: 'NA' }
    ],
    details: ['Board Exam Preparation', 'Olympiad & NTSE Advanced', 'Spaced Repetition Flashcards']
  }
];

const CITIES = ['Kota (Vidyapeeth Hub)', 'Patna Center', 'Delhi (Kalu Sarai)', 'Pune (Deccan)', 'Kolkata (Salt Lake)'];

const DROPDOWN_COURSES = {
  'Competitive Exams': ['IIT JEE', 'NEET', 'ESE', 'GATE', 'AE/JE', 'Olympiad'],
  'School Boards': ['CBSE Boards', 'ICSE Boards', 'State Boards'],
  'Upskilling & Degrees': ['Web Development', 'Data Science', 'Spoken English']
};

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [counselorWidgetOpen, setCounselorWidgetOpen] = useState(true);
  const [selectedExamTab, setSelectedExamTab] = useState<'ALL' | 'IIT-JEE' | 'NEET' | 'FOUNDATION'>('ALL');

  const filteredCourses = selectedExamTab === 'ALL' 
    ? COURSES 
    : COURSES.filter(c => c.exam === selectedExamTab);

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      
      {/* 1. Header Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          
          {/* Logo & Course Dropdown */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.location.reload()}>
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-slate-800">BrightMind</span>
            </div>

            {/* PW-style All Courses Hover Dropdown Trigger */}
            <div className="relative">
              <button 
                onClick={() => setCoursesDropdownOpen(prev => !prev)}
                className="px-4 py-2 border border-indigo-100 hover:border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 rounded-xl text-sm font-bold text-indigo-700 flex items-center gap-1.5 transition-all"
              >
                All Courses <ChevronDown className={`w-3.5 h-3.5 transition-transform ${coursesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              <AnimatePresence>
                {coursesDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setCoursesDropdownOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-[480px] bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-6 grid grid-cols-12 gap-6"
                    >
                      {Object.entries(DROPDOWN_COURSES).map(([category, items]) => (
                        <div key={category} className="col-span-6 space-y-3">
                          <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-600 block">{category}</span>
                          <div className="space-y-1.5">
                            {items.map(item => (
                              <button 
                                key={item} 
                                onClick={() => {
                                  if (item === 'IIT JEE') setSelectedExamTab('IIT-JEE');
                                  else if (item === 'NEET') setSelectedExamTab('NEET');
                                  else if (item === 'Olympiad') setSelectedExamTab('FOUNDATION');
                                  setCoursesDropdownOpen(false);
                                  document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full text-left py-1.5 text-sm text-slate-600 hover:text-indigo-600 font-bold block hover:translate-x-0.5 transition-all"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-600">
            <a href="#offline-section" className="hover:text-indigo-600 transition-colors">Vidyapeeth Offline Centers</a>
            <a href="#courses-section" className="hover:text-indigo-600 transition-colors">PW Power Batches</a>
            <a href="#features-section" className="hover:text-indigo-600 transition-colors font-medium text-slate-400">Offline RAG Systems</a>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onGetStarted}
              className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Login/Register
            </button>
            <button 
              onClick={onGetStarted}
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Explore Console
            </button>
          </div>

        </div>
      </nav>

      {/* 2. Flagship Yakeen Promo Hero Section */}
      <section className="pt-20 pb-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 border border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-500/10 to-transparent pointer-events-none" />
            
            {/* Promo Left */}
            <div className="space-y-4 max-w-xl relative z-10 text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest bg-orange-500 text-white px-3 py-1 rounded-full border border-orange-400">
                Dropper NEET Aspirants Batch
              </span>
              <h2 className="text-3xl md:text-4xl font-black leading-tight">
                YAKEEN 2.0 <span className="text-indigo-400">2027</span>
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                Bharat's most trusted and affordable preparation platform. Master NEET with 100% Socratic offline-first guidance, daily test matrices, and direct doubt sessions.
              </p>
              
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">₹4,900/-</span>
                  <span className="text-sm text-slate-400 line-through">₹12,500</span>
                </div>
                <span className="text-sm font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded">
                  60% OFF
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={onGetStarted}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all"
                >
                  Enroll Now
                </button>
                <button 
                  onClick={onGetStarted}
                  className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all"
                >
                  Download Brochure
                </button>
              </div>
            </div>

            {/* Promo Right (Avatar illustrations/graphics) */}
            <div className="relative z-10 flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl max-w-xs w-full text-center">
              <span className="text-sm font-extrabold uppercase tracking-wider text-amber-400">SAT Scholarship cum Admission Test</span>
              <h3 className="text-xl font-black mt-2">Get Up to 90% Scholarship</h3>
              <p className="text-sm text-slate-400 mt-1">Exam Dates: June 15th to July 15th</p>
              <button 
                onClick={onGetStarted}
                className="w-full mt-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-sm font-black rounded-xl transition-all"
              >
                Register Now for Free
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Explore by Exam Section */}
      <section className="py-4 px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-left space-y-1">
            <h2 className="text-2xl font-black text-slate-800">Explore by Exam Category</h2>
            <p className="text-sm text-slate-400">Select your learning path to view structured PW offline and online batches.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'IIT-JEE', title: 'IIT-JEE', badges: ['Class 11', 'Class 12', 'Dropper'], bg: 'border-blue-200 hover:border-blue-300' },
              { id: 'NEET', title: 'NEET', badges: ['Class 11', 'Class 12', 'Dropper'], bg: 'border-emerald-200 hover:border-emerald-300' },
              { id: 'FOUNDATION', title: 'FOUNDATION', badges: ['Class 8', 'Class 9', 'Class 10'], bg: 'border-amber-200 hover:border-amber-300' },
              { id: 'ALL', title: 'ALL BATCHES', badges: ['Olympiad', 'GATE', 'Language'], bg: 'border-purple-200 hover:border-purple-300' }
            ].map(exam => (
              <button
                key={exam.id}
                onClick={() => {
                  setSelectedExamTab(exam.id as any);
                  document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-4 bg-white border-2 rounded-2xl text-left transition-all ${exam.bg} ${
                  selectedExamTab === exam.id ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <span className="font-extrabold text-slate-800 text-base block">{exam.title}</span>
                <div className="flex gap-1.5 flex-wrap mt-3">
                  {exam.badges.map(b => (
                    <span key={b} className="text-xs bg-slate-50 border border-slate-200 text-slate-500 px-2 py-0.5 rounded font-bold">
                      {b}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-indigo-600 font-extrabold uppercase mt-3 block">
                  Explore Batches →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Classroom Offline Centers Section */}
      <section id="offline-section" className="py-6 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-5 h-5 text-indigo-600" /> BrightMind Vidyapeeth Offline Centers
              </h2>
              <p className="text-sm text-slate-400">State-of-the-art offline classrooms equipped with local Socratic servers.</p>
            </div>
            
            {/* City selector dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-slate-500">Select Center City:</label>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none"
              >
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Center features grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Smart Infrastructure</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Experience high-tech offline learning at the **{selectedCity}** featuring central AC classrooms, interactive smartboards, and customized study desks.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Socratic Offline Pods</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect your devices directly to offline Socratic mock engines. Ask questions, analyze gaps, and practice mock tests locally.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider">1-on-1 Doubt Counters</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Physical doubt counters open daily where expert educators review student reports and guide them step-by-step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Course Offerings with Pricing, Discounts & Teachers */}
      <section id="courses-section" className="py-6 px-6 bg-slate-100/50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-5">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-800">Academic Power Batches</h2>
              <p className="text-sm text-slate-400">Enroll in top-tier coaching curriculum featuring verified coaching faculties.</p>
            </div>
            
            {/* Exam selector filter row */}
            <div className="flex gap-1 overflow-x-auto pb-1 max-w-full">
              {['ALL', 'IIT-JEE', 'NEET', 'FOUNDATION'].map(exam => (
                <button
                  key={exam}
                  onClick={() => setSelectedExamTab(exam as any)}
                  className={`px-4 py-2 text-sm font-bold rounded-xl border transition-all whitespace-nowrap ${
                    selectedExamTab === exam 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {exam === 'ALL' ? 'All Batches' : exam}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCourses.map(course => (
              <div 
                key={course.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-all"
              >
                {/* Info Header */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded">
                      {course.badge}
                    </span>
                    <span className="text-xs font-extrabold text-slate-400 font-mono">
                      CODE: BM-2026-0{course.id}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg leading-snug">{course.title}</h3>
                  
                  {/* Teachers information row */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block">Class Faculty</span>
                    <div className="flex gap-4 overflow-x-auto pb-1">
                      {course.teachers.map((teacher, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-2 flex-shrink-0 min-w-[130px]">
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-xs font-bold rounded-lg flex items-center justify-center shadow-sm">
                            {teacher.initials}
                          </div>
                          <div className="min-w-0">
                            <span className="text-sm font-bold text-slate-700 block truncate">{teacher.name}</span>
                            <span className="text-xs text-slate-400 block">{teacher.subject}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bullet features */}
                  <div className="space-y-1.5 pt-3">
                    {course.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action footer */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 mt-2">
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-800">{course.price}</span>
                      <span className="text-sm text-slate-400 line-through">{course.originalPrice}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                      {course.discount}
                    </span>
                  </div>
                  
                  <button
                    onClick={onGetStarted}
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all"
                  >
                    Enroll Batch
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Offline RAG Technology Feature section */}
      <section id="features-section" className="py-10 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-black text-slate-800">Groundbreaking Offline-First RAG Systems</h2>
            <p className="text-base text-slate-500 max-w-2xl mx-auto">
              BrightMind offline hubs use locally mounted document stores, enabling students to access high-quality study materials and complete Socratic sessions without an internet connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-base">Offline Socratic Guidance</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Adjusts dialogue flows dynamically using local models to guide students toward finding solutions on their own.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-base">Emotion-Aware Adaptation</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Analyzes query response times and patterns to detect student fatigue, updating difficulty states in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Floating PW Counselor Widget */}
      <AnimatePresence>
        {counselorWidgetOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 max-w-xs flex gap-3 items-start"
          >
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-800 text-sm block">Talk to a Counsellor</span>
                <button 
                  onClick={() => setCounselorWidgetOpen(false)}
                  className="p-0.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">Have questions about batches, pricing, or offline centers? Speak to an expert!</p>
              <a 
                href="tel:07406346660" 
                className="inline-flex items-center gap-1 text-sm font-extrabold text-indigo-600 mt-2"
              >
                Call 07406346660 <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">BrightMind Vidyapeeth</span>
          </div>
          <p className="text-sm">
            © 2026 BrightMind. Supported by offline coaching hubs and interactive Socratic platforms.
          </p>
        </div>
      </footer>

    </div>
  );
}

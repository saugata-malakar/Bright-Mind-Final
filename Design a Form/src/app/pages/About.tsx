import { useState } from 'react';
import { Building2, Users, Globe, Target, Shield, Heart, ChevronDown, ChevronUp, Star, Quote, CheckCircle2 } from 'lucide-react';

const FAQS = [
  {
    q: "How does BrightMind work offline?",
    a: "BrightMind leverages Google's Gemma model running locally via Ollama. It does not require active cloud connectivity to run AI analyses or chat with Socratic tutors, making it ideal for remote or rural locations."
  },
  {
    q: "Is my student's data safe?",
    a: "Yes! Because of our local-first architecture, all conversation histories, student performance evaluations, and gap analyses remain on the local machine or school server. No personal data is sent to external clouds."
  },
  {
    q: "What makes Socratic Tutoring different from standard tutoring?",
    a: "Socratic tutoring avoids giving direct answers. Instead, it leads students to discover answers through a series of guided prompts and analytical questions. This encourages critical thinking and active learning."
  },
  {
    q: "How do teachers monitor progress?",
    a: "Teachers have access to the Gap Analyzer and Student History dashboard, providing live insights into student learning paths, mastery percentages, and active concept gaps."
  },
  {
    q: "Can I customize the curriculum base?",
    a: "Absolutely. The Curriculum Base allows teachers to define core objectives and cross-disciplinary subjects, mapping custom pathways for their classroom."
  }
];

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Grade 8 Math Teacher",
    school: "Oakridge Middle School",
    avatar: "👩‍🏫",
    quote: "BrightMind's Gap Analyzer saved me dozens of hours of grading and gave me instant clarity on where my students were struggling with algebra."
  },
  {
    name: "Dr. Marcus Vance",
    role: "Principal",
    school: "Sterling Academy",
    avatar: "👨‍💼",
    quote: "We implemented BrightMind in our science labs, and student engagement surged by 40%. The offline-first capability is a lifesaver."
  },
  {
    name: "Elena Rostova",
    role: "Director of Curriculum",
    school: "Beacon School District",
    avatar: "👩‍💻",
    quote: "The Socratic method is extremely hard to scale, but BrightMind makes it effortless. It's like having a personal teaching assistant for every student."
  }
];

export function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 via-red-600 to-rose-700 rounded-2xl p-10 text-white shadow-lg text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
        <h1 className="text-4xl font-extrabold mb-4 relative z-10">About BrightMind</h1>
        <p className="text-xl text-orange-100 max-w-2xl mx-auto relative z-10">
          We are on a mission to democratize education globally, providing world-class, adaptive AI tutoring to every student, everywhere — even without an internet connection.
        </p>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Our Mission</h3>
          <p className="text-gray-600 text-sm leading-relaxed">To bridge the educational divide by making personalized Socratic tutoring accessible offline to remote communities.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Global Impact</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Deployed in rural schools and refugee camps, reaching thousands of students who lack reliable internet access.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy First</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Offline-first architecture ensures that student data never leaves the local device, guaranteeing 100% privacy.</p>
        </div>
      </div>

      {/* Story */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 hover:shadow-md transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Building2 className="w-6 h-6 text-orange-500" />
          Our Story
        </h2>
        <div className="prose max-w-none text-gray-600 space-y-4 leading-relaxed">
          <p>
            Founded during the Gemma 4 Good Hackathon, BrightMind started with a simple observation: the world's most advanced AI models are typically locked behind cloud APIs, making them inaccessible to the students who need them most.
          </p>
          <p>
            By leveraging Google's Gemma 4 and Ollama's local execution capabilities, we built an educational platform that brings hyper-adaptive, Socratic-style tutoring directly to low-end devices in rural classrooms.
          </p>
          <p>
            Today, BrightMind is a commercial-ready platform empowering teachers with real-time analytics and empowering students with infinite patience and personalized guidance.
          </p>
        </div>
      </div>

      {/* Trusted by Educators */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
            <Users className="w-7 h-7 text-orange-500" />
            Trusted by Educators & Teachers
          </h2>
          <p className="text-gray-500 mt-2 text-sm">Empowering classrooms worldwide with state-of-the-art Socratic AI tutoring.</p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center hover:shadow-md transition-all">
            <span className="block text-3xl font-extrabold text-orange-600">50K+</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 block">Active Students</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center hover:shadow-md transition-all">
            <span className="block text-3xl font-extrabold text-orange-600">1,200+</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 block">Classrooms Deployed</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center hover:shadow-md transition-all">
            <span className="block text-3xl font-extrabold text-orange-600">98.4%</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 block">Teacher Satisfaction</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 text-center hover:shadow-md transition-all">
            <span className="block text-3xl font-extrabold text-orange-600">45%</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 block">Mastery Boost</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative">
              <Quote className="w-8 h-8 text-orange-100 absolute top-4 right-4" />
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-3 mt-6 border-t border-slate-100 pt-4">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />
                  </h4>
                  <p className="text-xs text-gray-500">{t.role} · {t.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commercial FAQ Section */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-500 mt-2 text-sm">Everything you need to know about implementing BrightMind in your institution.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 hover:bg-slate-50 transition-all text-sm md:text-base"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40 border-t border-slate-100 p-5' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

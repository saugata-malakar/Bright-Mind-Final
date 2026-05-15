import { useState } from 'react';
import { Search, Book, FileText, Globe, GraduationCap, Video, ChevronRight, Star, Clock, Users, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

// ── Offline Curriculum Database ───────────────────────────────────────

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
}

const RESOURCES: Resource[] = [
  { id: 1, title: 'Adding Fractions with Unlike Denominators', subject: 'Mathematics', grade: 'Grade 5', type: 'Lesson', source: 'OER Commons', rating: 4.8, duration: '25 min', description: 'Step-by-step guide to finding common denominators and adding fractions. Includes visual pizza and pie chart models.' },
  { id: 2, title: 'Introduction to Linear Equations', subject: 'Mathematics', grade: 'Grade 7', type: 'Lesson', source: 'Khan Academy', rating: 4.9, duration: '30 min', description: 'Learn to solve single-variable linear equations using the balance method. Includes interactive practice problems.' },
  { id: 3, title: 'Photosynthesis: How Plants Make Food', subject: 'Sciences', grade: 'Grade 6', type: 'Video', source: 'CK-12', rating: 4.7, duration: '15 min', description: 'Animated video explaining the light-dependent and light-independent reactions of photosynthesis.' },
  { id: 4, title: 'The Water Cycle Explained', subject: 'Sciences', grade: 'Grade 4', type: 'Interactive', source: 'OER Commons', rating: 4.6, duration: '20 min', description: 'Interactive diagram showing evaporation, condensation, precipitation, and collection. Includes quiz.' },
  { id: 5, title: 'World War II: Causes and Effects', subject: 'Humanities', grade: 'Grade 8', type: 'Reading', source: 'Wikipedia Offline', rating: 4.5, duration: '35 min', description: 'Comprehensive overview of WWII from the Treaty of Versailles to the formation of the United Nations.' },
  { id: 6, title: 'Understanding Democracy', subject: 'Humanities', grade: 'Grade 6', type: 'Lesson', source: 'OER Commons', rating: 4.4, duration: '20 min', description: 'Explore the principles of democracy, voting rights, and how governments represent people.' },
  { id: 7, title: 'Multiplication Tables Mastery', subject: 'Mathematics', grade: 'Grade 3', type: 'Practice', source: 'CK-12', rating: 4.9, duration: '15 min', description: 'Interactive flashcard drill for times tables 1-12 with spaced repetition scheduling.' },
  { id: 8, title: 'The Solar System Tour', subject: 'Sciences', grade: 'Grade 5', type: 'Interactive', source: 'OER Commons', rating: 4.8, duration: '25 min', description: 'Virtual tour of all 8 planets with fun facts, size comparisons, and distance scales.' },
  { id: 9, title: 'Essay Writing: Introduction & Thesis', subject: 'Humanities', grade: 'Grade 7', type: 'Lesson', source: 'Khan Academy', rating: 4.6, duration: '20 min', description: 'Learn to write a strong introduction paragraph and craft a clear thesis statement.' },
  { id: 10, title: 'Area and Perimeter of Shapes', subject: 'Mathematics', grade: 'Grade 4', type: 'Lesson', source: 'CK-12', rating: 4.7, duration: '25 min', description: 'Calculate area and perimeter for rectangles, triangles, and circles with visual examples.' },
  { id: 11, title: 'Cells: Building Blocks of Life', subject: 'Sciences', grade: 'Grade 7', type: 'Video', source: 'CK-12', rating: 4.8, duration: '18 min', description: 'Explore plant and animal cells, organelles, and their functions with microscope imagery.' },
  { id: 12, title: 'Ancient Civilizations: Egypt & Mesopotamia', subject: 'Humanities', grade: 'Grade 6', type: 'Reading', source: 'Wikipedia Offline', rating: 4.5, duration: '30 min', description: 'Discover the rise of agriculture, writing systems, and the first organized societies.' },
];

const CATEGORIES = [
  { name: 'Mathematics', icon: Book, count: 0, color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50 border-blue-100' },
  { name: 'Sciences', icon: Globe, count: 0, color: 'from-green-500 to-emerald-600', bg: 'bg-green-50 border-green-100' },
  { name: 'Humanities', icon: FileText, count: 0, color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50 border-amber-100' },
];

// Count dynamically
CATEGORIES.forEach(cat => { cat.count = RESOURCES.filter(r => r.subject === cat.name).length; });

const TYPE_ICONS: Record<string, any> = {
  Lesson: GraduationCap,
  Video: Video,
  Reading: FileText,
  Interactive: Globe,
  Practice: Star,
};

export function CurriculumBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filtered = RESOURCES.filter((r) => {
    const matchesSearch = searchQuery === '' || 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || r.subject === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Hero Search */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-2">Educational Knowledge Base</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Search {RESOURCES.length} offline Open Educational Resources — textbooks, videos, and interactive lessons available without internet.
        </p>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for fractions, photosynthesis, world history..."
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 text-white placeholder-blue-200 focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 outline-none transition-all text-lg"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES.map((category, index) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.name;
          return (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(isActive ? null : category.name)}
              className={`p-5 rounded-xl border-2 transition-all text-left ${
                isActive
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{category.name}</h3>
                    <p className="text-sm text-slate-500">{category.count} resources</p>
                  </div>
                </div>
                {isActive && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">{filtered.length} resources found</p>
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)} className="text-sm text-blue-600 hover:underline">
                Clear filter
              </button>
            )}
          </div>
          {filtered.map((resource, i) => {
            const TypeIcon = TYPE_ICONS[resource.type] || Book;
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedResource(resource)}
                className={`p-5 bg-white rounded-xl border transition-all cursor-pointer ${
                  selectedResource?.id === resource.id
                    ? 'border-blue-500 shadow-md ring-1 ring-blue-200'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TypeIcon className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-slate-800 leading-snug">{resource.title}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-slate-600">{resource.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">{resource.subject}</span>
                      <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">{resource.grade}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3 h-3" /> {resource.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="hidden lg:block">
          {selectedResource ? (
            <motion.div
              key={selectedResource.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-slate-200 p-6 sticky top-6 shadow-sm"
            >
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{selectedResource.type}</span>
                  <span className="text-xs font-medium text-slate-400">{selectedResource.source}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">{selectedResource.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedResource.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-xs text-slate-500">Grade</p>
                    <p className="font-semibold text-slate-800 text-sm">{selectedResource.grade}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="font-semibold text-slate-800 text-sm">{selectedResource.duration}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-xs text-slate-500">Rating</p>
                    <p className="font-semibold text-slate-800 text-sm flex items-center justify-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {selectedResource.rating}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-xs text-slate-500">Source</p>
                    <p className="font-semibold text-slate-800 text-sm">{selectedResource.source}</p>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Open Resource
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <Book className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-400">Select a resource to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

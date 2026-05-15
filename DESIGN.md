# CogniCore - Design Document

## 🎨 Visual Design System

### Brand Identity

**Mission:** Empowering teachers and students in remote communities with AI-powered educational assistance.

**Brand Values:**
- Trust & Reliability
- Accessibility
- Intellectual Growth
- Simplicity
- Innovation

### Color Palette

```css
/* Primary Colors */
--primary-blue: #2563EB;      /* Trust, educational professionalism */
--primary-green: #10B981;     /* Growth, learning, success */
--primary-orange: #F59E0B;    /* Curiosity, energy, creativity */

/* Neutral Colors */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-700: #374151;
--gray-900: #111827;

/* Semantic Colors */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

### Typography

```css
/* Font Family */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

## 📱 User Interface Design

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Header (Logo, User Menu, Offline Indicator)           │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ Sidebar  │         Main Content Area                    │
│          │                                              │
│ - Home   │  ┌────────────────────────────────────┐    │
│ - Tutor  │  │                                    │    │
│ - Assess │  │      Content Goes Here             │    │
│ - Base   │  │                                    │    │
│ - Prog   │  └────────────────────────────────────┘    │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

### Key Screens

#### 1. Teacher Dashboard / Home Screen
```
┌─────────────────────────────────────────────────────────┐
│  Welcome back, Mr. Davis                    [Offline 🔴]│
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Quick Actions                                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │   💬     │ │   🔍     │ │   📚     │ │   📊     │  │
│  │ New Sess │ │ Assess   │ │ Curriculm│ │ Progress │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                          │
│  Recent Student Sessions                                 │
│  ┌────────────────────────────────────────────────┐    │
│  │ 🔴 Alert: Timmy struggling with Fractions      │    │
│  │ 🟡 Review: Sarah mastered basic algebra        │    │
│  │ 🟢 Active: 5 students currently learning       │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  System Status                                           │
│  ✅ Gemma 4 Model: Online                               │
│  ✅ Curriculum Database: Synced                         │
│  ⚠️  Internet: Offline (Last sync: 2 hours ago)        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### 2. Socratic Tutor Interface
```
┌─────────────────────────────────────────────────────────┐
│  Virtual Socratic Tutor              [Clear] [Export]   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────┐        │
│  │ 👤 Student: I don't get how to add 1/2 and │        │
│  │    1/3.                                    │        │
│  └────────────────────────────────────────────┘        │
│                                                          │
│  ┌────────────────────────────────────────────┐        │
│  │ 🤖 CogniCore:                              │        │
│  │                                            │        │
│  │ That's a great question! Let's think about │        │
│  │ it this way:                               │        │
│  │ If you have half a pizza, and a third of a │        │
│  │ pizza, you can't just add the slices       │        │
│  │ together because they are different sizes. │        │
│  │                                            │        │
│  │ What do you think we need to do to the     │        │
│  │ slices so we can count them together?      │        │
│  │                                            │        │
│  │ [💡 Hint] [🔍 Show Diagram]                │        │
│  └────────────────────────────────────────────┘        │
│                                                          │
│  ┌──────────────────────────────────────────┐          │
│  │ Type your message...            [📎] [🎤]│          │
│  └──────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────┘
```

#### 3. Knowledge Gap Analyzer
```
┌─────────────────────────────────────────────────────────┐
│  Knowledge Gap Analyzer                                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Student Information                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ Name: [___]  │ │ Grade: [▼]   │ │ Subject: [▼] │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                          │
│  Recent Performance Topics                              │
│  ☑️ Basic Arithmetic    ☐ Pre-Algebra                  │
│  ☑️ Fractions           ☐ Decimals                     │
│                                                          │
│  Upload Work (Optional)                                  │
│  ┌────────────────────────────────────────────────┐    │
│  │  📷 Take Photo of Math Worksheet                │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  [🔍 Analyze Gaps]                                      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### 4. Educational Knowledge Base
```
┌─────────────────────────────────────────────────────────┐
│  Educational Knowledge Base                [🔍 Search]  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Categories                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ 📐 Math      │ │ 🔬 Science   │ │ 🌍 History   │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                          │
│  Quick Reference                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ 📖 State Curriculum Standards                  │    │
│  │ 📖 Wikipedia Offline Extracts                   │    │
│  │ 📖 Phonics & Grammar Rules                     │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🎯 User Experience (UX) Design

### Design Principles

1. **Simplicity First**
   - Clean, uncluttered interface
   - Clear visual hierarchy
   - Minimal cognitive load for students

2. **Accessibility**
   - WCAG 2.1 AA compliant
   - High contrast mode
   - Screen reader support
   - Large touch targets for young learners

3. **Offline-First**
   - Clear offline indicators
   - Background sync notifications

## 🌍 Internationalization (i18n)

### Supported Languages
- English
- Spanish
- French
- Regional local languages depending on deployment area

## 🎨 Component Library

### Buttons
```tsx
// Primary Button
<Button variant="primary">Analyze Worksheet</Button>

// Secondary Button
<Button variant="secondary">Cancel</Button>

// Icon Button
<Button variant="icon"><Icon name="search" /></Button>
```

### Cards
```tsx
<Card>
  <CardHeader>
    <CardTitle>Student Progress</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

---

**Next Steps:**
1. Create Figma designs for the classroom setting
2. Conduct user testing with local teachers
3. Finalize design system

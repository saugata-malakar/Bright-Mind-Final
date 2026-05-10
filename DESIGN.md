# MediGuide AI - Design Document

## 🎨 Visual Design System

### Brand Identity

**Mission:** Empowering healthcare workers in underserved communities with AI-powered medical assistance.

**Brand Values:**
- Trust & Reliability
- Accessibility
- Simplicity
- Compassion
- Innovation

### Color Palette

```css
/* Primary Colors */
--primary-blue: #2563EB;      /* Trust, medical professionalism */
--primary-green: #10B981;     /* Health, healing, success */
--primary-red: #EF4444;       /* Emergency, urgent care */

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
│ - Chat   │  │                                    │    │
│ - Diag   │  │      Content Goes Here             │    │
│ - KB     │  │                                    │    │
│ - Hist   │  └────────────────────────────────────┘    │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

### Key Screens

#### 1. Dashboard / Home Screen
```
┌─────────────────────────────────────────────────────────┐
│  Welcome back, Dr. Sarah                    [Offline 🔴]│
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Quick Actions                                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │   💬     │ │   🔍     │ │   📚     │ │   📊     │  │
│  │ New Chat │ │ Diagnose │ │ Knowledge│ │ History  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│                                                          │
│  Recent Cases                                            │
│  ┌────────────────────────────────────────────────┐    │
│  │ 🔴 Emergency: Chest pain - 2 hours ago         │    │
│  │ 🟡 Follow-up: Diabetes management - 1 day ago  │    │
│  │ 🟢 Consultation: Skin rash - 2 days ago        │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  System Status                                           │
│  ✅ Gemma 4 Model: Online                               │
│  ✅ Medical Database: Synced                            │
│  ⚠️  Internet: Offline (Last sync: 2 hours ago)        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### 2. Chat Interface
```
┌─────────────────────────────────────────────────────────┐
│  Medical Assistant Chat              [Clear] [Export]   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────┐        │
│  │ 👤 You: Patient has fever and cough        │        │
│  │    for 3 days                              │        │
│  └────────────────────────────────────────────┘        │
│                                                          │
│  ┌────────────────────────────────────────────┐        │
│  │ 🤖 MediGuide AI:                           │        │
│  │                                            │        │
│  │ Based on the symptoms, here's my analysis: │        │
│  │                                            │        │
│  │ **Possible Conditions:**                   │        │
│  │ 1. Upper Respiratory Infection (70%)       │        │
│  │ 2. Influenza (20%)                         │        │
│  │ 3. COVID-19 (10%)                          │        │
│  │                                            │        │
│  │ **Recommended Actions:**                   │        │
│  │ • Check temperature and oxygen saturation  │        │
│  │ • Ask about recent travel/exposure         │        │
│  │ • Consider rapid flu/COVID test            │        │
│  │                                            │        │
│  │ **Red Flags to Watch:**                    │        │
│  │ ⚠️  Difficulty breathing                   │        │
│  │ ⚠️  Chest pain                             │        │
│  │ ⚠️  Confusion                              │        │
│  │                                            │        │
│  │ [📚 View Guidelines] [🔍 More Info]        │        │
│  └────────────────────────────────────────────┘        │
│                                                          │
│  ┌──────────────────────────────────────────┐          │
│  │ Type your message...            [📎] [🎤]│          │
│  └──────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────┘
```

#### 3. Symptom Checker / Diagnosis Tool
```
┌─────────────────────────────────────────────────────────┐
│  Symptom Checker                                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Patient Information                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ Age: [___]   │ │ Gender: [▼]  │ │ Weight: [___]│   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                          │
│  Primary Symptoms (Select all that apply)               │
│  ☑️ Fever          ☐ Cough         ☐ Headache          │
│  ☐ Nausea         ☑️ Fatigue       ☐ Dizziness         │
│  ☐ Chest Pain     ☐ Shortness of Breath                │
│                                                          │
│  Duration: [3 days ▼]                                   │
│  Severity: ○ Mild  ●Moderate  ○ Severe                 │
│                                                          │
│  Additional Information                                  │
│  ┌────────────────────────────────────────────────┐    │
│  │ Patient reports feeling weak and has lost     │    │
│  │ appetite. No recent travel.                    │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Upload Medical Images (Optional)                        │
│  ┌────────────────────────────────────────────────┐    │
│  │  📷 Take Photo  |  📁 Upload File               │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  [🔍 Analyze Symptoms]                                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### 4. Diagnosis Results
```
┌─────────────────────────────────────────────────────────┐
│  Diagnosis Results                    [Save] [Print]    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  🔴 URGENCY LEVEL: MODERATE                             │
│  Recommend medical evaluation within 24 hours           │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Differential Diagnosis                                  │
│  ┌────────────────────────────────────────────────┐    │
│  │ 1. Viral Upper Respiratory Infection  75%      │    │
│  │    Common cold or flu-like illness             │    │
│  │    [ℹ️ Learn More]                              │    │
│  │                                                 │    │
│  │ 2. Influenza                          20%      │    │
│  │    Seasonal flu                                │    │
│  │    [ℹ️ Learn More]                              │    │
│  │                                                 │    │
│  │ 3. COVID-19                           5%       │    │
│  │    Requires testing for confirmation           │    │
│  │    [ℹ️ Learn More]                              │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Recommended Actions                                     │
│  ✅ Rest and hydration                                  │
│  ✅ Monitor temperature every 4 hours                   │
│  ✅ Acetaminophen for fever (if no contraindications)   │
│  ✅ Consider rapid flu/COVID testing                    │
│  ⚠️  Seek immediate care if symptoms worsen             │
│                                                          │
│  Warning Signs (Seek Emergency Care)                    │
│  🚨 Difficulty breathing or shortness of breath         │
│  🚨 Persistent chest pain or pressure                   │
│  🚨 Confusion or inability to stay awake                │
│  🚨 Bluish lips or face                                 │
│                                                          │
│  Treatment Plan                                          │
│  [📋 View Detailed Protocol]                            │
│  [💊 Check Drug Interactions]                           │
│  [📚 Access Medical Guidelines]                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### 5. Medical Knowledge Base
```
┌─────────────────────────────────────────────────────────┐
│  Medical Knowledge Base                    [🔍 Search]  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Categories                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ 🫀 Cardio    │ │ 🫁 Respiratory│ │ 🧠 Neurology │   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│  │ 💊 Pharmacy  │ │ 🩺 Emergency │ │ 👶 Pediatrics│   │
│  └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                          │
│  Quick Reference                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ 📖 WHO Essential Medicines List                │    │
│  │ 📖 Emergency Protocols                          │    │
│  │ 📖 Drug Interaction Checker                     │    │
│  │ 📖 Vaccination Schedules                        │    │
│  │ 📖 Common Conditions Guide                      │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Recently Accessed                                       │
│  • Malaria Treatment Guidelines                         │
│  • Hypertension Management                              │
│  • Wound Care Protocols                                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

#### 6. Drug Interaction Checker
```
┌─────────────────────────────────────────────────────────┐
│  Drug Interaction Checker                                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Current Medications                                     │
│  ┌────────────────────────────────────────────────┐    │
│  │ 1. Metformin 500mg - Twice daily          [×]  │    │
│  │ 2. Lisinopril 10mg - Once daily           [×]  │    │
│  │ 3. Aspirin 81mg - Once daily              [×]  │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Add New Medication                                      │
│  ┌────────────────────────────────────────────────┐    │
│  │ Search drug name...                    [Search]│    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  [🔍 Check Interactions]                                │
│                                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                          │
│  Interaction Analysis                                    │
│  ✅ No major interactions detected                      │
│                                                          │
│  ⚠️  Minor Interactions (1)                             │
│  ┌────────────────────────────────────────────────┐    │
│  │ Lisinopril + Aspirin                           │    │
│  │ May increase risk of kidney problems.          │    │
│  │ Monitor kidney function regularly.             │    │
│  │ [ℹ️ More Information]                           │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  Recommendations                                         │
│  • Monitor blood pressure regularly                     │
│  • Check kidney function every 6 months                 │
│  • Stay well hydrated                                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🎯 User Experience (UX) Design

### Design Principles

1. **Simplicity First**
   - Clean, uncluttered interface
   - Clear visual hierarchy
   - Minimal cognitive load

2. **Accessibility**
   - WCAG 2.1 AA compliant
   - High contrast mode
   - Screen reader support
   - Keyboard navigation
   - Large touch targets (min 44x44px)

3. **Offline-First**
   - Clear offline indicators
   - Graceful degradation
   - Background sync notifications
   - Cached content availability

4. **Mobile-Optimized**
   - Touch-friendly interface
   - Responsive design
   - Optimized for slow connections
   - Minimal data usage

5. **Trust & Safety**
   - Clear disclaimers
   - Source citations
   - Confidence indicators
   - Emergency escalation paths

### Interaction Patterns

#### Loading States
```
┌────────────────────────────────┐
│  🔄 Analyzing symptoms...      │
│  ▓▓▓▓▓▓▓▓░░░░░░░░ 50%        │
│                                │
│  Using Gemma 4 AI model        │
└────────────────────────────────┘
```

#### Error States
```
┌────────────────────────────────┐
│  ⚠️  Unable to process request │
│                                │
│  The AI model is temporarily   │
│  unavailable. Your request has │
│  been saved and will be        │
│  processed when connection is  │
│  restored.                     │
│                                │
│  [Retry Now] [View Saved]      │
└────────────────────────────────┘
```

#### Success States
```
┌────────────────────────────────┐
│  ✅ Analysis Complete           │
│                                │
│  Diagnosis saved successfully  │
│  [View Results] [New Case]     │
└────────────────────────────────┘
```

#### Empty States
```
┌────────────────────────────────┐
│         📋                     │
│                                │
│  No cases yet                  │
│                                │
│  Start by creating a new case  │
│  or chatting with the AI       │
│  assistant.                    │
│                                │
│  [New Case] [Start Chat]       │
└────────────────────────────────┘
```

## 📱 Responsive Design Breakpoints

```css
/* Mobile First Approach */
/* Mobile: 320px - 767px */
@media (min-width: 320px) { }

/* Tablet: 768px - 1023px */
@media (min-width: 768px) { }

/* Desktop: 1024px - 1439px */
@media (min-width: 1024px) { }

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) { }
```

### Mobile Layout
- Single column
- Bottom navigation
- Collapsible sidebar
- Full-screen modals

### Tablet Layout
- Two columns
- Side navigation
- Split-screen views
- Floating modals

### Desktop Layout
- Multi-column
- Persistent sidebar
- Dashboard widgets
- Inline modals

## ♿ Accessibility Features

### Visual
- High contrast mode
- Adjustable font sizes
- Color-blind friendly palette
- Focus indicators
- Skip navigation links

### Auditory
- Visual alternatives for audio cues
- Captions for video content
- Text-to-speech support

### Motor
- Keyboard navigation
- Large touch targets
- Voice input support
- Reduced motion option

### Cognitive
- Clear language
- Consistent navigation
- Progress indicators
- Undo/redo functionality
- Auto-save features

## 🌍 Internationalization (i18n)

### Supported Languages (Phase 1)
- English
- Spanish
- French
- Hindi
- Swahili
- Arabic

### RTL Support
- Right-to-left layout for Arabic
- Mirrored UI elements
- Proper text alignment

### Localization
- Date/time formats
- Number formats
- Currency formats
- Medical terminology

## 🎨 Component Library

### Buttons
```tsx
// Primary Button
<Button variant="primary">Analyze Symptoms</Button>

// Secondary Button
<Button variant="secondary">Cancel</Button>

// Danger Button
<Button variant="danger">Emergency</Button>

// Icon Button
<Button variant="icon"><Icon name="search" /></Button>
```

### Cards
```tsx
<Card>
  <CardHeader>
    <CardTitle>Patient Information</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### Forms
```tsx
<Form>
  <FormField>
    <FormLabel>Symptoms</FormLabel>
    <FormInput type="text" placeholder="Enter symptoms..." />
    <FormHelp>Describe the main symptoms</FormHelp>
    <FormError>This field is required</FormError>
  </FormField>
</Form>
```

### Alerts
```tsx
<Alert variant="success">Diagnosis saved successfully</Alert>
<Alert variant="warning">Internet connection lost</Alert>
<Alert variant="error">Unable to process request</Alert>
<Alert variant="info">New medical guidelines available</Alert>
```

## 🎬 Animations & Transitions

### Micro-interactions
- Button hover effects
- Input focus states
- Loading spinners
- Success checkmarks
- Error shakes

### Page Transitions
- Fade in/out
- Slide transitions
- Modal animations
- Drawer animations

### Performance
- CSS transforms (GPU-accelerated)
- RequestAnimationFrame for JS animations
- Reduced motion support
- 60fps target

## 📊 Data Visualization

### Charts
- Symptom severity over time
- Treatment effectiveness
- Patient demographics
- Usage statistics

### Medical Imagery
- X-ray viewer
- Skin condition photos
- Wound progression
- Vital signs graphs

## 🔔 Notifications

### Types
- Success notifications
- Error notifications
- Warning notifications
- Info notifications
- Push notifications (PWA)

### Placement
- Top-right corner (desktop)
- Top center (mobile)
- Non-intrusive
- Auto-dismiss (except errors)

## 🎯 Call-to-Actions (CTAs)

### Primary CTAs
- "Analyze Symptoms"
- "Start Diagnosis"
- "Get Help Now"
- "Emergency"

### Secondary CTAs
- "Save for Later"
- "View History"
- "Learn More"
- "Export Report"

## 📸 Imagery Guidelines

### Medical Images
- High resolution
- Proper lighting
- Clear focus
- Privacy-compliant
- Annotated when needed

### UI Icons
- Consistent style
- 24x24px base size
- Scalable (SVG)
- Accessible (with labels)

### Illustrations
- Friendly, professional
- Culturally sensitive
- Diverse representation
- Medical accuracy

## 🎨 Design Tokens

```json
{
  "colors": {
    "primary": "#2563EB",
    "secondary": "#10B981",
    "danger": "#EF4444"
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem"
  },
  "borderRadius": {
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "0.75rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
  }
}
```

## 🎯 Design Deliverables

1. **Wireframes** ✅
2. **High-fidelity Mockups** (Figma)
3. **Interactive Prototype** (Figma)
4. **Design System Documentation**
5. **Component Library** (Storybook)
6. **Accessibility Audit Report**
7. **Usability Testing Results**

---

**Next Steps:**
1. Create Figma designs
2. Build component library
3. Conduct user testing
4. Iterate based on feedback
5. Finalize design system

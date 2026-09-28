# EHR Frontend Design System

> **Purpose:** Single source of truth for the EHR application's visual design, UX patterns, component usage, layout, colors, typography, spacing, and frontend implementation rules.
>
> **Important:** Every developer and every AI coding tool MUST follow this document when creating or modifying frontend features.

---

# 1. Product Identity

The application is a modern Electronic Health Record (EHR) platform.

The UI should feel:

* Clinical
* Professional
* Trustworthy
* Clean
* Calm
* Modern
* Information-dense without feeling crowded
* Premium but not flashy

The visual language should resemble a modern healthcare SaaS dashboard.

Avoid making the application look like:

* A generic admin panel
* A banking dashboard
* A gaming UI
* A marketing website
* A highly colorful consumer application
* A glassmorphism-heavy interface

---

# 2. Core Design Principle

## Consistency over creativity

When implementing a new feature:

> **Reuse existing components and patterns before creating new ones.**

Do NOT create a new:

* Button style
* Card style
* Sidebar
* Header
* Modal
* Badge
* Input style
* Table style
* Color
* Shadow
* Border radius
* Typography scale

unless the existing design system genuinely cannot support the requirement.

If a new component is required, it must visually follow the existing design system.

---

# 3. Application Shell

Every authenticated application page uses the same shell.

```text
┌──────────────────────────────────────────────────────────────┐
│ Sidebar │                    Topbar                          │
│         ├────────────────────────────────────────────────────┤
│         │                                                    │
│         │                 Page Content                       │
│         │                                                    │
│         │                                                    │
│         │                                                    │
│         │                                                    │
└─────────┴────────────────────────────────────────────────────┘
```

## Sidebar

The sidebar is persistent on desktop.

Navigation:

```text
Overview
Patients
Medical History
Visits
Prescriptions
Lab Reports
Documents
Health Timeline
Appointments
```

Bottom section:

```text
Profile
Logout
```

### Sidebar rules

* White background
* Subtle right border
* Rounded active navigation item
* Active item uses primary blue
* Icons must be visually consistent
* Navigation labels use medium font weight
* Do not use excessive separators
* Sidebar should feel lightweight, not heavy

---

# 4. Topbar

The topbar contains:

```text
Search
Notifications
User/Profile
```

Optional contextual elements:

```text
Breadcrumb
Page title
Page actions
```

### Search

Search should appear as a rounded input.

Example:

```text
🔍  Search patients...
```

Search is primarily used for global patient/application search.

---

# 5. Page Layout

Desktop content should follow:

```text
Sidebar
    ↓
Main Content
```

Main content:

```text
Page Header
↓
Summary / KPI Cards
↓
Primary Content
↓
Secondary Content
```

Example:

```text
Patients

[ Search patients... ]              [+ Add Patient]

┌────────┐ ┌────────┐ ┌────────┐
│ Total  │ │ Active │ │ Recent │
└────────┘ └────────┘ └────────┘

┌──────────────────────────────────────────────┐
│ Patient Table                                │
└──────────────────────────────────────────────┘
```

---

# 6. Design Tokens

All colors should come from centralized design tokens.

Do not hardcode random colors inside individual components.

---

## 6.1 Primary Colors

Primary blue:

```text
primary-50:  #EFF6FF
primary-100: #DBEAFE
primary-200: #BFDBFE
primary-300: #93C5FD
primary-400: #60A5FA
primary-500: #3B82F6
primary-600: #2563EB
primary-700: #1D4ED8
```

Primary actions generally use:

```text
primary-600
```

Hover:

```text
primary-700
```

---

## 6.2 Background

Application background:

```text
#F6F9FC
```

Alternative subtle surface:

```text
#F8FAFC
```

Cards:

```text
#FFFFFF
```

---

## 6.3 Text

Primary text:

```text
#0F172A
```

Secondary text:

```text
#475569
```

Muted text:

```text
#64748B
```

Disabled text:

```text
#94A3B8
```

---

## 6.4 Borders

Default border:

```text
#E2E8F0
```

Subtle border:

```text
#F1F5F9
```

---

# 7. Semantic Colors

Semantic colors communicate medical/application state.

## Success

Use for:

* Completed
* Active
* Healthy
* Confirmed
* Successful

```text
success-50:  #ECFDF5
success-100: #D1FAE5
success-500: #10B981
success-600: #059669
```

---

## Warning

Use for:

* Pending
* Upcoming
* Needs attention

```text
warning-50:  #FFFBEB
warning-100: #FEF3C7
warning-500: #F59E0B
warning-600: #D97706
```

---

## Danger

Use for:

* Critical
* Emergency
* Allergy
* Failed
* Cancelled

```text
danger-50:  #FEF2F2
danger-100: #FEE2E2
danger-500: #EF4444
danger-600: #DC2626
```

---

## Information

```text
info-50:  #EFF6FF
info-500: #3B82F6
```

---

## Accent

Purple and pink may be used sparingly for secondary visual differentiation.

They should NOT become additional primary brand colors.

---

# 8. Typography

Use a clean modern sans-serif font.

Preferred:

```text
Inter
```

Fallback:

```text
ui-sans-serif, system-ui, sans-serif
```

## Typography scale

### Page title

```text
24–30px
font-weight: 600–700
```

### Section title

```text
18–20px
font-weight: 600
```

### Card title

```text
15–17px
font-weight: 600
```

### Body

```text
14–15px
font-weight: 400
```

### Small metadata

```text
12–13px
font-weight: 400–500
```

Avoid huge typography.

The application is a working healthcare dashboard, not a marketing landing page.

---

# 9. Spacing System

Use a consistent 4px-based spacing scale.

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
```

Common usage:

```text
Card padding:        20–24px
Section spacing:     24–32px
Element spacing:     8–16px
Page padding:        24–32px
```

Avoid arbitrary values unless necessary.

---

# 10. Border Radius

Use soft but controlled rounding.

```text
Small elements:  6–8px
Inputs:          8–10px
Buttons:         8–10px
Cards:           12–16px
Large containers:16px
```

Do not make every element extremely rounded.

Avoid excessive pill-shaped UI.

Pills are reserved primarily for:

* Status badges
* Tags
* Compact categories

---

# 11. Shadows

Use subtle shadows only.

Preferred:

```text
shadow-sm
```

or a very subtle custom shadow.

Cards should generally rely on:

```text
white background
+
subtle border
+
subtle shadow
```

Avoid:

* Heavy shadows
* Glowing shadows
* Neon effects
* Excessive elevation

---

# 12. Cards

Cards are a major visual element.

Standard card:

```text
Background: white
Border: #E2E8F0
Radius: 12–16px
Padding: 20–24px
Shadow: subtle
```

Example:

```text
┌─────────────────────────────────────────────┐
│  🩺   Total Visits                          │
│                                             │
│       24                                    │
│       View all →                            │
└─────────────────────────────────────────────┘
```

Cards should have clear hierarchy.

Do not put unnecessary borders inside cards.

---

# 13. KPI / Summary Cards

Use KPI cards for:

* Total patients
* Total visits
* Active medications
* Lab reports
* Upcoming appointments

Structure:

```text
Icon
Label
Large value
Optional supporting action
```

Example:

```text
┌─────────────────────┐
│ 🩺                  │
│ Total Visits        │
│                     │
│ 24                  │
│ View all →          │
└─────────────────────┘
```

Use semantic icon backgrounds.

---

# 14. Buttons

Buttons must have a consistent hierarchy.

## Primary

Use for the main action.

Examples:

```text
+ Add Patient
Book Appointment
Save Changes
```

Style:

```text
Primary blue
White text
Medium weight
8–10px radius
```

---

## Secondary

Use for less important actions.

Examples:

```text
Cancel
View Details
Edit
```

Style:

```text
White/light background
Dark text
Subtle border
```

---

## Danger

Use for destructive operations.

Examples:

```text
Delete Patient
Cancel Appointment
```

Never use danger styling for normal actions.

---

## Ghost

Use for low-priority actions.

Examples:

```text
View all →
More
```

Avoid turning the entire UI into ghost buttons.

---

# 15. Icons

Use one icon library consistently.

Preferred:

```text
Lucide React
```

Rules:

* Use icons primarily for recognition and hierarchy
* Keep icon sizes consistent
* Default UI icon: 18–20px
* Small icon: 16px
* Large feature icon: 24–28px
* Do not mix multiple icon libraries
* Do not use emojis as UI icons

Medical icons can be used where appropriate.

---

# 16. Status Badges

Status should always use a reusable component.

Example:

```jsx
<StatusBadge status="scheduled" />
```

Possible statuses:

```text
scheduled
confirmed
completed
cancelled
pending
active
inactive
critical
```

Example:

```text
[ Scheduled ]
[ Confirmed ]
[ Completed ]
[ Cancelled ]
```

Semantic mapping:

```text
Scheduled → Blue
Confirmed  → Green
Completed  → Green
Pending    → Amber
Cancelled  → Red
Critical   → Red
```

Do not manually style statuses on individual pages.

---

# 17. Forms

Forms should be clean and spacious.

Structure:

```text
Label
Input
Helper / Error
```

Example:

```text
First Name
┌─────────────────────────────┐
│ Rahul                       │
└─────────────────────────────┘

Last Name
┌─────────────────────────────┐
│ Mehta                       │
└─────────────────────────────┘
```

Rules:

* Labels always visible
* Never rely only on placeholders
* Required fields use a consistent indicator
* Validation errors appear directly below the field
* Inputs use consistent height
* Avoid overly dense forms

---

# 18. Tables

Tables are preferred for administrative data.

Example:

```text
┌─────────────────────────────────────────────────────────┐
│ Patient        Age    Blood Group   Last Visit   Status │
├─────────────────────────────────────────────────────────┤
│ Rahul Mehta    26        B+          15 Aug       Active │
│ Tushar Saini   22        O-          20 Sep       Active │
└─────────────────────────────────────────────────────────┘
```

Rules:

* Clear header
* Comfortable row height
* Subtle horizontal separators
* Hover state
* Status badges
* Primary entity name should have stronger typography
* Actions should be grouped at the right

---

# 19. Patient Profile

Patient profile pages should follow this structure:

```text
Patient Header
↓
Summary Information
↓
KPI Cards
↓
Tabs / Sections
↓
Medical Data
```

Patient header may contain:

```text
Profile photo
Patient name
Patient ID
Age
Gender
Date of birth
Phone
Email
Blood group
Allergies
Emergency contact
```

Example:

```text
┌───────────────────────────────────────────────────────────┐
│ [PHOTO] Rahul Mehta          PAT-000124                   │
│         26 years | Male | 14 Mar 1999                     │
│                                                           │
│         📞 +91 ...                                        │
│         ✉ rahul@example.com                               │
│                                                           │
│                           Blood Group  B+                  │
│                           Allergies     None Known         │
└───────────────────────────────────────────────────────────┘
```

---

# 20. Medical Timeline

Timeline should be visually lightweight.

Example:

```text
12 Oct 2026
    ● ─── General Checkup
    │    Dr. Priya Sharma
    │    Upcoming
    │
15 Aug 2026
    ● ─── Fever and Cold
    │    Dr. Priya Sharma
    │    Consulted
    │
10 May 2026
    ● ─── Stomach Pain
         Dr. Amit Verma
         Consulted
```

Use semantic colors for timeline state.

Do not overdecorate timelines.

---

# 21. Modals

Use modals for focused actions:

* Add patient
* Edit patient
* Create appointment
* Upload document
* Confirm deletion

Modal structure:

```text
┌──────────────────────────────────────┐
│ Create Patient                  ✕    │
├──────────────────────────────────────┤
│                                      │
│ Form                                 │
│                                      │
├──────────────────────────────────────┤
│                    Cancel   Save     │
└──────────────────────────────────────┘
```

Do not use modals for large multi-page workflows.

---

# 22. Empty States

Empty states should be helpful.

Example:

```text
          📄

       No lab reports

There are no lab reports for this patient.

       [ Upload Report ]
```

Avoid simply displaying:

```text
No data.
```

---

# 23. Loading States

Use skeleton loaders where possible.

Example:

```text
┌────────────────────────────┐
│ ███████████████            │
│ █████████                  │
│                            │
│ █████████████████████      │
└────────────────────────────┘
```

Avoid unnecessary full-screen spinners.

---

# 24. Error States

Errors should be understandable.

Bad:

```text
Error 500
```

Better:

```text
Unable to load patient information.

Please try again.

[ Retry ]
```

Technical details should appear in developer logs, not dominate the user interface.

---

# 25. Responsive Design

The application must work on:

```text
Desktop
Tablet
Mobile
```

Desktop is the primary target.

### Desktop

Persistent sidebar.

### Tablet

Sidebar may collapse.

### Mobile

Use:

```text
Top navigation
+
Collapsible/mobile navigation
```

Cards should stack vertically.

Tables may become:

* Horizontally scrollable
* Or responsive card layouts where appropriate

Never allow important content to overflow the viewport.

---

# 26. Dashboard Design

The dashboard should prioritize information hierarchy.

Preferred structure:

```text
Greeting / Page Header

KPI Cards

┌──────────────────────────┬──────────────────┐
│ Recent Activity          │ Quick Actions    │
│                          │                  │
│ Timeline / Appointments  │ Add Patient      │
│                          │ Appointment      │
│                          │ Upload Report    │
└──────────────────────────┴──────────────────┘

Recent Patients / Reports
```

Avoid filling the dashboard with charts just because charts are available.

Every visualization must communicate useful information.

---

# 27. Medical Data Presentation

Medical information should be:

* Clear
* Structured
* Scannable
* Conservative
* Easy to distinguish

Important medical information should have visual priority.

Examples:

```text
Blood Group
B+

Allergies
None Known

Blood Pressure
120/80 mmHg

Heart Rate
72 bpm

Temperature
36.7 °C
```

Do not use bright colors unnecessarily for normal medical information.

Use strong semantic colors primarily for warnings and critical states.

---

# 28. AI-Generated Frontend Rules

When using an AI coding tool, ALWAYS provide:

> Read `design.md` before implementing the feature.

The AI must:

1. Inspect existing components first.
2. Reuse existing components.
3. Reuse existing design tokens.
4. Reuse existing layouts.
5. Follow existing spacing.
6. Follow existing typography.
7. Follow existing color semantics.
8. Avoid introducing new libraries unless explicitly requested.
9. Avoid creating duplicate components.
10. Avoid changing global styling for a single feature.
11. Keep the existing sidebar/topbar unchanged.
12. Make the new page visually indistinguishable from the existing application.

---

# 29. AI Feature Prompt Template

When asking an AI tool to implement a feature, use:

```text
You are working on the EHR frontend.

First read:
design.md

The design system in design.md is authoritative.

Before writing code:
1. Inspect existing components.
2. Inspect existing layouts.
3. Inspect existing design tokens.
4. Reuse existing components wherever possible.

Feature to implement:
[DESCRIBE FEATURE]

Requirements:
[LIST FUNCTIONAL REQUIREMENTS]

UI requirements:
- Follow design.md exactly.
- Do not invent a new visual style.
- Do not create a new sidebar.
- Do not create a new topbar.
- Reuse existing Button, Card, Badge, Input, Modal, Table and other shared components.
- Follow existing spacing and typography.
- Follow semantic colors defined in design.md.
- Make the feature responsive.

Do not:
- Add unnecessary dependencies.
- Introduce new colors.
- Introduce new typography.
- Change global styles unnecessarily.
- Duplicate existing components.
- Replace the existing application shell.

After implementation:
- Ensure the feature visually matches existing pages.
- Ensure responsive behavior.
- Ensure existing pages are not broken.
```

---

# 30. Feature Development Rule

Every new feature follows:

```text
Requirement
    ↓
Check design.md
    ↓
Inspect existing components
    ↓
Reuse components
    ↓
Implement feature
    ↓
Test desktop
    ↓
Test mobile
    ↓
Check visual consistency
```

---

# 31. Component Architecture

Recommended structure:

```text
src/
│
├── components/
│   ├── ui/
│   │   ├── Button
│   │   ├── Card
│   │   ├── Input
│   │   ├── Badge
│   │   ├── Modal
│   │   ├── Table
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── AppShell
│   │   ├── Sidebar
│   │   └── Topbar
│   │
│   └── medical/
│       ├── PatientCard
│       ├── VitalCard
│       ├── Timeline
│       └── StatusBadge
│
├── pages/
│   ├── Dashboard
│   ├── Patients
│   ├── Appointments
│   ├── Visits
│   ├── Prescriptions
│   ├── LabReports
│   └── Documents
│
├── features/
│   ├── patients/
│   ├── appointments/
│   ├── visits/
│   ├── prescriptions/
│   └── lab-reports/
│
├── lib/
│   └── api/
│
└── styles/
    └── design-tokens
```

---

# 32. Rules for You and Devesh

Both developers must follow these rules.

### Before creating a component

Ask:

```text
Does this component already exist?
```

If yes:

```text
Reuse it.
```

If no:

```text
Can an existing component be extended?
```

If yes:

```text
Extend it.
```

Only create a new component when necessary.

---

# 33. What Must NEVER Change Per Feature

Unless explicitly agreed by both primary developers:

```text
❌ Sidebar structure
❌ Topbar structure
❌ Brand colors
❌ Typography
❌ Global spacing
❌ Global border radius
❌ Button appearance
❌ Card appearance
❌ Input appearance
❌ Status color semantics
❌ Icon library
❌ Application background
```

A feature should feel like it was built by the same team.

---

# 34. Visual Quality Checklist

Before considering a frontend feature complete:

### Layout

```text
[ ] Uses AppShell
[ ] Correct page spacing
[ ] Responsive
[ ] No horizontal overflow
```

### Design

```text
[ ] Uses existing colors
[ ] Uses existing typography
[ ] Uses existing components
[ ] Correct border radius
[ ] Correct shadows
[ ] Correct spacing
```

### UX

```text
[ ] Loading state
[ ] Empty state
[ ] Error state
[ ] Success feedback
[ ] Form validation
[ ] Destructive actions confirmed
```

### Medical UI

```text
[ ] Important medical data is clearly visible
[ ] Critical information uses semantic danger styling
[ ] Normal information is not unnecessarily colorized
[ ] Patient information is easy to scan
```

---

# 35. Final Rule

> **The application should feel like one product, not a collection of individually generated pages.**

When in doubt:

```text
Consistency > Creativity
Reuse > Duplication
Clarity > Decoration
Functionality > Visual Effects
Medical readability > Fancy UI
```

This document is the authoritative frontend design reference for the EHR project.

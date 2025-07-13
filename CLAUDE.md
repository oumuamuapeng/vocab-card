# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript vocabulary learning app for toddlers (2-4 years old), focused on phonics-based word families learning. The app uses word families (like "-ap", "-at") to teach children similar-sounding words through visual cards and audio pronunciation.

## Development Commands

### Core Development
- `npm run dev` - Start development server on port 3000 (auto-opens browser)
- `npm run build` - Build for production (runs TypeScript compilation + Vite build)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

### Installation
- `npm install` - Install all dependencies

## Architecture

### Word Family System
The core learning concept revolves around word families - groups of words that share the same ending sound (rime). Each family contains multiple words with different prefixes but the same suffix pattern.

**Key Data Structure:**
- `WordFamily` - Contains a group of related words (e.g., "-ap" family: cap, map, tap)
- `WordInFamily` - Individual words with pronunciation, meaning, examples, and stroke animations
- `StudyProgress` - Tracks user learning progress per family with mastery levels (0-5 stars)

### State Management
- Uses React Context API and localStorage for progress persistence
- `useProgress` hook manages learning progress and completion tracking
- `useSpeechSynthesis` hook handles text-to-speech functionality

### Component Structure
- **App.tsx** - Root component with gradient background
- **Home.tsx** - Main landing page with family selection grid
- **FamilyCard.tsx** - Clickable cards for each word family with progress indicators
- **FlipCardPage.tsx** - Learning interface for studying words in a family
- **StrokeAnimation.tsx** - SVG-based letter stroke animations for writing practice

### Progress System
- Progress is stored in localStorage with key `vocab-card-progress`
- Each family tracks completed words and mastery level (0-5 stars)
- Mastery calculated as: `(completed_words / total_words) * 5`
- Progress bars show completion percentage on family cards

### Audio Integration
- Uses Web Speech API for pronunciation
- Prefers "Google US English" voice or falls back to available English voices
- Custom speech settings: rate 0.9, pitch 1.1 for child-friendly pronunciation
- Static audio files in `/public/audio/` for backup pronunciation

## Styling & UI

### Design System
- **Tailwind CSS** with custom color palette (primary: orange tones, secondary: blue tones)
- **Child-friendly fonts**: Comic Sans MS ("font-cute") and Arial Rounded ("font-friendly")
- **Animations**: Slow bounce/pulse effects for engaging interactions
- **Color scheme**: Bright, vibrant colors with gradient backgrounds

### Responsive Design
- Grid layouts: 2 columns on mobile, 3 on desktop
- Cards use hover/active scale transforms for tactile feedback
- Fixed positioning for decorative elements (bouncing star)

## Data Management

### Word Families Data
Located in `src/data/wordFamilies.ts`:
- Each word includes: prefix, full word, icon, image URL, phonetic notation, meaning, part of speech, examples, related words, and SVG stroke paths
- Supports both English and Chinese (traditional characters in examples)
- Font Awesome icons for visual representation

### TypeScript Types
All interfaces defined in `src/types/index.ts`:
- Comprehensive type safety for word families, progress tracking, and examples
- Includes support for stroke order animations and multilingual content

## Development Patterns

### Component Patterns
- Functional components with hooks (no class components)
- TypeScript interfaces for all props
- Custom hooks for shared logic (progress, speech synthesis)

### File Organization
```
src/
├── components/     # Reusable UI components
├── pages/         # Page-level components
├── hooks/         # Custom React hooks
├── data/          # Static data and word families
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

### Naming Conventions
- Components: PascalCase (e.g., `FamilyCard.tsx`)
- Hooks: camelCase with "use" prefix (e.g., `useProgress.ts`)
- Types: PascalCase interfaces (e.g., `WordFamily`)
- Files: kebab-case for utilities, PascalCase for components

## Configuration Notes

### Build Tools
- **Vite** for fast development and building
- **ESLint** with TypeScript, React hooks, and React Refresh plugins
- **PostCSS** with Tailwind CSS processing

### Browser Requirements
- Requires modern browser with Web Speech API support
- localStorage support for progress persistence
- Audio element support for backup pronunciation files
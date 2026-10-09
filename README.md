# ADVISO — 1-on-1 Tactical Mentorship Platform

> **Live Application:** [ADVISO](https://adviso-flax.vercel.app/)

---

## Overview

**ADVISO** is a modern mentorship and career engineering web platform designed to eliminate drawn-out coaching programs in favor of targeted, high-impact **20-minute tactical strategy sessions**. The platform connects developers, designers, and tech operators directly with vetted industry leads for precise 1-on-1 problem-solving, architectural guidance, portfolio audits, and offer negotiation loops.

---

## Key Features

- **20-Minute Tactical Sessions:** Focused booking infrastructure tailored for direct, bottleneck-clearing consultations without mandatory long-term commitments.
- **Role-Based Portals:**
  - **Mentees / Users:** Discover verified mentors, manage booked session dates, inspect transaction receipts, and update account credentials.
  - **Mentors:** Session timeline monitoring and availability slot management.
  - **Administrative Controls:** Oversight tools for platform users and operations.
- **Calendar & Availability Scheduling:** Date-picker workflows and timezone management powered by `react-day-picker` and `date-fns`.
- **Interactive Visual Experience:** Fluid momentum scrolling via Lenis, interactive 3D elements powered by Three.js and OGL, and micro-interactions orchestrated through GSAP.
- **Authentication & Security Workflows:**
  - Google Identity authentication via `@react-oauth/google`.
  - Type-safe, declarative forms using TanStack React Form validated with Zod schemas.
  - Verification workflows supported by segmented numeric inputs (`input-otp`).
- **Accessible UI Architecture:** Component systems structured with Radix UI primitives, Lucide React iconography, custom light/dark color themes, and toast status messaging.

---

## Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js (`16.3.4`) | Full-stack React framework utilizing the App Router |
| **Core Library** | React (`19.2.8`) / React DOM | Declarative component UI engine |
| **Language** | TypeScript (`^5`) | Static typing and compile-time contract enforcement |
| **Server State & Caching** | `@tanstack/react-query` (`^5.102.8`) | Asynchronous data fetching, synchronization, and caching |
| **Client State Management** | Zustand (`^5.0.15`) | Minimal, centralized client application state |
| **Form Management** | `@tanstack/react-form` (`^1.33.5`) | Performant form state engine |
| **Schema Validation** | Zod (`^4.6.1`) | Runtime type and input schema validation |
| **HTTP Client** | ofetch (`^1.5.1`) | Lightweight Fetch-compatible HTTP request client |
| **Styling & Theming** | Tailwind CSS (`^4`), `next-themes` | Utility-first responsive styling and theme switching |
| **Component Primitives** | Radix UI (`^1.6.7`), `class-variance-authority` | Headless, accessible UI building blocks |
| **Interactive 3D & Graphics** | Three.js (`^0.186.0`), OGL (`^1.0.11`) | WebGL rendering and canvas graphics |
| **Animation & Momentum Scroll** | GSAP (`^3.15.0`), `@gsap/react`, Lenis (`^1.3.26`) | Timeline-based micro-interactions and smooth scrolling |
| **Date & Scheduling Utilities** | `date-fns` (`^4.4.0`), `@date-fns/utc`, `react-day-picker` | Timezone normalization and calendar selection |
| **Verification Inputs** | `input-otp` (`^1.5.0`) | Accessible one-time passcode slot input |
| **Notifications & Icons** | Sonner (`^2.0.8`), Lucide React (`^1.43.0`), React Icons | Toast notifications and icon assets |
| **Linter & Code Formatting** | Biome (`2.4.2`) | Fast toolchain for code formatting and static analysis |

---

## Getting Started Locally

Follow these steps to run the application in your local development environment:

### Prerequisites

- **Node.js:** `v18.18.0` or higher
- **Package Manager:** `npm` (or preferred package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Rafi-Shariar/ADVISO-frontend](https://github.com/Rafi-Shariar/ADVISO-frontend)
2. Install project dependencies
```
npm install
```
3. Configure environment variables:
```
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```
4. Launch the development server:
```
npm run dev
```

## Available Scripts
| Command | Action | 
| :--- | :--- | 
| npm run dev | Runs the Next.js development server at `localhost:3000` |
| npm run build | Compiles the production build | 
| npm run start | Serves the generated production bundle locally | 
| npm run lint | Inspects code for potential issues using Biome |
| npm run format:fix | Enforces and writes code styling guidelines via Biome |
| npm run format:check | Verifies formatting rules on the src/ directory |
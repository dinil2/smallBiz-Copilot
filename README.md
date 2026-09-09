# SmallBiz Copilot 📊🤖
> **Intelligent Business Intelligence & Grounded AI Financial Advisory for Modern Small Businesses**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-smallbiz--copilot.netlify.app-5B4FE0?style=for-the-badge&logo=netlify&logoColor=white)](https://smallbiz-copilot.netlify.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20RLS-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-F55036?style=for-the-badge&logo=fastapi&logoColor=white)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌐 Live Production Application
**Experience the live app:** **[https://smallbiz-copilot.netlify.app](https://smallbiz-copilot.netlify.app)**

---

## 💡 What is SmallBiz Copilot?

Small business owners — running clothing boutiques, restaurants & cafes, electronics shops, neighborhood pharmacies, salons, or grocery stores — face a persistent challenge: **they possess sales records, but lack financial data science teams.**

Most owners rely on spreadsheets, manual notebooks, or instinct. Crucial questions often go unanswered:
- *Which specific menu items or SKUs actually deliver the highest net margin after accounting for COGS?*
- *Why did my profit drop 14% this month even though top-line revenue looked stable?*
- *Which inventory categories are silently tying up working capital with sluggish velocity?*
- *If I raise prices by 5% and foot traffic softens by 2%, what is the exact net impact on my bottom line?*

**SmallBiz Copilot** bridges this gap. It provides an enterprise-caliber business intelligence dashboard coupled with a **grounded AI analyst** designed specifically for non-technical retail and service entrepreneurs.

---

## 🧠 Core Philosophy: Grounded AI vs. Unchecked LLMs

A major hazard with generic AI solutions in financial management is **hallucination**. Asking a general-purpose chat model to interpret raw financial files often produces invented numbers, fabricated trends, or misleading advice.

**SmallBiz Copilot solves this with strict separation of concerns:**
1. **The Deterministic Analytics Engine (Code as Truth):** Every single KPI (total revenue, total expenses, net profit, margin percentages, month-over-month variances, category rankings, and Health Scores) is computed mathematically in pure, auditable TypeScript functions from the database records.
2. **The Grounded AI Narrative Layer:** The LLM is **never** permitted to calculate or invent numbers. Instead, our server-side route aggregates the computed analytics into a clean, compact schema and injects it into a rigorous system prompt. The AI acts purely as an executive translator — explaining the mathematical realities in lucid, actionable, plain English.

```
┌─────────────────────────────────────────────────────────────┐
│                    USER TRANSACTION DATA                    │
│   (CSV Uploads, Manual POS Entry, or Industry Demo Sets)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 SUPABASE POSTGRESQL (RLS)                   │
│      Isolated Multi-Tenant Storage with Row Level Security  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             DETERMINISTIC ANALYTICS ENGINE (TS)             │
│    • Revenue / Cost / Margin Formulas                       │
│    • Month-over-Month Delta & Anomaly Flags (>15% drops)    │
│    • Category & SKU Profitability Ranking                   │
│    • Composite Business Health Score (0-100)                │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
    ┌────────────────────┐         ┌────────────────────┐
    │ RECHARTS DASHBOARD │         │ /api/analyze ROUTE │
    │ Area, Bar & Metric │         │ (Grounded Context) │
    │ Data Visualizations│         └──────────┬─────────┘
    └────────────────────┘                    │
                                              ▼
                                   ┌────────────────────┐
                                   │  GROQ CLOUD ENGINE │
                                   │ LLaMA 3.3 70B LLM  │
                                   └──────────┬─────────┘
                                              │
                                              ▼
                                   ┌────────────────────┐
                                   │ ACTIONABLE INSIGHTS│
                                   │ Plain-English Chat │
                                   │ & Executive Recs   │
                                   └────────────────────┘
```

---

## ✨ Key Features & Capabilities

### 1. Executive BI Dashboard & Financial KPIs
- **Core Metrics:** Real-time calculation of Gross Revenue, Operating Expenses, Net Profit, and Operating Margin.
- **Month-over-Month Comparisons:** Dynamic percentage changes with positive/negative visual indicators comparing current period performance to preceding cycles.
- **Currency Adaptation:** Native support for localized small business figures formatted cleanly in Sri Lankan Rupees (**Rs. / LKR**).

### 2. Deep Visual Analytics (Recharts Integration)
- **Revenue & Expense Trend Curves:** Smooth area charts highlighting the dynamic spread between revenue inflow and cost outflow over time.
- **Category Profitability Breakdown:** Comparative bar visualizations identifying which department (e.g., Footwear vs. Denim, or Beverages vs. Entrees) drives actual profit versus mere volume.
- **Product Velocity Leaders & Laggards:** Clear tables showing top margin-generating products alongside underperforming items with high holding costs.

### 3. Composite Business Health Score (0–100)
- Calculated via an algorithmic weighted formula across four pillars:
  - **Revenue Momentum (30%)**: Direction and stability of sales.
  - **Profit Margin Quality (30%)**: Efficiency of converting revenue to profit.
  - **Expense Discipline (25%)**: Ratio of overhead to gross income.
  - **Product Diversification (15%)**: Protection against single-SKU revenue concentration risk.
- Accompanied by AI-generated one-sentence health diagnostic narrating operational state.

### 4. Grounded AI Copilot (Interactive Chat & Action Items)
- **Conversational Queries:** Ask questions in everyday language:
  - *"Why did my profit margin drop this month despite higher sales?"*
  - *"Which products should I negotiate supplier discounts on?"*
  - *"What should be my top inventory priority for the upcoming quarter?"*
- **Algorithmic Recommendations:** Dedicated automated action items generated by analyzing anomaly flags (such as any category experiencing a >15% drop).

### 5. What-If Financial Scenario Simulator
- Interactive parameter sliders enabling business owners to simulate potential business decisions before execution:
  - Price adjustments (-20% to +30%)
  - Customer volume changes (-30% to +50%)
  - COGS supplier cost shifts (-20% to +30%)
- Live recalculated projections showing estimated monthly impact on revenue, net profit, and margin.

### 6. Interactive Onboarding & Guided Product Tour
- Multi-step visual walkthrough modal designed for first-time business owners.
- Explains key dashboard cards, analytics charts, transaction management, and AI copilot capabilities with backwards/forwards navigation.

### 7. Dual Ingestion Pipelines: Real Data + Realistic Industry Demo Engine
- **Client-Side CSV Parser:** Ingests external spreadsheet data via PapaParse, validating columns and mapping rows directly to Postgres.
- **Custom Transaction Entry:** Modal interface to record individual sales with instantaneous metric re-indexing.
- **Context-Aware Demo Data Generator:** Generates 100+ realistic synthetic transactions calibrated to the user's specific business type (Clothing, Restaurant, Electronics, Pharmacy, Salon, Grocery, etc.) spanning 90 days.

---

## 🛡️ Multi-Tenant Architecture & Security

Security and data privacy are core architectural priorities:

- **Row Level Security (RLS) on PostgreSQL:**
  Every transaction, insight, and profile row in Supabase is strictly tied to `auth.users.id`. RLS policies enforce that users can only select, insert, update, or delete records where `auth.uid() = user_id`.
- **Server-Side Credential Isolation:**
  Private LLM API keys (`AI_API_KEY`) and administrative secrets are strictly scoped to Next.js server runtime environments. **Zero private keys are exposed to the client bundle.**
- **Safe Authentication Flows:**
  Built with `@supabase/ssr` leveraging HTTP-only cookie session handling, PKCE auth verification, and protected route handlers.

---

## 🛠️ Technology Stack Deep Dive

| Layer | Technology | Purpose & Implementation Details |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Server Components, dynamic serverless routes (`/api/analyze`), Turbopack compilation, and streaming rendering. |
| **Language** | **TypeScript 5** | Strict type safety across database schemas, analytics DTOs, and component props. |
| **UI Library** | **React 19** | Concurrent features, modern hooks, and optimized hydration lifecycle. |
| **Styling** | **Tailwind CSS v4** | Custom-engineered design system with warm off-white surface colors (`#FAFAF9`), `#FFFFFF` card surfaces, and accessible typography. |
| **Typography** | **Google Fonts (Inter & Sora)** | **Sora** for modern, high-contrast headings and numerical readouts; **Inter** for legible, high-density dashboard UI. |
| **Data Visualization** | **Recharts** | Fully responsive SVG charts (AreaCharts, BarCharts) styled with custom tooltips and branded color palettes. |
| **Motion & Animation**| **Framer Motion** | Staggered entrance animations, smooth modal transitions, animated counters, and marquee ticker interactions. |
| **Database & Auth** | **Supabase (PostgreSQL)** | Cloud-hosted relational database, Row Level Security policies, foreign-key relational profiles, and email/password authentication. |
| **AI Inference** | **Groq Cloud API** | Ultra-low latency inference using open-source models (`llama-3.3-70b-versatile` / compound architectures) with strict JSON grounding. |
| **CSV Engine** | **PapaParse** | Client-side chunked CSV file ingestion and schema validation without server overload. |
| **Hosting & CI/CD** | **Netlify** | Production edge deployment powered by `@netlify/plugin-nextjs` v5 runtime for serverless functions and asset distribution. |

---

## 📐 Data Architecture

### Database Schema (Supabase PostgreSQL)

```sql
-- 1. Profiles Table (Extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  shop_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  business_type_other TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Transactions Table
CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
  cost_price NUMERIC(12, 2) NOT NULL CHECK (cost_price >= 0),
  revenue NUMERIC(12, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  cost NUMERIC(12, 2) GENERATED ALWAYS AS (quantity * cost_price) STORED,
  profit NUMERIC(12, 2) GENERATED ALWAYS AS ((quantity * unit_price) - (quantity * cost_price)) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = id);

CREATE POLICY "Users can access own transactions"
  ON public.transactions FOR ALL
  USING (auth.uid() = user_id);
```

---

## 🚀 Local Development Setup

To run this project locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/dinil2/smallBiz-Copilot.git
cd smallBiz-Copilot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key
AI_API_KEY=your_groq_or_openai_api_key
AI_MODEL=llama-3.3-70b-versatile
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the development server
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📦 Deployment Architecture

The application is deployed on **Netlify** utilizing the Next.js runtime plugin (`@netlify/plugin-nextjs`). Server components, API endpoints, and dynamic routes run on serverless functions while static assets are served through Netlify's high-speed global CDN edge network.

---

## 📄 License
This project is licensed under the MIT License — feel free to explore, learn, and build upon it.

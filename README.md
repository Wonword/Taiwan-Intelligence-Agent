# Taiwan Intelligence Agent

An educational geopolitical intelligence application specializing in Taiwan and cross-Strait relations, designed specifically for European business managers and supply chain directors.

The application uses **Gemini with Google Search grounding** to research up-to-date regional developments. It rigorously separates **FACT**, **ANALYSIS**, and **SPECULATION**, evaluates 5-pillar escalation indicators, calculates a deterministic **Escalation Risk Index**, and provides actionable guidance on semiconductor supply chains (e.g., TSMC, ASML, packaging), maritime trade through the Taiwan Strait, and international trade risks.

---

## Key Features

1. **Strict Triad Categorical Separation**:
   - **FACT**: Verifiable physical actions, policies, and official statements attributed to originators. An actor's statement is treated as evidence of the statement itself, not of its factual veracity.
   - **ANALYSIS**: Direct strategic implications for European enterprise leadership (semiconductor lead times, export controls, shipping route diversions, sanctions).
   - **SPECULATION**: Projected contingencies and hypothetical escalation scenarios, explicitly labeled to prevent false certainty.

2. **Application-Code Escalation Risk Index**:
   - Deterministically calculated in application code using weighted pillars:
     - Military: 30%
     - Political: 20%
     - Diplomatic: 20%
     - Economic: 20%
     - Technological: 10%
   - Rated on a scale of 0 to 4:
     - `0`: Routine activity or de-escalation supported by evidence
     - `1`: Limited increase in tension
     - `2`: Sustained tension with meaningful consequences
     - `3`: Major deterioration or confrontation
     - `4`: Acute crisis or direct escalation
   - **Formula**: `sum(Weight × Rating) / 4`.
   - **Missing Evidence Handling**: If any category cannot be assessed from verified evidence, the result displays *"Insufficient evidence for a complete index"* rather than substituting zero.
   - Labeled **"Escalation risk index"**, explicitly avoiding misleading labels like "Probability of war".

3. **Strategic Importance Score (0–100)**:
   - `0–24`: Limited implications for the intended user
   - `25–49`: Meaningful but localized consequences
   - `50–74`: Significant regional or sectoral implications
   - `75–100`: Potentially major international or systemic consequences

4. **Confidence Assessment**:
   - Explicitly distinguishes **confidence in an event's occurrence** (evidence quality, independent corroboration) from **confidence in predicting consequences** (scenario volatility).

5. **Search Grounding & Citations**:
   - Server-side Gemini API integration via `@google/genai` with `googleSearch` grounding enabled.
   - Clickable source citations attached to claims, alongside search query attribution.

6. **Executive Macro Summary & Briefing Download**:
   - Concise executive summary, three indicators to monitor next, semiconductor supply and trade implications, and key uncertainties.
   - "Download Briefing" button exporting a clean, formatted Markdown report (`.md`).

7. **Specific Event & Excerpt Deep-Dive**:
   - Users can describe an event or paste an article excerpt from news feeds. The system investigates and evaluates it as unverified source material until cross-checked with search sources.

8. **Interactive Follow-Up Inquiries**:
   - Ask ad-hoc questions regarding European supply chain vulnerabilities or regulatory exposure.

---

## Technical Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide icons, Vite.
- **Backend / API**:
  - Full-stack Express server (`server.ts`) for local development and containerized runs.
  - Vercel Serverless Function (`/api/analyze.ts`) for direct zero-config Vercel edge/serverless deployment.
  - Reusable core analysis service (`/api/_lib/analyzeCore.ts`) shared identically between Express and Vercel.
- **Server-Only Credentials**:
  - Gemini API key (`GEMINI_API_KEY`) and model (`GEMINI_MODEL`) are kept strictly on the server side.
  - The client interacts exclusively with `POST /api/analyze`.

---

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key (configured in AI Studio Secrets or environment). |
| `GEMINI_MODEL` | No | Model alias (defaults to `gemini-3.8-flash`). |
| `APP_URL` | No | Public deployment URL (auto-injected in AI Studio). |

---

## AI Studio Development & Local Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The full-stack server starts on `http://localhost:3000` with the Express backend forwarding `/api/analyze` and mounting the Vite dev middleware.

### 3. Build & Type Check
```bash
# Type check without emitting
npm run lint

# Production bundle (emits to dist/)
npm run build
```

---

## GitHub Export & Vercel Deployment

### 1. Export to GitHub
1. In Google AI Studio Build, click the **Export to GitHub** button.
2. Select your target repository or create a new one.

### 2. Deploy on Vercel
1. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Import the GitHub repository created above.
3. Configure the project settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (a `.npmrc` file with `legacy-peer-deps=true` is included to resolve peer dependency resolution in modern npm)
4. Add the **Environment Variables** in the Vercel dashboard:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `GEMINI_MODEL`: `gemini-3.8-flash` (or your preferred supported Gemini model).
5. Click **Deploy**. Vercel will build the frontend into `dist` and automatically mount `/api/analyze.ts` as a serverless function.

---

## Verification & Account Configuration Status

- **Frontend Compilation**: Tested and verified with `npm run build` (outputs static assets in `dist/`).
- **Serverless API Routes**: Verified via `/api/analyze.ts` and `server.ts`.
- **Live Search Grounding**: Requires a valid `GEMINI_API_KEY` with access to Gemini 3 series models (`gemini-3.8-flash`). In AI Studio, this is injected automatically from the Secrets panel. On Vercel, enter it in the Vercel Environment Variables.

---

## Limitations

1. **Non-Continuous Monitoring**: Briefings are generated on-demand upon user request; the application does not run automated 24/7 background scrapers.
2. **Search Grounding Latency & Coverage**: Coverage depends on public web reporting indexed by Google Search. Emerging tactical military movements may have latency before formal press release or verification.
3. **Educational & Strategic Guidance**: This application is built for educational intelligence analysis and executive scenario planning. It does not replace sovereign defense intelligence or binding legal/compliance counsel.

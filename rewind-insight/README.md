# Incident Time Machine — Rewind. Reconstruct. Simulate. Learn.

> **Cybersecurity Decision-Support & Counterfactual Simulation Platform**  
> *"Don't just respond to an attack. Rewind it. Understand it. Simulate it. Stop it."*

---

## 1. What the Project Is

**Incident Time Machine** is an interactive, deterministic cybersecurity incident response and decision-support platform. It gives security operations center (SOC) analysts and incident commanders the unprecedented ability to **rewind a cyber incident**, explore the ground-truth digital twin across time, simulate alternate response interventions before committing to them, and automatically generate executive incident resolution reports and organizational learning plans.

---

## 2. Core Concept

Traditional SIEMs and SOAR tools are forward-only and reactive: alerts fire, analysts triage amidst incomplete visibility, and decisions are made with high uncertainty.

Incident Time Machine changes this paradigm:
1. **Temporal State Reconstruction**: Travel backward and forward in time across the incident lifecycle.
2. **Actual Reality vs. Known Security State**: Contrast what actually happened in the enterprise with what defenders knew at that precise moment.
3. **Counterfactual Simulation Lab**: Fork alternate branches at pivotal moments (e.g., T+22m) to test interventions (*"What if we isolate the endpoint now instead of doing nothing?"*).
4. **Deterministic Explainability**: IRIS AI copilot cites concrete timeline milestones, graph edges, and evidence items without external hallucinations.
5. **Closed-Loop Post-Incident Learning**: Aggregate all forensic artifacts, detection gaps, and counterfactual ROI into an immutable report and actionable post-incident roadmap.

```
SIMULATE ──> OBSERVE ──> RECONSTRUCT ──> REWIND ──> INVESTIGATE
    │                                                     │
    v                                                     v
ACTION ITEMS <── LEARN <── GENERATE REPORT <── SIMULATE <── TEST RESPONSES
```

---

## 3. Hackathon Purpose

Incident Time Machine was built for the **Incident Response / AI in Cybersecurity Hackathon** to demonstrate how AI and counterfactual modeling can radically transform:
- **Mean Time to Detect (MTTD)**: Pinpointing the 37-minute gap between early anomalous signals and formal SIEM alerts.
- **Mean Time to Contain (MTTC)**: Demonstrating that early containment at 10:04 prevents 100% of downstream database access and file staging.
- **Incident Post-Mortems**: Replacing manual, multi-week post-mortem drafting with deterministic, evidence-backed reporting.

---

## 4. Main Features by Phase

### Phase 1 — Synthetic Incident Simulation Engine
- Central simulation clock governing incident progression (09:42 to 10:24 UTC).
- Deterministic reconstruction of ACME Corporation credential compromise (**INC-2048**).
- Dynamic risk engine computing organizational threat severity (`LOW` $\rightarrow$ `CRITICAL`).

### Phase 2 — Temporal Digital Twin & Forensic Timeline
- Deep state reconstruction across hosts (`LAPTOP-042`, `SERVER-03`, `DB-PROD-01`, `FILE-SRV-01`), identity (`alex.m`), network sockets, processes, and sensitive data vaults.
- Strict dual-world perspective: **Actual Ground Truth** vs. **Known Security State at the Time**.
- Forensic evidence ledger with verified SHA-256 hashes and telemetry sources.

### Phase 3 — Interactive Attack Graph
- Temporal graph visualization illustrating attacker entry points, compromised nodes, and lateral traversal edges.
- Pathfinding engine identifying the critical path to sensitive customer database records.
- Blast radius analyzer tracking confirmed vs. potential asset exposure.

### Phase 4 — Counterfactual Simulation Lab
- Isolated scenario forking at any historical minute.
- Standard response actions: `DO_NOTHING`, `ISOLATE_ENDPOINT`, `DISABLE_USER`, and `BLOCK_LATERAL_CONNECTION`.
- Instant diffing of prevented compromises, saved critical assets, and avoided data exposures.
- Strict baseline immutability: simulated futures never contaminate historical reality.

### Phase 5 — IRIS Investigation & Response Intelligence
- Specialized cybersecurity AI copilot with zero hallucinations and strongly typed citations.
- Detection gap analyzer identifying earliest detectable signals and latency.
- Response recommendation engine ranking response candidates with safety tradeoffs and human-in-the-loop approval.
- Autonomous simulated response execution inside isolated counterfactual branches.

### Phase 6 — Incident Resolution Report & Learning System
- One-click deterministic report generation aggregating Phases 1–5 data into executive summaries, classifications, evidence ledgers, and root cause findings.
- Report snapshots and finalization locking (`DRAFT` $\rightarrow$ `FINAL`).
- 7-section **Post-Incident Learning Dashboard** (`/learning`) converting incident facts into organizational learning.
- Interactive action item tracking (`OPEN`, `IN_PROGRESS`, `COMPLETED`, `DEFERRED`).
- Browser-native print and Save as PDF styling.

---

## 5. System Architecture

```
                    INCIDENT SIMULATION ENGINE (Phase 1)
                                   |
                                   v
                      TEMPORAL STATE RECONSTRUCTION
                                   |
        +--------------------------+--------------------------+
        |                          |                          |
        v                          v                          v
   DIGITAL TWIN (Phase 2)     ATTACK GRAPH (Phase 3)    EVIDENCE LEDGER
        |                          |                          |
        +--------------------------+--------------------------+
                                   |
                                   v
                     COUNTERFACTUAL ENGINE (Phase 4)
                                   |
                                   v
                      RESPONSE INTELLIGENCE (Phase 5)
                                   |
                                   v
                        IRIS COPILOT & GAP SERVICE
                                   |
                                   v
                      INCIDENT REPORT ENGINE (Phase 6)
                                   |
                 +-----------------+-----------------+
                 |                                   |
                 v                                   v
      INCIDENT RESOLUTION REPORT           POST-INCIDENT LEARNING
             (/reports)                          (/learning)
```

---

## 6. Simulation Disclaimer

> **IMPORTANT**:  
> **This prototype operates entirely in a synthetic enterprise simulation environment.**  
> It does **not** monitor, access, modify, or control real endpoints, active directories, firewalls, EDRs, SIEMs, or live corporate infrastructure. All network sessions, command executions, credentials, and response outcomes are modeled deterministically for cybersecurity decision-support, training, and research.

---

## 7. Tech Stack

- **Framework**: [React 19](https://react.dev/), [TanStack Start](https://tanstack.com/start), [TanStack Router](https://tanstack.com/router)
- **State & Data**: [TanStack Query](https://tanstack.com/query), React Context Architecture
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing, zero `any`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), Radix UI Primitives, Lucide Icons
- **Build & Server**: [Vite 8](https://vitejs.dev/), [Nitro SSR](https://nitro.unjs.io/)
- **Testing**: Deterministic verification suites via `tsx`

---

## 8. How to Install

```bash
# Clone the repository
git clone https://github.com/saniyakausar089-collab/rewind-insight.git
cd rewind-insight

# Install dependencies
npm install
```

---

## 9. How to Run Locally

```bash
# Start development server
npm run dev
```

Open your browser to `http://localhost:8080`.

---

## 10. How to Build

```bash
# Run production build (compiles client bundle + Cloudflare/Nitro SSR worker)
npm run build
```

---

## 11. How to Test

Run the full suite of automated deterministic test runners:

```bash
# Phase 1: Simulation Engine & Timeline
npx tsx src/test-simulation.ts

# Phase 2: Temporal Digital Twin & Forensic State
npx tsx src/test-digital-twin.ts

# Phase 3: Attack Graph & Blast Radius
npx tsx src/test-attack-graph.ts

# Phase 4: Counterfactual Simulation Lab
npx tsx src/test-counterfactual.ts

# Phase 5: IRIS Investigation Engine
npx tsx src/test-iris.ts

# Phase 5 Extension: Response Intelligence & Candidate Evaluation
npx tsx src/test-response-intelligence.ts

# Phase 6: Incident Resolution Report & Learning System (Tests A - AH)
npx tsx src/test-incident-report.ts
```

**Total Test Coverage**: **233 / 233 automated tests passing** across all phases.

---

## 12. Complete Demo Workflow

Experience the full hackathon demonstration scenario:

1. **Dashboard** (`/dashboard`): Observe active critical incident **INC-2048** (Credential Compromise & Lateral Movement).
2. **Time Machine** (`/time-machine`):
   - Scrub the timeline to **10:18** to watch the attacker traverse from `LAPTOP-042` to `SERVER-03` and query customer database `DB-PROD-01`.
   - Click **REWIND** to return to **10:04** (T+22m).
   - Notice: At 10:04, the employee account and laptop are compromised, but internal servers, databases, and file repositories are **healthy and untouched**.
3. **Attack Graph** (`/attack-graph`): Inspect the projected attack path and observe the single hop separating the attacker from the corporate database.
4. **Simulation Lab** (`/simulation-lab`):
   - Select **Option A — Isolate Endpoint** on `LAPTOP-042`.
   - Run simulation: Notice the lateral edge is severed, preventing 3 downstream attack stages and reducing risk from `CRITICAL` to `MEDIUM`.
5. **IRIS Copilot** (`/iris`):
   - Ask: *"What happened?"*
   - Ask: *"What was the detection gap?"* (Explains the 37-minute delay from 09:47 to 10:24).
   - Ask: *"What should we do now?"* (Evaluates candidates and recommends isolating `LAPTOP-042`).
6. **Incident Resolution Report** (`/reports`):
   - Click **Generate Report** to review executive summaries, detection gaps, attack paths, counterfactual outcomes, and evidence ledgers.
   - Click **Finalize Report** to lock the report snapshot.
   - Click **Print Report** for browser print / Save as PDF.
7. **Post-Incident Learning Dashboard** (`/learning`):
   - Inspect the 37-minute latency gap visualization.
   - Review 6 grounded lessons learned and 6 actionable recommendations.
   - Manage post-incident action items with interactive status tracking (`OPEN` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `COMPLETED`).
8. **Return to Time Machine**:
   - Scrub back to 10:04 and 10:24 to confirm that baseline historical reality remained completely untouched.

---

## 13. Current Limitations

- **In-Memory State**: Incident states, report snapshots, and action item edits persist in memory for the duration of the session; browser page reloads restore deterministic defaults.
- **Pre-Configured Scenario**: INC-2048 represents a high-fidelity synthetic scenario tailored for deterministic demonstration and verification.
- **Simulated Remediation**: Response actions are executed against the synthetic model rather than real API endpoints.

---

## 14. Future Real-World Roadmap (Phase 7+)

- [ ] **Live Telemetry Connectors**: Read-only ingestion connectors for Okta System Log, CrowdStrike FDR, and AWS CloudTrail.
- [ ] **Production Graph Database**: Neo4j / AWS Neptune integration for enterprise-scale identity and network topology.
- [ ] **Enterprise Ticketing Sync**: Two-way synchronization between post-incident action items and Jira / ServiceNow SecOps.
- [ ] **Multi-Tenancy & Persistence**: Encrypted PostgreSQL persistence for SOC report archives and compliance audits.

---

## License

MIT License. Developed for the Incident Response Cybersecurity Hackathon.

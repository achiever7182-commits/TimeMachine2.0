# Time Rewind Security

BUILD: INCIDENT TIME MACHINE

Build a polished, hackathon-ready cybersecurity platform called Incident Time Machine.

1. PRODUCT CONCEPT

Incident Time Machine is an AI-powered incident-response platform for security teams.

Its unique concept:

Rewind a cyber incident, reconstruct what happened, simulate different response decisions, and show what would have happened under each decision before the security team takes action.

The platform should NOT feel like a generic SIEM dashboard.

The main experience should feel like:

Detect → Reconstruct → Rewind → Simulate → Compare → Approve → Respond → Learn

The entire application should initially work with synthetic/demo security data. Do not connect to or execute actions against real infrastructure.

⸻

2. DESIGN DIRECTION

Create a futuristic but professional SOC interface.

Visual style

* Dark cybersecurity command-center aesthetic
* Premium SaaS quality
* Glassmorphism used moderately
* Deep navy/black background
* Subtle gradients
* Neon cyan, blue, purple and green accents
* Red/orange only for threats and warnings
* High contrast
* Clean typography
* Rounded cards
* Soft shadows
* Thin glowing borders
* Smooth micro-animations
* Avoid excessive decoration
* Avoid looking like a gaming UI

The interface should look like something a serious cybersecurity company could present to investors or judges.

Typography

Use a modern font such as:

* Inter
* Geist
* or another clean modern sans-serif

Use monospace typography only for:

* IP addresses
* timestamps
* hashes
* log entries
* technical identifiers

⸻

3. APPLICATION STRUCTURE

Create the following main navigation:

Dashboard
Incidents
Incident Time Machine
Attack Graph
Simulation Lab
Evidence
Response Center
Reports
Settings

The primary navigation should remain visible on desktop.

On mobile/tablet, collapse it into a responsive sidebar/menu.

⸻

4. DASHBOARD

Create a SOC-style dashboard.

Header:

Good evening, Security Team
Incident Time Machine

Top-right:

* Search
* Notifications
* System status
* User profile

KPI cards

Display:

Active Incidents
3
Critical Incidents
1
Endpoints Monitored
248
Average Response Time
6m 42s

Each card should have:

* icon
* number
* trend
* small contextual description

⸻

Risk Overview

Create a large visualization showing:

Current Organizational Risk
HIGH

Use a visually impressive risk meter.

Below it:

Threat Activity
Normal → Elevated → High → Critical

⸻

5. ACTIVE INCIDENTS

Create an incident table/card layout.

Example incidents:

INC-2048

Credential Compromise
CRITICAL
Detected 12 minutes ago
Employee Account: alex.m
Affected assets: 4

INC-2047

Suspicious PowerShell Activity
HIGH
Detected 31 minutes ago
Affected assets: 2

INC-2046

Unusual Cloud Login
MEDIUM
Detected 1 hour ago
Affected assets: 1

Each incident has:

Open Investigation →

⸻

6. MAIN FEATURE — INCIDENT TIME MACHINE

This is the most important page in the entire application.

Make this page visually impressive.

Header:

INCIDENT TIME MACHINE
INC-2048
Credential Compromise

Status:

CRITICAL

Description:

Reconstruct the incident timeline and explore alternate response decisions.

⸻

7. INCIDENT TIMELINE

Create a large horizontal interactive timeline.

Example:

09:42
First abnormal event
        ↓
09:47
First detectable opportunity
        ↓
10:00
Account compromised
        ↓
10:07
Internal server accessed
        ↓
10:12
Database accessed
        ↓
10:18
Sensitive files accessed
        ↓
10:24
Incident detected

Allow the user to drag a timeline slider.

When the slider moves:

* update the current incident state
* highlight events that have happened
* show affected assets at that moment
* update attack graph
* update risk level

Add a prominent button:

⏪ REWIND INCIDENT

When clicked, animate the timeline backwards.

⸻

8. “WHAT HAPPENED?” PANEL

Display an AI-generated explanation.

Example:

AI INCIDENT SUMMARY
An employee account was compromised through
an unusual authentication event.
The attacker then accessed an internal endpoint,
performed lateral movement and attempted to access
a sensitive database.
The earliest detectable opportunity occurred
28 minutes before the incident was formally detected.

Use a typewriter animation when the explanation first appears.

⸻

9. ATTACK GRAPH

Create an interactive attack-path visualization.

Example:

Attacker
   ↓
Compromised Account
   ↓
Employee Laptop
   ↓
Internal Server
   ↓
Database
   ↓
Sensitive Files

Each node should have:

* icon
* asset name
* status
* risk
* timestamp

Connections should visually indicate movement.

Clicking a node opens an information panel.

Example:

EMPLOYEE LAPTOP
Hostname:
LAPTOP-042
Status:
Compromised
First observed:
10:00
Current risk:
HIGH
Related events:
7

⸻

10. BLAST RADIUS

Create a dedicated panel showing:

Potential Blast Radius

Visualize:

1 compromised account
        ↓
2 endpoints
        ↓
1 internal server
        ↓
1 database
        ↓
37 potentially exposed files

Use connected nodes rather than only numbers.

Add:

Estimated Exposure
37 assets
Confirmed Compromise
4 assets

Clearly distinguish between confirmed and potential impact.

⸻

11. COUNTERFACTUAL SIMULATION

This is the core innovation.

Create a page/panel called:

SIMULATION LAB

Subtitle:

What would have happened if we had taken a different action?

Create three simulation cards.

⸻

OPTION A — DO NOTHING

Timeline:

10:04
Compromised laptop
10:07
Server accessed
10:12
Database accessed
10:18
Sensitive files accessed

Result:

Risk: CRITICAL
Potential exposure: HIGH
Business impact: UNKNOWN

⸻

OPTION B — DISABLE ACCOUNT

Timeline:

10:04
Account disabled
10:05
Attacker loses authentication
10:07
Attack path interrupted

Result:

Risk reduction: 92%
Business impact: LOW
Attack progression: STOPPED

⸻

OPTION C — ISOLATE ENDPOINT

Timeline:

10:04
Laptop isolated
10:05
Network access removed
10:06
Lateral movement blocked

Result:

Risk reduction: 84%
Business impact: LOW
Attack progression: STOPPED

⸻

12. SIMULATION ANIMATION

When the user clicks:

SIMULATE

animate the attack graph.

The attacker path should move through the graph.

Then show the selected response interrupting the attack.

Example:

Attacker
   ↓
Account
   ↓
Laptop
   ✕
Server
   ↓
Database

The attack should visibly stop at the containment point.

⸻

13. RESPONSE COMPARISON

Create a comparison table.

Columns:

Action
Risk Reduction
Business Impact
Attack Progression
Evidence Preserved

Rows:

Do Nothing
Disable Account
Isolate Endpoint
Revoke Sessions

Do NOT make the system blindly execute anything.

Instead show:

AI ANALYSIS
The simulation indicates that this action
interrupts the attack path while limiting
business disruption.
[ REVIEW RESPONSE ]

⸻

14. HUMAN APPROVAL

Create a confirmation screen.

Title:

RESPONSE PLAN READY

Show:

1. Revoke active sessions
2. Disable compromised account
3. Isolate affected endpoint
4. Preserve forensic evidence
5. Rotate credentials

For each action:

* checkbox
* explanation
* expected effect
* risk
* business impact

At the bottom:

[ APPROVE RESPONSE PLAN ]

Also provide:

[ MODIFY PLAN ]

The UI must clearly communicate that the AI recommends actions but a human approves them.

For the hackathon demo, approval should trigger only a simulated response, never a real-world security action.

⸻

15. RESPONSE EXECUTION

After approval, show an animated execution sequence.

Example:

✓ Revoking sessions
✓ Disabling compromised account
✓ Isolating simulated endpoint
✓ Preserving forensic evidence
✓ Rotating simulated credentials

Use animated progress indicators.

Then show:

INCIDENT CONTAINED

with a large shield/checkmark animation.

⸻

16. FINAL INCIDENT REPORT

Generate a beautiful report view.

Header:

INCIDENT RESOLUTION REPORT
INC-2048
Credential Compromise

Sections:

Incident Summary

What happened.

Attack Timeline

Chronological timeline.

Attack Path

Visual graph.

Blast Radius

Affected and potentially affected assets.

Response Taken

Actions approved.

Counterfactual Analysis

Show:

If response had occurred at 09:47:
Potential exposure significantly reduced.
Actual detection:
10:24

Lessons Learned

Example:

1. Improve authentication anomaly detection
2. Reduce account privilege
3. Improve endpoint isolation workflow
4. Alert earlier on unusual login behavior

⸻

17. “SHOW ME WHAT WE MISSED”

Add a large special button on the incident page:

✨ SHOW ME WHAT WE MISSED

When clicked, the AI analyzes the timeline.

Display:

EARLIEST DETECTABLE OPPORTUNITY
09:47
28 minutes before formal detection.
Signal:
Unusual login + unfamiliar IP + abnormal
authentication pattern.

Then show:

MISSED SIGNALS
✓ Unusual login location
✓ Multiple failed authentication attempts
✓ Abnormal session duration
✓ Unexpected server access

This should be one of the most visually impressive parts of the application.

⸻

18. AI COPILOT

Add a collapsible AI assistant on the right side.

Name:

IRIS
Incident Response Intelligence System

Users can ask:

"What happened?"
"Where did the attack start?"
"What assets are affected?"
"What should we investigate next?"
"Show me the earliest detection opportunity."
"What happens if we isolate the endpoint?"
"Generate an incident report."

Use realistic predefined responses for the demo.

The UI should make it clear that these are simulated/demo responses if no real LLM backend is connected.

⸻

19. EVIDENCE VIEWER

Create a security evidence page.

Display synthetic:

* authentication logs
* endpoint events
* network events
* cloud events
* process activity

Example:

10:03:42
AUTH
alex.m
LOGIN_SUCCESS
IP: 185.xxx.xxx.xxx
10:04:17
ENDPOINT
powershell.exe
SUSPICIOUS_EXECUTION
10:07:31
NETWORK
LAPTOP-042 → SERVER-03
CONNECTION

Add:

Search
Filter
Event Type
Severity
Time Range

⸻

20. INCIDENT DATA MODEL

Use mock data initially.

Create realistic structured objects for:

Incident
Event
Asset
User
AttackNode
Simulation
ResponseAction
Evidence
TimelineEvent

Example:

{
  id: "INC-2048",
  title: "Credential Compromise",
  severity: "CRITICAL",
  detectedAt: "10:24",
  affectedAssets: 4,
  status: "INVESTIGATING"
}

Keep the architecture modular so a real backend/API can be connected later.

⸻

21. TECHNICAL REQUIREMENTS

Use:

* React
* TypeScript
* Tailwind CSS
* modern component architecture
* responsive design
* reusable components
* clean state management
* charts/graphs where appropriate
* mock API/service layer
* modular data structures

Use a graph visualization library if appropriate.

Use smooth transitions and animations but keep performance good.

⸻

22. RESPONSIVE DESIGN

Desktop is the primary target.

Also support:

* tablet
* mobile

On smaller screens:

* sidebar becomes drawer
* timeline becomes horizontally scrollable
* simulation cards stack vertically
* attack graph remains usable
* AI copilot becomes a bottom sheet

⸻

23. IMPORTANT DEMO FLOW

The entire application must support this exact hackathon demo:

1. Open Dashboard
2. Show active critical incident
3. Open Incident
4. Show attack timeline
5. Show attack graph
6. Click "REWIND INCIDENT"
7. Move timeline back to 09:47
8. Click "SHOW ME WHAT WE MISSED"
9. Show earliest detection opportunity
10. Open Simulation Lab
11. Compare:
    - Do Nothing
    - Disable Account
    - Isolate Endpoint
12. Click SIMULATE
13. Animate attack progression
14. Show response interrupting attack
15. Review response plan
16. Human approves simulated response
17. Show containment animation
18. Generate final incident report

This flow should feel cinematic and extremely smooth.

⸻

24. LANDING PAGE

Create a separate landing page.

Hero:

INCIDENT TIME MACHINE
Don't just respond to an attack.
Rewind it.
Understand it.
Simulate it.
Stop it.

Subheading:

AI-powered incident response that reconstructs cyber incidents and explores counterfactual response scenarios before action is taken.

Buttons:

[ ENTER SECURITY CENTER ]
[ WATCH DEMO ]

Below hero:

RECONSTRUCT
Understand exactly what happened.
REWIND
Travel back to any point in the incident.
SIMULATE
Test different response decisions.
RESPOND
Approve the safest response plan.

⸻

25. LANDING PAGE VISUAL

Create a central animated visualization:

ATTACK
   ↓
RECONSTRUCT
   ↓
REWIND
   ↓
SIMULATE
   ↓
RESPOND

Use glowing nodes connected by animated lines.

⸻

26. SETTINGS

Include:

Organization
Users
Notifications
AI Settings
Simulation Settings
Security
Appearance

Add:

Demo Mode: ON

Since this hackathon version uses synthetic incidents.

⸻

27. DEMO MODE

Add a global:

DEMO MODE

indicator.

Create a button:

▶ START ATTACK SIMULATION

When clicked:

Normal
↓
Suspicious Login
↓
Account Compromised
↓
Endpoint Compromised
↓
Lateral Movement
↓
Database Access
↓
Incident Detected

The dashboard should update live.

This allows judges to see the system react in real time.

⸻

28. EMPTY STATES

Create polished empty states.

Example:

No active incidents
Your environment is currently quiet.

Use professional cybersecurity illustrations/icons.

⸻

29. ERROR STATES

Create friendly error handling.

Never show raw stack traces to users.

Example:

Something went wrong while loading
the incident timeline.
[ TRY AGAIN ]

⸻

30. SECURITY / SAFETY

This application is a cybersecurity simulation and decision-support platform.

Do not implement real-world destructive security actions.

Do not include functionality for:

* attacking external systems
* credential theft
* malware deployment
* unauthorized access
* real account disabling
* real endpoint destruction
* real network blocking

All attack data and response actions should be simulated.

Structure the code so real integrations could theoretically be added later behind authenticated, authorized APIs and explicit human approval.

⸻

31. CODE QUALITY

Do not create one huge component.

Use a clean structure such as:

src/
  components/
    dashboard/
    incidents/
    timeline/
    attack-graph/
    simulation/
    evidence/
    response/
    ai-copilot/
    reports/
  pages/
    Dashboard
    Incidents
    IncidentDetails
    TimeMachine
    SimulationLab
    Evidence
    ResponseCenter
    Reports
    Settings
  data/
    incidents
    events
    simulations
    assets
  services/
    incidentService
    simulationService
    aiService
  types/
    incident
    event
    asset
    simulation
  hooks/
  utils/

⸻

32. FINAL QUALITY BAR

The finished application should feel like a real startup product, not a student CRUD project.

Prioritize:

1. Exceptional visual design
2. Smooth interaction
3. Clear storytelling
4. The Incident Time Machine concept
5. Counterfactual simulation
6. Attack graph visualization
7. Timeline rewind
8. Human approval workflow
9. Strong hackathon demo
10. Responsive UI

Do not fill the interface with unnecessary charts.

Every visualization should communicate something useful.

The judge should understand the concept within 30 seconds.

The most important message throughout the product should be:

“We don’t just tell security teams what happened. We let them rewind the incident and explore what would have happened if they had responded differently.”

Build the complete frontend and working simulated demo flow now, using realistic synthetic cybersecurity data.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://rewind-insight.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/162ac2e0-c3db-49e0-bf57-f2828af3b4cb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

# Incident Time Machine

## Build
- Create a responsive dark security-center shell with desktop navigation, mobile drawer, demo-mode status, search, alerts, and IRIS assistant.
- Add dedicated pages for the landing experience, dashboard, incidents, time machine, attack graph, simulation lab, evidence, response center, reports, and settings.
- Model realistic synthetic incidents, timeline events, attack nodes, evidence, simulations, and response actions in reusable typed data modules.
- Implement the complete demo journey: live attack simulation, incident selection, draggable rewind timeline, missed-signal reveal, attack-path exploration, counterfactual comparison, simulated human approval, containment sequence, and final report.
- Use semantic design tokens, restrained command-center visuals, purposeful motion, responsive layouts, accessible controls, and clear demo-only safety labeling.

## Technical details
- Keep all behavior frontend-only with simulated data and no real infrastructure actions.
- Use TanStack routes for every major destination and shared React state for the cross-page demo journey.
- Verify the key desktop and mobile journeys in the running preview, including all interactive state transitions.

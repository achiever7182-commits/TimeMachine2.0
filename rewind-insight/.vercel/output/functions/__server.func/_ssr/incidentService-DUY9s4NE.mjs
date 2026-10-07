import { m as getIncidentStateAtTime } from "./DemoContext-DI0dcfwA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/incidentService-DUY9s4NE.js
/**
* Calculates dashboard metrics and status based on current reconstructed incident state or simulation minute.
*/
function getDashboardSnapshot(minuteOrState) {
	const state = typeof minuteOrState === "number" ? getIncidentStateAtTime(minuteOrState) : minuteOrState;
	const isCritical = state.risk === "CRITICAL";
	const isElevated = state.risk === "HIGH" || state.risk === "MEDIUM";
	return {
		stage: {
			NORMAL: "Normal Operations",
			ATTACK_STARTED: "Initial Reconnaissance",
			SUSPICIOUS_ACTIVITY: "Suspicious Authentication",
			ACCOUNT_COMPROMISED: "Account Compromised",
			LATERAL_MOVEMENT: "Lateral Movement",
			DATA_ACCESS: "Database & File Access",
			INCIDENT_DETECTED: "Incident Formally Detected",
			INVESTIGATING: "Active Investigation",
			CONTAINED: "Simulated Containment",
			RESOLVED: "Incident Resolved"
		}[state.stage] ?? state.stage,
		rawStage: state.stage,
		risk: state.risk,
		currentTime: state.timestamp,
		compromisedAssetsCount: state.compromisedAssetIds.length,
		kpis: [
			{
				label: "Active Incidents",
				value: state.stage === "NORMAL" ? "2" : "3",
				trend: state.stage === "NORMAL" ? "Standard baseline" : "+1 in demo (INC-2048)",
				description: "Open investigations"
			},
			{
				label: "Critical Incidents",
				value: isCritical ? "1" : "0",
				trend: isCritical ? "Escalated to Critical" : isElevated ? "Elevated / Monitoring" : "Nominal",
				description: "Requires containment approval"
			},
			{
				label: "Endpoints Monitored",
				value: "248",
				trend: "100% coverage",
				description: "EDR telemetry live"
			},
			{
				label: "Average Response Time",
				value: "6m 42s",
				trend: "18% faster",
				description: "Simulated mean time"
			}
		]
	};
}
function getAttackNodesForMinute(minute) {
	return getIncidentStateAtTime(minute).activeAttackNodes;
}
//#endregion
export { getDashboardSnapshot as n, getAttackNodesForMinute as t };

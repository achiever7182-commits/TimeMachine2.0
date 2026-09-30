import { a as demoMissedSignals, i as demoIncident, o as demoResponseActions } from "./DemoContext-DI0dcfwA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/incidents-Dy2WfHLh.js
var incidents = [
	demoIncident,
	{
		id: "INC-2047",
		title: "Suspicious PowerShell Activity",
		severity: "HIGH",
		status: "INVESTIGATING",
		organizationId: "ORG-ACME",
		detectedAt: "10:05",
		createdAt: "2026-09-29T10:05:00Z",
		currentSimulationTime: "10:05",
		startTime: "10:04",
		endTime: "10:05",
		affectedAssetIds: ["LAPTOP-042"],
		eventIds: ["raw-1004-ps"],
		rootCause: "Encoded command execution on finance workstation",
		confidence: .88,
		stage: "ACCOUNT_COMPROMISED",
		detectedAgo: "31 minutes ago",
		affectedAssets: 1,
		summary: "Endpoint automation executed an unusual encoded PowerShell command on a finance workstation."
	},
	{
		id: "INC-2046",
		title: "Unusual Cloud Login",
		severity: "MEDIUM",
		status: "SIMULATED",
		organizationId: "ORG-ACME",
		detectedAt: "09:36",
		createdAt: "2026-09-29T09:36:00Z",
		currentSimulationTime: "09:36",
		startTime: "09:35",
		endTime: "09:36",
		affectedAssetIds: ["VPN-GW-01"],
		eventIds: ["raw-0942-auth"],
		rootCause: "Cloud login originated from an unfamiliar ASN",
		confidence: .75,
		stage: "SUSPICIOUS_ACTIVITY",
		detectedAgo: "1 hour ago",
		affectedAssets: 1,
		summary: "Cloud login originated from an unfamiliar ASN with anomalous session duration."
	}
];
var responseActions = demoResponseActions;
var missedSignals = demoMissedSignals;
//#endregion
export { missedSignals as n, responseActions as r, incidents as t };

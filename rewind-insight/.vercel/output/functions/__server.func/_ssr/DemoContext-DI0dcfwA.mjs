import { r as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/elevenlabs__react+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DemoContext-DI0dcfwA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var demoIncident = {
	id: "INC-2048",
	title: "Credential Compromise",
	description: "A synthetic employee account compromise followed by endpoint access, lateral movement, database access and attempted sensitive file access.",
	severity: "CRITICAL",
	status: "ACTIVE",
	organizationId: "ORG-ACME",
	detectedAt: "10:24",
	createdAt: "2026-09-29T10:24:00Z",
	currentSimulationTime: "09:42",
	startTime: "09:42",
	endTime: "10:24",
	affectedAssetIds: [],
	eventIds: [
		"evt-0942",
		"evt-0944",
		"evt-0947",
		"evt-1000",
		"evt-1004",
		"evt-1007",
		"evt-1012",
		"evt-1018",
		"evt-1024"
	],
	rootCause: "Attacker obtained employee credentials via external spray, logged into corporate VPN, compromised workstation, traversed to application tier, and targeted database and file shares.",
	confidence: .94,
	stage: "NORMAL",
	detectedAgo: "12 minutes ago",
	affectedAssets: 0,
	employeeAccount: "alex.m",
	summary: "A synthetic employee account compromise followed by endpoint access, lateral movement, database access and attempted sensitive file access."
};
var demoTimelineEvents = [
	{
		id: "evt-0942",
		timestamp: "09:42",
		title: "Unusual Authentication",
		description: "Authentication observed from an unfamiliar source location.",
		category: "IDENTITY",
		severity: "MEDIUM",
		eventIds: ["raw-0942-auth"],
		affectedAssetIds: [],
		stage: "SUSPICIOUS_ACTIVITY",
		importance: "MEDIUM",
		time: "09:42",
		minute: 0,
		label: "Unusual Authentication",
		state: "Authentication observed from an unfamiliar source location",
		risk: "Elevated",
		assets: ["alex.m"]
	},
	{
		id: "evt-0944",
		timestamp: "09:44",
		title: "Multiple Failed Authentication Attempts",
		description: "Several failed authentication attempts were followed by a successful login.",
		category: "IDENTITY",
		severity: "MEDIUM",
		eventIds: [
			"raw-0944-failed-1",
			"raw-0944-failed-2",
			"raw-0944-success"
		],
		affectedAssetIds: [],
		stage: "SUSPICIOUS_ACTIVITY",
		importance: "MEDIUM",
		time: "09:44",
		minute: 2,
		label: "Multiple Failed Logins",
		state: "Multiple failed authentication attempts followed by successful login",
		risk: "Elevated",
		assets: ["alex.m"]
	},
	{
		id: "evt-0947",
		timestamp: "09:47",
		title: "First Detectable Opportunity",
		description: "The combination of unfamiliar source, repeated failures and unusual login behavior creates the first meaningful detection opportunity.",
		category: "DETECTION_OPPORTUNITY",
		severity: "HIGH",
		eventIds: ["raw-0947-signal"],
		affectedAssetIds: [],
		stage: "SUSPICIOUS_ACTIVITY",
		importance: "HIGH",
		time: "09:47",
		minute: 5,
		label: "First detectable opportunity",
		state: "Unusual login + unfamiliar IP + abnormal authentication pattern",
		risk: "Elevated",
		assets: ["alex.m"],
		signal: "Unusual login + unfamiliar IP + abnormal authentication pattern"
	},
	{
		id: "evt-1000",
		timestamp: "10:00",
		title: "Employee Account Compromised",
		description: "The synthetic account alex.m is considered compromised.",
		category: "IDENTITY",
		severity: "CRITICAL",
		eventIds: ["raw-1000-session"],
		affectedAssetIds: ["LAPTOP-042"],
		stage: "ACCOUNT_COMPROMISED",
		importance: "CRITICAL",
		time: "10:00",
		minute: 18,
		label: "Employee Account Compromised",
		state: "Attacker establishes confirmed session as alex.m on workstation",
		risk: "High",
		assets: ["alex.m", "LAPTOP-042"]
	},
	{
		id: "evt-1004",
		timestamp: "10:04",
		title: "Suspicious PowerShell Activity",
		description: "An unusual PowerShell process executes on LAPTOP-042.",
		category: "ENDPOINT",
		severity: "HIGH",
		eventIds: ["raw-1004-ps"],
		affectedAssetIds: ["LAPTOP-042"],
		stage: "ACCOUNT_COMPROMISED",
		importance: "HIGH",
		time: "10:04",
		minute: 22,
		label: "Suspicious PowerShell Activity",
		state: "Unusual encoded PowerShell script execution on LAPTOP-042",
		risk: "High",
		assets: ["alex.m", "LAPTOP-042"]
	},
	{
		id: "evt-1007",
		timestamp: "10:07",
		title: "Internal Server Access",
		description: "LAPTOP-042 establishes an authenticated connection to SERVER-03.",
		category: "LATERAL_MOVEMENT",
		severity: "HIGH",
		eventIds: ["raw-1007-smb"],
		affectedAssetIds: ["LAPTOP-042", "SERVER-03"],
		stage: "LATERAL_MOVEMENT",
		importance: "HIGH",
		time: "10:07",
		minute: 25,
		label: "Internal Server Access",
		state: "Lateral movement from LAPTOP-042 to SERVER-03",
		risk: "High",
		assets: [
			"alex.m",
			"LAPTOP-042",
			"SERVER-03"
		]
	},
	{
		id: "evt-1012",
		timestamp: "10:12",
		title: "Database Access",
		description: "SERVER-03 accesses DB-PROD-01.",
		category: "DATA_ACCESS",
		severity: "CRITICAL",
		eventIds: ["raw-1012-db"],
		affectedAssetIds: [
			"LAPTOP-042",
			"SERVER-03",
			"DB-PROD-01"
		],
		stage: "DATA_ACCESS",
		importance: "CRITICAL",
		time: "10:12",
		minute: 30,
		label: "Database Access",
		state: "Privileged query attempts reach DB-PROD-01",
		risk: "Critical",
		assets: [
			"alex.m",
			"LAPTOP-042",
			"SERVER-03",
			"DB-PROD-01"
		]
	},
	{
		id: "evt-1018",
		timestamp: "10:18",
		title: "Sensitive File Access Attempt",
		description: "The attacker attempts to access sensitive files.",
		category: "DATA_ACCESS",
		severity: "CRITICAL",
		eventIds: ["raw-1018-share"],
		affectedAssetIds: [
			"LAPTOP-042",
			"SERVER-03",
			"DB-PROD-01",
			"FILE-SRV-01"
		],
		stage: "DATA_ACCESS",
		importance: "CRITICAL",
		time: "10:18",
		minute: 36,
		label: "Sensitive File Access Attempt",
		state: "Attacker attempts access to 37 files on corporate repository FILE-SRV-01",
		risk: "Critical",
		assets: [
			"alex.m",
			"LAPTOP-042",
			"SERVER-03",
			"DB-PROD-01",
			"FILE-SRV-01"
		]
	},
	{
		id: "evt-1024",
		timestamp: "10:24",
		title: "Incident Detected",
		description: "The security system correlates multiple suspicious events and declares INC-2048.",
		category: "INCIDENT_ALERT",
		severity: "CRITICAL",
		eventIds: ["raw-1024-alert"],
		affectedAssetIds: [
			"LAPTOP-042",
			"SERVER-03",
			"DB-PROD-01",
			"FILE-SRV-01"
		],
		stage: "INCIDENT_DETECTED",
		importance: "CRITICAL",
		time: "10:24",
		minute: 42,
		label: "Incident Detected",
		state: "Correlation rule escalates multi-stage attack and declares INC-2048",
		risk: "Critical",
		assets: [
			"alex.m",
			"LAPTOP-042",
			"SERVER-03",
			"DB-PROD-01",
			"FILE-SRV-01"
		]
	}
];
var demoAttackNodes = [
	{
		id: "ATTACKER",
		entityId: "ext-attacker-ip",
		entityType: "EXTERNAL_THREAT",
		label: "Attacker (185.220.101.5)",
		status: "Suspicious",
		firstCompromisedAt: "09:42",
		lastObservedAt: "10:24",
		icon: "radar",
		risk: "High",
		timestamp: "09:42",
		hostname: "External IP (AS9009)",
		relatedEvents: 4,
		activateAt: 0
	},
	{
		id: "ALEX_ACCOUNT",
		entityId: "usr-alex-m",
		entityType: "USER",
		label: "alex.m (Compromised User)",
		status: "Compromised",
		firstCompromisedAt: "10:00",
		lastObservedAt: "10:24",
		icon: "user",
		hostname: "alex.m",
		risk: "High",
		timestamp: "10:00",
		relatedEvents: 9,
		activateAt: 18
	},
	{
		id: "LAPTOP-042",
		entityId: "LAPTOP-042",
		entityType: "ENDPOINT",
		label: "LAPTOP-042 (Finance Laptop)",
		status: "Compromised",
		firstCompromisedAt: "10:00",
		lastObservedAt: "10:24",
		icon: "laptop",
		hostname: "LAPTOP-042",
		risk: "High",
		timestamp: "10:00",
		relatedEvents: 7,
		activateAt: 18
	},
	{
		id: "SERVER-03",
		entityId: "SERVER-03",
		entityType: "SERVER",
		label: "SERVER-03 (Internal App Server)",
		status: "Compromised",
		firstCompromisedAt: "10:07",
		lastObservedAt: "10:24",
		icon: "server",
		hostname: "SERVER-03",
		risk: "High",
		timestamp: "10:07",
		relatedEvents: 5,
		activateAt: 25
	},
	{
		id: "DB-PROD-01",
		entityId: "DB-PROD-01",
		entityType: "DATABASE",
		label: "DB-PROD-01 (Customer DB)",
		status: "Compromised",
		firstCompromisedAt: "10:12",
		lastObservedAt: "10:24",
		icon: "database",
		hostname: "DB-PROD-01",
		risk: "Critical",
		timestamp: "10:12",
		relatedEvents: 4,
		activateAt: 30
	},
	{
		id: "FILE-SRV-01",
		entityId: "FILE-SRV-01",
		entityType: "FILE_STORE",
		label: "FILE-SRV-01 (Sensitive File Share)",
		status: "Potential",
		firstCompromisedAt: "10:18",
		lastObservedAt: "10:24",
		icon: "files",
		hostname: "FILE-SRV-01",
		risk: "Critical",
		timestamp: "10:18",
		relatedEvents: 37,
		activateAt: 36
	}
];
var demoAttackEdges = [
	{
		id: "edge-1",
		sourceNodeId: "ATTACKER",
		targetNodeId: "ALEX_ACCOUNT",
		timestamp: "09:42",
		relationship: "CREDENTIAL_THEFT",
		eventIds: ["raw-0942-auth", "raw-0944-success"],
		confidence: .95
	},
	{
		id: "edge-2",
		sourceNodeId: "ALEX_ACCOUNT",
		targetNodeId: "LAPTOP-042",
		timestamp: "10:00",
		relationship: "AUTHENTICATED_SESSION",
		eventIds: ["raw-1000-session"],
		confidence: .98
	},
	{
		id: "edge-3",
		sourceNodeId: "LAPTOP-042",
		targetNodeId: "SERVER-03",
		timestamp: "10:07",
		relationship: "LATERAL_MOVEMENT",
		eventIds: ["raw-1004-ps", "raw-1007-smb"],
		confidence: .92
	},
	{
		id: "edge-4",
		sourceNodeId: "SERVER-03",
		targetNodeId: "DB-PROD-01",
		timestamp: "10:12",
		relationship: "DATABASE_CONNECTION",
		eventIds: ["raw-1012-db"],
		confidence: .96
	},
	{
		id: "edge-5",
		sourceNodeId: "DB-PROD-01",
		targetNodeId: "FILE-SRV-01",
		timestamp: "10:18",
		relationship: "FILE_ACCESS_ATTEMPT",
		eventIds: ["raw-1018-share"],
		confidence: .89
	}
];
var demoEvidence = [
	{
		id: "ev-1",
		timestamp: "09:47:08",
		type: "AUTH",
		source: "IdP-Okta",
		title: "Anomalous Login Pattern",
		content: "Unfamiliar IP 185.220.101.5 targeting alex.m followed by rapid authentication attempts.",
		severity: "HIGH",
		eventId: "raw-0947-signal",
		assetId: "VPN-GW-01",
		hash: "sha256:d8a57e3f...44b1",
		time: "09:47:08",
		actor: "alex.m",
		action: "LOGIN_ANOMALY",
		target: "Identity Provider",
		detail: "Unfamiliar IP 185.220.101.5 with abnormal authentication pattern."
	},
	{
		id: "ev-2",
		timestamp: "10:00:11",
		type: "AUTH",
		source: "Cloud-Portal",
		title: "Session Established on Endpoint",
		content: "Successful interactive session opened on LAPTOP-042 after credential challenge.",
		severity: "CRITICAL",
		eventId: "raw-1000-session",
		assetId: "LAPTOP-042",
		hash: "sha256:4b22c9a1...fa90",
		time: "10:00:11",
		actor: "alex.m",
		action: "LOGIN_SUCCESS",
		target: "LAPTOP-042",
		detail: "Successful workstation session initiated from foreign IP gateway."
	},
	{
		id: "ev-3",
		timestamp: "10:04:17",
		type: "ENDPOINT",
		source: "EDR-CrowdStrike",
		title: "Encoded PowerShell Process",
		content: "Base64-encoded PowerShell child process created under explorer.exe on LAPTOP-042.",
		severity: "HIGH",
		eventId: "raw-1004-ps",
		assetId: "LAPTOP-042",
		hash: "sha256:7f13c6b2...8831",
		time: "10:04:17",
		actor: "powershell.exe",
		action: "SUSPICIOUS_EXECUTION",
		target: "LAPTOP-042",
		detail: "Encoded PowerShell launched from user session to execute reconnaissance scripts."
	},
	{
		id: "ev-4",
		timestamp: "10:07:31",
		type: "NETWORK",
		source: "Zeek-Flow",
		title: "Lateral Movement to Application Tier",
		content: "Unusual internal RPC / SMB connection from workstation segment (10.0.4.42) to app tier (10.0.12.3).",
		severity: "HIGH",
		eventId: "raw-1007-smb",
		assetId: "SERVER-03",
		hash: "sha256:22c7104d...e549",
		time: "10:07:31",
		actor: "LAPTOP-042",
		action: "CONNECTION",
		target: "SERVER-03",
		detail: "Unexpected internal connection over administrative port."
	},
	{
		id: "ev-5",
		timestamp: "10:12:09",
		type: "DATABASE",
		source: "PostgreSQL-Audit",
		title: "Privileged Database Query Surge",
		content: "SELECT query on table public.customer_identities from SERVER-03 with 50,000 row batch limit.",
		severity: "CRITICAL",
		eventId: "raw-1012-db",
		assetId: "DB-PROD-01",
		hash: "sha256:66a1e944...287c",
		time: "10:12:09",
		actor: "SERVER-03",
		action: "DATABASE_QUERY",
		target: "DB-PROD-01",
		detail: "Privileged query volume exceeds historical baseline."
	},
	{
		id: "ev-6",
		timestamp: "10:18:42",
		type: "PROCESS",
		source: "FileShare-Monitor",
		title: "Mass File Read & Enumeration",
		content: "Rapid read requests targeting 37 sensitive documents across confidential financial folders.",
		severity: "CRITICAL",
		eventId: "raw-1018-share",
		assetId: "FILE-SRV-01",
		hash: "sha256:99cf384b...bb12",
		time: "10:18:42",
		actor: "archive.exe",
		action: "FILE_COLLECTION",
		target: "FILE-SRV-01",
		detail: "37 sensitive files enumerated by compromised session on FILE-SRV-01."
	}
];
var demoResponseActions = [
	{
		id: "revoke-sessions",
		label: "Revoke active sessions",
		explanation: "Ends every active token for alex.m in the simulated tenant.",
		expectedEffect: "Attacker loses live access immediately.",
		risk: "LOW",
		businessImpact: "Low disruption for one user."
	},
	{
		id: "disable-account",
		label: "Disable compromised account",
		explanation: "Temporarily locks the affected identity pending investigation.",
		expectedEffect: "Stops authentication reuse across cloud and internal apps.",
		risk: "MEDIUM",
		businessImpact: "Employee access pauses until recovery."
	},
	{
		id: "isolate-endpoint",
		label: "Isolate affected endpoint",
		explanation: "Quarantines LAPTOP-042 inside the simulation only.",
		expectedEffect: "Blocks lateral movement while preserving telemetry.",
		risk: "LOW",
		businessImpact: "One workstation loses network access."
	},
	{
		id: "preserve-evidence",
		label: "Preserve forensic evidence",
		explanation: "Freezes volatile evidence, logs, and endpoint snapshots.",
		expectedEffect: "Protects chain-of-custody for the final report.",
		risk: "LOW",
		businessImpact: "No operational interruption."
	},
	{
		id: "rotate-credentials",
		label: "Rotate credentials",
		explanation: "Resets credentials for the affected user and service paths.",
		expectedEffect: "Reduces chance of attacker re-entry.",
		risk: "MEDIUM",
		businessImpact: "Short account recovery workflow."
	}
];
var demoMissedSignals = [
	"Unusual login location",
	"Multiple failed authentication attempts",
	"Abnormal session duration",
	"Unexpected server access"
];
var initialSyntheticConnections = [
	{
		id: "conn-vpn-baseline",
		sourceId: "VPN-GW-01",
		destinationId: "CLOUD-STORAGE-01",
		relationshipType: "INTERNAL_TRAFFIC",
		firstSeen: "08:00",
		lastSeen: "10:24",
		status: "ACTIVE",
		eventIds: [],
		confidence: .99,
		protocol: "HTTPS",
		port: 443
	},
	{
		id: "conn-vpn-laptop",
		sourceId: "VPN-GW-01",
		destinationId: "LAPTOP-042",
		relationshipType: "EXTERNAL_INGRESS",
		firstSeen: "09:44",
		lastSeen: "10:24",
		status: "ACTIVE",
		eventIds: ["raw-0944-success"],
		confidence: .94,
		protocol: "WireGuard/TLS",
		port: 443
	},
	{
		id: "conn-laptop-server",
		sourceId: "LAPTOP-042",
		destinationId: "SERVER-03",
		relationshipType: "LATERAL_MOVEMENT",
		firstSeen: "10:07",
		lastSeen: "10:24",
		status: "ACTIVE",
		eventIds: ["raw-1007-smb"],
		confidence: .93,
		protocol: "SMB/WinRM",
		port: 5985
	},
	{
		id: "conn-server-db",
		sourceId: "SERVER-03",
		destinationId: "DB-PROD-01",
		relationshipType: "DATABASE_QUERY",
		firstSeen: "10:12",
		lastSeen: "10:24",
		status: "ACTIVE",
		eventIds: ["raw-1012-db"],
		confidence: .96,
		protocol: "PostgreSQL",
		port: 5432
	},
	{
		id: "conn-server-file",
		sourceId: "SERVER-03",
		destinationId: "FILE-SRV-01",
		relationshipType: "FILE_ACCESS",
		firstSeen: "10:18",
		lastSeen: "10:24",
		status: "ACTIVE",
		eventIds: ["raw-1018-share"],
		confidence: .95,
		protocol: "SMBv3",
		port: 445
	}
];
var initialSyntheticSessions = [
	{
		id: "SESSION-0944",
		userId: "usr-alex-m",
		username: "alex.m",
		sourceAssetId: "VPN-GW-01",
		destinationAssetId: "LAPTOP-042",
		startedAt: "09:44",
		status: "ACTIVE",
		privilege: "STANDARD",
		authMethod: "MFA-PUSH-FATIGUE"
	},
	{
		id: "SESSION-1000",
		userId: "usr-alex-m",
		username: "alex.m",
		sourceAssetId: "VPN-GW-01",
		destinationAssetId: "LAPTOP-042",
		startedAt: "10:00",
		status: "ACTIVE",
		privilege: "LOCAL_ADMIN",
		authMethod: "INTERACTIVE_DESKTOP"
	},
	{
		id: "SESSION-1007",
		userId: "usr-alex-m",
		username: "alex.m",
		sourceAssetId: "LAPTOP-042",
		destinationAssetId: "SERVER-03",
		startedAt: "10:07",
		status: "ACTIVE",
		privilege: "WINRM_USER",
		authMethod: "KERBEROS_TICKET"
	},
	{
		id: "SESSION-1012",
		userId: "usr-alex-m",
		username: "alex.m",
		sourceAssetId: "SERVER-03",
		destinationAssetId: "DB-PROD-01",
		startedAt: "10:12",
		status: "ACTIVE",
		privilege: "DBA_READ",
		authMethod: "SERVICE_KEY"
	},
	{
		id: "SESSION-1018",
		userId: "usr-alex-m",
		username: "alex.m",
		sourceAssetId: "SERVER-03",
		destinationAssetId: "FILE-SRV-01",
		startedAt: "10:18",
		status: "ACTIVE",
		privilege: "SHARE_READER",
		authMethod: "NTLM_V2"
	}
];
var initialSyntheticProcesses = [
	{
		id: "proc-0944-explorer",
		pid: 4412,
		name: "explorer.exe",
		parentProcess: "userinit.exe",
		assetId: "LAPTOP-042",
		userId: "usr-alex-m",
		timestamp: "09:44",
		status: "BENIGN",
		commandSummary: "C:\\Windows\\explorer.exe",
		evidenceIds: []
	},
	{
		id: "proc-1004-ps",
		pid: 7824,
		name: "powershell.exe",
		parentProcess: "explorer.exe",
		assetId: "LAPTOP-042",
		userId: "usr-alex-m",
		timestamp: "10:04",
		status: "SUSPICIOUS",
		commandSummary: "powershell.exe -enc JABzACAAPQAgAE5ldwAt... [Discovery script]",
		evidenceIds: ["ev-3"]
	},
	{
		id: "proc-1007-winrm",
		pid: 2180,
		name: "wsmprovhost.exe",
		parentProcess: "svchost.exe",
		assetId: "SERVER-03",
		userId: "usr-alex-m",
		timestamp: "10:07",
		status: "SUSPICIOUS",
		commandSummary: "wsmprovhost.exe -Embedding (Inbound WinRM session from 10.0.4.42)",
		evidenceIds: ["ev-4"]
	},
	{
		id: "proc-1012-psql",
		pid: 3904,
		name: "psql.exe",
		parentProcess: "wsmprovhost.exe",
		assetId: "SERVER-03",
		userId: "usr-alex-m",
		timestamp: "10:12",
		status: "MALICIOUS",
		commandSummary: "psql -h 10.0.20.10 -U postgres -d acme_prod -c 'SELECT * FROM customer_identities'",
		evidenceIds: ["ev-5"]
	},
	{
		id: "proc-1018-archive",
		pid: 5120,
		name: "archive.exe",
		parentProcess: "wsmprovhost.exe",
		assetId: "SERVER-03",
		userId: "usr-alex-m",
		timestamp: "10:18",
		status: "MALICIOUS",
		commandSummary: "archive.exe -create --target //FILE-SRV-01/confidential/*.pdf",
		evidenceIds: ["ev-6"]
	}
];
var syntheticDataResources = [
	{
		id: "DATA-CUST-VAULT",
		name: "Customer Identity Vault",
		type: "CUSTOMER_RECORDS",
		classification: "CONFIDENTIAL",
		owner: "Data Operations",
		criticality: "CRITICAL",
		assetId: "DB-PROD-01",
		accessedAt: "10:12",
		accessedBy: "alex.m (via SERVER-03)",
		recordsCount: 5e4,
		isExposed: true
	},
	{
		id: "DATA-PROD-LEDGER",
		name: "Production Financial Ledger",
		type: "DATABASE_TABLE",
		classification: "HIGHLY_SENSITIVE",
		owner: "Finance & Accounting",
		criticality: "CRITICAL",
		assetId: "DB-PROD-01",
		recordsCount: 12e4,
		isExposed: false
	},
	{
		id: "DATA-CONF-FILES",
		name: "Confidential Financial Documents (37 files)",
		type: "FILE_SHARE",
		classification: "RESTRICTED",
		owner: "Corporate Legal & Finance",
		criticality: "CRITICAL",
		assetId: "FILE-SRV-01",
		accessedAt: "10:18",
		accessedBy: "alex.m (via SERVER-03)",
		recordsCount: 37,
		isExposed: true
	},
	{
		id: "DATA-CLOUD-BACKUP",
		name: "Enterprise System Snapshots & S3 Backups",
		type: "CREDENTIAL_VAULT",
		classification: "CONFIDENTIAL",
		owner: "Cloud Engineering",
		criticality: "HIGH",
		assetId: "CLOUD-STORAGE-01",
		recordsCount: 140,
		isExposed: false
	}
];
var demoUsers = [
	{
		id: "usr-alex-m",
		username: "alex.m",
		displayName: "Alex Mitchell",
		department: "Finance",
		role: "Financial Analyst",
		privilegeLevel: "STANDARD",
		status: "ACTIVE",
		associatedAssetIds: ["LAPTOP-042"]
	},
	{
		id: "usr-maya-s",
		username: "maya.s",
		displayName: "Maya Sharma",
		department: "Engineering",
		role: "DevOps Engineer",
		privilegeLevel: "ADMIN",
		status: "ACTIVE",
		associatedAssetIds: ["SERVER-03"]
	},
	{
		id: "usr-daniel-r",
		username: "daniel.r",
		displayName: "Daniel Reed",
		department: "Data Operations",
		role: "Database Administrator",
		privilegeLevel: "ADMIN",
		status: "ACTIVE",
		associatedAssetIds: ["DB-PROD-01"]
	},
	{
		id: "usr-sarah-c",
		username: "sarah.c",
		displayName: "Sarah Chen",
		department: "Security Operations",
		role: "SecOps Lead",
		privilegeLevel: "ADMIN",
		status: "ACTIVE",
		associatedAssetIds: ["VPN-GW-01"]
	},
	{
		id: "usr-admin-svc",
		username: "admin.svc",
		displayName: "Admin Service Account",
		department: "Infrastructure",
		role: "Automated Deployment Service",
		privilegeLevel: "SERVICE",
		status: "ACTIVE",
		associatedAssetIds: ["SERVER-03", "CLOUD-STORAGE-01"]
	}
];
var demoAssets = [
	{
		id: "LAPTOP-042",
		name: "Alex's Workstation",
		type: "ENDPOINT",
		hostname: "LAPTOP-042",
		owner: "alex.m",
		status: "HEALTHY",
		criticality: "MEDIUM",
		department: "Finance",
		ipAddress: "10.0.4.42",
		tags: [
			"workstation",
			"windows-11",
			"edr-active"
		],
		firstSeen: "2026-01-15T08:00:00Z",
		lastSeen: "2026-09-29T10:24:00Z"
	},
	{
		id: "SERVER-03",
		name: "Internal Application Server",
		type: "SERVER",
		hostname: "SERVER-03",
		owner: "Engineering",
		status: "HEALTHY",
		criticality: "HIGH",
		department: "Engineering",
		ipAddress: "10.0.12.3",
		tags: [
			"application-server",
			"linux-rhel",
			"internal"
		],
		firstSeen: "2025-06-10T12:00:00Z",
		lastSeen: "2026-09-29T10:24:00Z"
	},
	{
		id: "DB-PROD-01",
		name: "Production Customer Database",
		type: "DATABASE",
		hostname: "DB-PROD-01",
		owner: "Data Operations",
		status: "HEALTHY",
		criticality: "CRITICAL",
		department: "Data Operations",
		ipAddress: "10.0.20.10",
		tags: [
			"database",
			"postgres",
			"pci-scope",
			"customer-records"
		],
		firstSeen: "2024-11-01T00:00:00Z",
		lastSeen: "2026-09-29T10:24:00Z"
	},
	{
		id: "FILE-SRV-01",
		name: "Corporate File Repository",
		type: "FILE_STORE",
		hostname: "FILE-SRV-01",
		owner: "Corporate Storage",
		status: "HEALTHY",
		criticality: "HIGH",
		department: "IT Services",
		ipAddress: "10.0.30.5",
		tags: [
			"file-share",
			"nas",
			"confidential-docs"
		],
		firstSeen: "2025-01-20T04:00:00Z",
		lastSeen: "2026-09-29T10:24:00Z"
	},
	{
		id: "VPN-GW-01",
		name: "Corporate VPN Gateway",
		type: "NETWORK",
		hostname: "VPN-GW-01",
		owner: "Networking",
		status: "HEALTHY",
		criticality: "CRITICAL",
		department: "Infrastructure",
		ipAddress: "10.0.0.1",
		tags: [
			"vpn",
			"gateway",
			"perimeter"
		],
		firstSeen: "2024-05-12T00:00:00Z",
		lastSeen: "2026-09-29T10:24:00Z"
	},
	{
		id: "CLOUD-STORAGE-01",
		name: "Primary S3 Cloud Bucket",
		type: "CLOUD_RESOURCE",
		hostname: "CLOUD-STORAGE-01",
		owner: "Cloud Ops",
		status: "HEALTHY",
		criticality: "HIGH",
		department: "Infrastructure",
		ipAddress: "10.200.0.15",
		tags: [
			"cloud-bucket",
			"encrypted",
			"backups"
		],
		firstSeen: "2025-03-01T00:00:00Z",
		lastSeen: "2026-09-29T10:24:00Z"
	}
];
/**
* Deterministic calculation of organizational risk based on current incident stage.
* Modular implementation to allow more advanced risk scoring algorithms in future phases.
*/
function calculateRisk(stage) {
	switch (stage) {
		case "NORMAL": return "LOW";
		case "ATTACK_STARTED": return "LOW";
		case "SUSPICIOUS_ACTIVITY": return "MEDIUM";
		case "ACCOUNT_COMPROMISED": return "HIGH";
		case "LATERAL_MOVEMENT": return "HIGH";
		case "DATA_ACCESS": return "CRITICAL";
		case "INCIDENT_DETECTED": return "CRITICAL";
		case "INVESTIGATING": return "HIGH";
		case "CONTAINED": return "LOW";
		case "RESOLVED": return "LOW";
		default: return "LOW";
	}
}
/**
* Converts HH:MM string to simulated minute offset from 09:42.
*/
function timestampToMinute(timeStr) {
	if (!timeStr || !timeStr.includes(":")) return 0;
	const parts = timeStr.split(":").map(Number);
	const hour = parts[0] ?? 9;
	const minute = parts[1] ?? 42;
	const baseMinutes = 582;
	const currentMinutes = hour * 60 + minute;
	return Math.max(0, Math.min(42, currentMinutes - baseMinutes));
}
/**
* Converts simulated minute offset (0-42) to HH:MM format starting at 09:42.
*/
function minuteToTimestamp(minute) {
	const totalMinutes = 582 + Math.max(0, Math.min(42, Math.floor(minute)));
	return `${Math.floor(totalMinutes / 60).toString().padStart(2, "0")}:${(totalMinutes % 60).toString().padStart(2, "0")}`;
}
/**
* Primary state reconstruction function (Requirement 16 & 17).
* Reconstructs the exact virtual state of the organization and incident at that moment in time.
* If `isInitialReset` is true and minute === 0, returns the pristine NORMAL pre-attack state.
*/
function getIncidentStateAtTime(timestampOrMinute, options) {
	const minute = typeof timestampOrMinute === "number" ? Math.max(0, Math.min(42, timestampOrMinute)) : timestampToMinute(timestampOrMinute);
	const timestamp = minuteToTimestamp(minute);
	if (options?.isInitialReset && minute === 0) {
		const assets = demoAssets.map((a) => ({
			...a,
			status: "HEALTHY"
		}));
		const users = demoUsers.map((u) => ({
			...u,
			status: "ACTIVE"
		}));
		return {
			timestamp: "09:42",
			minute: 0,
			stage: "NORMAL",
			risk: "LOW",
			status: "ACTIVE",
			activeEvent: null,
			completedEvents: [],
			activeEvents: [],
			upcomingEvents: [...demoTimelineEvents],
			allEvents: [...demoTimelineEvents],
			compromisedAssetIds: [],
			affectedAssetIds: [],
			assets,
			compromisedAssets: [],
			activeAttackNodes: demoAttackNodes.map((n) => ({
				...n,
				status: "Clean",
				risk: "Normal"
			})),
			activeAttackEdges: [],
			availableEvidence: [],
			currentUsers: users,
			compromisedUsers: [],
			currentSessions: []
		};
	}
	let stage = "NORMAL";
	let status = "ACTIVE";
	if (options?.isResolved) {
		stage = "RESOLVED";
		status = "RESOLVED";
	} else if (options?.isContained) {
		stage = "CONTAINED";
		status = "CONTAINED";
	} else if (minute >= 42) {
		stage = "INCIDENT_DETECTED";
		status = "INVESTIGATING";
	} else if (minute >= 30) {
		stage = "DATA_ACCESS";
		status = "ACTIVE";
	} else if (minute >= 25) {
		stage = "LATERAL_MOVEMENT";
		status = "ACTIVE";
	} else if (minute >= 18) {
		stage = "ACCOUNT_COMPROMISED";
		status = "ACTIVE";
	} else if (minute >= 0) {
		stage = "SUSPICIOUS_ACTIVITY";
		status = "ACTIVE";
	}
	const risk = calculateRisk(stage);
	const completedEvents = [];
	const activeEvents = [];
	const upcomingEvents = [];
	for (const event of demoTimelineEvents) {
		const eventMinute = event.minute ?? timestampToMinute(event.timestamp);
		if (eventMinute < minute) completedEvents.push(event);
		else if (eventMinute === minute) activeEvents.push(event);
		else upcomingEvents.push(event);
	}
	const activeEvent = activeEvents[0] ?? completedEvents[completedEvents.length - 1] ?? demoTimelineEvents[0];
	const compromisedAssetIds = [];
	const affectedAssetIds = [];
	if (minute >= 18) {
		compromisedAssetIds.push("LAPTOP-042");
		affectedAssetIds.push("LAPTOP-042");
	}
	if (minute >= 25) {
		compromisedAssetIds.push("SERVER-03");
		if (!affectedAssetIds.includes("SERVER-03")) affectedAssetIds.push("SERVER-03");
	}
	if (minute >= 30) {
		compromisedAssetIds.push("DB-PROD-01");
		if (!affectedAssetIds.includes("DB-PROD-01")) affectedAssetIds.push("DB-PROD-01");
	}
	if (minute >= 36) {
		compromisedAssetIds.push("FILE-SRV-01");
		if (!affectedAssetIds.includes("FILE-SRV-01")) affectedAssetIds.push("FILE-SRV-01");
	}
	const assets = demoAssets.map((asset) => {
		if (compromisedAssetIds.includes(asset.id)) return {
			...asset,
			status: "COMPROMISED",
			lastSeen: `${timestamp}:00`
		};
		return {
			...asset,
			status: "HEALTHY"
		};
	});
	const compromisedAssets = assets.filter((a) => compromisedAssetIds.includes(a.id));
	const isAlexCompromised = minute >= 18;
	const currentUsers = demoUsers.map((u) => {
		if (u.username === "alex.m" && isAlexCompromised) return {
			...u,
			status: "COMPROMISED"
		};
		return {
			...u,
			status: "ACTIVE"
		};
	});
	const compromisedUsers = currentUsers.filter((u) => u.status === "COMPROMISED");
	const currentSessions = [];
	if (minute >= 18) currentSessions.push({
		userId: "usr-alex-m",
		assetId: "LAPTOP-042",
		establishedAt: "10:00"
	});
	if (minute >= 25) currentSessions.push({
		userId: "usr-alex-m",
		assetId: "SERVER-03",
		establishedAt: "10:07"
	});
	const activeAttackNodes = demoAttackNodes.map((node) => {
		const activateMinute = node.activateAt ?? timestampToMinute(node.timestamp ?? "09:42");
		const isNodeActive = minute >= activateMinute;
		return {
			...node,
			status: isNodeActive ? node.status : "Clean",
			risk: isNodeActive ? node.risk ?? "Normal" : "Normal"
		};
	});
	const activeAttackEdges = demoAttackEdges.filter((edge) => {
		const edgeMinute = timestampToMinute(edge.timestamp);
		return minute >= edgeMinute;
	});
	const availableEvidence = demoEvidence.filter((ev) => {
		const evMinute = timestampToMinute(ev.timestamp);
		return minute >= evMinute;
	});
	return {
		timestamp,
		minute,
		stage,
		risk,
		status,
		activeEvent: activeEvent ?? null,
		completedEvents,
		activeEvents,
		upcomingEvents,
		allEvents: [...demoTimelineEvents],
		compromisedAssetIds,
		affectedAssetIds,
		assets,
		compromisedAssets,
		activeAttackNodes,
		activeAttackEdges,
		availableEvidence,
		currentUsers,
		compromisedUsers,
		currentSessions
	};
}
/**
* Reconstructs the complete objective reality of the synthetic enterprise (ACME Corporation)
* at any given minute (0 to 42) or timestamp (09:42 to 10:24).
*/
function getActualDigitalTwinState(timestampOrMinute) {
	const minute = typeof timestampOrMinute === "number" ? Math.max(0, Math.min(42, Math.floor(timestampOrMinute))) : timestampToMinute(timestampOrMinute);
	const timestamp = minuteToTimestamp(minute);
	const baseIncidentState = getIncidentStateAtTime(minute);
	const activeConnections = initialSyntheticConnections.filter((conn) => timestampToMinute(conn.firstSeen) <= minute);
	const activeSessions = initialSyntheticSessions.filter((sess) => timestampToMinute(sess.startedAt) <= minute);
	const activeProcesses = initialSyntheticProcesses.filter((proc) => timestampToMinute(proc.timestamp) <= minute);
	const dataResources = syntheticDataResources.map((res) => {
		const isAccessed = Boolean(res.accessedAt && timestampToMinute(res.accessedAt) <= minute);
		return {
			...res,
			isExposed: isAccessed,
			accessedAt: isAccessed ? res.accessedAt : void 0,
			accessedBy: isAccessed ? res.accessedBy : void 0
		};
	});
	const users = demoUsers.map((user) => {
		const isAlex = user.username === "alex.m";
		const userSessions = activeSessions.filter((s) => s.userId === user.id).map((s) => s.id);
		let status = user.status;
		if (isAlex) if (minute >= 18) status = "COMPROMISED";
		else if (minute >= 0) status = "SUSPICIOUS";
		else status = "ACTIVE";
		return {
			id: user.id,
			username: user.username,
			displayName: user.displayName,
			department: user.department,
			role: user.role,
			privilegeLevel: user.privilegeLevel,
			status,
			currentSessions: userSessions,
			lastAuthentication: isAlex && minute >= 2 ? "09:44" : "08:15",
			authenticationSource: isAlex && minute >= 0 ? "185.220.101.5 (External)" : "Internal SSO",
			associatedDeviceIds: user.associatedAssetIds,
			compromisedAt: isAlex && minute >= 18 ? "10:00" : void 0
		};
	});
	const assets = demoAssets.map((asset) => {
		let status = "HEALTHY";
		let risk = "LOW";
		let compromiseTime = void 0;
		if (asset.id === "LAPTOP-042") {
			if (minute >= 18) {
				status = "COMPROMISED";
				risk = "HIGH";
				compromiseTime = "10:00";
			} else if (minute >= 2) {
				status = "MONITORED";
				risk = "MEDIUM";
			}
		} else if (asset.id === "SERVER-03") {
			if (minute >= 25) {
				status = "COMPROMISED";
				risk = "HIGH";
				compromiseTime = "10:07";
			} else if (minute >= 18) {
				status = "MONITORED";
				risk = "LOW";
			}
		} else if (asset.id === "DB-PROD-01") {
			if (minute >= 30) {
				status = "COMPROMISED";
				risk = "CRITICAL";
				compromiseTime = "10:12";
			}
		} else if (asset.id === "FILE-SRV-01") {
			if (minute >= 36) {
				status = "COMPROMISED";
				risk = "CRITICAL";
				compromiseTime = "10:18";
			}
		} else if (asset.id === "VPN-GW-01") {
			if (minute >= 0) {
				status = "SUSPICIOUS";
				risk = "MEDIUM";
			}
		}
		const assetProcesses = activeProcesses.filter((p) => p.assetId === asset.id).map((p) => p.id);
		const assetConnections = activeConnections.filter((c) => c.sourceId === asset.id || c.destinationId === asset.id).map((c) => c.id);
		const assetEvidenceCount = baseIncidentState.availableEvidence.filter((e) => e.assetId === asset.id).length;
		return {
			id: asset.id,
			name: asset.name,
			type: asset.type,
			hostname: asset.hostname ?? asset.id,
			owner: asset.owner ?? "Corporate IT",
			status,
			risk,
			criticality: asset.criticality,
			ipAddress: asset.ipAddress,
			firstSeen: asset.firstSeen,
			lastSeen: `${timestamp}:00`,
			compromiseTime,
			isolationStatus: "CONNECTED",
			activeProcessIds: assetProcesses,
			networkConnectionIds: assetConnections,
			currentUser: asset.id === "LAPTOP-042" && minute >= 18 ? "alex.m" : void 0,
			evidenceCount: assetEvidenceCount
		};
	});
	const confirmedAffected = assets.filter((a) => a.status === "COMPROMISED");
	const potentiallyAffected = assets.filter((a) => a.status === "SUSPICIOUS" || a.status === "MONITORED");
	const criticalAffected = assets.filter((a) => a.status === "COMPROMISED" && a.criticality === "CRITICAL");
	const usersAffected = users.filter((u) => u.status === "COMPROMISED").length;
	const dataResourcesAtRisk = dataResources.filter((d) => d.isExposed).length;
	const blastRadius = {
		confirmedAffectedAssets: confirmedAffected.length,
		potentiallyAffectedAssets: potentiallyAffected.length,
		criticalAssetsAffected: criticalAffected.length,
		usersAffected,
		dataResourcesAtRisk,
		details: [
			{
				label: "Compromised Identities",
				count: usersAffected,
				severity: usersAffected > 0 ? "HIGH" : "LOW"
			},
			{
				label: "Confirmed Assets",
				count: confirmedAffected.length,
				severity: confirmedAffected.length > 2 ? "CRITICAL" : confirmedAffected.length > 0 ? "HIGH" : "LOW"
			},
			{
				label: "Exposed Data Stores",
				count: dataResourcesAtRisk,
				severity: dataResourcesAtRisk > 0 ? "CRITICAL" : "LOW"
			},
			{
				label: "Active Attacker Sessions",
				count: activeSessions.length,
				severity: activeSessions.length > 2 ? "HIGH" : "LOW"
			}
		]
	};
	return {
		timestamp,
		minute,
		incidentStage: baseIncidentState.stage,
		riskLevel: baseIncidentState.risk,
		users,
		assets,
		networkConnections: activeConnections,
		activeSessions,
		processes: activeProcesses,
		dataResources,
		attackNodes: baseIncidentState.activeAttackNodes,
		attackEdges: baseIncidentState.activeAttackEdges,
		activeEvents: baseIncidentState.activeEvents,
		completedEvents: baseIncidentState.completedEvents,
		upcomingEvents: baseIncidentState.upcomingEvents,
		evidence: baseIncidentState.availableEvidence,
		affectedAssets: baseIncidentState.affectedAssetIds,
		compromisedAssets: baseIncidentState.compromisedAssetIds,
		confidence: .94,
		blastRadius
	};
}
/**
* Reconstructs what the SOC / Security Operations Team KNEW at that specific timestamp (Requirement 17).
* Prevents future undetected events (like lateral movement or db access before detection)
* from being presented as known evidence to the analyst when rewinding.
*/
function getKnownSecurityState(timestampOrMinute) {
	const actualState = getActualDigitalTwinState(timestampOrMinute);
	const minute = actualState.minute;
	const knownEvidence = actualState.evidence.filter((ev) => {
		const evMin = timestampToMinute(ev.timestamp);
		if (ev.type === "DATABASE" && minute < 42) return false;
		if (ev.type === "PROCESS" && ev.actor === "archive.exe" && minute < 42) return false;
		return evMin <= minute;
	});
	const knownAssets = actualState.assets.map((asset) => {
		if (asset.id === "SERVER-03" && minute < 25) return {
			...asset,
			status: "HEALTHY",
			risk: "LOW"
		};
		if (asset.id === "DB-PROD-01" && minute < 42) return {
			...asset,
			status: "HEALTHY",
			risk: "LOW"
		};
		if (asset.id === "FILE-SRV-01" && minute < 42) return {
			...asset,
			status: "HEALTHY",
			risk: "LOW"
		};
		return asset;
	});
	return {
		...actualState,
		assets: knownAssets,
		evidence: knownEvidence,
		confidence: minute >= 42 ? .98 : minute >= 18 ? .72 : .45
	};
}
var MASTER_NODES = [
	{
		id: "ATTACKER",
		label: "Attacker (185.220.101.5)",
		type: "EXTERNAL_THREAT",
		criticality: "HIGH",
		firstSeen: "09:42",
		owner: "External / Unrecognized ASN9009",
		evidenceIds: ["ev-1"],
		eventIds: ["raw-0942-auth"],
		confidence: .99,
		tier: 0,
		metadata: {
			ip: "185.220.101.5",
			asn: "AS9009",
			location: "External Non-Corporate"
		}
	},
	{
		id: "ALEX_ACCOUNT",
		label: "alex.m (Finance Analyst)",
		type: "USER",
		criticality: "MEDIUM",
		firstSeen: "09:42",
		compromiseTime: "10:00",
		owner: "Finance Department",
		currentUser: "alex.m",
		evidenceIds: ["ev-1", "ev-2"],
		eventIds: [
			"raw-0942-auth",
			"raw-0944-success",
			"raw-1000-session"
		],
		confidence: .98,
		tier: 1,
		metadata: {
			role: "Financial Analyst",
			authMethod: "MFA Token / Kerberos"
		}
	},
	{
		id: "VPN-GW-01",
		label: "VPN-GW-01 (Edge Gateway)",
		type: "NETWORK_GATEWAY",
		criticality: "CRITICAL",
		firstSeen: "09:42",
		owner: "Infrastructure",
		evidenceIds: ["ev-1"],
		eventIds: ["raw-0942-auth", "raw-0944-failed-1"],
		confidence: .95,
		tier: 1,
		metadata: {
			ip: "10.0.0.1",
			port: 443
		}
	},
	{
		id: "LAPTOP-042",
		label: "LAPTOP-042 (Workstation)",
		type: "ENDPOINT",
		criticality: "MEDIUM",
		firstSeen: "09:44",
		compromiseTime: "10:00",
		owner: "alex.m",
		currentUser: "alex.m",
		evidenceIds: ["ev-2", "ev-3"],
		eventIds: ["raw-1000-session", "raw-1004-ps"],
		confidence: .97,
		tier: 2,
		metadata: {
			os: "Windows 11 Enterprise",
			ip: "10.0.4.42"
		}
	},
	{
		id: "SERVER-03",
		label: "SERVER-03 (App Server)",
		type: "SERVER",
		criticality: "HIGH",
		firstSeen: "10:07",
		compromiseTime: "10:07",
		owner: "Engineering",
		evidenceIds: ["ev-4"],
		eventIds: ["raw-1007-smb"],
		confidence: .93,
		tier: 3,
		metadata: {
			role: "Internal Application Server",
			ip: "10.0.12.3",
			service: "WinRM / SMB"
		}
	},
	{
		id: "DB-PROD-01",
		label: "DB-PROD-01 (Customer DB)",
		type: "DATABASE",
		criticality: "CRITICAL",
		firstSeen: "10:12",
		compromiseTime: "10:12",
		owner: "Data Operations",
		evidenceIds: ["ev-5"],
		eventIds: ["raw-1012-db"],
		confidence: .96,
		tier: 4,
		metadata: {
			engine: "PostgreSQL 16",
			ip: "10.0.20.10",
			database: "acme_prod"
		}
	},
	{
		id: "FILE-SRV-01",
		label: "FILE-SRV-01 (Share)",
		type: "FILE_SERVER",
		criticality: "CRITICAL",
		firstSeen: "10:18",
		compromiseTime: "10:18",
		owner: "IT Corporate Storage",
		evidenceIds: ["ev-6"],
		eventIds: ["raw-1018-share"],
		confidence: .91,
		tier: 5,
		metadata: {
			protocol: "SMBv3",
			share: "//FILE-SRV-01/confidential",
			filesCount: 37
		}
	}
];
var MASTER_EDGES = [
	{
		id: "edge-threat-alex",
		source: "ATTACKER",
		target: "ALEX_ACCOUNT",
		relationshipType: "AUTHENTICATED_TO",
		status: "ACTIVE",
		firstSeen: "09:42",
		lastSeen: "10:24",
		eventIds: ["raw-0942-auth", "raw-0944-success"],
		evidenceIds: ["ev-1", "ev-2"],
		confidence: .95,
		techniqueCategory: "T1078 Valid Accounts",
		description: "Attacker used stolen credentials to authenticate as employee alex.m."
	},
	{
		id: "edge-alex-vpn",
		source: "ALEX_ACCOUNT",
		target: "VPN-GW-01",
		relationshipType: "CONNECTED_TO",
		status: "ACTIVE",
		firstSeen: "09:44",
		lastSeen: "10:24",
		eventIds: ["raw-0944-success"],
		evidenceIds: ["ev-1"],
		confidence: .94,
		techniqueCategory: "T1133 External Remote Services",
		description: "Compromised employee credentials authenticated through corporate VPN gateway."
	},
	{
		id: "edge-vpn-laptop",
		source: "VPN-GW-01",
		target: "LAPTOP-042",
		relationshipType: "COMMUNICATED_WITH",
		status: "ACTIVE",
		firstSeen: "09:44",
		lastSeen: "10:24",
		eventIds: ["raw-0944-success", "raw-1000-session"],
		evidenceIds: ["ev-2"],
		confidence: .92,
		techniqueCategory: "T1021 Remote Services",
		description: "VPN ingress traffic routed to assigned workstation LAPTOP-042."
	},
	{
		id: "edge-alex-laptop",
		source: "ALEX_ACCOUNT",
		target: "LAPTOP-042",
		relationshipType: "AUTHENTICATED_TO",
		status: "ACTIVE",
		firstSeen: "10:00",
		lastSeen: "10:24",
		eventIds: ["raw-1000-session"],
		evidenceIds: ["ev-2"],
		confidence: .98,
		techniqueCategory: "T1078.002 Domain Accounts",
		description: "Attacker established interactive desktop session on workstation LAPTOP-042."
	},
	{
		id: "edge-laptop-server",
		source: "LAPTOP-042",
		target: "SERVER-03",
		relationshipType: "LATERALLY_MOVED_TO",
		status: "ACTIVE",
		firstSeen: "10:07",
		lastSeen: "10:24",
		eventIds: ["raw-1007-smb"],
		evidenceIds: ["ev-4"],
		confidence: .92,
		techniqueCategory: "T1021.002 SMB/Windows Admin Shares",
		description: "Lateral traversal from LAPTOP-042 to internal application server SERVER-03."
	},
	{
		id: "edge-server-db",
		source: "SERVER-03",
		target: "DB-PROD-01",
		relationshipType: "QUERIED",
		status: "ACTIVE",
		firstSeen: "10:12",
		lastSeen: "10:24",
		eventIds: ["raw-1012-db"],
		evidenceIds: ["ev-5"],
		confidence: .96,
		techniqueCategory: "T1505 Server Software Component / Database Query",
		description: "Privileged query connection executed from SERVER-03 to production customer database."
	},
	{
		id: "edge-server-files",
		source: "SERVER-03",
		target: "FILE-SRV-01",
		relationshipType: "ACCESSED_DATA",
		status: "ACTIVE",
		firstSeen: "10:18",
		lastSeen: "10:24",
		eventIds: ["raw-1018-share"],
		evidenceIds: ["ev-6"],
		confidence: .89,
		techniqueCategory: "T1005 Data from Network Shared Drive",
		description: "Attempted enumeration and bulk staging of 37 confidential files from FILE-SRV-01."
	}
];
/**
* Reconstructs the complete Attack Graph state at any simulated timestamp (Requirement 2 & 8).
* Purely deterministic: derived directly from the centralized Digital Twin state.
*/
function getAttackGraphAtTime(incidentId = "INC-2048", timestampOrMinute) {
	const minute = typeof timestampOrMinute === "number" ? Math.max(0, Math.min(42, Math.floor(timestampOrMinute))) : timestampToMinute(timestampOrMinute);
	const timestamp = minuteToTimestamp(minute);
	const digitalTwin = getActualDigitalTwinState(minute);
	const nodes = MASTER_NODES.map((blueprint) => {
		let status = "HEALTHY";
		let risk = "LOW";
		if (blueprint.id === "ATTACKER") {
			status = "SUSPICIOUS";
			risk = "HIGH";
		} else if (blueprint.id === "ALEX_ACCOUNT") {
			if (minute >= 18) {
				status = "COMPROMISED";
				risk = "HIGH";
			} else if (minute >= 0) {
				status = "SUSPICIOUS";
				risk = "MEDIUM";
			}
		} else if (blueprint.id === "VPN-GW-01") {
			status = minute >= 0 ? "SUSPICIOUS" : "HEALTHY";
			risk = minute >= 0 ? "MEDIUM" : "LOW";
		} else if (blueprint.id === "LAPTOP-042") {
			if (minute >= 18) {
				status = "COMPROMISED";
				risk = "HIGH";
			} else if (minute >= 2) {
				status = "MONITORED";
				risk = "MEDIUM";
			}
		} else if (blueprint.id === "SERVER-03") {
			if (minute >= 25) {
				status = "COMPROMISED";
				risk = "HIGH";
			} else if (minute >= 18) {
				status = "MONITORED";
				risk = "LOW";
			}
		} else if (blueprint.id === "DB-PROD-01") {
			if (minute >= 30) {
				status = "COMPROMISED";
				risk = "CRITICAL";
			}
		} else if (blueprint.id === "FILE-SRV-01") {
			if (minute >= 36) {
				status = "AFFECTED";
				risk = "CRITICAL";
			}
		}
		return {
			...blueprint,
			status,
			risk
		};
	});
	const edges = MASTER_EDGES.filter((edge) => {
		return timestampToMinute(edge.firstSeen) <= minute;
	});
	const entryPoint = nodes.find((n) => n.id === "ATTACKER") ?? nodes[0];
	const compromisedNodes = nodes.filter((n) => n.status === "COMPROMISED");
	const suspiciousNodes = nodes.filter((n) => n.status === "SUSPICIOUS" || n.status === "MONITORED");
	const affectedNodes = nodes.filter((n) => n.status === "COMPROMISED" || n.status === "AFFECTED");
	const criticalNodes = nodes.filter((n) => (n.status === "COMPROMISED" || n.status === "AFFECTED") && n.criticality === "CRITICAL");
	const activeNodeIds = [];
	if (minute >= 0) activeNodeIds.push("ATTACKER", "ALEX_ACCOUNT");
	if (minute >= 18) activeNodeIds.push("LAPTOP-042");
	if (minute >= 25) activeNodeIds.push("SERVER-03");
	if (minute >= 30) activeNodeIds.push("DB-PROD-01");
	if (minute >= 36) activeNodeIds.push("FILE-SRV-01");
	const primaryPath = {
		pathId: "path-primary-killchain",
		name: "Primary Credential Compromise & Exfiltration Path",
		nodeIds: activeNodeIds,
		edgeIds: edges.filter((e) => activeNodeIds.includes(e.source) && activeNodeIds.includes(e.target)).map((e) => e.id),
		startTime: "09:42",
		endTime: timestamp,
		status: minute >= 30 ? "ACTIVE" : "POTENTIAL",
		confidence: .95,
		severity: minute >= 30 ? "CRITICAL" : minute >= 18 ? "HIGH" : "MEDIUM",
		summary: minute >= 36 ? "Attacker leveraged compromised credentials through finance workstation to access internal app server, query customer DB, and stage confidential files." : minute >= 30 ? "Attacker reached customer database DB-PROD-01 via application server SERVER-03." : minute >= 25 ? "Lateral traversal from LAPTOP-042 to SERVER-03 observed." : minute >= 18 ? "Workstation LAPTOP-042 compromised via alex.m identity." : "Initial authentication anomaly targeting employee credentials."
	};
	return {
		timestamp,
		minute,
		incidentId,
		nodes,
		edges,
		entryPoint: entryPoint ?? null,
		compromisedNodes,
		suspiciousNodes,
		affectedNodes,
		criticalNodes,
		activePath: primaryPath,
		attackPaths: [primaryPath],
		blastRadius: digitalTwin.blastRadius,
		confidence: .94
	};
}
/**
* Reusable Graph Traversal Utility: Shortest path between source and target nodes (Requirement 17).
* Deterministic BFS graph traversal over currently active edges.
*/
function findPath(sourceNodeId, targetNodeId, graph) {
	if (sourceNodeId === targetNodeId) return [sourceNodeId];
	const adj = /* @__PURE__ */ new Map();
	for (const edge of graph.edges) {
		if (!adj.has(edge.source)) adj.set(edge.source, []);
		adj.get(edge.source).push(edge.target);
	}
	const queue = [[sourceNodeId]];
	const visited = /* @__PURE__ */ new Set([sourceNodeId]);
	while (queue.length > 0) {
		const path = queue.shift();
		const current = path[path.length - 1];
		if (current === targetNodeId) return path;
		const neighbors = adj.get(current) ?? [];
		for (const neighbor of neighbors) if (!visited.has(neighbor)) {
			visited.add(neighbor);
			queue.push([...path, neighbor]);
		}
	}
	return [];
}
/**
* Returns downstream reachable systems from selected node at current timestamp (Requirement 25).
*/
function getDownstreamReachableNodes(graph, nodeId) {
	const reachableIds = /* @__PURE__ */ new Set();
	const queue = [nodeId];
	while (queue.length > 0) {
		const current = queue.shift();
		const outgoing = graph.edges.filter((e) => e.source === current);
		for (const edge of outgoing) if (!reachableIds.has(edge.target) && edge.target !== nodeId) {
			reachableIds.add(edge.target);
			queue.push(edge.target);
		}
	}
	return graph.nodes.filter((n) => reachableIds.has(n.id));
}
/**
* Generates human-readable path explanation from structured data (Requirement 26).
*/
function generatePathExplanation(graph, targetNodeId) {
	const path = findPath(graph.entryPoint?.id ?? "ATTACKER", targetNodeId, graph);
	if (path.length === 0) return [`No confirmed attack path reached ${targetNodeId} as of ${graph.timestamp}.`];
	const explanations = [];
	for (let i = 0; i < path.length - 1; i++) {
		const srcId = path[i];
		const dstId = path[i + 1];
		const edge = graph.edges.find((e) => e.source === srcId && e.target === dstId);
		if (edge) explanations.push(`${i + 1}. [${edge.firstSeen}] ${edge.source} ${edge.relationshipType.replace(/_/g, " ").toLowerCase()} ${edge.target} (${edge.techniqueCategory})`);
		else explanations.push(`${i + 1}. Attacker traversed from ${srcId} to ${dstId}`);
	}
	return explanations;
}
/**
* Filters the displayed attack graph without modifying underlying state (Requirement 20).
*/
function filterAttackGraph(graph, filters) {
	let filteredNodes = graph.nodes;
	if (filters.nodeType !== "ALL") filteredNodes = filteredNodes.filter((n) => n.type === filters.nodeType);
	if (filters.status !== "ALL") filteredNodes = filteredNodes.filter((n) => n.status === filters.status);
	if (filters.searchQuery.trim()) {
		const q = filters.searchQuery.toLowerCase();
		filteredNodes = filteredNodes.filter((n) => n.id.toLowerCase().includes(q) || n.label.toLowerCase().includes(q) || n.owner.toLowerCase().includes(q));
	}
	const visibleNodeIds = new Set(filteredNodes.map((n) => n.id));
	let filteredEdges = graph.edges.filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target));
	if (filters.relationship !== "ALL") filteredEdges = filteredEdges.filter((e) => e.relationshipType === filters.relationship);
	return {
		nodes: filteredNodes,
		edges: filteredEdges
	};
}
/**
* Deep copies a DigitalTwinSnapshot to guarantee complete branch immutability (Requirement 7 & 8).
*/
function forkSnapshot(snapshot) {
	return JSON.parse(JSON.stringify(snapshot));
}
/**
* Replays future events and applies deterministic response action effect rules (Requirement 10 & 11).
* Purely deterministic: given identical base timestamp and action, output is strictly equivalent.
*/
function simulateCounterfactualFuture(baseMinute, action, incidentId = "INC-2048") {
	const baseTimestamp = minuteToTimestamp(baseMinute);
	const baseSnapshot = getActualDigitalTwinState(baseMinute);
	forkSnapshot(baseSnapshot);
	const baselineFinalSnapshot = getActualDigitalTwinState(42);
	const baselineFinalAttackGraph = getAttackGraphAtTime(incidentId, 42);
	const preventedEvents = [];
	const simulatedTimeline = [];
	for (const evt of demoTimelineEvents) if ((evt.minute ?? 0) <= baseMinute) simulatedTimeline.push({
		id: evt.id,
		time: evt.timestamp,
		minute: evt.minute ?? 0,
		title: evt.title,
		description: evt.description,
		category: evt.category,
		status: "ORIGINAL",
		affectedAssets: evt.affectedAssetIds
	});
	if (action.type !== "DO_NOTHING") simulatedTimeline.push({
		id: `action-${action.id}`,
		time: action.timestamp,
		minute: action.minute,
		title: `[RESPONSE ACTION] ${action.label}`,
		description: action.description,
		category: "INCIDENT_ALERT",
		status: "RESPONSE_ACTION",
		affectedAssets: action.targetId !== "NONE" ? [action.targetId] : []
	});
	let isLaptopIsolated = action.type === "ISOLATE_ENDPOINT" && action.targetId === "LAPTOP-042";
	let isAlexUserDisabled = action.type === "DISABLE_USER" && (action.targetId === "alex.m" || action.targetId === "usr-alex-m");
	let isLateralConnBlocked = action.type === "BLOCK_LATERAL_CONNECTION" && (action.targetId.includes("SERVER-03") || action.targetId.includes("LAPTOP-042") || action.targetId === "conn-laptop-server");
	for (const evt of demoTimelineEvents) if ((evt.minute ?? 0) > baseMinute) {
		let isPrevented = false;
		let reason = "";
		let causalTrigger = "";
		if (evt.id === "evt-1007") {
			if (isLaptopIsolated) {
				isPrevented = true;
				reason = "LAPTOP-042 was isolated at " + action.timestamp + ", severing outbound network connectivity.";
				causalTrigger = "ISOLATE_ENDPOINT(LAPTOP-042)";
			} else if (isLateralConnBlocked) {
				isPrevented = true;
				reason = "Lateral network connection between LAPTOP-042 and SERVER-03 was blocked by boundary firewall rule.";
				causalTrigger = "BLOCK_LATERAL_CONNECTION";
			} else if (isAlexUserDisabled) {
				isPrevented = true;
				reason = "Compromised identity alex.m was disabled at " + action.timestamp + "; Kerberos ticket validation failed.";
				causalTrigger = "DISABLE_USER(alex.m)";
			}
		} else if (evt.id === "evt-1012") {
			if (!(!isLaptopIsolated && !isLateralConnBlocked && !isAlexUserDisabled)) {
				isPrevented = true;
				reason = "SERVER-03 was never compromised; attacker has no pivoting foothold to execute database queries.";
				causalTrigger = "CAUSAL_DEPENDENCY(SERVER-03 unreached)";
			}
		} else if (evt.id === "evt-1018") {
			if (!(!isLaptopIsolated && !isLateralConnBlocked && !isAlexUserDisabled)) {
				isPrevented = true;
				reason = "FILE-SRV-01 was never accessed because the upstream pivot host SERVER-03 was secured.";
				causalTrigger = "CAUSAL_DEPENDENCY(SERVER-03 unreached)";
			}
		}
		if (isPrevented) {
			const detail = {
				eventId: evt.id,
				originalTime: evt.timestamp,
				title: evt.title,
				category: evt.category,
				targetAsset: evt.affectedAssetIds[evt.affectedAssetIds.length - 1] || "",
				reason,
				causalTrigger
			};
			preventedEvents.push(detail);
			simulatedTimeline.push({
				id: evt.id,
				time: evt.timestamp,
				minute: evt.minute ?? 0,
				title: `${evt.title} (PREVENTED)`,
				description: reason,
				category: evt.category,
				status: "PREVENTED",
				affectedAssets: evt.affectedAssetIds,
				preventedDetail: detail
			});
		} else simulatedTimeline.push({
			id: evt.id,
			time: evt.timestamp,
			minute: evt.minute ?? 0,
			title: evt.title,
			description: evt.description,
			category: evt.category,
			status: "ALLOWED",
			affectedAssets: evt.affectedAssetIds
		});
	}
	const finalAssets = baselineFinalSnapshot.assets.map((asset) => {
		if (asset.id === "LAPTOP-042") {
			if (isLaptopIsolated) return {
				...asset,
				status: "COMPROMISED",
				isolationStatus: "ISOLATED",
				risk: "LOW"
			};
		}
		if (preventedEvents.some((p) => p.targetAsset === asset.id)) return {
			...asset,
			status: "HEALTHY",
			risk: "LOW",
			compromiseTime: void 0,
			activeProcessIds: [],
			networkConnectionIds: []
		};
		return { ...asset };
	});
	const finalUsers = baselineFinalSnapshot.users.map((user) => {
		if (user.username === "alex.m" && isAlexUserDisabled) return {
			...user,
			status: "DISABLED",
			currentSessions: []
		};
		return { ...user };
	});
	const finalConnections = baselineFinalSnapshot.networkConnections.filter((conn) => {
		if (isLaptopIsolated && (conn.sourceId === "LAPTOP-042" || conn.destinationId === "LAPTOP-042")) return false;
		if (isLateralConnBlocked && conn.sourceId === "LAPTOP-042" && conn.destinationId === "SERVER-03") return false;
		if (!(finalAssets.find((a) => a.id === "SERVER-03")?.status === "COMPROMISED") && conn.sourceId === "SERVER-03") return false;
		return true;
	});
	const finalProcesses = baselineFinalSnapshot.processes.filter((proc) => {
		return finalAssets.find((a) => a.id === proc.assetId)?.status !== "HEALTHY";
	});
	const finalDataResources = baselineFinalSnapshot.dataResources.map((res) => {
		const parentAsset = finalAssets.find((a) => a.id === res.assetId);
		const isExposed = parentAsset?.status === "COMPROMISED" || parentAsset?.status === "AFFECTED";
		return {
			...res,
			isExposed,
			accessedAt: isExposed ? res.accessedAt : void 0
		};
	});
	const confirmedAffected = finalAssets.filter((a) => a.status === "COMPROMISED");
	const potentiallyAffected = finalAssets.filter((a) => a.status === "SUSPICIOUS" || a.status === "MONITORED");
	const criticalAffected = finalAssets.filter((a) => a.status === "COMPROMISED" && a.criticality === "CRITICAL");
	const usersAffected = finalUsers.filter((u) => u.status === "COMPROMISED").length;
	const dataResourcesAtRisk = finalDataResources.filter((d) => d.isExposed).length;
	let finalStage = "CONTAINED";
	let finalRisk = "LOW";
	if (action.type === "DO_NOTHING") {
		finalStage = "INCIDENT_DETECTED";
		finalRisk = "CRITICAL";
	} else if (confirmedAffected.length >= 3 || criticalAffected.length > 0) {
		finalStage = "DATA_ACCESS";
		finalRisk = "CRITICAL";
	} else if (confirmedAffected.length === 2) {
		finalStage = "LATERAL_MOVEMENT";
		finalRisk = "HIGH";
	} else if (confirmedAffected.length === 1) {
		finalStage = "CONTAINED";
		finalRisk = "MEDIUM";
	} else {
		finalStage = "CONTAINED";
		finalRisk = "LOW";
	}
	const finalBlastRadius = {
		confirmedAffectedAssets: confirmedAffected.length,
		potentiallyAffectedAssets: potentiallyAffected.length,
		criticalAssetsAffected: criticalAffected.length,
		usersAffected,
		dataResourcesAtRisk,
		details: [
			{
				label: "Compromised Identities",
				count: usersAffected,
				severity: usersAffected > 0 ? "HIGH" : "LOW"
			},
			{
				label: "Confirmed Assets",
				count: confirmedAffected.length,
				severity: confirmedAffected.length > 0 ? "HIGH" : "LOW"
			},
			{
				label: "Exposed Data Stores",
				count: dataResourcesAtRisk,
				severity: dataResourcesAtRisk > 0 ? "CRITICAL" : "LOW"
			},
			{
				label: "Active Connections",
				count: finalConnections.length,
				severity: "LOW"
			}
		]
	};
	const finalSnapshot = {
		...baselineFinalSnapshot,
		incidentStage: finalStage,
		riskLevel: finalRisk,
		assets: finalAssets,
		users: finalUsers,
		networkConnections: finalConnections,
		processes: finalProcesses,
		dataResources: finalDataResources,
		blastRadius: finalBlastRadius,
		affectedAssets: confirmedAffected.map((a) => a.id),
		compromisedAssets: confirmedAffected.map((a) => a.id)
	};
	const cfNodes = baselineFinalAttackGraph.nodes.map((node) => {
		if (node.id === "LAPTOP-042" && isLaptopIsolated) return {
			...node,
			status: "ISOLATED",
			risk: "LOW"
		};
		if (preventedEvents.some((p) => p.targetAsset === node.id)) return {
			...node,
			status: "HEALTHY",
			risk: "LOW",
			compromiseTime: void 0
		};
		return { ...node };
	});
	const cfEdges = baselineFinalAttackGraph.edges.filter((edge) => {
		if (edge.source === "LAPTOP-042" && edge.target === "SERVER-03") return !isLaptopIsolated && !isLateralConnBlocked && !isAlexUserDisabled;
		if (edge.source === "SERVER-03") return cfNodes.find((n) => n.id === "SERVER-03")?.status === "COMPROMISED";
		return true;
	});
	const cfActiveNodeIds = ["ATTACKER", "ALEX_ACCOUNT"];
	if (!isAlexUserDisabled) cfActiveNodeIds.push("LAPTOP-042");
	if (!isLaptopIsolated && !isLateralConnBlocked && !isAlexUserDisabled) cfActiveNodeIds.push("SERVER-03", "DB-PROD-01", "FILE-SRV-01");
	const cfPrimaryPath = {
		pathId: "cf-path",
		name: "Counterfactual Attack Traversal",
		nodeIds: cfActiveNodeIds,
		edgeIds: cfEdges.filter((e) => cfActiveNodeIds.includes(e.source) && cfActiveNodeIds.includes(e.target)).map((e) => e.id),
		startTime: "09:42",
		endTime: "10:24",
		status: isLaptopIsolated || isAlexUserDisabled || isLateralConnBlocked ? "STOPPED" : "ACTIVE",
		confidence: .96,
		severity: finalRisk,
		summary: preventedEvents.length > 0 ? `Kill chain arrested at ${action.timestamp} by ${action.label}. ${preventedEvents.length} downstream attack transitions blocked.` : "Unmitigated credential traversal through ACME corporate environment."
	};
	const cfAttackGraph = {
		timestamp: "10:24",
		minute: 42,
		incidentId,
		nodes: cfNodes,
		edges: cfEdges,
		entryPoint: cfNodes.find((n) => n.id === "ATTACKER") ?? null,
		compromisedNodes: cfNodes.filter((n) => n.status === "COMPROMISED"),
		suspiciousNodes: cfNodes.filter((n) => n.status === "SUSPICIOUS" || n.status === "MONITORED"),
		affectedNodes: cfNodes.filter((n) => n.status === "COMPROMISED" || n.status === "AFFECTED"),
		criticalNodes: cfNodes.filter((n) => (n.status === "COMPROMISED" || n.status === "AFFECTED") && n.criticality === "CRITICAL"),
		activePath: cfPrimaryPath,
		attackPaths: [cfPrimaryPath],
		blastRadius: finalBlastRadius,
		confidence: .95
	};
	const baselineCompromised = baselineFinalSnapshot.assets.filter((a) => a.status === "COMPROMISED").map((a) => a.id);
	const cfCompromised = finalSnapshot.assets.filter((a) => a.status === "COMPROMISED").map((a) => a.id);
	const preventedCompromises = baselineCompromised.filter((id) => !cfCompromised.includes(id));
	const baselineCritical = baselineFinalSnapshot.assets.filter((a) => a.status === "COMPROMISED" && a.criticality === "CRITICAL").map((a) => a.id);
	const cfCritical = finalSnapshot.assets.filter((a) => a.status === "COMPROMISED" && a.criticality === "CRITICAL").map((a) => a.id);
	const preventedCritical = baselineCritical.filter((id) => !cfCritical.includes(id));
	const baselineDataRisk = baselineFinalSnapshot.blastRadius.dataResourcesAtRisk;
	const cfDataRisk = finalBlastRadius.dataResourcesAtRisk;
	const baselineUsers = baselineFinalSnapshot.blastRadius.usersAffected;
	const cfUsers = finalBlastRadius.usersAffected;
	const riskChange = finalRisk === baselineFinalSnapshot.riskLevel ? "UNCHANGED" : finalRisk === "LOW" || finalRisk === "MEDIUM" && baselineFinalSnapshot.riskLevel === "CRITICAL" ? "REDUCED" : "UNCHANGED";
	const comparison = {
		baselineFinalRisk: baselineFinalSnapshot.riskLevel,
		counterfactualFinalRisk: finalRisk,
		riskChange,
		baselineCompromisedAssets: baselineCompromised,
		counterfactualCompromisedAssets: cfCompromised,
		preventedCompromises,
		baselineCriticalAssets: baselineCritical,
		counterfactualCriticalAssets: cfCritical,
		preventedCriticalImpact: preventedCritical,
		baselineDataResourcesAtRisk: baselineDataRisk,
		counterfactualDataResourcesAtRisk: cfDataRisk,
		preventedDataExposure: Math.max(0, baselineDataRisk - cfDataRisk),
		baselineUsersAffected: baselineUsers,
		counterfactualUsersAffected: cfUsers,
		preventedUserImpact: Math.max(0, baselineUsers - cfUsers),
		baselineAttackPath: baselineFinalAttackGraph.activePath?.nodeIds ?? [],
		counterfactualAttackPath: cfActiveNodeIds,
		preventedEvents,
		preventedCount: preventedEvents.length
	};
	return {
		branchId: `branch-${action.type.toLowerCase()}-${baseMinute}`,
		name: action.label,
		incidentId,
		baseTimestamp,
		baseMinute,
		baseSnapshot,
		action,
		simulatedTimeline,
		finalSnapshot,
		attackGraph: cfAttackGraph,
		comparison,
		status: "COMPLETED",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
/**
* Creates predefined standard response actions for the analyst at any timestamp.
*/
function getStandardResponseActions(minute = 22) {
	const timestamp = minuteToTimestamp(minute);
	return [
		{
			id: "act-do-nothing",
			type: "DO_NOTHING",
			timestamp,
			minute,
			targetId: "NONE",
			targetType: "NONE",
			label: "Option 0 — Do Nothing (Baseline)",
			description: "Allow the incident to proceed without active intervention. Observes unmitigated attack progression."
		},
		{
			id: "act-isolate-laptop",
			type: "ISOLATE_ENDPOINT",
			timestamp,
			minute,
			targetId: "LAPTOP-042",
			targetType: "ENDPOINT",
			label: "Option A — Isolate LAPTOP-042",
			description: "Sever all inbound and outbound network connectivity for LAPTOP-042, stopping lateral movement attempts."
		},
		{
			id: "act-disable-alex",
			type: "DISABLE_USER",
			timestamp,
			minute,
			targetId: "alex.m",
			targetType: "USER",
			label: "Option B — Disable User Account (alex.m)",
			description: "Revoke all Kerberos tickets, tokens, and active directory session rights for compromised user alex.m."
		},
		{
			id: "act-block-lateral",
			type: "BLOCK_LATERAL_CONNECTION",
			timestamp,
			minute,
			targetId: "LAPTOP-042->SERVER-03",
			targetType: "CONNECTION",
			label: "Option C — Block Lateral Connection (LAPTOP-042 → SERVER-03)",
			description: "Enforce network firewall policy on port 445/5985 to drop all administrative traffic between workstation and server tiers."
		}
	];
}
/**
* Deterministic Response Intelligence & Decision Support Engine (Phase 5 Extension).
* Evaluates available incident response strategies strictly using the Phase 4 counterfactual engine.
* Never executes real-world actions: all actions are simulated within the synthetic incident model.
*/
var ResponseIntelligenceService = class {
	/**
	* Evaluates all standard response candidates at a given timestamp using Phase 4 simulation.
	*/
	evaluateCandidates(minute = 22, incidentId = "INC-2048") {
		const boundedMinute = Math.max(0, Math.min(42, Math.floor(minute)));
		minuteToTimestamp(boundedMinute);
		return getStandardResponseActions(boundedMinute).map((act) => {
			const branch = simulateCounterfactualFuture(boundedMinute, act, incidentId);
			const comp = branch.comparison;
			const criticalWeight = comp.preventedCriticalImpact.length * 50;
			const compromiseWeight = comp.preventedCompromises.length * 30;
			const dataExposureWeight = comp.preventedDataExposure * 25;
			const eventsWeight = comp.preventedCount * 10;
			const riskReductionWeight = comp.riskChange === "REDUCED" ? 40 : 0;
			const baselinePenalty = act.type === "DO_NOTHING" ? 200 : 0;
			const score = Math.max(0, criticalWeight + compromiseWeight + dataExposureWeight + eventsWeight + riskReductionWeight - baselinePenalty);
			let confidence = "LOW";
			if (act.type === "DO_NOTHING") confidence = "HIGH";
			else if (comp.preventedCount >= 3 && comp.preventedCompromises.length > 0) confidence = "HIGH";
			else if (comp.preventedCount >= 1) confidence = "MEDIUM";
			let rationale = "";
			if (act.type === "DO_NOTHING") rationale = "Passive observation results in complete attack chain traversal to internal servers, databases, and file repositories with CRITICAL final risk.";
			else if (act.type === "ISOLATE_ENDPOINT") rationale = `Isolating ${act.targetId} severs outbound lateral pivot capability, protecting ${comp.preventedCompromises.join(", ") || "downstream servers"} and preserving production database assets.`;
			else if (act.type === "DISABLE_USER") rationale = `Disabling ${act.targetId} revokes authentication tokens, preventing downstream authenticated pivots while leaving existing interactive host processes running.`;
			else if (act.type === "BLOCK_LATERAL_CONNECTION") rationale = `Dropping lateral network traffic between ${act.targetId} isolates the application tier but leaves the originating endpoint actively compromised.`;
			return {
				id: `cand-${act.type.toLowerCase()}-${boundedMinute}`,
				action: act,
				target: act.targetId,
				description: act.description,
				rationale,
				simulatedRisk: comp.counterfactualFinalRisk,
				baselineRisk: comp.baselineFinalRisk,
				riskReduction: comp.riskChange,
				compromisedAssets: comp.counterfactualCompromisedAssets,
				preventedCompromises: comp.preventedCompromises,
				preventedEvents: comp.preventedEvents,
				preventedCriticalImpact: comp.preventedCriticalImpact,
				preventedDataExposure: comp.preventedDataExposure,
				confidence,
				simulationStatus: "COMPLETED",
				branchId: branch.branchId,
				score
			};
		});
	}
	/**
	* Generates a deterministic recommendation by ranking all evaluated candidates.
	*/
	generateRecommendation(minute = 22, incidentId = "INC-2048") {
		const candidates = this.evaluateCandidates(minute, incidentId);
		const best = candidates.filter((c) => c.action.type !== "DO_NOTHING").sort((a, b) => b.score - a.score)[0] || candidates[0];
		const alternatives = candidates.filter((c) => c.id !== best.id);
		const timestamp = minuteToTimestamp(minute);
		const evidence = [{
			id: `cit-rec-target-${best.target}`,
			type: best.action.targetType === "USER" ? "USER" : "ASSET",
			label: `Intervention Target: ${best.target}`,
			sourceId: best.target,
			timestamp
		}];
		if (best.preventedEvents.length > 0) best.preventedEvents.slice(0, 3).forEach((pe) => {
			evidence.push({
				id: `cit-rec-prev-${pe.eventId}`,
				type: "COUNTERFACTUAL_EVENT",
				label: `[PREVENTED] ${pe.originalTime} ${pe.title}`,
				sourceId: pe.eventId,
				timestamp: pe.originalTime
			});
		});
		const expectedImpact = `Simulation confirms that ${best.action.label} prevents ${best.preventedEvents.length} future attack stages, shields ${best.preventedCompromises.length} downstream servers (${best.preventedCompromises.join(", ") || "None"}), and reduces final risk from ${best.baselineRisk} to ${best.simulatedRisk}.`;
		const decisionBasis = `Deterministic optimization algorithm assigned highest score (${best.score} pts) based on: ${best.preventedCriticalImpact.length} critical assets protected, ${best.preventedCompromises.length} total compromises avoided, and ${best.preventedDataExposure} sensitive data stores preserved.`;
		return {
			id: `rec-${best.action.type.toLowerCase()}-${minute}`,
			recommendedAction: best.action,
			target: best.target,
			confidence: best.confidence,
			rationale: best.rationale,
			evidence,
			alternatives,
			expectedImpact,
			decisionBasis,
			generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			sourceMinute: minute,
			candidateId: best.id,
			score: best.score
		};
	}
	/**
	* Executes an autonomous simulated response within the synthetic incident model.
	* STRICT SAFETY: No real-world networks or endpoints are touched.
	*/
	autoSimulate(minute = 22, incidentId = "INC-2048") {
		const recommendation = this.generateRecommendation(minute, incidentId);
		const branch = simulateCounterfactualFuture(minute, recommendation.recommendedAction, incidentId);
		const candidates = this.evaluateCandidates(minute, incidentId);
		const candidate = candidates.find((c) => c.action.type === recommendation.recommendedAction.type) || candidates[0];
		return {
			decision: {
				mode: "AUTO_SIMULATE",
				selectedAction: recommendation.recommendedAction,
				target: recommendation.target,
				status: "COMPLETED",
				approved: true,
				recommendationId: recommendation.id,
				timestamp: minuteToTimestamp(minute),
				executedAt: (/* @__PURE__ */ new Date()).toISOString(),
				branchId: branch.branchId
			},
			branch,
			candidate,
			recommendation
		};
	}
	/**
	* Formats a comprehensive natural language investigation response explaining the recommendation.
	*/
	formatRecommendationAnswer(rec) {
		const act = rec.recommendedAction;
		return `[IRIS RESPONSE INTELLIGENCE & RECOMMENDATION]\nIncident: INC-2048 | Timestamp: ${minuteToTimestamp(rec.sourceMinute)} | Confidence: ${rec.confidence}\n\nRECOMMENDED ACTION:\n• Action: ${act.label}\n• Target Entity: ${rec.target}\n• Primary Rationale: ${rec.rationale}\n\nSIMULATED OUTCOME & IMPACT:\n• ${rec.expectedImpact}\n• Decision Optimization: ${rec.decisionBasis}\n\nALTERNATIVES CONSIDERED & COMPARISON:\n` + rec.alternatives.map((alt) => `• ${alt.action.label}: Score ${alt.score} pts | Simulated Risk: ${alt.simulatedRisk} | Prevented: ${alt.preventedCompromises.length} assets (${alt.rationale})`).join("\n") + "\n\nSAFETY NOTICE: SIMULATION ONLY. This decision was evaluated using the Phase 4 counterfactual model. No real host or network infrastructure was modified.";
	}
	/**
	* Formats comparative response candidate options.
	*/
	formatComparisonAnswer(candidates) {
		return `[RESPONSE OPTIONS COMPARISON]\n` + candidates.map((c) => `[${c.action.label}]\n• Target: ${c.target}\n• Final Simulated Risk: ${c.simulatedRisk} (Baseline: ${c.baselineRisk})\n• Prevented Compromises: ${c.preventedCompromises.length} (${c.preventedCompromises.join(", ") || "None"})\n• Prevented Events: ${c.preventedEvents.length} stages\n• Protected Data Stores: ${c.preventedDataExposure}\n• Confidence: ${c.confidence} | Score: ${c.score} pts`).join("\n\n") + `\n\nSAFETY NOTICE: SIMULATION ONLY — All outcomes derived from Phase 4 counterfactual simulation.`;
	}
};
var responseIntelligenceService = new ResponseIntelligenceService();
/**
* Derives the earliest point where meaningful security evidence was available (Requirement 16 & 34).
* Purely data-driven: derives timestamps and delays directly from structured incident telemetry.
*/
function findEarliestDetectableOpportunity() {
	const detectionOppEvent = demoTimelineEvents.find((e) => e.category === "DETECTION_OPPORTUNITY" || e.id === "evt-0947") ?? demoTimelineEvents[2];
	const formalDetectionEvent = demoTimelineEvents.find((e) => e.category === "INCIDENT_ALERT" || e.id === "evt-1024") ?? demoTimelineEvents[demoTimelineEvents.length - 1];
	const earliestOpportunityMinute = detectionOppEvent.minute ?? 5;
	const formalDetectionMinute = formalDetectionEvent.minute ?? 42;
	const detectionDelayMinutes = Math.max(0, formalDetectionMinute - earliestOpportunityMinute);
	const explanation = `The earliest detectable opportunity emerged at ${detectionOppEvent.timestamp} (T+${earliestOpportunityMinute}m) when multiple failed MFA challenges were followed by an anomalous foreign login from an unrecognized ASN. Formal incident detection by SIEM correlation occurred at ${formalDetectionEvent.timestamp} (T+${formalDetectionMinute}m), representing a ${detectionDelayMinutes}-minute detection delay during which lateral movement and database access occurred.`;
	return {
		earliestOpportunityMinute,
		timestamp: detectionOppEvent.timestamp,
		evidenceIds: detectionOppEvent.eventIds || [],
		detectionDelayMinutes,
		formalDetectionTimestamp: formalDetectionEvent.timestamp,
		explanation,
		confidence: "HIGH"
	};
}
var IncidentReportService = class {
	finalizedReports = /* @__PURE__ */ new Map();
	reportVersions = /* @__PURE__ */ new Map();
	actionItemStatuses = /* @__PURE__ */ new Map();
	/**
	* Generates a comprehensive, deterministic post-incident report.
	* Aggregates authoritative outputs from Phase 1 to Phase 5 engines.
	* Purely deterministic for identical incident ID, minute, and options.
	*/
	generateIncidentReport(incidentId = "INC-2048", options = {}) {
		if (this.finalizedReports.has(incidentId) && options.status !== "DRAFT") return this.finalizedReports.get(incidentId);
		const minute = Math.max(0, Math.min(42, options.minute ?? 42));
		const status = options.status ?? "DRAFT";
		const currentVersion = options.version ?? (this.reportVersions.get(incidentId) ?? 0) + 1;
		this.reportVersions.set(incidentId, currentVersion);
		const incidentState = getIncidentStateAtTime(minute);
		const digitalTwin = getActualDigitalTwinState(minute);
		const attackGraph = getAttackGraphAtTime(incidentId, minute);
		const detectionGapData = findEarliestDetectableOpportunity();
		const candidates = responseIntelligenceService.evaluateCandidates(22, incidentId);
		const recommendation = responseIntelligenceService.generateRecommendation(22, incidentId);
		const comp = simulateCounterfactualFuture(22, options.selectedAction || recommendation.recommendedAction, incidentId).comparison;
		const incidentStart = demoTimelineEvents[0]?.timestamp || "09:42";
		const firstDetectableOpportunity = detectionGapData.timestamp || "09:47";
		const confirmedCompromise = "10:00";
		const formalDetection = detectionGapData.formalDetectionTimestamp || "10:24";
		const containmentTime = "10:24";
		const resolutionTime = "10:30";
		const timeline = demoTimelineEvents.filter((e) => (e.minute ?? 0) <= minute).map((e) => {
			let significance = "Operational incident progression signal.";
			if (e.id === "evt-0947") significance = "CRITICAL: Earliest detectable opportunity. Telemetry combination provided high-confidence indicator prior to host compromise.";
			else if (e.id === "evt-1000") significance = "Identity and primary host workstation compromise confirmed. Adversary established foothold.";
			else if (e.id === "evt-1004") significance = "Optimal intervention window: Process-level PowerShell execution observed. Containment here protects server tier.";
			else if (e.id === "evt-1007") significance = "Lateral traversal: SMB session established to internal application server SERVER-03.";
			else if (e.id === "evt-1012") significance = "Critical impact: Database DB-PROD-01 queried; customer identity records exposed.";
			else if (e.id === "evt-1018") significance = "Secondary target: File server FILE-SRV-01 access attempt with staging activity.";
			else if (e.id === "evt-1024") significance = "Formal detection: SIEM correlated multi-stage detection rule fired; incident declared.";
			const isKnownAtTime = (e.minute ?? 0) <= (minute < 42 ? Math.min(minute, 5) : 42);
			const knownAtTime = isKnownAtTime ? `Observed by defenders at ${e.timestamp}` : "Not yet observed by SOC; unassigned telemetry or latent visibility";
			return {
				id: e.id,
				eventId: e.id,
				timestamp: e.timestamp,
				minute: e.minute ?? 0,
				title: e.title,
				category: e.category,
				severity: e.severity,
				affectedAssetId: e.assets?.[0],
				asset: e.assets?.[0],
				affectedUserId: "alex.m",
				user: "alex.m",
				significance,
				evidenceIds: e.eventIds || [],
				attackNodeReferences: e.assets,
				perspective: isKnownAtTime ? "KNOWN_AT_TIME" : "ACTUAL",
				actualOccurrence: `${e.timestamp} (T+${e.minute}m)`,
				knownAtTime,
				description: e.description
			};
		});
		const affectedAssets = digitalTwin.assets.map((a) => {
			let roleInAttack = "Monitored infrastructure asset.";
			let impact = "Normal telemetry operation.";
			if (a.id === "LAPTOP-042") {
				roleInAttack = "Initial compromised workstation; beachhead endpoint used for script execution.";
				impact = "Foothold endpoint; local token extraction.";
			} else if (a.id === "SERVER-03") {
				roleInAttack = "Internal application host reached via lateral SMB/WinRM connection.";
				impact = "Intermediate pivot host; token impersonation.";
			} else if (a.id === "DB-PROD-01") {
				roleInAttack = "Production database target containing customer identity records.";
				impact = "Direct query execution and sensitive database schema exploration.";
			} else if (a.id === "FILE-SRV-01") {
				roleInAttack = "Confidential file repository containing strategic organizational documents.";
				impact = "Directory listing traversal and bulk staging.";
			}
			return {
				id: a.id,
				assetId: a.id,
				name: a.name,
				type: a.type,
				owner: a.owner,
				status: a.status,
				firstAffectedAt: a.status === "COMPROMISED" ? "10:00" : void 0,
				compromiseTimestamp: a.status === "COMPROMISED" ? a.id === "LAPTOP-042" ? "10:00" : a.id === "SERVER-03" ? "10:07" : "10:12" : void 0,
				roleInAttack,
				impact,
				criticality: a.criticality,
				dataExposure: a.id === "DB-PROD-01" ? "Customer profile records in DATA-CUST-VAULT" : a.id === "FILE-SRV-01" ? "Strategic files in DATA-CONF-FILES" : "No direct data repository hosted",
				confidence: "HIGH"
			};
		});
		const affectedUsers = digitalTwin.users.map((u) => ({
			id: u.id,
			userId: u.username || u.id,
			name: u.displayName || u.username || u.id,
			role: u.role,
			department: u.department,
			status: u.status,
			firstSuspiciousAt: "09:42",
			compromisedAt: u.status === "COMPROMISED" ? "10:00" : void 0,
			compromiseTimestamp: u.status === "COMPROMISED" ? "10:00" : void 0,
			securityImpact: "Corporate identity credentials replayed by adversary; session tokens abused for SSO access.",
			relevantEvents: [
				"evt-0942",
				"evt-0947",
				"evt-1000",
				"evt-1004"
			],
			evidenceIds: [
				"ev-idp-0942",
				"ev-idp-0947",
				"ev-host-1000"
			],
			confidence: "HIGH"
		}));
		const traversalSequence = [
			"ATTACKER",
			"ALEX_ACCOUNT",
			"LAPTOP-042",
			"SERVER-03",
			"DB-PROD-01"
		];
		if (minute >= 36) traversalSequence.push("FILE-SRV-01");
		const attackPath = {
			entryPoint: "ATTACKER",
			compromisedUser: "alex.m",
			initialEndpoint: "LAPTOP-042",
			lateralMovement: "SERVER-03 via WinRM/SMB",
			internalServer: "SERVER-03",
			database: "DB-PROD-01",
			fileServer: minute >= 36 ? "FILE-SRV-01" : void 0,
			sensitiveResources: ["DATA-CUST-VAULT", "DATA-CONF-FILES"],
			finalImpact: "Unauthorized query extraction against production customer database and file staging.",
			hopsCount: traversalSequence.length - 1,
			compromisedNodesCount: digitalTwin.blastRadius.confirmedAffectedAssets,
			criticalNodesReached: ["DB-PROD-01"],
			downstreamReachableSystems: ["FILE-SRV-01", "BACKUP-VAULT"],
			traversalSequence,
			segments: attackGraph.edges.map((e) => ({
				source: e.source,
				destination: e.target,
				relationship: e.relationship || e.relationshipType || "CONNECTED",
				timestamp: e.firstSeen,
				evidenceId: e.evidenceIds[0] || "",
				confidence: e.confidence
			})),
			description: "The adversary gained initial unauthorized credential access against user alex.m, established an interactive command session on workstation LAPTOP-042, laterally traversed to internal server SERVER-03 via administrative session, and directly executed extraction queries against database DB-PROD-01.",
			confidence: "HIGH"
		};
		const evidence = digitalTwin.evidence.map((ev) => ({
			id: ev.id,
			evidenceId: ev.id,
			type: ev.type,
			timestamp: ev.timestamp,
			source: ev.source,
			description: ev.content,
			relatedEvent: ev.type === "AUTHENTICATION" ? "evt-0947" : ev.type === "PROCESS" ? "evt-1004" : "evt-1012",
			relatedAsset: ev.relatedAssetId || ev.assetId,
			relatedUser: ev.relatedUserId,
			attackNode: ev.relatedAssetId || ev.assetId || "ALEX_ACCOUNT",
			significance: ev.type === "AUTHENTICATION" ? "Unusual foreign location authentication telemetry." : ev.type === "PROCESS" ? "Suspicious base64-encoded command execution telemetry." : ev.type === "NETWORK" ? "Internal SMB/WinRM lateral traversal NetFlow record." : "Database table extraction audit query event.",
			confidence: "HIGH",
			content: ev.content
		}));
		const detectionGap = {
			earliestSuspiciousActivity: "09:42",
			earliestDetectableOpportunity: detectionGapData.timestamp || "09:47",
			formalDetection: detectionGapData.formalDetectionTimestamp || "10:24",
			delayMinutes: detectionGapData.detectionDelayMinutes,
			detectionDelay: `${detectionGapData.detectionDelayMinutes} minutes`,
			potentialDetectionOpportunity: "09:47 UTC via Auth0 MFA fatigue & unrecognized ASN correlation",
			signalsAvailableBeforeDetection: [
				"09:42 Unusual authentication from unrecognized foreign IP (198.51.100.42)",
				"09:47 Multiple MFA prompt failures followed by single acceptance from off-hours ASN",
				"10:04 High-entropy base64 PowerShell invocation spawned from user context",
				"10:07 Workstation-to-server SMB port 445 network traffic across internal VLAN boundary"
			],
			missedSignals: [
				"Unfamiliar foreign IP address (198.51.100.42) outside corporate geo-velocity thresholds",
				"Multiple failed sign-in attempts within 3 minutes followed by successful authentication",
				"Absence of automated risk-based conditional access step-up challenge"
			],
			whatSocKnew: "At 09:47, security monitoring only registered fragmented identity warnings categorized as low-severity anomalies. At 10:04, endpoint execution alerts remained unassigned in queue.",
			whatActuallyHappened: "The adversary successfully validated stolen credentials, initiated interactive access, compromised LAPTOP-042, and prepared lateral movement tools unhindered.",
			confidence: "HIGH"
		};
		const knownSecurityState = {
			asOfMinute: minute,
			asOfTime: minuteToTimestamp(minute),
			knownSeverity: minute < 5 ? "LOW" : minute < 18 ? "MEDIUM" : minute < 42 ? "HIGH" : "CRITICAL",
			knownCompromisedAssetIds: minute < 18 ? [] : minute < 25 ? ["LAPTOP-042"] : minute < 30 ? ["LAPTOP-042", "SERVER-03"] : [
				"LAPTOP-042",
				"SERVER-03",
				"DB-PROD-01"
			],
			unobservedThreats: minute < 25 ? ["SERVER-03 lateral traversal undetected by perimeter sensors"] : minute < 30 ? ["DB-PROD-01 database extraction ongoing in unmonitored SQL session"] : [],
			visibilityMilestones: [
				{
					timestamp: "09:47",
					minute: 5,
					actualState: "Credential replay validated; adversary preparing session token.",
					knownSecurityState: "IdP flagged isolated low-confidence geographical anomaly.",
					gap: "SOC unaware of active attacker interaction.",
					telemetryAvailable: "Auth0 authentication logs"
				},
				{
					timestamp: "10:00",
					minute: 18,
					actualState: "Workstation LAPTOP-042 compromised by attacker.",
					knownSecurityState: "Standard employee interactive login logged.",
					gap: "Logon treated as benign employee activity.",
					telemetryAvailable: "Windows Event ID 4624"
				},
				{
					timestamp: "10:04",
					minute: 22,
					actualState: "PowerShell beaconing and base64 download cradle executed.",
					knownSecurityState: "EDR telemetry queued; no analyst triage initiated.",
					gap: "Crucial 20-minute response opportunity missed.",
					telemetryAvailable: "EDR process spawn log"
				},
				{
					timestamp: "10:07",
					minute: 25,
					actualState: "Lateral traversal to internal server SERVER-03 via SMB.",
					knownSecurityState: "Internal network traffic uninspected by boundary firewall.",
					gap: "Adversary footholds internal application server without alert.",
					telemetryAvailable: "NetFlow connection log"
				},
				{
					timestamp: "10:12",
					minute: 30,
					actualState: "PostgreSQL customer database queried on DB-PROD-01.",
					knownSecurityState: "Application-to-database connection assumed routine traffic.",
					gap: "Active exfiltration underway unbeknownst to security operations.",
					telemetryAvailable: "PostgreSQL query audit log"
				},
				{
					timestamp: "10:18",
					minute: 36,
					actualState: "Confidential design archive access attempt on FILE-SRV-01.",
					knownSecurityState: "File server access logs uninspected in real time.",
					gap: "Adversary attempting secondary data repository access.",
					telemetryAvailable: "SMB file access audit log"
				},
				{
					timestamp: "10:24",
					minute: 42,
					actualState: "Full compromise of 4 hosts across endpoint, app, and data tiers.",
					knownSecurityState: "Formal SIEM incident alert triggered: CRITICAL credential compromise.",
					gap: "Incident finally declared 37 minutes after first detectable signal.",
					telemetryAvailable: "SIEM correlated alert"
				}
			],
			confidence: "HIGH"
		};
		const actualImpact = {
			compromisedAssetsCount: digitalTwin.blastRadius.confirmedAffectedAssets,
			compromisedAssetIds: digitalTwin.assets.filter((a) => a.status === "COMPROMISED").map((a) => a.id),
			criticalAssetsAffected: ["DB-PROD-01"],
			dataResourcesAffected: ["DATA-CUST-VAULT", "DATA-CONF-FILES"],
			dataStoresAffected: 2,
			attackStagesReached: [
				"SUSPICIOUS_ACTIVITY",
				"ACCOUNT_COMPROMISED",
				"LATERAL_MOVEMENT",
				"DATA_ACCESS",
				"INCIDENT_DETECTED"
			],
			finalRisk: incidentState.risk,
			detectionDelayMinutes: detectionGapData.detectionDelayMinutes,
			blastRadiusConfirmed: digitalTwin.blastRadius.confirmedAffectedAssets,
			affectedUsers: ["alex.m"],
			sensitiveResourcesAccessed: ["DATA-CUST-VAULT", "DATA-CONF-FILES"],
			incidentDurationMinutes: 42
		};
		const counterfactualAnalysis = {
			interventionTime: "10:04",
			interventionMinute: 22,
			recommendedAction: recommendation.recommendedAction,
			preventedEvents: comp.preventedEvents,
			preventedCompromises: comp.preventedCompromises,
			protectedAssets: comp.preventedCompromises,
			protectedCriticalAssets: comp.preventedCriticalImpact,
			protectedDataExposureCount: comp.preventedDataExposure,
			riskReduction: comp.riskChange,
			alternateFinalRisk: comp.counterfactualFinalRisk,
			attackPathChanges: "Lateral pivot edge (LAPTOP-042 → SERVER-03) dropped; DB-PROD-01 unreached.",
			simulatedOutcome: "Simulated host isolation prevents lateral traversal to internal servers and eliminates all database querying.",
			causalExplanation: "Isolating LAPTOP-042 at 10:04 severs outbound network connectivity, breaking the attack graph lateral traversal edge to SERVER-03 and preventing downstream access to DB-PROD-01 and FILE-SRV-01.",
			confidence: "HIGH"
		};
		const responseAnalysis = {
			evaluatedActions: candidates,
			recommendedAction: recommendation.recommendedAction,
			recommendationConfidence: recommendation.confidence,
			alternativeActions: [
				{
					label: "Option 0 — Do Nothing (Baseline)",
					risk: "CRITICAL",
					preventedCount: 0,
					tradeoff: "Passive observation results in complete lateral compromise of database and file server with CRITICAL final risk."
				},
				{
					label: "Option B — Disable User Account (alex.m)",
					risk: "MEDIUM",
					preventedCount: 3,
					tradeoff: "Revokes identity tokens but leaves active interactive processes and established sockets running on LAPTOP-042."
				},
				{
					label: "Option C — Block Lateral Connection (LAPTOP-042 → SERVER-03)",
					risk: "MEDIUM",
					preventedCount: 3,
					tradeoff: "Isolates application server tier but leaves originating endpoint actively compromised without host remediation."
				}
			],
			alternativesConsidered: [
				{
					label: "Option 0 — Do Nothing (Baseline)",
					risk: "CRITICAL",
					preventedCount: 0,
					tradeoff: "Passive observation results in complete lateral compromise of database and file server with CRITICAL final risk."
				},
				{
					label: "Option B — Disable User Account (alex.m)",
					risk: "MEDIUM",
					preventedCount: 3,
					tradeoff: "Revokes identity tokens but leaves active interactive processes and established sockets running on LAPTOP-042."
				},
				{
					label: "Option C — Block Lateral Connection (LAPTOP-042 → SERVER-03)",
					risk: "MEDIUM",
					preventedCount: 3,
					tradeoff: "Isolates application server tier but leaves originating endpoint actively compromised without host remediation."
				}
			],
			rationale: recommendation.rationale,
			decisionBasis: recommendation.decisionBasis,
			expectedImpactReduction: "Prevents 3 downstream attack stages and saves 3 assets from compromise.",
			humanApprovalRequired: true,
			humanApprovalState: "APPROVED",
			autoSimulateUsed: false,
			simulatedBranchCreated: true,
			simulatedOutcome: recommendation.expectedImpact
		};
		const rootCause = {
			directCause: "Compromise of employee alex.m credentials followed by interactive script execution on workstation LAPTOP-042.",
			contributingFactors: [
				"Absence of automated step-up MFA challenge upon foreign IP authentication anomaly at 09:47.",
				"Local administrator privileges assigned to standard workstation user profile.",
				"Unrestricted East-West network access between workstation VLAN and tier-1 server VLAN on SMB/WinRM ports.",
				"Siloed telemetry: Identity anomaly and endpoint process alerts were not correlated into a unified incident queue."
			],
			detectionGapSummary: "A 37-minute delay occurred between the earliest detectable opportunity (09:47) and formal incident declaration (10:24).",
			responseGapSummary: "Containment actions were not initiated until after full database access occurred; counterfactual simulation demonstrates that executing isolation at 10:04 would have averted all critical database impacts.",
			structuredFindings: [
				{
					id: "rc-1",
					category: "Initial Access",
					finding: "Adversary used stolen credentials from unfamiliar foreign IP to gain initial foothold.",
					evidence: ["ev-idp-0942", "ev-idp-0947"],
					confidence: "HIGH",
					isObservedFact: true
				},
				{
					id: "rc-2",
					category: "Endpoint Security",
					finding: "Workstation permitted base64-encoded PowerShell process execution without script block logging blocking.",
					evidence: ["ev-host-1004"],
					confidence: "HIGH",
					isObservedFact: true
				},
				{
					id: "rc-3",
					category: "Lateral Movement",
					finding: "Workstation was permitted direct SMB/WinRM access into tier-1 application infrastructure.",
					evidence: ["ev-net-1007"],
					confidence: "HIGH",
					isObservedFact: true
				},
				{
					id: "rc-4",
					category: "Detection Gap",
					finding: "The 37-minute delay between early IdP warnings and formal EDR declaration allowed deep database penetration.",
					evidence: ["ev-idp-0947", "ev-host-1024"],
					confidence: "HIGH",
					isObservedFact: false
				}
			]
		};
		const whatWeMissed = {
			earliestSignal: "09:42 UTC — Authentication attempt from unfamiliar foreign IP address (198.51.100.42).",
			earliestDetectableOpportunity: "09:47 UTC — Composite anomaly: Unfamiliar location combined with repeated failed logons.",
			detectionDelay: "37 minutes (09:47 → 10:24).",
			telemetryExisted: [
				"IdP sign-in logs with geographic anomaly metadata (Kyiv, UA).",
				"Windows Event ID 4624 (Successful Network Logon) from non-corporate subnet.",
				"Sysmon Event ID 1 (Process Creation) for base64 encoded PowerShell script execution."
			],
			whatWasNotRecognized: [
				"The 09:47 IdP risk signal was treated as an isolated informational event rather than an active credential compromise.",
				"The 10:04 PowerShell invocation did not trigger automatic behavioral quarantine.",
				"East-West SMB traffic from a workstation to internal application servers was not flagged as anomalous traversal."
			],
			interventionOpportunity: "Simulated response demonstrates that host isolation at 10:04 severs all lateral attack edges before SERVER-03 compromise.",
			missedSignalsList: [
				{
					id: "ms-1",
					timestamp: "09:47",
					signal: "Multiple failed MFA challenges followed by successful foreign ASN login",
					whatDefendersCouldHaveObserved: "Identity provider risk event indicating impossible travel / credential replay",
					relatedEvidence: "ev-idp-0947",
					relatedAsset: "LAPTOP-042",
					relatedUser: "alex.m",
					potentialResponseOpportunity: "Force immediate password reset and invalidate active SSO refresh tokens",
					confidence: "HIGH"
				},
				{
					id: "ms-2",
					timestamp: "10:04",
					signal: "Base64-encoded PowerShell download cradle spawned by user session",
					whatDefendersCouldHaveObserved: "EDR process execution event with high entropy arguments",
					relatedEvidence: "ev-host-1004",
					relatedAsset: "LAPTOP-042",
					relatedUser: "alex.m",
					potentialResponseOpportunity: "Isolate LAPTOP-042 from network immediately, severing lateral movement",
					confidence: "HIGH"
				},
				{
					id: "ms-3",
					timestamp: "10:07",
					signal: "Outbound SMB connection from workstation to internal server SERVER-03",
					whatDefendersCouldHaveObserved: "Internal network flow crossing trust zones on port 445",
					relatedEvidence: "ev-net-1007",
					relatedAsset: "SERVER-03",
					relatedUser: "alex.m",
					potentialResponseOpportunity: "Block lateral traffic and isolate destination server",
					confidence: "HIGH"
				}
			]
		};
		const lessonsLearned = [
			{
				id: "ll-1",
				lessonId: "ll-1",
				category: "Detection",
				title: "Cross-Domain Telemetry Correlation",
				lesson: "Correlate authentication anomalies with initial endpoint process creation within 5 minutes.",
				description: "Correlation between identity provider anomalies and initial process execution must happen automatically.",
				observation: "IdP and EDR alerts remained siloed for 37 minutes, allowing the attacker to establish interactive persistence.",
				evidence: ["ev-idp-0947", "ev-host-1004"],
				impactIfApplied: "Reduces mean time to detect (MTTD) from 37 minutes to under 5 minutes, preventing host compromise.",
				confidence: "HIGH"
			},
			{
				id: "ll-2",
				lessonId: "ll-2",
				category: "Endpoint",
				title: "Behavioral Script Interpreter Blocking",
				lesson: "Suspicious PowerShell activity should receive earlier investigation and behavioral containment.",
				description: "Encoded commands and script execution cradles must be quarantined automatically.",
				observation: "Adversary executed base64-encoded PowerShell download cradle on LAPTOP-042 without triggering behavioral blocking.",
				evidence: ["ev-host-1004"],
				impactIfApplied: "Blocks reconnaissance scripts at launch, containing the threat to identity revocation only.",
				confidence: "HIGH"
			},
			{
				id: "ll-3",
				lessonId: "ll-3",
				category: "Lateral Movement",
				title: "Workstation-to-Server Network Isolation",
				lesson: "Segment workstation VLANs from internal application and database server management ports.",
				description: "Zero Trust micro-segmentation should block direct workstation SMB/WinRM into server infrastructure.",
				observation: "Direct SMB and WinRM connectivity existed between employee laptop LAPTOP-042 and internal server SERVER-03.",
				evidence: ["ev-net-1007"],
				impactIfApplied: "Eliminates the lateral movement vector even if an endpoint becomes fully compromised.",
				confidence: "HIGH"
			},
			{
				id: "ll-4",
				lessonId: "ll-4",
				category: "Response",
				title: "Automated Endpoint Isolation Delegation",
				lesson: "Empower Tier-1 SOC analysts with pre-approved one-click endpoint isolation playbooks.",
				description: "Authorization friction must not delay endpoint quarantine when high-confidence signals align.",
				observation: "Analysts hesitated during the 10:04 window awaiting manual tier-2 escalation approval.",
				evidence: ["ev-host-1004"],
				impactIfApplied: "Reduces containment decision latency from 20 minutes to under 60 seconds.",
				confidence: "HIGH"
			},
			{
				id: "ll-5",
				lessonId: "ll-5",
				category: "Identity",
				title: "Adaptive Risk-Based Authentication",
				lesson: "Enforce adaptive conditional access requiring FIDO2 WebAuthn challenges for foreign IP sessions.",
				description: "Untrusted networks and unusual geographic logins must require phishing-resistant credentials.",
				observation: "Attacker successfully authenticated using stolen session tokens from an anomalous geographical location.",
				evidence: ["ev-idp-0942", "ev-idp-0947"],
				impactIfApplied: "Stops initial access at 09:42 before any internal organizational token is minted.",
				confidence: "HIGH"
			},
			{
				id: "ll-6",
				lessonId: "ll-6",
				category: "Data Protection",
				title: "Database Tier Connection Brokering",
				lesson: "Implement database connection brokers requiring service-account-only authentication.",
				description: "Interactive employee accounts must never have direct TCP connectivity to production databases.",
				observation: "The adversary queried production customer tables directly from internal application host SERVER-03.",
				evidence: ["ev-db-1012"],
				impactIfApplied: "Protects customer database vault (DATA-CUST-VAULT) from direct interactive SQL extraction.",
				confidence: "HIGH"
			}
		];
		const recommendations = [
			{
				id: "rec-1",
				recommendationId: "rec-1",
				category: "DETECTION",
				title: "Automated IdP to EDR SIEM Correlation",
				recommendation: "Implement automated SIEM correlation rule linking foreign IdP anomalies with EDR process spawns.",
				description: "Configure real-time stream correlation linking Auth0 anomaly webhooks with CrowdStrike/EDR process launch alerts.",
				reason: "Eliminates the 37-minute detection gap observed between 09:47 and 10:24.",
				relatedEvidence: ["ev-idp-0947", "ev-host-1004"],
				evidenceIds: ["ev-idp-0947", "ev-host-1004"],
				expectedBenefit: "Automated alert correlation within 3 minutes of credential compromise.",
				priority: "HIGH",
				relatedFinding: "Detection Gap Analysis (37 min delay)",
				confidence: "HIGH"
			},
			{
				id: "rec-2",
				recommendationId: "rec-2",
				category: "ENDPOINT",
				title: "EDR Behavioral Blocking on Encoded Scripts",
				recommendation: "Deploy EDR behavioral blocking for encoded PowerShell arguments and non-standard parent processes.",
				description: "Enforce script block logging and automated quarantine on high-entropy base64 commands.",
				reason: "Prevents execution of download cradles used to stage reconnaissance tools.",
				relatedEvidence: ["ev-host-1004"],
				evidenceIds: ["ev-host-1004"],
				expectedBenefit: "Immediate termination of suspicious command interpreters.",
				priority: "HIGH",
				relatedFinding: "workstation LAPTOP-042 encoded command execution",
				confidence: "HIGH"
			},
			{
				id: "rec-3",
				recommendationId: "rec-3",
				category: "NETWORK",
				title: "Workstation-to-Server East-West Micro-segmentation",
				recommendation: "Enforce micro-segmentation firewall rules dropping port 445/5985 traffic between workstation and server tiers.",
				description: "Sever direct TCP 445 and 5985 paths from end-user devices to production application subnets.",
				reason: "Severing the lateral movement edge protects SERVER-03 and downstream database systems.",
				relatedEvidence: ["ev-net-1007"],
				evidenceIds: ["ev-net-1007"],
				expectedBenefit: "Prevents lateral traversal across network boundaries.",
				priority: "HIGH",
				relatedFinding: "Lateral movement from LAPTOP-042 to SERVER-03",
				confidence: "HIGH"
			},
			{
				id: "rec-4",
				recommendationId: "rec-4",
				category: "IDENTITY",
				title: "FIDO2 Phishing-Resistant Step-Up Challenge",
				recommendation: "Configure risk-based conditional access policy requiring biometric MFA on impossible travel alerts.",
				description: "Prompt user for hardware token verification when authentication origin deviates from baseline.",
				reason: "Stolen credential replay from foreign IPs would be challenged and blocked at 09:42.",
				relatedEvidence: ["ev-idp-0942", "ev-idp-0947"],
				evidenceIds: ["ev-idp-0942", "ev-idp-0947"],
				expectedBenefit: "Pre-compromise containment of compromised passwords.",
				priority: "HIGH",
				relatedFinding: "Initial unauthorized authentication at 09:42",
				confidence: "HIGH"
			},
			{
				id: "rec-5",
				recommendationId: "rec-5",
				category: "DATA_PROTECTION",
				title: "Database Activity Monitoring (DAM) & Vault Auditing",
				recommendation: "Implement database activity monitoring (DAM) alerting on abnormal bulk SELECT queries.",
				description: "Detect anomaly volume spikes in queries targeting customer profile vaults.",
				reason: "Immediate detection of extraction behavior on DB-PROD-01 even if lateral movement succeeds.",
				relatedEvidence: ["ev-db-1012"],
				evidenceIds: ["ev-db-1012"],
				expectedBenefit: "Immediate containment before data exfiltration completes.",
				priority: "HIGH",
				relatedFinding: "DB-PROD-01 database query event at 10:12",
				confidence: "HIGH"
			},
			{
				id: "rec-6",
				recommendationId: "rec-6",
				category: "INCIDENT_RESPONSE",
				title: "Simulation Lab Drills for Rapid Isolation",
				recommendation: "Conduct periodic SOC drills on 10:04 endpoint isolation playbooks in Simulation Lab.",
				description: "Exercise analyst workflows for validating counterfactual branches and executing rapid network isolation.",
				reason: "Ensures operational readiness and reduces human approval hesitation during live incidents.",
				relatedEvidence: ["ev-host-1004"],
				evidenceIds: ["ev-host-1004"],
				expectedBenefit: "Reduces mean time to contain (MTTC) by 75%.",
				priority: "MEDIUM",
				relatedFinding: "Simulation Lab response evaluation",
				confidence: "HIGH"
			}
		];
		const existingStatuses = this.actionItemStatuses.get(incidentId) || /* @__PURE__ */ new Map();
		const baseActionItems = [
			{
				id: "act-1",
				title: "Deploy IdP + EDR SIEM Correlation Rule",
				action: "Deploy SIEM correlation rule linking Auth0 foreign logins with EDR process alerts",
				description: "Create real-time query in SIEM alerting when impossible travel is followed by script launch within 30m.",
				category: "DETECTION",
				ownerRole: "SOC Engineering",
				priority: "HIGH",
				relatedFinding: "09:47 detection opportunity",
				sourceFinding: "37-minute detection delay",
				expectedOutcome: "Sub-5-minute detection of multi-tier compromise.",
				status: existingStatuses.get("act-1") || "OPEN",
				rationale: "Automates the connection between identity and endpoint events."
			},
			{
				id: "act-2",
				title: "Block Encoded PowerShell Execution",
				action: "Update EDR policy to block -EncodedCommand PowerShell invocations on endpoints",
				description: "Enforce host restriction policy preventing execution of base64-encoded script commands.",
				category: "ENDPOINT",
				ownerRole: "Endpoint Team",
				priority: "HIGH",
				relatedFinding: "10:04 LAPTOP-042 execution",
				sourceFinding: "Suspicious PowerShell beaconing",
				expectedOutcome: "Immediate containment of malicious download cradle.",
				status: existingStatuses.get("act-2") || "OPEN",
				rationale: "Prevents script execution by compromised accounts."
			},
			{
				id: "act-3",
				title: "Enforce Workstation East-West Firewall Rules",
				action: "Deploy internal firewall ACL blocking East-West SMB traffic from workstations",
				description: "Restrict port 445/5985 traffic so workstations cannot initiate inbound sessions to server VLAN.",
				category: "NETWORK",
				ownerRole: "Network Security Team",
				priority: "HIGH",
				relatedFinding: "10:07 lateral movement",
				sourceFinding: "Unrestricted lateral SMB traversal",
				expectedOutcome: "Eliminates lateral jump from endpoints to servers.",
				status: existingStatuses.get("act-3") || "OPEN",
				rationale: "Stops lateral pivot to SERVER-03."
			},
			{
				id: "act-4",
				title: "Revoke Compromised Credentials for alex.m",
				action: "Review and revoke active directory privileges for compromised user alex.m",
				description: "Terminate all active OAuth tokens, reset password, and re-enroll MFA token.",
				category: "IDENTITY",
				ownerRole: "Identity Team",
				priority: "HIGH",
				relatedFinding: "10:00 account compromise",
				sourceFinding: "Stolen employee credential session",
				expectedOutcome: "Invalidates all active attacker sessions across enterprise.",
				status: existingStatuses.get("act-4") || "COMPLETED",
				rationale: "Ensures credential invalidation across all enterprise systems."
			},
			{
				id: "act-5",
				title: "Conduct Rapid Isolation Drills in Simulation Lab",
				action: "Conduct SOC drill on 10:04 endpoint isolation workflow in Simulation Lab",
				description: "Train Tier-1 analysts on counterfactual branch analysis and rapid endpoint isolation approval.",
				category: "INCIDENT_RESPONSE",
				ownerRole: "Incident Response Team",
				priority: "MEDIUM",
				relatedFinding: "Phase 4 simulation results",
				sourceFinding: "Containment delay",
				expectedOutcome: "Analysts achieve sub-60-second response execution.",
				status: existingStatuses.get("act-5") || "OPEN",
				rationale: "Trains analysts on rapid containment playbooks."
			}
		];
		const learningMetrics = {
			detectionDelayMinutes: detectionGapData.detectionDelayMinutes,
			actualCompromisedAssets: digitalTwin.blastRadius.confirmedAffectedAssets,
			counterfactualCompromisedAssets: comp.counterfactualCompromisedAssets.length,
			criticalAssetsAffected: comp.baselineCriticalAssets.length,
			counterfactualCriticalAssetsAffected: comp.counterfactualCriticalAssets.length,
			preventedEventsCount: comp.preventedCount,
			potentialDataStoresExposed: comp.baselineDataResourcesAtRisk,
			counterfactualDataStoresExposed: comp.counterfactualDataResourcesAtRisk,
			responseEffectivenessScore: recommendation.score > 200 ? 88 : 65
		};
		const citations = [
			{
				id: "cit-rpt-start",
				type: "TIMELINE_EVENT",
				label: "09:42 Unusual Authentication",
				sourceId: "evt-0942",
				timestamp: "09:42",
				minute: 0
			},
			{
				id: "cit-rpt-opp",
				type: "DETECTION_OPPORTUNITY",
				label: "09:47 First Detectable Opportunity",
				sourceId: "evt-0947",
				timestamp: "09:47",
				minute: 5
			},
			{
				id: "cit-rpt-laptop",
				type: "ASSET",
				label: "LAPTOP-042 (Workstation)",
				sourceId: "LAPTOP-042",
				timestamp: "10:00"
			},
			{
				id: "cit-rpt-user",
				type: "USER",
				label: "alex.m (Compromised Account)",
				sourceId: "alex.m",
				timestamp: "10:00"
			},
			{
				id: "cit-rpt-server",
				type: "ASSET",
				label: "SERVER-03 (Internal Server)",
				sourceId: "SERVER-03",
				timestamp: "10:07"
			},
			{
				id: "cit-rpt-db",
				type: "ASSET",
				label: "DB-PROD-01 (Customer Database)",
				sourceId: "DB-PROD-01",
				timestamp: "10:12"
			},
			{
				id: "cit-rpt-prev-1007",
				type: "COUNTERFACTUAL_EVENT",
				label: "[PREVENTED] 10:07 Internal Server Access",
				sourceId: "evt-1007",
				timestamp: "10:07"
			},
			{
				id: "cit-rpt-prev-1012",
				type: "COUNTERFACTUAL_EVENT",
				label: "[PREVENTED] 10:12 Database Access",
				sourceId: "evt-1012",
				timestamp: "10:12"
			},
			{
				id: "cit-rpt-prev-1018",
				type: "COUNTERFACTUAL_EVENT",
				label: "[PREVENTED] 10:18 Sensitive File Access Attempt",
				sourceId: "evt-1018",
				timestamp: "10:18"
			}
		];
		const executiveSummaryNarrative = "On the morning of the incident, a credential compromise targeting employee alex.m progressed from initial suspicious authentication anomalies at 09:42 to host compromise of workstation LAPTOP-042 at 10:00. The adversary subsequently achieved lateral movement to internal application server SERVER-03 at 10:07, accessed sensitive customer tables on database DB-PROD-01 at 10:12, and staged 37 confidential files on FILE-SRV-01 at 10:18 prior to formal SOC incident declaration at 10:24 (a 37-minute detection delay). Deterministic Phase 4 counterfactual modeling confirms that early intervention (Option A — Isolate LAPTOP-042 at 10:04) would have completely protected SERVER-03, DB-PROD-01, and FILE-SRV-01, preventing 3 downstream attack stages and reducing final organizational risk from CRITICAL to MEDIUM.";
		const executiveSummaryDetails = {
			incidentType: "Credential Compromise & Lateral Movement",
			initialAttackSignal: "09:42 Unusual foreign authentication attempt",
			initialCompromise: "10:00 alex.m interactive session established on LAPTOP-042",
			lateralMovement: "10:07 WinRM/SMB traversal from LAPTOP-042 to SERVER-03",
			dataAccess: "10:12 Privileged query against customer tables in DB-PROD-01",
			detection: "10:24 Formal SIEM alert escalation",
			overallImpact: "4 compromised hosts, 1 critical database accessed, CRITICAL final risk",
			responseOpportunity: "10:04 Earliest high-confidence intervention window on LAPTOP-042",
			counterfactualOutcome: "Isolating LAPTOP-042 prevents all downstream database and file intrusions, reducing risk to MEDIUM",
			fullNarrative: executiveSummaryNarrative
		};
		const metadata = {
			reportId: `rpt-${incidentId}-${minute}`,
			incidentId,
			incidentTitle: "INC-2048 Credential Compromise & Lateral Movement Resolution Report",
			organizationName: "ACME Corporation",
			generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			incidentStart,
			incidentEnd: formalDetection,
			currentInvestigationTime: minuteToTimestamp(minute),
			status,
			version: currentVersion
		};
		const incidentClassification = {
			category: "Credential Compromise",
			incidentType: "Credential Compromise & Lateral Movement",
			initialAccessVector: "Anomalous authentication from unfamiliar foreign IP (198.51.100.42)",
			primaryCompromisedIdentity: "alex.m",
			initialCompromisedEndpoint: "LAPTOP-042",
			lateralMovement: "Admin session to internal server SERVER-03 over SMB/WinRM",
			dataAccess: "Direct SQL queries against DATA-CUST-VAULT and file staging on FILE-SRV-01",
			detectionMethod: "Multi-stage correlation rule (EDR + IdP + Database audit logs)",
			finalSeverity: incidentState.risk,
			status: "CONTAINED",
			attackStage: incidentState.stage,
			affectedSystems: digitalTwin.blastRadius.confirmedAffectedAssets,
			affectedUsers: 1,
			dataImpact: "Customer profile vault and strategic internal documents accessed",
			detectionStatus: "DECLARED"
		};
		const report = {
			id: `rpt-${incidentId}-${minute}`,
			incidentId,
			title: "INC-2048 Credential Compromise & Lateral Movement Resolution Report",
			organization: "ACME Corporation",
			generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			incidentStart,
			firstDetectableOpportunity,
			confirmedCompromise,
			formalDetection,
			containmentTime,
			resolutionTime,
			executiveSummary: executiveSummaryNarrative,
			executiveSummaryDetails,
			metadata,
			incidentClassification,
			severity: incidentState.risk,
			timeline,
			affectedAssets,
			affectedUsers,
			attackPath,
			evidence,
			knownSecurityState,
			detectionGap,
			actualImpact,
			counterfactualAnalysis,
			responseAnalysis,
			rootCause,
			whatWeMissed,
			lessonsLearned,
			recommendations,
			actionItems: baseActionItems,
			learningMetrics,
			confidence: "HIGH",
			citations,
			reportStatus: status,
			version: currentVersion,
			snapshotMinute: minute
		};
		if (status === "FINAL") this.finalizedReports.set(incidentId, report);
		return report;
	}
	/**
	* Finalizes an incident report, freezing its snapshot in memory.
	*/
	finalizeReport(incidentId = "INC-2048", report) {
		const existingFinal = this.finalizedReports.get(incidentId);
		if (existingFinal) return existingFinal;
		const base = report || this.generateIncidentReport(incidentId, { status: "FINAL" });
		const finalized = Object.freeze({
			...base,
			reportStatus: "FINAL",
			generatedAt: base.generatedAt || (/* @__PURE__ */ new Date()).toISOString()
		});
		this.finalizedReports.set(incidentId, finalized);
		return finalized;
	}
	/**
	* Archives an incident report.
	*/
	archiveReport(incidentId = "INC-2048") {
		const existing = this.finalizedReports.get(incidentId);
		if (existing) {
			const archived = {
				...existing,
				reportStatus: "ARCHIVED"
			};
			this.finalizedReports.set(incidentId, archived);
			return archived;
		}
	}
	/**
	* Updates the status of an action item in memory without modifying historical facts.
	*/
	updateActionItemStatus(incidentId = "INC-2048", actionItemId, newStatus) {
		let map = this.actionItemStatuses.get(incidentId);
		if (!map) {
			map = /* @__PURE__ */ new Map();
			this.actionItemStatuses.set(incidentId, map);
		}
		map.set(actionItemId, newStatus);
	}
	/**
	* Creates an immutable ReportSnapshot from an IncidentReport.
	*/
	createSnapshot(report) {
		return Object.freeze({
			snapshotId: `snap-${report.id}-${Date.now()}`,
			incidentId: report.incidentId,
			snapshotMinute: report.snapshotMinute,
			capturedAt: (/* @__PURE__ */ new Date()).toISOString(),
			investigationTime: report.metadata.currentInvestigationTime,
			actualRisk: report.severity,
			knownRisk: report.knownSecurityState.knownSeverity,
			compromisedAssetsCount: report.actualImpact.compromisedAssetsCount,
			report
		});
	}
	/**
	* Retrieves an existing finalized report, if one exists.
	*/
	getFinalizedReport(incidentId = "INC-2048") {
		return this.finalizedReports.get(incidentId);
	}
	/**
	* Clears the finalized report cache for testing.
	*/
	clearFinalizedCache() {
		this.finalizedReports.clear();
		this.actionItemStatuses.clear();
	}
};
var incidentReportService = new IncidentReportService();
var SIMULATION_SPEEDS = [
	.5,
	1,
	2,
	5,
	10
];
var STORAGE_KEYS = {
	SPEED: "itm_simulation_speed",
	DEMO_MODE: "itm_demo_mode",
	LAST_TIME: "itm_last_simulation_time",
	LAST_INCIDENT: "itm_last_incident_id"
};
function getTickIntervalMs(speed) {
	return Math.round(1e3 / Math.max(.1, speed || 1));
}
function saveSimulationSpeed(speed) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEYS.SPEED, String(speed));
	} catch {}
}
function loadSimulationSpeed() {
	if (typeof window === "undefined") return 1;
	try {
		const saved = localStorage.getItem(STORAGE_KEYS.SPEED);
		if (!saved) return 1;
		const parsed = Number(saved);
		return SIMULATION_SPEEDS.includes(parsed) ? parsed : 1;
	} catch {
		return 1;
	}
}
function saveLastSimulationTime(timestamp) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEYS.LAST_TIME, timestamp);
	} catch {}
}
function loadLastSimulationTime() {
	if (typeof window === "undefined") return null;
	try {
		return localStorage.getItem(STORAGE_KEYS.LAST_TIME);
	} catch {
		return null;
	}
}
var DEFAULT_BOOKMARKS = [
	{
		id: "bmk-0947",
		timestamp: "09:47",
		minute: 5,
		name: "First Detection Opportunity",
		description: "Anomalous authentication sequence with unfamiliar source IP and MFA fatigue.",
		createdAt: "2026-09-29T09:47:00Z"
	},
	{
		id: "bmk-1000",
		timestamp: "10:00",
		minute: 18,
		name: "Workstation Compromised",
		description: "alex.m interactive session established on LAPTOP-042.",
		createdAt: "2026-09-29T10:00:00Z"
	},
	{
		id: "bmk-1007",
		timestamp: "10:07",
		minute: 25,
		name: "Lateral Movement Begins",
		description: "Authenticated WinRM/SMB connection initiated to internal application server SERVER-03.",
		createdAt: "2026-09-29T10:07:00Z"
	},
	{
		id: "bmk-1012",
		timestamp: "10:12",
		minute: 30,
		name: "Database Access",
		description: "Privileged queries targeted customer identity records on DB-PROD-01.",
		createdAt: "2026-09-29T10:12:00Z"
	}
];
var DemoContext = (0, import_react.createContext)(void 0);
function DemoProvider({ children }) {
	const [currentMinute, setCurrentMinuteState] = (0, import_react.useState)(() => {
		const saved = loadLastSimulationTime();
		return saved ? timestampToMinute(saved) : 42;
	});
	const [simulationSpeed, setSimulationSpeedState] = (0, import_react.useState)(() => loadSimulationSpeed());
	const [isAttackRunning, setIsAttackRunning] = (0, import_react.useState)(false);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const [isInitialReset, setIsInitialReset] = (0, import_react.useState)(false);
	const [isRewinding, setIsRewinding] = (0, import_react.useState)(false);
	const [rewindTarget, setRewindTarget] = (0, import_react.useState)(5);
	const [showMissed, setShowMissed] = (0, import_react.useState)(false);
	const [selectedSimulation, setSelectedSimulation] = (0, import_react.useState)("disable-account");
	const [isSimulating, setIsSimulating] = (0, import_react.useState)(false);
	const [simulationProgress, setSimulationProgress] = (0, import_react.useState)(0);
	const [responseApproved, setResponseApproved] = (0, import_react.useState)(false);
	const [executionStep, setExecutionStep] = (0, import_react.useState)(0);
	const [investigationMode, setInvestigationModeState] = (0, import_react.useState)(false);
	const [timelineZoom, setTimelineZoom] = (0, import_react.useState)("INCIDENT");
	const [bookmarks, setBookmarks] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return DEFAULT_BOOKMARKS;
		try {
			const saved = localStorage.getItem("itm_timeline_bookmarks");
			return saved ? JSON.parse(saved) : DEFAULT_BOOKMARKS;
		} catch {
			return DEFAULT_BOOKMARKS;
		}
	});
	const [selectedEntityId, setSelectedEntityId] = (0, import_react.useState)("LAPTOP-042");
	const [selectedEventId, setSelectedEventId] = (0, import_react.useState)(null);
	const [selectedEdgeId, setSelectedEdgeId] = (0, import_react.useState)(null);
	const [highlightedPathId, setHighlightedPathId] = (0, import_react.useState)(null);
	const clearHighlightedPath = (0, import_react.useCallback)(() => {
		setHighlightedPathId(null);
	}, []);
	const [isCounterfactualMode, setIsCounterfactualMode] = (0, import_react.useState)(false);
	const [availableActions, setAvailableActions] = (0, import_react.useState)(() => getStandardResponseActions(22));
	const [activeAction, setActiveAction] = (0, import_react.useState)(() => {
		return getStandardResponseActions(22)[1];
	});
	const [counterfactualBranch, setCounterfactualBranch] = (0, import_react.useState)(() => {
		return simulateCounterfactualFuture(22, getStandardResponseActions(22)[1]);
	});
	const [scenarioHistory, setScenarioHistory] = (0, import_react.useState)(() => {
		const actions = getStandardResponseActions(22);
		return [simulateCounterfactualFuture(22, actions[0]), simulateCounterfactualFuture(22, actions[1])];
	});
	const [approvedBranchId, setApprovedBranchId] = (0, import_react.useState)(null);
	const [responseMode, setResponseMode] = (0, import_react.useState)("IRIS_RECOMMEND");
	const [responseCandidates, setResponseCandidates] = (0, import_react.useState)(() => responseIntelligenceService.evaluateCandidates(22));
	const [responseRecommendation, setResponseRecommendation] = (0, import_react.useState)(() => responseIntelligenceService.generateRecommendation(22));
	const [responseDecision, setResponseDecision] = (0, import_react.useState)(null);
	const [responseSimulationStatus, setResponseSimulationStatus] = (0, import_react.useState)("PROPOSED");
	const [reportStatus, setReportStatus] = (0, import_react.useState)("DRAFT");
	const [currentReport, setCurrentReport] = (0, import_react.useState)(() => incidentReportService.generateIncidentReport("INC-2048", {
		minute: 42,
		status: "DRAFT"
	}));
	const timerRef = (0, import_react.useRef)(null);
	const clearSimulationTimer = (0, import_react.useCallback)(() => {
		if (timerRef.current !== null) {
			window.clearInterval(timerRef.current);
			timerRef.current = null;
		}
	}, []);
	const setCurrentMinute = (0, import_react.useCallback)((minute) => {
		const bounded = Math.max(0, Math.min(42, Math.round(minute)));
		setIsInitialReset(false);
		setCurrentMinuteState(bounded);
		saveLastSimulationTime(minuteToTimestamp(bounded));
	}, []);
	const setSimulationTime = (0, import_react.useCallback)((time) => {
		setCurrentMinute(timestampToMinute(time));
	}, [setCurrentMinute]);
	const setSimulationSpeed = (0, import_react.useCallback)((speed) => {
		setSimulationSpeedState(speed);
		saveSimulationSpeed(speed);
	}, []);
	const setInvestigationMode = (0, import_react.useCallback)((enabled) => {
		setInvestigationModeState(enabled);
		if (enabled) {
			clearSimulationTimer();
			setIsAttackRunning(false);
			setIsPaused(true);
		}
	}, [clearSimulationTimer]);
	const toggleInvestigationMode = (0, import_react.useCallback)(() => {
		setInvestigationMode(!investigationMode);
	}, [investigationMode, setInvestigationMode]);
	const addBookmark = (0, import_react.useCallback)((name, description) => {
		const newBookmark = {
			id: `bmk-${Date.now()}`,
			timestamp: minuteToTimestamp(currentMinute),
			minute: currentMinute,
			name: name || `Bookmark at ${minuteToTimestamp(currentMinute)}`,
			description,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		setBookmarks((prev) => {
			const updated = [...prev, newBookmark].sort((a, b) => a.minute - b.minute);
			try {
				localStorage.setItem("itm_timeline_bookmarks", JSON.stringify(updated));
			} catch {}
			return updated;
		});
	}, [currentMinute]);
	const removeBookmark = (0, import_react.useCallback)((id) => {
		setBookmarks((prev) => {
			const updated = prev.filter((b) => b.id !== id);
			try {
				localStorage.setItem("itm_timeline_bookmarks", JSON.stringify(updated));
			} catch {}
			return updated;
		});
	}, []);
	const jumpToBookmark = (0, import_react.useCallback)((id) => {
		const bookmark = bookmarks.find((b) => b.id === id);
		if (bookmark) setCurrentMinute(bookmark.minute);
	}, [bookmarks, setCurrentMinute]);
	const stepForward = (0, import_react.useCallback)(() => {
		setCurrentMinute(Math.min(42, currentMinute + 1));
	}, [currentMinute, setCurrentMinute]);
	const stepBack = (0, import_react.useCallback)(() => {
		setCurrentMinute(Math.max(0, currentMinute - 1));
	}, [currentMinute, setCurrentMinute]);
	const jumpToNextEvent = (0, import_react.useCallback)(() => {
		const nextEvent = demoTimelineEvents.find((e) => (e.minute ?? 0) > currentMinute);
		if (nextEvent) setCurrentMinute(nextEvent.minute ?? 42);
		else setCurrentMinute(42);
	}, [currentMinute, setCurrentMinute]);
	const jumpToPreviousEvent = (0, import_react.useCallback)(() => {
		const prevEvents = demoTimelineEvents.filter((e) => (e.minute ?? 0) < currentMinute);
		if (prevEvents.length > 0) {
			const prev = prevEvents[prevEvents.length - 1];
			setCurrentMinute(prev.minute ?? 0);
		} else setCurrentMinute(0);
	}, [currentMinute, setCurrentMinute]);
	const rewindToStart = (0, import_react.useCallback)(() => {
		setCurrentMinute(0);
	}, [setCurrentMinute]);
	const goToDetection = (0, import_react.useCallback)(() => {
		setCurrentMinute(42);
	}, [setCurrentMinute]);
	const resetDemo = (0, import_react.useCallback)(() => {
		clearSimulationTimer();
		setIsAttackRunning(false);
		setIsPaused(false);
		setIsInitialReset(true);
		setIsRewinding(false);
		setCurrentMinuteState(0);
		setShowMissed(false);
		setResponseApproved(false);
		setExecutionStep(0);
		setSimulationProgress(0);
		setIsSimulating(false);
		setInvestigationModeState(false);
		saveLastSimulationTime("09:42");
	}, [clearSimulationTimer]);
	const startAttackSimulation = (0, import_react.useCallback)(() => {
		clearSimulationTimer();
		setIsInitialReset(false);
		setCurrentMinuteState(0);
		setShowMissed(false);
		setResponseApproved(false);
		setExecutionStep(0);
		setSimulationProgress(0);
		setIsSimulating(false);
		setIsPaused(false);
		setInvestigationModeState(false);
		setIsAttackRunning(true);
		saveLastSimulationTime("09:42");
	}, [clearSimulationTimer]);
	const pauseSimulation = (0, import_react.useCallback)(() => {
		clearSimulationTimer();
		setIsAttackRunning(false);
		setIsPaused(true);
	}, [clearSimulationTimer]);
	const resumeSimulation = (0, import_react.useCallback)(() => {
		if (currentMinute >= 42) return;
		setIsPaused(false);
		setIsAttackRunning(true);
	}, [currentMinute]);
	const toggleSimulation = (0, import_react.useCallback)(() => {
		if (isAttackRunning) pauseSimulation();
		else resumeSimulation();
	}, [
		isAttackRunning,
		pauseSimulation,
		resumeSimulation
	]);
	(0, import_react.useEffect)(() => {
		if (!isAttackRunning) {
			clearSimulationTimer();
			return;
		}
		const intervalMs = getTickIntervalMs(simulationSpeed);
		timerRef.current = window.setInterval(() => {
			setCurrentMinuteState((prev) => {
				if (prev >= 42) {
					clearSimulationTimer();
					setIsAttackRunning(false);
					setIsPaused(false);
					saveLastSimulationTime("10:24");
					return 42;
				}
				const next = prev + 1;
				saveLastSimulationTime(minuteToTimestamp(next));
				return next;
			});
		}, intervalMs);
		return () => {
			clearSimulationTimer();
		};
	}, [
		isAttackRunning,
		simulationSpeed,
		clearSimulationTimer
	]);
	const rewindIncident = (0, import_react.useCallback)((targetMinute = 5) => {
		clearSimulationTimer();
		setIsAttackRunning(false);
		setIsPaused(false);
		setIsRewinding(true);
		setShowMissed(false);
		setRewindTarget(targetMinute);
	}, [clearSimulationTimer]);
	(0, import_react.useEffect)(() => {
		if (!isRewinding) return;
		if (currentMinute <= rewindTarget) {
			setIsRewinding(false);
			return;
		}
		const timeoutId = window.setTimeout(() => {
			setCurrentMinuteState((minute) => {
				const next = Math.max(rewindTarget, minute - 3);
				saveLastSimulationTime(minuteToTimestamp(next));
				return next;
			});
		}, 120);
		return () => window.clearTimeout(timeoutId);
	}, [
		currentMinute,
		isRewinding,
		rewindTarget
	]);
	const runSimulation = (0, import_react.useCallback)(() => {
		setIsSimulating(true);
		setSimulationProgress(0);
		setResponseApproved(false);
		setExecutionStep(0);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isSimulating) return;
		if (simulationProgress >= 5) {
			setIsSimulating(false);
			return;
		}
		const id = window.setTimeout(() => setSimulationProgress((progress) => progress + 1), 620);
		return () => window.clearTimeout(id);
	}, [isSimulating, simulationProgress]);
	const simulateAction = (0, import_react.useCallback)((actionToSimulate) => {
		const act = actionToSimulate || activeAction;
		setIsSimulating(true);
		setSimulationProgress(0);
		const branch = simulateCounterfactualFuture(currentMinute, act);
		setCounterfactualBranch(branch);
		setScenarioHistory((prev) => {
			return [...prev.filter((b) => b.action.type !== act.type || b.baseMinute !== currentMinute), branch];
		});
		setIsCounterfactualMode(true);
		window.setTimeout(() => {
			setSimulationProgress(5);
			setIsSimulating(false);
		}, 350);
	}, [activeAction, currentMinute]);
	const selectBranch = (0, import_react.useCallback)((branchId) => {
		setScenarioHistory((history) => {
			const found = history.find((b) => b.branchId === branchId);
			if (found) {
				setCounterfactualBranch(found);
				setActiveAction(found.action);
				setIsCounterfactualMode(true);
			}
			return history;
		});
	}, []);
	const enterCounterfactualMode = (0, import_react.useCallback)(() => {
		setIsCounterfactualMode(true);
	}, []);
	const exitCounterfactualMode = (0, import_react.useCallback)(() => {
		setIsCounterfactualMode(false);
	}, []);
	const approveBranch = (0, import_react.useCallback)((branchId) => {
		setApprovedBranchId(branchId);
		setResponseApproved(true);
	}, []);
	const evaluateResponses = (0, import_react.useCallback)(() => {
		const candidates = responseIntelligenceService.evaluateCandidates(currentMinute);
		setResponseCandidates(candidates);
		return candidates;
	}, [currentMinute]);
	const recommendResponse = (0, import_react.useCallback)(() => {
		const rec = responseIntelligenceService.generateRecommendation(currentMinute);
		setResponseRecommendation(rec);
		setActiveAction(rec.recommendedAction);
		setResponseCandidates(responseIntelligenceService.evaluateCandidates(currentMinute));
		setResponseDecision({
			mode: responseMode,
			selectedAction: rec.recommendedAction,
			target: rec.target,
			status: "PROPOSED",
			approved: false,
			recommendationId: rec.id,
			timestamp: minuteToTimestamp(currentMinute)
		});
		setResponseSimulationStatus("PROPOSED");
		return rec;
	}, [currentMinute, responseMode]);
	const approveResponse = (0, import_react.useCallback)(() => {
		setResponseApproved(true);
		const rec = responseRecommendation || responseIntelligenceService.generateRecommendation(currentMinute);
		setResponseDecision((prev) => prev ? {
			...prev,
			status: "APPROVED",
			approved: true
		} : {
			mode: responseMode,
			selectedAction: rec.recommendedAction,
			target: rec.target,
			status: "APPROVED",
			approved: true,
			recommendationId: rec.id,
			timestamp: minuteToTimestamp(currentMinute)
		});
		setResponseSimulationStatus("APPROVED");
	}, [
		responseRecommendation,
		responseMode,
		currentMinute
	]);
	const rejectResponse = (0, import_react.useCallback)(() => {
		setResponseApproved(false);
		setResponseDecision((prev) => prev ? {
			...prev,
			status: "REJECTED",
			approved: false
		} : null);
		setResponseSimulationStatus("REJECTED");
	}, []);
	const simulateRecommendedResponse = (0, import_react.useCallback)(() => {
		const rec = responseRecommendation || responseIntelligenceService.generateRecommendation(currentMinute);
		simulateAction(rec.recommendedAction);
		setResponseDecision({
			mode: responseMode,
			selectedAction: rec.recommendedAction,
			target: rec.target,
			status: "COMPLETED",
			approved: true,
			recommendationId: rec.id,
			timestamp: minuteToTimestamp(currentMinute),
			executedAt: (/* @__PURE__ */ new Date()).toISOString(),
			branchId: `branch-${rec.recommendedAction.type.toLowerCase()}-${currentMinute}`
		});
		setResponseSimulationStatus("COMPLETED");
	}, [
		responseRecommendation,
		currentMinute,
		responseMode,
		simulateAction
	]);
	const autoSimulateResponse = (0, import_react.useCallback)(() => {
		setResponseMode("AUTO_SIMULATE");
		setResponseSimulationStatus("SIMULATING");
		const { decision, branch, recommendation } = responseIntelligenceService.autoSimulate(currentMinute);
		setResponseRecommendation(recommendation);
		setResponseDecision(decision);
		setCounterfactualBranch(branch);
		setScenarioHistory((prev) => {
			return [...prev.filter((b) => b.action.type !== branch.action.type || b.baseMinute !== currentMinute), branch];
		});
		setIsCounterfactualMode(true);
		setApprovedBranchId(branch.branchId);
		setResponseApproved(true);
		setResponseSimulationStatus("COMPLETED");
	}, [currentMinute]);
	const generateReport = (0, import_react.useCallback)((options) => {
		const rpt = incidentReportService.generateIncidentReport("INC-2048", {
			minute: options?.minute ?? currentMinute,
			status: options?.status ?? reportStatus,
			selectedAction: options?.selectedAction ?? activeAction
		});
		setCurrentReport(rpt);
		if (options?.status) setReportStatus(options.status);
		return rpt;
	}, [
		currentMinute,
		reportStatus,
		activeAction
	]);
	const finalizeReport = (0, import_react.useCallback)(() => {
		const finalized = incidentReportService.finalizeReport("INC-2048", currentReport || void 0);
		setCurrentReport(finalized);
		setReportStatus("FINAL");
		return finalized;
	}, [currentReport]);
	const archiveReport = (0, import_react.useCallback)(() => {
		const archived = incidentReportService.archiveReport("INC-2048");
		if (archived) {
			setCurrentReport(archived);
			setReportStatus("ARCHIVED");
		}
	}, []);
	const updateActionItemStatus = (0, import_react.useCallback)((actionItemId, status) => {
		incidentReportService.updateActionItemStatus("INC-2048", actionItemId, status);
		setCurrentReport((prev) => {
			if (!prev) return prev;
			const updated = prev.actionItems.map((item) => item.id === actionItemId ? {
				...item,
				status
			} : item);
			return {
				...prev,
				actionItems: updated
			};
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const actions = getStandardResponseActions(currentMinute);
		setAvailableActions(actions);
		const candidates = responseIntelligenceService.evaluateCandidates(currentMinute);
		setResponseCandidates(candidates);
		const rec = responseIntelligenceService.generateRecommendation(currentMinute);
		setResponseRecommendation(rec);
	}, [currentMinute]);
	(0, import_react.useEffect)(() => {
		if (!responseApproved) return;
		if (executionStep >= 5) return;
		const id = window.setTimeout(() => setExecutionStep((step) => step + 1), 640);
		return () => window.clearTimeout(id);
	}, [executionStep, responseApproved]);
	const digitalTwin = (0, import_react.useMemo)(() => {
		return getActualDigitalTwinState(currentMinute);
	}, [currentMinute]);
	const knownSecurityState = (0, import_react.useMemo)(() => {
		return getKnownSecurityState(currentMinute);
	}, [currentMinute]);
	const attackGraph = (0, import_react.useMemo)(() => {
		return getAttackGraphAtTime("INC-2048", currentMinute);
	}, [currentMinute]);
	const incidentState = (0, import_react.useMemo)(() => {
		return getIncidentStateAtTime(currentMinute, {
			isInitialReset,
			isContained: responseApproved && executionStep >= 5
		});
	}, [
		currentMinute,
		isInitialReset,
		responseApproved,
		executionStep
	]);
	const incident = (0, import_react.useMemo)(() => {
		return {
			...demoIncident,
			currentSimulationTime: incidentState.timestamp,
			stage: incidentState.stage,
			severity: incidentState.risk,
			status: incidentState.status,
			affectedAssetIds: incidentState.affectedAssetIds,
			affectedAssets: incidentState.affectedAssetIds.length
		};
	}, [incidentState]);
	const currentTime = incidentState.timestamp;
	const currentRisk = incidentState.risk;
	const affectedAssets = incidentState.activeEvent?.assets ?? [...incidentState.compromisedAssetIds];
	const demoStep = Math.min(6, Math.floor(currentMinute / 42 * 6));
	const demoStage = incidentState.stage;
	const value = (0, import_react.useMemo)(() => ({
		incident,
		incidentState,
		currentMinute,
		setCurrentMinute,
		currentTime,
		setSimulationTime,
		currentRisk,
		affectedAssets,
		compromisedAssets: incidentState.compromisedAssetIds,
		demoStage,
		incidentStage: incidentState.stage,
		demoStep,
		isAttackRunning,
		isRunning: isAttackRunning,
		isPaused,
		simulationSpeed,
		setSimulationSpeed,
		startAttackSimulation,
		pauseSimulation,
		resumeSimulation,
		toggleSimulation,
		resetDemo,
		stepForward,
		stepBack,
		jumpToNextEvent,
		jumpToPreviousEvent,
		rewindToStart,
		goToDetection,
		isRewinding,
		rewindIncident,
		showMissed,
		revealMissed: () => setShowMissed(true),
		digitalTwin,
		knownSecurityState,
		investigationMode,
		toggleInvestigationMode,
		setInvestigationMode,
		timelineZoom,
		setTimelineZoom,
		bookmarks,
		addBookmark,
		removeBookmark,
		jumpToBookmark,
		selectedEntityId,
		setSelectedEntityId,
		selectedEventId,
		setSelectedEventId,
		attackGraph,
		selectedEdgeId,
		setSelectedEdgeId,
		highlightedPathId,
		setHighlightedPathId,
		clearHighlightedPath,
		selectedSimulation,
		selectSimulation: setSelectedSimulation,
		isSimulating,
		runSimulation,
		simulationProgress,
		responseApproved,
		executionStep,
		counterfactualBranch,
		activeAction,
		setActiveAction,
		availableActions,
		scenarioHistory,
		simulateAction,
		selectBranch,
		isCounterfactualMode,
		enterCounterfactualMode,
		exitCounterfactualMode,
		approvedBranchId,
		approveBranch,
		responseMode,
		setResponseMode,
		responseCandidates,
		responseRecommendation,
		responseDecision,
		responseSimulationStatus,
		evaluateResponses,
		recommendResponse,
		approveResponse,
		rejectResponse,
		simulateRecommendedResponse,
		autoSimulateResponse,
		currentReport,
		generateReport,
		finalizeReport,
		archiveReport,
		updateActionItemStatus,
		reportStatus
	}), [
		incident,
		incidentState,
		currentMinute,
		setCurrentMinute,
		currentTime,
		setSimulationTime,
		currentRisk,
		affectedAssets,
		demoStage,
		demoStep,
		isAttackRunning,
		isPaused,
		simulationSpeed,
		setSimulationSpeed,
		startAttackSimulation,
		pauseSimulation,
		resumeSimulation,
		toggleSimulation,
		resetDemo,
		stepForward,
		stepBack,
		jumpToNextEvent,
		jumpToPreviousEvent,
		rewindToStart,
		goToDetection,
		isRewinding,
		rewindIncident,
		showMissed,
		digitalTwin,
		knownSecurityState,
		attackGraph,
		investigationMode,
		toggleInvestigationMode,
		setInvestigationMode,
		timelineZoom,
		bookmarks,
		addBookmark,
		removeBookmark,
		jumpToBookmark,
		selectedEntityId,
		selectedEventId,
		selectedEdgeId,
		highlightedPathId,
		clearHighlightedPath,
		selectedSimulation,
		isSimulating,
		runSimulation,
		simulationProgress,
		responseApproved,
		executionStep,
		counterfactualBranch,
		activeAction,
		availableActions,
		scenarioHistory,
		simulateAction,
		selectBranch,
		isCounterfactualMode,
		enterCounterfactualMode,
		exitCounterfactualMode,
		approvedBranchId,
		approveBranch,
		responseMode,
		responseCandidates,
		responseRecommendation,
		responseDecision,
		responseSimulationStatus,
		evaluateResponses,
		recommendResponse,
		approveResponse,
		rejectResponse,
		simulateRecommendedResponse,
		autoSimulateResponse,
		currentReport,
		generateReport,
		finalizeReport,
		archiveReport,
		updateActionItemStatus,
		reportStatus
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoContext.Provider, {
		value,
		children
	});
}
function useDemo() {
	const context = (0, import_react.useContext)(DemoContext);
	if (!context) throw new Error("useDemo must be used inside DemoProvider");
	return context;
}
//#endregion
export { incidentReportService as _, demoMissedSignals as a, simulateCounterfactualFuture as b, filterAttackGraph as c, getActualDigitalTwinState as d, getAttackGraphAtTime as f, getStandardResponseActions as g, getKnownSecurityState as h, demoIncident as i, findEarliestDetectableOpportunity as l, getIncidentStateAtTime as m, SIMULATION_SPEEDS as n, demoResponseActions as o, getDownstreamReachableNodes as p, demoEvidence as r, demoTimelineEvents as s, DemoProvider as t, generatePathExplanation as u, minuteToTimestamp as v, useDemo as x, responseIntelligenceService as y };

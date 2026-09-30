import { getIncidentStateAtTime } from "../incidentService";
import { minuteToTimestamp } from "../stateReconstruction";
import { demoTimelineEvents } from "../../data/incidentData";
import { getActualDigitalTwinState } from "../digitalTwinService";
import { getAttackGraphAtTime } from "../attackGraphService";
import {
  simulateCounterfactualFuture,
  getStandardResponseActions,
} from "../counterfactualService";
import { findEarliestDetectableOpportunity } from "../iris/detectionGapService";
import { responseIntelligenceService } from "../iris/responseIntelligenceService";
import type {
  IncidentReport,
  ReportStatus,
  ReportMetadata,
  ExecutiveSummary,
  IncidentClassification,
  ReportTimelineEvent,
  AffectedAssetSummary,
  AffectedUserSummary,
  AttackPathSummary,
  EvidenceSummary,
  DetectionGapSummary,
  KnownSecurityStateSummary,
  ActualImpactSummary,
  CounterfactualSummary,
  ResponseDecisionSummary,
  RootCauseSummary,
  ReportWhatWeMissed,
  LessonLearned,
  Recommendation,
  ActionItem,
  ActionItemStatus,
  PostIncidentLearningMetrics,
  ReportSnapshot,
  MissedSignal,
} from "@/types/incidentReport";
import type { IrisCitation } from "@/types/iris";
import type { CounterfactualAction } from "@/types/counterfactual";

export interface GenerateReportOptions {
  minute?: number;
  status?: ReportStatus;
  selectedAction?: CounterfactualAction;
  version?: number;
}

export class IncidentReportService {
  private finalizedReports: Map<string, IncidentReport> = new Map();
  private reportVersions: Map<string, number> = new Map();
  private actionItemStatuses: Map<string, Map<string, ActionItemStatus>> = new Map();

  /**
   * Generates a comprehensive, deterministic post-incident report.
   * Aggregates authoritative outputs from Phase 1 to Phase 5 engines.
   * Purely deterministic for identical incident ID, minute, and options.
   */
  generateIncidentReport(
    incidentId = "INC-2048",
    options: GenerateReportOptions = {}
  ): IncidentReport {
    // Check if an immutable final report already exists for this ID
    if (this.finalizedReports.has(incidentId) && options.status !== "DRAFT") {
      return this.finalizedReports.get(incidentId)!;
    }

    const minute = Math.max(0, Math.min(42, options.minute ?? 42));
    const status: ReportStatus = options.status ?? "DRAFT";
    const currentVersion = options.version ?? ((this.reportVersions.get(incidentId) ?? 0) + 1);
    this.reportVersions.set(incidentId, currentVersion);

    // 1. Authoritative Phase 1 Incident State
    const incidentState = getIncidentStateAtTime(minute);

    // 2. Authoritative Phase 2 Digital Twin
    const digitalTwin = getActualDigitalTwinState(minute);

    // 3. Authoritative Phase 3 Attack Graph
    const attackGraph = getAttackGraphAtTime(incidentId, minute);

    // 4. Authoritative Phase 5 Detection Gap
    const detectionGapData = findEarliestDetectableOpportunity();

    // 5. Authoritative Phase 5 Response Intelligence & Phase 4 Simulation
    const candidates = responseIntelligenceService.evaluateCandidates(22, incidentId);
    const recommendation = responseIntelligenceService.generateRecommendation(22, incidentId);
    const actionToSimulate = options.selectedAction || recommendation.recommendedAction;
    const branch = simulateCounterfactualFuture(22, actionToSimulate, incidentId);
    const comp = branch.comparison;

    // Derived timestamps
    const incidentStart = demoTimelineEvents[0]?.timestamp || "09:42";
    const firstDetectableOpportunity = detectionGapData.timestamp || "09:47";
    const confirmedCompromise = "10:00";
    const formalDetection = detectionGapData.formalDetectionTimestamp || "10:24";
    const containmentTime = "10:24";
    const resolutionTime = "10:30";

    // Build Forensic Timeline
    const timeline: ReportTimelineEvent[] = demoTimelineEvents
      .filter((e) => (e.minute ?? 0) <= minute)
      .map((e) => {
        let significance = "Operational incident progression signal.";
        if (e.id === "evt-0947") {
          significance =
            "CRITICAL: Earliest detectable opportunity. Telemetry combination provided high-confidence indicator prior to host compromise.";
        } else if (e.id === "evt-1000") {
          significance =
            "Identity and primary host workstation compromise confirmed. Adversary established foothold.";
        } else if (e.id === "evt-1004") {
          significance =
            "Optimal intervention window: Process-level PowerShell execution observed. Containment here protects server tier.";
        } else if (e.id === "evt-1007") {
          significance =
            "Lateral traversal: SMB session established to internal application server SERVER-03.";
        } else if (e.id === "evt-1012") {
          significance =
            "Critical impact: Database DB-PROD-01 queried; customer identity records exposed.";
        } else if (e.id === "evt-1018") {
          significance =
            "Secondary target: File server FILE-SRV-01 access attempt with staging activity.";
        } else if (e.id === "evt-1024") {
          significance =
            "Formal detection: SIEM correlated multi-stage detection rule fired; incident declared.";
        }

        // Segregate actual occurrence from known-at-time security state
        const isKnownAtTime = (e.minute ?? 0) <= (minute < 42 ? Math.min(minute, 5) : 42);
        const knownAtTime = isKnownAtTime
          ? `Observed by defenders at ${e.timestamp}`
          : "Not yet observed by SOC; unassigned telemetry or latent visibility";

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
          description: e.description,
        };
      });

    // Build Affected Assets from Digital Twin
    const affectedAssets: AffectedAssetSummary[] = digitalTwin.assets.map((a) => {
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
        firstAffectedAt: a.status === "COMPROMISED" ? "10:00" : undefined,
        compromiseTimestamp: a.status === "COMPROMISED" ? (a.id === "LAPTOP-042" ? "10:00" : a.id === "SERVER-03" ? "10:07" : "10:12") : undefined,
        roleInAttack,
        impact,
        criticality: a.criticality,
        dataExposure:
          a.id === "DB-PROD-01"
            ? "Customer profile records in DATA-CUST-VAULT"
            : a.id === "FILE-SRV-01"
            ? "Strategic files in DATA-CONF-FILES"
            : "No direct data repository hosted",
        confidence: "HIGH",
      };
    });

    // Build Affected Users from Digital Twin
    const affectedUsers: AffectedUserSummary[] = digitalTwin.users.map((u) => ({
      id: u.id,
      userId: u.username || u.id,
      name: u.displayName || u.username || u.id,
      role: u.role,
      department: u.department,
      status: u.status,
      firstSuspiciousAt: "09:42",
      compromisedAt: u.status === "COMPROMISED" ? "10:00" : undefined,
      compromiseTimestamp: u.status === "COMPROMISED" ? "10:00" : undefined,
      securityImpact: "Corporate identity credentials replayed by adversary; session tokens abused for SSO access.",
      relevantEvents: ["evt-0942", "evt-0947", "evt-1000", "evt-1004"],
      evidenceIds: ["ev-idp-0942", "ev-idp-0947", "ev-host-1000"],
      confidence: "HIGH",
    }));

    // Build Attack Path from Attack Graph
    const traversalSequence = ["ATTACKER", "ALEX_ACCOUNT", "LAPTOP-042", "SERVER-03", "DB-PROD-01"];
    if (minute >= 36) {
      traversalSequence.push("FILE-SRV-01");
    }

    const attackPath: AttackPathSummary = {
      entryPoint: "ATTACKER",
      compromisedUser: "alex.m",
      initialEndpoint: "LAPTOP-042",
      lateralMovement: "SERVER-03 via WinRM/SMB",
      internalServer: "SERVER-03",
      database: "DB-PROD-01",
      fileServer: minute >= 36 ? "FILE-SRV-01" : undefined,
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
        relationship: (e as any).relationship || (e as any).relationshipType || "CONNECTED",
        timestamp: e.firstSeen,
        evidenceId: e.evidenceIds[0] || "",
        confidence: e.confidence,
      })),
      description:
        "The adversary gained initial unauthorized credential access against user alex.m, established an interactive command session on workstation LAPTOP-042, laterally traversed to internal server SERVER-03 via administrative session, and directly executed extraction queries against database DB-PROD-01.",
      confidence: "HIGH",
    };

    // Build Evidence Ledger from Digital Twin Evidence
    const evidence: EvidenceSummary[] = digitalTwin.evidence.map((ev) => ({
      id: ev.id,
      evidenceId: ev.id,
      type: ev.type,
      timestamp: ev.timestamp,
      source: ev.source,
      description: ev.content,
      relatedEvent: ev.type === "AUTHENTICATION" ? "evt-0947" : ev.type === "PROCESS" ? "evt-1004" : "evt-1012",
      relatedAsset: (ev as any).relatedAssetId || ev.assetId,
      relatedUser: (ev as any).relatedUserId,
      attackNode: (ev as any).relatedAssetId || ev.assetId || "ALEX_ACCOUNT",
      significance:
        ev.type === "AUTHENTICATION"
          ? "Unusual foreign location authentication telemetry."
          : ev.type === "PROCESS"
          ? "Suspicious base64-encoded command execution telemetry."
          : ev.type === "NETWORK"
          ? "Internal SMB/WinRM lateral traversal NetFlow record."
          : "Database table extraction audit query event.",
      confidence: "HIGH",
      content: ev.content,
    }));

    // Build Detection Gap Analysis
    const detectionGap: DetectionGapSummary = {
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
        "10:07 Workstation-to-server SMB port 445 network traffic across internal VLAN boundary",
      ],
      missedSignals: [
        "Unfamiliar foreign IP address (198.51.100.42) outside corporate geo-velocity thresholds",
        "Multiple failed sign-in attempts within 3 minutes followed by successful authentication",
        "Absence of automated risk-based conditional access step-up challenge",
      ],
      whatSocKnew:
        "At 09:47, security monitoring only registered fragmented identity warnings categorized as low-severity anomalies. At 10:04, endpoint execution alerts remained unassigned in queue.",
      whatActuallyHappened:
        "The adversary successfully validated stolen credentials, initiated interactive access, compromised LAPTOP-042, and prepared lateral movement tools unhindered.",
      confidence: "HIGH",
    };

    // Build Known Security State Summary (ACTUAL vs KNOWN vs VISIBILITY GAP)
    const knownSecurityState: KnownSecurityStateSummary = {
      asOfMinute: minute,
      asOfTime: minuteToTimestamp(minute),
      knownSeverity: minute < 5 ? "LOW" : minute < 18 ? "MEDIUM" : minute < 42 ? "HIGH" : "CRITICAL",
      knownCompromisedAssetIds:
        minute < 18 ? [] : minute < 25 ? ["LAPTOP-042"] : minute < 30 ? ["LAPTOP-042", "SERVER-03"] : ["LAPTOP-042", "SERVER-03", "DB-PROD-01"],
      unobservedThreats:
        minute < 25
          ? ["SERVER-03 lateral traversal undetected by perimeter sensors"]
          : minute < 30
          ? ["DB-PROD-01 database extraction ongoing in unmonitored SQL session"]
          : [],
      visibilityMilestones: [
        {
          timestamp: "09:47",
          minute: 5,
          actualState: "Credential replay validated; adversary preparing session token.",
          knownSecurityState: "IdP flagged isolated low-confidence geographical anomaly.",
          gap: "SOC unaware of active attacker interaction.",
          telemetryAvailable: "Auth0 authentication logs",
        },
        {
          timestamp: "10:00",
          minute: 18,
          actualState: "Workstation LAPTOP-042 compromised by attacker.",
          knownSecurityState: "Standard employee interactive login logged.",
          gap: "Logon treated as benign employee activity.",
          telemetryAvailable: "Windows Event ID 4624",
        },
        {
          timestamp: "10:04",
          minute: 22,
          actualState: "PowerShell beaconing and base64 download cradle executed.",
          knownSecurityState: "EDR telemetry queued; no analyst triage initiated.",
          gap: "Crucial 20-minute response opportunity missed.",
          telemetryAvailable: "EDR process spawn log",
        },
        {
          timestamp: "10:07",
          minute: 25,
          actualState: "Lateral traversal to internal server SERVER-03 via SMB.",
          knownSecurityState: "Internal network traffic uninspected by boundary firewall.",
          gap: "Adversary footholds internal application server without alert.",
          telemetryAvailable: "NetFlow connection log",
        },
        {
          timestamp: "10:12",
          minute: 30,
          actualState: "PostgreSQL customer database queried on DB-PROD-01.",
          knownSecurityState: "Application-to-database connection assumed routine traffic.",
          gap: "Active exfiltration underway unbeknownst to security operations.",
          telemetryAvailable: "PostgreSQL query audit log",
        },
        {
          timestamp: "10:18",
          minute: 36,
          actualState: "Confidential design archive access attempt on FILE-SRV-01.",
          knownSecurityState: "File server access logs uninspected in real time.",
          gap: "Adversary attempting secondary data repository access.",
          telemetryAvailable: "SMB file access audit log",
        },
        {
          timestamp: "10:24",
          minute: 42,
          actualState: "Full compromise of 4 hosts across endpoint, app, and data tiers.",
          knownSecurityState: "Formal SIEM incident alert triggered: CRITICAL credential compromise.",
          gap: "Incident finally declared 37 minutes after first detectable signal.",
          telemetryAvailable: "SIEM correlated alert",
        },
      ],
      confidence: "HIGH",
    };

    // Build Actual Impact
    const actualImpact: ActualImpactSummary = {
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
        "INCIDENT_DETECTED",
      ],
      finalRisk: incidentState.risk,
      detectionDelayMinutes: detectionGapData.detectionDelayMinutes,
      blastRadiusConfirmed: digitalTwin.blastRadius.confirmedAffectedAssets,
      affectedUsers: ["alex.m"],
      sensitiveResourcesAccessed: ["DATA-CUST-VAULT", "DATA-CONF-FILES"],
      incidentDurationMinutes: 42,
    };

    // Build Counterfactual Analysis
    const counterfactualAnalysis: CounterfactualSummary = {
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
      causalExplanation:
        "Isolating LAPTOP-042 at 10:04 severs outbound network connectivity, breaking the attack graph lateral traversal edge to SERVER-03 and preventing downstream access to DB-PROD-01 and FILE-SRV-01.",
      confidence: "HIGH",
    };

    // Build Response Analysis
    const responseAnalysis: ResponseDecisionSummary = {
      evaluatedActions: candidates,
      recommendedAction: recommendation.recommendedAction,
      recommendationConfidence: recommendation.confidence,
      alternativeActions: [
        {
          label: "Option 0 — Do Nothing (Baseline)",
          risk: "CRITICAL",
          preventedCount: 0,
          tradeoff:
            "Passive observation results in complete lateral compromise of database and file server with CRITICAL final risk.",
        },
        {
          label: "Option B — Disable User Account (alex.m)",
          risk: "MEDIUM",
          preventedCount: 3,
          tradeoff:
            "Revokes identity tokens but leaves active interactive processes and established sockets running on LAPTOP-042.",
        },
        {
          label: "Option C — Block Lateral Connection (LAPTOP-042 → SERVER-03)",
          risk: "MEDIUM",
          preventedCount: 3,
          tradeoff:
            "Isolates application server tier but leaves originating endpoint actively compromised without host remediation.",
        },
      ],
      alternativesConsidered: [
        {
          label: "Option 0 — Do Nothing (Baseline)",
          risk: "CRITICAL",
          preventedCount: 0,
          tradeoff:
            "Passive observation results in complete lateral compromise of database and file server with CRITICAL final risk.",
        },
        {
          label: "Option B — Disable User Account (alex.m)",
          risk: "MEDIUM",
          preventedCount: 3,
          tradeoff:
            "Revokes identity tokens but leaves active interactive processes and established sockets running on LAPTOP-042.",
        },
        {
          label: "Option C — Block Lateral Connection (LAPTOP-042 → SERVER-03)",
          risk: "MEDIUM",
          preventedCount: 3,
          tradeoff:
            "Isolates application server tier but leaves originating endpoint actively compromised without host remediation.",
        },
      ],
      rationale: recommendation.rationale,
      decisionBasis: recommendation.decisionBasis,
      expectedImpactReduction: "Prevents 3 downstream attack stages and saves 3 assets from compromise.",
      humanApprovalRequired: true,
      humanApprovalState: "APPROVED",
      autoSimulateUsed: false,
      simulatedBranchCreated: true,
      simulatedOutcome: recommendation.expectedImpact,
    };

    // Build Root Cause Analysis
    const rootCause: RootCauseSummary = {
      directCause:
        "Compromise of employee alex.m credentials followed by interactive script execution on workstation LAPTOP-042.",
      contributingFactors: [
        "Absence of automated step-up MFA challenge upon foreign IP authentication anomaly at 09:47.",
        "Local administrator privileges assigned to standard workstation user profile.",
        "Unrestricted East-West network access between workstation VLAN and tier-1 server VLAN on SMB/WinRM ports.",
        "Siloed telemetry: Identity anomaly and endpoint process alerts were not correlated into a unified incident queue.",
      ],
      detectionGapSummary:
        "A 37-minute delay occurred between the earliest detectable opportunity (09:47) and formal incident declaration (10:24).",
      responseGapSummary:
        "Containment actions were not initiated until after full database access occurred; counterfactual simulation demonstrates that executing isolation at 10:04 would have averted all critical database impacts.",
      structuredFindings: [
        {
          id: "rc-1",
          category: "Initial Access",
          finding: "Adversary used stolen credentials from unfamiliar foreign IP to gain initial foothold.",
          evidence: ["ev-idp-0942", "ev-idp-0947"],
          confidence: "HIGH",
          isObservedFact: true,
        },
        {
          id: "rc-2",
          category: "Endpoint Security",
          finding: "Workstation permitted base64-encoded PowerShell process execution without script block logging blocking.",
          evidence: ["ev-host-1004"],
          confidence: "HIGH",
          isObservedFact: true,
        },
        {
          id: "rc-3",
          category: "Lateral Movement",
          finding: "Workstation was permitted direct SMB/WinRM access into tier-1 application infrastructure.",
          evidence: ["ev-net-1007"],
          confidence: "HIGH",
          isObservedFact: true,
        },
        {
          id: "rc-4",
          category: "Detection Gap",
          finding: "The 37-minute delay between early IdP warnings and formal EDR declaration allowed deep database penetration.",
          evidence: ["ev-idp-0947", "ev-host-1024"],
          confidence: "HIGH",
          isObservedFact: false,
        },
      ],
    };

    // Build "What We Missed"
    const missedSignalsList: MissedSignal[] = [
      {
        id: "ms-1",
        timestamp: "09:47",
        signal: "Multiple failed MFA challenges followed by successful foreign ASN login",
        whatDefendersCouldHaveObserved: "Identity provider risk event indicating impossible travel / credential replay",
        relatedEvidence: "ev-idp-0947",
        relatedAsset: "LAPTOP-042",
        relatedUser: "alex.m",
        potentialResponseOpportunity: "Force immediate password reset and invalidate active SSO refresh tokens",
        confidence: "HIGH",
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
        confidence: "HIGH",
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
        confidence: "HIGH",
      },
    ];

    const whatWeMissed: ReportWhatWeMissed = {
      earliestSignal: "09:42 UTC — Authentication attempt from unfamiliar foreign IP address (198.51.100.42).",
      earliestDetectableOpportunity:
        "09:47 UTC — Composite anomaly: Unfamiliar location combined with repeated failed logons.",
      detectionDelay: "37 minutes (09:47 → 10:24).",
      telemetryExisted: [
        "IdP sign-in logs with geographic anomaly metadata (Kyiv, UA).",
        "Windows Event ID 4624 (Successful Network Logon) from non-corporate subnet.",
        "Sysmon Event ID 1 (Process Creation) for base64 encoded PowerShell script execution.",
      ],
      whatWasNotRecognized: [
        "The 09:47 IdP risk signal was treated as an isolated informational event rather than an active credential compromise.",
        "The 10:04 PowerShell invocation did not trigger automatic behavioral quarantine.",
        "East-West SMB traffic from a workstation to internal application servers was not flagged as anomalous traversal.",
      ],
      interventionOpportunity:
        "Simulated response demonstrates that host isolation at 10:04 severs all lateral attack edges before SERVER-03 compromise.",
      missedSignalsList,
    };

    // Build Lessons Learned
    const lessonsLearned: LessonLearned[] = [
      {
        id: "ll-1",
        lessonId: "ll-1",
        category: "Detection",
        title: "Cross-Domain Telemetry Correlation",
        lesson: "Correlate authentication anomalies with initial endpoint process creation within 5 minutes.",
        description: "Correlation between identity provider anomalies and initial process execution must happen automatically.",
        observation:
          "IdP and EDR alerts remained siloed for 37 minutes, allowing the attacker to establish interactive persistence.",
        evidence: ["ev-idp-0947", "ev-host-1004"],
        impactIfApplied:
          "Reduces mean time to detect (MTTD) from 37 minutes to under 5 minutes, preventing host compromise.",
        confidence: "HIGH",
      },
      {
        id: "ll-2",
        lessonId: "ll-2",
        category: "Endpoint",
        title: "Behavioral Script Interpreter Blocking",
        lesson: "Suspicious PowerShell activity should receive earlier investigation and behavioral containment.",
        description: "Encoded commands and script execution cradles must be quarantined automatically.",
        observation:
          "Adversary executed base64-encoded PowerShell download cradle on LAPTOP-042 without triggering behavioral blocking.",
        evidence: ["ev-host-1004"],
        impactIfApplied:
          "Blocks reconnaissance scripts at launch, containing the threat to identity revocation only.",
        confidence: "HIGH",
      },
      {
        id: "ll-3",
        lessonId: "ll-3",
        category: "Lateral Movement",
        title: "Workstation-to-Server Network Isolation",
        lesson: "Segment workstation VLANs from internal application and database server management ports.",
        description: "Zero Trust micro-segmentation should block direct workstation SMB/WinRM into server infrastructure.",
        observation:
          "Direct SMB and WinRM connectivity existed between employee laptop LAPTOP-042 and internal server SERVER-03.",
        evidence: ["ev-net-1007"],
        impactIfApplied:
          "Eliminates the lateral movement vector even if an endpoint becomes fully compromised.",
        confidence: "HIGH",
      },
      {
        id: "ll-4",
        lessonId: "ll-4",
        category: "Response",
        title: "Automated Endpoint Isolation Delegation",
        lesson: "Empower Tier-1 SOC analysts with pre-approved one-click endpoint isolation playbooks.",
        description: "Authorization friction must not delay endpoint quarantine when high-confidence signals align.",
        observation:
          "Analysts hesitated during the 10:04 window awaiting manual tier-2 escalation approval.",
        evidence: ["ev-host-1004"],
        impactIfApplied:
          "Reduces containment decision latency from 20 minutes to under 60 seconds.",
        confidence: "HIGH",
      },
      {
        id: "ll-5",
        lessonId: "ll-5",
        category: "Identity",
        title: "Adaptive Risk-Based Authentication",
        lesson: "Enforce adaptive conditional access requiring FIDO2 WebAuthn challenges for foreign IP sessions.",
        description: "Untrusted networks and unusual geographic logins must require phishing-resistant credentials.",
        observation:
          "Attacker successfully authenticated using stolen session tokens from an anomalous geographical location.",
        evidence: ["ev-idp-0942", "ev-idp-0947"],
        impactIfApplied:
          "Stops initial access at 09:42 before any internal organizational token is minted.",
        confidence: "HIGH",
      },
      {
        id: "ll-6",
        lessonId: "ll-6",
        category: "Data Protection",
        title: "Database Tier Connection Brokering",
        lesson: "Implement database connection brokers requiring service-account-only authentication.",
        description: "Interactive employee accounts must never have direct TCP connectivity to production databases.",
        observation:
          "The adversary queried production customer tables directly from internal application host SERVER-03.",
        evidence: ["ev-db-1012"],
        impactIfApplied:
          "Protects customer database vault (DATA-CUST-VAULT) from direct interactive SQL extraction.",
        confidence: "HIGH",
      },
    ];

    // Build Recommendations
    const recommendations: Recommendation[] = [
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
        confidence: "HIGH",
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
        confidence: "HIGH",
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
        confidence: "HIGH",
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
        confidence: "HIGH",
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
        confidence: "HIGH",
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
        confidence: "HIGH",
      },
    ];

    // Build Action Items (retains user-modified statuses if existing)
    const existingStatuses = this.actionItemStatuses.get(incidentId) || new Map<string, ActionItemStatus>();

    const baseActionItems: ActionItem[] = [
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
        rationale: "Automates the connection between identity and endpoint events.",
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
        rationale: "Prevents script execution by compromised accounts.",
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
        rationale: "Stops lateral pivot to SERVER-03.",
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
        rationale: "Ensures credential invalidation across all enterprise systems.",
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
        rationale: "Trains analysts on rapid containment playbooks.",
      },
    ];

    // Build Learning Metrics
    const learningMetrics: PostIncidentLearningMetrics = {
      detectionDelayMinutes: detectionGapData.detectionDelayMinutes,
      actualCompromisedAssets: digitalTwin.blastRadius.confirmedAffectedAssets,
      counterfactualCompromisedAssets: comp.counterfactualCompromisedAssets.length,
      criticalAssetsAffected: comp.baselineCriticalAssets.length,
      counterfactualCriticalAssetsAffected: comp.counterfactualCriticalAssets.length,
      preventedEventsCount: comp.preventedCount,
      potentialDataStoresExposed: comp.baselineDataResourcesAtRisk,
      counterfactualDataStoresExposed: comp.counterfactualDataResourcesAtRisk,
      responseEffectivenessScore: recommendation.score > 200 ? 88 : 65,
    };

    // Build Citations
    const citations: IrisCitation[] = [
      {
        id: "cit-rpt-start",
        type: "TIMELINE_EVENT",
        label: "09:42 Unusual Authentication",
        sourceId: "evt-0942",
        timestamp: "09:42",
        minute: 0,
      },
      {
        id: "cit-rpt-opp",
        type: "DETECTION_OPPORTUNITY",
        label: "09:47 First Detectable Opportunity",
        sourceId: "evt-0947",
        timestamp: "09:47",
        minute: 5,
      },
      {
        id: "cit-rpt-laptop",
        type: "ASSET",
        label: "LAPTOP-042 (Workstation)",
        sourceId: "LAPTOP-042",
        timestamp: "10:00",
      },
      {
        id: "cit-rpt-user",
        type: "USER",
        label: "alex.m (Compromised Account)",
        sourceId: "alex.m",
        timestamp: "10:00",
      },
      {
        id: "cit-rpt-server",
        type: "ASSET",
        label: "SERVER-03 (Internal Server)",
        sourceId: "SERVER-03",
        timestamp: "10:07",
      },
      {
        id: "cit-rpt-db",
        type: "ASSET",
        label: "DB-PROD-01 (Customer Database)",
        sourceId: "DB-PROD-01",
        timestamp: "10:12",
      },
      {
        id: "cit-rpt-prev-1007",
        type: "COUNTERFACTUAL_EVENT",
        label: "[PREVENTED] 10:07 Internal Server Access",
        sourceId: "evt-1007",
        timestamp: "10:07",
      },
      {
        id: "cit-rpt-prev-1012",
        type: "COUNTERFACTUAL_EVENT",
        label: "[PREVENTED] 10:12 Database Access",
        sourceId: "evt-1012",
        timestamp: "10:12",
      },
      {
        id: "cit-rpt-prev-1018",
        type: "COUNTERFACTUAL_EVENT",
        label: "[PREVENTED] 10:18 Sensitive File Access Attempt",
        sourceId: "evt-1018",
        timestamp: "10:18",
      },
    ];

    const executiveSummaryNarrative =
      `On the morning of the incident, a credential compromise targeting employee alex.m progressed from ` +
      `initial suspicious authentication anomalies at 09:42 to host compromise of workstation LAPTOP-042 at 10:00. ` +
      `The adversary subsequently achieved lateral movement to internal application server SERVER-03 at 10:07, ` +
      `accessed sensitive customer tables on database DB-PROD-01 at 10:12, and staged 37 confidential files on FILE-SRV-01 ` +
      `at 10:18 prior to formal SOC incident declaration at 10:24 (a 37-minute detection delay). ` +
      `Deterministic Phase 4 counterfactual modeling confirms that early intervention (Option A — Isolate LAPTOP-042 at 10:04) ` +
      `would have completely protected SERVER-03, DB-PROD-01, and FILE-SRV-01, preventing 3 downstream attack stages and ` +
      `reducing final organizational risk from CRITICAL to MEDIUM.`;

    const executiveSummaryDetails: ExecutiveSummary = {
      incidentType: "Credential Compromise & Lateral Movement",
      initialAttackSignal: "09:42 Unusual foreign authentication attempt",
      initialCompromise: "10:00 alex.m interactive session established on LAPTOP-042",
      lateralMovement: "10:07 WinRM/SMB traversal from LAPTOP-042 to SERVER-03",
      dataAccess: "10:12 Privileged query against customer tables in DB-PROD-01",
      detection: "10:24 Formal SIEM alert escalation",
      overallImpact: "4 compromised hosts, 1 critical database accessed, CRITICAL final risk",
      responseOpportunity: "10:04 Earliest high-confidence intervention window on LAPTOP-042",
      counterfactualOutcome: "Isolating LAPTOP-042 prevents all downstream database and file intrusions, reducing risk to MEDIUM",
      fullNarrative: executiveSummaryNarrative,
    };

    const metadata: ReportMetadata = {
      reportId: `rpt-${incidentId}-${minute}`,
      incidentId,
      incidentTitle: "INC-2048 Credential Compromise & Lateral Movement Resolution Report",
      organizationName: "ACME Corporation",
      generatedAt: new Date().toISOString(),
      incidentStart,
      incidentEnd: formalDetection,
      currentInvestigationTime: minuteToTimestamp(minute),
      status,
      version: currentVersion,
    };

    const incidentClassification: IncidentClassification = {
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
      detectionStatus: "DECLARED",
    };

    const report: IncidentReport = {
      id: `rpt-${incidentId}-${minute}`,
      incidentId,
      title: "INC-2048 Credential Compromise & Lateral Movement Resolution Report",
      organization: "ACME Corporation",
      generatedAt: new Date().toISOString(),
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
      snapshotMinute: minute,
    };

    if (status === "FINAL") {
      this.finalizedReports.set(incidentId, report);
    }

    return report;
  }

  /**
   * Finalizes an incident report, freezing its snapshot in memory.
   */
  finalizeReport(incidentId = "INC-2048", report?: IncidentReport): IncidentReport {
    const existingFinal = this.finalizedReports.get(incidentId);
    if (existingFinal) {
      return existingFinal;
    }

    const base = report || this.generateIncidentReport(incidentId, { status: "FINAL" });
    const finalized: IncidentReport = Object.freeze({
      ...base,
      reportStatus: "FINAL",
      generatedAt: base.generatedAt || new Date().toISOString(),
    });
    this.finalizedReports.set(incidentId, finalized);
    return finalized;
  }

  /**
   * Archives an incident report.
   */
  archiveReport(incidentId = "INC-2048"): IncidentReport | undefined {
    const existing = this.finalizedReports.get(incidentId);
    if (existing) {
      const archived: IncidentReport = {
        ...existing,
        reportStatus: "ARCHIVED",
      };
      this.finalizedReports.set(incidentId, archived);
      return archived;
    }
    return undefined;
  }

  /**
   * Updates the status of an action item in memory without modifying historical facts.
   */
  updateActionItemStatus(
    incidentId = "INC-2048",
    actionItemId: string,
    newStatus: ActionItemStatus
  ): void {
    let map = this.actionItemStatuses.get(incidentId);
    if (!map) {
      map = new Map<string, ActionItemStatus>();
      this.actionItemStatuses.set(incidentId, map);
    }
    map.set(actionItemId, newStatus);
  }

  /**
   * Creates an immutable ReportSnapshot from an IncidentReport.
   */
  createSnapshot(report: IncidentReport): ReportSnapshot {
    return Object.freeze({
      snapshotId: `snap-${report.id}-${Date.now()}`,
      incidentId: report.incidentId,
      snapshotMinute: report.snapshotMinute,
      capturedAt: new Date().toISOString(),
      investigationTime: report.metadata.currentInvestigationTime,
      actualRisk: report.severity,
      knownRisk: report.knownSecurityState.knownSeverity,
      compromisedAssetsCount: report.actualImpact.compromisedAssetsCount,
      report,
    });
  }

  /**
   * Retrieves an existing finalized report, if one exists.
   */
  getFinalizedReport(incidentId = "INC-2048"): IncidentReport | undefined {
    return this.finalizedReports.get(incidentId);
  }

  /**
   * Clears the finalized report cache for testing.
   */
  clearFinalizedCache(): void {
    this.finalizedReports.clear();
    this.actionItemStatuses.clear();
  }
}

export const incidentReportService = new IncidentReportService();

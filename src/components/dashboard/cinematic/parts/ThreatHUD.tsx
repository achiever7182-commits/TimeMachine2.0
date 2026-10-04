import { memo } from "react";
import { HudFrame } from "../hud/HudFrame";
import { HudLabel } from "../hud/HudLabel";
import { StatusDot } from "../hud/StatusDot";
import { ProvenanceBadge } from "../hud/ProvenanceBadge";
import { Redacted } from "../hud/Redacted";
import type { DataProvenance } from "../data/provenance";

export interface ThreatHUDEvent {
  process?: string;
  sourceIp?: string;
  targetHost?: string;
  detection?: string;
  mitre?: string;
}

export interface ThreatHUDProps {
  severity?: "warn" | "threat";
  title?: string;
  subtitle?: string;
  event?: ThreatHUDEvent;
  provenance?: DataProvenance;
  /** Pulse the header banner n times on first mount, then hold steady. */
  flashes?: number;
}

export const ThreatHUD = memo(function ThreatHUD({
  severity = "warn",
  title = "ANOMALY DETECTED",
  subtitle,
  event,
  provenance = "demo",
  flashes = 2,
}: ThreatHUDProps) {
  const dotState = severity === "threat" ? "threat" : "warn";
  return (
    <HudFrame
      padding="md"
      role="alert"
      className={
        severity === "threat"
          ? "shadow-[0_0_40px_-10px_rgba(255,59,78,0.6)]"
          : "shadow-[0_0_28px_-6px_rgba(255,176,32,0.4)]"
      }
    >
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <StatusDot
            state={dotState}
            pulse
            aria-label={`Threat HUD: severity ${severity}`}
          />
          <span
            className={
              "tm-font-mono text-[10px] uppercase tracking-[0.4em] " +
              (severity === "threat"
                ? "text-[color:var(--tm-red)]"
                : "text-[color:var(--tm-amber)]")
            }
            style={
              flashes > 0
                ? ({
                    animation: `tm-threat-pulse 550ms ease-in-out ${flashes} alternate`,
                  } as React.CSSProperties)
                : undefined
            }
          >
            {title}
          </span>
          {subtitle ? (
            <span className="tm-font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--tm-text-dim)]">
              {subtitle}
            </span>
          ) : null}
        </div>
        <ProvenanceBadge provenance={provenance} kind="incident" />
      </div>

      {event ? (
        <div
          className={
            "mt-4 p-3 rounded border " +
            (severity === "threat"
              ? "border-[rgba(255,59,78,0.35)] bg-[rgba(255,59,78,0.04)]"
              : "border-[rgba(255,176,32,0.35)] bg-[rgba(255,176,32,0.04)]")
          }
        >
          <HudLabel>Anomaly Card</HudLabel>
          <dl className="tm-font-mono text-[12px] grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 mt-3">
            {event.process ? (
              <>
                <dt className="text-[color:var(--tm-text-dim)]">Suspicious Process</dt>
                <dd className="text-right text-[color:var(--tm-text)]">{event.process}</dd>
              </>
            ) : null}
            {event.sourceIp ? (
              <>
                <dt className="text-[color:var(--tm-text-dim)]">Source</dt>
                <dd className="text-right">
                  <Redacted>{event.sourceIp}</Redacted>
                </dd>
              </>
            ) : null}
            {event.targetHost ? (
              <>
                <dt className="text-[color:var(--tm-text-dim)]">Target</dt>
                <dd className="text-right text-[color:var(--tm-text)]">{event.targetHost}</dd>
              </>
            ) : null}
            {event.detection ? (
              <>
                <dt className="text-[color:var(--tm-text-dim)]">Detection</dt>
                <dd className="text-right text-[color:var(--tm-text)]">{event.detection}</dd>
              </>
            ) : null}
            {event.mitre ? (
              <>
                <dt className="text-[color:var(--tm-text-dim)]">MITRE ATT&CK</dt>
                <dd className="text-right text-[color:var(--tm-cyan)]">{event.mitre}</dd>
              </>
            ) : null}
          </dl>
        </div>
      ) : null}

      <style>
        {`
          @keyframes tm-threat-pulse {
            0%   { opacity: 0.25; filter: saturate(0.2); }
            100% { opacity: 1; filter: saturate(1.3); }
          }
        `}
      </style>
    </HudFrame>
  );
});

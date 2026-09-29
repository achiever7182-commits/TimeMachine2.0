import {
  demoEvidence,
  demoRawEvents,
  demoTimelineEvents,
} from "@/data/incidentData";
import { timestampToMinute } from "./stateReconstruction";
import type { Event, Evidence, TimelineEvent } from "@/types/incident";

export function getEvents(): Event[] {
  return [...demoRawEvents];
}

export function getRawTelemetryEvents(): Event[] {
  return [...demoRawEvents];
}

export function getTimelineEvents(): TimelineEvent[] {
  return [...demoTimelineEvents];
}

export function getTimelineEventById(id: string): TimelineEvent | undefined {
  return demoTimelineEvents.find((e) => e.id === id);
}

export function getEventsForMinute(minute: number): TimelineEvent[] {
  return demoTimelineEvents.filter((e) => {
    const m = e.minute ?? timestampToMinute(e.timestamp);
    return m <= minute;
  });
}

export function getEvidenceEvents(): Evidence[] {
  return [...demoEvidence];
}

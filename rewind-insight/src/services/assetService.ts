import { demoAssets } from "@/data/organization";
import { getIncidentStateAtTime } from "./stateReconstruction";
import type { Asset, AssetStatus } from "@/types/incident";

export function getAssets(): Asset[] {
  return [...demoAssets];
}

export function getAssetById(id: string): Asset | undefined {
  return demoAssets.find((a) => a.id === id);
}

export function getAssetsByStatus(status: AssetStatus): Asset[] {
  return demoAssets.filter((a) => a.status === status);
}

export function getCompromisedAssetsAtTime(timestampOrMinute: string | number): Asset[] {
  const state = getIncidentStateAtTime(timestampOrMinute);
  return state.compromisedAssets;
}

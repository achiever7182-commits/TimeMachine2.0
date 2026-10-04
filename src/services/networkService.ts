import type { NetworkConnection } from "@/types/digitalTwin";
import { getActualDigitalTwinState } from "./digitalTwinService";

export function getActiveConnectionsAtTime(
  timestampOrMinute: string | number,
): NetworkConnection[] {
  const snapshot = getActualDigitalTwinState(timestampOrMinute);
  return snapshot.networkConnections;
}

export function getConnectionsForAsset(
  assetId: string,
  timestampOrMinute: string | number,
): NetworkConnection[] {
  const connections = getActiveConnectionsAtTime(timestampOrMinute);
  return connections.filter((c) => c.sourceId === assetId || c.destinationId === assetId);
}

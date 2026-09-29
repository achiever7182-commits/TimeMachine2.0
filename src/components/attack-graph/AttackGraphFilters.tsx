import { Filter, Search, RotateCcw } from "lucide-react";
import type {
  AttackGraphFilter,
  AttackGraphNodeType,
  AttackGraphNodeStatus,
  AttackRelationshipType,
} from "@/types/attackGraph";

interface AttackGraphFiltersProps {
  filters: AttackGraphFilter;
  onChange: (filters: AttackGraphFilter) => void;
  onReset: () => void;
}

const NODE_TYPES: { label: string; value: AttackGraphNodeType | "ALL" }[] = [
  { label: "All Types", value: "ALL" },
  { label: "External Threat", value: "EXTERNAL_THREAT" },
  { label: "Users / Identity", value: "USER" },
  { label: "Endpoints", value: "ENDPOINT" },
  { label: "Servers", value: "SERVER" },
  { label: "Databases", value: "DATABASE" },
  { label: "File Servers", value: "FILE_SERVER" },
  { label: "Gateways", value: "NETWORK_GATEWAY" },
];

const NODE_STATUSES: { label: string; value: AttackGraphNodeStatus | "ALL" }[] = [
  { label: "All Statuses", value: "ALL" },
  { label: "Compromised", value: "COMPROMISED" },
  { label: "Affected", value: "AFFECTED" },
  { label: "Suspicious", value: "SUSPICIOUS" },
  { label: "Monitored", value: "MONITORED" },
  { label: "Healthy", value: "HEALTHY" },
];

const RELATIONSHIPS: { label: string; value: AttackRelationshipType | "ALL" }[] = [
  { label: "All Relationships", value: "ALL" },
  { label: "Authentication", value: "AUTHENTICATED_TO" },
  { label: "Connection", value: "CONNECTED_TO" },
  { label: "Lateral Movement", value: "LATERALLY_MOVED_TO" },
  { label: "Query", value: "QUERIED" },
  { label: "Data Access", value: "ACCESSED_DATA" },
  { label: "Communication", value: "COMMUNICATED_WITH" },
];

export function AttackGraphFilters({ filters, onChange, onReset }: AttackGraphFiltersProps) {
  const isFiltered =
    filters.nodeType !== "ALL" ||
    filters.status !== "ALL" ||
    filters.relationship !== "ALL" ||
    filters.searchQuery.trim().length > 0;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/70 bg-card/40 p-3 backdrop-blur-md">
      {/* Search Input */}
      <div className="relative min-w-[200px] flex-1">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
          placeholder="Filter nodes by ID, label, owner..."
          className="h-8 w-full rounded-md border border-border bg-secondary/30 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-cyan-signal focus:outline-none focus:ring-1 focus:ring-cyan-signal/50"
        />
      </div>

      {/* Node Type Filter */}
      <div className="flex items-center gap-1.5">
        <Filter className="size-3 text-muted-foreground" />
        <select
          value={filters.nodeType}
          onChange={(e) =>
            onChange({ ...filters, nodeType: e.target.value as AttackGraphNodeType | "ALL" })
          }
          className="h-8 rounded-md border border-border bg-secondary/30 px-2.5 text-xs text-foreground focus:border-cyan-signal focus:outline-none"
        >
          {NODE_TYPES.map((t) => (
            <option key={t.value} value={t.value} className="bg-popover text-foreground">
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) =>
          onChange({ ...filters, status: e.target.value as AttackGraphNodeStatus | "ALL" })
        }
        className="h-8 rounded-md border border-border bg-secondary/30 px-2.5 text-xs text-foreground focus:border-cyan-signal focus:outline-none"
      >
        {NODE_STATUSES.map((s) => (
          <option key={s.value} value={s.value} className="bg-popover text-foreground">
            {s.label}
          </option>
        ))}
      </select>

      {/* Relationship Filter */}
      <select
        value={filters.relationship}
        onChange={(e) =>
          onChange({
            ...filters,
            relationship: e.target.value as AttackRelationshipType | "ALL",
          })
        }
        className="h-8 rounded-md border border-border bg-secondary/30 px-2.5 text-xs text-foreground focus:border-cyan-signal focus:outline-none"
      >
        {RELATIONSHIPS.map((r) => (
          <option key={r.value} value={r.value} className="bg-popover text-foreground">
            {r.label}
          </option>
        ))}
      </select>

      {/* Reset Filter Button */}
      {isFiltered && (
        <button
          onClick={onReset}
          className="flex h-8 items-center gap-1 rounded-md border border-threat/40 bg-threat/10 px-2.5 text-xs font-medium text-threat hover:bg-threat/20 transition-colors"
        >
          <RotateCcw className="size-3" />
          Clear Filters
        </button>
      )}
    </div>
  );
}

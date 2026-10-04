-- 1. ENUMS
CREATE TYPE severity_level AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE incident_status AS ENUM ('NEW', 'INVESTIGATING', 'CONTAINED', 'REMEDIATING', 'VERIFYING', 'RESOLVED', 'ESCALATED', 'CLOSED');
CREATE TYPE alert_status AS ENUM ('OPEN', 'ACKNOWLEDGED', 'RESOLVED', 'FALSE_POSITIVE');
CREATE TYPE asset_type AS ENUM ('ENDPOINT', 'SERVER', 'NETWORK_DEVICE', 'APPLICATION', 'DATABASE', 'CLOUD_RESOURCE', 'USER', 'SERVICE');
CREATE TYPE asset_status AS ENUM ('ACTIVE', 'INACTIVE', 'COMPROMISED', 'DECOMMISSIONED');
CREATE TYPE agent_status AS ENUM ('ONLINE', 'OFFLINE', 'DEGRADED', 'DISABLED', 'UNREGISTERED');
CREATE TYPE response_status AS ENUM ('PROPOSED', 'PENDING_APPROVAL', 'APPROVED', 'EXECUTING', 'COMPLETED', 'FAILED', 'ROLLING_BACK', 'ROLLED_BACK', 'VERIFYING');

-- 2. ORGANIZATIONS
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RBAC (ROLES & PERMISSIONS)
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    is_system_role BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, name)
);

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Seed basic permissions (system-wide)
INSERT INTO permissions (name, description) VALUES
    ('dashboard.read', 'View the main dashboard'),
    ('incidents.read', 'View incidents'),
    ('incidents.create', 'Create incidents'),
    ('incidents.update', 'Update incidents'),
    ('evidence.read', 'View evidence'),
    ('evidence.create', 'Add evidence'),
    ('simulation.run', 'Run counterfactual simulations'),
    ('response.read', 'View response actions'),
    ('response.approve', 'Approve response actions'),
    ('response.execute', 'Execute response actions'),
    ('healing.read', 'View self-healing plans'),
    ('healing.approve', 'Approve self-healing plans'),
    ('policy.read', 'View security policies'),
    ('policy.manage', 'Create/edit security policies'),
    ('audit.read', 'View audit logs'),
    ('reports.read', 'View reports'),
    ('reports.generate', 'Generate reports'),
    ('agents.read', 'View telemetry agents'),
    ('agents.manage', 'Manage telemetry agents'),
    ('settings.manage', 'Manage organization settings');

-- 4. PROFILES (Users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    auth_user_id UUID NOT NULL, -- duplicate for clarity/indexing if needed, usually same as id
    organization_id UUID REFERENCES organizations(id),
    display_name TEXT,
    email TEXT NOT NULL,
    avatar_url TEXT,
    role_id UUID REFERENCES roles(id),
    status TEXT DEFAULT 'ACTIVE',
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ASSETS & AGENTS
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    asset_type asset_type NOT NULL,
    name TEXT NOT NULL,
    hostname TEXT,
    ip_address TEXT,
    platform TEXT,
    environment TEXT,
    criticality TEXT DEFAULT 'MEDIUM',
    risk_score FLOAT DEFAULT 0.0,
    status asset_status DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ
);

CREATE TABLE asset_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
    agent_identifier TEXT UNIQUE NOT NULL,
    hostname TEXT,
    platform TEXT,
    agent_version TEXT,
    status agent_status DEFAULT 'UNREGISTERED',
    last_seen_at TIMESTAMPTZ,
    registered_at TIMESTAMPTZ,
    capabilities JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE agent_capabilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    capability_name TEXT NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    UNIQUE(agent_id, capability_name)
);

-- 6. INCIDENTS & ALERTS
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    incident_number TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    severity severity_level NOT NULL DEFAULT 'LOW',
    confidence FLOAT DEFAULT 0.0,
    status incident_status NOT NULL DEFAULT 'NEW',
    priority TEXT DEFAULT 'P3',
    first_seen_at TIMESTAMPTZ,
    last_seen_at TIMESTAMPTZ,
    detected_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    assigned_to UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, incident_number)
);

CREATE TABLE detection_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    rule_identifier TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    rule_type TEXT NOT NULL,
    severity severity_level,
    confidence_threshold FLOAT,
    mitre_technique TEXT,
    enabled BOOLEAN DEFAULT true,
    configuration JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, rule_identifier)
);

CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    incident_id UUID REFERENCES incidents(id) ON DELETE SET NULL,
    rule_id UUID REFERENCES detection_rules(id) ON DELETE SET NULL,
    severity severity_level NOT NULL,
    confidence FLOAT,
    title TEXT NOT NULL,
    description TEXT,
    technique TEXT,
    first_seen_at TIMESTAMPTZ,
    last_seen_at TIMESTAMPTZ,
    status alert_status DEFAULT 'OPEN',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. INCIDENT SUPPORTING TABLES
CREATE TABLE incident_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id UUID REFERENCES incidents(id) ON DELETE CASCADE,
    event_time TIMESTAMPTZ NOT NULL,
    event_type TEXT NOT NULL,
    description TEXT,
    source TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE incident_entities (
    incident_id UUID REFERENCES incidents(id) ON DELETE CASCADE,
    entity_id UUID NOT NULL, -- Will link to entities table
    role TEXT NOT NULL,
    PRIMARY KEY (incident_id, entity_id)
);

-- 8. ENTITIES
CREATE TABLE entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    entity_type TEXT NOT NULL,
    external_identifier TEXT,
    name TEXT NOT NULL,
    risk_score FLOAT DEFAULT 0.0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ
);

-- Add foreign key constraint for incident_entities now that entities exists
ALTER TABLE incident_entities ADD CONSTRAINT fk_incident_entities_entity FOREIGN KEY (entity_id) REFERENCES entities(id) ON DELETE CASCADE;

CREATE TABLE entity_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    source_entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
    target_entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL,
    first_seen_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(source_entity_id, target_entity_id, relationship_type)
);

-- 9. EVIDENCE
CREATE TABLE evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    incident_id UUID REFERENCES incidents(id) ON DELETE CASCADE,
    evidence_type TEXT NOT NULL,
    source TEXT,
    description TEXT,
    hash TEXT,
    integrity_status TEXT DEFAULT 'UNVERIFIED',
    collected_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE evidence_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evidence_id UUID REFERENCES evidence(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. POLICIES & PLAYBOOKS
CREATE TABLE policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    enabled BOOLEAN DEFAULT true,
    risk_level TEXT,
    approval_required BOOLEAN DEFAULT true,
    conditions JSONB DEFAULT '[]',
    actions JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE policy_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    conditions JSONB NOT NULL,
    actions JSONB NOT NULL,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE playbooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE playbook_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    playbook_id UUID REFERENCES playbooks(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    steps JSONB NOT NULL,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. RESPONSE & SELF-HEALING
CREATE TABLE response_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    incident_id UUID REFERENCES incidents(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    target TEXT,
    reason TEXT,
    risk TEXT,
    status response_status DEFAULT 'PROPOSED',
    approval_required BOOLEAN DEFAULT true,
    approved_by UUID REFERENCES profiles(id),
    approved_at TIMESTAMPTZ,
    executed_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    rollback_available BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE response_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    response_action_id UUID REFERENCES response_actions(id) ON DELETE CASCADE,
    approver_id UUID REFERENCES profiles(id),
    decision TEXT NOT NULL,
    comments TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE repair_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    incident_id UUID REFERENCES incidents(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
    reason TEXT,
    baseline_reference TEXT,
    risk TEXT,
    confidence FLOAT,
    status TEXT DEFAULT 'PROPOSED',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE repair_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repair_plan_id UUID REFERENCES repair_plans(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    target TEXT,
    before_state JSONB,
    expected_state JSONB,
    status TEXT DEFAULT 'PENDING',
    rollback_available BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE repair_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repair_plan_id UUID REFERENCES repair_plans(id) ON DELETE CASCADE,
    verification_type TEXT NOT NULL,
    expected_result JSONB,
    actual_result JSONB,
    status TEXT DEFAULT 'PENDING',
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. AUDIT & REPORTING
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    actor_id UUID,
    actor_type TEXT,
    action TEXT NOT NULL,
    target_type TEXT,
    target_id UUID,
    incident_id UUID REFERENCES incidents(id) ON DELETE SET NULL,
    policy_id UUID REFERENCES policies(id) ON DELETE SET NULL,
    result TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    incident_id UUID REFERENCES incidents(id) ON DELETE SET NULL,
    report_type TEXT NOT NULL,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'GENERATING',
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE report_artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    artifact_url TEXT NOT NULL,
    format TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. SYSTEM
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE system_health (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component TEXT NOT NULL,
    status TEXT NOT NULL,
    latency_ms INTEGER,
    last_checked_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT,
    type TEXT,
    is_read BOOLEAN DEFAULT false,
    link_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE detection_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE playbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE playbook_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to get the current user's organization_id
CREATE OR REPLACE FUNCTION current_user_org_id()
RETURNS UUID AS $$
DECLARE
    org_id UUID;
BEGIN
    SELECT organization_id INTO org_id FROM profiles WHERE id = auth.uid();
    RETURN org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies (Basic examples enforcing organization isolation)
-- For a robust setup, these would also check specific permissions via the role_permissions tables.
-- For this baseline, we ensure data isolation by organization.

CREATE POLICY org_isolation ON organizations FOR SELECT USING (id = current_user_org_id());
CREATE POLICY org_isolation ON roles FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY permissions_read ON permissions FOR SELECT USING (true);
CREATE POLICY org_isolation ON role_permissions FOR ALL USING (
    role_id IN (SELECT id FROM roles WHERE organization_id = current_user_org_id())
);

CREATE POLICY profile_self_read ON profiles FOR SELECT USING (id = auth.uid() OR organization_id = current_user_org_id());
CREATE POLICY profile_self_update ON profiles FOR UPDATE USING (id = auth.uid());

CREATE POLICY org_isolation ON assets FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON asset_groups FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON agents FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON agent_capabilities FOR ALL USING (
    agent_id IN (SELECT id FROM agents WHERE organization_id = current_user_org_id())
);

CREATE POLICY org_isolation ON incidents FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON detection_rules FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON alerts FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON incident_events FOR ALL USING (
    incident_id IN (SELECT id FROM incidents WHERE organization_id = current_user_org_id())
);
CREATE POLICY org_isolation ON incident_entities FOR ALL USING (
    incident_id IN (SELECT id FROM incidents WHERE organization_id = current_user_org_id())
);

CREATE POLICY org_isolation ON entities FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON entity_relationships FOR ALL USING (organization_id = current_user_org_id());

CREATE POLICY org_isolation ON evidence FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON evidence_links FOR ALL USING (
    evidence_id IN (SELECT id FROM evidence WHERE organization_id = current_user_org_id())
);

CREATE POLICY org_isolation ON policies FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON policy_versions FOR ALL USING (
    policy_id IN (SELECT id FROM policies WHERE organization_id = current_user_org_id())
);

CREATE POLICY org_isolation ON playbooks FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON playbook_versions FOR ALL USING (
    playbook_id IN (SELECT id FROM playbooks WHERE organization_id = current_user_org_id())
);

CREATE POLICY org_isolation ON response_actions FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON response_approvals FOR ALL USING (
    response_action_id IN (SELECT id FROM response_actions WHERE organization_id = current_user_org_id())
);

CREATE POLICY org_isolation ON repair_plans FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON repair_actions FOR ALL USING (
    repair_plan_id IN (SELECT id FROM repair_plans WHERE organization_id = current_user_org_id())
);
CREATE POLICY org_isolation ON repair_verifications FOR ALL USING (
    repair_plan_id IN (SELECT id FROM repair_plans WHERE organization_id = current_user_org_id())
);

CREATE POLICY org_isolation ON audit_logs FOR SELECT USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation_insert ON audit_logs FOR INSERT WITH CHECK (organization_id = current_user_org_id());

CREATE POLICY org_isolation ON reports FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON report_artifacts FOR ALL USING (
    report_id IN (SELECT id FROM reports WHERE organization_id = current_user_org_id())
);

CREATE POLICY org_isolation ON integrations FOR ALL USING (organization_id = current_user_org_id());
CREATE POLICY org_isolation ON notifications FOR ALL USING (organization_id = current_user_org_id() AND user_id = auth.uid());

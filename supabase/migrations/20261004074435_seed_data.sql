-- DEVELOPMENT/SYNTHETIC SEED DATA ONLY
-- Do not run in production.

-- 1. Development Organization
INSERT INTO organizations (id, name, slug) VALUES 
('00000000-0000-0000-0000-000000000001', 'Acme Corp (Development)', 'acme-corp-dev');

-- 2. Basic Roles
INSERT INTO roles (id, organization_id, name, description, is_system_role) VALUES
('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'ADMIN', 'Full system access', true),
('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'SECURITY_ANALYST', 'Incident analysis and response', true),
('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'VIEWER', 'Read-only access', true);

-- Assign permissions to ADMIN (all permissions)
INSERT INTO role_permissions (role_id, permission_id)
SELECT '10000000-0000-0000-0000-000000000001', id FROM permissions;

-- Note: In a real system, auth.users would be populated via Supabase Auth.
-- Profiles would be created via triggers.
-- For local dev without users, we can just insert a dummy profile for demonstration
-- if we have a known dummy user id, or leave it for the application to create upon first login.

-- 3. Sample Assets
INSERT INTO assets (id, organization_id, asset_type, name, hostname, ip_address, platform, environment, criticality, status) VALUES
('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'SERVER', 'Prod DB 01', 'db-prod-01', '10.0.1.5', 'Linux', 'Production', 'CRITICAL', 'ACTIVE'),
('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'ENDPOINT', 'Alex Laptop', 'LAPTOP-042', '192.168.1.100', 'Windows', 'Corporate', 'MEDIUM', 'COMPROMISED');

-- 4. Sample Agents
INSERT INTO agents (id, organization_id, asset_id, agent_identifier, hostname, platform, agent_version, status, capabilities) VALUES
('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'agent-lx-prod1', 'db-prod-01', 'Linux', '1.0.4', 'ONLINE', '["process_telemetry", "file_monitoring"]'),
('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'agent-win-lap42', 'LAPTOP-042', 'Windows', '1.0.4', 'ONLINE', '["process_telemetry", "network_sniffing", "file_monitoring"]');

-- 5. Sample Persistent Incident (representing the timeline)
INSERT INTO incidents (id, organization_id, incident_number, title, description, severity, status, priority) VALUES
('40000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'INC-2048', 'Multi-stage Compromise via Stolen Credentials', 'SYNTHETIC DEMO: Suspicious login from malicious ASN followed by lateral movement.', 'CRITICAL', 'INVESTIGATING', 'P1');

-- 6. Sample Policies
INSERT INTO policies (id, organization_id, name, description, enabled, risk_level, approval_required, conditions, actions) VALUES
('50000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Isolate Compromised Endpoints', 'Automatically isolate endpoints if a CRITICAL severity alert is triggered on them.', true, 'HIGH', false, '[{"type": "severity", "operator": "eq", "value": "CRITICAL"}]', '[{"type": "isolate_endpoint"}]');

-- 7. Dummy Audit Log
INSERT INTO audit_logs (id, organization_id, actor_type, action, result, metadata) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'SYSTEM', 'system_initialization', 'SUCCESS', '{"notes": "Synthetic development environment initialized"}');

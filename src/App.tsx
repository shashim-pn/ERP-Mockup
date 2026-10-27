import { useMemo, useState } from 'react';

export type ActiveView =
  | 'launcher'
  | 'it_home'
  // ASSETS
  | 'it_assets'
  | 'asset_events'
  | 'warranty_expiring'
  | 'physical_audit_due'
  // SOFTWARE AND LICENSES
  | 'software_licenses'
  | 'license_compliance'
  | 'saas_renewal_watch'
  | 'license_expiry_calendar'
  | 'cost_analysis'
  // IDENTITY AND ACCESS
  | 'entra_users'
  | 'entra_groups'
  | 'directory_roles'
  | 'license_skus'
  | 'portal_access'
  // SECURITY & COMPLIANCE
  | 'compliance_reports'
  | 'security_audit'
  | 'incident_log'
  | 'policy_documents'
  // EXCEPTIONS
  | 'exceptions_departed_licenses';

export type ColumnConfig = {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  isLink?: boolean;
  isStatus?: boolean;
};

export type TableRowData = {
  id: string;
  [key: string]: any;
};

export type SummaryAlert = {
  title: string;
  count: string | number;
  subtitle: string;
  tone: 'red' | 'amber' | 'blue' | 'emerald';
};

export type TableDefinition = {
  title: string;
  description: string;
  docType?: string;
  summaryAlert?: SummaryAlert;
  columns: ColumnConfig[];
  rows: TableRowData[];
};

export type NavCategory = {
  id: string;
  label: string;
  color: string;
  items: {
    id: Exclude<ActiveView, 'launcher' | 'it_home'>;
    label: string;
    badge: number;
  }[];
};

export const navCategories: NavCategory[] = [
  {
    id: 'assets',
    label: 'ASSETS',
    color: '#1e40af',
    items: [
      { id: 'it_assets', label: 'IT Assets', badge: 118 },
      { id: 'asset_events', label: 'Asset events', badge: 45 },
      { id: 'warranty_expiring', label: 'Warranty expiring', badge: 8 },
      { id: 'physical_audit_due', label: 'Physical audit due', badge: 12 }
    ]
  },
  {
    id: 'software',
    label: 'SOFTWARE AND LICENSES',
    color: '#14b8a6',
    items: [
      { id: 'software_licenses', label: 'Software licenses', badge: 45 },
      { id: 'license_compliance', label: 'License compliance', badge: 3 },
      { id: 'saas_renewal_watch', label: 'SaaS renewal watch', badge: 5 },
      { id: 'license_expiry_calendar', label: 'License expiry calendar', badge: 12 },
      { id: 'cost_analysis', label: 'Cost analysis', badge: 1 }
    ]
  },
  {
    id: 'identity',
    label: 'IDENTITY AND ACCESS',
    color: '#8b5cf6',
    items: [
      { id: 'entra_users', label: 'Entra users', badge: 542 },
      { id: 'entra_groups', label: 'Entra groups', badge: 12 },
      { id: 'directory_roles', label: 'Directory roles', badge: 28 },
      { id: 'license_skus', label: 'License SKUs', badge: 89 },
      { id: 'portal_access', label: 'Portal access', badge: 7 }
    ]
  },
  {
    id: 'security',
    label: 'SECURITY & COMPLIANCE',
    color: '#ef4444',
    items: [
      { id: 'compliance_reports', label: 'Compliance reports', badge: 4 },
      { id: 'security_audit', label: 'Security audit', badge: 1 },
      { id: 'incident_log', label: 'Incident log', badge: 3 },
      { id: 'policy_documents', label: 'Policy documents', badge: 12 }
    ]
  },
  {
    id: 'exceptions',
    label: 'EXCEPTIONS',
    color: '#f59e0b',
    items: [
      { id: 'exceptions_departed_licenses', label: 'Departed with licenses', badge: 2 }
    ]
  }
];

export const tableViews: Record<Exclude<ActiveView, 'it_home' | 'launcher'>, TableDefinition> = {
  // 1. IT ASSETS (main CMDB list view)
  it_assets: {
    title: 'IT Assets (CMDB)',
    docType: 'IT Asset',
    description: 'Hardware CMDB registry with dual-list Slashbucket column selection and horizontal forms.',
    columns: [
      { key: 'asset_name', label: 'ASSET NAME', isLink: true },
      { key: 'asset_type', label: 'ASSET TYPE' },
      { key: 'assigned_to', label: 'ASSIGNED TO' },
      { key: 'assigned_to_source', label: 'ASSIGNED TO SOURCE', className: 'hidden md:table-cell' },
      { key: 'compliance', label: 'COMPLIANCE', isStatus: true },
      { key: 'lifecycle_review', label: 'LIFECYCLE REVIEW', className: 'hidden lg:table-cell' },
      { key: 'lifecycle_state', label: 'LIFECYCLE STATE', isStatus: true },
      { key: 'age', label: 'AGE', className: 'hidden lg:table-cell' }
    ],
    rows: [
      { id: 'ITA-00601', asset_name: 'Lenovo ThinkPad X1 Carbon Gen 11 21HM004FUS', asset_sub: 'ITA-00601', asset_type: 'Laptop', assigned_to: 'Syed Hashim', assigned_to_source: '• Manual', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'In Stock', age: '1 w' },
      { id: 'ITA-00602', asset_name: 'Dell Latitude 5440 Core i7-1365U 32GB', asset_sub: 'ITA-00602', asset_type: 'Laptop', assigned_to: 'Ananya Roy', assigned_to_source: '• Entra ID Sync', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'In Repair', age: '4 d' },
      { id: 'ITA-00603', asset_name: 'Apple MacBook Pro 16" M3 Max 64GB 1TB', asset_sub: 'ITA-00603', asset_type: 'Laptop', assigned_to: 'Vikram Sethi', assigned_to_source: '• Manual', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Pending Disposal', age: '6 d' },
      { id: 'ITA-00604', asset_name: 'Dell PowerEdge R750xs 2U Rack Server', asset_sub: 'ITA-00604', asset_type: 'Server', assigned_to: 'Pooja Nair', assigned_to_source: '• Entra ID Sync', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Retired', age: '8 d' },
      { id: 'ITA-00605', asset_name: 'Dell wireless mouse 04WJ8P CN-04WJ8P-LO300', asset_sub: 'ITA-00605', asset_type: 'Peripheral', assigned_to: 'Tajammul Farooq', assigned_to_source: '• Manual', compliance: 'Not Applicable', lifecycle_review: 'Approved', lifecycle_state: 'Deployed', age: '10 d' },
      { id: 'ITA-00606', asset_name: 'Apple iPhone 15 Pro Enterprise 256GB', asset_sub: 'ITA-00606', asset_type: 'Mobile', assigned_to: 'Syed Hashim', assigned_to_source: '• Entra ID Sync', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'In Stock', age: '12 d' },
      { id: 'ITA-00607', asset_name: 'Lenovo ThinkPad X1 Carbon Gen 11 #7', asset_sub: 'ITA-00607', asset_type: 'Laptop', assigned_to: 'Imran Shaikh', assigned_to_source: '• Manual', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Deployed', age: '2 w' },
      { id: 'ITA-00608', asset_name: 'Dell Latitude 5440 Core i7-1365U 32GB #8', asset_sub: 'ITA-00608', asset_type: 'Laptop', assigned_to: 'Maya Chen', assigned_to_source: '• Entra ID Sync', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Deployed', age: '3 w' },
      { id: 'ITA-00609', asset_name: 'Apple MacBook Pro 16" M3 Max 64GB 1TB #9', asset_sub: 'ITA-00609', asset_type: 'Laptop', assigned_to: 'Kavita Menon', assigned_to_source: '• Manual', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Deployed', age: '1 m' },
      { id: 'ITA-00610', asset_name: 'Dell PowerEdge R750xs 2U Rack Server #10', asset_sub: 'ITA-00610', asset_type: 'Server', assigned_to: 'Infra Support', assigned_to_source: '• CMDB Sync', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Deployed', age: '2 m' }
    ]
  },

  // 2. ASSET EVENTS
  asset_events: {
    title: 'Asset Events',
    docType: 'Asset Event',
    description: 'Historical audit trail of asset transfers, maintenance checks, and custody changes.',
    columns: [
      { key: 'event_id', label: 'EVENT ID', isLink: true },
      { key: 'asset_id', label: 'ASSET ID', className: 'hidden sm:table-cell' },
      { key: 'asset_name', label: 'ASSET NAME', isLink: true },
      { key: 'event_type', label: 'EVENT TYPE' },
      { key: 'initiated_by', label: 'INITIATED BY', className: 'hidden md:table-cell' },
      { key: 'timestamp', label: 'TIMESTAMP', className: 'hidden lg:table-cell' },
      { key: 'event_details', label: 'EVENT DETAILS', className: 'hidden xl:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', event_id: 'EVT-2024-0891', asset_id: 'ITA-00605', asset_name: 'Lenovo ThinkPad X1 Carbon Gen 11', event_type: 'Transfer Custody', initiated_by: 'Syed Hashim', timestamp: '2024-10-21 09:15', event_details: 'Assigned to Ananya Roy (Design Dept)', status: 'Completed' },
      { id: '2', event_id: 'EVT-2024-0890', asset_id: 'ITA-00606', asset_name: 'Dell Latitude 5440 Core i7', event_type: 'Audit Physical Scan', initiated_by: 'Ananya Roy', timestamp: '2024-10-20 14:30', event_details: 'Physical barcode scanned in Block B', status: 'Verified' },
      { id: '3', event_id: 'EVT-2024-0889', asset_id: 'ITA-00607', asset_name: 'Apple MacBook Pro 16" M3', event_type: 'Repair Ticket Opened', initiated_by: 'Vikram Sethi', timestamp: '2024-10-19 11:20', event_details: 'Trackpad responsiveness diagnostic', status: 'In Repair' },
      { id: '4', event_id: 'EVT-2024-0888', asset_id: 'ITA-00601', asset_name: 'Dell PowerEdge R750xs Server', event_type: 'Rack Installation', initiated_by: 'Tajammul Farooq', timestamp: '2024-10-18 16:45', event_details: 'Installed in Server Room Rack 4', status: 'Completed' },
      { id: '5', event_id: 'EVT-2024-0887', asset_id: 'ITA-00608', asset_name: 'Cisco Meraki MX85 Security Appliance', event_type: 'Firmware Update', initiated_by: 'Network Ops', timestamp: '2024-10-17 22:00', event_details: 'Firmware updated to v17.9.4', status: 'Completed' },
      { id: '6', event_id: 'EVT-2024-0886', asset_id: 'ITA-00602', asset_name: 'Apple iPhone 15 Pro Enterprise', event_type: 'SIM Swap / MDM Enroll', initiated_by: 'IT Helpdesk', timestamp: '2024-10-16 10:10', event_details: 'Enrolled in Microsoft Intune MDM', status: 'Completed' },
      { id: '7', event_id: 'EVT-2024-0885', asset_id: 'ITA-00609', asset_name: 'HP Elite Dragonfly G4', event_type: 'Commissioned', initiated_by: 'Syed Hashim', timestamp: '2024-10-15 14:00', event_details: 'Received from vendor PO-2024-91', status: 'Active' },
      { id: '8', event_id: 'EVT-2024-0884', asset_id: 'ITA-00610', asset_name: 'Cisco Catalyst 9300 48-Port', event_type: 'Port Configuration', initiated_by: 'Rahul Verma', timestamp: '2024-10-14 18:30', event_details: 'VLAN 40 mapped for AV floor', status: 'Verified' },
      { id: '9', event_id: 'EVT-2024-0883', asset_id: 'ITA-00611', asset_name: 'APC Smart-UPS 3000VA', event_type: 'Battery Inspection', initiated_by: 'Infra Team', timestamp: '2024-10-13 11:15', event_details: 'Nominal capacity 95% verified', status: 'Verified' },
      { id: '10', event_id: 'EVT-2024-0882', asset_id: 'ITA-00612', asset_name: 'Dell UltraSharp 27" U2723QE', event_type: 'Reassignment', initiated_by: 'Pooja Nair', timestamp: '2024-10-12 16:00', event_details: 'Transferred to Dev Workstation 12', status: 'Completed' }
    ]
  },

  // 3. WARRANTY EXPIRING
  warranty_expiring: {
    title: 'Warranty Expiring',
    docType: 'Warranty Report',
    description: 'Hardware equipment with manufacturer or OEM warranty ending within the next 90 days.',
    summaryAlert: {
      title: 'EXPIRING IN 30 DAYS',
      count: 8,
      subtitle: 'Critical attention required for renewal or hardware refresh',
      tone: 'red'
    },
    columns: [
      { key: 'asset_id', label: 'ASSET ID', isLink: true },
      { key: 'asset_name', label: 'ASSET NAME', isLink: true },
      { key: 'manufacturer', label: 'MANUFACTURER', className: 'hidden sm:table-cell' },
      { key: 'serial_no', label: 'SERIAL NO', className: 'hidden md:table-cell' },
      { key: 'warranty_end', label: 'WARRANTY END', className: 'hidden lg:table-cell' },
      { key: 'days_left', label: 'DAYS LEFT' },
      { key: 'support_vendor', label: 'SUPPORT VENDOR', className: 'hidden lg:table-cell' },
      { key: 'action_status', label: 'ACTION STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', asset_id: 'ITA-00512', asset_name: 'Dell Latitude 7420 Core i7', manufacturer: 'Dell', serial_no: 'SN-DEL-992101', warranty_end: '2024-11-10', days_left: '14 days', support_vendor: 'Dell ProSupport', action_status: 'Renewal Pending' },
      { id: '2', asset_id: 'ITA-00518', asset_name: 'Lenovo ThinkPad T14 Gen 2', manufacturer: 'Lenovo', serial_no: 'SN-LEN-881240', warranty_end: '2024-11-16', days_left: '20 days', support_vendor: 'Lenovo Premier', action_status: 'Quote Received' },
      { id: '3', asset_id: 'ITA-00522', asset_name: 'Dell PowerEdge R640 Server', manufacturer: 'Dell', serial_no: 'SN-DEL-771923', warranty_end: '2024-11-21', days_left: '25 days', support_vendor: 'SBM Computers', action_status: 'Urgent Review' },
      { id: '4', asset_id: 'ITA-00531', asset_name: 'Apple MacBook Air 13" M1', manufacturer: 'Apple', serial_no: 'SN-APP-662301', warranty_end: '2024-11-28', days_left: '32 days', support_vendor: 'AppleCare Enterprise', action_status: 'Renewal Pending' },
      { id: '5', asset_id: 'ITA-00540', asset_name: 'HP LaserJet Enterprise M507', manufacturer: 'HP', serial_no: 'SN-HP-551982', warranty_end: '2024-12-04', days_left: '38 days', support_vendor: 'HP Care Pack', action_status: 'Under Review' },
      { id: '6', asset_id: 'ITA-00544', asset_name: 'Cisco Catalyst 2960-X Switch', manufacturer: 'Cisco', serial_no: 'SN-CIS-441029', warranty_end: '2024-12-11', days_left: '45 days', support_vendor: 'Cisco SMARTnet', action_status: 'Quote Received' },
      { id: '7', asset_id: 'ITA-00551', asset_name: 'Dell UltraSharp 34" Curved', manufacturer: 'Dell', serial_no: 'SN-DEL-339102', warranty_end: '2024-12-18', days_left: '52 days', support_vendor: 'Dell Direct', action_status: 'Under Review' },
      { id: '8', asset_id: 'ITA-00560', asset_name: 'Fortinet FortiGate 100F', manufacturer: 'Fortinet', serial_no: 'SN-FTN-228190', warranty_end: '2024-12-25', days_left: '59 days', support_vendor: 'FortiCare', action_status: 'Renewal Pending' },
      { id: '9', asset_id: 'ITA-00568', asset_name: 'Synology RackStation RS2421+', manufacturer: 'Synology', serial_no: 'SN-SYN-119203', warranty_end: '2025-01-05', days_left: '70 days', support_vendor: 'Synology Pro', action_status: 'Under Review' },
      { id: '10', asset_id: 'ITA-00572', asset_name: 'Polycom RealPresence Group 500', manufacturer: 'Polycom', serial_no: 'SN-PLC-901238', warranty_end: '2025-01-15', days_left: '80 days', support_vendor: 'PolyCare', action_status: 'Under Review' }
    ]
  },

  // 4. PHYSICAL AUDIT DUE
  physical_audit_due: {
    title: 'Physical Audit Due',
    docType: 'Audit Schedule',
    description: 'Hardware assets scheduled for physical barcode verification and inventory scan.',
    summaryAlert: {
      title: 'PHYSICAL AUDITS OVERDUE',
      count: 12,
      subtitle: 'Assets requiring physical scanning across facility racks and floors',
      tone: 'amber'
    },
    columns: [
      { key: 'asset_id', label: 'ASSET ID', isLink: true },
      { key: 'asset_name', label: 'ASSET NAME', isLink: true },
      { key: 'last_audit_date', label: 'LAST AUDIT DATE', className: 'hidden md:table-cell' },
      { key: 'audit_location', label: 'AUDIT LOCATION', className: 'hidden sm:table-cell' },
      { key: 'auditor', label: 'AUDITOR', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true },
      { key: 'due_date', label: 'DUE DATE', className: 'hidden lg:table-cell' }
    ],
    rows: [
      { id: '1', asset_id: 'AUD-2026-11', asset_name: 'Cisco Catalyst Switch 9300', last_audit_date: '2025-10-15', audit_location: 'Building A - Rack 04', auditor: 'NetSec Team', status: 'Overdue', due_date: '2026-10-15' },
      { id: '2', asset_id: 'AUD-2026-12', asset_name: 'Poly Studio Video Bar', last_audit_date: '2025-11-01', audit_location: 'Conference Room 3B', auditor: 'AV Support', status: 'Due Today', due_date: '2026-10-27' },
      { id: '3', asset_id: 'AUD-2026-13', asset_name: 'APC Smart-UPS 3000', last_audit_date: '2025-11-10', audit_location: 'Server Room B', auditor: 'Infra Support', status: 'Scheduled', due_date: '2026-11-10' },
      { id: '4', asset_id: 'AUD-2026-14', asset_name: 'Zebra Label Printer', last_audit_date: '2025-11-12', audit_location: 'Dispatch Bay 2', auditor: 'Logistics', status: 'Scheduled', due_date: '2026-11-12' },
      { id: '5', asset_id: 'AUD-2026-15', asset_name: 'Dell Precision 3660 Tower', last_audit_date: '2025-10-02', audit_location: 'CAD Lab Room 102', auditor: 'Engineering Lead', status: 'Overdue', due_date: '2026-10-02' },
      { id: '6', asset_id: 'AUD-2026-16', asset_name: 'Apple iPad Pro 12.9" Kiosk', last_audit_date: '2025-11-05', audit_location: 'Visitor Reception', auditor: 'Facilities', status: 'Scheduled', due_date: '2026-11-05' },
      { id: '7', asset_id: 'AUD-2026-17', asset_name: 'HP Color LaserJet Enterprise', last_audit_date: '2025-10-20', audit_location: 'Executive Floor 4', auditor: 'Admin Ops', status: 'Due Today', due_date: '2026-10-27' },
      { id: '8', asset_id: 'AUD-2026-18', asset_name: 'Fortinet FortiGate 200F', last_audit_date: '2025-11-18', audit_location: 'Core Data Center', auditor: 'Security Ops', status: 'Scheduled', due_date: '2026-11-18' }
    ]
  },

  // 5. SOFTWARE LICENSES
  software_licenses: {
    title: 'Software Licenses',
    docType: 'Software License',
    description: 'Software entitlement database, key allocations, and active subscription seats.',
    columns: [
      { key: 'license_id', label: 'LICENSE ID', isLink: true },
      { key: 'software_name', label: 'SOFTWARE / LICENSE NAME', isLink: true },
      { key: 'type', label: 'TYPE', className: 'hidden sm:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true },
      { key: 'expiry_date', label: 'EXPIRY / RENEWAL DATE', className: 'hidden md:table-cell' },
      { key: 'portal_admin', label: 'PORTAL ADMIN', className: 'hidden lg:table-cell' }
    ],
    rows: [
      { id: '1', license_id: 'LIC-00452', software_name: 'Microsoft 365 E3', type: 'Per User Subscription', status: 'Active', expiry_date: '2027-03-14', portal_admin: 'Syed Hashim' },
      { id: '2', license_id: 'LIC-00451', software_name: 'Adobe Creative Cloud', type: 'Named User Suite', status: 'Expiring', expiry_date: '2026-11-29', portal_admin: 'Maya Chen' },
      { id: '3', license_id: 'LIC-00450', software_name: 'Zoom Pro Enterprise', type: 'Shared Host Tier', status: 'Active', expiry_date: '2027-01-16', portal_admin: 'Support Ops' },
      { id: '4', license_id: 'LIC-00449', software_name: 'ServiceNow ITSM Pro', type: 'Fulfillers Seat', status: 'Expired', expiry_date: '2026-10-15', portal_admin: 'IT Ops Lead' },
      { id: '5', license_id: 'LIC-00448', software_name: 'JetBrains All Products Pack', type: 'Per Developer', status: 'Active', expiry_date: '2027-04-10', portal_admin: 'Dev Lead' },
      { id: '6', license_id: 'LIC-00447', software_name: 'Slack Enterprise Grid', type: 'Active User Tier', status: 'Active', expiry_date: '2027-02-28', portal_admin: 'Internal Comms' },
      { id: '7', license_id: 'LIC-00446', software_name: 'Atlassian Jira Software', type: 'Cloud Enterprise', status: 'Expiring', expiry_date: '2026-11-20', portal_admin: 'Project Ops' },
      { id: '8', license_id: 'LIC-00445', software_name: 'GitHub Enterprise Server', type: 'Annual Seats', status: 'Active', expiry_date: '2027-05-15', portal_admin: 'DevOps Team' },
      { id: '9', license_id: 'LIC-00444', software_name: 'Figma Organization', type: 'Org Tier', status: 'Active', expiry_date: '2027-06-30', portal_admin: 'Design System' },
      { id: '10', license_id: 'LIC-00443', software_name: 'Datadog Pro APM', type: 'Log & APM Metered', status: 'Expiring', expiry_date: '2026-11-30', portal_admin: 'Infra Team' },
      { id: '11', license_id: 'LIC-00442', software_name: '1Password Enterprise', type: 'Vault Membership', status: 'Active', expiry_date: '2027-03-01', portal_admin: 'Security Lead' },
      { id: '12', license_id: 'LIC-00441', software_name: 'DocuSign Corporate Plan', type: 'Bi-Annual Envelope', status: 'Active', expiry_date: '2027-02-10', portal_admin: 'Legal Operations' },
      { id: '13', license_id: 'LIC-00440', software_name: 'Autodesk AutoCAD', type: 'Architecture Suite', status: 'Expired', expiry_date: '2026-10-01', portal_admin: 'CAD Manager' },
      { id: '14', license_id: 'LIC-00439', software_name: 'VMware vSphere Ent Plus', type: 'CPU Socket License', status: 'Active', expiry_date: '2027-08-20', portal_admin: 'Server Admin' },
      { id: '15', license_id: 'LIC-00438', software_name: 'Tableau Creator', type: 'Analytics Suite', status: 'Active', expiry_date: '2027-01-05', portal_admin: 'BI Analyst' }
    ]
  },

  // 6. LICENSE COMPLIANCE
  license_compliance: {
    title: 'License Compliance',
    docType: 'Compliance Record',
    description: 'Auditing entitled seat counts against actual deployed installations in the organization.',
    summaryAlert: {
      title: 'OVERALLOCATED SOFTWARE SUITES',
      count: 3,
      subtitle: 'Unlicensed installations detected requiring true-up payment',
      tone: 'red'
    },
    columns: [
      { key: 'license_id', label: 'LICENSE ID', isLink: true },
      { key: 'software_name', label: 'SOFTWARE NAME', isLink: true },
      { key: 'allocated_seats', label: 'ALLOCATED SEATS', className: 'hidden sm:table-cell' },
      { key: 'used_seats', label: 'USED SEATS', className: 'hidden sm:table-cell' },
      { key: 'compliance_status', label: 'COMPLIANCE STATUS', isStatus: true },
      { key: 'action_required', label: 'ACTION REQUIRED', className: 'hidden md:table-cell' }
    ],
    rows: [
      { id: '1', license_id: 'CMP-LIC-01', software_name: 'Microsoft 365 E5 Suite', allocated_seats: '500', used_seats: '542', compliance_status: 'Overallocated', action_required: 'True-Up Payment (+42)' },
      { id: '2', license_id: 'CMP-LIC-02', software_name: 'Adobe Creative Cloud Enterprise', allocated_seats: '45', used_seats: '42', compliance_status: 'Compliant', action_required: 'None (Buffer +3)' },
      { id: '3', license_id: 'CMP-LIC-03', software_name: 'JetBrains All Products Pack', allocated_seats: '30', used_seats: '30', compliance_status: 'Compliant', action_required: 'Monitor Expansion' },
      { id: '4', license_id: 'CMP-LIC-04', software_name: 'Autodesk AutoCAD Architecture', allocated_seats: '15', used_seats: '18', compliance_status: 'Overallocated', action_required: 'Purchase 3 Seats' },
      { id: '5', license_id: 'CMP-LIC-05', software_name: 'VMware vSphere Enterprise Plus', allocated_seats: '64', used_seats: '64', compliance_status: 'Compliant', action_required: 'Annual Audit Passed' }
    ]
  },

  // 7. ENTRA USERS
  entra_users: {
    title: 'Entra Users',
    docType: 'Directory User',
    description: 'Entra ID user directory entries, authentication methods, and assigned SKUs.',
    columns: [
      { key: 'account_upn', label: 'ACCOUNT (UPN)', isLink: true },
      { key: 'display_name', label: 'DISPLAY NAME', isLink: true },
      { key: 'department', label: 'DEPARTMENT', className: 'hidden sm:table-cell' },
      { key: 'job_title', label: 'JOB TITLE', className: 'hidden md:table-cell' },
      { key: 'role_level', label: 'ROLE LEVEL', className: 'hidden lg:table-cell' },
      { key: 'mfa_posture', label: 'MFA POSTURE', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', account_upn: 'ananya.das@company.com', display_name: 'Ananya Das', department: 'Engineering', job_title: 'Senior Product Manager', role_level: 'P2 Elevated', mfa_posture: 'FIDO2 Hardware', status: 'Active' },
      { id: '2', account_upn: 'imran.shaikh@company.com', display_name: 'Imran Shaikh', department: 'IT Operations', job_title: 'Platform Engineer', role_level: 'P2 Elevated', mfa_posture: 'Authenticator App', status: 'Active' },
      { id: '3', account_upn: 'maya.chen@company.com', display_name: 'Maya Chen', department: 'Product Design', job_title: 'UX Manager', role_level: 'Standard', mfa_posture: 'Authenticator App', status: 'Active' },
      { id: '4', account_upn: 'vikram.sethi@company.com', display_name: 'Vikram Sethi', department: 'Operations', job_title: 'IT Analyst', role_level: 'Standard', mfa_posture: 'SMS Verification', status: 'Pending' },
      { id: '5', account_upn: 'pooja.nair@company.com', display_name: 'Pooja Nair', department: 'Finance', job_title: 'Financial Controller', role_level: 'P3 Elevated', mfa_posture: 'FIDO2 Hardware', status: 'Active' },
      { id: '6', account_upn: 'tajammul.farooq@company.com', display_name: 'Tajammul Farooq', department: 'Infrastructure', job_title: 'Systems Administrator', role_level: 'P1 Global Admin', mfa_posture: 'FIDO2 Hardware', status: 'Active' },
      { id: '7', account_upn: 'rohan.sharma@company.com', display_name: 'Rohan Sharma', department: 'Marketing', job_title: 'Growth Lead', role_level: 'Standard', mfa_posture: 'Authenticator App', status: 'Active' },
      { id: '8', account_upn: 'kavita.menon@company.com', display_name: 'Kavita Menon', department: 'Human Resources', job_title: 'HR Business Partner', role_level: 'Standard', mfa_posture: 'SMS Verification', status: 'Active' },
      { id: '9', account_upn: 'rachel.green@company.com', display_name: 'Rachel Green', department: 'Sales Operations', job_title: 'VP Sales', role_level: 'Standard', mfa_posture: 'Authenticator App', status: 'Disabled' },
      { id: '10', account_upn: 'ketan.patel@company.com', display_name: 'Ketan Patel', department: 'Product Engineering', job_title: 'Lead Architect', role_level: 'P2 Elevated', mfa_posture: 'FIDO2 Hardware', status: 'Active' }
    ]
  },

  // 8. DIRECTORY ROLES
  directory_roles: {
    title: 'Directory Roles',
    docType: 'Directory Role',
    description: 'Administrative directory role assignments and privileged access governance.',
    columns: [
      { key: 'role_id', label: 'ROLE ID', isLink: true },
      { key: 'role_name', label: 'ROLE NAME', isLink: true },
      { key: 'assigned_to', label: 'ASSIGNED TO', className: 'hidden sm:table-cell' },
      { key: 'permission_level', label: 'PERMISSION LEVEL', className: 'hidden md:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true },
      { key: 'last_modified', label: 'LAST MODIFIED', className: 'hidden lg:table-cell' }
    ],
    rows: [
      { id: '1', role_id: 'ROL-DIR-01', role_name: 'Global Administrator', assigned_to: '4 Direct Users', permission_level: 'Critical (P1)', status: 'Quarterly Audit', last_modified: '2026-10-20' },
      { id: '2', role_id: 'ROL-DIR-02', role_name: 'User Administrator', assigned_to: '8 Direct Users', permission_level: 'High (P2)', status: 'Compliant', last_modified: '2026-10-18' },
      { id: '3', role_id: 'ROL-DIR-03', role_name: 'Security Administrator', assigned_to: '6 Direct Users', permission_level: 'High (P2)', status: 'Compliant', last_modified: '2026-10-15' },
      { id: '4', role_id: 'ROL-DIR-04', role_name: 'Exchange Administrator', assigned_to: '3 Direct Users', permission_level: 'Medium (P3)', status: 'Compliant', last_modified: '2026-10-12' },
      { id: '5', role_id: 'ROL-DIR-05', role_name: 'Intune Administrator', assigned_to: '5 Direct Users', permission_level: 'Medium (P3)', status: 'Compliant', last_modified: '2026-10-10' },
      { id: '6', role_id: 'ROL-DIR-06', role_name: 'Compliance Administrator', assigned_to: '2 Direct Users', permission_level: 'Medium (P3)', status: 'Compliant', last_modified: '2026-10-08' },
      { id: '7', role_id: 'ROL-DIR-07', role_name: 'Privileged Role Admin', assigned_to: '3 Direct Users', permission_level: 'Critical (P1)', status: 'Audit Pending', last_modified: '2026-10-05' },
      { id: '8', role_id: 'ROL-DIR-08', role_name: 'Helpdesk Administrator', assigned_to: '14 Direct Users', permission_level: 'Standard', status: 'Compliant', last_modified: '2026-10-01' }
    ]
  },

  // 9. COMPLIANCE REPORTS
  compliance_reports: {
    title: 'Compliance Reports',
    docType: 'Compliance Report',
    description: 'Internal and external regulatory audit evidence reports.',
    columns: [
      { key: 'report_id', label: 'REPORT ID', isLink: true },
      { key: 'report_name', label: 'REPORT NAME', isLink: true },
      { key: 'category', label: 'CATEGORY', className: 'hidden sm:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true },
      { key: 'generated_date', label: 'GENERATED DATE', className: 'hidden md:table-cell' },
      { key: 'due_date', label: 'DUE DATE', className: 'hidden lg:table-cell' }
    ],
    rows: [
      { id: '1', report_id: 'CMP-2026-Q4', report_name: 'Quarterly Endpoint Compliance', category: 'ISO 27001 / Endpoint', status: 'Healthy', generated_date: '2026-10-15', due_date: '2026-11-15' },
      { id: '2', report_id: 'CMP-2026-AR', report_name: 'Access Review Audit', category: 'SOC 2 Type II / Identity', status: 'Flagged', generated_date: '2026-10-10', due_date: '2026-11-22' },
      { id: '3', report_id: 'CMP-2026-PCS', report_name: 'Patch Compliance Summary', category: 'NIST CSF / Infrastructure', status: 'Healthy', generated_date: '2026-10-12', due_date: '2026-11-30' },
      { id: '4', report_id: 'CMP-2026-LUR', report_name: 'License Usage Review', category: 'FINOPS / Software', status: 'Action Needed', generated_date: '2026-10-01', due_date: '2026-12-02' },
      { id: '5', report_id: 'CMP-2026-DLP', report_name: 'Data Loss Prevention Audit', category: 'GDPR / Privacy', status: 'Healthy', generated_date: '2026-10-18', due_date: '2026-12-15' },
      { id: '6', report_id: 'CMP-2026-BCP', report_name: 'Business Continuity Drill Log', category: 'ISO 22301 / Ops', status: 'Healthy', generated_date: '2026-10-05', due_date: '2026-12-20' }
    ]
  },

  // 10. EXCEPTIONS (Departed with licenses)
  exceptions_departed_licenses: {
    title: 'Departed with Licenses',
    docType: 'License Exception',
    description: 'Former employees offboarded in HR system who still hold assigned enterprise software licenses.',
    summaryAlert: {
      title: 'UNRECLAIMED SEATS',
      count: 5,
      subtitle: 'Immediate license reclamation recommended to reduce SaaS waste',
      tone: 'red'
    },
    columns: [
      { key: 'record_id', label: 'RECORD ID', isLink: true },
      { key: 'former_employee', label: 'FORMER EMPLOYEE', isLink: true },
      { key: 'department', label: 'DEPARTMENT', className: 'hidden sm:table-cell' },
      { key: 'unreclaimed_license', label: 'UNRECLAIMED LICENSE' },
      { key: 'offboard_date', label: 'OFFBOARD DATE', className: 'hidden md:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', record_id: 'EXC-2026-01', former_employee: 'David Miller', department: 'Sales Operations', unreclaimed_license: 'Salesforce CRM Enterprise', offboard_date: '2026-10-14', status: 'Reclaim Pending' },
      { id: '2', record_id: 'EXC-2026-02', former_employee: 'Sarah Jenkins', department: 'Product Engineering', unreclaimed_license: 'JetBrains All Products Pack', offboard_date: '2026-10-18', status: 'Review Needed' },
      { id: '3', record_id: 'EXC-2026-03', former_employee: 'Alex Thompson', department: 'Marketing', unreclaimed_license: 'Adobe Creative Cloud', offboard_date: '2026-10-10', status: 'Reclaim Pending' },
      { id: '4', record_id: 'EXC-2026-04', former_employee: 'Maria Garcia', department: 'Finance', unreclaimed_license: 'Microsoft 365 E5 Suite', offboard_date: '2026-10-05', status: 'Resolved' },
      { id: '5', record_id: 'EXC-2026-05', former_employee: 'James Wilson', department: 'IT Operations', unreclaimed_license: 'ServiceNow ITSM Fulfiller', offboard_date: '2026-10-01', status: 'Resolved' }
    ]
  },

  // ADDITIONAL IT VIEWS FOR COMPLETE COVERAGE
  saas_renewal_watch: {
    title: 'SaaS Renewal Watch',
    docType: 'SaaS Watchlist',
    description: 'Tracking upcoming SaaS contract renewals, pricing review terms, and cancellation deadlines.',
    columns: [
      { key: 'app_id', label: 'RECORD ID', isLink: true },
      { key: 'app_name', label: 'APPLICATION NAME', isLink: true },
      { key: 'subscription_tier', label: 'SUBSCRIPTION TIER', className: 'hidden sm:table-cell' },
      { key: 'business_owner', label: 'BUSINESS OWNER', className: 'hidden md:table-cell' },
      { key: 'renewal_deadline', label: 'RENEWAL DEADLINE', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'RENEWAL STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', app_id: 'SaaS-001', app_name: 'Salesforce Enterprise Cloud', subscription_tier: 'Unlimited Plan', business_owner: 'Sales Ops', renewal_deadline: 'Q4 2026 (Dec 15)', status: 'In Negotiation' },
      { id: '2', app_id: 'SaaS-002', app_name: 'Slack Business+ Workspace', subscription_tier: 'Enterprise Grid', business_owner: 'Internal Comms', renewal_deadline: 'Q1 2027 (Jan 31)', status: 'Approved' },
      { id: '3', app_id: 'SaaS-003', app_name: 'Notion Enterprise Workspace', subscription_tier: 'Workspace Tier', business_owner: 'Product Mgmt', renewal_deadline: 'Q1 2027 (Feb 28)', status: 'Pending Review' },
      { id: '4', app_id: 'SaaS-004', app_name: 'Datadog Pro APM', subscription_tier: 'APM & Logs', business_owner: 'DevOps', renewal_deadline: 'Q4 2026 (Nov 30)', status: 'Action Required' },
      { id: '5', app_id: 'SaaS-005', app_name: 'Figma Organization Tier', subscription_tier: 'Org Tier', business_owner: 'Design System', renewal_deadline: 'Q2 2027 (Apr 15)', status: 'Approved' }
    ]
  },

  license_expiry_calendar: {
    title: 'License Expiry Calendar',
    docType: 'Expiry Calendar',
    description: 'Chronological timeline of software vendor maintenance and agreement end dates.',
    columns: [
      { key: 'vendor_id', label: 'AGREEMENT ID', isLink: true },
      { key: 'vendor_product', label: 'VENDOR PRODUCT', isLink: true },
      { key: 'renewal_cycle', label: 'RENEWAL CYCLE', className: 'hidden sm:table-cell' },
      { key: 'vendor_contact', label: 'VENDOR CONTACT', className: 'hidden md:table-cell' },
      { key: 'expiry_date', label: 'EXPIRY DATE', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'URGENCY', isStatus: true }
    ],
    rows: [
      { id: '1', vendor_id: 'EXP-2026-01', vendor_product: 'Atlassian Jira Cloud Enterprise', renewal_cycle: 'Annual Contract', vendor_contact: 'Atlassian Direct', expiry_date: '2026-11-20', status: 'Immediate Action' },
      { id: '2', vendor_id: 'EXP-2026-02', vendor_product: 'GitHub Enterprise Server', renewal_cycle: 'Annual Contract', vendor_contact: 'GitHub Account Mgr', expiry_date: '2026-12-15', status: 'Upcoming' },
      { id: '3', vendor_id: 'EXP-2026-03', vendor_product: 'Zoom Enterprise Video', renewal_cycle: 'Annual Contract', vendor_contact: 'Zoom Sales', expiry_date: '2027-01-20', status: 'Compliant' },
      { id: '4', vendor_id: 'EXP-2026-04', vendor_product: 'DocuSign Corporate Plan', renewal_cycle: 'Bi-Annual Contract', vendor_contact: 'DocuSign Partner', expiry_date: '2027-02-10', status: 'Compliant' },
      { id: '5', vendor_id: 'EXP-2026-05', vendor_product: '1Password Enterprise Vault', renewal_cycle: 'Annual Contract', vendor_contact: '1Password Rep', expiry_date: '2027-03-01', status: 'Compliant' }
    ]
  },

  cost_analysis: {
    title: 'Cost Analysis',
    docType: 'Cost Summary',
    description: 'Financial optimization breakdown of software licenses, recurring seats, and unallocated budget.',
    columns: [
      { key: 'cost_id', label: 'ANALYSIS ID', isLink: true },
      { key: 'software_title', label: 'SOFTWARE TITLE', isLink: true },
      { key: 'billing_cycle', label: 'BILLING CYCLE', className: 'hidden sm:table-cell' },
      { key: 'department', label: 'DEPARTMENT', className: 'hidden md:table-cell' },
      { key: 'annual_spend', label: 'ANNUAL SPEND', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'OPTIMIZATION STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', cost_id: 'CST-2026-01', software_title: 'Microsoft 365 E5 Suite', billing_cycle: 'Annual Contract', department: 'All Departments', annual_spend: '$142,000 / yr', status: 'Compliant' },
      { id: '2', cost_id: 'CST-2026-02', software_title: 'Salesforce CRM Licenses', billing_cycle: 'Annual Contract', department: 'Sales & Marketing', annual_spend: '$98,500 / yr', status: 'Action Required' },
      { id: '3', cost_id: 'CST-2026-03', software_title: 'AWS Cloud Compute & Storage', billing_cycle: 'Monthly Metered', department: 'Cloud Infrastructure', annual_spend: '$240,000 / yr', status: 'In Progress' },
      { id: '4', cost_id: 'CST-2026-04', software_title: 'Datadog Logging Tier', billing_cycle: 'Annual Contract', department: 'Engineering', annual_spend: '$54,000 / yr', status: 'Overdue' }
    ]
  },

  entra_groups: {
    title: 'Entra Groups',
    docType: 'Security Group',
    description: 'Security groups, distribution lists, and Microsoft 365 collaborative teams in Entra ID.',
    columns: [
      { key: 'group_id', label: 'GROUP ID', isLink: true },
      { key: 'group_name', label: 'GROUP NAME', isLink: true },
      { key: 'group_type', label: 'GROUP TYPE', className: 'hidden sm:table-cell' },
      { key: 'group_owner', label: 'GROUP OWNER', className: 'hidden md:table-cell' },
      { key: 'membership', label: 'MEMBERSHIP', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'SECURITY LEVEL', isStatus: true }
    ],
    rows: [
      { id: '1', group_id: 'GRP-ENT-01', group_name: 'SecOps-Admins', group_type: 'Security Group', group_owner: 'CISO Office', membership: '14 Members', status: 'Critical' },
      { id: '2', group_id: 'GRP-ENT-02', group_name: 'IT-Helpdesk-L2', group_type: 'Security Group', group_owner: 'Helpdesk Manager', membership: '28 Members', status: 'In Repair' },
      { id: '3', group_id: 'GRP-ENT-03', group_name: 'All-Employees-Global', group_type: 'Dynamic User Group', group_owner: 'HR Systems', membership: '1,248 Members', status: 'Active' },
      { id: '4', group_id: 'GRP-ENT-04', group_name: 'Executive-Leadership', group_type: 'Microsoft 365 Group', group_owner: 'Exec Office', membership: '12 Members', status: 'In Stock' },
      { id: '5', group_id: 'GRP-ENT-05', group_name: 'Engineering-Devs', group_type: 'Security Group', group_owner: 'VP Engineering', membership: '86 Members', status: 'Active' }
    ]
  },

  license_skus: {
    title: 'License SKUs',
    docType: 'License SKU',
    description: 'Microsoft 365 and cloud vendor stock keeping units (SKUs) available in tenant.',
    columns: [
      { key: 'sku_id', label: 'SKU ID', isLink: true },
      { key: 'sku_name', label: 'SKU IDENTIFIER', isLink: true },
      { key: 'plan_category', label: 'PLAN CATEGORY', className: 'hidden sm:table-cell' },
      { key: 'total_provisioned', label: 'TOTAL PROVISIONED', className: 'hidden md:table-cell' },
      { key: 'available_seats', label: 'AVAILABLE SEATS', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'STOCK STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', sku_id: 'SKU-MS-01', sku_name: 'SPE_E3 (Microsoft 365 E3)', plan_category: 'Enterprise Suite', total_provisioned: '500 Licenses', available_seats: '12 Available', status: 'In Stock' },
      { id: '2', sku_id: 'SKU-MS-02', sku_name: 'AAD_PREMIUM_P2 (Entra ID P2)', plan_category: 'Identity Protection', total_provisioned: '250 Licenses', available_seats: '2 Available', status: 'Expiring' },
      { id: '3', sku_id: 'SKU-MS-03', sku_name: 'MCOPME (Teams Phone Standard)', plan_category: 'Voice & Comms', total_provisioned: '100 Licenses', available_seats: '0 Available', status: 'Expired' },
      { id: '4', sku_id: 'SKU-MS-04', sku_name: 'FLOW_FREE (Power Automate Free)', plan_category: 'Automation', total_provisioned: '1,000 Licenses', available_seats: '420 Available', status: 'Active' }
    ]
  },

  portal_access: {
    title: 'Portal Access',
    docType: 'Portal Record',
    description: 'Single sign-on entry points and cloud admin portal access permissions.',
    columns: [
      { key: 'portal_id', label: 'PORTAL ID', isLink: true },
      { key: 'portal_name', label: 'PORTAL NAME', isLink: true },
      { key: 'auth_method', label: 'AUTH METHOD', className: 'hidden sm:table-cell' },
      { key: 'admin_custodian', label: 'ADMIN CUSTODIAN', className: 'hidden md:table-cell' },
      { key: 'traffic_volume', label: 'TRAFFIC VOLUME', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'SECURITY APPROVAL', isStatus: true }
    ],
    rows: [
      { id: '1', portal_id: 'PRT-01', portal_name: 'Azure Management Portal', auth_method: 'SAML 2.0 + MFA', admin_custodian: 'Cloud Infra Lead', traffic_volume: 'Daily (High)', status: 'Approved' },
      { id: '2', portal_id: 'PRT-02', portal_name: 'AWS Control Tower', auth_method: 'SSO Federation', admin_custodian: 'DevOps Lead', traffic_volume: 'Daily (High)', status: 'Approved' },
      { id: '3', portal_id: 'PRT-03', portal_name: 'Google Workspace Admin Console', auth_method: 'OIDC + FIDO2', admin_custodian: 'IT Services Mgr', traffic_volume: 'Weekly (Med)', status: 'Approved' },
      { id: '4', portal_id: 'PRT-04', portal_name: 'Cloudflare Zero Trust Portal', auth_method: 'Entra SSO', admin_custodian: 'SecOps Team', traffic_volume: 'Daily (High)', status: 'Under Review' }
    ]
  },

  security_audit: {
    title: 'Security Audit',
    docType: 'Security Finding',
    description: 'Vulnerability assessment and Intune security baseline alignment logs.',
    columns: [
      { key: 'audit_id', label: 'AUDIT ID', isLink: true },
      { key: 'target_system', label: 'TARGET SYSTEM', isLink: true },
      { key: 'audit_scope', label: 'AUDIT SCOPE', className: 'hidden sm:table-cell' },
      { key: 'lead_assessor', label: 'LEAD ASSESSOR', className: 'hidden md:table-cell' },
      { key: 'completion_date', label: 'COMPLETION DATE', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'AUDIT RESULT', isStatus: true }
    ],
    rows: [
      { id: '1', audit_id: 'AUD-SEC-01', target_system: 'Endpoint Intune Security Baseline', audit_scope: 'Windows 11 & macOS Devices', lead_assessor: 'Internal Audit', completion_date: '2026-10-18', status: 'Verified' },
      { id: '2', audit_id: 'AUD-SEC-02', target_system: 'Cloud Infrastructure IAM Audit', audit_scope: 'AWS & Azure Multi-Cloud', lead_assessor: 'SecOps Auditor', completion_date: '2026-10-12', status: 'Verified' },
      { id: '3', audit_id: 'AUD-SEC-03', target_system: 'External Perimeter Port Scan', audit_scope: 'Public IP Subnets', lead_assessor: 'External Auditor', completion_date: '2026-10-01', status: 'In Repair' }
    ]
  },

  incident_log: {
    title: 'Incident Log',
    docType: 'Security Incident',
    description: 'Security operations center (SOC) triage, threat alerts, and incident tracking.',
    columns: [
      { key: 'incident_id', label: 'INCIDENT ID', isLink: true },
      { key: 'incident_title', label: 'INCIDENT TITLE', isLink: true },
      { key: 'impact_area', label: 'IMPACT AREA', className: 'hidden sm:table-cell' },
      { key: 'assigned_lead', label: 'ASSIGNED LEAD', className: 'hidden md:table-cell' },
      { key: 'reported_time', label: 'REPORTED TIME', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'SEVERITY', isStatus: true }
    ],
    rows: [
      { id: '1', incident_id: 'INC-2026-401', incident_title: 'Conditional Access Policy Bypass Attempt', impact_area: 'Identity Protection', assigned_lead: 'SecOps On-Call', reported_time: '2026-10-21 08:12', status: 'Critical' },
      { id: '2', incident_id: 'INC-2026-402', incident_title: 'Unflagged USB Storage Mass Read', impact_area: 'DLP Endpoint', assigned_lead: 'Ananya Roy', reported_time: '2026-10-20 16:45', status: 'In Repair' },
      { id: '3', incident_id: 'INC-2026-403', incident_title: 'Suspicious MFA Fatigue Notification', impact_area: 'Authenticator App', assigned_lead: 'IAM Admin', reported_time: '2026-10-19 11:05', status: 'In Stock' }
    ]
  },

  policy_documents: {
    title: 'Policy Documents',
    docType: 'Policy Document',
    description: 'Organizational IT security standards, compliance governance, and operating procedures.',
    columns: [
      { key: 'doc_id', label: 'DOCUMENT ID', isLink: true },
      { key: 'document_title', label: 'DOCUMENT TITLE', isLink: true },
      { key: 'domain', label: 'DOMAIN', className: 'hidden sm:table-cell' },
      { key: 'custodian', label: 'CUSTODIAN', className: 'hidden md:table-cell' },
      { key: 'last_revised', label: 'LAST REVISED', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'GOVERNANCE STATE', isStatus: true }
    ],
    rows: [
      { id: '1', doc_id: 'POL-2026-01', document_title: 'Acceptable Use Policy v4.2', domain: 'IT Governance', custodian: 'CISO', last_revised: '2026-09-01', status: 'Active' },
      { id: '2', doc_id: 'POL-2026-02', document_title: 'Password & Passkey Standard', domain: 'Identity & Access', custodian: 'IAM Architect', last_revised: '2026-08-14', status: 'Active' },
      { id: '3', doc_id: 'POL-2026-03', document_title: 'Remote Device Security Protocol', domain: 'Endpoint Security', custodian: 'SecOps Manager', last_revised: '2026-10-05', status: 'Under Review' }
    ]
  }
};

export function getStatusBadgeStyle(statusValue: string | undefined): string {
  if (!statusValue) return 'bg-[#f3f4f6] text-[#374151]';
  const val = String(statusValue).trim().toLowerCase();

  // Green (#dcfce7 bg, #166534 text)
  if (
    val.includes('completed') ||
    val.includes('verified') ||
    val.includes('active') ||
    val.includes('compliant') ||
    val.includes('approved') ||
    val.includes('passed') ||
    val.includes('healthy') ||
    val.includes('resolved')
  ) {
    return 'bg-[#dcfce7] text-[#166534]';
  }

  // Blue (#dbeafe bg, #1e40af text)
  if (
    val.includes('in stock') ||
    val.includes('deployed') ||
    val.includes('in progress') ||
    val.includes('scheduled') ||
    val.includes('upcoming') ||
    val.includes('restricted') ||
    val.includes('low risk')
  ) {
    return 'bg-[#dbeafe] text-[#1e40af]';
  }

  // Yellow / Orange (#fef3c7 / #fed7aa bg, #92400e text)
  if (
    val.includes('in repair') ||
    val.includes('in maintenance') ||
    val.includes('pending disposal') ||
    val.includes('pending') ||
    val.includes('expiring') ||
    val.includes('review') ||
    val.includes('warning') ||
    val.includes('flagged') ||
    val.includes('quote') ||
    val.includes('due today') ||
    val.includes('near limit') ||
    val.includes('in negotiation')
  ) {
    return 'bg-[#fef3c7] text-[#92400e]';
  }

  // Red (#fee2e2 bg, #991b1b text)
  if (
    val.includes('retired') ||
    val.includes('overdue') ||
    val.includes('expired') ||
    val.includes('action') ||
    val.includes('high risk') ||
    val.includes('critical') ||
    val.includes('overallocated') ||
    val.includes('reclaim pending') ||
    val.includes('urgent') ||
    val.includes('exhausted')
  ) {
    return 'bg-[#fee2e2] text-[#991b1b]';
  }

  // Gray default (#f3f4f6 bg, #374151 text)
  return 'bg-[#f3f4f6] text-[#374151]';
}

function UniversalWorkspaceTable({ definition }: { definition: TableDefinition }) {
  const { columns, rows, summaryAlert } = definition;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows;
    const q = searchQuery.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(q))
    );
  }, [rows, searchQuery]);

  const allSelected = filteredRows.length > 0 && filteredRows.every((r) => selectedIds.has(r.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredRows.map((r) => r.id)));
    }
  };

  const toggleSelectRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  return (
    <div className="space-y-4">
      {/* Optional Alert Box */}
      {summaryAlert && (
        <div
          className={`rounded-xl border p-4 shadow-2xs flex items-center justify-between ${
            summaryAlert.tone === 'red'
              ? 'border-rose-200 bg-rose-50/60 text-rose-900'
              : summaryAlert.tone === 'amber'
              ? 'border-amber-200 bg-amber-50/60 text-amber-900'
              : summaryAlert.tone === 'blue'
              ? 'border-blue-200 bg-blue-50/60 text-blue-900'
              : 'border-emerald-200 bg-emerald-50/60 text-emerald-900'
          }`}
        >
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{summaryAlert.title}</div>
            <div className="mt-0.5 text-2xl font-black tabular-nums">{summaryAlert.count}</div>
            <div className="text-xs opacity-90">{summaryAlert.subtitle}</div>
          </div>
          <button
            type="button"
            className="rounded-lg bg-white/80 px-3 py-1.5 text-xs font-semibold shadow-2xs hover:bg-white transition-colors cursor-pointer"
          >
            Review Items
          </button>
        </div>
      )}

      {/* Table Container */}
      <div className="border border-[#e2e8f0] rounded-lg overflow-hidden mb-8 shadow-xs bg-white">
        {/* Filter / Search Bar */}
        <div className="px-5 py-4 border-b border-[#e2e8f0] bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Filter records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-64 px-3 py-2 text-xs border border-[#e2e8f0] rounded-md focus:border-[#1e40af] focus:outline-hidden focus:ring-1 focus:ring-[#1e40af] placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-[#1e40af] hover:underline cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <div className="text-xs font-medium text-[#64748b]">
            Showing <span className="font-bold text-[#1e293b]">{filteredRows.length}</span> of {rows.length} rows
          </div>
        </div>

        {/* Overflow Container for Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header */}
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                {/* Column 1: # Row Number */}
                <th className="w-[30px] min-w-[30px] max-w-[30px] px-3 py-3 text-center bg-[#f8fafc]">#</th>
                {/* Column 2: ☐ Checkbox */}
                <th className="w-[30px] min-w-[30px] max-w-[30px] px-3 py-3 text-center bg-[#f8fafc]">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded-xs border-slate-300 text-[#1e40af] focus:ring-[#1e40af] cursor-pointer"
                  />
                </th>
                {/* Data Column Headers */}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-left whitespace-nowrap ${col.className ?? ''}`}
                  >
                    {col.label}
                  </th>
                ))}
                {/* Action Column */}
                <th className="w-10 px-3 py-3 text-center text-[11px] font-bold">⋮</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 3} className="px-4 py-10 text-center text-xs text-[#64748b]">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, index) => {
                  const isSelected = selectedIds.has(row.id);
                  return (
                    <tr
                      key={`${row.id}-${index}`}
                      className={`h-12 border-b border-[#e2e8f0] transition-colors ${
                        isSelected ? 'bg-[#dbeafe]' : 'bg-white hover:bg-white'
                      }`}
                    >
                      {/* Column 1: Row # (Subtle #f8fafc background, centered, 12px gray) */}
                      <td className="w-[30px] min-w-[30px] max-w-[30px] px-3 py-3 text-center text-[12px] font-mono text-[#64748b] bg-[#f8fafc]/50">
                        {index + 1}
                      </td>

                      {/* Column 2: ☐ Checkbox */}
                      <td className="w-[30px] min-w-[30px] max-w-[30px] px-3 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(row.id)}
                          className="h-4 w-4 rounded-xs border-slate-300 text-[#1e40af] focus:ring-[#1e40af] cursor-pointer"
                        />
                      </td>

                      {/* Data Cells */}
                      {columns.map((col) => {
                        const cellValue = row[col.key] ?? '—';

                        // Primary Title / Link Column
                        if (col.isLink || col.key.includes('name') || col.key.includes('id') || col.key.includes('upn')) {
                          return (
                            <td key={col.key} className={`px-4 py-3 text-xs text-[#1e293b] ${col.className ?? ''}`}>
                              <div className="flex flex-col">
                                <a
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                  className="text-[#1e40af] font-medium text-xs hover:font-bold cursor-pointer transition-all"
                                >
                                  {cellValue}
                                </a>
                                {row.asset_sub && col.key === 'asset_name' && (
                                  <span className="text-[11px] text-[#64748b] font-mono">{row.asset_sub}</span>
                                )}
                              </div>
                            </td>
                          );
                        }

                        // Status Badge Column
                        if (col.isStatus || col.key.includes('status') || col.key.includes('compliance')) {
                          const badgeStyle = getStatusBadgeStyle(cellValue);
                          return (
                            <td key={col.key} className={`px-4 py-3 text-xs whitespace-nowrap ${col.className ?? ''}`}>
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap ${badgeStyle}`}>
                                {cellValue}
                              </span>
                            </td>
                          );
                        }

                        // Standard Data Cell
                        return (
                          <td key={col.key} className={`px-4 py-3 text-xs text-[#1e293b] whitespace-nowrap ${col.className ?? ''}`}>
                            {cellValue}
                          </td>
                        );
                      })}

                      {/* Action Column */}
                      <td className="w-10 px-3 py-3 text-center text-xs text-[#64748b] cursor-pointer hover:text-[#1e293b]">
                        ⋮
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="px-5 py-3 border-t border-[#e2e8f0] bg-white flex items-center justify-between text-xs text-[#64748b]">
          <div>Page 1 of 1</div>
          <div className="flex gap-2">
            <button type="button" disabled className="px-2.5 py-1 rounded border border-slate-200 text-slate-300 cursor-not-allowed">
              Previous
            </button>
            <button type="button" disabled className="px-2.5 py-1 rounded border border-slate-200 text-slate-300 cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('launcher');

  const currentTable = useMemo(() => {
    if (activeView === 'launcher' || activeView === 'it_home') {
      return tableViews.it_assets;
    }
    return tableViews[activeView] || tableViews.it_assets;
  }, [activeView]);

  const breadcrumb = useMemo(() => {
    if (activeView === 'launcher') return 'Launcher';
    if (activeView === 'it_home') return 'Home / IT';

    for (const cat of navCategories) {
      const found = cat.items.find((item) => item.id === activeView);
      if (found) {
        return `Home / IT / ${found.label}`;
      }
    }
    return 'Home / IT';
  }, [activeView]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        {/* Sidebar Navigation */}
        <aside className="w-72 border-r border-[#e2e8f0] bg-white p-4 flex flex-col shrink-0">
          <div className="mb-5 px-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Workspace</p>
              <h1 className="mt-0.5 text-xl font-black text-[#1e293b] tracking-tight">
                Proficient<span className="text-[#1e40af]">Now.</span>
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('launcher')}
              className="rounded-md border border-[#e2e8f0] px-2 py-1 text-xs font-semibold text-[#64748b] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Launcher
            </button>
          </div>

          <nav className="space-y-4 flex-1 overflow-y-auto pr-1">
            {/* Home button */}
            <button
              type="button"
              onClick={() => setActiveView('it_home')}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors cursor-pointer ${
                activeView === 'it_home' ? 'bg-[#1e40af] text-white shadow-xs' : 'text-[#1e293b] hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span>Home</span>
              </div>
            </button>

            {/* IT Workspace Navigation Groups */}
            {navCategories.map((cat) => {
              const isCategoryActive = cat.items.some((item) => item.id === activeView);
              return (
                <div key={cat.id} className="space-y-1">
                  <div className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors ${
                    isCategoryActive ? 'bg-blue-50/80' : ''
                  }`}>
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      isCategoryActive ? 'text-[#1e40af] font-extrabold' : 'text-[#64748b]'
                    }`}>{cat.label}</span>
                  </div>

                  <div className="space-y-0.5">
                    {cat.items.map((item) => {
                      const isActive = activeView === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveView(item.id)}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-xs transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#1e40af] text-white font-bold shadow-2xs'
                              : 'text-[#1e293b] hover:bg-slate-100 font-medium'
                          }`}
                        >
                          <span className="truncate pr-2">{item.label}</span>
                          <span
                            className={`inline-flex min-w-[22px] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                              isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#64748b]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main View Area */}
        <main className="flex-1 bg-[#f8fafc] flex flex-col min-w-0">
          <header className="border-b border-[#e2e8f0] bg-white px-6 py-3.5 shadow-2xs">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Navigation Path</div>
                <div className="mt-0.5 text-sm font-bold text-[#1e293b]">{breadcrumb}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveView('it_home')}
                  className={`rounded-md border border-[#e2e8f0] px-3 py-1.5 text-xs font-semibold shadow-2xs transition-colors cursor-pointer ${
                    activeView === 'it_home' ? 'bg-blue-50 text-[#1e40af] border-blue-200' : 'bg-white text-[#1e293b] hover:bg-slate-50'
                  }`}
                >
                  IT Dashboard
                </button>
                <button
                  type="button"
                  className="rounded-md bg-[#1e40af] px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Export Data
                </button>
              </div>
            </div>
          </header>

          <section className="p-6 flex-1">
            {activeView === 'launcher' ? (
              <div className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-white rounded-xl border border-[#e2e8f0] p-8 shadow-xs">
                <div className="w-full max-w-4xl">
                  <div className="mb-10 flex items-center justify-center gap-2 text-[#1e293b]">
                    <div className="text-3xl font-extrabold tracking-tight">Proficient</div>
                    <div className="font-serif text-3xl italic font-semibold text-[#1e40af]">Now.</div>
                  </div>

                  <div className="grid grid-cols-3 gap-x-12 gap-y-10 justify-items-center">
                    {[
                      { id: 'finance', label: 'Finance', tone: 'slate', accent: 'F' },
                      { id: 'helpdesk', label: 'Helpdesk', tone: 'navy', accent: 'N' },
                      { id: 'insights', label: 'Insights', tone: 'sky', accent: 'I' },
                      { id: 'it', label: 'IT', tone: 'blue', accent: 'I', highlight: 'Live' },
                      { id: 'marketing', label: 'Marketing', tone: 'indigo', accent: 'M' },
                      { id: 'proficientnow', label: 'ProficientNow', tone: 'teal', accent: 'P' },
                      { id: 'operations', label: 'Operations', tone: 'rose', accent: 'O' },
                      { id: 'security', label: 'Security', tone: 'emerald', accent: 'S' },
                      { id: 'admin', label: 'Admin', tone: 'amber', accent: 'A' }
                    ].map((tile) => (
                      <button
                        key={tile.id}
                        type="button"
                        onClick={() => setActiveView(tile.id === 'it' ? 'it_assets' : 'it_home')}
                        className="group relative flex flex-col items-center transition-transform hover:-translate-y-1 cursor-pointer"
                      >
                        <div
                          className={`relative flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-sm transition-all ${
                            tile.tone === 'slate'
                              ? 'bg-slate-500'
                              : tile.tone === 'navy'
                              ? 'bg-slate-900 text-blue-200'
                              : tile.tone === 'sky'
                              ? 'bg-sky-600'
                              : tile.tone === 'blue'
                              ? 'bg-[#1e40af] ring-2 ring-blue-500/30'
                              : tile.tone === 'indigo'
                              ? 'bg-indigo-600'
                              : tile.tone === 'teal'
                              ? 'bg-teal-600'
                              : tile.tone === 'rose'
                              ? 'bg-rose-500'
                              : tile.tone === 'emerald'
                              ? 'bg-emerald-600'
                              : 'bg-amber-500'
                          }`}
                        >
                          <span className="border-y-2 border-white px-1 leading-none">{tile.accent}</span>
                          {tile.highlight && (
                            <span className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-xs">
                              {tile.highlight}
                            </span>
                          )}
                        </div>
                        <span className="mt-2.5 text-xs font-semibold tracking-tight text-[#1e293b] group-hover:text-[#1e40af]">
                          {tile.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : activeView === 'it_home' ? (
              <div className="space-y-6 max-w-6xl">
                <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xs">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Overview</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#1e293b]">Good morning, Administrator</h2>
                  <p className="mt-1 text-xs text-[#64748b]">Your IT operations and asset management summary is ready to review.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    { label: 'Total IT Assets', value: '118', view: 'it_assets' as const, tone: 'blue' },
                    { label: 'Active Users', value: '542', view: 'entra_users' as const, tone: 'emerald' },
                    { label: 'Software Licenses', value: '45', view: 'software_licenses' as const, tone: 'sky' },
                    { label: 'Action Items', value: '2', view: 'exceptions_departed_licenses' as const, tone: 'amber' }
                  ].map((card) => (
                    <button
                      key={card.label}
                      type="button"
                      onClick={() => setActiveView(card.view)}
                      className="rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-xs text-left hover:border-blue-300 transition-colors cursor-pointer group"
                    >
                      <div className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        card.tone === 'blue'
                          ? 'bg-blue-100 text-[#1e40af]'
                          : card.tone === 'emerald'
                          ? 'bg-emerald-100 text-[#166534]'
                          : card.tone === 'sky'
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-amber-100 text-[#92400e]'
                      }`}>
                        {card.label}
                      </div>
                      <div className="mt-3 text-2xl font-extrabold text-[#1e293b] group-hover:text-[#1e40af] transition-colors">{card.value}</div>
                      <div className="mt-1 text-[11px] text-[#64748b] font-medium">Click to view details →</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-xs">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-[#1e293b]">{currentTable.title}</h3>
                        {currentTable.docType && (
                          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-[#1e40af] border border-blue-200">
                            DocType: {currentTable.docType}
                          </span>
                        )}
                        <span className="text-xs font-semibold text-[#64748b]">· {currentTable.rows.length} rows</span>
                      </div>
                      <p className="mt-0.5 text-xs text-[#64748b]">{currentTable.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded-md border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-semibold text-[#1e293b] hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        Column Options
                      </button>
                      <button
                        type="button"
                        className="rounded-md bg-[#1e40af] px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        + Add Record
                      </button>
                    </div>
                  </div>

                  <UniversalWorkspaceTable definition={currentTable} />
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

// Report configurations and mock data for all required IT pages
export const reportConfigs = {
  'asset-events': {
    title: 'Asset Events',
    docType: 'IT Asset Event',
    description: 'Complete audit trail of lifecycle movements, reassignments, repairs, and checkouts.',
    kpis: [
      { label: 'Total Events', value: '142', change: '+12 this week', color: 'blue' },
      { label: 'Custody Transfers', value: '28', change: '8 pending sign-off', color: 'amber' },
      { label: 'Repairs Logged', value: '14', change: '4 in progress', color: 'red' },
      { label: 'Auto-Logged (Sync)', value: '118', change: '98.5% confidence', color: 'emerald' }
    ],
    columns: [
      { key: 'id', label: 'Event ID', sortable: true },
      { key: 'asset_id', label: 'Asset ID', sortable: true },
      { key: 'asset_name', label: 'Asset Name', sortable: true },
      { key: 'event_type', label: 'Event Type', sortable: true },
      { key: 'initiated_by', label: 'Initiated By', sortable: true },
      { key: 'timestamp', label: 'Timestamp', sortable: true },
      { key: 'details', label: 'Event Details', sortable: false },
      { key: 'status', label: 'Status', sortable: true }
    ],
    rows: [
      { id: 'EVT-2024-0891', asset_id: 'ITA-00605', asset_name: 'Lenovo ThinkPad X1 Carbon Gen 11', event_type: 'Transfer', initiated_by: 'Syed Hashim', timestamp: '2024-10-21 09:15', details: 'Assigned to Ananya Roy (Design Dept)', status: 'Completed' },
      { id: 'EVT-2024-0890', asset_id: 'ITA-00606', asset_name: 'Dell Latitude 5440 Core i7', event_type: 'Audit Verified', initiated_by: 'Ananya Roy', timestamp: '2024-10-20 14:30', details: 'Physical barcode scanned in Block B', status: 'Verified' },
      { id: 'EVT-2024-0889', asset_id: 'ITA-00607', asset_name: 'Apple MacBook Pro 16" M3 Max', event_type: 'Repair Requested', initiated_by: 'Vikram Sethi', timestamp: '2024-10-19 11:20', details: 'Trackpad responsiveness diagnostic', status: 'In Repair' },
      { id: 'EVT-2024-0888', asset_id: 'ITA-00601', asset_name: 'Dell wireless mouse 04WJ8P', event_type: 'Check-out', initiated_by: 'Tajammul Farooq', timestamp: '2024-10-18 16:45', details: 'Issued to Workstation B-12', status: 'Completed' },
      { id: 'EVT-2024-0887', asset_id: 'ITA-00608', asset_name: 'Dell PowerEdge R750xs Server', event_type: 'IP Reassigned', initiated_by: 'System (GLPI)', timestamp: '2024-10-18 03:00', details: 'Primary IP bound to 10.142.12.108', status: 'Completed' },
      { id: 'EVT-2024-0886', asset_id: 'ITA-00602', asset_name: 'Dell wired keyboard KB216', event_type: 'Location Move', initiated_by: 'Syed Hashim', timestamp: '2024-10-17 10:10', details: 'Transferred from Storage to Block A', status: 'Completed' },
      { id: 'EVT-2024-0885', asset_id: 'ITA-00609', asset_name: 'HP Elite Dragonfly G4', event_type: 'Commissioned', initiated_by: 'Syed Hashim', timestamp: '2024-10-16 12:00', details: 'Purchased via PO-2024-0091', status: 'Active' },
      { id: 'EVT-2024-0884', asset_id: 'ITA-00610', asset_name: 'Cisco Catalyst 9300 48-Port', event_type: 'Firmware Update', initiated_by: 'Rahul Verma', timestamp: '2024-10-15 22:30', details: 'Upgraded to Cisco IOS XE 17.9.4a', status: 'Completed' },
      { id: 'EVT-2024-0883', asset_id: 'ITA-00611', asset_name: 'Epson WorkForce Pro WF-C5790', event_type: 'Maintenance', initiated_by: 'Vendor Support', timestamp: '2024-10-14 15:40', details: 'Roller kit replacement complete', status: 'Completed' },
      { id: 'EVT-2024-0882', asset_id: 'ITA-00612', asset_name: 'Dell UltraSharp 27" U2723QE', event_type: 'Transfer', initiated_by: 'Pooja Nair', timestamp: '2024-10-13 11:05', details: 'Assigned to Dev Lab 4', status: 'Completed' },
      { id: 'EVT-2024-0881', asset_id: 'ITA-00613', asset_name: 'Lenovo ThinkCentre M70q Tiny', event_type: 'Decommissioned', initiated_by: 'Syed Hashim', timestamp: '2024-10-12 17:00', details: 'End of lifecycle write-off', status: 'Retired' },
      { id: 'EVT-2024-0880', asset_id: 'ITA-00614', asset_name: 'APC Smart-UPS 3000VA LCD', event_type: 'Battery Check', initiated_by: 'Ananya Roy', timestamp: '2024-10-11 13:20', details: 'Health rating 94% nominal', status: 'Verified' }
    ]
  },

  'warranty-expiring': {
    title: 'Warranty Expiring',
    description: 'Hardware equipment with manufacturer or OEM warranty terminating within 90 days.',
    kpis: [
      { label: 'Expiring in 30 Days', value: '8', change: 'Critical attention', color: 'red' },
      { label: 'Expiring in 60-90 Days', value: '16', change: 'Quote requests sent', color: 'amber' },
      { label: 'Total Replacement Value', value: '₹18.4L', change: 'Budget impact', color: 'blue' },
      { label: 'Vendor Renewals Active', value: '4', change: 'Dell & AppleCare', color: 'emerald' }
    ],
    columns: [
      { key: 'id', label: 'Asset ID', sortable: true },
      { key: 'asset_name', label: 'Asset Name', sortable: true },
      { key: 'mfg', label: 'Manufacturer', sortable: true },
      { key: 'serial', label: 'Serial No', sortable: true },
      { key: 'warranty_end', label: 'Warranty End', sortable: true },
      { key: 'days_left', label: 'Days Left', sortable: true },
      { key: 'vendor', label: 'Support Vendor', sortable: true },
      { key: 'status', label: 'Action Status', sortable: true }
    ],
    rows: [
      { id: 'ITA-00512', asset_name: 'Dell Latitude 7420 Core i7', mfg: 'Dell', serial: 'SN-DEL-992101', warranty_end: '2024-11-04', days_left: '14 days', vendor: 'Dell ProSupport', status: 'Renewal Pending' },
      { id: 'ITA-00518', asset_name: 'Lenovo ThinkPad T14 Gen 2', mfg: 'Lenovo', serial: 'SN-LEN-881240', warranty_end: '2024-11-10', days_left: '20 days', vendor: 'Lenovo Premier', status: 'Quote Received' },
      { id: 'ITA-00522', asset_name: 'Dell PowerEdge R640 Server', mfg: 'Dell', serial: 'SN-DEL-771923', warranty_end: '2024-11-15', days_left: '25 days', vendor: 'SBM Computers', status: 'Urgent Review' },
      { id: 'ITA-00531', asset_name: 'Apple MacBook Air 13" M1', mfg: 'Apple', serial: 'SN-APP-662301', warranty_end: '2024-11-22', days_left: '32 days', vendor: 'AppleCare Enterprise', status: 'Renewal Pending' },
      { id: 'ITA-00540', asset_name: 'HP LaserJet Enterprise M507', mfg: 'HP', serial: 'SN-HP-551982', warranty_end: '2024-11-28', days_left: '38 days', vendor: 'HP Care Pack', status: 'Under Review' },
      { id: 'ITA-00544', asset_name: 'Cisco Catalyst 2960-X Switch', mfg: 'Cisco', serial: 'SN-CIS-441029', warranty_end: '2024-12-05', days_left: '45 days', vendor: 'Cisco SMARTnet', status: 'Quote Received' },
      { id: 'ITA-00551', asset_name: 'Dell UltraSharp 34" Curved', mfg: 'Dell', serial: 'SN-DEL-339102', warranty_end: '2024-12-12', days_left: '52 days', vendor: 'Dell ProSupport', status: 'Renewal Pending' },
      { id: 'ITA-00560', asset_name: 'Fortinet FortiGate 100F Firewall', mfg: 'Fortinet', serial: 'SN-FOR-228190', warranty_end: '2024-12-20', days_left: '60 days', vendor: 'FortiCare 24x7', status: 'Scheduled' },
      { id: 'ITA-00568', asset_name: 'Synology RackStation RS2423+', mfg: 'Synology', serial: 'SN-SYN-110293', warranty_end: '2025-01-08', days_left: '79 days', vendor: 'Synology Extended', status: 'Monitoring' },
      { id: 'ITA-00572', asset_name: 'Polycom RealPresence Group 500', mfg: 'Poly', serial: 'SN-POL-990182', warranty_end: '2025-01-19', days_left: '90 days', vendor: 'Polycom Advantage', status: 'Monitoring' }
    ]
  },

  'physical-audit-due': {
    title: 'Physical Audit Due',
    description: 'Hardware assets requiring physical verification, barcode scan, and location reconciliation.',
    kpis: [
      { label: 'Audits Overdue', value: '24', change: 'Requires field check', color: 'red' },
      { label: 'Due This Month', value: '38', change: 'Scheduled cycles', color: 'amber' },
      { label: 'Audited YTD', value: '312', change: '88.4% on-target', color: 'blue' },
      { label: 'Reconciliation Rate', value: '96.2%', change: 'Minimal variances', color: 'emerald' }
    ],
    columns: [
      { key: 'id', label: 'Asset ID', sortable: true },
      { key: 'name', label: 'Asset Title', sortable: true },
      { key: 'location', label: 'Expected Location', sortable: true },
      { key: 'custodian', label: 'Assigned Custodian', sortable: true },
      { key: 'last_audited', label: 'Last Audited', sortable: true },
      { key: 'due_date', label: 'Audit Due Date', sortable: true },
      { key: 'risk', label: 'Audit Priority', sortable: true },
      { key: 'status', label: 'Status', sortable: true }
    ],
    rows: [
      { id: 'ITA-00605', name: 'Lenovo ThinkPad X1 Carbon Gen 11', location: 'Bangalore Campus - Block B', custodian: 'Ananya Roy', last_audited: '2023-10-12', due_date: '2024-10-12', risk: 'High', status: 'Overdue' },
      { id: 'ITA-00606', name: 'Dell Latitude 5440 Core i7', location: 'Bangalore Campus - Block A', custodian: 'Syed Hashim', last_audited: '2023-10-14', due_date: '2024-10-14', risk: 'Medium', status: 'Overdue' },
      { id: 'ITA-00607', name: 'Apple MacBook Pro 16" M3 Max', location: 'Mumbai Office - 4th Floor', custodian: 'Vikram Sethi', last_audited: '2023-10-18', due_date: '2024-10-18', risk: 'High', status: 'Overdue' },
      { id: 'ITA-00608', name: 'Dell PowerEdge R750xs Server', location: 'Bangalore DC - Rack 04', custodian: 'Rahul Verma', last_audited: '2023-10-25', due_date: '2024-10-25', risk: 'Critical', status: 'Due Today' },
      { id: 'ITA-00609', name: 'HP Elite Dragonfly G4', location: 'Delhi Hub - Executive Floor', custodian: 'Pooja Nair', last_audited: '2023-11-01', due_date: '2024-11-01', risk: 'Medium', status: 'Scheduled' },
      { id: 'ITA-00610', name: 'Cisco Catalyst 9300 48-Port', location: 'Bangalore DC - Switch Room', custodian: 'Rahul Verma', last_audited: '2023-11-05', due_date: '2024-11-05', risk: 'High', status: 'Scheduled' },
      { id: 'ITA-00611', name: 'Epson WorkForce Pro WF-C5790', location: 'Bangalore Campus - Finance Bay', custodian: 'Tajammul Farooq', last_audited: '2023-11-08', due_date: '2024-11-08', risk: 'Low', status: 'Scheduled' },
      { id: 'ITA-00612', name: 'Dell UltraSharp 27" U2723QE', location: 'Bangalore Campus - Dev Lab 4', custodian: 'Syed Hashim', last_audited: '2023-11-12', due_date: '2024-11-12', risk: 'Low', status: 'Scheduled' },
      { id: 'ITA-00613', name: 'Lenovo ThinkCentre M70q Tiny', location: 'Pune Office - Reception', custodian: 'Ananya Roy', last_audited: '2023-11-15', due_date: '2024-11-15', risk: 'Low', status: 'Scheduled' },
      { id: 'ITA-00614', name: 'APC Smart-UPS 3000VA LCD', location: 'Bangalore DC - UPS Room', custodian: 'Rahul Verma', last_audited: '2023-11-20', due_date: '2024-11-20', risk: 'High', status: 'Scheduled' }
    ]
  },

  'audit-worksheet-30-days': {
    title: 'Audit Worksheet (30 Days)',
    description: 'Active 30-day inventory batch verification and serial number scanning worksheet.',
    kpis: [
      { label: 'Worksheet Targets', value: '120', change: 'Current batch', color: 'blue' },
      { label: 'Verified & Reconciled', value: '74', change: '61.6% completed', color: 'emerald' },
      { label: 'Discrepancies Flagged', value: '5', change: 'Investigating', color: 'red' },
      { label: 'Days Remaining', value: '14', change: 'Cycle ends Oct 31', color: 'amber' }
    ],
    columns: [
      { key: 'sheet_id', label: 'Batch ID', sortable: true },
      { key: 'asset_id', label: 'Asset Tag', sortable: true },
      { key: 'serial', label: 'Serial Number', sortable: true },
      { key: 'zone', label: 'Campus / Bay', sortable: true },
      { key: 'auditor', label: 'Scanned By', sortable: true },
      { key: 'scan_time', label: 'Scan Date', sortable: true },
      { key: 'discrepancy', label: 'Discrepancy', sortable: false },
      { key: 'state', label: 'Worksheet State', sortable: true }
    ],
    rows: [
      { sheet_id: 'WS-30D-0101', asset_id: 'ITA-00601', serial: 'SN-DEL-100001', zone: 'Bangalore - Block B (Flr 2)', auditor: 'Ananya Roy', scan_time: '2024-10-20 11:30', discrepancy: 'None (Matched)', state: 'Reconciled' },
      { sheet_id: 'WS-30D-0102', asset_id: 'ITA-00602', serial: 'SN-DEL-100002', zone: 'Bangalore - Block B (Flr 2)', auditor: 'Ananya Roy', scan_time: '2024-10-20 11:32', discrepancy: 'None (Matched)', state: 'Reconciled' },
      { sheet_id: 'WS-30D-0103', asset_id: 'ITA-00603', serial: 'SN-HP-100003', zone: 'Bangalore - Block B (Flr 3)', auditor: 'Ananya Roy', scan_time: '2024-10-20 11:38', discrepancy: 'Location mismatch (Was A)', state: 'Updated' },
      { sheet_id: 'WS-30D-0104', asset_id: 'ITA-00604', serial: 'SN-HP-100004', zone: 'Bangalore - Block B (Flr 3)', auditor: 'Ananya Roy', scan_time: '2024-10-20 11:41', discrepancy: 'None (Matched)', state: 'Reconciled' },
      { sheet_id: 'WS-30D-0105', asset_id: 'ITA-00605', serial: 'SN-LEN-100005', zone: 'Bangalore - Block B (Flr 4)', auditor: 'Tajammul Farooq', scan_time: '2024-10-19 14:15', discrepancy: 'User transferred', state: 'Pending Approval' },
      { sheet_id: 'WS-30D-0106', asset_id: 'ITA-00606', serial: 'SN-DEL-100006', zone: 'Bangalore - Block A (Flr 1)', auditor: 'Tajammul Farooq', scan_time: '2024-10-19 14:22', discrepancy: 'None (Matched)', state: 'Reconciled' },
      { sheet_id: 'WS-30D-0107', asset_id: 'ITA-00607', serial: 'SN-APP-100007', zone: 'Mumbai Office - Bay 2', auditor: 'Vikram Sethi', scan_time: '2024-10-18 10:05', discrepancy: 'Barcode faded (Replaced)', state: 'Re-tagged' },
      { sheet_id: 'WS-30D-0108', asset_id: 'ITA-00608', serial: 'SN-DEL-100008', zone: 'Bangalore DC - Rack 04', auditor: 'Rahul Verma', scan_time: '2024-10-17 16:50', discrepancy: 'None (Matched)', state: 'Reconciled' },
      { sheet_id: 'WS-30D-0109', asset_id: 'ITA-00609', serial: 'SN-HP-100009', zone: 'Delhi Hub - Flr 1', auditor: 'Pooja Nair', scan_time: '2024-10-16 09:40', discrepancy: 'None (Matched)', state: 'Reconciled' },
      { sheet_id: 'WS-30D-0110', asset_id: 'ITA-00610', serial: 'SN-CIS-100010', zone: 'Bangalore DC - Rack 01', auditor: 'Rahul Verma', scan_time: '2024-10-15 15:10', discrepancy: 'None (Matched)', state: 'Reconciled' }
    ]
  },

  'software-licences': {
    title: 'Software Licences',
    docType: 'Software License',
    description: 'Volume enterprise agreements, seat counts, allocation ratios, and expiry schedules.',
    kpis: [
      { label: 'Total Licences', value: '42', change: 'Across 18 vendors', color: 'blue' },
      { label: 'Allocated Seats', value: '1,840', change: '86.8% utilization', color: 'emerald' },
      { label: 'Unallocated Seats', value: '280', change: 'Available pool', color: 'blue' },
      { label: 'Annual SaaS Spend', value: '₹64.2L', change: 'Contract commitments', color: 'amber' }
    ],
    columns: [
      { key: 'id', label: 'License ID', sortable: true },
      { key: 'software', label: 'Software Suite', sortable: true },
      { key: 'publisher', label: 'Publisher', sortable: true },
      { key: 'type', label: 'License Model', sortable: true },
      { key: 'total_seats', label: 'Total Seats', sortable: true },
      { key: 'used_seats', label: 'Assigned Seats', sortable: true },
      { key: 'expiry', label: 'Expiry Date', sortable: true },
      { key: 'status', label: 'Compliance Status', sortable: true }
    ],
    rows: [
      { id: 'LIC-2024-001', software: 'Microsoft 365 E5 Enterprise', publisher: 'Microsoft', type: 'Per User / Monthly', total_seats: '650', used_seats: '624', expiry: '2025-06-30', status: 'Compliant' },
      { id: 'LIC-2024-002', software: 'Adobe Creative Cloud All Apps', publisher: 'Adobe Inc.', type: 'Named User', total_seats: '85', used_seats: '82', expiry: '2025-03-31', status: 'Compliant' },
      { id: 'LIC-2024-003', software: 'GitHub Enterprise Cloud', publisher: 'GitHub / MS', type: 'Per Seat / Annual', total_seats: '140', used_seats: '145', expiry: '2025-04-15', status: 'Over-allocated' },
      { id: 'LIC-2024-004', software: 'Slack Enterprise Grid', publisher: 'Salesforce', type: 'Per User / Annual', total_seats: '700', used_seats: '688', expiry: '2025-08-31', status: 'Compliant' },
      { id: 'LIC-2024-005', software: 'Figma Organization', publisher: 'Figma', type: 'Editor Seat', total_seats: '60', used_seats: '58', expiry: '2025-05-30', status: 'Compliant' },
      { id: 'LIC-2024-006', software: 'Zoom Workplace Enterprise', publisher: 'Zoom Video', type: 'Named Host', total_seats: '200', used_seats: '164', expiry: '2025-02-28', status: 'Compliant' },
      { id: 'LIC-2024-007', software: 'Datadog APM & Infrastructure', publisher: 'Datadog', type: 'Host Unit', total_seats: '50', used_seats: '46', expiry: '2025-01-31', status: 'Compliant' },
      { id: 'LIC-2024-008', software: 'CrowdStrike Falcon Enterprise', publisher: 'CrowdStrike', type: 'Per Endpoint', total_seats: '550', used_seats: '516', expiry: '2025-07-31', status: 'Compliant' },
      { id: 'LIC-2024-009', software: 'JetBrains All Products Pack', publisher: 'JetBrains', type: 'Commercial Seat', total_seats: '75', used_seats: '70', expiry: '2024-12-15', status: 'Renewal Pending' },
      { id: 'LIC-2024-010', software: 'Atlassian Jira Software Cloud', publisher: 'Atlassian', type: 'Tiered User', total_seats: '300', used_seats: '292', expiry: '2025-09-30', status: 'Compliant' }
    ]
  },

  'devices-by-software': {
    title: 'Devices by Software',
    description: 'Endpoint application mappings detected via GLPI Agent, Intune MDM, and Entra SSO.',
    kpis: [
      { label: 'Tracked Packages', value: '156', change: 'Curated catalog', color: 'blue' },
      { label: 'Managed Endpoints', value: '492', change: 'Windows, Mac & Linux', color: 'blue' },
      { label: 'Outdated Builds', value: '34', change: 'Patches scheduled', color: 'amber' },
      { label: 'Discovery Health', value: '99.2%', change: 'Last run 12m ago', color: 'emerald' }
    ],
    columns: [
      { key: 'pkg_id', label: 'Package ID', sortable: true },
      { key: 'app_title', label: 'Application Name', sortable: true },
      { key: 'version', label: 'Installed Version', sortable: true },
      { key: 'device_name', label: 'Device Hostname', sortable: true },
      { key: 'platform', label: 'Platform / OS', sortable: true },
      { key: 'user', label: 'Primary User', sortable: true },
      { key: 'last_detected', label: 'Last Detected', sortable: true },
      { key: 'compliance', label: 'Patch State', sortable: true }
    ],
    rows: [
      { pkg_id: 'PKG-001', app_title: 'Microsoft 365 Apps for Enterprise', version: '16.0.17830.20138', device_name: 'blr-lap-05.internal.corp', platform: 'Windows 11 Enterprise', user: 'ananya.roy@proficientnow.com', last_detected: '2024-10-21 08:30', compliance: 'Current' },
      { pkg_id: 'PKG-002', app_title: 'CrowdStrike Falcon Sensor', version: '7.14.18305.0', device_name: 'blr-lap-05.internal.corp', platform: 'Windows 11 Enterprise', user: 'ananya.roy@proficientnow.com', last_detected: '2024-10-21 08:30', compliance: 'Current' },
      { pkg_id: 'PKG-003', app_title: 'Docker Desktop', version: '4.34.2', device_name: 'blr-lap-06.internal.corp', platform: 'macOS Sonoma 14.6', user: 'shashim@proficientnow.com', last_detected: '2024-10-21 07:15', compliance: 'Current' },
      { pkg_id: 'PKG-004', app_title: 'Google Chrome Enterprise', version: '130.0.6723.59', device_name: 'blr-lap-06.internal.corp', platform: 'macOS Sonoma 14.6', user: 'shashim@proficientnow.com', last_detected: '2024-10-21 07:15', compliance: 'Current' },
      { pkg_id: 'PKG-005', app_title: 'Slack Desktop Client', version: '4.40.127', device_name: 'blr-lap-07.internal.corp', platform: 'macOS Sonoma 14.5', user: 'vsethi@proficientnow.com', last_detected: '2024-10-20 18:20', compliance: 'Update Available' },
      { pkg_id: 'PKG-006', app_title: 'IntelliJ IDEA Ultimate', version: '2024.2.3', device_name: 'blr-lap-07.internal.corp', platform: 'macOS Sonoma 14.5', user: 'vsethi@proficientnow.com', last_detected: '2024-10-20 18:20', compliance: 'Current' },
      { pkg_id: 'PKG-007', app_title: 'OpenVPN Connect', version: '3.4.4', device_name: 'del-lap-09.internal.corp', platform: 'Windows 11 Enterprise', user: 'pnair@proficientnow.com', last_detected: '2024-10-20 16:10', compliance: 'Current' },
      { pkg_id: 'PKG-008', app_title: '7-Zip File Archiver', version: '24.08', device_name: 'del-lap-09.internal.corp', platform: 'Windows 11 Enterprise', user: 'pnair@proficientnow.com', last_detected: '2024-10-20 16:10', compliance: 'Current' },
      { pkg_id: 'PKG-009', app_title: 'Python 3 Runtime', version: '3.11.8', device_name: 'blr-srv-08.internal.corp', platform: 'Ubuntu 22.04 LTS', user: 'system.service', last_detected: '2024-10-20 12:00', compliance: 'Current' },
      { pkg_id: 'PKG-010', app_title: 'PostgreSQL Client Tools', version: '16.4', device_name: 'blr-srv-08.internal.corp', platform: 'Ubuntu 22.04 LTS', user: 'system.service', last_detected: '2024-10-20 12:00', compliance: 'Current' },
      { pkg_id: 'PKG-011', app_title: 'Visual Studio Code', version: '1.94.2', device_name: 'blr-lap-11.internal.corp', platform: 'Windows 11 Enterprise', user: 'tfarooq@proficientnow.com', last_detected: '2024-10-19 14:00', compliance: 'Current' },
      { pkg_id: 'PKG-012', app_title: 'Zoom Meetings Client', version: '6.2.3', device_name: 'blr-lap-11.internal.corp', platform: 'Windows 11 Enterprise', user: 'tfarooq@proficientnow.com', last_detected: '2024-10-19 14:00', compliance: 'Current' }
    ]
  },

  'licence-compliance': {
    title: 'Licence Compliance',
    description: 'Variance analysis comparing contractual license entitlements against real endpoint installations.',
    kpis: [
      { label: 'Fully Compliant', value: '28', change: 'Within safe margins', color: 'emerald' },
      { label: 'Over-allocated', value: '4', change: 'Requires seat purchase', color: 'red' },
      { label: 'Under-utilized', value: '9', change: 'Savings opportunity', color: 'amber' },
      { label: 'True-up Exposure', value: '₹4.2L', change: 'Audit estimate', color: 'red' }
    ],
    columns: [
      { key: 'product', label: 'Licensed Product', sortable: true },
      { key: 'publisher', label: 'Publisher', sortable: true },
      { key: 'entitled', label: 'Entitled Seats', sortable: true },
      { key: 'detected', label: 'Active Installs', sortable: true },
      { key: 'variance', label: 'Seat Variance', sortable: true },
      { key: 'exposure', label: 'Cost Exposure', sortable: true },
      { key: 'risk_level', label: 'Risk Rating', sortable: true },
      { key: 'action', label: 'Recommended Action', sortable: false }
    ],
    rows: [
      { product: 'GitHub Enterprise Cloud', publisher: 'Microsoft', entitled: '140', detected: '145', variance: '+5 (Deficit)', exposure: '₹1,05,000', risk_level: 'High', action: 'Procure 5 additional seats via CSP' },
      { product: 'Adobe Creative Cloud', publisher: 'Adobe', entitled: '85', detected: '88', variance: '+3 (Deficit)', exposure: '₹1,80,000', risk_level: 'High', action: 'Reclaim unused seats or buy licenses' },
      { product: 'JetBrains All Products Pack', publisher: 'JetBrains', entitled: '75', detected: '77', variance: '+2 (Deficit)', exposure: '₹84,000', risk_level: 'Medium', action: 'Reassign 2 idle licenses' },
      { product: 'Figma Organization', publisher: 'Figma', entitled: '60', detected: '62', variance: '+2 (Deficit)', exposure: '₹55,000', risk_level: 'Medium', action: 'Convert 2 users to Viewer-Restricted' },
      { product: 'Microsoft 365 E5', publisher: 'Microsoft', entitled: '650', detected: '624', variance: '-26 (Surplus)', exposure: '₹0 (Safe)', risk_level: 'Low', action: 'Pool reserved for onboarding' },
      { product: 'Slack Enterprise Grid', publisher: 'Salesforce', entitled: '700', detected: '688', variance: '-12 (Surplus)', exposure: '₹0 (Safe)', risk_level: 'Low', action: 'Sufficient buffer maintained' },
      { product: 'CrowdStrike Falcon', publisher: 'CrowdStrike', entitled: '550', detected: '516', variance: '-34 (Surplus)', exposure: '₹0 (Safe)', risk_level: 'Low', action: 'Buffer for new laptop shipments' },
      { product: 'Zoom Workplace', publisher: 'Zoom Video', entitled: '200', detected: '164', variance: '-36 (Surplus)', exposure: '₹0 (Safe)', risk_level: 'Low', action: 'Consider downsizing on next renewal' }
    ]
  },

  'prohibited-software': {
    title: 'Prohibited Software',
    description: 'Blacklisted executables, unapproved VPNs, peer-to-peer clients, and security policy violations.',
    kpis: [
      { label: 'Active Alerts', value: '6', change: 'Policy violations', color: 'red' },
      { label: 'High Severity', value: '3', change: 'Immediate isolate', color: 'red' },
      { label: 'Isolated Devices', value: '2', change: 'Network restricted', color: 'amber' },
      { label: 'Remediated YTD', value: '41', change: 'Cleaned successfully', color: 'emerald' }
    ],
    columns: [
      { key: 'alert_id', label: 'Alert ID', sortable: true },
      { key: 'app_name', label: 'Prohibited Software', sortable: true },
      { key: 'category', label: 'Risk Category', sortable: true },
      { key: 'device', label: 'Endpoint Device', sortable: true },
      { key: 'user', label: 'Logged-in User', sortable: true },
      { key: 'detected_at', label: 'Detection Date', sortable: true },
      { key: 'severity', label: 'Severity', sortable: true },
      { key: 'status', label: 'Containment', sortable: true }
    ],
    rows: [
      { alert_id: 'SEC-PRO-081', app_name: 'BitTorrent Client v7.10', category: 'P2P File Sharing', device: 'blr-lap-44.internal.corp', user: 'karan.j@proficientnow.com', detected_at: '2024-10-21 08:14', severity: 'High', status: 'Process Blocked' },
      { alert_id: 'SEC-PRO-080', app_name: 'NordVPN Consumer Client', category: 'Unapproved VPN / Tunnel', device: 'del-lap-19.internal.corp', user: 'amrita.s@proficientnow.com', detected_at: '2024-10-20 19:40', severity: 'High', status: 'Quarantined' },
      { alert_id: 'SEC-PRO-079', app_name: 'CCleaner Free Utility', category: 'Unvetted Registry Cleaner', device: 'blr-lap-29.internal.corp', user: 'rahul.t@proficientnow.com', detected_at: '2024-10-20 11:25', severity: 'Medium', status: 'Pending Removal' },
      { alert_id: 'SEC-PRO-078', app_name: 'AnyDesk Remote Desktop', category: 'Shadow Remote Access', device: 'mum-lap-08.internal.corp', user: 'deepak.v@proficientnow.com', detected_at: '2024-10-19 14:50', severity: 'High', status: 'Port Blocked' },
      { alert_id: 'SEC-PRO-077', app_name: 'uTorrent Web Installer', category: 'P2P File Sharing', device: 'blr-lap-52.internal.corp', user: 'neha.k@proficientnow.com', detected_at: '2024-10-18 16:30', severity: 'High', status: 'Quarantined' },
      { alert_id: 'SEC-PRO-076', app_name: 'WireShark Portable', category: 'Network Packet Sniffer', device: 'blr-lap-12.internal.corp', user: 'manish.p@proficientnow.com', detected_at: '2024-10-17 10:15', severity: 'Medium', status: 'Under Review' },
      { alert_id: 'SEC-PRO-075', app_name: 'Cheat Engine Memory Mod', category: 'Process Injection Tool', device: 'blr-lap-88.internal.corp', user: 'siddharth.m@proficientnow.com', detected_at: '2024-10-15 13:00', severity: 'Critical', status: 'Isolated' },
      { alert_id: 'SEC-PRO-074', app_name: 'Telegram Desktop (Direct .exe)', category: 'Unapproved Messaging App', device: 'del-lap-22.internal.corp', user: 'priya.g@proficientnow.com', detected_at: '2024-10-14 17:45', severity: 'Low', status: 'User Warned' }
    ]
  },

  'software-cross-check': {
    title: 'Software Cross-Check',
    description: 'Multi-source reconciliation comparing GLPI agent inventory against Microsoft Intune MDM & Entra ID.',
    kpis: [
      { label: 'Reconciled Endpoints', value: '380', change: 'Cross-verified', color: 'blue' },
      { label: 'Full Source Matches', value: '352', change: '92.6% parity', color: 'emerald' },
      { label: 'Identified Discrepancies', value: '28', change: 'Resolution underway', color: 'amber' },
      { label: 'Discovery Latency', value: '< 5m', change: 'Real-time telemetry', color: 'blue' }
    ],
    columns: [
      { key: 'tag', label: 'Device Tag', sortable: true },
      { key: 'app', label: 'Target Software', sortable: true },
      { key: 'glpi', label: 'GLPI Agent Scan', sortable: true },
      { key: 'intune', label: 'Intune MDM Scan', sortable: true },
      { key: 'entra', label: 'Entra SSO Activity', sortable: true },
      { key: 'delta', label: 'Discrepancy Detail', sortable: false },
      { key: 'action', label: 'Resolution Path', sortable: true }
    ],
    rows: [
      { tag: 'ITA-00605', app: 'Microsoft 365 Enterprise', glpi: 'v16.0.17830 (Installed)', intune: 'Compliant Build', entra: 'Active Sign-in (Today)', delta: 'Full Parity', action: 'Synchronized' },
      { tag: 'ITA-00606', app: 'CrowdStrike Falcon Sensor', glpi: 'v7.14 (Active)', intune: 'Installed', entra: 'N/A (Agent)', delta: 'Full Parity', action: 'Synchronized' },
      { tag: 'ITA-00607', app: 'Adobe Creative Cloud', glpi: 'Not Detected', intune: 'Not Managed', entra: 'Active Token (Yesterday)', delta: 'Browser SSO without local install', action: 'Assign Local App' },
      { tag: 'ITA-00608', app: 'Docker Desktop Pro', glpi: 'v4.34.2 (Installed)', intune: 'Policy Enforced', entra: 'SSO Confirmed', delta: 'Full Parity', action: 'Synchronized' },
      { tag: 'ITA-00609', app: 'Slack Desktop Client', glpi: 'v4.38.11 (Outdated)', intune: 'Update Required', entra: 'Active Sign-in', delta: 'Version mismatch with policy baseline', action: 'Push Intune Patch' },
      { tag: 'ITA-00610', app: 'Zoom Meetings Client', glpi: 'v6.2.3 (Installed)', intune: 'Compliant Build', entra: 'Active Sign-in', delta: 'Full Parity', action: 'Synchronized' },
      { tag: 'ITA-00611', app: 'Figma Desktop', glpi: 'Installed', intune: 'Not Monitored', entra: 'Active Sign-in', delta: 'Intune catalog missing package definition', action: 'Catalog Ingestion' },
      { tag: 'ITA-00612', app: 'JetBrains IntelliJ IDEA', glpi: 'v2024.2.3', intune: 'Compliant', entra: 'SSO Confirmed', delta: 'Full Parity', action: 'Synchronized' }
    ]
  },

  'saas-renewal-watch': {
    title: 'SaaS Renewal Watch',
    description: 'Upcoming cloud subscriptions, termination notice periods, pricing reviews, and auto-renew dates.',
    kpis: [
      { label: 'Renewals (Next 60d)', value: '5', change: 'Negotiation window open', color: 'amber' },
      { label: 'Monthly Run Rate', value: '₹12.8L', change: 'Cloud spend', color: 'blue' },
      { label: 'Potential Savings', value: '₹3.4L', change: 'Idle seat reclamation', color: 'emerald' },
      { label: 'Auto-Renew Active', value: '18', change: 'Notice required', color: 'amber' }
    ],
    columns: [
      { key: 'service', label: 'SaaS Service', sortable: true },
      { key: 'vendor', label: 'Vendor / Provider', sortable: true },
      { key: 'owner', label: 'Internal Owner', sortable: true },
      { key: 'cadence', label: 'Billing Cadence', sortable: true },
      { key: 'renewal_date', label: 'Renewal Date', sortable: true },
      { key: 'notice_window', label: 'Notice Period', sortable: true },
      { key: 'cost', label: 'Cost / Cycle', sortable: true },
      { key: 'status', label: 'Action State', sortable: true }
    ],
    rows: [
      { service: 'JetBrains All Products Pack', vendor: 'JetBrains s.r.o.', owner: 'Vikram Sethi (Eng)', cadence: 'Annual', renewal_date: '2024-12-15', notice_window: '30 days before', cost: '₹6,40,000', status: 'In Review' },
      { service: 'Datadog Cloud Monitoring', vendor: 'Datadog Inc.', owner: 'Rahul Verma (DevOps)', cadence: 'Annual', renewal_date: '2025-01-31', notice_window: '45 days before', cost: '₹14,50,000', status: 'Pricing RFP' },
      { service: 'Zoom Workplace Enterprise', vendor: 'Zoom Video Comm.', owner: 'Tajammul Farooq (IT)', cadence: 'Annual', renewal_date: '2025-02-28', notice_window: '30 days before', cost: '₹8,20,000', status: 'Downsize Review' },
      { service: 'Adobe Creative Cloud', vendor: 'Adobe Inc.', owner: 'Ananya Roy (Design)', cadence: 'Annual', renewal_date: '2025-03-31', notice_window: '30 days before', cost: '₹11,40,000', status: 'Scheduled' },
      { service: 'GitHub Enterprise Cloud', vendor: 'Microsoft GitHub', owner: 'Syed Hashim (IT)', cadence: 'Annual', renewal_date: '2025-04-15', notice_window: '60 days before', cost: '₹18,50,000', status: 'Scheduled' },
      { service: 'Figma Organization', vendor: 'Figma Inc.', owner: 'Ananya Roy (Design)', cadence: 'Annual', renewal_date: '2025-05-30', notice_window: '30 days before', cost: '₹7,80,000', status: 'Active' },
      { service: 'Microsoft 365 E5', vendor: 'Microsoft Corp.', owner: 'Syed Hashim (IT)', cadence: 'Annual', renewal_date: '2025-06-30', notice_window: '60 days before', cost: '₹42,00,000', status: 'Active' },
      { service: 'Slack Enterprise Grid', vendor: 'Salesforce.com', owner: 'Syed Hashim (IT)', cadence: 'Annual', renewal_date: '2025-08-31', notice_window: '60 days before', cost: '₹16,20,000', status: 'Active' }
    ]
  },

  'identity-access': {
    title: 'Identity & Access',
    description: 'Microsoft Entra ID directory accounts, privileged administrator roles, and MFA security status.',
    kpis: [
      { label: 'Synchronized Users', value: '2,410', change: 'Directory active', color: 'blue' },
      { label: 'Privileged Admins', value: '14', change: 'PIM enforced', color: 'blue' },
      { label: 'Orphaned Accounts', value: '3', change: 'Flagged for removal', color: 'red' },
      { label: 'MFA Enforced Rate', value: '98.9%', change: 'Conditional Access', color: 'emerald' }
    ],
    columns: [
      { key: 'upn', label: 'Account (UPN)', sortable: true },
      { key: 'name', label: 'Display Name', sortable: true },
      { key: 'department', label: 'Department', sortable: true },
      { key: 'title', label: 'Job Title', sortable: true },
      { key: 'role', label: 'Role Level', sortable: true },
      { key: 'mfa', label: 'MFA Posture', sortable: true },
      { key: 'last_login', label: 'Last Login', sortable: true },
      { key: 'status', label: 'Account State', sortable: true }
    ],
    rows: [
      { upn: 'shashim@proficientnow.com', name: 'Syed Hashim', department: 'IT & Infrastructure', title: 'Senior IT Systems Manager', role: 'Global Admin (PIM)', mfa: 'FIDO2 / MS Authenticator', last_login: 'Today, 09:14 AM', status: 'Active' },
      { upn: 'ananya.roy@proficientnow.com', name: 'Ananya Roy', department: 'IT Operations', title: 'IT Asset & Logistics Lead', role: 'Asset Admin', mfa: 'MS Authenticator', last_login: 'Today, 08:45 AM', status: 'Active' },
      { upn: 'tfarooq@proficientnow.com', name: 'Tajammul Farooq', department: 'IT Support', title: 'Lead Systems Administrator', role: 'Helpdesk Admin', mfa: 'MS Authenticator', last_login: 'Today, 08:50 AM', status: 'Active' },
      { upn: 'vsethi@proficientnow.com', name: 'Vikram Sethi', department: 'Engineering', title: 'Principal Architect', role: 'User', mfa: 'MS Authenticator', last_login: 'Today, 09:02 AM', status: 'Active' },
      { upn: 'pnair@proficientnow.com', name: 'Pooja Nair', department: 'Information Security', title: 'Lead InfoSec & Compliance', role: 'Security Admin', mfa: 'FIDO2 Hardware Key', last_login: 'Today, 07:30 AM', status: 'Active' },
      { upn: 'rverma@proficientnow.com', name: 'Rahul Verma', department: 'Cloud Platform', title: 'Cloud DevOps Specialist', role: 'Cloud App Admin', mfa: 'MS Authenticator', last_login: 'Yesterday, 11:20 PM', status: 'Active' },
      { upn: 'contractor.guest@proficientnow.com', name: 'External Contractor 01', department: 'Contractors', title: 'Front-end Consultant', role: 'Guest User', mfa: 'SMS OTP (Non-compliant)', last_login: '14 days ago', status: 'Needs Review' },
      { upn: 'ex.employee@proficientnow.com', name: 'Former Employee Archive', department: 'Finance (Ex)', title: 'Accounts Officer', role: 'User (Disabled)', mfa: 'Disabled', last_login: '92 days ago', status: 'Orphan Flagged' }
    ]
  },

  'exceptions': {
    title: 'Exceptions',
    description: 'Hardware and software exceptions: unassigned hardware, missing serials, IP conflicts, or orphan CIs.',
    kpis: [
      { label: 'Active Exceptions', value: '34', change: '8 critical severity', color: 'red' },
      { label: 'Unassigned Hardware', value: '12', change: 'In storage rooms', color: 'amber' },
      { label: 'Missing Primary IP', value: '7', change: 'Agent sync required', color: 'red' },
      { label: 'Auto-Resolvable', value: '15', change: 'Ready for batch fix', color: 'blue' }
    ],
    subFilters: ['All', 'Unassigned Hardware', 'Expired Warranty', 'Missing Primary IP', 'Duplicate Serial'],
    columns: [
      { key: 'id', label: 'Exception ID', sortable: true },
      { key: 'ci_tag', label: 'CI Tag', sortable: true },
      { key: 'category', label: 'Exception Category', sortable: true },
      { key: 'severity', label: 'Severity', sortable: true },
      { key: 'root_cause', label: 'Root Cause Summary', sortable: false },
      { key: 'detected_date', label: 'Detected Date', sortable: true },
      { key: 'assignee', label: 'Assigned Engineer', sortable: true },
      { key: 'status', label: 'Status', sortable: true }
    ],
    rows: [
      { id: 'EXC-2024-041', ci_tag: 'ITA-00621', category: 'Unassigned Hardware', severity: 'Medium', root_cause: 'Dell Latitude 5440 in Bangalore Storage without assigned custodian', detected_date: '2024-10-20', assignee: 'Ananya Roy', status: 'Open' },
      { id: 'EXC-2024-042', ci_tag: 'ITA-00622', category: 'Missing Primary IP', severity: 'High', root_cause: 'Rack server responding to ICMP but primary_ip field is null', detected_date: '2024-10-20', assignee: 'Rahul Verma', status: 'In Progress' },
      { id: 'EXC-2024-043', ci_tag: 'ITA-00512', category: 'Expired Warranty', severity: 'High', root_cause: 'Warranty terminated on 2024-10-14 without extended support PO', detected_date: '2024-10-19', assignee: 'Syed Hashim', status: 'Escalated' },
      { id: 'EXC-2024-044', ci_tag: 'ITA-00630', category: 'Duplicate Serial', severity: 'Critical', root_cause: 'Serial number SN-DEL-991820 registered on two separate CI records', detected_date: '2024-10-18', assignee: 'Syed Hashim', status: 'Investigating' },
      { id: 'EXC-2024-045', ci_tag: 'ITA-00634', category: 'Unassigned Hardware', severity: 'Low', root_cause: 'HP Wireless Mouse unlinked from host PC after docking station swap', detected_date: '2024-10-17', assignee: 'Tajammul Farooq', status: 'Open' },
      { id: 'EXC-2024-046', ci_tag: 'ITA-00638', category: 'Missing Primary IP', severity: 'Medium', root_cause: 'Network printer on DHCP without fixed IP reservation', detected_date: '2024-10-16', assignee: 'Tajammul Farooq', status: 'Pending Config' },
      { id: 'EXC-2024-047', ci_tag: 'ITA-00518', category: 'Expired Warranty', severity: 'Medium', root_cause: 'Lenovo Premier support lapsed 7 days ago', detected_date: '2024-10-15', assignee: 'Ananya Roy', status: 'PO In Process' },
      { id: 'EXC-2024-048', ci_tag: 'ITA-00642', category: 'Duplicate Serial', severity: 'Critical', root_cause: 'Cisco SFP module serial duplicated across switch stack ports', detected_date: '2024-10-14', assignee: 'Rahul Verma', status: 'Open' }
    ]
  },

  'ticket-queue': {
    title: 'Ticket Queue',
    description: 'Service desk incidents, asset provisioning requests, repair dispatches, and CMDB tasks.',
    kpis: [
      { label: 'Open Work Orders', value: '22', change: '8 high priority', color: 'red' },
      { label: 'SLA At Risk', value: '3', change: '< 2 hours left', color: 'red' },
      { label: 'Resolved Today', value: '15', change: 'Average resolution 2.4h', color: 'emerald' },
      { label: 'First Contact Fix', value: '91.2%', change: '+3.4% this month', color: 'emerald' }
    ],
    columns: [
      { key: 'ticket_id', label: 'Ticket ID', sortable: true },
      { key: 'subject', label: 'Request Summary', sortable: true },
      { key: 'requester', label: 'Requester', sortable: true },
      { key: 'priority', label: 'Priority', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { key: 'assigned_to', label: 'Assigned Engineer', sortable: true },
      { key: 'created', label: 'Logged At', sortable: true },
      { key: 'status', label: 'Ticket Status', sortable: true }
    ],
    rows: [
      { ticket_id: 'INC-2024-1092', subject: 'Laptop display flickering on Dell Latitude 5440', requester: 'Kavita Menon', priority: 'High', category: 'Hardware Repair', assigned_to: 'Tajammul Farooq', created: '2024-10-21 09:20', status: 'In Progress' },
      { ticket_id: 'REQ-2024-0841', subject: 'New hire onboarding hardware bundle (MacBook Pro + Peripheral)', requester: 'HR Operations', priority: 'Medium', category: 'Asset Provisioning', assigned_to: 'Ananya Roy', created: '2024-10-21 08:45', status: 'Pending Approval' },
      { ticket_id: 'INC-2024-1091', subject: 'Unable to connect to Bangalore DC VPN gateway', requester: 'Amit Shinde', priority: 'Urgent', category: 'Network & Access', assigned_to: 'Rahul Verma', created: '2024-10-21 08:30', status: 'Assigned' },
      { ticket_id: 'REQ-2024-0840', subject: 'Additional 27" 4K Monitor request for Design Team', requester: 'Sanjay Dutt', priority: 'Low', category: 'Peripheral Request', assigned_to: 'Ananya Roy', created: '2024-10-20 17:15', status: 'Scheduled' },
      { ticket_id: 'INC-2024-1090', subject: 'Wireless keyboard battery compartment loose', requester: 'Deepa Krishnan', priority: 'Low', category: 'Peripheral Swap', assigned_to: 'Tajammul Farooq', created: '2024-10-20 15:40', status: 'Resolved' },
      { ticket_id: 'REQ-2024-0839', subject: 'GitHub Enterprise seat allocation for Mobile Team', requester: 'Vikram Sethi', priority: 'Medium', category: 'Software Entitlement', assigned_to: 'Syed Hashim', created: '2024-10-20 14:10', status: 'Completed' },
      { ticket_id: 'INC-2024-1089', subject: 'CrowdStrike Falcon Sensor flagging development binary', requester: 'Rohan Mehra', priority: 'High', category: 'Security False Positive', assigned_to: 'Pooja Nair', created: '2024-10-20 11:30', status: 'In Progress' },
      { ticket_id: 'REQ-2024-0838', subject: 'Asset transfer sign-off from Dev Lab to QA Stage', requester: 'Nisha Gupta', priority: 'Low', category: 'CMDB Custody Change', assigned_to: 'Ananya Roy', created: '2024-10-19 16:20', status: 'Resolved' },
      { ticket_id: 'INC-2024-1088', subject: 'Bangalore Block B Floor 3 Network Switch port dead', requester: 'Facilities Dept', priority: 'High', category: 'Infrastructure', assigned_to: 'Rahul Verma', created: '2024-10-19 13:00', status: 'Resolved' },
      { ticket_id: 'REQ-2024-0837', subject: 'Decommissioning and safe disposal of 4 legacy servers', requester: 'IT Asset Admin', priority: 'Medium', category: 'Disposal & Recycling', assigned_to: 'Syed Hashim', created: '2024-10-18 10:45', status: 'In Progress' }
    ]
  }
};

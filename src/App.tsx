import { useMemo, useState } from 'react';

export type ActiveView =
  | 'launcher'
  | 'it_home'
  | 'exceptions'
  // FINANCE
  | 'fin_invoices'
  | 'fin_payments'
  | 'fin_contracts'
  | 'fin_purchase_orders'
  | 'fin_reports'
  // HR
  | 'hr_employees'
  | 'hr_leave_approvals'
  | 'hr_onboarding'
  | 'hr_payroll'
  // IT ASSETS
  | 'it_assets'
  | 'asset_events'
  | 'warranty_expiring'
  | 'physical_audit_due'
  // IT SOFTWARE AND LICENSES
  | 'software_licenses'
  | 'license_compliance'
  | 'saas_renewal_watch'
  | 'license_expiry_calendar'
  | 'cost_analysis'
  // IT IDENTITY AND ACCESS
  | 'entra_users'
  | 'entra_groups'
  | 'directory_roles'
  | 'license_skus'
  | 'portal_access'
  // IT SECURITY & COMPLIANCE
  | 'compliance_reports'
  | 'security_audit'
  | 'incident_log'
  | 'policy_documents'
  // IT EXCEPTIONS
  | 'exceptions_departed_licenses'
  // SECURITY
  | 'sec_alerts'
  | 'sec_threat_log'
  | 'sec_vulnerabilities'
  | 'sec_access_reviews'
  // HELPDESK
  | 'help_open_tickets'
  | 'help_assigned_to_me'
  | 'help_sla_breaches'
  | 'help_kb_articles'
  // MARKETING & SEO
  | 'mkt_campaigns'
  | 'mkt_seo_audit'
  | 'mkt_social_channels'
  | 'mkt_ad_spend'
  // WIKI
  | 'wiki_articles'
  | 'wiki_sops'
  | 'wiki_system_manuals'
  | 'wiki_release_notes';

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
  sub_id?: string;
  [key: string]: any;
};

export type SummaryCard = {
  title: string;
  value: string | number;
  subtitle: string;
  tone: 'red' | 'amber' | 'blue' | 'emerald';
};

export type TableDefinition = {
  title: string;
  description: string;
  docType?: string;
  summaryCard?: SummaryCard;
  columns: ColumnConfig[];
  rows: TableRowData[];
};

export type NavItem = {
  id: Exclude<ActiveView, 'launcher' | 'it_home' | 'exceptions'> | 'exceptions_departed_licenses';
  label: string;
  badge: number;
};

export type NavSection = {
  id: string;
  sectionHeader?: string;
  items: NavItem[];
};

export type DepartmentModule = {
  id: string;
  label: string;
  color: string;
  badgeTotal: number;
  sections: NavSection[];
};

export const departmentModules: DepartmentModule[] = [
  {
    id: 'finance',
    label: 'Finance',
    color: '#14b8a6',
    badgeTotal: 136,
    sections: [
      {
        id: 'fin_core',
        sectionHeader: 'COMMERCIAL & LEDGERS',
        items: [
          { id: 'fin_invoices', label: 'Purchase Invoices', badge: 84 },
          { id: 'fin_payments', label: 'Payments', badge: 21 },
          { id: 'fin_contracts', label: 'Contracts and licences', badge: 12 },
          { id: 'fin_purchase_orders', label: 'Purchase orders', badge: 15 },
          { id: 'fin_reports', label: 'Financial reports', badge: 4 }
        ]
      }
    ]
  },
  {
    id: 'hr',
    label: 'HR',
    color: '#8b5cf6',
    badgeTotal: 49,
    sections: [
      {
        id: 'hr_core',
        sectionHeader: 'EMPLOYEE RECORDS',
        items: [
          { id: 'hr_employees', label: 'Employees', badge: 34 },
          { id: 'hr_leave_approvals', label: 'Leave approvals', badge: 6 },
          { id: 'hr_onboarding', label: 'Onboarding', badge: 5 },
          { id: 'hr_payroll', label: 'Payroll summaries', badge: 4 }
        ]
      }
    ]
  },
  {
    id: 'it',
    label: 'IT',
    color: '#1e40af',
    badgeTotal: 395,
    sections: [
      {
        id: 'assets',
        sectionHeader: 'ASSETS',
        items: [
          { id: 'it_assets', label: 'IT Assets', badge: 118 },
          { id: 'asset_events', label: 'Asset events', badge: 45 },
          { id: 'warranty_expiring', label: 'Warranty expiring', badge: 8 },
          { id: 'physical_audit_due', label: 'Physical audit due', badge: 12 }
        ]
      },
      {
        id: 'software',
        sectionHeader: 'SOFTWARE AND LICENSES',
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
        sectionHeader: 'IDENTITY AND ACCESS',
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
        sectionHeader: 'SECURITY & COMPLIANCE',
        items: [
          { id: 'compliance_reports', label: 'Compliance reports', badge: 4 },
          { id: 'security_audit', label: 'Security audit', badge: 1 },
          { id: 'incident_log', label: 'Incident log', badge: 3 },
          { id: 'policy_documents', label: 'Policy documents', badge: 12 }
        ]
      },
      {
        id: 'exceptions',
        sectionHeader: 'EXCEPTIONS',
        items: [
          { id: 'exceptions_departed_licenses', label: 'Departed with licenses', badge: 2 }
        ]
      }
    ]
  },
  {
    id: 'security',
    label: 'Security',
    color: '#ef4444',
    badgeTotal: 48,
    sections: [
      {
        id: 'sec_core',
        sectionHeader: 'THREAT & VULNERABILITY',
        items: [
          { id: 'sec_alerts', label: 'Security Alerts', badge: 21 },
          { id: 'sec_threat_log', label: 'Threat Log', badge: 14 },
          { id: 'sec_vulnerabilities', label: 'Vulnerability Scan', badge: 8 },
          { id: 'sec_access_reviews', label: 'Access Reviews', badge: 5 }
        ]
      }
    ]
  },
  {
    id: 'helpdesk',
    label: 'Helpdesk',
    color: '#f59e0b',
    badgeTotal: 47,
    sections: [
      {
        id: 'help_core',
        sectionHeader: 'SERVICE DESK QUEUE',
        items: [
          { id: 'help_open_tickets', label: 'Open Tickets', badge: 14 },
          { id: 'help_assigned_to_me', label: 'Assigned to Me', badge: 6 },
          { id: 'help_sla_breaches', label: 'SLA Breaches', badge: 3 },
          { id: 'help_kb_articles', label: 'Knowledge Base', badge: 24 }
        ]
      }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing & SEO',
    color: '#06b6d4',
    badgeTotal: 22,
    sections: [
      {
        id: 'mkt_core',
        sectionHeader: 'CAMPAIGNS & CHANNELS',
        items: [
          { id: 'mkt_campaigns', label: 'Campaigns', badge: 9 },
          { id: 'mkt_seo_audit', label: 'SEO Audit', badge: 4 },
          { id: 'mkt_social_channels', label: 'Social Channels', badge: 6 },
          { id: 'mkt_ad_spend', label: 'Ad Spend', badge: 3 }
        ]
      }
    ]
  },
  {
    id: 'wiki',
    label: 'Wiki',
    color: '#64748b',
    badgeTotal: 36,
    sections: [
      {
        id: 'wiki_core',
        sectionHeader: 'KNOWLEDGE & SOPS',
        items: [
          { id: 'wiki_articles', label: 'Articles', badge: 5 },
          { id: 'wiki_sops', label: 'SOPs', badge: 12 },
          { id: 'wiki_system_manuals', label: 'System Manuals', badge: 8 },
          { id: 'wiki_release_notes', label: 'Release Notes', badge: 11 }
        ]
      }
    ]
  }
];

export const tableViews: Record<Exclude<ActiveView, 'it_home' | 'launcher'>, TableDefinition> = {
  exceptions: {
    title: 'Departed with Licenses',
    docType: 'License Exception',
    description: 'Hardware and software exceptions tracking former employees offboarded in HR holding active software seats.',
    summaryCard: {
      title: 'ACTIVE EXCEPTIONS',
      value: 34,
      subtitle: '8 critical severity',
      tone: 'red'
    },
    columns: [
      { key: 'exception_id', label: 'EXCEPTION ID', isLink: true },
      { key: 'former_employee', label: 'FORMER EMPLOYEE', isLink: true },
      { key: 'department', label: 'DEPARTMENT', className: 'hidden sm:table-cell' },
      { key: 'unreclaimed_license', label: 'UNRECLAIMED LICENSE' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', exception_id: 'EXC-2024-041', sub_id: 'EXC-2024-041', former_employee: 'David Miller', department: 'Sales Operations', unreclaimed_license: 'Salesforce CRM Enterprise', status: 'Reclaim Pending' },
      { id: '2', exception_id: 'EXC-2024-042', sub_id: 'EXC-2024-042', former_employee: 'Sarah Jenkins', department: 'Product Engineering', unreclaimed_license: 'JetBrains All Products Pack', status: 'Review Needed' },
      { id: '3', exception_id: 'EXC-2024-043', sub_id: 'EXC-2024-043', former_employee: 'Robert Taylor', department: 'Finance & Audit', unreclaimed_license: 'SAP S/4HANA Enterprise License', status: 'Critical' },
      { id: '4', exception_id: 'EXC-2024-044', sub_id: 'EXC-2024-044', former_employee: 'Amanda White', department: 'Marketing', unreclaimed_license: 'Adobe Creative Cloud All Apps', status: 'Reclaim Pending' },
      { id: '5', exception_id: 'EXC-2024-045', sub_id: 'EXC-2024-045', former_employee: 'Kevin Zhang', department: 'Infrastructure', unreclaimed_license: 'VMware vSphere Enterprise Plus', status: 'Review Needed' },
      { id: '6', exception_id: 'EXC-2024-046', sub_id: 'EXC-2024-046', former_employee: 'Jessica Brown', department: 'Human Resources', unreclaimed_license: 'Workday HCM Enterprise', status: 'Reclaim Pending' },
      { id: '7', exception_id: 'EXC-2024-047', sub_id: 'EXC-2024-047', former_employee: 'Marcus Vance', department: 'Legal & Compliance', unreclaimed_license: 'Thomson Reuters Practical Law', status: 'Critical' },
      { id: '8', exception_id: 'EXC-2024-048', sub_id: 'EXC-2024-048', former_employee: 'Elena Rostova', department: 'Customer Support', unreclaimed_license: 'Zendesk Enterprise Suite', status: 'Review Needed' }
    ]
  },

  exceptions_departed_licenses: {
    title: 'Departed with Licenses',
    docType: 'License Exception',
    description: 'Hardware and software exceptions tracking former employees offboarded in HR holding active software seats.',
    summaryCard: {
      title: 'ACTIVE EXCEPTIONS',
      value: 34,
      subtitle: '8 critical severity',
      tone: 'red'
    },
    columns: [
      { key: 'exception_id', label: 'EXCEPTION ID', isLink: true },
      { key: 'former_employee', label: 'FORMER EMPLOYEE', isLink: true },
      { key: 'department', label: 'DEPARTMENT', className: 'hidden sm:table-cell' },
      { key: 'unreclaimed_license', label: 'UNRECLAIMED LICENSE' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', exception_id: 'EXC-2024-041', sub_id: 'EXC-2024-041', former_employee: 'David Miller', department: 'Sales Operations', unreclaimed_license: 'Salesforce CRM Enterprise', status: 'Reclaim Pending' },
      { id: '2', exception_id: 'EXC-2024-042', sub_id: 'EXC-2024-042', former_employee: 'Sarah Jenkins', department: 'Product Engineering', unreclaimed_license: 'JetBrains All Products Pack', status: 'Review Needed' },
      { id: '3', exception_id: 'EXC-2024-043', sub_id: 'EXC-2024-043', former_employee: 'Robert Taylor', department: 'Finance & Audit', unreclaimed_license: 'SAP S/4HANA Enterprise License', status: 'Critical' },
      { id: '4', exception_id: 'EXC-2024-044', sub_id: 'EXC-2024-044', former_employee: 'Amanda White', department: 'Marketing', unreclaimed_license: 'Adobe Creative Cloud All Apps', status: 'Reclaim Pending' },
      { id: '5', exception_id: 'EXC-2024-045', sub_id: 'EXC-2024-045', former_employee: 'Kevin Zhang', department: 'Infrastructure', unreclaimed_license: 'VMware vSphere Enterprise Plus', status: 'Review Needed' },
      { id: '6', exception_id: 'EXC-2024-046', sub_id: 'EXC-2024-046', former_employee: 'Jessica Brown', department: 'Human Resources', unreclaimed_license: 'Workday HCM Enterprise', status: 'Reclaim Pending' },
      { id: '7', exception_id: 'EXC-2024-047', sub_id: 'EXC-2024-047', former_employee: 'Marcus Vance', department: 'Legal & Compliance', unreclaimed_license: 'Thomson Reuters Practical Law', status: 'Critical' },
      { id: '8', exception_id: 'EXC-2024-048', sub_id: 'EXC-2024-048', former_employee: 'Elena Rostova', department: 'Customer Support', unreclaimed_license: 'Zendesk Enterprise Suite', status: 'Review Needed' }
    ]
  },

  // FINANCE
  fin_invoices: {
    title: 'Purchase Invoices',
    docType: 'Finance Invoice',
    description: 'Enterprise procurement billing and supplier payment processing.',
    columns: [
      { key: 'invoice_id', label: 'INVOICE ID', isLink: true },
      { key: 'vendor_name', label: 'VENDOR NAME', isLink: true },
      { key: 'amount', label: 'AMOUNT' },
      { key: 'due_date', label: 'DUE DATE', className: 'hidden sm:table-cell' },
      { key: 'department', label: 'DEPARTMENT', className: 'hidden md:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', invoice_id: 'INV-2026-089', sub_id: 'INV-2026-089', vendor_name: 'Dell Global Procurement', amount: '$14,200', due_date: '2026-11-15', department: 'IT Ops', status: 'Pending' },
      { id: '2', invoice_id: 'INV-2026-088', sub_id: 'INV-2026-088', vendor_name: 'Microsoft Ireland Ops', amount: '$42,500', due_date: '2026-11-01', department: 'Enterprise Soft', status: 'Approved' },
      { id: '3', invoice_id: 'INV-2026-087', sub_id: 'INV-2026-087', vendor_name: 'Atlassian Cloud Corp', amount: '$8,900', due_date: '2026-10-30', department: 'Engineering', status: 'Paid' },
      { id: '4', invoice_id: 'INV-2026-086', sub_id: 'INV-2026-086', vendor_name: 'Datadog Europe GmbH', amount: '$4,500', due_date: '2026-10-20', department: 'Infrastructure', status: 'Overdue' }
    ]
  },
  fin_payments: {
    title: 'Payments Ledger',
    docType: 'Payment Record',
    description: 'Bank disbursements and supplier clearing transactions.',
    columns: [
      { key: 'payment_id', label: 'PAYMENT ID', isLink: true },
      { key: 'beneficiary', label: 'BENEFICIARY', isLink: true },
      { key: 'payment_method', label: 'METHOD', className: 'hidden sm:table-cell' },
      { key: 'processed_date', label: 'PROCESSED DATE', className: 'hidden md:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', payment_id: 'PAY-2026-041', sub_id: 'PAY-2026-041', beneficiary: 'Microsoft Enterprise', payment_method: 'Wire Transfer', processed_date: '2026-10-21', status: 'Completed' },
      { id: '2', payment_id: 'PAY-2026-040', sub_id: 'PAY-2026-040', beneficiary: 'AWS Cloud Services', payment_method: 'Direct Debit', processed_date: '2026-10-15', status: 'Completed' },
      { id: '3', payment_id: 'PAY-2026-039', sub_id: 'PAY-2026-039', beneficiary: 'Salesforce EMEA', payment_method: 'ACH Transfer', processed_date: '2026-10-10', status: 'In Progress' }
    ]
  },
  fin_contracts: {
    title: 'Contracts & Licenses',
    docType: 'Commercial Agreement',
    description: 'Vendor master agreements and commercial licensing terms.',
    columns: [
      { key: 'contract_id', label: 'CONTRACT ID', isLink: true },
      { key: 'title', label: 'AGREEMENT TITLE', isLink: true },
      { key: 'vendor', label: 'VENDOR', className: 'hidden sm:table-cell' },
      { key: 'term_length', label: 'TERMS', className: 'hidden md:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', contract_id: 'CTR-2026-01', sub_id: 'CTR-2026-01', title: 'Microsoft Enterprise Agreement (EA)', vendor: 'Microsoft', term_length: '36 Months', status: 'Active' },
      { id: '2', contract_id: 'CTR-2026-02', sub_id: 'CTR-2026-02', title: 'AWS Cloud Savings Plan', vendor: 'Amazon Web Services', term_length: '12 Months', status: 'Active' },
      { id: '3', contract_id: 'CTR-2026-03', sub_id: 'CTR-2026-03', title: 'ServiceNow ITSM Master Agreement', vendor: 'ServiceNow', term_length: '24 Months', status: 'Expiring' }
    ]
  },
  fin_purchase_orders: {
    title: 'Purchase Orders',
    docType: 'Purchase Order',
    description: 'Approved hardware and software requisition orders.',
    columns: [
      { key: 'po_id', label: 'PO NUMBER', isLink: true },
      { key: 'description', label: 'DESCRIPTION', isLink: true },
      { key: 'amount', label: 'AMOUNT' },
      { key: 'requestor', label: 'REQUESTOR', className: 'hidden md:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', po_id: 'PO-2026-901', sub_id: 'PO-2026-901', description: '50x ThinkPad X1 Laptops for Engineering', amount: '$85,000', requestor: 'Ketan Patel', status: 'Approved' },
      { id: '2', po_id: 'PO-2026-902', sub_id: 'PO-2026-902', description: 'Dell PowerEdge Server Hardware Refresh', amount: '$42,000', requestor: 'Infra Lead', status: 'In Progress' }
    ]
  },
  fin_reports: {
    title: 'Financial Reports',
    docType: 'Financial Statement',
    description: 'Quarterly IT spend allocation and department cost center audits.',
    columns: [
      { key: 'report_id', label: 'REPORT ID', isLink: true },
      { key: 'report_title', label: 'REPORT TITLE', isLink: true },
      { key: 'period', label: 'PERIOD', className: 'hidden sm:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', report_id: 'FIN-REP-Q3', sub_id: 'FIN-REP-Q3', report_title: 'Q3 IT Infrastructure Spend Audit', period: '2026 Q3', status: 'Verified' },
      { id: '2', report_id: 'FIN-REP-Q4', sub_id: 'FIN-REP-Q4', report_title: 'Q4 Software License Cost Breakdown', period: '2026 Q4', status: 'Pending' }
    ]
  },

  // HR
  hr_employees: {
    title: 'Employee Directory',
    docType: 'Employee Record',
    description: 'Master HR user database and department organization chart.',
    columns: [
      { key: 'emp_id', label: 'EMPLOYEE ID', isLink: true },
      { key: 'full_name', label: 'FULL NAME', isLink: true },
      { key: 'department', label: 'DEPARTMENT', className: 'hidden sm:table-cell' },
      { key: 'job_title', label: 'JOB TITLE', className: 'hidden md:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', emp_id: 'EMP-1001', sub_id: 'EMP-1001', full_name: 'Ananya Das', department: 'Engineering', job_title: 'Senior Product Manager', status: 'Active' },
      { id: '2', emp_id: 'EMP-1002', sub_id: 'EMP-1002', full_name: 'Imran Shaikh', department: 'IT Operations', job_title: 'Platform Engineer', status: 'Active' },
      { id: '3', emp_id: 'EMP-1003', sub_id: 'EMP-1003', full_name: 'Maya Chen', department: 'Product Design', job_title: 'UX Manager', status: 'Active' },
      { id: '4', emp_id: 'EMP-1004', sub_id: 'EMP-1004', full_name: 'Vikram Sethi', department: 'Operations', job_title: 'IT Analyst', status: 'Pending' },
      { id: '5', emp_id: 'EMP-1005', sub_id: 'EMP-1005', full_name: 'David Miller', department: 'Sales', job_title: 'Account Executive', status: 'Retired' }
    ]
  },
  hr_leave_approvals: {
    title: 'Leave Approvals',
    docType: 'Leave Request',
    description: 'Employee paid time off and medical absence workflow.',
    columns: [
      { key: 'request_id', label: 'REQUEST ID', isLink: true },
      { key: 'employee', label: 'EMPLOYEE', isLink: true },
      { key: 'leave_type', label: 'TYPE', className: 'hidden sm:table-cell' },
      { key: 'dates', label: 'DATES', className: 'hidden md:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', request_id: 'LVR-2026-01', sub_id: 'LVR-2026-01', employee: 'Maya Chen', leave_type: 'Annual Leave', dates: 'Nov 12 - Nov 16', status: 'Approved' },
      { id: '2', request_id: 'LVR-2026-02', sub_id: 'LVR-2026-02', employee: 'Imran Shaikh', leave_type: 'Medical Leave', dates: 'Nov 01 - Nov 03', status: 'Pending' }
    ]
  },
  hr_onboarding: {
    title: 'Onboarding Cases',
    docType: 'Onboarding Case',
    description: 'New hire IT provisioning and department orientation tasks.',
    columns: [
      { key: 'case_id', label: 'CASE ID', isLink: true },
      { key: 'candidate_name', label: 'CANDIDATE NAME', isLink: true },
      { key: 'department', label: 'DEPARTMENT', className: 'hidden sm:table-cell' },
      { key: 'start_date', label: 'START DATE', className: 'hidden md:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', case_id: 'ONB-2026-11', sub_id: 'ONB-2026-11', candidate_name: 'Priya Sharma', department: 'Product Design', start_date: '2026-11-01', status: 'In Progress' },
      { id: '2', case_id: 'ONB-2026-12', sub_id: 'ONB-2026-12', candidate_name: 'Lucas Dupont', department: 'Engineering', start_date: '2026-11-15', status: 'Scheduled' }
    ]
  },
  hr_payroll: {
    title: 'Payroll Summaries',
    docType: 'Payroll Record',
    description: 'Monthly compensation logs and tax clearing receipts.',
    columns: [
      { key: 'pay_id', label: 'PAYROLL ID', isLink: true },
      { key: 'period', label: 'PAY PERIOD', isLink: true },
      { key: 'disbursement', label: 'DISBURSEMENT', className: 'hidden sm:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', pay_id: 'PAY-2026-10', sub_id: 'PAY-2026-10', period: 'October 2026', disbursement: '$412,000', status: 'Completed' },
      { id: '2', pay_id: 'PAY-2026-11', sub_id: 'PAY-2026-11', period: 'November 2026', disbursement: 'Pending Run', status: 'Scheduled' }
    ]
  },

  // IT CMDB VIEWS
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
      { id: 'ITA-00601', asset_name: 'Lenovo ThinkPad X1 Carbon Gen 11 21HM004FUS', sub_id: 'ITA-00601', asset_type: 'Laptop', assigned_to: 'Syed Hashim', assigned_to_source: '• Manual', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'In Stock', age: '1 w' },
      { id: 'ITA-00602', asset_name: 'Dell Latitude 5440 Core i7-1365U 32GB', sub_id: 'ITA-00602', asset_type: 'Laptop', assigned_to: 'Ananya Roy', assigned_to_source: '• Entra ID Sync', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'In Repair', age: '4 d' },
      { id: 'ITA-00603', asset_name: 'Apple MacBook Pro 16" M3 Max 64GB 1TB', sub_id: 'ITA-00603', asset_type: 'Laptop', assigned_to: 'Vikram Sethi', assigned_to_source: '• Manual', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Pending Disposal', age: '6 d' },
      { id: 'ITA-00604', asset_name: 'Dell PowerEdge R750xs 2U Rack Server', sub_id: 'ITA-00604', asset_type: 'Server', assigned_to: 'Pooja Nair', assigned_to_source: '• Entra ID Sync', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Retired', age: '8 d' },
      { id: 'ITA-00605', asset_name: 'Dell wireless mouse 04WJ8P CN-04WJ8P-LO300', sub_id: 'ITA-00605', asset_type: 'Peripheral', assigned_to: 'Tajammul Farooq', assigned_to_source: '• Manual', compliance: 'Not Applicable', lifecycle_review: 'Approved', lifecycle_state: 'Deployed', age: '10 d' },
      { id: 'ITA-00606', asset_name: 'Apple iPhone 15 Pro Enterprise 256GB', sub_id: 'ITA-00606', asset_type: 'Mobile', assigned_to: 'Syed Hashim', assigned_to_source: '• Entra ID Sync', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'In Stock', age: '12 d' },
      { id: 'ITA-00607', asset_name: 'Lenovo ThinkPad X1 Carbon Gen 11 #7', sub_id: 'ITA-00607', asset_type: 'Laptop', assigned_to: 'Imran Shaikh', assigned_to_source: '• Manual', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Deployed', age: '2 w' },
      { id: 'ITA-00608', asset_name: 'Dell Latitude 5440 Core i7-1365U 32GB #8', sub_id: 'ITA-00608', asset_type: 'Laptop', assigned_to: 'Maya Chen', assigned_to_source: '• Entra ID Sync', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Deployed', age: '3 w' },
      { id: 'ITA-00609', asset_name: 'Apple MacBook Pro 16" M3 Max 64GB 1TB #9', sub_id: 'ITA-00609', asset_type: 'Laptop', assigned_to: 'Kavita Menon', assigned_to_source: '• Manual', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Deployed', age: '1 m' },
      { id: 'ITA-00610', asset_name: 'Dell PowerEdge R750xs 2U Rack Server #10', sub_id: 'ITA-00610', asset_type: 'Server', assigned_to: 'Infra Support', assigned_to_source: '• CMDB Sync', compliance: 'Compliant', lifecycle_review: 'Approved', lifecycle_state: 'Deployed', age: '2 m' }
    ]
  },
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
      { id: '1', event_id: 'EVT-2024-0891', sub_id: 'EVT-2024-0891', asset_id: 'ITA-00605', asset_name: 'Lenovo ThinkPad X1 Carbon Gen 11', event_type: 'Transfer Custody', initiated_by: 'Syed Hashim', timestamp: '2024-10-21 09:15', event_details: 'Assigned to Ananya Roy (Design Dept)', status: 'Completed' },
      { id: '2', event_id: 'EVT-2024-0890', sub_id: 'EVT-2024-0890', asset_id: 'ITA-00606', asset_name: 'Dell Latitude 5440 Core i7', event_type: 'Audit Physical Scan', initiated_by: 'Ananya Roy', timestamp: '2024-10-20 14:30', event_details: 'Physical barcode scanned in Block B', status: 'Verified' },
      { id: '3', event_id: 'EVT-2024-0889', sub_id: 'EVT-2024-0889', asset_id: 'ITA-00607', asset_name: 'Apple MacBook Pro 16" M3', event_type: 'Repair Ticket Opened', initiated_by: 'Vikram Sethi', timestamp: '2024-10-19 11:20', event_details: 'Trackpad responsiveness diagnostic', status: 'In Repair' },
      { id: '4', event_id: 'EVT-2024-0888', sub_id: 'EVT-2024-0888', asset_id: 'ITA-00601', asset_name: 'Dell PowerEdge R750xs Server', event_type: 'Rack Installation', initiated_by: 'Tajammul Farooq', timestamp: '2024-10-18 16:45', event_details: 'Installed in Server Room Rack 4', status: 'Completed' },
      { id: '5', event_id: 'EVT-2024-0887', sub_id: 'EVT-2024-0887', asset_id: 'ITA-00608', asset_name: 'Cisco Meraki MX85 Security Appliance', event_type: 'Firmware Update', initiated_by: 'Network Ops', timestamp: '2024-10-17 22:00', event_details: 'Firmware updated to v17.9.4', status: 'Completed' }
    ]
  },
  warranty_expiring: {
    title: 'Warranty Expiring',
    docType: 'Warranty Report',
    description: 'Hardware equipment with manufacturer or OEM warranty ending within the next 90 days.',
    summaryCard: {
      title: 'EXPIRING IN 30 DAYS',
      value: 8,
      subtitle: 'Critical attention required for OEM renewals',
      tone: 'amber'
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
      { id: '1', asset_id: 'ITA-00512', sub_id: 'ITA-00512', asset_name: 'Dell Latitude 7420 Core i7', manufacturer: 'Dell', serial_no: 'SN-DEL-992101', warranty_end: '2024-11-10', days_left: '14 days', support_vendor: 'Dell ProSupport', action_status: 'Renewal Pending' },
      { id: '2', asset_id: 'ITA-00518', sub_id: 'ITA-00518', asset_name: 'Lenovo ThinkPad T14 Gen 2', manufacturer: 'Lenovo', serial_no: 'SN-LEN-881240', warranty_end: '2024-11-16', days_left: '20 days', support_vendor: 'Lenovo Premier', action_status: 'Quote Received' }
    ]
  },
  physical_audit_due: {
    title: 'Physical Audit Due',
    docType: 'Audit Schedule',
    description: 'Hardware assets scheduled for physical barcode verification and inventory scan.',
    summaryCard: {
      title: 'AUDITS OVERDUE',
      value: 12,
      subtitle: 'Barcode verification and location check required',
      tone: 'blue'
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
      { id: '1', asset_id: 'AUD-2026-11', sub_id: 'AUD-2026-11', asset_name: 'Cisco Catalyst Switch 9300', last_audit_date: '2025-10-15', audit_location: 'Building A - Rack 04', auditor: 'NetSec Team', status: 'Overdue', due_date: '2026-10-15' },
      { id: '2', asset_id: 'AUD-2026-12', sub_id: 'AUD-2026-12', asset_name: 'Poly Studio Video Bar', last_audit_date: '2025-11-01', audit_location: 'Conference Room 3B', auditor: 'AV Support', status: 'Due Today', due_date: '2026-10-27' }
    ]
  },
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
      { id: '1', license_id: 'LIC-00452', sub_id: 'LIC-00452', software_name: 'Microsoft 365 E3', type: 'Per User Subscription', status: 'Active', expiry_date: '2027-03-14', portal_admin: 'Syed Hashim' },
      { id: '2', license_id: 'LIC-00451', sub_id: 'LIC-00451', software_name: 'Adobe Creative Cloud', type: 'Named User Suite', status: 'Expiring', expiry_date: '2026-11-29', portal_admin: 'Maya Chen' },
      { id: '3', license_id: 'LIC-00450', sub_id: 'LIC-00450', software_name: 'Zoom Pro Enterprise', type: 'Shared Host Tier', status: 'Active', expiry_date: '2027-01-16', portal_admin: 'Support Ops' },
      { id: '4', license_id: 'LIC-00449', sub_id: 'LIC-00449', software_name: 'ServiceNow ITSM Pro', type: 'Fulfillers Seat', status: 'Expired', expiry_date: '2026-10-15', portal_admin: 'IT Ops Lead' }
    ]
  },
  license_compliance: {
    title: 'License Compliance',
    docType: 'Compliance Record',
    description: 'Auditing entitled seat counts against actual deployed installations in the organization.',
    summaryCard: {
      title: 'NON-COMPLIANT SUITES',
      value: 3,
      subtitle: 'True-up allocation needed before quarterly audit',
      tone: 'amber'
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
      { id: '1', license_id: 'CMP-LIC-01', sub_id: 'CMP-LIC-01', software_name: 'Microsoft 365 E5 Suite', allocated_seats: '500', used_seats: '542', compliance_status: 'Overallocated', action_required: 'True-Up Payment (+42)' },
      { id: '2', license_id: 'CMP-LIC-02', sub_id: 'CMP-LIC-02', software_name: 'Adobe Creative Cloud Enterprise', allocated_seats: '45', used_seats: '42', compliance_status: 'Compliant', action_required: 'None (Buffer +3)' }
    ]
  },
  saas_renewal_watch: {
    title: 'SaaS Renewal Watch',
    docType: 'SaaS Watchlist',
    description: 'Tracking upcoming SaaS contract renewals, pricing review terms, and cancellation deadlines.',
    columns: [
      { key: 'app_id', label: 'RECORD ID', isLink: true },
      { key: 'app_name', label: 'APPLICATION NAME', isLink: true },
      { key: 'subscription_tier', label: 'SUBSCRIPTION TIER', className: 'hidden sm:table-cell' },
      { key: 'business_owner', label: 'BUSINESS OWNER', className: 'hidden md:table-cell' },
      { key: 'status', label: 'RENEWAL STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', app_id: 'SaaS-001', sub_id: 'SaaS-001', app_name: 'Salesforce Enterprise Cloud', subscription_tier: 'Unlimited Plan', business_owner: 'Sales Ops', status: 'In Negotiation' },
      { id: '2', app_id: 'SaaS-002', sub_id: 'SaaS-002', app_name: 'Slack Business+ Workspace', subscription_tier: 'Enterprise Grid', business_owner: 'Internal Comms', status: 'Approved' }
    ]
  },
  license_expiry_calendar: {
    title: 'License Expiry Calendar',
    docType: 'Expiry Calendar',
    description: 'Chronological timeline of software vendor maintenance and agreement end dates.',
    columns: [
      { key: 'vendor_id', label: 'AGREEMENT ID', isLink: true },
      { key: 'vendor_product', label: 'VENDOR PRODUCT', isLink: true },
      { key: 'expiry_date', label: 'EXPIRY DATE', className: 'hidden sm:table-cell' },
      { key: 'status', label: 'URGENCY', isStatus: true }
    ],
    rows: [
      { id: '1', vendor_id: 'EXP-2026-01', sub_id: 'EXP-2026-01', vendor_product: 'Atlassian Jira Cloud Enterprise', expiry_date: '2026-11-20', status: 'Immediate Action' },
      { id: '2', vendor_id: 'EXP-2026-02', sub_id: 'EXP-2026-02', vendor_product: 'GitHub Enterprise Server', expiry_date: '2026-12-15', status: 'Upcoming' }
    ]
  },
  cost_analysis: {
    title: 'Cost Analysis',
    docType: 'Cost Summary',
    description: 'Financial optimization breakdown of software licenses, recurring seats, and unallocated budget.',
    columns: [
      { key: 'cost_id', label: 'ANALYSIS ID', isLink: true },
      { key: 'software_title', label: 'SOFTWARE TITLE', isLink: true },
      { key: 'annual_spend', label: 'ANNUAL SPEND', className: 'hidden sm:table-cell' },
      { key: 'status', label: 'OPTIMIZATION STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', cost_id: 'CST-2026-01', sub_id: 'CST-2026-01', software_title: 'Microsoft 365 E5 Suite', annual_spend: '$142,000 / yr', status: 'Compliant' },
      { id: '2', cost_id: 'CST-2026-02', sub_id: 'CST-2026-02', software_title: 'Salesforce CRM Licenses', annual_spend: '$98,500 / yr', status: 'Action Required' }
    ]
  },
  entra_users: {
    title: 'Entra Users',
    docType: 'Directory User',
    description: 'Entra ID user directory entries, authentication methods, and assigned SKUs.',
    columns: [
      { key: 'account_upn', label: 'ACCOUNT (UPN)', isLink: true },
      { key: 'display_name', label: 'DISPLAY NAME', isLink: true },
      { key: 'department', label: 'DEPARTMENT', className: 'hidden sm:table-cell' },
      { key: 'job_title', label: 'JOB TITLE', className: 'hidden md:table-cell' },
      { key: 'mfa_posture', label: 'MFA POSTURE', className: 'hidden lg:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', account_upn: 'ananya.das@company.com', sub_id: 'UPN-DAS', display_name: 'Ananya Das', department: 'Engineering', job_title: 'Senior Product Manager', mfa_posture: 'FIDO2 Hardware', status: 'Active' },
      { id: '2', account_upn: 'imran.shaikh@company.com', sub_id: 'UPN-SHAIKH', display_name: 'Imran Shaikh', department: 'IT Operations', job_title: 'Platform Engineer', mfa_posture: 'Authenticator App', status: 'Active' }
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
      { key: 'status', label: 'SECURITY LEVEL', isStatus: true }
    ],
    rows: [
      { id: '1', group_id: 'GRP-ENT-01', sub_id: 'GRP-ENT-01', group_name: 'SecOps-Admins', group_type: 'Security Group', status: 'Critical' },
      { id: '2', group_id: 'GRP-ENT-02', sub_id: 'GRP-ENT-02', group_name: 'IT-Helpdesk-L2', group_type: 'Security Group', status: 'In Repair' }
    ]
  },
  directory_roles: {
    title: 'Directory Roles',
    docType: 'Directory Role',
    description: 'Administrative directory role assignments and privileged access governance.',
    columns: [
      { key: 'role_id', label: 'ROLE ID', isLink: true },
      { key: 'role_name', label: 'ROLE NAME', isLink: true },
      { key: 'permission_level', label: 'PERMISSION LEVEL', className: 'hidden sm:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', role_id: 'ROL-DIR-01', sub_id: 'ROL-DIR-01', role_name: 'Global Administrator', permission_level: 'Critical (P1)', status: 'Quarterly Audit' },
      { id: '2', role_id: 'ROL-DIR-02', sub_id: 'ROL-DIR-02', role_name: 'User Administrator', permission_level: 'High (P2)', status: 'Compliant' }
    ]
  },
  license_skus: {
    title: 'License SKUs',
    docType: 'License SKU',
    description: 'Microsoft 365 and cloud vendor stock keeping units (SKUs) available in tenant.',
    columns: [
      { key: 'sku_id', label: 'SKU ID', isLink: true },
      { key: 'sku_name', label: 'SKU IDENTIFIER', isLink: true },
      { key: 'available_seats', label: 'AVAILABLE SEATS', className: 'hidden sm:table-cell' },
      { key: 'status', label: 'STOCK STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', sku_id: 'SKU-MS-01', sub_id: 'SKU-MS-01', sku_name: 'SPE_E3 (Microsoft 365 E3)', available_seats: '12 Available', status: 'In Stock' },
      { id: '2', sku_id: 'SKU-MS-02', sub_id: 'SKU-MS-02', sku_name: 'AAD_PREMIUM_P2 (Entra ID P2)', available_seats: '2 Available', status: 'Expiring' }
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
      { key: 'status', label: 'SECURITY APPROVAL', isStatus: true }
    ],
    rows: [
      { id: '1', portal_id: 'PRT-01', sub_id: 'PRT-01', portal_name: 'Azure Management Portal', auth_method: 'SAML 2.0 + MFA', status: 'Approved' },
      { id: '2', portal_id: 'PRT-02', sub_id: 'PRT-02', portal_name: 'AWS Control Tower', auth_method: 'SSO Federation', status: 'Approved' }
    ]
  },
  compliance_reports: {
    title: 'Compliance Reports',
    docType: 'Compliance Report',
    description: 'Internal and external regulatory audit evidence reports.',
    columns: [
      { key: 'report_id', label: 'REPORT ID', isLink: true },
      { key: 'report_name', label: 'REPORT NAME', isLink: true },
      { key: 'category', label: 'CATEGORY', className: 'hidden sm:table-cell' },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', report_id: 'CMP-2026-Q4', sub_id: 'CMP-2026-Q4', report_name: 'Quarterly Endpoint Compliance', category: 'ISO 27001 / Endpoint', status: 'Healthy' },
      { id: '2', report_id: 'CMP-2026-AR', sub_id: 'CMP-2026-AR', report_name: 'Access Review Audit', category: 'SOC 2 Type II / Identity', status: 'Flagged' }
    ]
  },
  security_audit: {
    title: 'Security Audit',
    docType: 'Security Finding',
    description: 'Vulnerability assessment and Intune security baseline alignment logs.',
    columns: [
      { key: 'audit_id', label: 'AUDIT ID', isLink: true },
      { key: 'target_system', label: 'TARGET SYSTEM', isLink: true },
      { key: 'status', label: 'AUDIT RESULT', isStatus: true }
    ],
    rows: [
      { id: '1', audit_id: 'AUD-SEC-01', sub_id: 'AUD-SEC-01', target_system: 'Endpoint Intune Security Baseline', status: 'Verified' },
      { id: '2', audit_id: 'AUD-SEC-02', sub_id: 'AUD-SEC-02', target_system: 'Cloud Infrastructure IAM Audit', status: 'Verified' }
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
      { key: 'status', label: 'SEVERITY', isStatus: true }
    ],
    rows: [
      { id: '1', incident_id: 'INC-2026-401', sub_id: 'INC-2026-401', incident_title: 'Conditional Access Policy Bypass Attempt', impact_area: 'Identity Protection', status: 'Critical' },
      { id: '2', incident_id: 'INC-2026-402', sub_id: 'INC-2026-402', incident_title: 'Unflagged USB Storage Mass Read', impact_area: 'DLP Endpoint', status: 'In Repair' }
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
      { key: 'status', label: 'GOVERNANCE STATE', isStatus: true }
    ],
    rows: [
      { id: '1', doc_id: 'POL-2026-01', sub_id: 'POL-2026-01', document_title: 'Acceptable Use Policy v4.2', domain: 'IT Governance', status: 'Active' },
      { id: '2', doc_id: 'POL-2026-02', sub_id: 'POL-2026-02', document_title: 'Password & Passkey Standard', domain: 'Identity & Access', status: 'Active' }
    ]
  },

  // SECURITY
  sec_alerts: {
    title: 'Security Alerts',
    docType: 'SOC Alert',
    description: 'Real-time threat monitoring and conditional access anomalies.',
    columns: [
      { key: 'alert_id', label: 'ALERT ID', isLink: true },
      { key: 'threat_name', label: 'THREAT DESCRIPTION', isLink: true },
      { key: 'severity', label: 'SEVERITY', isStatus: true }
    ],
    rows: [
      { id: '1', alert_id: 'ALT-2026-101', sub_id: 'ALT-2026-101', threat_name: 'Impossible Travel Login Detected', severity: 'Critical' },
      { id: '2', alert_id: 'ALT-2026-102', sub_id: 'ALT-2026-102', threat_name: 'Multiple Failed Root Login Attempts', severity: 'High Risk' }
    ]
  },
  sec_threat_log: {
    title: 'Threat Log',
    docType: 'Threat Telemetry',
    description: 'Perimeter firewall and Endpoint Protection (EDR) telemetry.',
    columns: [
      { key: 'log_id', label: 'LOG ID', isLink: true },
      { key: 'source_ip', label: 'SOURCE IP', isLink: true },
      { key: 'action_taken', label: 'ACTION TAKEN', isStatus: true }
    ],
    rows: [
      { id: '1', log_id: 'TRT-8012', sub_id: 'TRT-8012', source_ip: '198.51.100.42', action_taken: 'Active' },
      { id: '2', log_id: 'TRT-8013', sub_id: 'TRT-8013', source_ip: '203.0.113.19', action_taken: 'In Repair' }
    ]
  },
  sec_vulnerabilities: {
    title: 'Vulnerability Scan',
    docType: 'CVE Assessment',
    description: 'Automated patch assessment and zero-day exposure tracking.',
    columns: [
      { key: 'cve_id', label: 'CVE ID', isLink: true },
      { key: 'affected_system', label: 'AFFECTED SYSTEM', isLink: true },
      { key: 'status', label: 'PATCH STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', cve_id: 'CVE-2026-3011', sub_id: 'CVE-2026-3011', affected_system: 'Linux Core Gateway 01', status: 'Action Required' },
      { id: '2', cve_id: 'CVE-2026-1049', sub_id: 'CVE-2026-1049', affected_system: 'Windows Workstations Build 22H2', status: 'In Progress' }
    ]
  },
  sec_access_reviews: {
    title: 'Access Reviews',
    docType: 'Access Review Case',
    description: 'Quarterly privilege access audits and admin entitlement verification.',
    columns: [
      { key: 'review_id', label: 'REVIEW ID', isLink: true },
      { key: 'scope', label: 'REVIEW SCOPE', isLink: true },
      { key: 'status', label: 'AUDIT STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', review_id: 'ACR-2026-Q4', sub_id: 'ACR-2026-Q4', scope: 'Global Admin Entra ID Scope', status: 'In Progress' },
      { id: '2', review_id: 'ACR-2026-Q3', sub_id: 'ACR-2026-Q3', scope: 'AWS Root Account Privileges', status: 'Verified' }
    ]
  },

  // HELPDESK
  help_open_tickets: {
    title: 'Open Tickets',
    docType: 'Helpdesk Ticket',
    description: 'Service desk incident queue and employee support tickets.',
    columns: [
      { key: 'ticket_id', label: 'TICKET ID', isLink: true },
      { key: 'subject', label: 'SUBJECT', isLink: true },
      { key: 'requester', label: 'REQUESTER', className: 'hidden sm:table-cell' },
      { key: 'priority', label: 'PRIORITY', isStatus: true }
    ],
    rows: [
      { id: '1', ticket_id: 'INC-2026-091', sub_id: 'INC-2026-091', subject: 'Trackpad unresponsive after Windows Update', requester: 'Vikram Sethi', priority: 'High Risk' },
      { id: '2', ticket_id: 'INC-2026-092', sub_id: 'INC-2026-092', subject: 'M365 License activation error on new laptop', requester: 'Ananya Roy', priority: 'In Progress' },
      { id: '3', ticket_id: 'INC-2026-093', sub_id: 'INC-2026-093', subject: 'VPN certificate expired for remote floor', requester: 'Rahul Verma', priority: 'Critical' }
    ]
  },
  help_assigned_to_me: {
    title: 'Assigned to Me',
    docType: 'Assigned Ticket',
    description: 'Personal active incident queue for logged in agent.',
    columns: [
      { key: 'ticket_id', label: 'TICKET ID', isLink: true },
      { key: 'subject', label: 'SUBJECT', isLink: true },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', ticket_id: 'INC-2026-088', sub_id: 'INC-2026-088', subject: 'MacBook M3 USB-C display port flickering', status: 'In Progress' },
      { id: '2', ticket_id: 'INC-2026-084', sub_id: 'INC-2026-084', subject: 'Provision Entra ID account for new designer', status: 'Active' }
    ]
  },
  help_sla_breaches: {
    title: 'SLA Breaches',
    docType: 'SLA Exception',
    description: 'Tickets exceeding target resolution timeframes.',
    columns: [
      { key: 'ticket_id', label: 'TICKET ID', isLink: true },
      { key: 'subject', label: 'SUBJECT', isLink: true },
      { key: 'status', label: 'SLA STATE', isStatus: true }
    ],
    rows: [
      { id: '1', ticket_id: 'INC-2026-012', sub_id: 'INC-2026-012', subject: 'Datacenter PDU power supply alert', status: 'Overdue' }
    ]
  },
  help_kb_articles: {
    title: 'Knowledge Base',
    docType: 'KB Document',
    description: 'IT helpdesk self-service support documentation.',
    columns: [
      { key: 'article_id', label: 'ARTICLE ID', isLink: true },
      { key: 'title', label: 'ARTICLE TITLE', isLink: true },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', article_id: 'KB-1001', sub_id: 'KB-1001', title: 'How to enroll mobile devices in Intune MDM', status: 'Verified' },
      { id: '2', article_id: 'KB-1002', sub_id: 'KB-1002', title: 'Configuring FIDO2 Security Passkeys', status: 'Verified' }
    ]
  },

  // MARKETING & SEO
  mkt_campaigns: {
    title: 'Marketing Campaigns',
    docType: 'Marketing Campaign',
    description: 'Enterprise brand campaigns and digital launch tracking.',
    columns: [
      { key: 'camp_id', label: 'CAMPAIGN ID', isLink: true },
      { key: 'title', label: 'CAMPAIGN NAME', isLink: true },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', camp_id: 'CMP-2026-01', sub_id: 'CMP-2026-01', title: 'Q4 Enterprise Cloud Product Launch', status: 'Active' },
      { id: '2', camp_id: 'CMP-2026-02', sub_id: 'CMP-2026-02', title: 'Global DevSecOps Webinar Series', status: 'In Progress' }
    ]
  },
  mkt_seo_audit: {
    title: 'SEO Audit',
    docType: 'SEO Report',
    description: 'Organic search performance and site health diagnostics.',
    columns: [
      { key: 'audit_id', label: 'AUDIT ID', isLink: true },
      { key: 'domain', label: 'DOMAIN SCOPE', isLink: true },
      { key: 'status', label: 'HEALTH SCORE', isStatus: true }
    ],
    rows: [
      { id: '1', audit_id: 'SEO-2026-Q4', sub_id: 'SEO-2026-Q4', domain: 'proficientnow.com', status: 'Verified' }
    ]
  },
  mkt_social_channels: {
    title: 'Social Channels',
    docType: 'Social Channel',
    description: 'Corporate LinkedIn and YouTube communication portals.',
    columns: [
      { key: 'channel_id', label: 'CHANNEL ID', isLink: true },
      { key: 'platform', label: 'PLATFORM', isLink: true },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', channel_id: 'SOC-01', sub_id: 'SOC-01', platform: 'LinkedIn Corporate Page', status: 'Active' }
    ]
  },
  mkt_ad_spend: {
    title: 'Ad Spend',
    docType: 'Ad Spend Record',
    description: 'Monthly paid search and social campaign allocation.',
    columns: [
      { key: 'spend_id', label: 'RECORD ID', isLink: true },
      { key: 'network', label: 'AD NETWORK', isLink: true },
      { key: 'status', label: 'BUDGET STATE', isStatus: true }
    ],
    rows: [
      { id: '1', spend_id: 'SPD-2026-10', sub_id: 'SPD-2026-10', network: 'Google Search Ads', status: 'Verified' }
    ]
  },

  // WIKI
  wiki_articles: {
    title: 'Wiki Articles',
    docType: 'Wiki Article',
    description: 'Internal documentation and engineering specifications.',
    columns: [
      { key: 'doc_id', label: 'DOC ID', isLink: true },
      { key: 'title', label: 'ARTICLE TITLE', isLink: true },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', doc_id: 'WKI-2026-01', sub_id: 'WKI-2026-01', title: 'Enterprise CMDB Architecture Overview', status: 'Verified' },
      { id: '2', doc_id: 'WKI-2026-02', sub_id: 'WKI-2026-02', title: 'Slashbucket Customizer Integration Guide', status: 'Verified' }
    ]
  },
  wiki_sops: {
    title: 'Standard Operating Procedures (SOPs)',
    docType: 'Standard Procedure',
    description: 'Formal operational guidelines and compliance runbooks.',
    columns: [
      { key: 'sop_id', label: 'SOP ID', isLink: true },
      { key: 'title', label: 'PROCEDURE TITLE', isLink: true },
      { key: 'status', label: 'APPROVAL STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', sop_id: 'SOP-2026-10', sub_id: 'SOP-2026-10', title: 'Offboarding Employee Software Reclamation', status: 'Verified' }
    ]
  },
  wiki_system_manuals: {
    title: 'System Manuals',
    docType: 'System Manual',
    description: 'Infrastructure and network hardware installation guides.',
    columns: [
      { key: 'manual_id', label: 'MANUAL ID', isLink: true },
      { key: 'title', label: 'MANUAL TITLE', isLink: true },
      { key: 'status', label: 'STATUS', isStatus: true }
    ],
    rows: [
      { id: '1', manual_id: 'MNL-2026-04', sub_id: 'MNL-2026-04', title: 'Cisco Meraki MX85 Deployment Manual', status: 'Verified' }
    ]
  },
  wiki_release_notes: {
    title: 'Release Notes',
    docType: 'Release Log',
    description: 'Version history and platform changelogs.',
    columns: [
      { key: 'release_id', label: 'RELEASE ID', isLink: true },
      { key: 'title', label: 'RELEASE TITLE', isLink: true },
      { key: 'status', label: 'DEPLOYMENT STATE', isStatus: true }
    ],
    rows: [
      { id: '1', release_id: 'REL-2026-v15.2', sub_id: 'REL-2026-v15.2', title: 'Next Experience Tabbed Form Layout Upgrade', status: 'Verified' }
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
    val.includes('paid')
  ) {
    return 'bg-[#dcfce7] text-[#166534]';
  }

  // Blue (#dbeafe bg, #1e40af text)
  if (
    val.includes('in stock') ||
    val.includes('deployed') ||
    val.includes('in progress') ||
    val.includes('scheduled') ||
    val.includes('upcoming')
  ) {
    return 'bg-[#dbeafe] text-[#1e40af]';
  }

  // Yellow / Orange (#fef3c7 bg, #92400e text)
  if (
    val.includes('in repair') ||
    val.includes('pending') ||
    val.includes('expiring') ||
    val.includes('review') ||
    val.includes('quote') ||
    val.includes('due today') ||
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
    val.includes('reclaim pending')
  ) {
    return 'bg-[#fee2e2] text-[#991b1b]';
  }

  return 'bg-[#f3f4f6] text-[#374151]';
}

function UniversalWorkspaceTable({ definition }: { definition: TableDefinition }) {
  const { columns, rows, summaryCard } = definition;
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
      {/* Optional Summary Metric Card */}
      {summaryCard && (
        <div
          className={`rounded-xl border p-4 shadow-xs flex items-center justify-between ${
            summaryCard.tone === 'red'
              ? 'border-red-200 bg-red-50/60'
              : summaryCard.tone === 'amber'
              ? 'border-amber-200 bg-amber-50/60'
              : summaryCard.tone === 'blue'
              ? 'border-blue-200 bg-blue-50/60'
              : 'border-emerald-200 bg-emerald-50/60'
          }`}
        >
          <div>
            <div
              className={`text-[10px] font-bold uppercase tracking-wider ${
                summaryCard.tone === 'red'
                  ? 'text-red-700'
                  : summaryCard.tone === 'amber'
                  ? 'text-amber-700'
                  : summaryCard.tone === 'blue'
                  ? 'text-[#1e40af]'
                  : 'text-emerald-700'
              }`}
            >
              {summaryCard.title}
            </div>
            <div
              className={`mt-1 text-3xl font-black ${
                summaryCard.tone === 'red'
                  ? 'text-red-800'
                  : summaryCard.tone === 'amber'
                  ? 'text-amber-800'
                  : summaryCard.tone === 'blue'
                  ? 'text-[#1e293b]'
                  : 'text-emerald-800'
              }`}
            >
              {summaryCard.value}
            </div>
            <div
              className={`mt-0.5 text-xs font-medium ${
                summaryCard.tone === 'red'
                  ? 'text-red-600'
                  : summaryCard.tone === 'amber'
                  ? 'text-amber-700'
                  : summaryCard.tone === 'blue'
                  ? 'text-[#64748b]'
                  : 'text-emerald-700'
              }`}
            >
              {summaryCard.subtitle}
            </div>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="table-container border border-[#e2e8f0] rounded-lg overflow-hidden mb-8 shadow-xs bg-white">
        {/* Filter Bar */}
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

        {/* Overflow Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="table-header bg-[#f8fafc] border-b border-[#e2e8f0] text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                <th className="table-cell-number w-[30px] min-w-[30px] max-w-[30px] px-3 py-3 text-center bg-[#f8fafc]">#</th>
                <th className="table-cell-checkbox w-[30px] min-w-[30px] max-w-[30px] px-3 py-3 text-center bg-[#f8fafc]">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded-xs border-slate-300 text-[#1e40af] focus:ring-[#1e40af] cursor-pointer"
                  />
                </th>
                {columns.map((col) => (
                  <th key={col.key} className={`px-4 py-3 text-left whitespace-nowrap ${col.className ?? ''}`}>
                    {col.label}
                  </th>
                ))}
                <th className="w-10 px-3 py-3 text-center text-[11px] font-bold">⋮</th>
              </tr>
            </thead>

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
                  const subCode =
                    row.asset_sub ||
                    row.sub_id ||
                    row.code ||
                    row.invoice_id ||
                    row.emp_id ||
                    row.license_id ||
                    row.event_id ||
                    row.record_id ||
                    row.cve_id ||
                    row.ticket_id ||
                    row.camp_id ||
                    row.doc_id ||
                    row.exception_id;

                  return (
                    <tr
                      key={`${row.id}-${index}`}
                      className={`table-row h-[48px] border-b border-[#e2e8f0] transition-colors ${
                        isSelected ? 'active selected bg-[#dbeafe]' : 'bg-white hover:bg-white'
                      }`}
                      style={{ height: '48px' }}
                    >
                      <td className="table-cell-number w-[30px] min-w-[30px] max-w-[30px] px-3 py-3 text-center text-[12px] font-mono text-[#64748b] bg-[#f8fafc]/50">
                        {index + 1}
                      </td>

                      <td className="table-cell-checkbox w-[30px] min-w-[30px] max-w-[30px] px-3 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(row.id)}
                          className="h-4 w-4 rounded-xs border-slate-300 text-[#1e40af] focus:ring-[#1e40af] cursor-pointer"
                        />
                      </td>

                      {columns.map((col, colIdx) => {
                        const cellValue = row[col.key] ?? '—';
                        const isFirstDataCol = colIdx === 0;

                        if (isFirstDataCol || col.isLink || col.key.includes('name') || col.key.includes('title') || col.key.includes('id') || col.key.includes('employee')) {
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
                                {subCode && subCode !== cellValue && (
                                  <span className="text-[11px] text-[#64748b] font-mono">{subCode}</span>
                                )}
                              </div>
                            </td>
                          );
                        }

                        if (col.isStatus || col.key.includes('status') || col.key.includes('severity') || col.key.includes('action')) {
                          const badgeStyle = getStatusBadgeStyle(cellValue);
                          return (
                            <td key={col.key} className={`px-4 py-3 text-xs whitespace-nowrap ${col.className ?? ''}`}>
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap ${badgeStyle}`}>
                                {cellValue}
                              </span>
                            </td>
                          );
                        }

                        return (
                          <td key={col.key} className={`px-4 py-3 text-xs text-[#1e293b] whitespace-nowrap ${col.className ?? ''}`}>
                            {cellValue}
                          </td>
                        );
                      })}

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
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    finance: true,
    hr: true,
    it: true,
    security: true,
    helpdesk: true,
    marketing: true,
    wiki: true
  });

  const toggleModuleExpand = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleModuleHeaderClick = (mod: DepartmentModule) => {
    // If not expanded, expand it
    if (!expandedModules[mod.id]) {
      setExpandedModules((prev) => ({ ...prev, [mod.id]: true }));
    }
    // Set active view to the first item of this module
    const firstItem = mod.sections[0]?.items[0];
    if (firstItem) {
      setActiveView(firstItem.id as ActiveView);
    }
  };

  const currentTable = useMemo(() => {
    if (activeView === 'launcher' || activeView === 'it_home') {
      return tableViews.it_assets;
    }
    return tableViews[activeView] || tableViews.it_assets;
  }, [activeView]);

  const breadcrumb = useMemo(() => {
    if (activeView === 'launcher') return 'Launcher';
    if (activeView === 'it_home') return 'Home / IT';

    const normalizedView = activeView === 'exceptions' ? 'exceptions_departed_licenses' : activeView;

    for (const mod of departmentModules) {
      for (const sec of mod.sections) {
        const found = sec.items.find((item) => item.id === normalizedView);
        if (found) {
          return `Home / ${mod.label} / ${found.label}`;
        }
      }
    }
    return 'Home / IT';
  }, [activeView]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        {/* Sidebar Navigation */}
        <aside className="w-72 border-r border-[#e2e8f0] bg-white p-4 flex flex-col shrink-0 select-none">
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
              className="rounded-md border border-[#e2e8f0] px-2 py-1 text-xs font-semibold text-[#64748b] hover:bg-[#f8fafc] transition-colors cursor-pointer"
            >
              Launcher
            </button>
          </div>

          <nav className="space-y-3 flex-1 overflow-y-auto pr-1">
            {/* IT Home button */}
            <button
              type="button"
              onClick={() => setActiveView('it_home')}
              className={`sidebar-item flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition-all cursor-pointer ${
                activeView === 'it_home'
                  ? 'active bg-[#1e40af] text-white font-semibold'
                  : 'bg-white text-[#1e293b] hover:bg-[#f8fafc]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span>Home Dashboard</span>
              </div>
            </button>

            {/* Department Modules Navigation */}
            {departmentModules.map((mod) => {
              const normalizedActive = activeView === 'exceptions' ? 'exceptions_departed_licenses' : activeView;
              const isModuleActive = mod.sections.some((sec) =>
                sec.items.some((item) => item.id === normalizedActive)
              );
              const isExpanded = expandedModules[mod.id] ?? true;

              return (
                <div key={mod.id} className="space-y-1">
                  {/* Module Header (Top-level) */}
                  <button
                    type="button"
                    onClick={() => handleModuleHeaderClick(mod)}
                    className={`module-header w-full flex items-center justify-between rounded-md px-3 py-2 text-left text-xs transition-all cursor-pointer ${
                      isModuleActive
                        ? 'active bg-[#1e40af] text-white font-semibold'
                        : 'bg-white text-[#1e293b] hover:bg-[#f8fafc]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: isModuleActive ? '#ffffff' : mod.color }}
                      />
                      <span className="font-semibold text-xs">{mod.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`sidebar-badge inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums ${
                          isModuleActive ? 'bg-white/30 text-white' : 'bg-[#e2e8f0] text-[#64748b]'
                        }`}
                      >
                        {mod.badgeTotal}
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleModuleExpand(mod.id);
                        }}
                        className="text-[10px] opacity-80 hover:opacity-100 p-1"
                      >
                        {isExpanded ? '▼' : '▶'}
                      </span>
                    </div>
                  </button>

                  {/* Module Expanded Sections & Items */}
                  {isExpanded && (
                    <div className="module-content space-y-2 pl-1">
                      {mod.sections.map((sec) => (
                        <div key={sec.id} className="sidebar-section space-y-0.5">
                          {sec.sectionHeader && (
                            <button
                              type="button"
                              onClick={() => {
                                const firstSecItem = sec.items[0];
                                if (firstSecItem) setActiveView(firstSecItem.id as ActiveView);
                              }}
                              className="section-header w-full flex items-center justify-between px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#64748b] hover:text-[#1e40af] transition-colors cursor-pointer text-left"
                            >
                              <span>{sec.sectionHeader}</span>
                            </button>
                          )}

                          {sec.items.map((item) => {
                            const isActive =
                              activeView === item.id ||
                              (item.id === 'exceptions_departed_licenses' && activeView === 'exceptions');

                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setActiveView(item.id as ActiveView)}
                                className={`sidebar-item flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition-all cursor-pointer ${
                                  isActive
                                    ? 'active bg-[#1e40af] text-white font-semibold'
                                    : 'bg-white text-[#1e293b] hover:bg-[#f8fafc]'
                                }`}
                              >
                                <span className="truncate pr-2 font-medium">{item.label}</span>
                                <span
                                  className={`sidebar-badge count-pill inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums ${
                                    isActive ? 'bg-white/30 text-white' : 'bg-[#e2e8f0] text-[#64748b]'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main View Area */}
        <main className="flex-1 bg-[#f8fafc] flex flex-col min-w-0">
          <header className="border-b border-[#e2e8f0] bg-white px-6 py-3.5 shadow-2xs select-none">
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
                    activeView === 'it_home' ? 'bg-blue-50 text-[#1e40af] border-blue-200' : 'bg-white text-[#1e293b] hover:bg-[#f8fafc]'
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
                      { id: 'fin_invoices', label: 'Finance', tone: 'slate', accent: 'F' },
                      { id: 'help_open_tickets', label: 'Helpdesk', tone: 'navy', accent: 'N' },
                      { id: 'wiki_articles', label: 'Insights', tone: 'sky', accent: 'I' },
                      { id: 'it_assets', label: 'IT', tone: 'blue', accent: 'I', highlight: 'Live' },
                      { id: 'mkt_campaigns', label: 'Marketing', tone: 'indigo', accent: 'M' },
                      { id: 'hr_employees', label: 'ProficientNow', tone: 'teal', accent: 'P' },
                      { id: 'hr_leave_approvals', label: 'Operations', tone: 'rose', accent: 'O' },
                      { id: 'sec_alerts', label: 'Security', tone: 'emerald', accent: 'S' },
                      { id: 'policy_documents', label: 'Admin', tone: 'amber', accent: 'A' }
                    ].map((tile) => (
                      <button
                        key={tile.id}
                        type="button"
                        onClick={() => setActiveView(tile.id as ActiveView)}
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
                  <p className="mt-1 text-xs text-[#64748b]">Your enterprise workspace and operational summary is ready to review.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    { label: 'Total IT Assets', value: '118', view: 'it_assets' as const, tone: 'blue' },
                    { label: 'Active Users', value: '542', view: 'entra_users' as const, tone: 'emerald' },
                    { label: 'Purchase Invoices', value: '84', view: 'fin_invoices' as const, tone: 'sky' },
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
                        className="rounded-md border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-semibold text-[#1e293b] hover:bg-[#f8fafc] transition-colors cursor-pointer"
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

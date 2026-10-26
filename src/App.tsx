import { useMemo, useState } from 'react';

type ActiveView =
  | 'launcher'
  | 'it_home'
  | 'it_assets'
  | 'asset_events'
  | 'software_licenses'
  | 'entra_users'
  | 'compliance_reports'
  | 'exceptions';

type BadgeTone = 'emerald' | 'sky' | 'amber' | 'red' | 'slate' | 'blue';

type DataRow = {
  title: string;
  subtitle: string;
  meta1?: string;
  meta2?: string;
  meta3?: string;
  badge?: string;
  badgeTone?: BadgeTone;
  status?: string;
  statusTone?: BadgeTone;
};

type ColumnConfig = {
  key: 'name' | 'type' | 'owner' | 'source' | 'status' | 'review' | 'details' | 'count';
  label: string;
  align?: 'left' | 'center' | 'right';
};

const badgeClasses: Record<BadgeTone, string> = {
  emerald: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  sky: 'bg-sky-100 text-sky-700 border border-sky-200',
  amber: 'bg-amber-100 text-amber-700 border border-amber-200',
  red: 'bg-rose-100 text-rose-700 border border-rose-200',
  slate: 'bg-slate-200 text-slate-600 border border-slate-300',
  blue: 'bg-blue-100 text-blue-700 border border-blue-200'
};

const tableViews: Record<Exclude<ActiveView, 'it_home'>, { title: string; columns: ColumnConfig[]; rows: DataRow[] }> = {
  it_assets: {
    title: 'IT Assets',
    columns: [
      { key: 'name', label: 'Asset Name' },
      { key: 'type', label: 'Asset Type' },
      { key: 'owner', label: 'Assigned To' },
      { key: 'source', label: 'Source' },
      { key: 'status', label: 'Lifecycle' },
      { key: 'review', label: 'Review Due' }
    ],
    rows: [
      { title: 'ThinkPad X1 Carbon', subtitle: 'ITA-00601', meta1: 'Laptop', meta2: 'Ananya Das', meta3: 'Entra ID Sync', status: 'Deployed', statusTone: 'emerald', review: '7 Mar 2027' },
      { title: 'Dell Latitude 5440', subtitle: 'ITA-00602', meta1: 'Laptop', meta2: 'Imran Shaikh', meta3: 'Manual Entry', status: 'Deployed', statusTone: 'emerald', review: '18 Feb 2027' },
      { title: 'Apple MacBook Pro 16', subtitle: 'ITA-00603', meta1: 'Laptop', meta2: 'Maya Chen', meta3: 'Entra ID Sync', status: 'In Maintenance', statusTone: 'amber', review: '2 Jan 2027' },
      { title: 'Dell PowerEdge R650', subtitle: 'ITA-00604', meta1: 'Server', meta2: 'Infrastructure Team', meta3: 'CMDB Sync', status: 'Deployed', statusTone: 'emerald', review: '26 Mar 2027' },
      { title: 'Dell Wireless Mouse', subtitle: 'ITA-00605', meta1: 'Peripheral', meta2: '—', meta3: 'Manual Entry', status: 'In Storage', statusTone: 'sky', review: '17 Apr 2027' }
    ]
  },
  asset_events: {
    title: 'Asset Events',
    columns: [
      { key: 'name', label: 'Asset Name' },
      { key: 'type', label: 'Event Type' },
      { key: 'owner', label: 'Initiated By' },
      { key: 'source', label: 'Timestamp' },
      { key: 'status', label: 'Status' }
    ],
    rows: [
      { title: 'Lenovo ThinkPad X1 Carbon', subtitle: 'EVT-2024-0891', meta1: 'Transfer', meta2: 'Syed Hashim', meta3: '2024-10-21 09:15', status: 'Completed', statusTone: 'emerald' },
      { title: 'Dell Latitude 5440', subtitle: 'EVT-2024-0890', meta1: 'Audit Verified', meta2: 'Ananya Roy', meta3: '2024-10-20 14:30', status: 'Verified', statusTone: 'blue' },
      { title: 'Apple MacBook Pro 16', subtitle: 'EVT-2024-0889', meta1: 'Repair Requested', meta2: 'Vikram Sethi', meta3: '2024-10-19 11:20', status: 'In Repair', statusTone: 'amber' },
      { title: 'Dell PowerEdge R650', subtitle: 'EVT-2024-0888', meta1: 'Check-out', meta2: 'Tajammul Farooq', meta3: '2024-10-18 16:45', status: 'Completed', statusTone: 'emerald' }
    ]
  },
  software_licenses: {
    title: 'Software Licenses',
    columns: [
      { key: 'name', label: 'Software' },
      { key: 'type', label: 'License Type' },
      { key: 'owner', label: 'Assigned To' },
      { key: 'source', label: 'Expiration' },
      { key: 'status', label: 'Compliance' }
    ],
    rows: [
      { title: 'Microsoft 365 E3', subtitle: 'LIC-00452', meta1: 'Enterprise', meta2: 'Operations', meta3: '2027-03-14', status: 'Compliant', statusTone: 'emerald' },
      { title: 'Adobe Creative Cloud', subtitle: 'LIC-00451', meta1: 'Named User', meta2: 'Design Team', meta3: '2026-11-29', status: 'Expiring Soon', statusTone: 'amber' },
      { title: 'Zoom Pro', subtitle: 'LIC-00449', meta1: 'Shared', meta2: 'Support', meta3: '2027-01-16', status: 'Compliant', statusTone: 'emerald' },
      { title: 'ServiceNow', subtitle: 'LIC-00447', meta1: 'Enterprise', meta2: 'IT Ops', meta3: '2026-12-07', status: 'Needs Review', statusTone: 'red' }
    ]
  },
  entra_users: {
    title: 'Entra Users',
    columns: [
      { key: 'name', label: 'User Name' },
      { key: 'type', label: 'Department' },
      { key: 'owner', label: 'Role' },
      { key: 'source', label: 'Last Login' },
      { key: 'status', label: 'MFA' }
    ],
    rows: [
      { title: 'Ananya Das', subtitle: 'ananya.das@company.com', meta1: 'Engineering', meta2: 'Senior Product Manager', meta3: '2 hours ago', status: 'Compliant', statusTone: 'emerald' },
      { title: 'Imran Shaikh', subtitle: 'imran.shaikh@company.com', meta1: 'IT', meta2: 'Platform Engineer', meta3: '5 hours ago', status: 'Requires MFA', statusTone: 'amber' },
      { title: 'Maya Chen', subtitle: 'maya.chen@company.com', meta1: 'Design', meta2: 'UX Manager', meta3: '1 day ago', status: 'Compliant', statusTone: 'emerald' },
      { title: 'Vikram Sethi', subtitle: 'vikram.sethi@company.com', meta1: 'Operations', meta2: 'IT Analyst', meta3: '3 days ago', status: 'Needs Review', statusTone: 'red' }
    ]
  },
  compliance_reports: {
    title: 'Compliance Reports',
    columns: [
      { key: 'name', label: 'Report' },
      { key: 'type', label: 'Domain' },
      { key: 'owner', label: 'Owner' },
      { key: 'source', label: 'Due' },
      { key: 'status', label: 'Status' }
    ],
    rows: [
      { title: 'Quarterly Device Compliance', subtitle: 'CMP-2026-Q4', meta1: 'Endpoint', meta2: 'Security Team', meta3: '2026-11-15', status: 'Healthy', statusTone: 'emerald' },
      { title: 'Access Review Audit', subtitle: 'CMP-2026-AR', meta1: 'Identity', meta2: 'IAM Ops', meta3: '2026-11-22', status: 'Flagged', statusTone: 'amber' },
      { title: 'Patch Compliance Summary', subtitle: 'CMP-2026-PCS', meta1: 'Endpoint', meta2: 'Infra Ops', meta3: '2026-11-30', status: 'Healthy', statusTone: 'emerald' },
      { title: 'License Usage Review', subtitle: 'CMP-2026-LUR', meta1: 'Software', meta2: 'Procurement', meta3: '2026-12-02', status: 'Needs Action', statusTone: 'red' }
    ]
  },
  exceptions: {
    title: 'Exceptions',
    columns: [
      { key: 'name', label: 'Exception' },
      { key: 'type', label: 'Category' },
      { key: 'owner', label: 'Owner' },
      { key: 'source', label: 'Opened' },
      { key: 'status', label: 'Severity' }
    ],
    rows: [
      { title: 'Departed with licenses', subtitle: 'EXC-0091', meta1: 'User Access', meta2: 'IAM Admin', meta3: '2026-10-21', status: 'High', statusTone: 'red' },
      { title: 'Missing serial record', subtitle: 'EXC-0088', meta1: 'Asset Traceability', meta2: 'CMDB Admin', meta3: '2026-10-18', status: 'Medium', statusTone: 'amber' },
      { title: 'Duplicate asset tag', subtitle: 'EXC-0087', meta1: 'Inventory', meta2: 'Inventory Team', meta3: '2026-10-15', status: 'Low', statusTone: 'slate' }
    ]
  }
};

const sidebarSections = [
  { id: 'it_assets', label: 'IT assets' },
  { id: 'asset_events', label: 'Asset events' },
  { id: 'software_licenses', label: 'Software licenses' },
  { id: 'entra_users', label: 'Entra users' },
  { id: 'compliance_reports', label: 'Compliance reports' },
  { id: 'exceptions', label: 'Exceptions' }
] as const;

const launcherTiles = [
  { id: 'finance', label: 'Finance', tone: 'slate', accent: 'F' },
  { id: 'helpdesk', label: 'Helpdesk', tone: 'navy', accent: 'N' },
  { id: 'insights', label: 'Insights', tone: 'sky', accent: 'I' },
  { id: 'it', label: 'IT', tone: 'blue', accent: 'I', highlight: 'Live' },
  { id: 'marketing', label: 'Marketing', tone: 'indigo', accent: 'M' },
  { id: 'proficientnow', label: 'ProficientNow', tone: 'teal', accent: 'P' },
  { id: 'operations', label: 'Operations', tone: 'rose', accent: 'O' },
  { id: 'security', label: 'Security', tone: 'emerald', accent: 'S' },
  { id: 'admin', label: 'Admin', tone: 'amber', accent: 'A' }
] as const;

function WorkspaceTable({ columns, rows }: { columns: ColumnConfig[]; rows: DataRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="w-[110px] px-2 py-3 text-center">
              <div className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                <span>#</span>
                <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              </div>
            </th>
            {columns.map((column) => (
              <th key={column.key} className="px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                {column.label}
              </th>
            ))}
            <th className="w-10 px-2 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">⋯</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.subtitle}-${index}`} className="h-12 border-b border-slate-100 bg-white hover:bg-slate-50">
              <td className="px-2 py-2.5">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 tabular-nums">{index + 1}</span>
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </div>
              </td>

              {columns.map((column) => {
                if (column.key === 'name') {
                  return (
                    <td key={`${row.subtitle}-${column.key}`} className="px-3 py-2.5 text-xs text-slate-700">
                      <div className="flex flex-col leading-[1.2]">
                        <button type="button" className="text-left text-[11px] font-medium text-blue-600 hover:underline">
                          {row.title}
                        </button>
                        <span className="mt-0.5 font-mono text-[10px] text-slate-400">{row.subtitle}</span>
                      </div>
                    </td>
                  );
                }

                return (
                  <td key={`${row.subtitle}-${column.key}`} className="px-3 py-2.5 text-xs text-slate-700">
                    {column.key === 'status' ? (
                      <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold ${badgeClasses[row.statusTone ?? 'slate']}`}>
                        <span className="h-2 w-2 rounded-full bg-current opacity-80" />
                        {row.status}
                      </span>
                    ) : column.key === 'type' ? (
                      <span>{row.meta1}</span>
                    ) : column.key === 'owner' ? (
                      <span>{row.meta2}</span>
                    ) : column.key === 'source' ? (
                      <span>{row.meta3}</span>
                    ) : column.key === 'review' ? (
                      <span>{row.review}</span>
                    ) : (
                      <span>{row.badge ?? '—'}</span>
                    )}
                  </td>
                );
              })}

              <td className="w-10 px-2 py-2.5 text-center text-lg text-slate-400">⋯</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('launcher');

  const currentTable = activeView === 'it_home' ? tableViews.it_assets : tableViews[activeView as Exclude<ActiveView, 'it_home'>];

  const breadcrumb = useMemo(() => {
    if (activeView === 'it_home') return 'Home / IT';
    if (activeView === 'it_assets') return 'Home / IT / IT Asset';
    if (activeView === 'asset_events') return 'Home / IT / Asset Events';
    if (activeView === 'software_licenses') return 'Home / IT / Software and Licenses';
    if (activeView === 'entra_users') return 'Home / IT / Entra Users';
    if (activeView === 'compliance_reports') return 'Home / IT / Compliance Reports';
    return 'Home / IT / Exceptions';
  }, [activeView]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="w-72 border-r border-slate-200 bg-slate-50 p-4">
          <div className="mb-6 px-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Workspace</p>
            <h1 className="mt-2 text-xl font-bold text-slate-900">IT</h1>
          </div>

          <nav className="space-y-2">
            <button
              type="button"
              onClick={() => setActiveView('it_home')}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${activeView === 'it_home' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200/80'}`}
            >
              <span>Home</span>
            </button>

            <div className="mt-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">IT Workspace Navigation</div>

            <div className="space-y-1">
              {sidebarSections.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveView(item.id)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200/80'}`}
                  >
                    <span>{item.label}</span>
                    <span className={`inline-flex min-w-6 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {item.id === 'it_assets' ? '118' : item.id === 'asset_events' ? '45' : item.id === 'software_licenses' ? '45' : item.id === 'entra_users' ? '542' : item.id === 'compliance_reports' ? '4' : '2'}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        <main className="flex-1 bg-[#f5f7fb]">
          <header className="border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Breadcrumb</div>
                <div className="mt-2 text-lg font-semibold text-slate-800">{breadcrumb}</div>
              </div>
              <button type="button" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50">
                Export
              </button>
            </div>
          </header>

          <section className="p-6">
            {activeView === 'launcher' ? (
              <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-white">
                <div className="w-full max-w-4xl">
                  <div className="mb-10 flex items-center justify-center gap-2 text-slate-900">
                    <div className="text-2xl font-bold tracking-tight">Proficient</div>
                    <div className="font-serif text-2xl italic font-semibold text-blue-500">Now.</div>
                  </div>

                  <div className="grid grid-cols-3 gap-x-12 gap-y-10 justify-items-center">
                    {launcherTiles.map((tile) => (
                      <button
                        key={tile.id}
                        type="button"
                        onClick={() => setActiveView(tile.id === 'it' ? 'it_home' : 'it_home')}
                        className="group relative flex flex-col items-center transition-transform hover:-translate-y-1"
                      >
                        <div
                          className={`relative flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-sm transition-all ${tile.tone === 'slate' ? 'bg-slate-500' :
                              tile.tone === 'navy' ? 'bg-slate-900 text-blue-200' :
                                tile.tone === 'sky' ? 'bg-sky-600' :
                                  tile.tone === 'blue' ? 'bg-blue-700 ring-2 ring-blue-500/30' :
                                    tile.tone === 'indigo' ? 'bg-indigo-600' :
                                      tile.tone === 'teal' ? 'bg-teal-600' :
                                        tile.tone === 'rose' ? 'bg-rose-500' :
                                          tile.tone === 'emerald' ? 'bg-emerald-600' :
                                            'bg-amber-500'
                            }`}
                        >
                          <span className="border-y-2 border-white px-1 leading-none">{tile.accent}</span>
                          {tile.highlight && (
                            <span className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
                              {tile.highlight}
                            </span>
                          )}
                        </div>
                        <span className="mt-2.5 text-xs font-semibold tracking-tight text-slate-700 group-hover:text-blue-700">
                          {tile.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : activeView === 'it_home' ? (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Overview</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900">Good morning, Administrator</h2>
                  <p className="mt-2 text-slate-600">Your IT operations summary is ready to review.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: 'IT Assets', value: '516', tone: 'blue' },
                    { label: 'Active Users', value: '1,248', tone: 'emerald' },
                    { label: 'Open Tickets', value: '17', tone: 'amber' }
                  ].map((card) => (
                    <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${card.tone === 'blue' ? 'bg-blue-100 text-blue-700' : card.tone === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {card.label}
                      </div>
                      <div className="mt-4 text-3xl font-bold text-slate-900">{card.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Table View</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-900">{currentTable.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Filters
                      </button>
                      <button type="button" className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                        + Add
                      </button>
                    </div>
                  </div>

                  <WorkspaceTable columns={currentTable.columns} rows={currentTable.rows} />
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

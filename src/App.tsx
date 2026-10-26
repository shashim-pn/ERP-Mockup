import { useMemo, useState } from 'react';

type ActiveView = 'it_home' | 'it_assets';

type Asset = {
  name: string;
  owner: string;
  type: string;
  status: string;
  location: string;
};

const assetRows: Asset[] = [
  { name: 'Dell Latitude 5440', owner: 'Ananya Roy', type: 'Laptop', status: 'In use', location: 'Bangalore' },
  { name: 'Cisco Catalyst 9300', owner: 'Network Team', type: 'Switch', status: 'Healthy', location: 'Hyderabad' },
  { name: 'Lenovo ThinkCentre', owner: 'Finance Ops', type: 'Desktop', status: 'Maintenance', location: 'Pune' },
  { name: 'VMware ESXi Host', owner: 'Platform Team', type: 'Server', status: 'In use', location: 'Bengaluru' }
];

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('it_home');

  const goToITHome = () => setActiveView('it_home');
  const goToITAssets = () => setActiveView('it_assets');

  const breadcrumb = useMemo(() => {
    if (activeView === 'it_home') return 'Home / IT';
    if (activeView === 'it_assets') return 'Home / IT / IT Asset';
    return 'Home';
  }, [activeView]);

  const sidebarItems = [
    { id: 'it_home', label: 'Home', tone: 'blue', onClick: goToITHome },
    { id: 'it_assets', label: 'IT assets', tone: 'indigo', onClick: goToITAssets }
  ] as const;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="w-72 border-r border-slate-200 bg-slate-50 p-4">
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Workspace</p>
            <h1 className="mt-2 text-xl font-bold text-slate-900">IT</h1>
          </div>

          <nav className="space-y-1">
            <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              IT Module
            </div>

            {sidebarItems.map((item) => {
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  className={[
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
                    isActive
                      ? item.tone === 'blue'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-200/80'
                  ].join(' ')}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="h-2 w-2 rounded-full bg-white/90" />}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 bg-white">
          <header className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Breadcrumb</div>
            <div className="mt-2 text-lg font-semibold text-slate-800">{breadcrumb}</div>
          </header>

          <section className="p-6">
            {activeView === 'it_home' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Overview</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900">Good morning, Administrator</h2>
                  <p className="mt-2 text-slate-600">Your IT operations summary is ready for review.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { label: 'IT Assets', value: '516', tone: 'blue' },
                    { label: 'Active People', value: '1', tone: 'emerald' },
                    { label: 'Open Tickets', value: '17', tone: 'amber' }
                  ].map((card) => (
                    <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${card.tone === 'blue'
                        ? 'bg-blue-100 text-blue-700'
                        : card.tone === 'emerald'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                        }`}>
                        {card.label}
                      </div>
                      <div className="mt-4 text-3xl font-bold text-slate-900">{card.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'it_assets' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">CMDB</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">IT Assets</h2>
                  </div>
                  <button type="button" className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                    Add Asset
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Asset</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Owner</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assetRows.map((asset) => (
                          <tr key={asset.name} className="border-t border-slate-200">
                            <td className="px-4 py-3 font-medium text-slate-900">{asset.name}</td>
                            <td className="px-4 py-3 text-slate-600">{asset.owner}</td>
                            <td className="px-4 py-3 text-slate-600">{asset.type}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                {asset.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-600">{asset.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

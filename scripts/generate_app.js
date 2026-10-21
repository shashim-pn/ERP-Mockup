import fs from 'fs';
import { reportConfigs } from './data.js';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ProficientNow. - Enterprise Next Experience IT CMDB</title>
  <meta name="description" content="Navy blue & white Next Experience skin over ERPNext v15 with ServiceNow Slashbucket dual-list column selector and single-pane tabbed form view." />
  <meta property="og:title" content="ProficientNow. - Enterprise IT CMDB" />
  <meta property="og:description" content="Next Experience skin with Slashbucket dual-list column customizer and no-scroll tabbed forms." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/index.css" />
  <script type="module" src="/src/main.ts"></script>
  <style>
    [x-cloak] { display: none !important; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #F1F5F9; }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
  </style>
</head>
<body class="bg-surface-canvas text-slate-900 font-sans antialiased text-xs select-none min-h-screen flex flex-col" x-data="appData()" x-init="initApp()" @keydown.window.ctrl.k.prevent="cmdPaletteOpen = true" @keydown.window.meta.k.prevent="cmdPaletteOpen = true" @keydown.escape.window="closeAllOverlays()">

  <!-- TOP CHROME HEADER (Navy Blue Aesthetic) -->
  <header class="h-12 bg-navy-900 border-b-2 border-navy-600 text-white flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-40 select-none shadow-md">
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-1 cursor-pointer" @click="setView('launcher')">
        <span class="font-bold tracking-tight text-white text-base">Proficient</span>
        <span class="font-serif italic text-navy-400 text-base font-semibold">Now.</span>
      </div>

      <!-- Quick Route Trail in Header -->
      <div class="hidden sm:flex items-center gap-1.5 ml-3">
        <button @click="setView('launcher')" :class="currentView === 'launcher' ? 'bg-white/20 text-white font-semibold' : 'text-slate-300 hover:bg-white/10'" class="px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-colors">
          <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
          <span>Workspace Launcher</span>
        </button>
        <template x-if="currentView !== 'launcher'">
          <div class="flex items-center gap-1.5">
            <span class="text-slate-500">/</span>
            <button @click="setView('it-dashboard')" :class="currentView === 'it-dashboard' ? 'bg-navy-800 text-white font-bold border border-navy-700' : 'text-slate-300 hover:bg-white/10'" class="px-2 py-0.5 rounded text-xs flex items-center gap-1">
              <span>IT</span>
            </button>
            <template x-if="currentView === 'it-list' || currentView === 'it-form'">
              <div class="flex items-center gap-1">
                <span class="text-slate-500">/</span>
                <button @click="setView('it-list')" class="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-xs flex items-center gap-1">
                  <span>IT Asset</span>
                </button>
                <template x-if="currentView === 'it-form' && currentRecord">
                  <div class="flex items-center gap-1">
                    <span class="text-slate-500">/</span>
                    <span class="text-slate-200 font-mono text-xs" x-text="currentRecord.name"></span>
                  </div>
                </template>
              </div>
            </template>
            <template x-if="currentView === 'report' && currentReport">
              <div class="flex items-center gap-1">
                <span class="text-slate-500">/</span>
                <span class="px-2 py-0.5 rounded bg-navy-800 text-white font-bold text-xs" x-text="currentReport.title"></span>
              </div>
            </template>
            <template x-if="currentView === 'it-sync-settings'">
              <div class="flex items-center gap-1">
                <span class="text-slate-500">/</span>
                <span class="px-2 py-0.5 rounded bg-navy-800 text-white font-bold text-xs">IT Sync Settings</span>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>

    <!-- Center Search with "Ctrl+K" hint -->
    <div class="w-72 sm:w-96 max-w-md">
      <button @click="cmdPaletteOpen = true" class="w-full flex items-center justify-between px-3.5 py-1.5 rounded-md bg-navy-950/70 hover:bg-navy-950 text-slate-200 text-xs border border-navy-700/60 transition-colors">
        <div class="flex items-center gap-2 text-slate-300">
          <i data-lucide="search" class="w-3.5 h-3.5 text-navy-400"></i>
          <span>Search records, CMDB...</span>
        </div>
        <kbd class="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-slate-300">Ctrl+K</kbd>
      </button>
    </div>

    <!-- Right: Bell Notification & Avatar "SH" -->
    <div class="flex items-center gap-3">
      <button @click="showToast('3 System Notifications pending', 'info')" class="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors relative" title="Notifications">
        <i data-lucide="bell" class="w-4 h-4"></i>
        <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400"></span>
      </button>

      <div class="relative" x-data="{ open: false }">
        <button @click="open = !open" class="w-7 h-7 rounded-full bg-navy-700 text-white font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-navy-400 transition-all border border-navy-500 shadow-xs" title="Syed Hashim">
          SH
        </button>
        <div x-show="open" @click.away="open = false" x-cloak class="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1.5 z-50">
          <div class="px-3 py-2 border-b border-slate-100">
            <p class="font-bold text-xs text-slate-900">Syed Hashim</p>
            <p class="text-[11px] text-slate-500 truncate">shashim@proficientnow.com</p>
            <span class="inline-block mt-1 px-1.5 py-0.2 rounded bg-navy-100 text-navy-800 text-[9px] font-bold">Global Admin</span>
          </div>
          <button @click="setView('launcher'); open = false" class="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center gap-2">
            <i data-lucide="layout-grid" class="w-3.5 h-3.5 text-slate-500"></i> Workspace Launcher
          </button>
          <button @click="setView('it-dashboard'); open = false" class="w-full text-left px-3 py-1.5 hover:bg-navy-50 text-navy-900 font-semibold flex items-center gap-2">
            <i data-lucide="layout-dashboard" class="w-3.5 h-3.5 text-navy-600"></i> IT / ERP Dashboard
          </button>
          <button @click="setView('it-list'); open = false" class="w-full text-left px-3 py-1.5 hover:bg-indigo-50 text-indigo-900 font-semibold flex items-center gap-2">
            <i data-lucide="columns-3" class="w-3.5 h-3.5 text-indigo-600"></i> IT Assets (CMDB)
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- ======================================================== -->
  <!-- SCREEN 1: LANDING PAGE (9 APP LAUNCHER TILES)            -->
  <!-- ======================================================== -->
  <main x-show="currentView === 'launcher'" x-cloak class="pt-12 flex-1 flex flex-col items-center justify-center p-6 select-none bg-surface-canvas">
    <div class="max-w-3xl w-full mx-auto my-auto flex flex-col items-center">
      <div class="grid grid-cols-3 sm:grid-cols-3 gap-x-12 gap-y-10 justify-items-center">

        <!-- 1. Finance -->
        <button @click="openComingSoon('Finance')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1">
          <div class="w-16 h-16 rounded-2xl bg-[#64748B] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-sm group-hover:shadow-md transition-all">
            F
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-navy-900 tracking-tight">Finance</span>
        </button>

        <!-- 2. Helpdesk -->
        <button @click="openComingSoon('Helpdesk')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1">
          <div class="w-16 h-16 rounded-2xl bg-[#1E293B] text-[#93C5FD] flex items-center justify-center font-serif italic font-bold text-3xl shadow-sm group-hover:shadow-md transition-all">
            N
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-navy-900 tracking-tight">Helpdesk</span>
        </button>

        <!-- 3. Insights -->
        <button @click="openComingSoon('Insights')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1">
          <div class="w-16 h-16 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-sm group-hover:shadow-md transition-all">
            <span class="border-y-2 border-white px-1 leading-none">I</span>
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-navy-900 tracking-tight">Insights</span>
        </button>

        <!-- 4. IT (LIVE HERO WORKSPACE: OPENS IT / ERP WORKSPACE DASHBOARD) -->
        <button @click="setView('it-dashboard')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1.5 relative">
          <div class="w-16 h-16 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-md group-hover:shadow-lg transition-all ring-2 ring-navy-600/30 group-hover:ring-navy-600">
            <span class="border-y-2 border-white px-1 leading-none">I</span>
          </div>
          <span class="mt-2.5 text-xs font-bold text-navy-900 group-hover:text-navy-600 tracking-tight">IT</span>
          <span class="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-sans text-[9px] font-bold shadow-xs uppercase tracking-wider">
            Live
          </span>
        </button>

        <!-- 5. Marketing -->
        <button @click="openComingSoon('Marketing')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1">
          <div class="w-16 h-16 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-sm group-hover:shadow-md transition-all">
            M
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-navy-900 tracking-tight">Marketing</span>
        </button>

        <!-- 6. ProficientNow -->
        <button @click="openComingSoon('ProficientNow')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1">
          <div class="w-16 h-16 rounded-2xl bg-[#1E293B] text-[#93C5FD] flex items-center justify-center font-serif italic font-bold text-3xl shadow-sm group-hover:shadow-md transition-all">
            N
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-navy-900 tracking-tight">ProficientNow</span>
        </button>

        <!-- 7. Security -->
        <button @click="openComingSoon('Security')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1">
          <div class="w-16 h-16 rounded-2xl bg-[#64748B] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-sm group-hover:shadow-md transition-all">
            S
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-navy-900 tracking-tight">Security</span>
        </button>

        <!-- 8. Wiki -->
        <button @click="openComingSoon('Wiki')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1">
          <div class="w-16 h-16 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-sm group-hover:shadow-md transition-all">
            W
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-navy-900 tracking-tight">Wiki</span>
        </button>

        <!-- 9. HR -->
        <button @click="openComingSoon('HR')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1">
          <div class="w-16 h-16 rounded-2xl bg-[#1E293B] text-[#93C5FD] flex items-center justify-center font-serif italic font-bold text-3xl shadow-sm group-hover:shadow-md transition-all">
            N
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-navy-900 tracking-tight">HR</span>
        </button>

      </div>

      <!-- Quick Launch Helper Banner -->
      <div class="mt-14 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 text-slate-600 text-xs">
        <span class="flex h-2 w-2 rounded-full bg-emerald-500"></span>
        <span>Click <strong>IT</strong> above to open the <strong>IT Workspace (ERP)</strong> with the <strong>ServiceNow Slashbucket</strong> list view.</span>
        <button @click="setView('it-dashboard')" class="ml-2 font-bold text-navy-700 hover:text-navy-900 underline">Open IT Workspace &rarr;</button>
      </div>
    </div>
  </main>

  <!-- ======================================================== -->
  <!-- SCREEN 2: IT WORKSPACE WITH COLLAPSIBLE SIDEBAR          -->
  <!-- ======================================================== -->
  <div x-show="currentView !== 'launcher'" x-cloak class="pt-12 flex-1 flex min-h-screen">

    <!-- LEFT SIDEBAR (COLLAPSIBLE 240px -> 64px) -->
    <aside :class="sidebarCollapsed ? 'w-16' : 'w-60'" class="transition-all duration-200 bg-surface-sidebar border-r border-surface-border flex-shrink-0 flex flex-col justify-between fixed top-12 bottom-0 z-30 select-none overflow-y-auto overflow-x-hidden">
      <div>
        <!-- Workspace Switcher Tile + Collapse Button -->
        <div class="p-3 border-b border-surface-border flex items-center justify-between cursor-pointer hover:bg-slate-100/70">
          <div class="flex items-center gap-2.5" @click="setView('it-dashboard')">
            <div class="w-8 h-8 rounded-lg bg-slate-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
              <span class="border-y-2 border-white px-0.5 leading-none font-sans">I</span>
            </div>
            <div x-show="!sidebarCollapsed" class="overflow-hidden">
              <div class="font-bold text-slate-900 text-xs leading-tight">IT</div>
              <div class="text-[10px] text-slate-500">ERP</div>
            </div>
          </div>
          <button @click.stop="toggleSidebar()" class="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors" :title="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
            <i :data-lucide="sidebarCollapsed ? 'chevron-right' : 'chevron-left'" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Search & Notification shortcuts -->
        <div class="p-2 space-y-1">
          <button @click="cmdPaletteOpen = true" class="w-full flex items-center px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-200/60 font-medium text-xs transition-colors" :class="sidebarCollapsed ? 'justify-center' : 'justify-between'" title="Search (Ctrl+K)">
            <div class="flex items-center gap-2">
              <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Search</span>
            </div>
            <span x-show="!sidebarCollapsed" class="text-[10px] text-slate-400 font-mono">Ctrl+K</span>
          </button>
          <button @click="showToast('Notification center', 'info')" class="w-full flex items-center px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-200/60 font-medium text-xs transition-colors" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Notifications">
            <i data-lucide="bell" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
            <span x-show="!sidebarCollapsed">Notification</span>
          </button>
        </div>

        <!-- Home -->
        <div class="px-2">
          <button @click="setView('it-dashboard')" :class="currentView === 'it-dashboard' ? 'bg-white text-navy-900 font-bold shadow-xs border border-slate-200' : 'text-slate-700 hover:bg-slate-200/60 font-medium'" class="w-full flex items-center px-2.5 py-1.5 rounded-lg text-xs transition-colors" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Home">
            <i data-lucide="home" class="w-4 h-4 text-slate-500 shrink-0"></i>
            <span x-show="!sidebarCollapsed">Home</span>
          </button>
        </div>

        <!-- Section 1: Assets -->
        <div class="px-2 pt-2" x-data="{ open: true }">
          <button @click="if(!sidebarCollapsed) open = !open" class="w-full flex items-center px-2.5 py-1.5 text-slate-700 font-bold text-xs hover:bg-slate-100 rounded-lg" :class="sidebarCollapsed ? 'justify-center' : 'justify-between'" title="Assets">
            <div class="flex items-center gap-2">
              <i data-lucide="folder" class="w-3.5 h-3.5 text-slate-500 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Assets</span>
            </div>
            <i x-show="!sidebarCollapsed" data-lucide="chevron-down" class="w-3 h-3 text-slate-400 transition-transform duration-200" :class="open ? '' : '-rotate-90'"></i>
          </button>
          <div x-show="open || sidebarCollapsed" class="py-1 space-y-0.5 text-xs" :class="sidebarCollapsed ? 'px-0' : 'pl-4 pr-1'">
            <button @click="setView('it-list')" :class="currentView === 'it-list' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1.5 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="IT Assets (CMDB)">
              <i data-lucide="terminal" class="w-3.5 h-3.5 text-indigo-600 shrink-0"></i>
              <span x-show="!sidebarCollapsed">IT Assets (CMDB)</span>
            </button>
            <button @click="openReport('asset-events')" :class="currentView === 'report' && currentReportKey === 'asset-events' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Asset Events">
              <i data-lucide="file-text" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Asset Events</span>
            </button>
            <button @click="openReport('warranty-expiring')" :class="currentView === 'report' && currentReportKey === 'warranty-expiring' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Warranty Expiring">
              <i data-lucide="bar-chart-2" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Warranty Expiring</span>
            </button>
            <button @click="openReport('physical-audit-due')" :class="currentView === 'report' && currentReportKey === 'physical-audit-due' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Physical Audit Due">
              <i data-lucide="bar-chart-2" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Physical Audit Due</span>
            </button>
            <button @click="openReport('audit-worksheet-30-days')" :class="currentView === 'report' && currentReportKey === 'audit-worksheet-30-days' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Audit Worksheet (30 Days)">
              <i data-lucide="bar-chart-2" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Audit Worksheet (30 Days)</span>
            </button>
          </div>
        </div>

        <!-- Section 2: Software & Licences -->
        <div class="px-2 pt-1" x-data="{ open: true }">
          <button @click="if(!sidebarCollapsed) open = !open" class="w-full flex items-center px-2.5 py-1.5 text-slate-700 font-bold text-xs hover:bg-slate-100 rounded-lg" :class="sidebarCollapsed ? 'justify-center' : 'justify-between'" title="Software & Licences">
            <div class="flex items-center gap-2">
              <i data-lucide="layers" class="w-3.5 h-3.5 text-slate-500 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Software &amp; Licences</span>
            </div>
            <i x-show="!sidebarCollapsed" data-lucide="chevron-down" class="w-3 h-3 text-slate-400 transition-transform duration-200" :class="open ? '' : '-rotate-90'"></i>
          </button>
          <div x-show="open || sidebarCollapsed" class="py-1 space-y-0.5 text-xs" :class="sidebarCollapsed ? 'px-0' : 'pl-4 pr-1'">
            <button @click="openReport('software-licences')" :class="currentView === 'report' && currentReportKey === 'software-licences' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Software Licences">
              <i data-lucide="file-text" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Software Licences</span>
            </button>
            <button @click="openReport('devices-by-software')" :class="currentView === 'report' && currentReportKey === 'devices-by-software' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Devices by Software">
              <i data-lucide="file-text" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Devices by Software</span>
            </button>
            <button @click="openReport('licence-compliance')" :class="currentView === 'report' && currentReportKey === 'licence-compliance' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Licence Compliance">
              <i data-lucide="bar-chart-2" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Licence Compliance</span>
            </button>
            <button @click="openReport('prohibited-software')" :class="currentView === 'report' && currentReportKey === 'prohibited-software' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Prohibited Software">
              <i data-lucide="alert-octagon" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Prohibited Software</span>
            </button>
            <button @click="openReport('software-cross-check')" :class="currentView === 'report' && currentReportKey === 'software-cross-check' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Software Cross-Check">
              <i data-lucide="file-text" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Software Cross-Check</span>
            </button>
            <button @click="openReport('saas-renewal-watch')" :class="currentView === 'report' && currentReportKey === 'saas-renewal-watch' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="SaaS Renewal Watch">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">SaaS Renewal Watch</span>
            </button>
          </div>
        </div>

        <!-- Section 3: Identity & Access -->
        <div class="px-2 pt-1">
          <button @click="openReport('identity-access')" :class="currentView === 'report' && currentReportKey === 'identity-access' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-700 hover:bg-slate-100'" class="w-full flex items-center px-2.5 py-1.5 font-bold text-xs rounded-lg transition-colors" :class="sidebarCollapsed ? 'justify-center' : 'justify-between'" title="Identity & Access">
            <div class="flex items-center gap-2">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-slate-500 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Identity &amp; Access</span>
            </div>
            <i x-show="!sidebarCollapsed" data-lucide="arrow-up-right" class="w-3 h-3 text-slate-400"></i>
          </button>
        </div>

        <!-- Section 4: Exceptions -->
        <div class="px-2 pt-1">
          <button @click="openReport('exceptions')" :class="currentView === 'report' && currentReportKey === 'exceptions' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-700 hover:bg-slate-100'" class="w-full flex items-center px-2.5 py-1.5 font-bold text-xs rounded-lg transition-colors" :class="sidebarCollapsed ? 'justify-center' : 'justify-between'" title="Exceptions">
            <div class="flex items-center gap-2">
              <i data-lucide="alert-octagon" class="w-3.5 h-3.5 text-amber-500 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Exceptions</span>
            </div>
            <i x-show="!sidebarCollapsed" data-lucide="arrow-up-right" class="w-3 h-3 text-slate-400"></i>
          </button>
        </div>

        <!-- Section 5: Work & Settings -->
        <div class="px-2 pt-1" x-data="{ open: true }">
          <button @click="if(!sidebarCollapsed) open = !open" class="w-full flex items-center px-2.5 py-1.5 text-slate-700 font-bold text-xs hover:bg-slate-100 rounded-lg" :class="sidebarCollapsed ? 'justify-center' : 'justify-between'" title="Work & Settings">
            <div class="flex items-center gap-2">
              <i data-lucide="sliders" class="w-3.5 h-3.5 text-slate-500 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Work &amp; Settings</span>
            </div>
            <i x-show="!sidebarCollapsed" data-lucide="chevron-down" class="w-3 h-3 text-slate-400 transition-transform duration-200" :class="open ? '' : '-rotate-90'"></i>
          </button>
          <div x-show="open || sidebarCollapsed" class="py-1 space-y-0.5 text-xs" :class="sidebarCollapsed ? 'px-0' : 'pl-4 pr-1'">
            <button @click="openReport('ticket-queue')" :class="currentView === 'report' && currentReportKey === 'ticket-queue' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="Ticket Queue">
              <i data-lucide="inbox" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">Ticket Queue</span>
            </button>
            <button @click="setView('it-sync-settings')" :class="currentView === 'it-sync-settings' ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200' : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'" class="w-full text-left px-2 py-1 rounded flex items-center" :class="sidebarCollapsed ? 'justify-center' : 'gap-2'" title="IT Sync Settings">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span x-show="!sidebarCollapsed">IT Sync Settings</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom User Card -->
      <div class="p-3 border-t border-surface-border bg-white flex items-center gap-2.5">
        <div class="w-7 h-7 rounded-full bg-[#EBDDBE] text-[#473B25] font-bold text-xs flex items-center justify-center shrink-0">
          SH
        </div>
        <div x-show="!sidebarCollapsed" class="overflow-hidden leading-tight">
          <div class="font-bold text-slate-800 text-xs truncate">Syed Hashim</div>
          <div class="text-[10px] text-slate-400 truncate">shashim@proficientnow...</div>
        </div>
      </div>
    </aside>

    <!-- RIGHT MAIN CONTENT (Offset by 60 or 16 depending on collapsed state) -->
    <main :class="sidebarCollapsed ? 'ml-16' : 'ml-60'" class="transition-all duration-200 flex-1 min-w-0 flex flex-col min-h-[calc(100vh-48px)] bg-[#E8EFE9]">

      <!-- UNIVERSAL BREADCRUMB BAR (Strict: Home / IT / IT Asset / <record name>) -->
      <div class="px-6 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 shadow-2xs select-none">
        <div class="flex items-center gap-1.5 font-medium">
          <button @click="setView('launcher')" class="hover:text-navy-900 flex items-center gap-1">
            <i data-lucide="home" class="w-3.5 h-3.5 text-slate-400"></i>
            <span>Home</span>
          </button>
          <span class="text-slate-400">/</span>
          <button @click="setView('it-dashboard')" :class="currentView === 'it-dashboard' ? 'font-bold text-slate-900' : 'hover:text-navy-900'">
            IT
          </button>
          <template x-if="currentView === 'it-list' || currentView === 'it-form'">
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400">/</span>
              <button @click="setView('it-list')" :class="currentView === 'it-list' ? 'font-bold text-slate-900' : 'hover:text-navy-900'">
                IT Asset
              </button>
              <template x-if="currentView === 'it-form' && currentRecord">
                <div class="flex items-center gap-1.5">
                  <span class="text-slate-400">/</span>
                  <span class="font-bold text-navy-900 font-mono" x-text="currentRecord.name"></span>
                </div>
              </template>
            </div>
          </template>
          <template x-if="currentView === 'report' && currentReport">
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400">/</span>
              <span class="font-bold text-slate-900" x-text="currentReport.title"></span>
            </div>
          </template>
          <template x-if="currentView === 'it-sync-settings'">
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400">/</span>
              <span class="font-bold text-slate-900">IT Sync Settings</span>
            </div>
          </template>
        </div>

        <div class="flex items-center gap-2">
          <span class="font-mono text-[11px] text-slate-400" x-text="getRouteLabel()"></span>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- VIEW A: IT WORKSPACE DASHBOARD (/desk/it)  -->
      <!-- ========================================== -->
      <section x-show="currentView === 'it-dashboard'" class="p-6 max-w-6xl w-full mx-auto space-y-6">

        <!-- ESTATE PULSE -->
        <div>
          <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Estate Pulse &mdash; Live from the Registers
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div @click="setView('it-list')" class="bg-white p-3.5 rounded-lg border border-slate-200 border-t-4 border-t-amber-500 shadow-xs cursor-pointer hover:shadow-md transition-shadow">
              <div class="text-2xl font-bold text-slate-900 tabular-nums">516</div>
              <div class="text-[10px] text-slate-500 font-semibold uppercase mt-1">IT Assets</div>
            </div>
            <div @click="openReport('identity-access')" class="bg-white p-3.5 rounded-lg border border-slate-200 border-t-4 border-t-teal-600 shadow-xs cursor-pointer hover:shadow-md transition-shadow">
              <div class="text-2xl font-bold text-slate-900 tabular-nums">1</div>
              <div class="text-[10px] text-slate-500 font-semibold uppercase mt-1">Active People</div>
            </div>
            <div @click="openReport('identity-access')" class="bg-white p-3.5 rounded-lg border border-slate-200 border-t-4 border-t-purple-600 shadow-xs cursor-pointer hover:shadow-md transition-shadow">
              <div class="text-2xl font-bold text-slate-900 tabular-nums">77</div>
              <div class="text-[10px] text-slate-500 font-semibold uppercase mt-1">Entra Apps</div>
            </div>
            <div @click="openReport('software-licences')" class="bg-white p-3.5 rounded-lg border border-slate-200 border-t-4 border-t-blue-600 shadow-xs cursor-pointer hover:shadow-md transition-shadow">
              <div class="text-2xl font-bold text-slate-900 tabular-nums">15</div>
              <div class="text-[10px] text-slate-500 font-semibold uppercase mt-1">SW Licences</div>
            </div>
            <div @click="openReport('physical-audit-due')" class="bg-white p-3.5 rounded-lg border border-slate-200 border-t-4 border-t-rose-600 shadow-xs cursor-pointer hover:shadow-md transition-shadow">
              <div class="text-2xl font-bold text-slate-900 tabular-nums">17</div>
              <div class="text-[10px] text-slate-500 font-semibold uppercase mt-1">Audit Due (90d)</div>
            </div>
          </div>
        </div>

        <!-- QUICK ACCESS MODULES GRID -->
        <div>
          <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Core IT Modules &amp; Compliance Registers
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Card 1: IT Asset CMDB -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col justify-between hover:border-indigo-400 transition-colors">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <div class="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                    <i data-lucide="terminal" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-xs text-slate-900">IT Assets (CMDB)</h3>
                    <span class="text-[10px] text-indigo-700 font-mono font-bold">DocType: IT Asset</span>
                  </div>
                </div>
                <p class="text-slate-500 text-xs leading-relaxed">
                  Hardware inventory with ServiceNow Slashbucket dual-list column customizer and no-scroll tabbed form view.
                </p>
              </div>
              <button @click="setView('it-list')" class="mt-4 w-full py-1.5 px-3 bg-navy-700 hover:bg-navy-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs">
                <span>Open IT Assets Register</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>

            <!-- Card 2: Software & Licences -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col justify-between hover:border-indigo-400 transition-colors">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <div class="p-2 rounded-lg bg-purple-50 text-purple-700">
                    <i data-lucide="layers" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-xs text-slate-900">Software &amp; Licences</h3>
                    <span class="text-[10px] text-purple-700 font-mono font-bold">DocType: Software License</span>
                  </div>
                </div>
                <p class="text-slate-500 text-xs leading-relaxed">
                  Enterprise licensing seats, entitlement compliance, prohibited application isolation, and SaaS renewal watch.
                </p>
              </div>
              <button @click="openReport('software-licences')" class="mt-4 w-full py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5">
                <span>View Software Licences</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>

            <!-- Card 3: IT Sync Settings & Connectors -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col justify-between hover:border-indigo-400 transition-colors">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <div class="p-2 rounded-lg bg-teal-50 text-teal-700">
                    <i data-lucide="refresh-cw" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-xs text-slate-900">IT Sync Settings</h3>
                    <span class="text-[10px] text-teal-700 font-mono font-bold">Connectors &amp; MDM</span>
                  </div>
                </div>
                <p class="text-slate-500 text-xs leading-relaxed">
                  Automated background sync with GLPI Agent, Microsoft Entra ID directory, and Microsoft Intune telemetry.
                </p>
              </div>
              <button @click="setView('it-sync-settings')" class="mt-4 w-full py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5">
                <span>Configure Connectors</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>

      </section>

      <!-- ========================================== -->
      <!-- VIEW B: IT ASSETS LIST (CMDB WITH SLASHBUCKET) -->
      <!-- ========================================== -->
      <section x-show="currentView === 'it-list'" class="p-4 space-y-3 flex-1 flex flex-col max-w-[1800px] w-full">
        <!-- List Header Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base font-bold text-slate-900">IT Assets (CMDB)</h1>
              <span class="font-mono text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md font-bold">DocType: IT Asset</span>
              <span class="text-slate-400 text-xs">&bull;</span>
              <span class="text-slate-600 text-xs font-mono font-bold" x-text="filteredRecords.length + ' records'"></span>
            </div>
            <p class="text-[11px] text-slate-400 mt-0.5">Hardware CMDB registry with dual-list Slashbucket column selection and horizontal forms.</p>
          </div>
          <div class="flex items-center gap-2">
            <!-- HERO FEATURE 1: SLASHBUCKET BUTTON -->
            <button @click="openColumnsDrawer()" class="px-3 py-1.5 rounded-lg border border-indigo-300 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs">
              <i data-lucide="columns-3" class="w-3.5 h-3.5 text-indigo-600"></i>
              <span>Columns (Slashbucket)</span>
              <span x-show="isColumnsCustomized" class="w-2 h-2 rounded-full bg-indigo-600"></span>
            </button>
            <button @click="createNewRecord()" class="px-3.5 py-1.5 rounded-lg bg-navy-700 hover:bg-navy-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span>+ Add IT Asset</span>
            </button>
          </div>
        </div>

        <!-- Filter Strip -->
        <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-2.5">
          <div class="w-44">
            <input type="text" x-model="filters.id" @input="applyFilters()" placeholder="Filter by ID (e.g. ITA-00601)..." class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-navy-600 bg-slate-50/50">
          </div>
          <div class="w-56">
            <input type="text" x-model="filters.name" @input="applyFilters()" placeholder="Filter by Asset Name..." class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-1 focus:ring-navy-600 bg-slate-50/50">
          </div>
          <!-- Slashbucket Filter Buttons -->
          <button @click="openFilterSlashbucket('assetType')" class="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-400 bg-white text-slate-700 text-xs flex items-center gap-1.5">
            <i data-lucide="filter" class="w-3 h-3 text-slate-400"></i>
            <span>Asset Type</span>
            <span x-show="filters.assetTypes.length > 0" class="px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px]" x-text="filters.assetTypes.length"></span>
          </button>
          <button @click="openFilterSlashbucket('lifecycleState')" class="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-400 bg-white text-slate-700 text-xs flex items-center gap-1.5">
            <i data-lucide="filter" class="w-3 h-3 text-slate-400"></i>
            <span>Lifecycle State</span>
            <span x-show="filters.lifecycleStates.length > 0" class="px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px]" x-text="filters.lifecycleStates.length"></span>
          </button>
          <button @click="clearAllFilters()" class="text-xs text-slate-400 hover:text-slate-700 underline ml-auto">Clear Filters</button>
        </div>

        <!-- List Table Card -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-xs flex-1 flex flex-col overflow-hidden">
          <div class="overflow-x-auto flex-1">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 select-none">
                <tr>
                  <th class="p-3 w-8">
                    <input type="checkbox" @change="toggleSelectAll($event)" :checked="isAllSelected" class="rounded text-navy-700">
                  </th>
                  <template x-for="colKey in selectedDisplayColumns" :key="colKey">
                    <th class="px-3 py-2.5 font-bold whitespace-nowrap text-slate-700" x-text="getColumnLabel(colKey)"></th>
                  </template>
                  <th class="px-3 py-2.5 font-bold text-center w-16">Age</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <template x-for="record in pagedRecords" :key="record.name">
                  <tr @click="openRecordForm(record)" class="hover:bg-slate-50/80 cursor-pointer transition-colors group">
                    <td class="p-3" @click.stop>
                      <input type="checkbox" :value="record.name" x-model="selectedRowIds" class="rounded text-navy-700">
                    </td>
                    <template x-for="colKey in selectedDisplayColumns" :key="colKey">
                      <td class="px-3 py-2 whitespace-nowrap">
                        <template x-if="colKey === 'asset_name'">
                          <div class="flex items-center gap-2">
                            <span class="font-bold text-navy-900 group-hover:underline" x-text="record.asset_name"></span>
                            <span class="text-[10px] text-slate-400 font-mono" x-text="record.name"></span>
                          </div>
                        </template>
                        <template x-if="colKey === 'lifecycle_state'">
                          <span :class="getStatusPillClass(record.lifecycle_state)" class="px-2 py-0.5 rounded-full text-[10px] font-bold" x-text="record.lifecycle_state"></span>
                        </template>
                        <template x-if="colKey !== 'asset_name' && colKey !== 'lifecycle_state'">
                          <span class="text-slate-600" x-text="record[colKey] || '—'"></span>
                        </template>
                      </td>
                    </template>
                    <td class="px-3 py-2 text-center text-slate-400" x-text="record.age || '1 w'"></td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <div class="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <div>Page <strong x-text="currentPage"></strong> of <strong x-text="totalPages"></strong> (Showing <span x-text="pagedRecords.length"></span> of <span x-text="filteredRecords.length"></span>)</div>
            <div class="flex gap-2">
              <button @click="if(currentPage > 1) currentPage--" :disabled="currentPage === 1" class="px-2.5 py-1 rounded border border-slate-200 bg-white disabled:opacity-40">Previous</button>
              <button @click="if(currentPage < totalPages) currentPage++" :disabled="currentPage === totalPages" class="px-2.5 py-1 rounded border border-slate-200 bg-white disabled:opacity-40">Next</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ======================================================== -->
      <!-- VIEW C: IT ASSET FORM VIEW (PART 1 REQUIREMENTS)         -->
      <!-- Full-Width, 70/30 Grid, High Density, Fits Content       -->
      <!-- ======================================================== -->
      <section x-show="currentView === 'it-form' && currentRecord" class="w-full max-w-[1800px] p-4 flex flex-col gap-4">
        
        <!-- 70/30 CSS GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(320px,3fr)] gap-4 items-start">

          <!-- LEFT COLUMN (70%): Page Header Card + Tabbed Form -->
          <div class="space-y-4">
            
            <!-- Page Header Card (Spans full width of left column) -->
            <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <button @click="setView('it-list')" class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="Back to IT Assets list">
                  <i data-lucide="arrow-left" class="w-4 h-4"></i>
                </button>
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <h1 class="text-base font-bold text-slate-900" x-text="currentRecord?.asset_name || 'IT Asset'"></h1>
                    <span class="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-bold" x-text="currentRecord?.name"></span>
                    <span class="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 text-[10px] font-bold border border-indigo-200">DocType: IT Asset</span>
                    <span :class="isFormDirty ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300'" class="px-2 py-0.5 rounded-full text-[10px] font-bold border">
                      <span x-text="isFormDirty ? 'Not Saved' : 'Saved'"></span>
                    </span>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-0.5">Single-Pane Next Experience Tabbed Form View &bull; High Field Density</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button @click="createFinancialAsset()" class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors">
                  Create Financial Asset
                </button>
                <button @click="saveRecordForm()" class="px-4 py-1.5 rounded-lg bg-navy-700 hover:bg-navy-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors">
                  <i data-lucide="check" class="w-4 h-4"></i>
                  <span>Save</span>
                </button>
              </div>
            </div>

            <!-- Tabbed Form Card (Height fits content, no empty areas) -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              
              <!-- TAB BAR: Never clipped, whitespace-nowrap overflow-x-auto px-3 -->
              <div class="flex items-center border-b border-slate-200 bg-slate-50 px-3 overflow-x-auto whitespace-nowrap text-xs">
                <template x-for="tab in formTabs" :key="tab.id">
                  <button @click="activeFormTab = tab.id" :class="activeFormTab === tab.id ? 'border-b-2 border-navy-700 text-navy-900 bg-white font-bold' : 'text-slate-600 hover:text-slate-900'" class="px-3 py-2.5 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5">
                    <span x-text="tab.label"></span>
                    <span class="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold" x-text="tab.count"></span>
                  </button>
                </template>
              </div>

              <!-- TAB CONTENT PANE -->
              <div class="p-4 space-y-4">

                <!-- ===================================== -->
                <!-- TAB 1: IDENTITY                       -->
                <!-- ===================================== -->
                <div x-show="activeFormTab === 'identity'" class="space-y-4">
                  <!-- Sub-section: General Identity -->
                  <div>
                    <div class="border-b border-slate-200 pb-1 mb-2.5 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <i data-lucide="cpu" class="w-3.5 h-3.5 text-slate-500"></i>
                      <span>General Identity</span>
                    </div>
                    <div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
                      <div class="col-span-2">
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Asset Name *</label>
                        <input type="text" x-model="currentRecord.asset_name" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-semibold focus:ring-1 focus:ring-navy-600 bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Serial Number</label>
                        <input type="text" x-model="currentRecord.serial_no" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono focus:ring-1 focus:ring-navy-600 bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Asset Type *</label>
                        <select x-model="currentRecord.asset_type" @change="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white focus:ring-1 focus:ring-navy-600">
                          <option value="Laptop">Laptop</option>
                          <option value="Desktop">Desktop</option>
                          <option value="Server">Server</option>
                          <option value="Peripheral">Peripheral</option>
                          <option value="Mobile">Mobile</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Manufacturer</label>
                        <input type="text" x-model="currentRecord.manufacturer" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Model</label>
                        <input type="text" x-model="currentRecord.model" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                    </div>
                  </div>

                  <!-- Sub-section: Lifecycle & Classification -->
                  <div>
                    <div class="border-b border-slate-200 pb-1 mb-2.5 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <i data-lucide="activity" class="w-3.5 h-3.5 text-slate-500"></i>
                      <span>Lifecycle &amp; Classification</span>
                    </div>
                    <div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Lifecycle State *</label>
                        <select x-model="currentRecord.lifecycle_state" @change="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                          <option value="Deployed">Deployed</option>
                          <option value="In Stock">In Stock</option>
                          <option value="In Repair">In Repair</option>
                          <option value="Pending Disposal">Pending Disposal</option>
                          <option value="Retired">Retired</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Lifecycle Review</label>
                        <input type="text" x-model="currentRecord.lifecycle_review" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Compliance Posture</label>
                        <input type="text" x-model="currentRecord.compliance" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Asset Category</label>
                        <input type="text" value="Enterprise Hardware" class="w-full h-8 px-2.5 py-1 rounded border border-slate-200 text-[13px] bg-slate-50 text-slate-600" readonly>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ===================================== -->
                <!-- TAB 2: OWNERSHIP & ASSIGNMENT         -->
                <!-- ===================================== -->
                <div x-show="activeFormTab === 'ownership'" class="space-y-4">
                  <!-- Sub-section: Ownership -->
                  <div>
                    <div class="border-b border-slate-200 pb-1 mb-2.5 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <i data-lucide="building-2" class="w-3.5 h-3.5 text-slate-500"></i>
                      <span>Ownership</span>
                    </div>
                    <div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Owning Entity</label>
                        <input type="text" x-model="currentRecord.owning_entity" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Location</label>
                        <input type="text" x-model="currentRecord.location" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Department</label>
                        <input type="text" value="Information Technology" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Cost Centre</label>
                        <input type="text" value="CC-IT-INFRA-01" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                    </div>
                  </div>

                  <!-- Sub-section: Assignment -->
                  <div>
                    <div class="border-b border-slate-200 pb-1 mb-2.5 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <i data-lucide="user-check" class="w-3.5 h-3.5 text-slate-500"></i>
                      <span>Assignment &amp; Custody</span>
                    </div>
                    <div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
                      <div class="col-span-2">
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Assigned Employee (Entra UPN)</label>
                        <input type="text" x-model="currentRecord.assigned_employee" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Attached To (Computer)</label>
                        <input type="text" x-model="currentRecord.attached_to" @input="isFormDirty = true" placeholder="e.g. ITA-00244" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Assignment Source</label>
                        <input type="text" x-model="currentRecord.assigned_to_source" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ===================================== -->
                <!-- TAB 3: COMMERCIAL & FINANCIALS        -->
                <!-- ===================================== -->
                <div x-show="activeFormTab === 'commercial'" class="space-y-4">
                  <!-- Sub-section: Procurement Details -->
                  <div>
                    <div class="border-b border-slate-200 pb-1 mb-2.5 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <i data-lucide="shopping-cart" class="w-3.5 h-3.5 text-slate-500"></i>
                      <span>Procurement Details</span>
                    </div>
                    <div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Supplier</label>
                        <input type="text" x-model="currentRecord.supplier" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Purchase Invoice</label>
                        <input type="text" x-model="currentRecord.purchase_invoice" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Purchase Date</label>
                        <input type="date" x-model="currentRecord.purchase_date" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Warranty Expiry</label>
                        <input type="date" x-model="currentRecord.warranty_expiry" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div class="col-span-2">
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Purchase Basis / Notes</label>
                        <input type="text" value="Annual IT hardware refresh procurement cycle via corporate rate agreement" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Purchase Cost (INR)</label>
                        <input type="number" x-model="currentRecord.purchase_cost" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Maintenance Vendor</label>
                        <input type="text" value="OEM Certified Support" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ===================================== -->
                <!-- TAB 4: AUDIT & DISCOVERY              -->
                <!-- ===================================== -->
                <div x-show="activeFormTab === 'audit'" class="space-y-4">
                  <!-- Physical Audit -->
                  <div>
                    <div class="border-b border-slate-200 pb-1 mb-2.5 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <i data-lucide="check-square" class="w-3.5 h-3.5 text-slate-500"></i>
                      <span>Physical Audit &amp; Verification</span>
                    </div>
                    <div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Last Physically Audited</label>
                        <input type="date" x-model="currentRecord.last_audited" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Next Audit Due</label>
                        <input type="date" value="2025-04-15" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Discovery Source</label>
                        <input type="text" x-model="currentRecord.discovery_source" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Source Precedence</label>
                        <input type="text" value="GLPI Agent (Priority 1)" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                      <div class="col-span-2">
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Audit Notes</label>
                        <input type="text" value="Verified asset tag barcode and serial number against ERP physical inventory register" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                    </div>
                  </div>

                  <!-- Collapsible GLPI Discovery -->
                  <div class="border border-slate-200 rounded-lg p-3 bg-slate-50" x-data="{ openGlpi: true }">
                    <button @click="openGlpi = !openGlpi" class="w-full flex items-center justify-between text-left">
                      <div class="flex items-center gap-2">
                        <i data-lucide="radio" class="w-4 h-4 text-indigo-600"></i>
                        <span class="font-bold text-xs text-slate-800">GLPI Agent Discovery Telemetry</span>
                        <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Connected</span>
                      </div>
                      <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 transition-transform" :class="openGlpi ? '' : '-rotate-90'"></i>
                    </button>
                    <div x-show="openGlpi" class="mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span class="text-[10px] text-slate-400 uppercase font-semibold">Agent Version:</span>
                        <div class="font-mono text-slate-700">GLPI Agent v10.0.12</div>
                      </div>
                      <div>
                        <span class="text-[10px] text-slate-400 uppercase font-semibold">BIOS UUID:</span>
                        <div class="font-mono text-slate-700">4C4C4544-0032-4A10-8034</div>
                      </div>
                      <div>
                        <span class="text-[10px] text-slate-400 uppercase font-semibold">Motherboard:</span>
                        <div class="font-mono text-slate-700">OEM 09V1NC A01</div>
                      </div>
                      <div>
                        <span class="text-[10px] text-slate-400 uppercase font-semibold">Last Contact:</span>
                        <div class="text-slate-700">12 minutes ago</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ===================================== -->
                <!-- TAB 5: NETWORK & CLOUD                -->
                <!-- ===================================== -->
                <div x-show="activeFormTab === 'network'" class="space-y-4">
                  <!-- Network Identity -->
                  <div>
                    <div class="border-b border-slate-200 pb-1 mb-2.5 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <i data-lucide="network" class="w-3.5 h-3.5 text-slate-500"></i>
                      <span>Network Identity</span>
                    </div>
                    <div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Hostname</label>
                        <input type="text" x-model="currentRecord.hostname" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">FQDN</label>
                        <input type="text" value="blr-lap-05.corp.proficientnow.com" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Primary IP</label>
                        <input type="text" x-model="currentRecord.primary_ip" @input="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">System UUID / machine-id</label>
                        <input type="text" value="b6f3a812-4c21-49e0-88f1-90a1b2c3d4e5" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                      <div class="col-span-2">
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">IP Addresses (All Interfaces)</label>
                        <input type="text" value="10.142.12.105 (eth0), 192.168.1.44 (wlan0), 172.17.0.1 (docker0)" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                      <div class="col-span-2">
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">MAC Addresses (All Interfaces)</label>
                        <input type="text" value="00:1A:2B:3C:4D:5E (Ethernet), A4:83:E7:22:91:0F (Wi-Fi 6E)" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                    </div>
                  </div>

                  <!-- Cloud Identity -->
                  <div>
                    <div class="border-b border-slate-200 pb-1 mb-2.5 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <i data-lucide="cloud" class="w-3.5 h-3.5 text-slate-500"></i>
                      <span>Cloud Identity</span>
                    </div>
                    <div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-3">
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Cloud Provider</label>
                        <select x-model="currentRecord.cloud_provider" @change="isFormDirty = true" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                          <option value="On-Premise">On-Premise (DC)</option>
                          <option value="AWS">Amazon Web Services</option>
                          <option value="Azure">Microsoft Azure</option>
                          <option value="GCP">Google Cloud Platform</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Cloud Account ID</label>
                        <input type="text" value="acc-754261016991" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Cloud Resource ID / ARN</label>
                        <input type="text" value="arn:aws:ec2:ap-south-1:754261016991:instance/i-098abc" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] font-mono bg-white">
                      </div>
                      <div>
                        <label class="block text-[11px] font-semibold text-slate-700 mb-1">Cloud Region</label>
                        <input type="text" value="ap-south-1 (Mumbai)" class="w-full h-8 px-2.5 py-1 rounded border border-slate-300 text-[13px] bg-white">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ===================================== -->
                <!-- TAB 6: RELATIONSHIPS                  -->
                <!-- ===================================== -->
                <div x-show="activeFormTab === 'relationships'" class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="font-bold text-xs text-slate-800">Connected Configuration Items (CIs)</span>
                      <p class="text-[11px] text-slate-400">Dependency tree and upstream/downstream connections</p>
                    </div>
                    <button @click="addRelationshipRow()" class="px-2.5 py-1 bg-navy-700 hover:bg-navy-800 text-white rounded text-xs font-semibold flex items-center gap-1 shadow-2xs">
                      <i data-lucide="plus" class="w-3 h-3"></i>
                      <span>Add Connected CI</span>
                    </button>
                  </div>
                  <div class="border border-slate-200 rounded-lg overflow-hidden">
                    <table class="w-full text-xs">
                      <thead class="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th class="px-3 py-2 text-left font-bold text-slate-700">Relationship</th>
                          <th class="px-3 py-2 text-left font-bold text-slate-700">Target CI</th>
                          <th class="px-3 py-2 text-left font-bold text-slate-700">Port / Interface</th>
                          <th class="px-3 py-2 text-left font-bold text-slate-700">Status</th>
                          <th class="px-3 py-2 text-right font-bold text-slate-700">Action</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100">
                        <template x-for="(rel, idx) in currentRecord.relationships" :key="idx">
                          <tr>
                            <td class="px-3 py-2 font-medium text-slate-800" x-text="rel.relation"></td>
                            <td class="px-3 py-2 font-mono text-indigo-700 font-bold" x-text="rel.targetCi"></td>
                            <td class="px-3 py-2 text-slate-600" x-text="rel.via"></td>
                            <td class="px-3 py-2">
                              <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">Active</span>
                            </td>
                            <td class="px-3 py-2 text-right">
                              <button @click="removeRelationship(idx)" class="text-rose-600 hover:text-rose-800 text-[11px] font-semibold">Disconnect</button>
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN (30%): Sticky Comments & Activity Trail -->
          <div class="sticky top-16 space-y-4">
            
            <!-- Comments Card -->
            <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <i data-lucide="message-square" class="w-3.5 h-3.5 text-navy-600"></i>
                  <span>Record Comments</span>
                </h3>
                <span class="text-[10px] text-slate-400 font-mono">Real-time</span>
              </div>
              <div class="space-y-2">
                <textarea x-model="newCommentText" @keydown.ctrl.enter="addComment()" placeholder="Add a note or comment on this record (Ctrl+Enter to post)..." rows="2" class="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-navy-600 bg-slate-50/50"></textarea>
                <div class="flex justify-end">
                  <button @click="addComment()" class="px-3 py-1 bg-navy-700 hover:bg-navy-800 text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-2xs transition-colors">
                    <i data-lucide="send" class="w-3 h-3"></i>
                    <span>Post Comment</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Activity Trail Card (Internal Scroll & 5 Seeded Realistic Entries) -->
            <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <div class="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <h3 class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <i data-lucide="history" class="w-3.5 h-3.5 text-slate-500"></i>
                  <span>Activity Trail</span>
                </h3>
                <span class="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono font-bold" x-text="(currentRecord?.activities || []).length + ' logs'"></span>
              </div>
              <div class="max-h-72 overflow-y-auto pr-1 space-y-2.5 text-xs">
                <template x-for="(act, idx) in (currentRecord?.activities || [])" :key="idx">
                  <div class="border-l-2 border-navy-700 pl-2.5 py-0.5">
                    <div class="font-medium text-slate-800 text-[11px]" x-text="act.text"></div>
                    <div class="text-[10px] text-slate-400 mt-0.5" x-text="act.time"></div>
                  </div>
                </template>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- ======================================================== -->
      <!-- VIEW D: REUSABLE REPORT PAGE TEMPLATE (PART 2)           -->
      <!-- Used by Asset Events, Warranty Expiring, Licences, etc. -->
      <!-- ======================================================== -->
      <section x-show="currentView === 'report' && currentReport" class="p-4 space-y-4 flex-1 flex flex-col max-w-[1800px] w-full">
        
        <!-- Report Header Bar -->
        <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base font-bold text-slate-900" x-text="currentReport?.title"></h1>
              <template x-if="currentReport?.docType">
                <span class="font-mono text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md font-bold" x-text="'DocType: ' + currentReport.docType"></span>
              </template>
              <span class="text-slate-400 text-xs">&bull;</span>
              <span class="text-slate-600 text-xs font-mono font-bold" x-text="filteredReportRows.length + ' rows'"></span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5" x-text="currentReport?.description"></p>
          </div>
          <div class="flex items-center gap-2">
            <button @click="refreshReport()" class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="Refresh register">
              <i data-lucide="rotate-cw" class="w-4 h-4"></i>
            </button>
            <button @click="exportReport()" class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1.5">
              <i data-lucide="download" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>Export CSV</span>
            </button>
            <button @click="showToast('Filters configured for ' + currentReport?.title, 'info')" class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center gap-1.5">
              <i data-lucide="filter" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>Filters</span>
            </button>
          </div>
        </div>

        <!-- 3-4 KPI Cards Row -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <template x-for="(kpi, kIdx) in (currentReport?.kpis || [])" :key="kIdx">
            <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
              <div class="text-[10px] uppercase font-bold text-slate-500" x-text="kpi.label"></div>
              <div class="text-2xl font-bold text-slate-900 tabular-nums mt-1" x-text="kpi.value"></div>
              <div class="text-[10px] text-slate-400 mt-0.5" x-text="kpi.change"></div>
            </div>
          </template>
        </div>

        <!-- Sub-filters strip (if present, e.g. for Exceptions) -->
        <template x-if="currentReport?.subFilters">
          <div class="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
            <span class="text-[11px] font-bold text-slate-500 px-2">Filter:</span>
            <template x-for="sub in currentReport.subFilters" :key="sub">
              <button @click="activeSubFilter = sub" :class="activeSubFilter === sub ? 'bg-navy-700 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'" class="px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap" x-text="sub"></button>
            </template>
          </div>
        </template>

        <!-- Compact Data Table Card -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-xs flex-1 flex flex-col overflow-hidden">
          
          <!-- Search & Controls Bar -->
          <div class="p-3 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50">
            <div class="relative w-64 max-w-sm">
              <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"></i>
              <input type="text" x-model="reportSearchQuery" placeholder="Filter rows..." class="w-full pl-8 pr-3 py-1 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-navy-600">
            </div>
            <div class="text-xs text-slate-500">
              Click any row to inspect detail drawer &bull; Click headers to sort
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto flex-1">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 select-none">
                <tr>
                  <template x-for="col in (currentReport?.columns || [])" :key="col.key">
                    <th @click="col.sortable ? sortReport(col.key) : null" :class="col.sortable ? 'cursor-pointer hover:bg-slate-100' : ''" class="px-3 py-2.5 font-bold whitespace-nowrap text-slate-700">
                      <div class="flex items-center gap-1.5">
                        <span x-text="col.label"></span>
                        <template x-if="col.sortable && reportSortColumn === col.key">
                          <span class="text-indigo-600 font-bold" x-text="reportSortAsc ? '↑' : '↓'"></span>
                        </template>
                      </div>
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <template x-for="(row, rIdx) in filteredReportRows" :key="rIdx">
                  <tr @click="openReportRowDetail(row)" class="hover:bg-slate-50/80 cursor-pointer transition-colors">
                    <template x-for="col in (currentReport?.columns || [])" :key="col.key">
                      <td class="px-3 py-2 whitespace-nowrap">
                        <template x-if="col.key === 'status' || col.key === 'state' || col.key === 'risk' || col.key === 'severity'">
                          <span :class="getStatusPillClass(row[col.key])" class="px-2 py-0.5 rounded-full text-[10px] font-bold" x-text="row[col.key]"></span>
                        </template>
                        <template x-if="col.key !== 'status' && col.key !== 'state' && col.key !== 'risk' && col.key !== 'severity'">
                          <span :class="col.key.includes('id') || col.key.includes('serial') ? 'font-mono text-navy-900 font-semibold' : 'text-slate-700'" x-text="row[col.key] || '—'"></span>
                        </template>
                      </td>
                    </template>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <div class="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div>Showing <strong x-text="filteredReportRows.length"></strong> of <strong x-text="(currentReport?.rows || []).length"></strong> rows</div>
            <div class="font-mono text-[11px] text-slate-400">ProficientNow ERP &bull; Real-time</div>
          </div>
        </div>

      </section>

      <!-- ======================================================== -->
      <!-- VIEW E: IT SYNC SETTINGS (DEDICATED INTERACTIVE VIEW)    -->
      <!-- ======================================================== -->
      <section x-show="currentView === 'it-sync-settings'" class="p-6 max-w-5xl w-full mx-auto space-y-6">
        
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 class="text-base font-bold text-slate-900">IT Sync Settings &amp; Telemetry Connectors</h1>
            <p class="text-[11px] text-slate-500 mt-0.5">Manage directory sync, automated GLPI hardware discovery, and Intune mobile device management feeds.</p>
          </div>
          <button @click="syncAllNow()" class="px-4 py-2 rounded-lg bg-navy-700 hover:bg-navy-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors">
            <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            <span>Sync All Integrations Now</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <!-- Connector 1: GLPI Agent Discovery -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                    <i data-lucide="cpu" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-xs text-slate-900">GLPI Agent Discovery</h3>
                    <span class="text-[10px] text-slate-400 font-mono">v10.0.12 Protocol</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Active</span>
              </div>
              <p class="text-slate-600 text-xs mb-3">Scans endpoints and server network interfaces, hardware specs, and software inventories across Bangalore &amp; Mumbai campuses.</p>
              <div class="text-[11px] text-slate-500 space-y-1 mb-4 font-mono">
                <div>Last Synchronized: <span class="text-slate-800 font-semibold">12 minutes ago</span></div>
                <div>Sync Cadence: <span class="text-slate-800 font-semibold">Every 4 Hours</span></div>
                <div>Discovered Assets: <span class="text-slate-800 font-semibold">516 Endpoints</span></div>
              </div>
            </div>
            <button @click="syncConnector('GLPI Agent Discovery')" class="w-full py-1.5 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Sync GLPI Now</span>
            </button>
          </div>

          <!-- Connector 2: Microsoft Entra ID -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="p-2 rounded-lg bg-blue-50 text-blue-700">
                    <i data-lucide="users" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-xs text-slate-900">Microsoft Entra ID (Azure AD)</h3>
                    <span class="text-[10px] text-slate-400 font-mono">Graph API v1.0</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Synchronized</span>
              </div>
              <p class="text-slate-600 text-xs mb-3">Synchronizes user accounts, managers, department hierarchies, and single sign-on activity logs into CMDB custodians.</p>
              <div class="text-[11px] text-slate-500 space-y-1 mb-4 font-mono">
                <div>Last Synchronized: <span class="text-slate-800 font-semibold">Today at 08:30 AM</span></div>
                <div>Sync Cadence: <span class="text-slate-800 font-semibold">Real-time Webhook</span></div>
                <div>Synced Accounts: <span class="text-slate-800 font-semibold">2,410 Users (118 Groups)</span></div>
              </div>
            </div>
            <button @click="syncConnector('Microsoft Entra ID')" class="w-full py-1.5 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Sync Entra ID Now</span>
            </button>
          </div>

          <!-- Connector 3: Microsoft Intune MDM -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="p-2 rounded-lg bg-teal-50 text-teal-700">
                    <i data-lucide="shield-check" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-xs text-slate-900">Microsoft Intune MDM</h3>
                    <span class="text-[10px] text-slate-400 font-mono">Endpoint Manager</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Active</span>
              </div>
              <p class="text-slate-600 text-xs mb-3">Pulls OS patch compliance, encryption status, and hardware health metrics for all corporate laptops and mobile devices.</p>
              <div class="text-[11px] text-slate-500 space-y-1 mb-4 font-mono">
                <div>Last Synchronized: <span class="text-slate-800 font-semibold">1 hour ago</span></div>
                <div>Sync Cadence: <span class="text-slate-800 font-semibold">Hourly Polling</span></div>
                <div>Managed Devices: <span class="text-slate-800 font-semibold">492 Managed Endpoints</span></div>
              </div>
            </div>
            <button @click="syncConnector('Microsoft Intune MDM')" class="w-full py-1.5 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Sync Intune Now</span>
            </button>
          </div>

          <!-- Connector 4: ERPNext Financials -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="p-2 rounded-lg bg-purple-50 text-purple-700">
                    <i data-lucide="receipt" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-xs text-slate-900">ERPNext Accounts &amp; Assets</h3>
                    <span class="text-[10px] text-slate-400 font-mono">v15 Ledger Bridge</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Active</span>
              </div>
              <p class="text-slate-600 text-xs mb-3">Bi-directional synchronization of purchase invoices, depreciation schedules, and asset capitalization records.</p>
              <div class="text-[11px] text-slate-500 space-y-1 mb-4 font-mono">
                <div>Last Synchronized: <span class="text-slate-800 font-semibold">Yesterday, 11:45 PM</span></div>
                <div>Sync Cadence: <span class="text-slate-800 font-semibold">Daily Batch</span></div>
                <div>Linked Invoices: <span class="text-slate-800 font-semibold">312 Purchase Orders</span></div>
              </div>
            </div>
            <button @click="syncConnector('ERPNext Accounts')" class="w-full py-1.5 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Sync ERPNext Ledger</span>
            </button>
          </div>

        </div>

      </section>

      </section>

    </main>
  </div>

  <!-- ======================================================== -->
  <!-- HERO FEATURE #1: SLASHBUCKET COLUMNS SLIDE-OVER DRAWER   -->
  <!-- ======================================================== -->
  <div x-show="columnsDrawerOpen" x-cloak class="fixed inset-0 z-50 overflow-hidden" @keydown.escape.window="columnsDrawerOpen = false">
    <div class="fixed inset-0 bg-navy-950/70 backdrop-blur-xs transition-opacity" @click="columnsDrawerOpen = false"></div>
    <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
      <div class="w-screen max-w-2xl bg-white shadow-2xl flex flex-col justify-between select-none">
        <!-- Header -->
        <div class="p-4 bg-navy-900 text-white border-b-2 border-navy-600 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="p-2 rounded bg-indigo-600 text-white shadow-xs">
              <i data-lucide="columns-3" class="w-5 h-5"></i>
            </div>
            <div>
              <h2 class="text-sm font-bold text-white">Personalize List Columns (ServiceNow Slashbucket)</h2>
              <p class="text-[11px] text-slate-300">Dual-list selector: Click to select, move with &gt; &lt; or double-click, and reorder.</p>
            </div>
          </div>
          <button @click="columnsDrawerOpen = false" class="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="p-5 flex-1 flex flex-col space-y-4 overflow-y-auto">
          <div class="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 text-[11px] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="info" class="w-4 h-4 text-indigo-600 shrink-0"></i>
              <span>Click items to highlight in Indigo, or double-click to transfer immediately. <strong>Asset Name</strong> is locked.</span>
            </div>
            <button @click="resetColumnsToDefault()" class="text-indigo-700 hover:underline font-bold">Reset Defaults</button>
          </div>

          <div class="grid grid-cols-12 gap-2 flex-1 min-h-[360px]">
            <!-- Available Fields -->
            <div class="col-span-5 flex flex-col border border-slate-200 rounded-lg p-2.5 bg-slate-50 shadow-xs">
              <div class="font-bold text-slate-800 text-xs mb-1 flex items-center justify-between">
                <span>Available Fields</span>
                <span class="font-mono text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-bold" x-text="filteredAvailableColumns.length"></span>
              </div>
              <p class="text-[10px] text-slate-500 mb-1.5">Click to select (or double-click to move)</p>
              <input type="text" x-model="columnSearchQuery" placeholder="Filter fields..." class="w-full px-2 py-1 mb-2 rounded border border-slate-200 text-xs bg-white">
              <div class="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
                <template x-for="field in filteredAvailableColumns" :key="field.key">
                  <div @click="toggleSelectAvailable(field.key)" 
                       @dblclick="moveColumnRight(field.key)" 
                       :class="selectedInAvailable.includes(field.key) 
                         ? 'bg-indigo-600 text-white font-bold border-indigo-700 shadow-xs ring-2 ring-indigo-400/50' 
                         : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700'" 
                       class="px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all select-none">
                    <div class="flex items-center gap-2">
                      <div :class="selectedInAvailable.includes(field.key) ? 'bg-white text-indigo-700' : 'border border-slate-300 bg-slate-50'" class="w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold">
                        <span x-show="selectedInAvailable.includes(field.key)">✓</span>
                      </div>
                      <span x-text="field.label"></span>
                    </div>
                    <button @click.stop="moveColumnRight(field.key)" :class="selectedInAvailable.includes(field.key) ? 'text-white/80 hover:text-white' : 'text-slate-400 hover:text-indigo-600'" class="p-0.5 text-[11px]" title="Move right">
                      &rarr;
                    </button>
                  </div>
                </template>
              </div>
            </div>

            <!-- Center Controls (ServiceNow Style > < >> <<) -->
            <div class="col-span-2 flex flex-col items-center justify-center gap-2">
              <button @click="moveSelectedRight()" class="w-9 h-9 rounded bg-white hover:bg-indigo-50 border border-slate-300 font-bold shadow-xs hover:border-indigo-500 text-indigo-700 disabled:opacity-40" :disabled="selectedInAvailable.length === 0" title="Add Selected">&gt;</button>
              <button @click="moveSelectedLeft()" class="w-9 h-9 rounded bg-white hover:bg-indigo-50 border border-slate-300 font-bold shadow-xs hover:border-indigo-500 text-indigo-700 disabled:opacity-40" :disabled="selectedInChosen.length === 0" title="Remove Selected">&lt;</button>
              <div class="h-1"></div>
              <button @click="moveAllRight()" class="w-9 h-9 rounded bg-white hover:bg-indigo-50 border border-slate-300 font-bold shadow-xs hover:border-indigo-500 text-indigo-700" title="Add All">&gt;&gt;</button>
              <button @click="moveAllLeft()" class="w-9 h-9 rounded bg-white hover:bg-indigo-50 border border-slate-300 font-bold shadow-xs hover:border-indigo-500 text-indigo-700" title="Remove All">&lt;&lt;</button>
            </div>

            <!-- Selected Display Columns -->
            <div class="col-span-4 flex flex-col border border-slate-200 rounded-lg p-2.5 bg-slate-50 shadow-xs">
              <div class="font-bold text-slate-800 text-xs mb-1 flex items-center justify-between">
                <span>Selected Display Columns</span>
                <span class="font-mono text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-bold" x-text="draftSelectedColumns.length"></span>
              </div>
              <p class="text-[10px] text-slate-500 mb-1.5">Display order (click to select for reordering)</p>
              <div class="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
                <template x-for="(colKey, index) in draftSelectedColumns" :key="colKey">
                  <div @click="toggleSelectChosen(colKey)" 
                       @dblclick="colKey !== 'asset_name' ? moveColumnLeft(colKey) : null" 
                       :class="selectedInChosen.includes(colKey) 
                         ? 'bg-indigo-600 text-white font-bold border-indigo-700 shadow-xs ring-2 ring-indigo-400/50' 
                         : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'" 
                       class="px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all select-none">
                    <div class="flex items-center gap-2 truncate">
                      <div :class="selectedInChosen.includes(colKey) ? 'bg-white text-indigo-700' : 'border border-slate-300 bg-slate-50 text-slate-600'" class="w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold">
                        <span x-text="selectedInChosen.includes(colKey) ? '✓' : (index + 1)"></span>
                      </div>
                      <span x-text="getColumnLabel(colKey)"></span>
                    </div>
                    <template x-if="colKey === 'asset_name'">
                      <span class="text-[9px] px-1 py-0.2 rounded bg-slate-200 text-slate-700 font-bold">🔒 Locked</span>
                    </template>
                    <template x-if="colKey !== 'asset_name'">
                      <button @click.stop="moveColumnLeft(colKey)" :class="selectedInChosen.includes(colKey) ? 'text-white/80 hover:text-white' : 'text-slate-400 hover:text-rose-600'" class="p-0.5 text-[11px]" title="Remove">
                        ✕
                      </button>
                    </template>
                  </div>
                </template>
              </div>
            </div>

            <!-- Reorder Controls -->
            <div class="col-span-1 flex flex-col items-center justify-center gap-1.5">
              <button @click="moveColumnToTop()" class="w-8 h-8 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100" title="Move to Top">&uArr;</button>
              <button @click="moveColumnUp()" class="w-8 h-8 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100" title="Move Up">&uarr;</button>
              <button @click="moveColumnDown()" class="w-8 h-8 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100" title="Move Down">&darr;</button>
              <button @click="moveColumnToBottom()" class="w-8 h-8 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100" title="Move to Bottom">&dArr;</button>
            </div>
          </div>

          <!-- Preview -->
          <div class="p-2.5 rounded-lg bg-slate-100 border border-slate-200">
            <span class="text-[10px] uppercase font-bold text-slate-500">Live Table Columns Preview:</span>
            <div class="flex gap-1 overflow-x-auto mt-1 pb-1">
              <template x-for="c in draftSelectedColumns" :key="c">
                <span class="px-2 py-0.5 rounded bg-white border border-slate-300 text-[11px] whitespace-nowrap shadow-2xs" x-text="getColumnLabel(c)"></span>
              </template>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button @click="resetColumnsToDefault()" class="px-3 py-1.5 rounded border border-slate-300 bg-white text-slate-700 font-medium text-xs">Reset</button>
          <div class="flex gap-2">
            <button @click="columnsDrawerOpen = false" class="px-3 py-1.5 rounded border border-slate-300 bg-white text-slate-700 font-medium text-xs">Cancel</button>
            <button @click="applyColumnsCustomization()" class="px-4 py-1.5 rounded bg-navy-700 hover:bg-navy-800 text-white font-bold text-xs flex items-center gap-1">
              <i data-lucide="check" class="w-3.5 h-3.5"></i>
              <span>Apply Columns</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- HERO FEATURE #1B: SLASHBUCKET FILTER MODAL               -->
  <!-- ======================================================== -->
  <div x-show="filterModalOpen" x-cloak class="fixed inset-0 z-50 flex items-center justify-center p-4" @keydown.escape.window="filterModalOpen = false">
    <div class="fixed inset-0 bg-navy-950/70 backdrop-blur-xs" @click="filterModalOpen = false"></div>
    <div class="relative bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl z-10 flex flex-col select-none">
      <div class="p-3.5 bg-navy-900 text-white border-b-2 border-navy-600 flex items-center justify-between">
        <h3 class="font-bold text-xs" x-text="'Multi-Value Slashbucket Filter: ' + filterModalTitle"></h3>
        <button @click="filterModalOpen = false" class="p-1 text-slate-300"><i data-lucide="x" class="w-4 h-4"></i></button>
      </div>

      <div class="p-4 grid grid-cols-12 gap-2">
        <!-- Left: Available Values -->
        <div class="col-span-5 border border-slate-200 rounded-lg p-2.5 bg-slate-50 h-64 flex flex-col shadow-xs">
          <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-200">
            <span class="font-bold text-xs text-slate-800">Available Values</span>
            <span class="font-mono text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-bold" x-text="filterModalAvailable.length"></span>
          </div>
          <p class="text-[10px] text-slate-500 mb-1.5">Click to select (or double-click to move)</p>
          <div class="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
            <template x-for="val in filterModalAvailable" :key="val">
              <div @click="toggleSelectFilterAvailable(val)" 
                   @dblclick="moveFilterValueRight(val)" 
                   :class="filterModalSelectedAvail.includes(val) 
                     ? 'bg-indigo-600 text-white font-bold border-indigo-700 shadow-xs ring-2 ring-indigo-400/50' 
                     : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'" 
                   class="px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all select-none">
                <div class="flex items-center gap-2">
                  <div :class="filterModalSelectedAvail.includes(val) ? 'bg-white text-indigo-700' : 'border border-slate-300 bg-slate-50'" class="w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold">
                    <span x-show="filterModalSelectedAvail.includes(val)">✓</span>
                  </div>
                  <span x-text="val"></span>
                </div>
                <button @click.stop="moveFilterValueRight(val)" :class="filterModalSelectedAvail.includes(val) ? 'text-white/80 hover:text-white' : 'text-slate-400 hover:text-indigo-600'" class="p-0.5 text-[11px]" title="Move to Selected">
                  &rarr;
                </button>
              </div>
            </template>
          </div>
        </div>

        <!-- Center Controls -->
        <div class="col-span-2 flex flex-col items-center justify-center gap-2">
          <button @click="moveFilterValuesRight()" class="w-8 h-8 rounded bg-white hover:bg-indigo-50 border border-slate-300 font-bold shadow-xs text-indigo-700 disabled:opacity-40" :disabled="filterModalSelectedAvail.length === 0">&gt;</button>
          <button @click="moveFilterValuesLeft()" class="w-8 h-8 rounded bg-white hover:bg-indigo-50 border border-slate-300 font-bold shadow-xs text-indigo-700 disabled:opacity-40" :disabled="filterModalSelectedChosen.length === 0">&lt;</button>
        </div>

        <!-- Right: Selected Values -->
        <div class="col-span-5 border border-slate-200 rounded-lg p-2.5 bg-slate-50 h-64 flex flex-col shadow-xs">
          <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-200">
            <span class="font-bold text-xs text-slate-800">Selected Values</span>
            <span class="font-mono text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-bold" x-text="filterModalSelectedDraft.length"></span>
          </div>
          <p class="text-[10px] text-slate-500 mb-1.5">Values actively filtering table</p>
          <div class="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
            <template x-for="val in filterModalSelectedDraft" :key="val">
              <div @click="toggleSelectFilterChosen(val)" 
                   @dblclick="moveFilterValueLeft(val)" 
                   :class="filterModalSelectedChosen.includes(val) 
                     ? 'bg-indigo-600 text-white font-bold border-indigo-700 shadow-xs ring-2 ring-indigo-400/50' 
                     : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'" 
                   class="px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all select-none">
                <div class="flex items-center gap-2">
                  <div :class="filterModalSelectedChosen.includes(val) ? 'bg-white text-indigo-700' : 'border border-slate-300 bg-slate-50 text-slate-600'" class="w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold">
                    <span x-show="filterModalSelectedChosen.includes(val)">✓</span>
                  </div>
                  <span x-text="val"></span>
                </div>
                <button @click.stop="moveFilterValueLeft(val)" :class="filterModalSelectedChosen.includes(val) ? 'text-white/80 hover:text-white' : 'text-slate-400 hover:text-rose-600'" class="p-0.5 text-[11px]" title="Remove value">
                  ✕
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
        <button @click="filterModalOpen = false" class="px-3 py-1.5 rounded border border-slate-300 bg-white text-slate-700 text-xs">Cancel</button>
        <button @click="applyFilterModal()" class="px-4 py-1.5 rounded bg-navy-700 text-white font-bold text-xs">Apply Filter</button>
      </div>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- SLIDEOVER DRAWER: REPORT ROW DETAILS                     -->
  <!-- ======================================================== -->
  <div x-show="selectedReportRow !== null" x-cloak class="fixed inset-0 z-50 overflow-hidden" @keydown.escape.window="selectedReportRow = null">
    <div class="fixed inset-0 bg-navy-950/70 backdrop-blur-xs transition-opacity" @click="selectedReportRow = null"></div>
    <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
      <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between select-none">
        
        <!-- Drawer Header -->
        <div class="p-4 bg-navy-900 text-white border-b-2 border-navy-600 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="p-2 rounded bg-indigo-600 text-white shadow-xs">
              <i data-lucide="file-text" class="w-5 h-5"></i>
            </div>
            <div>
              <h2 class="text-sm font-bold text-white">Record Inspector</h2>
              <p class="text-[11px] text-slate-300" x-text="currentReport?.title || 'Report Detail'"></p>
            </div>
          </div>
          <button @click="selectedReportRow = null" class="p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Drawer Body -->
        <div class="p-5 flex-1 overflow-y-auto space-y-4">
          <template x-if="selectedReportRow">
            <div class="space-y-3">
              <div class="p-3 rounded-lg bg-indigo-50 border border-indigo-200">
                <span class="text-[10px] uppercase font-bold text-indigo-700">Primary Key / Reference</span>
                <div class="font-mono font-bold text-sm text-indigo-950 mt-0.5" x-text="selectedReportRow.id || selectedReportRow.pkg_id || selectedReportRow.alert_id || selectedReportRow.ticket_id || selectedReportRow.tag || selectedReportRow.upn || selectedReportRow.service || selectedReportRow.product || 'Record'"></div>
              </div>

              <div class="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden">
                <template x-for="(val, key) in selectedReportRow" :key="key">
                  <div class="p-2.5 flex items-start justify-between text-xs">
                    <span class="font-semibold text-slate-500 uppercase text-[10px] tracking-wide" x-text="key.replace('_', ' ')"></span>
                    <span class="font-mono text-slate-900 text-right max-w-[220px] break-words" x-text="val"></span>
                  </div>
                </template>
              </div>

              <div class="pt-2 space-y-2">
                <button @click="showToast('Record ID copied to clipboard', 'success')" class="w-full py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center justify-center gap-2">
                  <i data-lucide="copy" class="w-3.5 h-3.5 text-slate-500"></i>
                  <span>Copy Identifier</span>
                </button>
                <button @click="showToast('Flagged for priority review', 'info')" class="w-full py-2 px-3 rounded-lg bg-navy-700 hover:bg-navy-800 text-white font-bold text-xs flex items-center justify-center gap-2">
                  <i data-lucide="flag" class="w-3.5 h-3.5"></i>
                  <span>Flag for Audit Review</span>
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- Drawer Footer -->
        <div class="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button @click="selectedReportRow = null" class="px-4 py-1.5 rounded bg-white border border-slate-300 font-semibold text-xs text-slate-700">Close</button>
        </div>

      </div>
    </div>
  </div>

  <!-- COMING SOON MODAL (For Non-IT Launcher Apps) -->
  <div x-show="comingSoonModalOpen" x-cloak class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-navy-950/70 backdrop-blur-xs" @click="comingSoonModalOpen = false"></div>
    <div class="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 text-center z-10 space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto border border-indigo-100">
        <i data-lucide="clock" class="w-6 h-6"></i>
      </div>
      <div>
        <h3 class="text-base font-bold text-slate-900" x-text="comingSoonModuleName + ' Workspace'"></h3>
        <p class="text-slate-500 text-xs mt-1.5 leading-relaxed">
          The <span class="font-bold text-slate-700" x-text="comingSoonModuleName"></span> module is scheduled for development in the enterprise roadmap. The <strong>IT Workspace (ERP)</strong> is fully live and interactive!
        </p>
      </div>
      <div class="flex gap-2 justify-center pt-2">
        <button @click="comingSoonModalOpen = false" class="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs">
          Close
        </button>
        <button @click="comingSoonModalOpen = false; setView('it-dashboard')" class="px-4 py-2 rounded-lg bg-navy-700 hover:bg-navy-800 text-white font-bold text-xs shadow-xs">
          Open IT Workspace &rarr;
        </button>
      </div>
    </div>
  </div>

  <!-- COMMAND PALETTE (Ctrl+K) -->
  <div x-show="cmdPaletteOpen" x-cloak class="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4" @keydown.escape.window="cmdPaletteOpen = false">
    <div class="fixed inset-0 bg-navy-950/70 backdrop-blur-xs" @click="cmdPaletteOpen = false"></div>
    <div class="relative bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full z-10 overflow-hidden select-none">
      <div class="p-3 border-b border-slate-200 flex items-center gap-2.5">
        <i data-lucide="search" class="w-4 h-4 text-slate-400"></i>
        <input type="text" x-model="cmdSearchQuery" placeholder="Search commands, CMDB registers, reports, settings..." class="w-full text-xs outline-none bg-transparent" autofocus>
        <kbd class="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-400">ESC</kbd>
      </div>
      <div class="p-2 max-h-80 overflow-y-auto space-y-1 text-xs">
        <button @click="setView('it-dashboard'); cmdPaletteOpen = false" class="w-full px-2.5 py-1.5 rounded hover:bg-navy-50 text-left flex items-center justify-between font-bold text-navy-900">
          <span>IT / ERP Workspace Dashboard</span>
          <span class="text-[10px] text-slate-400 font-mono">/desk/it</span>
        </button>
        <button @click="setView('it-list'); cmdPaletteOpen = false" class="w-full px-2.5 py-1.5 rounded hover:bg-indigo-50 text-left flex items-center justify-between font-bold text-indigo-900">
          <span>IT Assets (CMDB)</span>
          <span class="text-[10px] text-indigo-600 font-mono">DocType: IT Asset</span>
        </button>
        <button @click="openColumnsDrawer(); cmdPaletteOpen = false" class="w-full px-2.5 py-1.5 rounded hover:bg-slate-100 text-left flex items-center justify-between font-medium text-slate-700">
          <span>Open Columns (Slashbucket) Drawer</span>
          <span class="text-[10px] text-slate-400 font-mono">Drawer</span>
        </button>
        <button @click="openReport('asset-events'); cmdPaletteOpen = false" class="w-full px-2.5 py-1.5 rounded hover:bg-slate-100 text-left flex items-center justify-between text-slate-700">
          <span>Asset Events Register</span>
          <span class="text-[10px] text-slate-400 font-mono">DocType: IT Asset Event</span>
        </button>
        <button @click="openReport('software-licences'); cmdPaletteOpen = false" class="w-full px-2.5 py-1.5 rounded hover:bg-slate-100 text-left flex items-center justify-between text-slate-700">
          <span>Software Licences Register</span>
          <span class="text-[10px] text-slate-400 font-mono">DocType: Software License</span>
        </button>
        <button @click="setView('it-sync-settings'); cmdPaletteOpen = false" class="w-full px-2.5 py-1.5 rounded hover:bg-slate-100 text-left flex items-center justify-between text-slate-700">
          <span>IT Sync Settings &amp; Telemetry</span>
          <span class="text-[10px] text-slate-400 font-mono">Connectors</span>
        </button>

        <button @click="setView('launcher'); cmdPaletteOpen = false" class="w-full px-2.5 py-1.5 rounded hover:bg-slate-100 text-left flex items-center justify-between text-slate-600">
          <span>Workspace Launcher</span>
          <span class="text-[10px] text-slate-400 font-mono">Home</span>
        </button>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATIONS -->
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
    <template x-for="t in toasts" :key="t.id">
      <div class="pointer-events-auto bg-navy-950 text-white px-3.5 py-2.5 rounded-lg shadow-xl border border-navy-700 flex items-center gap-2 text-xs">
        <i data-lucide="info" class="w-4 h-4 text-navy-400"></i>
        <span x-text="t.message"></span>
      </div>
    </template>
  </div>

  <!-- ALPINE JS LOGIC -->
  <script>
    const reportConfigsData = ${JSON.stringify(reportConfigs)};

    function appData() {
      return {
        currentView: 'launcher',
        sidebarCollapsed: false,
        cmdPaletteOpen: false,
        cmdSearchQuery: '',
        columnsDrawerOpen: false,
        filterModalOpen: false,
        filterModalTarget: '',
        filterModalTitle: '',
        filterModalAvailable: [],
        filterModalSelectedDraft: [],
        filterModalSelectedAvail: [],
        filterModalSelectedChosen: [],
        comingSoonModalOpen: false,
        comingSoonModuleName: '',
        isFormDirty: false,
        newCommentText: '',
        activeFormTab: 'identity',
        currentPage: 1,
        pageSize: 20,
        selectedRowIds: [],
        isColumnsCustomized: false,

        // Reports state
        reportConfigs: reportConfigsData,
        currentReportKey: '',
        reportSearchQuery: '',
        reportSortColumn: '',
        reportSortAsc: true,
        selectedReportRow: null,
        activeSubFilter: 'All',

        allFields: [
          { key: 'asset_name', label: 'Asset Name (Locked)', locked: true },
          { key: 'name', label: 'ID (DocName)' },
          { key: 'asset_type', label: 'Asset Type' },
          { key: 'assigned_to', label: 'Assigned To (Entra UPN)' },
          { key: 'assigned_to_source', label: 'Assigned To Source' },
          { key: 'compliance', label: 'Compliance' },
          { key: 'lifecycle_review', label: 'Lifecycle Review' },
          { key: 'lifecycle_state', label: 'Lifecycle State' },
          { key: 'serial_no', label: 'Serial Number' },
          { key: 'manufacturer', label: 'Manufacturer' },
          { key: 'model', label: 'Model' },
          { key: 'purchase_date', label: 'Purchase Date' },
          { key: 'purchase_cost', label: 'Purchase Cost (INR)' },
          { key: 'supplier', label: 'Supplier' },
          { key: 'warranty_expiry', label: 'Warranty Expiry' },
          { key: 'location', label: 'Location' },
          { key: 'owning_entity', label: 'Owning Entity' },
          { key: 'hostname', label: 'Hostname' },
          { key: 'primary_ip', label: 'Primary IP' },
        ],

        selectedDisplayColumns: [
          'asset_name',
          'asset_type',
          'assigned_to',
          'assigned_to_source',
          'compliance',
          'lifecycle_review',
          'lifecycle_state'
        ],

        draftSelectedColumns: [],
        selectedInAvailable: [],
        selectedInChosen: [],
        columnSearchQuery: '',

        formTabs: [
          { id: 'identity', label: 'Identity', count: 8 },
          { id: 'ownership', label: 'Ownership & Assignment', count: 6 },
          { id: 'commercial', label: 'Commercial & Financials', count: 6 },
          { id: 'audit', label: 'Audit & Discovery', count: 5 },
          { id: 'network', label: 'Network & Cloud', count: 7 },
          { id: 'relationships', label: 'Relationships', count: 1 },
        ],

        filters: {
          id: '',
          name: '',
          assetTypes: [],
          lifecycleStates: []
        },

        records: [],
        currentRecord: null,
        toasts: [],

        renderIcons() {
          try {
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
              window.lucide.createIcons();
            }
          } catch (e) {
            console.warn('Lucide icon notice:', e);
          }
        },

        initApp() {
          this.generateRecords();
          this.currentRecord = JSON.parse(JSON.stringify(this.records[0]));
          this.draftSelectedColumns = [...this.selectedDisplayColumns];
          this.$nextTick(() => {
            this.renderIcons();
          });
        },

        toggleSidebar() {
          this.sidebarCollapsed = !this.sidebarCollapsed;
          this.$nextTick(() => { this.renderIcons(); });
        },

        openComingSoon(moduleName) {
          this.comingSoonModuleName = moduleName;
          this.comingSoonModalOpen = true;
          this.$nextTick(() => { this.renderIcons(); });
        },

        setView(v) {
          this.currentView = v;
          this.$nextTick(() => { this.renderIcons(); });
        },

        openReport(key) {
          this.currentReportKey = key;
          this.reportSearchQuery = '';
          this.reportSortColumn = '';
          this.reportSortAsc = true;
          this.selectedReportRow = null;
          this.activeSubFilter = 'All';
          this.setView('report');
        },

        get currentReport() {
          return this.reportConfigs[this.currentReportKey] || null;
        },

        get filteredReportRows() {
          if (!this.currentReport) return [];
          let rows = [...(this.currentReport.rows || [])];

          // Sub-filter for Exceptions
          if (this.currentReport.subFilters && this.activeSubFilter !== 'All') {
            rows = rows.filter(r => r.category === this.activeSubFilter);
          }

          // Search query
          if (this.reportSearchQuery.trim()) {
            const q = this.reportSearchQuery.toLowerCase();
            rows = rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
          }

          // Sorting
          if (this.reportSortColumn) {
            rows.sort((a, b) => {
              const valA = a[this.reportSortColumn] || '';
              const valB = b[this.reportSortColumn] || '';
              if (valA < valB) return this.reportSortAsc ? -1 : 1;
              if (valA > valB) return this.reportSortAsc ? 1 : -1;
              return 0;
            });
          }

          return rows;
        },

        sortReport(colKey) {
          if (this.reportSortColumn === colKey) {
            this.reportSortAsc = !this.reportSortAsc;
          } else {
            this.reportSortColumn = colKey;
            this.reportSortAsc = true;
          }
        },

        openReportRowDetail(row) {
          this.selectedReportRow = row;
          this.$nextTick(() => { this.renderIcons(); });
        },

        refreshReport() {
          this.showToast('Refreshed ' + (this.currentReport?.title || 'Report') + ' data', 'info');
          this.$nextTick(() => { this.renderIcons(); });
        },

        exportReport() {
          this.showToast('Exported ' + (this.currentReport?.title || 'Report') + ' to CSV', 'success');
        },

        syncConnector(name) {
          this.showToast('Synchronized ' + name + ' successfully', 'success');
        },

        syncAllNow() {
          this.showToast('Full synchronization triggered across all 4 connectors', 'success');
        },

        getRouteLabel() {
          if (this.currentView === 'launcher') return '/cdesk/launcher';
          if (this.currentView === 'it-dashboard') return '/cdesk/it';
          if (this.currentView === 'it-list') return '/cdesk/list/it-asset';
          if (this.currentView === 'it-form') return '/cdesk/form/' + (this.currentRecord?.name || 'ITA-00600');
          if (this.currentView === 'report' && this.currentReportKey) return '/cdesk/it/' + this.currentReportKey;
          if (this.currentView === 'it-sync-settings') return '/cdesk/it/sync-settings';

          return '/cdesk';
        },

        openRecordForm(rec) {
          this.currentRecord = JSON.parse(JSON.stringify(rec));
          this.isFormDirty = false;
          this.activeFormTab = 'identity';
          this.setView('it-form');
        },

        generateRecords() {
          const list = [];
          const seeds = [
            { name: "Dell wireless mouse 04WJ8P CN-04WJ8P-LO300-49C", type: "Peripheral", mfg: "Dell", model: "04WJ8P Wireless" },
            { name: "Dell wired keyboard 04WJ8P CN-04WJ8P-LO300-49C-K0XS-A07", type: "Peripheral", mfg: "Dell", model: "KB216 Wired" },
            { name: "HP wireless keyboard K290 K290250201327", type: "Peripheral", mfg: "HP", model: "K290 Multi" },
            { name: "HP wireless mouse KM260 KM260250408458", type: "Peripheral", mfg: "HP", model: "KM260 Optical" },
            { name: "Lenovo ThinkPad X1 Carbon Gen 11 21HM004FUS", type: "Laptop", mfg: "Lenovo", model: "X1 Carbon" },
            { name: "Dell Latitude 5440 Core i7-1365U 32GB", type: "Laptop", mfg: "Dell", model: "Latitude 5440" },
            { name: "Apple MacBook Pro 16\\" M3 Max 64GB 1TB", type: "Laptop", mfg: "Apple", model: "MacBook Pro" },
            { name: "Dell PowerEdge R750xs 2U Rack Server", type: "Server", mfg: "Dell", model: "R750xs" }
          ];

          const states = ['Deployed', 'In Stock', 'In Repair', 'Pending Disposal', 'Retired'];
          const employees = ['Tajammul Farooq', 'Syed Hashim', 'Ananya Roy', 'Vikram Sethi', 'Pooja Nair'];

          for (let i = 1; i <= 40; i++) {
            const seed = seeds[(i - 1) % seeds.length];
            const id = 'ITA-' + String(600 + i).padStart(5, '0');
            list.push({
              name: id,
              asset_name: seed.name + (i > seeds.length ? ' #' + i : ''),
              asset_type: seed.type,
              assigned_to: employees[i % employees.length],
              assigned_to_source: i % 2 === 0 ? 'Entra ID Sync' : 'Manual',
              compliance: seed.type === 'Peripheral' ? 'Not Applicable' : 'Compliant',
              lifecycle_review: 'Approved',
              lifecycle_state: states[i % states.length],
              serial_no: 'SN-' + seed.mfg.substring(0,3).toUpperCase() + '-' + (100000 + i),
              manufacturer: seed.mfg,
              model: seed.model,
              purchase_date: '2024-03-15',
              purchase_cost: seed.type === 'Peripheral' ? 1450 : 95000,
              supplier: 'SBM Computers',
              warranty_expiry: '2027-03-15',
              location: 'Bangalore Campus - Block B',
              owning_entity: 'ProficientNow Global Corp',
              assigned_employee: employees[i % employees.length] + ' (UPN)',
              attached_to: seed.type === 'Peripheral' ? 'ITA-00244' : '',
              purchase_invoice: 'PINV-26-' + (200 + i),
              last_audited: '2024-09-10',
              discovery_source: 'GLPI Agent v10.0',
              hostname: 'blr-' + seed.type.toLowerCase().substring(0,3) + '-' + i + '.internal.corp',
              primary_ip: '10.142.12.' + (100 + i),
              cloud_provider: 'On-Premise',
              age: i === 1 ? '1 w' : (i * 2) + ' d',
              relationships: [
                { relation: 'connected_to', targetCi: 'ITA-00244 - Dell Latitude 5440', via: 'USB-A port 1' }
              ],
              activities: [
                { text: 'Syed Hashim updated Primary IP to 10.142.12.' + (100 + i), time: '2 hours ago' },
                { text: 'Physical Audit verified by Ananya Roy (Bangalore Campus)', time: '3 days ago' },
                { text: 'Purchase Invoice PINV-26-' + (200 + i) + ' linked to Supplier SBM Computers', time: '2 weeks ago' },
                { text: 'Entra ID Sync matched UPN for ' + employees[i % employees.length], time: '3 weeks ago' },
                { text: 'Record created from ERPNext PO Sync (PO-2024-00' + i + ')', time: '1 month ago' }
              ]
            });
          }
          this.records = list;
        },

        get filteredRecords() {
          return this.records.filter(r => {
            if (this.filters.id && !r.name.toLowerCase().includes(this.filters.id.toLowerCase())) return false;
            if (this.filters.name && !r.asset_name.toLowerCase().includes(this.filters.name.toLowerCase())) return false;
            if (this.filters.assetTypes.length > 0 && !this.filters.assetTypes.includes(r.asset_type)) return false;
            if (this.filters.lifecycleStates.length > 0 && !this.filters.lifecycleStates.includes(r.lifecycle_state)) return false;
            return true;
          });
        },

        get pagedRecords() {
          const start = (this.currentPage - 1) * this.pageSize;
          return this.filteredRecords.slice(start, start + this.pageSize);
        },

        get totalPages() {
          return Math.max(1, Math.ceil(this.filteredRecords.length / this.pageSize));
        },

        applyFilters() { this.currentPage = 1; },

        clearAllFilters() {
          this.filters = { id: '', name: '', assetTypes: [], lifecycleStates: [] };
          this.applyFilters();
          this.showToast('Filters cleared', 'info');
        },

        toggleSelectAll(e) {
          if (e.target.checked) this.selectedRowIds = this.pagedRecords.map(r => r.name);
          else this.selectedRowIds = [];
        },

        get isAllSelected() {
          return this.pagedRecords.length > 0 && this.pagedRecords.every(r => this.selectedRowIds.includes(r.name));
        },

        createNewRecord() {
          const newId = 'ITA-' + String(this.records.length + 601).padStart(5, '0');
          const newRec = {
            name: newId,
            asset_name: "New IT Peripheral Asset",
            asset_type: "Peripheral",
            assigned_to: "Syed Hashim",
            assigned_to_source: "Manual",
            compliance: "Not Applicable",
            lifecycle_review: "Approved",
            lifecycle_state: "In Stock",
            serial_no: 'SN-NEW-' + Date.now().toString().slice(-6),
            manufacturer: "Dell",
            model: "Standard",
            purchase_date: '2024-10-01',
            purchase_cost: 2100,
            supplier: "SBM Computers",
            warranty_expiry: "2027-10-01",
            location: "Bangalore Campus",
            owning_entity: "ProficientNow Global Corp",
            assigned_employee: "Syed Hashim",
            attached_to: "",
            purchase_invoice: "PINV-26-00301",
            last_audited: '2024-10-01',
            discovery_source: "Manual Entry",
            hostname: 'blr-ast-' + newId.toLowerCase() + '.internal.corp',
            primary_ip: "10.142.12.99",
            cloud_provider: "On-Premise",
            age: "just now",
            relationships: [],
            activities: [
              { text: "Syed Hashim created draft asset in register", time: "just now" },
              { text: "Initial CI schema populated from Next Experience template", time: "just now" }
            ]
          };
          this.records.unshift(newRec);
          this.openRecordForm(newRec);
          this.showToast('Draft ' + newId + ' created', 'info');
        },

        saveRecordForm() {
          this.isFormDirty = false;
          if (!this.currentRecord.activities) this.currentRecord.activities = [];
          this.currentRecord.activities.unshift({ text: "Syed Hashim saved changes to record", time: "just now" });
          const idx = this.records.findIndex(r => r.name === this.currentRecord.name);
          if (idx !== -1) this.records[idx] = JSON.parse(JSON.stringify(this.currentRecord));
          this.showToast('Saved changes to ' + this.currentRecord.name, 'success');
        },

        addComment() {
          if (!this.newCommentText.trim()) return;
          if (!this.currentRecord.activities) this.currentRecord.activities = [];
          this.currentRecord.activities.unshift({ text: "Syed Hashim: " + this.newCommentText.trim(), time: "just now" });
          this.newCommentText = '';
          this.showToast('Comment added to activity trail', 'info');
        },

        addRelationshipRow() {
          if (!this.currentRecord.relationships) this.currentRecord.relationships = [];
          this.currentRecord.relationships.push({ relation: 'connected_to', targetCi: 'ITA-00244 - Dell Latitude 5440', via: 'USB-A 3.2 Gen 2' });
          this.isFormDirty = true;
          this.showToast('Connected CI added', 'info');
        },

        removeRelationship(idx) {
          if (!this.currentRecord.relationships) return;
          this.currentRecord.relationships.splice(idx, 1);
          this.isFormDirty = true;
          this.showToast('CI disconnected', 'info');
        },

        createFinancialAsset() {
          this.showToast('Financial Asset draft generated in ERPNext Accounts for ' + this.currentRecord.name, 'success');
        },

        // Slashbucket columns
        openColumnsDrawer() {
          this.draftSelectedColumns = [...this.selectedDisplayColumns];
          this.selectedInAvailable = [];
          this.selectedInChosen = [];
          this.columnSearchQuery = '';
          this.columnsDrawerOpen = true;
          this.$nextTick(() => { this.renderIcons(); });
        },

        getColumnLabel(key) {
          const f = this.allFields.find(x => x.key === key);
          return f ? f.label.replace(' (Locked)', '') : key;
        },

        get filteredAvailableColumns() {
          const chosen = new Set(this.draftSelectedColumns);
          return this.allFields.filter(f => !chosen.has(f.key) && (!this.columnSearchQuery || f.label.toLowerCase().includes(this.columnSearchQuery.toLowerCase())));
        },

        toggleSelectAvailable(key) {
          const i = this.selectedInAvailable.indexOf(key);
          if (i > -1) this.selectedInAvailable.splice(i, 1);
          else this.selectedInAvailable.push(key);
        },

        toggleSelectChosen(key) {
          const i = this.selectedInChosen.indexOf(key);
          if (i > -1) this.selectedInChosen.splice(i, 1);
          else this.selectedInChosen.push(key);
        },

        moveColumnRight(key) {
          if (!this.draftSelectedColumns.includes(key)) this.draftSelectedColumns.push(key);
          this.selectedInAvailable = this.selectedInAvailable.filter(k => k !== key);
          this.selectedInChosen = [key];
        },

        moveColumnLeft(key) {
          if (key === 'asset_name') return;
          this.draftSelectedColumns = this.draftSelectedColumns.filter(k => k !== key);
          this.selectedInChosen = this.selectedInChosen.filter(k => k !== key);
          this.selectedInAvailable = [key];
        },

        moveSelectedRight() {
          this.selectedInAvailable.forEach(k => {
            if (!this.draftSelectedColumns.includes(k)) this.draftSelectedColumns.push(k);
          });
          this.selectedInAvailable = [];
        },

        moveSelectedLeft() {
          this.draftSelectedColumns = this.draftSelectedColumns.filter(k => k === 'asset_name' || !this.selectedInChosen.includes(k));
          this.selectedInChosen = [];
        },

        moveAllRight() {
          this.allFields.forEach(f => {
            if (!this.draftSelectedColumns.includes(f.key)) this.draftSelectedColumns.push(f.key);
          });
          this.selectedInAvailable = [];
        },

        moveAllLeft() {
          this.draftSelectedColumns = ['asset_name'];
          this.selectedInChosen = [];
        },

        moveColumnUp() {
          if (!this.selectedInChosen.length) return;
          const k = this.selectedInChosen[0];
          const i = this.draftSelectedColumns.indexOf(k);
          if (i > 0) {
            const temp = this.draftSelectedColumns[i - 1];
            this.draftSelectedColumns[i - 1] = k;
            this.draftSelectedColumns[i] = temp;
          }
        },

        moveColumnDown() {
          if (!this.selectedInChosen.length) return;
          const k = this.selectedInChosen[0];
          const i = this.draftSelectedColumns.indexOf(k);
          if (i > -1 && i < this.draftSelectedColumns.length - 1) {
            const temp = this.draftSelectedColumns[i + 1];
            this.draftSelectedColumns[i + 1] = k;
            this.draftSelectedColumns[i] = temp;
          }
        },

        moveColumnToTop() {
          if (!this.selectedInChosen.length) return;
          const k = this.selectedInChosen[0];
          this.draftSelectedColumns = [k, ...this.draftSelectedColumns.filter(x => x !== k)];
        },

        moveColumnToBottom() {
          if (!this.selectedInChosen.length) return;
          const k = this.selectedInChosen[0];
          this.draftSelectedColumns = [...this.draftSelectedColumns.filter(x => x !== k), k];
        },

        resetColumnsToDefault() {
          this.draftSelectedColumns = ['asset_name', 'asset_type', 'assigned_to', 'assigned_to_source', 'compliance', 'lifecycle_review', 'lifecycle_state'];
          this.selectedInAvailable = [];
          this.selectedInChosen = [];
          this.showToast('Columns reset to default', 'info');
        },

        applyColumnsCustomization() {
          this.selectedDisplayColumns = [...this.draftSelectedColumns];
          this.isColumnsCustomized = true;
          this.columnsDrawerOpen = false;
          this.showToast('List updated with ' + this.selectedDisplayColumns.length + ' columns', 'success');
          this.$nextTick(() => { this.renderIcons(); });
        },

        // Slashbucket filters
        openFilterSlashbucket(target) {
          this.filterModalTarget = target;
          this.filterModalSelectedAvail = [];
          this.filterModalSelectedChosen = [];
          let all = [];
          let cur = [];
          if (target === 'assetType') {
            this.filterModalTitle = 'Asset Type';
            all = ['Laptop', 'Desktop', 'Server', 'Peripheral', 'Mobile'];
            cur = [...this.filters.assetTypes];
          } else if (target === 'lifecycleState') {
            this.filterModalTitle = 'Lifecycle State';
            all = ['Deployed', 'In Stock', 'In Repair', 'Pending Disposal', 'Retired'];
            cur = [...this.filters.lifecycleStates];
          }
          this.filterModalSelectedDraft = cur;
          this.filterModalAvailable = all.filter(v => !cur.includes(v));
          this.filterModalOpen = true;
          this.$nextTick(() => { this.renderIcons(); });
        },

        toggleSelectFilterAvailable(v) {
          const i = this.filterModalSelectedAvail.indexOf(v);
          if (i > -1) this.filterModalSelectedAvail.splice(i, 1);
          else this.filterModalSelectedAvail.push(v);
        },

        toggleSelectFilterChosen(v) {
          const i = this.filterModalSelectedChosen.indexOf(v);
          if (i > -1) this.filterModalSelectedChosen.splice(i, 1);
          else this.filterModalSelectedChosen.push(v);
        },

        moveFilterValueRight(v) {
          if (!this.filterModalSelectedDraft.includes(v)) {
            this.filterModalSelectedDraft.push(v);
            this.filterModalAvailable = this.filterModalAvailable.filter(x => x !== v);
            this.filterModalSelectedAvail = this.filterModalSelectedAvail.filter(x => x !== v);
          }
        },

        moveFilterValueLeft(v) {
          this.filterModalSelectedDraft = this.filterModalSelectedDraft.filter(x => x !== v);
          if (!this.filterModalAvailable.includes(v)) {
            this.filterModalAvailable.push(v);
          }
          this.filterModalSelectedChosen = this.filterModalSelectedChosen.filter(x => x !== v);
        },

        moveFilterValuesRight() {
          this.filterModalSelectedAvail.forEach(v => this.moveFilterValueRight(v));
          this.filterModalSelectedAvail = [];
        },

        moveFilterValuesLeft() {
          this.filterModalSelectedChosen.forEach(v => this.moveFilterValueLeft(v));
          this.filterModalSelectedChosen = [];
        },

        applyFilterModal() {
          if (this.filterModalTarget === 'assetType') this.filters.assetTypes = [...this.filterModalSelectedDraft];
          else if (this.filterModalTarget === 'lifecycleState') this.filters.lifecycleStates = [...this.filterModalSelectedDraft];
          this.applyFilters();
          this.filterModalOpen = false;
          this.showToast('Applied ' + this.filterModalSelectedDraft.length + ' filter values', 'info');
        },

        getStatusPillClass(s) {
          switch (s) {
            case 'Deployed':
            case 'Compliant':
            case 'Active':
            case 'Completed':
            case 'Verified':
            case 'Reconciled':
            case 'Synchronized':
            case 'Current':
              return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
            case 'In Stock':
            case 'Low':
            case 'Scheduled':
              return 'bg-sky-50 text-sky-800 border border-sky-200';
            case 'In Repair':
            case 'Medium':
            case 'In Progress':
            case 'Renewal Pending':
            case 'Quote Received':
            case 'Under Review':
            case 'Pending Approval':
              return 'bg-amber-50 text-amber-800 border border-amber-200';
            case 'Pending Disposal':
            case 'High':
            case 'Over-allocated':
            case 'Process Blocked':
            case 'Quarantined':
            case 'Due Today':
            case 'Urgent':
              return 'bg-amber-100 text-amber-900 border border-amber-300';
            case 'Critical':
            case 'Overdue':
            case 'Isolated':
            case 'Deficit':
              return 'bg-rose-50 text-rose-800 border border-rose-200';
            case 'Retired':
              return 'bg-slate-100 text-slate-700 border border-slate-300';
            default:
              return 'bg-slate-100 text-slate-700 border border-slate-200';
          }
        },

        closeAllOverlays() {
          this.columnsDrawerOpen = false;
          this.filterModalOpen = false;
          this.cmdPaletteOpen = false;
          this.comingSoonModalOpen = false;
          this.selectedReportRow = null;
        },

        showToast(message, type = 'info') {
          if (!Array.isArray(this.toasts)) this.toasts = [];
          const id = Date.now() + Math.random();
          this.toasts.push({ id, message, type });
          this.$nextTick(() => { this.renderIcons(); });
          setTimeout(() => { 
            if (Array.isArray(this.toasts)) {
              this.toasts = this.toasts.filter(t => t.id !== id); 
            }
          }, 3000);
        }
      };
    }

    // Expose globally
    window.appData = appData;
    if (window.Alpine && typeof window.Alpine.data === 'function') {
      try {
        window.Alpine.data('appData', appData);
      } catch (e) {}
    }
  </script>
</body>
</html>
`;

fs.writeFileSync('./index.html', htmlContent);
console.log('Successfully generated index.html!');

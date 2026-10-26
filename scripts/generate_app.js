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
<body class="bg-white text-[#1e293b] font-sans antialiased text-xs select-none min-h-screen flex flex-col" x-data="appData()" x-init="initApp()" @keydown.window.ctrl.k.prevent="cmdPaletteOpen = true" @keydown.window.meta.k.prevent="cmdPaletteOpen = true" @keydown.escape.window="closeAllOverlays()">

  <!-- TOP CHROME HEADER (Navy Blue Aesthetic) -->
  <header class="h-12 bg-[#1e40af] border-b border-[#1e3a8a] text-white flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-40 select-none shadow-sm">
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-1 cursor-pointer" @click="setView('launcher')">
        <span class="font-bold tracking-tight text-white text-base">Proficient</span>
        <span class="font-serif italic text-cyan-300 text-base font-semibold">Now.</span>
      </div>

      <!-- Quick Route Trail in Header -->
      <div class="hidden sm:flex items-center gap-1.5 ml-3">
        <button @click="setView('launcher')" :class="currentView === 'launcher' ? 'bg-white/20 text-white font-semibold' : 'text-blue-100 hover:bg-white/10'" class="px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer">
          <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
          <span>Workspace Launcher</span>
        </button>
        <template x-if="currentView !== 'launcher'">
          <div class="flex items-center gap-1.5">
            <span class="text-blue-300">/</span>
            <button @click="setView('it-dashboard')" :class="currentView === 'it-dashboard' ? 'bg-blue-900 text-white font-bold border border-blue-700' : 'text-blue-100 hover:bg-white/10'" class="px-2 py-0.5 rounded text-xs flex items-center gap-1 cursor-pointer">
              <span>IT</span>
            </button>
            <template x-if="currentView === 'it-list' || currentView === 'it-form'">
              <div class="flex items-center gap-1">
                <span class="text-blue-300">/</span>
                <button @click="setView('it-list')" class="px-2 py-0.5 rounded bg-blue-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer">
                  <span>IT Asset</span>
                </button>
                <template x-if="currentView === 'it-form' && currentRecord">
                  <div class="flex items-center gap-1">
                    <span class="text-blue-300">/</span>
                    <span class="text-blue-100 font-mono text-xs" x-text="currentRecord.name"></span>
                  </div>
                </template>
              </div>
            </template>
            <template x-if="currentView === 'report' && currentReport">
              <div class="flex items-center gap-1">
                <span class="text-blue-300">/</span>
                <span class="px-2 py-0.5 rounded bg-blue-900 text-white font-bold text-xs" x-text="currentReport.title"></span>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>

    <!-- Center Search with "Ctrl+K" hint -->
    <div class="w-72 sm:w-96 max-w-md">
      <button @click="cmdPaletteOpen = true" class="w-full flex items-center justify-between px-3.5 py-1.5 rounded-md bg-blue-950/60 hover:bg-blue-950 text-blue-100 text-xs border border-blue-400/30 transition-colors cursor-pointer">
        <div class="flex items-center gap-2 text-blue-100">
          <i data-lucide="search" class="w-3.5 h-3.5 text-cyan-300"></i>
          <span>Search records, CMDB...</span>
        </div>
        <kbd class="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono text-blue-200">Ctrl+K</kbd>
      </button>
    </div>

    <!-- Right: Bell Notification & Avatar "SH" -->
    <div class="flex items-center gap-3">
      <button @click="showToast('3 System Notifications pending', 'info')" class="p-1.5 text-blue-100 hover:text-white hover:bg-white/10 rounded transition-colors relative cursor-pointer" title="Notifications">
        <i data-lucide="bell" class="w-4 h-4"></i>
        <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400"></span>
      </button>

      <div class="relative" x-data="{ open: false }">
        <button @click="open = !open" class="w-7 h-7 rounded-full bg-blue-800 text-white font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition-all border border-blue-500 shadow-xs cursor-pointer" title="Syed Hashim">
          SH
        </button>
        <div x-show="open" @click.away="open = false" x-cloak class="absolute right-0 mt-2 w-56 bg-white text-[#1e293b] rounded-lg shadow-xl border border-slate-200 py-1.5 z-50">
          <div class="px-3 py-2 border-b border-slate-100">
            <p class="font-bold text-xs text-[#1e293b]">Syed Hashim</p>
            <p class="text-[11px] text-[#64748b] truncate">shashim@proficientnow.com</p>
            <span class="inline-block mt-1 px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[9px] font-bold">Global Admin</span>
          </div>
          <button @click="setView('launcher'); open = false" class="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center gap-2 cursor-pointer">
            <i data-lucide="layout-grid" class="w-3.5 h-3.5 text-[#64748b]"></i> Workspace Launcher
          </button>
          <button @click="setView('it-dashboard'); open = false" class="w-full text-left px-3 py-1.5 hover:bg-blue-50 text-blue-900 font-semibold flex items-center gap-2 cursor-pointer">
            <i data-lucide="layout-dashboard" class="w-3.5 h-3.5 text-[#1e40af]"></i> IT / ERP Dashboard
          </button>
          <button @click="setView('it-list'); open = false" class="w-full text-left px-3 py-1.5 hover:bg-indigo-50 text-indigo-900 font-semibold flex items-center gap-2 cursor-pointer">
            <i data-lucide="columns-3" class="w-3.5 h-3.5 text-indigo-600"></i> IT Assets (CMDB)
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- ======================================================== -->
  <!-- SCREEN 1: LANDING PAGE (9 APP LAUNCHER TILES)            -->
  <!-- ======================================================== -->
  <main x-show="currentView === 'launcher'" x-cloak class="pt-12 flex-1 flex flex-col items-center justify-center p-6 select-none bg-white">
    <div class="max-w-3xl w-full mx-auto my-auto flex flex-col items-center">
      <div class="grid grid-cols-3 sm:grid-cols-3 gap-x-12 gap-y-10 justify-items-center">

        <!-- 1. Finance -->
        <button @click="openComingSoon('Finance')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1 cursor-pointer">
          <div class="w-16 h-16 rounded-2xl bg-[#64748B] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-sm group-hover:shadow-md transition-all">
            F
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-900 tracking-tight">Finance</span>
        </button>

        <!-- 2. Helpdesk -->
        <button @click="openComingSoon('Helpdesk')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1 cursor-pointer">
          <div class="w-16 h-16 rounded-2xl bg-[#1E293B] text-[#93C5FD] flex items-center justify-center font-serif italic font-bold text-3xl shadow-sm group-hover:shadow-md transition-all">
            N
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-900 tracking-tight">Helpdesk</span>
        </button>

        <!-- 3. Insights -->
        <button @click="openComingSoon('Insights')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1 cursor-pointer">
          <div class="w-16 h-16 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-sm group-hover:shadow-md transition-all">
            <span class="border-y-2 border-white px-1 leading-none">I</span>
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-900 tracking-tight">Insights</span>
        </button>

        <!-- 4. IT (LIVE HERO WORKSPACE: OPENS IT / ERP WORKSPACE DASHBOARD) -->
        <button @click="setView('it-dashboard')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1.5 relative cursor-pointer">
          <div class="w-16 h-16 rounded-2xl bg-[#1e40af] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-md group-hover:shadow-lg transition-all ring-2 ring-blue-600/30 group-hover:ring-blue-600">
            <span class="border-y-2 border-white px-1 leading-none">I</span>
          </div>
          <span class="mt-2.5 text-xs font-bold text-[#1e293b] group-hover:text-blue-600 tracking-tight">IT</span>
          <span class="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-sans text-[9px] font-bold shadow-xs uppercase tracking-wider">
            Live
          </span>
        </button>

        <!-- 5. Marketing -->
        <button @click="openComingSoon('Marketing')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1 cursor-pointer">
          <div class="w-16 h-16 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-sm group-hover:shadow-md transition-all">
            M
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-900 tracking-tight">Marketing</span>
        </button>

        <!-- 6. ProficientNow -->
        <button @click="openComingSoon('ProficientNow')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1 cursor-pointer">
          <div class="w-16 h-16 rounded-2xl bg-[#1E293B] text-[#93C5FD] flex items-center justify-center font-serif italic font-bold text-3xl shadow-sm group-hover:shadow-md transition-all">
            N
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-900 tracking-tight">ProficientNow</span>
        </button>

        <!-- 7. Security -->
        <button @click="openComingSoon('Security')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1 cursor-pointer">
          <div class="w-16 h-16 rounded-2xl bg-[#64748B] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-sm group-hover:shadow-md transition-all">
            S
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-900 tracking-tight">Security</span>
        </button>

        <!-- 8. Wiki -->
        <button @click="openComingSoon('Wiki')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1 cursor-pointer">
          <div class="w-16 h-16 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center font-sans font-bold text-2xl shadow-sm group-hover:shadow-md transition-all">
            W
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-900 tracking-tight">Wiki</span>
        </button>

        <!-- 9. HR -->
        <button @click="openComingSoon('HR')" class="flex flex-col items-center group focus:outline-none transition-transform hover:-translate-y-1 cursor-pointer">
          <div class="w-16 h-16 rounded-2xl bg-[#1E293B] text-[#93C5FD] flex items-center justify-center font-serif italic font-bold text-3xl shadow-sm group-hover:shadow-md transition-all">
            N
          </div>
          <span class="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-900 tracking-tight">HR</span>
        </button>

      </div>

      <!-- Quick Launch Helper Banner -->
      <div class="mt-14 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 text-[#64748b] text-xs">
        <span class="flex h-2 w-2 rounded-full bg-emerald-500"></span>
        <span>Click <strong>IT</strong> above to open the <strong>IT Workspace (ERP)</strong> with the <strong>ServiceNow Slashbucket</strong> list view.</span>
        <button @click="setView('it-dashboard')" class="ml-2 font-bold text-[#1e40af] hover:text-blue-900 underline cursor-pointer">Open IT Workspace &rarr;</button>
      </div>
    </div>
  </main>

  <!-- ======================================================== -->
  <!-- SCREEN 2: IT WORKSPACE WITH COLLAPSIBLE SIDEBAR          -->
  <!-- ======================================================== -->
  <div x-show="currentView !== 'launcher'" x-cloak class="pt-12 flex-1 flex min-h-screen">

    <!-- LEFT SIDEBAR (FIXED HIERARCHY, SINGLE TOP-LEVEL SELECTION, MULTI-SECTION SELECTION, NO SETTINGS) -->
    <aside :class="sidebarCollapsed ? 'w-16' : 'w-[250px]'" class="transition-all duration-200 bg-white border-r border-[#e2e8f0] flex-shrink-0 flex flex-col justify-between fixed top-12 bottom-0 z-30 select-none overflow-y-auto overflow-x-hidden">
      <div class="p-2 space-y-1">

        <!-- SIDEBAR TOGGLE HEADER -->
        <div class="px-3 py-2 flex items-center justify-between border-b border-[#e2e8f0] mb-2 cursor-pointer hover:bg-[#f8fafc] rounded-md" @click="toggleSidebar()">
          <span x-show="!sidebarCollapsed" class="font-bold text-xs text-[#1e293b] uppercase tracking-wider">Workspace Modules</span>
          <button class="p-1 rounded text-[#64748b] hover:text-[#1e293b]" :title="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
            <i :data-lucide="sidebarCollapsed ? 'chevron-right' : 'chevron-left'" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- 1. Home (2) -->
        <div class="space-y-0.5">
          <button @click="selectModule('home')" class="module-header w-full flex items-center justify-between p-3 rounded-md text-[13px] font-bold transition-colors cursor-pointer my-1"
                  :class="[activeModule === 'home' ? 'bg-[#1e40af] text-white' : 'text-[#1e293b] hover:bg-[#f8fafc]', sidebarCollapsed ? 'justify-center' : '']">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#1e40af] inline-block shrink-0" :class="activeModule === 'home' ? 'bg-white' : ''"></span>
              <span x-show="!sidebarCollapsed">Home</span>
            </div>
            <div x-show="!sidebarCollapsed" class="flex items-center gap-1.5">
              <span :class="activeModule === 'home' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">2</span>
              <span x-text="expandedModules.home ? '▼' : '▶'" class="text-[10px]" :class="activeModule === 'home' ? 'text-white' : 'text-[#64748b]'"></span>
            </div>
          </button>
          
          <div x-show="expandedModules.home && !sidebarCollapsed" class="module-content pl-2 space-y-0.5">
            <button @click="setActiveSectionItem('home-item'); setView('launcher')"
                    :class="activeItemKey === 'home-item' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                    class="w-full text-left px-3 py-2 rounded-md text-xs flex items-center justify-between cursor-pointer">
              <span>Home</span>
            </button>
            <button @click="setActiveSectionItem('inbox'); showToast('2 unread inbox notifications', 'info')"
                    :class="activeItemKey === 'inbox' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                    class="w-full text-left px-3 py-2 rounded-md text-xs flex items-center justify-between cursor-pointer">
              <span>Inbox</span>
              <span :class="activeItemKey === 'inbox' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">2</span>
            </button>
          </div>
        </div>

        <!-- 2. Finance (105) -->
        <div class="space-y-0.5">
          <button @click="selectModule('finance')" class="module-header w-full flex items-center justify-between p-3 rounded-md text-[13px] font-bold transition-colors cursor-pointer my-1"
                  :class="[activeModule === 'finance' ? 'bg-[#1e40af] text-white' : 'text-[#1e293b] hover:bg-[#f8fafc]', sidebarCollapsed ? 'justify-center' : '']">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#14b8a6] inline-block shrink-0" :class="activeModule === 'finance' ? 'bg-white' : ''"></span>
              <span x-show="!sidebarCollapsed">Finance</span>
            </div>
            <div x-show="!sidebarCollapsed" class="flex items-center gap-1.5">
              <span :class="activeModule === 'finance' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">105</span>
              <span x-text="expandedModules.finance ? '▼' : '▶'" class="text-[10px]" :class="activeModule === 'finance' ? 'text-white' : 'text-[#64748b]'"></span>
            </div>
          </button>

          <div x-show="expandedModules.finance && !sidebarCollapsed" class="module-content pl-2 space-y-0.5">
            <button @click="setActiveSectionItem('fin-invoices'); openComingSoon('Finance Invoices')"
                    :class="activeItemKey === 'fin-invoices' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                    class="w-full text-left px-3 py-2 rounded-md text-xs flex items-center justify-between cursor-pointer">
              <span>Invoices</span>
              <span :class="activeItemKey === 'fin-invoices' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">84</span>
            </button>
            <button @click="setActiveSectionItem('fin-payments'); openComingSoon('Finance Payments')"
                    :class="activeItemKey === 'fin-payments' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                    class="w-full text-left px-3 py-2 rounded-md text-xs flex items-center justify-between cursor-pointer">
              <span>Payments</span>
              <span :class="activeItemKey === 'fin-payments' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">21</span>
            </button>
          </div>
        </div>

        <!-- 3. HR (34) -->
        <div class="space-y-0.5">
          <button @click="selectModule('hr')" class="module-header w-full flex items-center justify-between p-3 rounded-md text-[13px] font-bold transition-colors cursor-pointer my-1"
                  :class="[activeModule === 'hr' ? 'bg-[#1e40af] text-white' : 'text-[#1e293b] hover:bg-[#f8fafc]', sidebarCollapsed ? 'justify-center' : '']">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] inline-block shrink-0" :class="activeModule === 'hr' ? 'bg-white' : ''"></span>
              <span x-show="!sidebarCollapsed">HR</span>
            </div>
            <div x-show="!sidebarCollapsed" class="flex items-center gap-1.5">
              <span :class="activeModule === 'hr' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">34</span>
              <span x-text="expandedModules.hr ? '▼' : '▶'" class="text-[10px]" :class="activeModule === 'hr' ? 'text-white' : 'text-[#64748b]'"></span>
            </div>
          </button>

          <div x-show="expandedModules.hr && !sidebarCollapsed" class="module-content pl-2 space-y-0.5">
            <button @click="setActiveSectionItem('hr-employees'); openComingSoon('HR Employees')"
                    :class="activeItemKey === 'hr-employees' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                    class="w-full text-left px-3 py-2 rounded-md text-xs flex items-center justify-between cursor-pointer">
              <span>Employees</span>
              <span :class="activeItemKey === 'hr-employees' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">34</span>
            </button>
          </div>
        </div>

        <!-- 4. IT (29) - ACTIVE BY DEFAULT -->
        <div class="space-y-0.5">
          <button @click="selectModule('it')" class="module-header w-full flex items-center justify-between p-3 rounded-md text-[13px] font-bold transition-colors cursor-pointer my-1"
                  :class="[activeModule === 'it' ? 'bg-[#1e40af] text-white' : 'text-[#1e293b] hover:bg-[#f8fafc]', sidebarCollapsed ? 'justify-center' : '']">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#1e40af] inline-block shrink-0" :class="activeModule === 'it' ? 'ring-2 ring-white bg-white' : ''"></span>
              <span x-show="!sidebarCollapsed">IT</span>
            </div>
            <div x-show="!sidebarCollapsed" class="flex items-center gap-1.5">
              <span :class="activeModule === 'it' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">29</span>
              <span x-text="expandedModules.it ? '▼' : '▶'" class="text-[10px]" :class="activeModule === 'it' ? 'text-white' : 'text-[#64748b]'"></span>
            </div>
          </button>

          <!-- IT MODULE EXPANDED CONTENT -->
          <div x-show="expandedModules.it && !sidebarCollapsed" class="module-content pl-1 space-y-1 pt-1">
            
            <!-- IT Home (No section) -->
            <button @click="setActiveSectionItem('it-home'); setView('it-dashboard')"
                    :class="activeItemKey === 'it-home' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                    class="w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center gap-1.5 transition-colors cursor-pointer" title="IT Home">
              <span>Home</span>
            </button>

            <!-- ASSETS SECTION -->
            <div class="sidebar-section space-y-0.5">
              <div class="pt-3 px-3 pb-1 flex items-center gap-2 border-l-2 border-[#22c55e] ml-2">
                <span class="text-[10px] uppercase font-bold text-[#64748b]">ASSETS</span>
              </div>
              <button @click="setActiveSectionItem('it-assets'); setView('it-list')"
                      :class="activeItemKey === 'it-assets' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer" title="IT assets">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#22c55e] inline-block shrink-0" :class="activeItemKey === 'it-assets' ? 'bg-white' : ''"></span>
                  <span>IT assets</span>
                </div>
                <span :class="activeItemKey === 'it-assets' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">118</span>
              </button>

              <button @click="setActiveSectionItem('asset-events'); openReport('asset-events')"
                      :class="activeItemKey === 'asset-events' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer" title="Asset events">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#22c55e] inline-block shrink-0" :class="activeItemKey === 'asset-events' ? 'bg-white' : ''"></span>
                  <span>Asset events</span>
                </div>
                <span :class="activeItemKey === 'asset-events' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">45</span>
              </button>

              <button @click="setActiveSectionItem('warranty-expiring'); openReport('warranty-expiring')"
                      :class="activeItemKey === 'warranty-expiring' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer" title="Warranty expiring">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#22c55e] inline-block shrink-0" :class="activeItemKey === 'warranty-expiring' ? 'bg-white' : ''"></span>
                  <span>Warranty expiring</span>
                </div>
                <span :class="activeItemKey === 'warranty-expiring' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">8</span>
              </button>

              <button @click="setActiveSectionItem('physical-audit-due'); openReport('physical-audit-due')"
                      :class="activeItemKey === 'physical-audit-due' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer" title="Physical audit due">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#22c55e] inline-block shrink-0" :class="activeItemKey === 'physical-audit-due' ? 'bg-white' : ''"></span>
                  <span>Physical audit due</span>
                </div>
                <span :class="activeItemKey === 'physical-audit-due' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">12</span>
              </button>
            </div>

            <!-- SOFTWARE AND LICENSES SECTION -->
            <div class="sidebar-section space-y-0.5">
              <div class="pt-3 px-3 pb-1 flex items-center gap-2 border-l-2 border-[#eab308] ml-2">
                <span class="text-[10px] uppercase font-bold text-[#64748b]">SOFTWARE AND LICENSES</span>
              </div>
              <button @click="setActiveSectionItem('software-licenses'); openReport('software-licences')"
                      :class="activeItemKey === 'software-licenses' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#eab308] inline-block shrink-0" :class="activeItemKey === 'software-licenses' ? 'bg-white' : ''"></span>
                  <span>Software licenses</span>
                </div>
                <span :class="activeItemKey === 'software-licenses' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">45</span>
              </button>

              <button @click="setActiveSectionItem('license-compliance'); openReport('licence-compliance')"
                      :class="activeItemKey === 'license-compliance' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#eab308] inline-block shrink-0" :class="activeItemKey === 'license-compliance' ? 'bg-white' : ''"></span>
                  <span>License compliance</span>
                </div>
                <span :class="activeItemKey === 'license-compliance' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">3</span>
              </button>

              <button @click="setActiveSectionItem('saas-renewal-watch'); openReport('saas-renewal-watch')"
                      :class="activeItemKey === 'saas-renewal-watch' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#eab308] inline-block shrink-0" :class="activeItemKey === 'saas-renewal-watch' ? 'bg-white' : ''"></span>
                  <span>SaaS renewal watch</span>
                </div>
                <span :class="activeItemKey === 'saas-renewal-watch' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">5</span>
              </button>

              <button @click="setActiveSectionItem('license-expiry-calendar'); openReport('warranty-expiring')"
                      :class="activeItemKey === 'license-expiry-calendar' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#eab308] inline-block shrink-0" :class="activeItemKey === 'license-expiry-calendar' ? 'bg-white' : ''"></span>
                  <span>License expiry calendar</span>
                </div>
                <span :class="activeItemKey === 'license-expiry-calendar' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">12</span>
              </button>

              <button @click="setActiveSectionItem('cost-analysis'); openReport('software-cross-check')"
                      :class="activeItemKey === 'cost-analysis' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#eab308] inline-block shrink-0" :class="activeItemKey === 'cost-analysis' ? 'bg-white' : ''"></span>
                  <span>Cost analysis</span>
                </div>
                <span :class="activeItemKey === 'cost-analysis' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">1</span>
              </button>
            </div>

            <!-- IDENTITY AND ACCESS SECTION -->
            <div class="sidebar-section space-y-0.5">
              <div class="pt-3 px-3 pb-1 flex items-center gap-2 border-l-2 border-[#06b6d4] ml-2">
                <span class="text-[10px] uppercase font-bold text-[#64748b]">IDENTITY AND ACCESS</span>
              </div>
              <button @click="setActiveSectionItem('entra-users'); openReport('identity-access')"
                      :class="activeItemKey === 'entra-users' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#06b6d4] inline-block shrink-0" :class="activeItemKey === 'entra-users' ? 'bg-white' : ''"></span>
                  <span>Entra users</span>
                </div>
                <span :class="activeItemKey === 'entra-users' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">542</span>
              </button>

              <button @click="setActiveSectionItem('entra-groups'); openReport('identity-access')"
                      :class="activeItemKey === 'entra-groups' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#06b6d4] inline-block shrink-0" :class="activeItemKey === 'entra-groups' ? 'bg-white' : ''"></span>
                  <span>Entra groups</span>
                </div>
                <span :class="activeItemKey === 'entra-groups' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">12</span>
              </button>

              <button @click="setActiveSectionItem('directory-roles'); openReport('identity-access')"
                      :class="activeItemKey === 'directory-roles' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#06b6d4] inline-block shrink-0" :class="activeItemKey === 'directory-roles' ? 'bg-white' : ''"></span>
                  <span>Directory roles</span>
                </div>
                <span :class="activeItemKey === 'directory-roles' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">28</span>
              </button>

              <button @click="setActiveSectionItem('license-skus'); openReport('identity-access')"
                      :class="activeItemKey === 'license-skus' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#06b6d4] inline-block shrink-0" :class="activeItemKey === 'license-skus' ? 'bg-white' : ''"></span>
                  <span>License SKUs</span>
                </div>
                <span :class="activeItemKey === 'license-skus' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">89</span>
              </button>

              <button @click="setActiveSectionItem('portal-access'); openReport('identity-access')"
                      :class="activeItemKey === 'portal-access' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#06b6d4] inline-block shrink-0" :class="activeItemKey === 'portal-access' ? 'bg-white' : ''"></span>
                  <span>Portal access</span>
                </div>
                <span :class="activeItemKey === 'portal-access' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">7</span>
              </button>
            </div>

            <!-- SECURITY & COMPLIANCE SECTION -->
            <div class="sidebar-section space-y-0.5">
              <div class="pt-3 px-3 pb-1 flex items-center gap-2 border-l-2 border-[#ef4444] ml-2">
                <span class="text-[10px] uppercase font-bold text-[#64748b]">SECURITY &amp; COMPLIANCE</span>
              </div>
              <button @click="setActiveSectionItem('compliance-reports'); openReport('prohibited-software')"
                      :class="activeItemKey === 'compliance-reports' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#ef4444] inline-block shrink-0" :class="activeItemKey === 'compliance-reports' ? 'bg-white' : ''"></span>
                  <span>Compliance reports</span>
                </div>
                <span :class="activeItemKey === 'compliance-reports' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">4</span>
              </button>

              <button @click="setActiveSectionItem('security-audit'); openReport('identity-access')"
                      :class="activeItemKey === 'security-audit' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#ef4444] inline-block shrink-0" :class="activeItemKey === 'security-audit' ? 'bg-white' : ''"></span>
                  <span>Security audit</span>
                </div>
                <span :class="activeItemKey === 'security-audit' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">1</span>
              </button>

              <button @click="setActiveSectionItem('incident-log'); openReport('ticket-queue')"
                      :class="activeItemKey === 'incident-log' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#ef4444] inline-block shrink-0" :class="activeItemKey === 'incident-log' ? 'bg-white' : ''"></span>
                  <span>Incident log</span>
                </div>
                <span :class="activeItemKey === 'incident-log' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">3</span>
              </button>

              <button @click="setActiveSectionItem('policy-documents'); openReport('prohibited-software')"
                      :class="activeItemKey === 'policy-documents' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#ef4444] inline-block shrink-0" :class="activeItemKey === 'policy-documents' ? 'bg-white' : ''"></span>
                  <span>Policy documents</span>
                </div>
                <span :class="activeItemKey === 'policy-documents' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">12</span>
              </button>
            </div>

            <!-- EXCEPTIONS SECTION -->
            <div class="sidebar-section space-y-0.5 pb-2">
              <div class="pt-3 px-3 pb-1 flex items-center gap-2 border-l-2 border-[#f59e0b] ml-2">
                <span class="text-[10px] uppercase font-bold text-[#64748b]">EXCEPTIONS</span>
              </div>
              <button @click="setActiveSectionItem('departed-licenses'); openReport('exceptions')"
                      :class="activeItemKey === 'departed-licenses' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                      class="sidebar-item w-full text-left px-3 py-2.5 mx-2 rounded-md text-xs flex items-center justify-between transition-colors cursor-pointer">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-xs bg-[#f59e0b] inline-block shrink-0" :class="activeItemKey === 'departed-licenses' ? 'bg-white' : ''"></span>
                  <span>Departed with licenses</span>
                </div>
                <span :class="activeItemKey === 'departed-licenses' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">2</span>
              </button>
            </div>

          </div>
        </div>

        <!-- 5. Security (21) -->
        <div class="space-y-0.5">
          <button @click="selectModule('security')" class="module-header w-full flex items-center justify-between p-3 rounded-md text-[13px] font-bold transition-colors cursor-pointer my-1"
                  :class="[activeModule === 'security' ? 'bg-[#1e40af] text-white' : 'text-[#1e293b] hover:bg-[#f8fafc]', sidebarCollapsed ? 'justify-center' : '']">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444] inline-block shrink-0" :class="activeModule === 'security' ? 'bg-white' : ''"></span>
              <span x-show="!sidebarCollapsed">Security</span>
            </div>
            <div x-show="!sidebarCollapsed" class="flex items-center gap-1.5">
              <span :class="activeModule === 'security' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">21</span>
              <span x-text="expandedModules.security ? '▼' : '▶'" class="text-[10px]" :class="activeModule === 'security' ? 'text-white' : 'text-[#64748b]'"></span>
            </div>
          </button>

          <div x-show="expandedModules.security && !sidebarCollapsed" class="module-content pl-2 space-y-0.5">
            <button @click="setActiveSectionItem('sec-alerts'); openComingSoon('Security Alerts')"
                    :class="activeItemKey === 'sec-alerts' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                    class="w-full text-left px-3 py-2 rounded-md text-xs flex items-center justify-between cursor-pointer">
              <span>Security Alerts</span>
              <span :class="activeItemKey === 'sec-alerts' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">21</span>
            </button>
          </div>
        </div>

        <!-- 6. Helpdesk (14) -->
        <div class="space-y-0.5">
          <button @click="selectModule('helpdesk')" class="module-header w-full flex items-center justify-between p-3 rounded-md text-[13px] font-bold transition-colors cursor-pointer my-1"
                  :class="[activeModule === 'helpdesk' ? 'bg-[#1e40af] text-white' : 'text-[#1e293b] hover:bg-[#f8fafc]', sidebarCollapsed ? 'justify-center' : '']">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#f59e0b] inline-block shrink-0" :class="activeModule === 'helpdesk' ? 'bg-white' : ''"></span>
              <span x-show="!sidebarCollapsed">Helpdesk</span>
            </div>
            <div x-show="!sidebarCollapsed" class="flex items-center gap-1.5">
              <span :class="activeModule === 'helpdesk' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">14</span>
              <span x-text="expandedModules.helpdesk ? '▼' : '▶'" class="text-[10px]" :class="activeModule === 'helpdesk' ? 'text-white' : 'text-[#64748b]'"></span>
            </div>
          </button>

          <div x-show="expandedModules.helpdesk && !sidebarCollapsed" class="module-content pl-2 space-y-0.5">
            <button @click="setActiveSectionItem('help-tickets'); openComingSoon('Helpdesk Tickets')"
                    :class="activeItemKey === 'help-tickets' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                    class="w-full text-left px-3 py-2 rounded-md text-xs flex items-center justify-between cursor-pointer">
              <span>Open Tickets</span>
              <span :class="activeItemKey === 'help-tickets' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">14</span>
            </button>
          </div>
        </div>

        <!-- 7. Marketing & SEO (9) -->
        <div class="space-y-0.5">
          <button @click="selectModule('marketing')" class="module-header w-full flex items-center justify-between p-3 rounded-md text-[13px] font-bold transition-colors cursor-pointer my-1"
                  :class="[activeModule === 'marketing' ? 'bg-[#1e40af] text-white' : 'text-[#1e293b] hover:bg-[#f8fafc]', sidebarCollapsed ? 'justify-center' : '']">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#06b6d4] inline-block shrink-0" :class="activeModule === 'marketing' ? 'bg-white' : ''"></span>
              <span x-show="!sidebarCollapsed">Marketing &amp; SEO</span>
            </div>
            <div x-show="!sidebarCollapsed" class="flex items-center gap-1.5">
              <span :class="activeModule === 'marketing' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">9</span>
              <span x-text="expandedModules.marketing ? '▼' : '▶'" class="text-[10px]" :class="activeModule === 'marketing' ? 'text-white' : 'text-[#64748b]'"></span>
            </div>
          </button>

          <div x-show="expandedModules.marketing && !sidebarCollapsed" class="module-content pl-2 space-y-0.5">
            <button @click="setActiveSectionItem('mkt-campaigns'); openComingSoon('Marketing Campaigns')"
                    :class="activeItemKey === 'mkt-campaigns' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                    class="w-full text-left px-3 py-2 rounded-md text-xs flex items-center justify-between cursor-pointer">
              <span>Campaigns</span>
              <span :class="activeItemKey === 'mkt-campaigns' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">9</span>
            </button>
          </div>
        </div>

        <!-- 8. Wiki (5) -->
        <div class="space-y-0.5">
          <button @click="selectModule('wiki')" class="module-header w-full flex items-center justify-between p-3 rounded-md text-[13px] font-bold transition-colors cursor-pointer my-1"
                  :class="[activeModule === 'wiki' ? 'bg-[#1e40af] text-white' : 'text-[#1e293b] hover:bg-[#f8fafc]', sidebarCollapsed ? 'justify-center' : '']">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#64748b] inline-block shrink-0" :class="activeModule === 'wiki' ? 'bg-white' : ''"></span>
              <span x-show="!sidebarCollapsed">Wiki</span>
            </div>
            <div x-show="!sidebarCollapsed" class="flex items-center gap-1.5">
              <span :class="activeModule === 'wiki' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">5</span>
              <span x-text="expandedModules.wiki ? '▼' : '▶'" class="text-[10px]" :class="activeModule === 'wiki' ? 'text-white' : 'text-[#64748b]'"></span>
            </div>
          </button>

          <div x-show="expandedModules.wiki && !sidebarCollapsed" class="module-content pl-2 space-y-0.5">
            <button @click="setActiveSectionItem('wiki-docs'); openComingSoon('Wiki Articles')"
                    :class="activeItemKey === 'wiki-docs' ? 'bg-[#1e40af] text-white font-bold' : 'text-[#1e293b] hover:bg-[#f8fafc]'"
                    class="w-full text-left px-3 py-2 rounded-md text-xs flex items-center justify-between cursor-pointer">
              <span>Articles</span>
              <span :class="activeItemKey === 'wiki-docs' ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'" class="text-[10px] px-1.5 py-0.2 rounded-full font-bold">5</span>
            </button>
          </div>
        </div>

      </div>

      <!-- BOTTOM USER PROFILE -->
      <div class="my-4 border-t border-[#e2e8f0] p-3 flex items-center gap-3 hover:bg-[#f8fafc] transition-colors cursor-pointer">
        <div class="w-8 h-8 rounded-full bg-[#1e40af] text-white font-bold text-xs flex items-center justify-center shrink-0">
          SH
        </div>
        <div x-show="!sidebarCollapsed" class="overflow-hidden leading-tight">
          <div class="font-bold text-[#1e293b] text-xs truncate">Syed Hashim</div>
          <div class="text-[11px] text-[#64748b] truncate">shashim@proficientnow.com</div>
        </div>
      </div>
    </aside>

    <!-- RIGHT MAIN CONTENT (Offset by 250px or 64px) -->
    <main :class="sidebarCollapsed ? 'ml-16' : 'ml-[250px]'" class="transition-all duration-200 flex-1 min-w-0 flex flex-col min-h-[calc(100vh-48px)] bg-white">

      <!-- UNIVERSAL BREADCRUMB BAR -->
      <div class="px-6 py-2.5 bg-white border-b border-[#e2e8f0] flex items-center justify-between text-xs text-[#64748b] shadow-2xs select-none">
        <div class="flex items-center gap-1.5 font-medium">
          <button @click="setView('launcher')" class="hover:text-blue-900 flex items-center gap-1 cursor-pointer">
            <i data-lucide="home" class="w-3.5 h-3.5 text-slate-400"></i>
            <span>Home</span>
          </button>
          <span class="text-slate-400">/</span>
          <button @click="setView('it-dashboard')" :class="currentView === 'it-dashboard' ? 'font-bold text-[#1e293b]' : 'hover:text-blue-900'" class="cursor-pointer">
            IT
          </button>
          <template x-if="currentView === 'it-list' || currentView === 'it-form'">
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400">/</span>
              <button @click="setView('it-list')" :class="currentView === 'it-list' ? 'font-bold text-[#1e293b]' : 'hover:text-blue-900'" class="cursor-pointer">
                IT Asset
              </button>
              <template x-if="currentView === 'it-form' && currentRecord">
                <div class="flex items-center gap-1.5">
                  <span class="text-slate-400">/</span>
                  <span class="font-bold text-[#1e40af] font-mono" x-text="currentRecord.name"></span>
                </div>
              </template>
            </div>
          </template>
          <template x-if="currentView === 'report' && currentReport">
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400">/</span>
              <span class="font-bold text-[#1e293b]" x-text="currentReport.title"></span>
            </div>
          </template>
        </div>

        <div class="flex items-center gap-2">
          <span class="font-mono text-[11px] text-[#64748b]" x-text="getRouteLabel()"></span>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- PAGE 1: MINIMALIST WORKSPACE / DASHBOARD                 -->
      <!-- ======================================================== -->
      <section x-show="currentView === 'it-dashboard'" class="p-6 max-w-[1200px] w-full mx-auto space-y-6 select-none font-sans">

        <!-- HEADER -->
        <div>
          <h1 class="text-[28px] font-bold text-[#1e293b] tracking-tight leading-none">Good morning, Administrator</h1>
          <p class="text-xs text-[#64748b] mt-1.5">Monday 26 October &bull; 118 total assets &bull; 12 in maintenance</p>
        </div>

        <!-- TWO-COLUMN LAYOUT (50/50 - MAX-WIDTH 1200px) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- LEFT COLUMN (50%): IT Assets Card -->
          <div class="border-l-4 border-[#22c55e] bg-white rounded-2xl border-y border-r border-[#e2e8f0] shadow-xs p-6 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 text-[#22c55e] border border-emerald-200 font-bold flex items-center justify-center text-xs">
                  CI
                </div>
                <h2 class="font-bold text-lg text-[#1e293b]">IT Assets</h2>
              </div>
              <button @click="setView('it-list')" class="text-xs text-[#1e40af] font-semibold hover:underline cursor-pointer">View All &rarr;</button>
            </div>

            <div class="flex items-center gap-6 py-2">
              <!-- Circular Donut Chart -->
              <div class="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg class="w-32 h-32 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#f1f5f9" stroke-width="12" fill="transparent"></circle>
                  <!-- Deployed: Emerald (70%) -->
                  <circle cx="50" cy="50" r="38" stroke="#22c55e" stroke-width="12" fill="transparent" stroke-dasharray="238.7" stroke-dashoffset="71.6" stroke-linecap="round"></circle>
                  <!-- In Storage: Sky (12%) -->
                  <circle cx="50" cy="50" r="38" stroke="#0284c7" stroke-width="12" fill="transparent" stroke-dasharray="238.7" stroke-dashoffset="191" stroke-linecap="round"></circle>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span class="text-2xl font-bold text-[#1e293b] leading-none">82</span>
                  <span class="text-[10px] text-[#64748b] font-medium">Deployed</span>
                </div>
              </div>

              <!-- Legend Breakdown -->
              <div class="space-y-2.5 text-xs flex-1">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></span>
                    <span class="text-[#1e293b] font-medium">82 Deployed</span>
                  </div>
                  <span class="font-semibold text-[#64748b]">70%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#0284c7]"></span>
                    <span class="text-[#1e293b] font-medium">14 in storage</span>
                  </div>
                  <span class="font-semibold text-[#64748b]">12%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                    <span class="text-[#1e293b] font-medium">2 lost</span>
                  </div>
                  <span class="font-semibold text-[#64748b]">2%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#94a3b8]"></span>
                    <span class="text-[#1e293b] font-medium">20 retired</span>
                  </div>
                  <span class="font-semibold text-[#64748b]">16%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN (50%): Software Licenses Card -->
          <div class="border-l-4 border-[#eab308] bg-white rounded-2xl border-y border-r border-[#e2e8f0] shadow-xs p-6 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-amber-50 text-[#d97706] border border-amber-200 font-bold flex items-center justify-center text-xs">
                  SW
                </div>
                <h2 class="font-bold text-lg text-[#1e293b]">Software Licenses</h2>
              </div>
              <button @click="openReport('software-licences')" class="text-xs text-[#1e40af] font-semibold hover:underline cursor-pointer">View All &rarr;</button>
            </div>

            <div class="flex items-center gap-6 py-2">
              <!-- Circular Donut Chart -->
              <div class="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg class="w-32 h-32 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#f1f5f9" stroke-width="12" fill="transparent"></circle>
                  <!-- Active: Blue (80%) -->
                  <circle cx="50" cy="50" r="38" stroke="#2563eb" stroke-width="12" fill="transparent" stroke-dasharray="238.7" stroke-dashoffset="47.7" stroke-linecap="round"></circle>
                  <!-- Expiring Soon: Amber (14%) -->
                  <circle cx="50" cy="50" r="38" stroke="#f59e0b" stroke-width="12" fill="transparent" stroke-dasharray="238.7" stroke-dashoffset="205" stroke-linecap="round"></circle>
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span class="text-2xl font-bold text-[#1e293b] leading-none">45</span>
                  <span class="text-[10px] text-[#64748b] font-medium">Active</span>
                </div>
              </div>

              <!-- Legend Breakdown -->
              <div class="space-y-2.5 text-xs flex-1">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#2563eb]"></span>
                    <span class="text-[#1e293b] font-medium">45 Active</span>
                  </div>
                  <span class="font-semibold text-[#64748b]">80%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
                    <span class="text-[#1e293b] font-medium">8 expiring soon</span>
                  </div>
                  <span class="font-semibold text-[#64748b]">14%</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                    <span class="text-[#1e293b] font-medium">3 non-compliant</span>
                  </div>
                  <span class="font-semibold text-[#64748b]">6%</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- QUEUE SECTION (FULL WIDTH) -->
        <div class="space-y-3 pt-2">
          <h2 class="font-bold text-base text-[#1e293b]">Your Queue</h2>
          <div class="space-y-3">
            
            <!-- Queue Card 1 -->
            <div @click="setView('it-list')" class="border-l-4 border-[#1e40af] h-[120px] bg-white rounded-2xl border-y border-r border-[#e2e8f0] p-5 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-blue-50 text-[#1e40af] border border-blue-200 flex items-center justify-center text-lg font-bold shrink-0">
                  8
                </div>
                <div>
                  <h3 class="font-bold text-base text-[#1e293b]">8 Assets For Review</h3>
                  <p class="text-xs text-[#64748b] mt-0.5">Next 30 days &bull; Scheduled physical audits and lifecycle reviews</p>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-5 h-5 text-slate-400"></i>
            </div>

            <!-- Queue Card 2 -->
            <div @click="openReport('saas-renewal-watch')" class="border-l-4 border-[#eab308] h-[120px] bg-white rounded-2xl border-y border-r border-[#e2e8f0] p-5 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-amber-50 text-[#d97706] border border-amber-200 flex items-center justify-center text-lg font-bold shrink-0">
                  12
                </div>
                <div>
                  <h3 class="font-bold text-base text-[#1e293b]">12 Licenses Expiring</h3>
                  <p class="text-xs text-[#64748b] mt-0.5">Action required &bull; Vendor quotes and renewal approvals pending</p>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-5 h-5 text-slate-400"></i>
            </div>

            <!-- Queue Card 3 -->
            <div @click="openReport('licence-compliance')" class="border-l-4 border-[#ef4444] h-[120px] bg-white rounded-2xl border-y border-r border-[#e2e8f0] p-5 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-rose-50 text-[#dc2626] border border-rose-200 flex items-center justify-center text-lg font-bold shrink-0">
                  5
                </div>
                <div>
                  <h3 class="font-bold text-base text-[#1e293b]">5 Compliance Issues</h3>
                  <p class="text-xs text-[#64748b] mt-0.5">To resolve &bull; Unassigned departed user seats and missing primary IPs</p>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-5 h-5 text-slate-400"></i>
            </div>

          </div>
        </div>

        <!-- NAVIGATION SECTION -->
        <div class="space-y-3 pt-2">
          <h2 class="font-bold text-base text-[#1e293b]">Quick Navigation</h2>
          <div class="space-y-3">
            
            <div @click="setView('it-list')" class="border-l-4 border-[#22c55e] h-[80px] bg-white rounded-xl border-y border-r border-[#e2e8f0] px-5 flex items-center justify-between hover:border-y hover:border-r hover:border-[#1e40af] hover:shadow-xs transition-all cursor-pointer">
              <div class="flex items-center gap-3.5">
                <div class="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-[#22c55e] border border-emerald-200 font-bold text-xs">
                  CI
                </div>
                <div>
                  <div class="font-bold text-sm text-[#1e293b]">IT Assets</div>
                  <div class="text-xs text-[#64748b]">CMDB register &bull; 118 Hardware CIs</div>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
            </div>

            <div @click="openReport('software-licences')" class="border-l-4 border-[#eab308] h-[80px] bg-white rounded-xl border-y border-r border-[#e2e8f0] px-5 flex items-center justify-between hover:border-y hover:border-r hover:border-[#1e40af] hover:shadow-xs transition-all cursor-pointer">
              <div class="flex items-center gap-3.5">
                <div class="px-2.5 py-1.5 rounded-lg bg-amber-50 text-[#d97706] border border-amber-200 font-bold text-xs">
                  SW
                </div>
                <div>
                  <div class="font-bold text-sm text-[#1e293b]">Software Licenses</div>
                  <div class="text-xs text-[#64748b]">SaaS Watch &amp; License Compliance</div>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
            </div>

            <div @click="openReport('identity-access')" class="border-l-4 border-[#06b6d4] h-[80px] bg-white rounded-xl border-y border-r border-[#e2e8f0] px-5 flex items-center justify-between hover:border-y hover:border-r hover:border-[#1e40af] hover:shadow-xs transition-all cursor-pointer">
              <div class="flex items-center gap-3.5">
                <div class="px-2.5 py-1.5 rounded-lg bg-cyan-50 text-[#0891b2] border border-cyan-200 font-bold text-xs">
                  ID
                </div>
                <div>
                  <div class="font-bold text-sm text-[#1e293b]">Identity &amp; Access</div>
                  <div class="text-xs text-[#64748b]">Entra ID Users, Roles &amp; Groups</div>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
            </div>

            <div @click="openReport('prohibited-software')" class="border-l-4 border-[#ef4444] h-[80px] bg-white rounded-xl border-y border-r border-[#e2e8f0] px-5 flex items-center justify-between hover:border-y hover:border-r hover:border-[#1e40af] hover:shadow-xs transition-all cursor-pointer">
              <div class="flex items-center gap-3.5">
                <div class="px-2.5 py-1.5 rounded-lg bg-rose-50 text-[#dc2626] border border-rose-200 font-bold text-xs">
                  CP
                </div>
                <div>
                  <div class="font-bold text-sm text-[#1e293b]">Compliance Reports</div>
                  <div class="text-xs text-[#64748b]">Security Policy &amp; Prohibited Software</div>
                </div>
              </div>
              <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400"></i>
            </div>

          </div>
        </div>

        <!-- MODULES SECTION -->
        <div class="space-y-3 pt-2 pb-6">
          <h2 class="font-bold text-base text-[#1e293b]">Modules</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            
            <div @click="openReport('identity-access')" class="border-l-4 border-[#ef4444] h-[60px] bg-white rounded-xl border-y border-r border-[#e2e8f0] px-4 flex items-center gap-3 hover:shadow-2xs transition-all cursor-pointer">
              <span class="w-2 h-2 rounded-full bg-[#ef4444]"></span>
              <span class="font-bold text-xs text-[#1e293b]">Security</span>
            </div>

            <div @click="showToast('Email & Exchange workspace', 'info')" class="border-l-4 border-[#0284c7] h-[60px] bg-white rounded-xl border-y border-r border-[#e2e8f0] px-4 flex items-center gap-3 hover:shadow-2xs transition-all cursor-pointer">
              <span class="w-2 h-2 rounded-full bg-[#0284c7]"></span>
              <span class="font-bold text-xs text-[#1e293b]">Email</span>
            </div>

            <div @click="showToast('Mobile MDM & Intune workspace', 'info')" class="border-l-4 border-[#8b5cf6] h-[60px] bg-white rounded-xl border-y border-r border-[#e2e8f0] px-4 flex items-center gap-3 hover:shadow-2xs transition-all cursor-pointer">
              <span class="w-2 h-2 rounded-full bg-[#8b5cf6]"></span>
              <span class="font-bold text-xs text-[#1e293b]">Mobile</span>
            </div>

            <div @click="openReport('physical-audit-due')" class="border-l-4 border-[#f59e0b] h-[60px] bg-white rounded-xl border-y border-r border-[#e2e8f0] px-4 flex items-center gap-3 hover:shadow-2xs transition-all cursor-pointer">
              <span class="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
              <span class="font-bold text-xs text-[#1e293b]">Printers</span>
            </div>

            <div @click="openReport('asset-events')" class="border-l-4 border-[#14b8a6] h-[60px] bg-white rounded-xl border-y border-r border-[#e2e8f0] px-4 flex items-center gap-3 hover:shadow-2xs transition-all cursor-pointer">
              <span class="w-2 h-2 rounded-full bg-[#14b8a6]"></span>
              <span class="font-bold text-xs text-[#1e293b]">Network</span>
            </div>

          </div>
        </div>

      </section>

      <!-- ======================================================== -->
      <!-- PAGE 2: IT ASSETS LIST (CMDB WITH SLASHBUCKET)           -->
      <!-- ======================================================== -->
      <section x-show="currentView === 'it-list'" class="p-4 space-y-3 flex-1 flex flex-col max-w-[1800px] w-full">
        <!-- List Header Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#e2e8f0] shadow-xs">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base font-bold text-[#1e293b]">IT Assets (CMDB)</h1>
              <span class="font-mono text-[10px] bg-blue-50 text-[#1e40af] border border-blue-200 px-2 py-0.5 rounded-md font-bold">DocType: IT Asset</span>
              <span class="text-slate-400 text-xs">&bull;</span>
              <span class="text-[#64748b] text-xs font-mono font-bold" x-text="filteredRecords.length + ' records'"></span>
            </div>
            <p class="text-[11px] text-[#64748b] mt-0.5">Hardware CMDB registry with dual-list Slashbucket column selection and horizontal forms.</p>
          </div>
          <div class="flex items-center gap-2">
            <!-- HERO FEATURE: SLASHBUCKET BUTTON -->
            <button @click="openColumnsDrawer()" class="px-3 py-1.5 rounded-lg border border-blue-300 bg-blue-50/70 hover:bg-blue-100 text-[#1e40af] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer">
              <i data-lucide="columns-3" class="w-3.5 h-3.5 text-[#1e40af]"></i>
              <span>Columns (Slashbucket)</span>
              <span x-show="isColumnsCustomized" class="w-2 h-2 rounded-full bg-[#1e40af]"></span>
            </button>
            <button @click="createNewRecord()" class="px-3.5 py-1.5 rounded-lg bg-[#1e40af] hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span>+ Add IT Asset</span>
            </button>
          </div>
        </div>

        <!-- FILTER TABS BAR -->
        <div class="bg-white p-2.5 rounded-xl border border-[#e2e8f0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div class="flex items-center gap-1 overflow-x-auto">
            <button @click="activeFilterTab = 'All'; applyFilters()" :class="activeFilterTab === 'All' ? 'bg-[#1e40af] text-white font-medium' : 'bg-white text-[#64748b] hover:bg-slate-100'" class="px-3 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap cursor-pointer">
              All (118)
            </button>
            <button @click="activeFilterTab = 'Deployed'; applyFilters()" :class="activeFilterTab === 'Deployed' ? 'bg-[#1e40af] text-white font-medium' : 'bg-white text-[#64748b] hover:bg-slate-100'" class="px-3 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap cursor-pointer">
              Deployed (82)
            </button>
            <button @click="activeFilterTab = 'In Storage'; applyFilters()" :class="activeFilterTab === 'In Storage' ? 'bg-[#1e40af] text-white font-medium' : 'bg-white text-[#64748b] hover:bg-slate-100'" class="px-3 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap cursor-pointer">
              In Storage (14)
            </button>
            <button @click="activeFilterTab = 'In Maintenance'; applyFilters()" :class="activeFilterTab === 'In Maintenance' ? 'bg-[#1e40af] text-white font-medium' : 'bg-white text-[#64748b] hover:bg-slate-100'" class="px-3 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap cursor-pointer">
              In Maintenance (12)
            </button>
            <button @click="activeFilterTab = 'Lost'; applyFilters()" :class="activeFilterTab === 'Lost' ? 'bg-[#1e40af] text-white font-medium' : 'bg-white text-[#64748b] hover:bg-slate-100'" class="px-3 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap cursor-pointer">
              Lost (2)
            </button>
            <button @click="activeFilterTab = 'Retired'; applyFilters()" :class="activeFilterTab === 'Retired' ? 'bg-[#1e40af] text-white font-medium' : 'bg-white text-[#64748b] hover:bg-slate-100'" class="px-3 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap cursor-pointer">
              Retired (8)
            </button>
          </div>

          <!-- Quick search & filter inputs -->
          <div class="flex flex-wrap items-center gap-2 shrink-0">
            <input type="text" x-model="filters.id" @input="applyFilters()" placeholder="Search: Filter by ID" class="h-[36px] px-3 py-2 text-[13px] rounded-lg border border-[#e2e8f0] bg-white text-[#1e293b] focus:outline-none focus:border-[#1e40af] w-36">
            <input type="text" x-model="filters.name" @input="applyFilters()" placeholder="Search: Filter by Name" class="h-[36px] px-3 py-2 text-[13px] rounded-lg border border-[#e2e8f0] bg-white text-[#1e293b] focus:outline-none focus:border-[#1e40af] w-44">
            <select x-model="filters.assetType" @change="applyFilters()" class="h-[36px] px-3 py-2 text-[13px] rounded-lg border border-[#e2e8f0] bg-white text-[#1e293b] focus:outline-none focus:border-[#1e40af] cursor-pointer">
              <option value="">Asset Type</option>
              <option value="Laptop">Laptop</option>
              <option value="Server">Server</option>
              <option value="Peripheral">Peripheral</option>
              <option value="Mobile">Mobile</option>
            </select>
            <select x-model="filters.lifecycleState" @change="applyFilters()" class="h-[36px] px-3 py-2 text-[13px] rounded-lg border border-[#e2e8f0] bg-white text-[#1e293b] focus:outline-none focus:border-[#1e40af] cursor-pointer">
              <option value="">Lifecycle</option>
              <option value="Deployed">Deployed</option>
              <option value="In Stock">In Stock</option>
              <option value="In Repair">In Repair</option>
              <option value="Pending Disposal">Pending Disposal</option>
              <option value="Retired">Retired</option>
            </select>
            <button @click="clearAllFilters()" class="text-[13px] text-[#1e40af] hover:underline cursor-pointer font-medium ml-1">Clear Filters</button>
          </div>
        </div>

        <!-- LIST TABLE CARD -->
        <div class="bg-white rounded-xl border border-[#e2e8f0] shadow-xs flex-1 flex flex-col overflow-hidden relative">
          
          <!-- BULK ACTIONS STICKY BAR -->
          <div x-show="selectedRowIds.length > 0" x-cloak class="sticky top-0 z-20 bg-[#1e40af] text-white px-3.5 py-2 flex items-center justify-between shadow-md">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span class="font-bold text-xs tabular-nums" x-text="selectedRowIds.length + ' selected'"></span>
              </div>
              <span class="text-blue-300">|</span>
              <div class="flex items-center gap-1.5">
                <button @click="bulkAssign()" class="px-2.5 py-1 rounded bg-blue-800 hover:bg-blue-700 text-slate-100 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer">
                  <i data-lucide="user" class="w-3.5 h-3.5 text-blue-300"></i>
                  <span>Assign</span>
                </button>
                <button @click="bulkExport()" class="px-2.5 py-1 rounded bg-blue-800 hover:bg-blue-700 text-slate-100 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer">
                  <i data-lucide="download" class="w-3.5 h-3.5 text-blue-300"></i>
                  <span>Export</span>
                </button>
                <button @click="confirmBulkDelete()" class="px-2.5 py-1 rounded bg-rose-900/60 hover:bg-rose-900 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5 text-rose-300"></i>
                  <span>Delete</span>
                </button>
              </div>
            </div>
            <button @click="selectedRowIds = []" class="text-xs text-blue-200 hover:text-white underline font-medium cursor-pointer">
              Clear selection
            </button>
          </div>

          <div class="overflow-x-auto flex-1">
            <table class="w-full text-left text-[13px]">
              <thead class="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] select-none">
                <tr>
                  <th class="px-4 py-3 w-[30px]">
                    <input type="checkbox" @change="toggleSelectAll($event)" :checked="isAllSelected" class="rounded text-[#1e40af]">
                  </th>
                  <template x-for="colKey in selectedDisplayColumns" :key="colKey">
                    <th class="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[#64748b] hover:text-[#1e40af] whitespace-nowrap cursor-pointer" x-text="getColumnLabel(colKey)"></th>
                  </template>
                  <th class="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[#64748b] text-center w-16">Age</th>
                  <th class="w-10 px-2 py-3 text-right"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e2e8f0]">
                <template x-for="record in pagedRecords" :key="record.name">
                  <tr class="h-[48px] bg-white border-b border-[#e2e8f0] text-[13px] font-normal text-[#1e293b] hover:bg-white transition-colors">
                    <td class="px-4 py-3 w-[30px]" @click.stop>
                      <input type="checkbox" :value="record.name" x-model="selectedRowIds" class="rounded text-[#1e40af]">
                    </td>
                    <template x-for="colKey in selectedDisplayColumns" :key="colKey">
                      <td class="px-4 py-3 whitespace-nowrap">
                        <template x-if="colKey === 'asset_name'">
                          <div class="flex items-center gap-2">
                            <a @click.stop="openRecordForm(record)" class="text-[13px] font-normal text-[#1e40af] hover:font-semibold hover:underline cursor-pointer" x-text="record.asset_name"></a>
                            <span class="text-[11px] text-[#64748b] font-mono" x-text="'(' + record.name + ')'"></span>
                          </div>
                        </template>

                        <template x-if="colKey === 'lifecycle_state'">
                          <span :class="getLifecycleBadgeClass(record.lifecycle_state)" class="px-2 py-1 rounded text-[12px] font-medium inline-block select-none" x-text="record.lifecycle_state"></span>
                        </template>

                        <template x-if="colKey === 'compliance'">
                          <span :class="record.compliance === 'Compliant' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#f3f4f6] text-[#374151]'" class="px-2 py-1 rounded text-[12px] font-medium inline-block select-none" x-text="record.compliance"></span>
                        </template>

                        <template x-if="colKey === 'assigned_to_source'">
                          <div class="flex items-center gap-1.5 text-[13px] font-normal text-[#1e293b]">
                            <span :class="record.assigned_to_source === 'Entra ID Sync' ? 'bg-[#1e40af]' : 'bg-[#94a3b8]'" class="w-2 h-2 rounded-full inline-block"></span>
                            <span x-text="record.assigned_to_source"></span>
                          </div>
                        </template>

                        <template x-if="colKey === 'lifecycle_review'">
                          <a @click.stop="showToast('Lifecycle review: ' + (record.lifecycle_review || 'Approved'), 'info')" class="text-[13px] font-normal text-[#1e40af] hover:underline hover:font-semibold cursor-pointer" x-text="record.lifecycle_review || 'Approved'"></a>
                        </template>

                        <template x-if="colKey !== 'asset_name' && colKey !== 'lifecycle_state' && colKey !== 'compliance' && colKey !== 'assigned_to_source' && colKey !== 'lifecycle_review'">
                          <span class="text-[13px] font-normal text-[#1e293b]" x-text="record[colKey] || '—'"></span>
                        </template>
                      </td>
                    </template>
                    <td class="px-4 py-3 text-center text-[12px] text-[#64748b] font-normal whitespace-nowrap" x-text="record.age || '1 w'"></td>
                    <td class="w-10 px-2 py-3 text-right whitespace-nowrap relative" @click.stop>
                      <button @click.stop="toggleRowMenu(record.name)" class="p-1 rounded text-[#64748b] hover:text-[#1e293b] hover:bg-slate-100 transition-all flex items-center justify-center ml-auto cursor-pointer" title="Record actions">
                        <i data-lucide="more-vertical" class="w-4 h-4"></i>
                      </button>

                      <div x-show="activeRowMenuId === record.name" @click.away="activeRowMenuId = null" @keydown.escape.stop="activeRowMenuId = null" x-cloak class="absolute right-2 top-8 w-44 bg-white rounded-lg shadow-xl border border-[#e2e8f0] py-1 z-30 text-left select-none">
                        <button @click.stop="openRecordForm(record)" class="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between text-[#1e293b] hover:text-[#1e40af] cursor-pointer">
                          <span class="font-medium text-xs">Open Form</span>
                        </button>
                        <button @click.stop="duplicateRecord(record)" class="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-[#1e293b] cursor-pointer">
                          <span class="font-medium text-xs">Duplicate</span>
                        </button>
                        <button @click.stop="assignRecordToMe(record)" class="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-[#1e293b] cursor-pointer">
                          <span class="font-medium text-xs">Assign to me</span>
                        </button>
                        <div class="border-t border-[#e2e8f0] my-1"></div>
                        <button @click.stop="confirmDeleteRecord(record)" class="w-full text-left px-3 py-1.5 hover:bg-rose-50 flex items-center gap-2 text-rose-600 cursor-pointer">
                          <span class="font-medium text-xs">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <div class="px-4 py-3 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between text-[12px] text-[#64748b]">
            <div>
              <span x-text="((currentPage - 1) * pageSize + 1) + '-' + Math.min(currentPage * pageSize, filteredRecords.length)"></span>
              <span> of </span>
              <span x-text="filteredRecords.length"></span>
              <span> records</span>
            </div>
            <div class="flex items-center gap-2">
              <button @click="if(currentPage > 1) currentPage--" :disabled="currentPage === 1" class="px-3 py-1 rounded border border-[#e2e8f0] bg-white text-[#1e293b] hover:bg-slate-50 disabled:opacity-40 cursor-pointer text-xs">Previous</button>
              <button @click="if(currentPage < totalPages) currentPage++" :disabled="currentPage === totalPages" class="px-3 py-1 rounded border border-[#e2e8f0] bg-white text-[#1e293b] hover:bg-slate-50 disabled:opacity-40 cursor-pointer text-xs">Next</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ======================================================== -->
      <!-- PAGE 3: IT ASSET FORM VIEW                               -->
      <!-- ======================================================== -->
      <section x-show="currentView === 'it-form' && currentRecord" class="w-full max-w-[1800px] p-6 flex flex-col gap-4">
        
        <!-- Header Actions Bar -->
        <div class="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <button @click="setView('it-list')" class="p-1.5 rounded-lg border border-[#e2e8f0] hover:bg-slate-100 text-[#64748b] transition-colors cursor-pointer" title="Back to IT Assets list">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
            </button>
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h1 class="text-lg font-bold text-[#1e293b]" x-text="(currentRecord?.name || 'ITA-00601') + ' - ' + (currentRecord?.asset_name || 'Lenovo ThinkPad X1 Carbon Gen 11')"></h1>
                <span class="px-2 py-0.5 rounded bg-blue-50 text-[#1e40af] text-[10px] font-bold border border-blue-200">DocType: IT Asset</span>
                <span :class="isFormDirty ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300'" class="px-2 py-0.5 rounded-full text-[10px] font-bold border">
                  <span x-text="isFormDirty ? 'Not Saved' : 'Saved'"></span>
                </span>
              </div>
              <p class="text-xs text-[#64748b] mt-0.5">Enterprise Hardware Configuration Item &bull; Full Field Property Inspector</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button @click="saveRecordForm()" class="px-4 py-2 rounded-lg bg-[#1e40af] hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Save</span>
            </button>
            <button @click="showToast('Submitted for lifecycle validation', 'success')" class="px-3.5 py-2 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-[#1e293b] font-bold text-xs cursor-pointer">
              Submit
            </button>
            <button @click="showToast('Printing asset spec worksheet', 'info')" class="px-3.5 py-2 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-[#1e293b] font-bold text-xs cursor-pointer">
              Print
            </button>
            <button @click="showToast('Action menu opened', 'info')" class="px-2.5 py-2 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-[#1e293b] font-bold text-xs cursor-pointer">
              More ⋯
            </button>
          </div>
        </div>

        <!-- 70/30 GRID LAYOUT -->
        <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_320px] gap-6 items-start">

          <!-- LEFT COLUMN (70%): 5 FORM SECTIONS -->
          <div class="space-y-6">

            <!-- SECTION 1: BASIC INFORMATION -->
            <div class="bg-white rounded-xl border border-[#e2e8f0] shadow-xs p-5 space-y-4">
              <h3 class="font-bold text-xs text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 flex items-center gap-2 border-l-4 border-[#1e40af] pl-3">
                <span>BASIC INFORMATION</span>
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Asset Name *</label>
                  <input type="text" x-model="currentRecord.asset_name" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs font-semibold focus:ring-1 focus:ring-[#1e40af] bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Asset Code / ID</label>
                  <input type="text" x-model="currentRecord.name" readonly class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs font-mono bg-slate-50 text-[#64748b]">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Asset Type *</label>
                  <select x-model="currentRecord.asset_type" @change="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white font-medium focus:ring-1 focus:ring-[#1e40af]">
                    <option value="Laptop">Laptop</option>
                    <option value="Server">Server</option>
                    <option value="Peripheral">Peripheral</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Desktop">Desktop</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Serial Number</label>
                  <input type="text" x-model="currentRecord.serial_no" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs font-mono bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Lifecycle State *</label>
                  <select x-model="currentRecord.lifecycle_state" @change="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white font-medium focus:ring-1 focus:ring-[#1e40af]">
                    <option value="Deployed">Deployed</option>
                    <option value="In Stock">In Stock</option>
                    <option value="In Repair">In Repair</option>
                    <option value="Pending Disposal">Pending Disposal</option>
                    <option value="Retired">Retired</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Compliance Status *</label>
                  <select x-model="currentRecord.compliance" @change="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white font-medium focus:ring-1 focus:ring-[#1e40af]">
                    <option value="Compliant">Compliant</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- SECTION 2: SPECIFICATIONS -->
            <div class="bg-white rounded-xl border border-[#e2e8f0] shadow-xs p-5 space-y-4">
              <h3 class="font-bold text-xs text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 flex items-center gap-2 border-l-4 border-[#22c55e] pl-3">
                <span>HARDWARE SPECIFICATIONS</span>
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Manufacturer</label>
                  <input type="text" x-model="currentRecord.manufacturer" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Model</label>
                  <input type="text" x-model="currentRecord.model" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Processor / CPU</label>
                  <input type="text" value="Intel Core i7-1365U vPro (10-Core, 5.2GHz)" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Memory / RAM</label>
                  <input type="text" value="32 GB LPDDR5-6400MHz" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Storage</label>
                  <input type="text" value="1 TB PCIe NVMe M.2 SSD" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Operating System</label>
                  <input type="text" value="Windows 11 Pro Enterprise 64-bit" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>
              </div>
            </div>

            <!-- SECTION 3: LIFECYCLE & COMPLIANCE -->
            <div class="bg-white rounded-xl border border-[#e2e8f0] shadow-xs p-5 space-y-4">
              <h3 class="font-bold text-xs text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 flex items-center gap-2 border-l-4 border-[#eab308] pl-3">
                <span>LIFECYCLE &amp; COMMERCIAL</span>
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Purchase Date</label>
                  <input type="date" x-model="currentRecord.purchase_date" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Warranty Expiry Date</label>
                  <input type="date" x-model="currentRecord.warranty_expiry" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Purchase Cost (INR)</label>
                  <input type="number" x-model="currentRecord.purchase_cost" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs font-mono bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Supplier / Vendor</label>
                  <input type="text" x-model="currentRecord.supplier" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Purchase Invoice No</label>
                  <input type="text" x-model="currentRecord.purchase_invoice" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs font-mono bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Last Physical Audit Date</label>
                  <input type="date" x-model="currentRecord.last_audited" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>
              </div>
            </div>

            <!-- SECTION 4: ASSIGNMENT -->
            <div class="bg-white rounded-xl border border-[#e2e8f0] shadow-xs p-5 space-y-4">
              <h3 class="font-bold text-xs text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 flex items-center gap-2 border-l-4 border-[#06b6d4] pl-3">
                <span>ASSIGNMENT &amp; CUSTODY</span>
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Assigned Custodian (UPN)</label>
                  <input type="text" x-model="currentRecord.assigned_to" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Assigned To Source</label>
                  <select x-model="currentRecord.assigned_to_source" @change="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white font-medium focus:ring-1 focus:ring-[#1e40af]">
                    <option value="Manual">Manual (Local override)</option>
                    <option value="Entra ID Sync">Entra ID Sync (Azure AD Graph)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Location</label>
                  <input type="text" x-model="currentRecord.location" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Owning Entity</label>
                  <input type="text" x-model="currentRecord.owning_entity" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-white">
                </div>
              </div>
            </div>

            <!-- SECTION 5: ADDITIONAL INFO -->
            <div class="bg-white rounded-xl border border-[#e2e8f0] shadow-xs p-5 space-y-4">
              <h3 class="font-bold text-xs text-[#1e293b] uppercase tracking-wider border-b border-[#e2e8f0] pb-2 flex items-center gap-2 border-l-4 border-[#8b5cf6] pl-3">
                <span>NETWORK &amp; TECHNICAL IDENTIFIERS</span>
              </h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Hostname</label>
                  <input type="text" x-model="currentRecord.hostname" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs font-mono bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Primary IP Address</label>
                  <input type="text" x-model="currentRecord.primary_ip" @input="isFormDirty = true" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs font-mono bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">MAC Address</label>
                  <input type="text" value="00:1A:2B:3C:4D:5E" class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs font-mono bg-white">
                </div>

                <div>
                  <label class="block text-xs font-semibold text-[#1e293b] mb-1">Discovery Telemetry Agent</label>
                  <input type="text" x-model="currentRecord.discovery_source" readonly class="w-full h-9 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-xs bg-slate-50 text-[#64748b]">
                </div>
              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN (30% - 320px ACTIVITY PANEL) -->
          <div class="w-[320px] shrink-0 space-y-4 sticky top-16">
            
            <div class="bg-white rounded-xl border border-[#e2e8f0] shadow-xs p-4 flex flex-col justify-between" x-data="{ panelTab: 'activity' }">
              <div class="flex items-center border-b border-[#e2e8f0] pb-2 mb-3 text-xs font-bold gap-2">
                <button @click="panelTab = 'activity'" :class="panelTab === 'activity' ? 'text-[#1e40af] border-b-2 border-[#1e40af] pb-1 font-bold' : 'text-[#64748b] hover:text-[#1e293b]'" class="cursor-pointer">
                  Activity
                </button>
                <button @click="panelTab = 'comments'" :class="panelTab === 'comments' ? 'text-[#1e40af] border-b-2 border-[#1e40af] pb-1 font-bold' : 'text-[#64748b] hover:text-[#1e293b]'" class="cursor-pointer">
                  Comments
                </button>
                <button @click="panelTab = 'related'" :class="panelTab === 'related' ? 'text-[#1e40af] border-b-2 border-[#1e40af] pb-1 font-bold' : 'text-[#64748b] hover:text-[#1e293b]'" class="cursor-pointer">
                  Related
                </button>
              </div>

              <div x-show="panelTab === 'activity'" class="space-y-3 max-h-[380px] overflow-y-auto pr-1 text-xs">
                <template x-for="(act, idx) in (currentRecord?.activities || [])" :key="idx">
                  <div class="border-l-2 border-[#1e40af] pl-3 py-1">
                    <div class="font-medium text-[#1e293b] text-xs" x-text="act.text"></div>
                    <div class="text-[10px] text-[#64748b] mt-0.5" x-text="act.time"></div>
                  </div>
                </template>
              </div>

              <div x-show="panelTab === 'comments'" class="space-y-3 text-xs">
                <textarea x-model="newCommentText" rows="3" placeholder="Add a comment on this record..." class="w-full p-2.5 rounded-lg border border-[#e2e8f0] text-xs focus:ring-1 focus:ring-[#1e40af] bg-slate-50/50"></textarea>
                <button @click="addComment()" class="w-full py-2 bg-[#1e40af] hover:bg-blue-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer">
                  <i data-lucide="send" class="w-3.5 h-3.5"></i>
                  <span>Send Comment</span>
                </button>
              </div>

              <div x-show="panelTab === 'related'" class="space-y-2 text-xs text-[#64748b]">
                <div class="p-2.5 rounded bg-slate-50 border border-[#e2e8f0]">
                  <span class="font-bold text-[#1e293b] block">M365 Enterprise E5</span>
                  <span class="text-[10px]">Linked License &bull; Active Seat</span>
                </div>
                <div class="p-2.5 rounded bg-slate-50 border border-[#e2e8f0]">
                  <span class="font-bold text-[#1e293b] block">INC-2024-0091</span>
                  <span class="text-[10px]">Open Ticket &bull; Trackpad diagnostic</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- ======================================================== -->
      <!-- VIEW D: REUSABLE REPORT PAGE TEMPLATE                    -->
      <!-- ======================================================== -->
      <section x-show="currentView === 'report' && currentReport" class="p-4 space-y-4 flex-1 flex flex-col max-w-[1800px] w-full">
        <div class="bg-white p-3.5 rounded-xl border border-[#e2e8f0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base font-bold text-[#1e293b]" x-text="currentReport?.title"></h1>
              <template x-if="currentReport?.docType">
                <span class="font-mono text-[10px] bg-blue-50 text-[#1e40af] border border-blue-200 px-2 py-0.5 rounded-md font-bold" x-text="'DocType: ' + currentReport.docType"></span>
              </template>
              <span class="text-slate-400 text-xs">&bull;</span>
              <span class="text-[#64748b] text-xs font-mono font-bold" x-text="filteredReportRows.length + ' rows'"></span>
            </div>
            <p class="text-[11px] text-[#64748b] mt-0.5" x-text="currentReport?.description"></p>
          </div>
          <div class="flex items-center gap-2">
            <button @click="refreshReport()" class="p-1.5 rounded-lg border border-[#e2e8f0] hover:bg-slate-100 text-[#64748b] transition-colors cursor-pointer" title="Refresh">
              <i data-lucide="rotate-cw" class="w-4 h-4"></i>
            </button>
            <button @click="exportReport()" class="px-3 py-1.5 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-[#1e293b] font-medium text-xs flex items-center gap-1.5 cursor-pointer">
              <i data-lucide="download" class="w-3.5 h-3.5 text-[#64748b]"></i>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <template x-for="(kpi, kIdx) in (currentReport?.kpis || [])" :key="kIdx">
            <div :class="kpi.color === 'red' ? 'border-l-4 border-[#ef4444]' : kpi.color === 'amber' ? 'border-l-4 border-[#f59e0b]' : kpi.color === 'emerald' ? 'border-l-4 border-[#22c55e]' : 'border-l-4 border-[#1e40af]'" class="p-3.5 rounded-xl border-y border-r border-[#e2e8f0] bg-white shadow-xs">
              <span class="text-[10px] uppercase font-bold text-[#64748b]" x-text="kpi.label"></span>
              <div :class="kpi.color === 'red' ? 'text-[#ef4444]' : kpi.color === 'amber' ? 'text-[#f59e0b]' : kpi.color === 'emerald' ? 'text-[#22c55e]' : 'text-[#1e40af]'" class="text-2xl font-bold mt-1" x-text="kpi.value"></div>
              <div class="text-[10px] text-[#64748b] mt-0.5" x-text="kpi.change"></div>
            </div>
          </template>
        </div>

        <div class="bg-white rounded-xl border border-[#e2e8f0] shadow-xs flex-1 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 border-b border-[#e2e8f0] text-[#64748b] select-none">
                <tr>
                  <template x-for="col in (currentReport?.columns || [])" :key="col.key">
                    <th @click="sortReport(col.key)" class="px-3 py-2.5 text-[11px] font-bold uppercase text-[#1e293b] hover:text-[#1e40af] whitespace-nowrap cursor-pointer">
                      <span x-text="col.label"></span>
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e2e8f0]">
                <template x-for="(row, rIdx) in filteredReportRows" :key="rIdx">
                  <tr class="h-[56px] hover:bg-[#f8fafc] transition-colors">
                    <template x-for="(col, cIdx) in (currentReport?.columns || [])" :key="col.key">
                      <td class="px-3 py-2 whitespace-nowrap">
                        <span class="font-medium text-[#1e293b]" x-text="row[col.key] || '—'"></span>
                      </td>
                    </template>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

      </section>

    </main>
  </div>

  <!-- HERO FEATURE #1: SLASHBUCKET COLUMNS SLIDE-OVER DRAWER -->
  <div x-show="columnsDrawerOpen" x-cloak class="fixed inset-0 z-50 overflow-hidden" @keydown.escape.window="columnsDrawerOpen = false">
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" @click="columnsDrawerOpen = false"></div>
    <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
      <div class="w-screen max-w-2xl bg-white shadow-2xl flex flex-col justify-between select-none">
        <div class="p-4 bg-[#1e40af] text-white border-b border-blue-900 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="p-2 rounded bg-blue-800 text-white shadow-xs">
              <i data-lucide="columns-3" class="w-5 h-5"></i>
            </div>
            <div>
              <h2 class="text-sm font-bold text-white">Personalize List Columns (ServiceNow Slashbucket)</h2>
              <p class="text-[11px] text-blue-100">Dual-list selector: Drag &amp; drop to move between lists, or click buttons.</p>
            </div>
          </div>
          <button @click="columnsDrawerOpen = false" class="p-1 rounded hover:bg-white/10 text-white cursor-pointer">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="p-5 flex-1 flex flex-col space-y-4 overflow-y-auto">
          <div class="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-[#1e40af] text-[11px] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i data-lucide="info" class="w-4 h-4 text-[#1e40af] shrink-0"></i>
              <span>Drag &amp; drop fields between available and selected lists, or double-click. <strong>Asset Name</strong> is locked.</span>
            </div>
            <button @click="resetColumnsToDefault()" class="text-[#1e40af] hover:underline font-bold cursor-pointer">Reset Defaults</button>
          </div>

          <div class="grid grid-cols-12 gap-2 flex-1 min-h-[360px]">
            <div class="col-span-5 flex flex-col border border-[#e2e8f0] rounded-lg p-2.5 bg-slate-50 shadow-xs"
                 @dragover.prevent="dragOverBucket = 'available'"
                 @drop.prevent="onDropIntoAvailableBucket($event)">
              <div class="font-bold text-[#1e293b] text-xs mb-1 flex items-center justify-between">
                <span>Available Fields</span>
                <span class="font-mono text-[10px] bg-slate-200 text-[#1e293b] px-1.5 py-0.2 rounded font-bold" x-text="filteredAvailableColumns.length"></span>
              </div>
              <input type="text" x-model="columnSearchQuery" placeholder="Filter fields..." class="w-full px-2 py-1 mb-2 rounded border border-[#e2e8f0] text-xs bg-white">
              <div class="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
                <template x-for="field in filteredAvailableColumns" :key="field.key">
                  <div draggable="true"
                       @dragstart="onDragStartAvailable($event, field.key)"
                       @click="toggleSelectAvailable(field.key)" 
                       @dblclick="moveColumnRight(field.key)" 
                       :class="selectedInAvailable.includes(field.key) ? 'bg-[#1e40af] text-white font-bold' : 'bg-white border-[#e2e8f0] text-[#1e293b] hover:bg-blue-50'"
                       class="px-2.5 py-1.5 rounded-lg border text-xs cursor-grab flex items-center justify-between transition-all select-none">
                    <span class="truncate" x-text="field.label"></span>
                    <button @click.stop="moveColumnRight(field.key)" class="text-xs shrink-0 cursor-pointer">&rarr;</button>
                  </div>
                </template>
              </div>
            </div>

            <div class="col-span-2 flex flex-col items-center justify-center gap-2">
              <button @click="moveSelectedRight()" class="w-9 h-9 rounded bg-white hover:bg-blue-50 border border-[#e2e8f0] font-bold text-[#1e40af] disabled:opacity-40 cursor-pointer" :disabled="selectedInAvailable.length === 0">&gt;</button>
              <button @click="moveSelectedLeft()" class="w-9 h-9 rounded bg-white hover:bg-blue-50 border border-[#e2e8f0] font-bold text-[#1e40af] disabled:opacity-40 cursor-pointer" :disabled="selectedInChosen.length === 0">&lt;</button>
            </div>

            <div class="col-span-5 flex flex-col border border-[#e2e8f0] rounded-lg p-2.5 bg-slate-50 shadow-xs"
                 @dragover.prevent="dragOverBucket = 'selected'"
                 @drop.prevent="onDropIntoSelectedBucket($event)">
              <div class="font-bold text-[#1e293b] text-xs mb-1 flex items-center justify-between">
                <span>Selected Display Columns</span>
                <span class="font-mono text-[10px] bg-blue-100 text-[#1e40af] px-1.5 py-0.2 rounded font-bold" x-text="draftSelectedColumns.length"></span>
              </div>
              <div class="flex-1 overflow-y-auto space-y-1.5 pr-0.5 pt-2">
                <template x-for="(colKey, index) in draftSelectedColumns" :key="colKey">
                  <div :draggable="colKey !== 'asset_name'"
                       @dragstart="onDragStartSelected($event, colKey, index)"
                       @click="toggleSelectChosen(colKey)" 
                       @dblclick="colKey !== 'asset_name' ? moveColumnLeft(colKey) : null" 
                       :class="selectedInChosen.includes(colKey) ? 'bg-[#1e40af] text-white font-bold' : 'bg-white border-[#e2e8f0] text-[#1e293b]'"
                       class="px-2.5 py-1.5 rounded-lg border text-xs flex items-center justify-between transition-all select-none">
                    <span class="truncate" x-text="getColumnLabel(colKey)"></span>
                    <template x-if="colKey === 'asset_name'">
                      <span class="text-[9px] px-1 py-0.2 rounded bg-slate-200 text-slate-700 font-bold shrink-0">🔒 Locked</span>
                    </template>
                    <template x-if="colKey !== 'asset_name'">
                      <button @click.stop="moveColumnLeft(colKey)" class="text-xs shrink-0 cursor-pointer">✕</button>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-slate-50 border-t border-[#e2e8f0] flex items-center justify-between">
          <button @click="resetColumnsToDefault()" class="px-3 py-1.5 rounded border border-[#e2e8f0] bg-white text-[#1e293b] font-medium text-xs cursor-pointer">Reset</button>
          <div class="flex gap-2">
            <button @click="columnsDrawerOpen = false" class="px-3 py-1.5 rounded border border-[#e2e8f0] bg-white text-[#1e293b] font-medium text-xs cursor-pointer">Cancel</button>
            <button @click="applyColumnsCustomization()" class="px-4 py-1.5 rounded bg-[#1e40af] hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer">
              <i data-lucide="check" class="w-3.5 h-3.5"></i>
              <span>Apply Columns</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- COMMAND PALETTE (Ctrl+K) -->
  <div x-show="cmdPaletteOpen" x-cloak class="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4" @keydown.escape.window="cmdPaletteOpen = false">
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" @click="cmdPaletteOpen = false"></div>
    <div class="relative bg-white rounded-xl shadow-2xl border border-[#e2e8f0] max-w-lg w-full z-10 overflow-hidden select-none">
      <div class="p-3 border-b border-[#e2e8f0] flex items-center gap-2.5">
        <i data-lucide="search" class="w-4 h-4 text-slate-400"></i>
        <input type="text" x-model="cmdSearchQuery" placeholder="Search commands, CMDB registers, reports, settings..." class="w-full text-xs outline-none bg-transparent" autofocus>
        <kbd class="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-400">ESC</kbd>
      </div>
      <div class="p-2 max-h-80 overflow-y-auto space-y-1 text-xs">
        <button @click="setView('it-dashboard'); cmdPaletteOpen = false" class="w-full px-2.5 py-1.5 rounded hover:bg-blue-50 text-left flex items-center justify-between font-bold text-[#1e40af]">
          <span>IT / ERP Workspace Dashboard</span>
          <span class="text-[10px] text-slate-400 font-mono">/desk/it</span>
        </button>
        <button @click="setView('it-list'); cmdPaletteOpen = false" class="w-full px-2.5 py-1.5 rounded hover:bg-indigo-50 text-left flex items-center justify-between font-bold text-indigo-900">
          <span>IT Assets (CMDB)</span>
          <span class="text-[10px] text-indigo-600 font-mono">DocType: IT Asset</span>
        </button>
      </div>
    </div>
  </div>

  <!-- COMING SOON MODAL -->
  <div x-show="comingSoonModalOpen" x-cloak class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" @click="comingSoonModalOpen = false"></div>
    <div class="relative bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] max-w-sm w-full p-6 text-center z-10 space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-blue-50 text-[#1e40af] flex items-center justify-center mx-auto border border-blue-100">
        <i data-lucide="clock" class="w-6 h-6"></i>
      </div>
      <div>
        <h3 class="text-base font-bold text-[#1e293b]" x-text="comingSoonModuleName + ' Workspace'"></h3>
        <p class="text-[#64748b] text-xs mt-1.5 leading-relaxed">
          The <span class="font-bold text-[#1e293b]" x-text="comingSoonModuleName"></span> module is scheduled on the enterprise roadmap. The <strong>IT Workspace (ERP)</strong> is live and fully functional!
        </p>
      </div>
      <div class="flex gap-2 justify-center pt-2">
        <button @click="comingSoonModalOpen = false" class="px-4 py-2 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-[#1e293b] font-medium text-xs cursor-pointer">
          Close
        </button>
        <button @click="comingSoonModalOpen = false; setView('it-dashboard')" class="px-4 py-2 rounded-lg bg-[#1e40af] hover:bg-blue-800 text-white font-bold text-xs shadow-xs cursor-pointer">
          Open IT Workspace &rarr;
        </button>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATIONS -->
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
    <template x-for="t in toasts" :key="t.id">
      <div class="pointer-events-auto bg-[#1e293b] text-white px-3.5 py-2.5 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2 text-xs">
        <i data-lucide="info" class="w-4 h-4 text-cyan-400"></i>
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
        comingSoonModalOpen: false,
        comingSoonModuleName: '',
        isFormDirty: false,
        newCommentText: '',
        activeFilterTab: 'All',
        currentPage: 1,
        pageSize: 20,
        selectedRowIds: [],
        activeRowMenuId: null,
        isColumnsCustomized: false,

        // Single Active Top-Level Module (default: 'it')
        activeModule: 'it',
        expandedModules: {
          home: false,
          finance: false,
          hr: false,
          it: true,
          security: false,
          helpdesk: false,
          marketing: false,
          wiki: false
        },

        // Single Active Sidebar Item across entire application
        activeItemKey: 'it-assets',

        selectModule(modKey) {
          // Set active top-level module (removes active from all others)
          this.activeModule = modKey;

          // Toggle expansion for clicked module, collapse all others
          Object.keys(this.expandedModules).forEach(k => {
            this.expandedModules[k] = (k === modKey) ? !this.expandedModules[k] : false;
          });

          if (this.sidebarCollapsed) {
            this.sidebarCollapsed = false;
          }

          if (modKey !== 'it' && modKey !== 'home') {
            this.openComingSoon(modKey.toUpperCase());
          }

          this.$nextTick(() => { this.renderIcons(); });
        },

        setActiveSectionItem(p1, p2) {
          // Sets single active item across the ENTIRE sidebar
          const itemKey = p2 || p1;
          this.activeItemKey = itemKey;
          this.$nextTick(() => { this.renderIcons(); });
        },

        // Reports state
        reportConfigs: reportConfigsData,
        currentReportKey: '',
        reportSearchQuery: '',
        reportSortColumn: '',
        reportSortAsc: true,
        selectedReportRow: null,
        selectedReportRowIds: [],

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
        dragOverBucket: null,

        filters: {
          id: '',
          name: '',
          assetType: '',
          lifecycleState: '',
          assetTypes: [],
          lifecycleStates: []
        },

        getLifecycleBadgeClass(s) {
          if (!s) return 'bg-[#f3f4f6] text-[#374151]';
          const text = String(s).toLowerCase();
          if (/deployed|compliant|approved|active/i.test(text)) {
            return 'bg-[#dcfce7] text-[#166534]';
          }
          if (/in stock|in storage/i.test(text)) {
            return 'bg-[#e0f2fe] text-[#075985]';
          }
          if (/in repair|expiring|pending/i.test(text)) {
            return 'bg-[#fef3c7] text-[#92400e]';
          }
          if (/lost|critical|failed/i.test(text)) {
            return 'bg-[#fee2e2] text-[#991b1b]';
          }
          return 'bg-[#f3f4f6] text-[#374151]';
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
          this.$nextTick(() => { this.renderIcons(); });
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
          this.setView('report');
        },

        get currentReport() {
          return this.reportConfigs[this.currentReportKey] || null;
        },

        get filteredReportRows() {
          if (!this.currentReport) return [];
          let rows = [...(this.currentReport.rows || [])];
          if (this.reportSearchQuery.trim()) {
            const q = this.reportSearchQuery.toLowerCase();
            rows = rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
          }
          return rows;
        },

        getStatusPillClass(s) {
          if (!s) return 'bg-slate-100 text-slate-700 border-slate-200';
          const text = String(s).toLowerCase();

          if (/deployed|compliant|approved|active|verified|completed/i.test(text)) {
            return 'bg-[#dcfce7] text-[#166534] border border-emerald-200';
          }
          if (/in stock|in storage|azure|entra/i.test(text)) {
            return 'bg-[#e0f2fe] text-[#075985] border border-sky-200';
          }
          if (/in repair|expiring|due|pending|review|attention/i.test(text)) {
            return 'bg-[#fef3c7] text-[#92400e] border border-amber-200';
          }
          if (/lost|overdue|critical|failed|high|non-compliant/i.test(text)) {
            return 'bg-[#fee2e2] text-[#991b1b] border border-rose-200';
          }
          return 'bg-[#f3f4f6] text-[#374151] border border-slate-200';
        },

        isWarningOrSeverityStatus(s) {
          if (!s) return false;
          return /critical|high|urgent|overdue|in repair|pending disposal|alert|lost|non-compliant|at risk/i.test(String(s));
        },

        showToast(msg, type = 'info') {
          const id = Date.now();
          this.toasts.push({ id, message: msg, type });
          setTimeout(() => {
            this.toasts = this.toasts.filter(t => t.id !== id);
          }, 3000);
        },

        getRouteLabel() {
          if (this.currentView === 'launcher') return '/desk/launcher';
          if (this.currentView === 'it-dashboard') return '/desk/it';
          if (this.currentView === 'it-list') return '/desk/list/it-asset';
          if (this.currentView === 'it-form') return '/desk/form/' + (this.currentRecord?.name || 'ITA-00600');
          if (this.currentView === 'report' && this.currentReportKey) return '/desk/it/' + this.currentReportKey;
          return '/desk';
        },

        openRecordForm(rec) {
          this.activeRowMenuId = null;
          this.currentRecord = JSON.parse(JSON.stringify(rec));
          this.isFormDirty = false;
          this.setView('it-form');
        },

        generateRecords() {
          const list = [];
          const seeds = [
            { name: "Lenovo ThinkPad X1 Carbon Gen 11 21HM004FUS", type: "Laptop", mfg: "Lenovo", model: "X1 Carbon" },
            { name: "Dell Latitude 5440 Core i7-1365U 32GB", type: "Laptop", mfg: "Dell", model: "Latitude 5440" },
            { name: "Apple MacBook Pro 16\\" M3 Max 64GB 1TB", type: "Laptop", mfg: "Apple", model: "MacBook Pro" },
            { name: "Dell PowerEdge R750xs 2U Rack Server", type: "Server", mfg: "Dell", model: "R750xs" },
            { name: "Dell wireless mouse 04WJ8P CN-04WJ8P-LO300", type: "Peripheral", mfg: "Dell", model: "04WJ8P Wireless" },
            { name: "Apple iPhone 15 Pro Enterprise 256GB", type: "Mobile", mfg: "Apple", model: "iPhone 15 Pro" }
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
              activities: [
                { text: 'Syed Hashim updated Primary IP to 10.142.12.' + (100 + i), time: '2 hours ago' },
                { text: 'Physical Audit verified by Ananya Roy', time: '3 days ago' },
                { text: 'Entra ID Sync matched UPN for ' + employees[i % employees.length], time: '3 weeks ago' }
              ]
            });
          }
          this.records = list;
        },

        get filteredRecords() {
          return this.records.filter(r => {
            if (this.activeFilterTab !== 'All') {
              if (this.activeFilterTab === 'Deployed' && r.lifecycle_state !== 'Deployed') return false;
              if (this.activeFilterTab === 'In Storage' && r.lifecycle_state !== 'In Stock' && r.lifecycle_state !== 'In Storage') return false;
              if (this.activeFilterTab === 'In Maintenance' && r.lifecycle_state !== 'In Repair') return false;
              if (this.activeFilterTab === 'Lost' && r.lifecycle_state !== 'Lost' && r.lifecycle_state !== 'Pending Disposal') return false;
              if (this.activeFilterTab === 'Retired' && r.lifecycle_state !== 'Retired') return false;
            }
            if (this.filters.id && !r.name.toLowerCase().includes(this.filters.id.toLowerCase())) return false;
            if (this.filters.name && !r.asset_name.toLowerCase().includes(this.filters.name.toLowerCase())) return false;
            if (this.filters.assetType && r.asset_type !== this.filters.assetType) return false;
            if (this.filters.lifecycleState && r.lifecycle_state !== this.filters.lifecycleState) return false;
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
          this.activeFilterTab = 'All';
          this.filters = { id: '', name: '', assetType: '', lifecycleState: '', assetTypes: [], lifecycleStates: [] };
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
            asset_name: "New Lenovo Laptop Asset",
            asset_type: "Laptop",
            assigned_to: "Syed Hashim",
            assigned_to_source: "Manual",
            compliance: "Compliant",
            lifecycle_review: "Approved",
            lifecycle_state: "In Stock",
            serial_no: 'SN-NEW-' + Date.now().toString().slice(-6),
            manufacturer: "Lenovo",
            model: "ThinkPad X1",
            purchase_date: '2024-10-01',
            purchase_cost: 95000,
            supplier: "SBM Computers",
            warranty_expiry: "2027-10-01",
            location: "Bangalore Campus",
            owning_entity: "ProficientNow Global Corp",
            hostname: 'blr-lap-' + newId.toLowerCase() + '.internal.corp',
            primary_ip: "10.142.12.99",
            age: "just now",
            activities: [
              { text: "Syed Hashim created draft asset in register", time: "just now" }
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
          this.showToast('Comment added', 'info');
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
        },

        moveColumnLeft(key) {
          if (key === 'asset_name') return;
          this.draftSelectedColumns = this.draftSelectedColumns.filter(k => k !== key);
          this.selectedInChosen = this.selectedInChosen.filter(k => k !== key);
        },

        moveSelectedRight() {
          this.selectedInAvailable.forEach(key => {
            if (!this.draftSelectedColumns.includes(key)) this.draftSelectedColumns.push(key);
          });
          this.selectedInAvailable = [];
        },

        moveSelectedLeft() {
          this.selectedInChosen.forEach(key => {
            if (key !== 'asset_name') {
              this.draftSelectedColumns = this.draftSelectedColumns.filter(k => k !== key);
            }
          });
          this.selectedInChosen = [];
        },

        // Drag and drop for Slashbucket
        onDragStartAvailable(e, key) {
          e.dataTransfer.setData('text/plain', JSON.stringify({ source: 'available', key }));
        },

        onDragStartSelected(e, key, index) {
          if (key === 'asset_name') return;
          e.dataTransfer.setData('text/plain', JSON.stringify({ source: 'selected', key, index }));
        },

        onDropIntoAvailableBucket(e) {
          const dataStr = e.dataTransfer.getData('text/plain');
          if (!dataStr) return;
          try {
            const data = JSON.parse(dataStr);
            if (data.source === 'selected' && data.key !== 'asset_name') {
              this.moveColumnLeft(data.key);
            }
          } catch(err){}
        },

        onDropIntoSelectedBucket(e) {
          const dataStr = e.dataTransfer.getData('text/plain');
          if (!dataStr) return;
          try {
            const data = JSON.parse(dataStr);
            if (data.source === 'available') {
              this.moveColumnRight(data.key);
            }
          } catch(err){}
        },

        resetColumnsToDefault() {
          this.draftSelectedColumns = ['asset_name', 'asset_type', 'assigned_to', 'assigned_to_source', 'compliance', 'lifecycle_review', 'lifecycle_state'];
          this.selectedInAvailable = [];
          this.selectedInChosen = [];
        },

        applyColumnsCustomization() {
          this.selectedDisplayColumns = [...this.draftSelectedColumns];
          this.isColumnsCustomized = true;
          this.columnsDrawerOpen = false;
          this.showToast('List view columns updated', 'success');
        },

        toggleRowMenu(id) {
          this.activeRowMenuId = this.activeRowMenuId === id ? null : id;
        },

        closeAllOverlays() {
          this.cmdPaletteOpen = false;
          this.columnsDrawerOpen = false;
          this.comingSoonModalOpen = false;
          this.activeRowMenuId = null;
        }
      };
    }
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', htmlContent);
console.log('Successfully generated index.html!');

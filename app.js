const focusAreas = [
  ['F/S','Full-Stack Product Engineering','User-facing applications with reusable components, clean routing, API-backed workflows, responsive UI, and maintainable frontend architecture.','0.8 0.13 200'],
  ['API','Backend API Design','REST APIs, service layers, validation logic, authentication-ready flows, request/response contracts, and modular backend services.','0.7 0.15 262'],
  ['AI','AI Application Workflows','AI-powered features using structured inputs, LLM APIs, prompt workflows, tool-calling concepts, RAG, and human-in-the-loop patterns.','0.72 0.15 300'],
  ['SF','Salesforce Platform Engineering','Business logic, UI components, automation, data models, and enterprise workflows using Apex, LWC, Flows, SFDX, and platform tools.','0.8 0.14 90'],
  ['iP','iPaaS & Integration Architecture','Integration layers connecting internal apps with external systems via REST/SOAP, middleware patterns, data mapping, retries, and secure auth.','0.78 0.13 162'],
  ['CI','CI/CD & Release Engineering','Source-controlled deployments, environment promotion, build validation, release coordination, and rollback awareness with Git, SFDX, and CI/CD.','0.75 0.13 30'],
  ['PF','Performance & Optimization','Cleaner, more efficient code, reduced duplicate logic, improved query patterns, optimized API flows, and platform/governor-limit awareness.','0.74 0.14 340'],
  ['PR','Production Readiness','Logging, validation, error handling, monitoring, security, access control, data quality, environment separation, and maintainability.','0.72 0.14 160']
];

const projects = [
  {
    id:'fitness', title:'Agentic Fitness Coach', category:'AI Application - Full-Stack - Backend APIs', status:'In Progress', statusClass:'st-prog', mock:'fitness',
    desc:'An AI-powered fitness platform combining workout tracking, nutrition logging, progress dashboards, and goal-based recommendations using structured user data and LLM-powered workflows.',
    tags:['Next.js','NestJS','PostgreSQL','Prisma','Redis','LLM Tool Calling'],
    features:['AI-generated, goal-aware training recommendations','Workout, nutrition, and progression tracking','Analytics dashboards from structured data'],
    secondary:'Demo Coming Soon',
    pattern:'Frontend dashboard -> Backend API -> Fitness data model -> AI workflow layer -> Recommendation output',
    problem:'Most fitness apps track data but rarely reason about it. Users are left to interpret progress and design plans without an adaptive coaching layer.',
    built:['A user-facing dashboard separated from backend service logic.','Structured workout and nutrition data models built for future analytics.','AI workflows for recommendations instead of hardcoded static plans.'],
    decisions:['Separate dashboard UI from service logic.','Store structured workout and nutrition data for analytics.','Use validated AI responses instead of free-form suggestions.','Keep modular services for workouts, nutrition, goals, and AI feedback.'],
    prodNotes:['Input validation','User-specific data models','Structured AI responses','AI/API error handling'],
    challenges:['Grounding LLM suggestions in logged user data.','Designing tool interfaces that safely operate on structured records.'],
    learned:['Structuring agentic workflows around real state.','Balancing LLM output with deterministic guardrails.'],
    future:['Full tool-based agents and third-party integrations.','Wearable data ingestion for automatic tracking.']
  },
  {
    id:'health', title:'Healthcare Insurance Platform', category:'Full-Stack - Backend APIs - Healthcare Workflows', status:'Completed', statusClass:'st-done', mock:'health',
    desc:'A healthcare insurance platform focused on frontend workflows, backend services, database-backed records, and modular API-driven architecture.',
    tags:['Next.js','NestJS','MongoDB','REST APIs','TypeScript'],
    features:['User-facing healthcare workflows','API-driven, modular backend architecture','Authentication-ready, database-backed records'],
    secondary:'Private Repo',
    pattern:'Next.js frontend -> NestJS API layer -> Service layer -> MongoDB records',
    problem:'Insurance operations involve members, claims, and policies that must stay consistent across frontend workflows and backend services.',
    built:['A modular Next.js frontend for healthcare and insurance workflows.','A NestJS API layer with clear separation between frontend and backend.','Database-backed insurance records with an authentication-ready structure.'],
    decisions:['Separate frontend and backend responsibilities.','Use REST APIs for user and insurance workflows.','Model healthcare records in a database.','Keep services modular for claims, users, policies, and auth-ready flows.'],
    prodNotes:['API validation','Database-backed workflows','Modular backend structure','Environment configuration'],
    challenges:['Modeling insurance records and claim states cleanly.','Keeping frontend and backend concerns separated.'],
    learned:['Designing API-driven architectures with clear module boundaries.','Working with TypeScript end to end across Next.js and NestJS.'],
    future:['Role-based access control and audit logging.','Claims processing automation and dashboards.']
  },
  {
    id:'chat', title:'Real-Time Chat Application', category:'Full-Stack - Real-Time Systems - WebSockets', status:'Completed', statusClass:'st-done', mock:'chat',
    desc:'A real-time messaging application built with MERN and Socket.io for instant communication, live chat sessions, and responsive user interactions.',
    tags:['MongoDB','Express','React','Node.js','Socket.io'],
    features:['Real-time WebSocket messaging','Chat rooms and direct messaging','Authentication-ready structure'],
    secondary:'Demo Coming Soon',
    pattern:'React frontend -> Node/Express API -> Socket.io event layer -> MongoDB',
    problem:'Request/response HTTP falls short for live conversation. The app needed bidirectional, low-latency messaging with presence and session handling.',
    built:['A MERN-stack app with Socket.io for real-time bidirectional messaging.','Chat rooms and direct messaging with live online-status indicators.','A responsive React UI with an authentication-ready session structure.'],
    decisions:['Use WebSockets for live messaging.','Separate HTTP API logic from socket event handling.','Store messages and user data in MongoDB.'],
    prodNotes:['Socket event handling','Message persistence','Connection state awareness','Disconnected-user errors'],
    challenges:['Managing socket lifecycles and presence across reconnects.','Keeping message state consistent between socket events and the database.'],
    learned:['Event-driven architecture and WebSocket communication patterns.','Handling real-time state and optimistic UI updates.'],
    future:['Read receipts and typing indicators.','Media sharing and end-to-end encryption.']
  },
  {
    id:'sfplatform', title:'Salesforce Enterprise Platform Work', category:'Platform Engineering - Salesforce - APIs - CI/CD', status:'Completed', statusClass:'st-done', mock:'sf',
    desc:'Enterprise platform engineering experience involving Salesforce application development, business logic, UI components, automation, release management, and external-system integration patterns.',
    tags:['Apex','LWC','Flows','SFDX','REST / SOAP','CI/CD'],
    features:['Reusable Apex service logic and LWC UI','Configurable Flow automation','Decoupled API / middleware integrations'],
    secondary:'Private Repo',
    pattern:'LWC / Flow -> Apex service logic -> Salesforce data model -> iPaaS / API layer -> External systems',
    problem:'Enterprise Salesforce systems must stay maintainable and bulk-safe while integrating cleanly with external platforms.',
    built:['Reusable Apex business logic and Lightning Web Components for platform UI.','Configurable process automation with Flows.','Decoupled integration logic using API and middleware-style patterns.'],
    decisions:['Use Apex for reusable business logic.','Use LWC for platform UI.','Use Flows for configurable automation.','Use SFDX and source control for deployment discipline.'],
    prodNotes:['Governor-limit awareness','Bulk-safe Apex patterns','Validation rules','Environment promotion','Deployment coordination'],
    challenges:['Designing bulk-safe Apex that respects platform limits.','Keeping integrations decoupled from core platform logic.'],
    learned:['Production deployment discipline and release coordination.','Designing platform architecture within platform constraints.'],
    future:['Broader test automation and coverage gates.','More reusable middleware components.']
  },
  {
    id:'poke', title:'Pokedex React App', category:'Frontend - API Integration', status:'Completed', statusClass:'st-done', mock:'poke',
    desc:'A React Pokedex that consumes external Pokemon data and presents it through a clean, interactive UI.',
    tags:['React','JavaScript','REST API','CSS'],
    features:['API data fetching with search and filtering','Detail cards and clean component structure','Responsive frontend design'],
    secondary:'Demo Coming Soon',
    pattern:'React UI -> Fetch / data layer -> PokeAPI -> UI cards',
    problem:'A focused exercise in consuming a public REST API and rendering it through a componentized, responsive interface.',
    built:['A React app that fetches and paginates data from the PokeAPI.','Search, filtering, and detail cards with a clean component hierarchy.','A responsive layout that works across screen sizes.'],
    decisions:['Isolate API access in a dedicated data layer.','Build small reusable components.','Manage loading and error states explicitly.'],
    prodNotes:['Loading states','Error states','Debounced search','Reusable components'],
    challenges:['Handling asynchronous data fetching gracefully.','Structuring reusable components around API-driven data.'],
    learned:['Practical React state management and API integration patterns.','Building reusable component structures.'],
    future:['Favorites, caching, and offline support.','Richer detail views.']
  },
  {
    id:'hpc', title:'High Performance Computing Coursework', category:'Systems - Parallel Computing - C++', status:'Academic Project', statusClass:'st-acad', mock:'hpc',
    desc:'Parallel computing projects using OpenMP, MPI, Monte Carlo simulations, lattice Boltzmann methods, and heat diffusion.',
    tags:['C++','OpenMP','MPI','PBS','Linux','HPC'],
    features:['Parallelized Monte Carlo pi estimation','Strong scaling and speedup analysis','Hybrid heat diffusion simulation'],
    secondary:'Academic Project',
    pattern:'C++ kernel -> OpenMP threads -> MPI ranks -> HPC cluster (PBS)',
    problem:'Serial scientific simulations do not scale. The goal was to parallelize compute-heavy workloads and measure real performance gains on HPC clusters.',
    built:['Parallelized Monte Carlo pi estimation using OpenMP and MPI.','A hybrid heat diffusion simulation combining shared- and distributed-memory models.','Strong-scaling and speedup experiments run on HPC clusters via PBS.'],
    decisions:['Combine shared- and distributed-memory models.','Partition work to balance load across MPI ranks.','Measure strong scaling empirically.'],
    prodNotes:['PBS batch jobs','Performance profiling','Deterministic seeding','Resource-aware scheduling'],
    challenges:['Balancing workload distribution across ranks.','Minimizing communication overhead.'],
    learned:['Parallel-programming models and performance analysis.','Running and profiling workloads on HPC infrastructure.'],
    future:['GPU acceleration with CUDA.','Larger lattice Boltzmann simulations.']
  },
  {
    id:'neuro', title:'NeuroCuts RL Enhancements', category:'Research - Reinforcement Learning - Networking', status:'Prototype', statusClass:'st-proto', mock:'tree',
    desc:'Experiments improving reinforcement learning for packet classification and network decision-tree optimization.',
    tags:['Python','Reinforcement Learning','PPO','Action Masks'],
    features:['PPO-based optimization experiments','Action masking for valid decision paths','Rule-set and decision-tree optimization'],
    secondary:'In Progress',
    pattern:'Rule sets -> PPO agent -> Action mask -> Decision tree -> Benchmarks',
    problem:'Packet classification can be framed as building efficient decision trees. The goal was to improve validity and quality of learned trees.',
    built:['PPO-based optimization experiments over packet-classification rule sets.','Action masking to constrain the agent to valid decision paths.','Benchmarking pipelines analyzing performance, memory, and latency across large rule sets.'],
    decisions:['Encode networking constraints as action masks.','Add structured data collection for reproducible analysis.','Build comparative reporting across algorithms.'],
    prodNotes:['Structured metrics','Reproducible benchmarks','Comparative reporting','Memory and latency profiling'],
    challenges:['Encoding constraints as action masks without breaking learning.','Stabilizing PPO training over sparse rule sets.'],
    learned:['Applying RL to structured systems problems.','How action masking shapes policy learning and validity.'],
    future:['Broader rule-set benchmarks.','Transfer to other tree-structured optimization tasks.']
  }
];

const experience = [
  {
    role:'Software Engineer', company:'Deloitte', focus:'Enterprise Software Engineering - Platform Engineering - APIs - CI/CD', date:'Aug 2022 - Dec 2023',
    desc:'Worked on production enterprise software systems involving application development, backend business logic, UI components, automation workflows, API integrations, release management, and CI/CD processes supporting enterprise operations across 10M+ records and 20+ production releases.',
    highlights:['Built and customized application features using Apex, Lightning Web Components, Flows, validation rules, object models, and platform automation.','Designed backend-style business logic and reusable service patterns for maintainable, scalable functionality.','Worked with REST/SOAP API integration patterns connecting internal platform data with external enterprise systems.','Contributed to CI/CD and release management using source control, SFDX, deployment pipelines, and environment promotion across dev, QA, UAT, and production.']
  },
  {
    role:'General Engineering Trainee', company:'Vi (Vodafone Idea)', focus:'Backend Microservices - Spring Boot - React - PostgreSQL', date:'Jan 2022 - Jun 2022',
    desc:'Decomposed legacy telecom service-management workflows into domain-oriented microservices and modular frontend modules, improving scalability, maintainability, and operational efficiency.',
    highlights:['Broke legacy workflows into domain-oriented Spring Boot microservices and React modules, improving efficiency by about 25%.','Designed reusable backend API layers and service-specific DTOs to streamline frontend-backend communication.','Engineered secure monitoring services with PostgreSQL, AES-256 encryption, and real-time SLA alerts across 10M+ subscriber records.']
  },
  {
    role:'Backend Intern Project', company:'Practo / Mentormind', focus:'Spring Boot - Healthcare Application', date:'Internship Project',
    desc:'Built a diagnostic booking application using Spring Boot as part of an internship-style project.',
    highlights:['Developed backend APIs for healthcare appointment and diagnostic booking workflows.','Worked with Java, Spring Boot, REST APIs, and database-backed application logic.']
  }
];

const skills = [
  ['Programming Languages','{}','0.8 0.13 200',['JavaScript','TypeScript','Java','Python','C++','SQL','Apex']],
  ['Frontend Engineering','FE','0.7 0.15 262',['React','Next.js','Lightning Web Components','Tailwind CSS','Recharts','Responsive UI','HTML','CSS']],
  ['Backend & APIs','API','0.78 0.13 162',['Node.js','Express.js','NestJS','Spring Boot','FastAPI','REST APIs','SOAP APIs','Microservices','RBAC']],
  ['Databases & Data Modeling','DB','0.72 0.15 300',['PostgreSQL','MySQL','MongoDB','Prisma ORM','SOQL','SOSL','Data Modeling','Query Optimization']],
  ['AI Applications','AI','0.74 0.14 340',['LLM Tool Calling','LangGraph.js','Structured Outputs','Agent Workflows','RAG','Prompt Engineering','AI Evaluation']],
  ['Architecture & System Design','AR','0.72 0.14 160',['Layered Architecture','Service Layer Pattern','API Design','Event-Driven Concepts','iPaaS Layer','Middleware Patterns','Error Handling','Logging']],
  ['Cloud / DevOps / CI-CD','CI','0.75 0.13 30',['Git','GitHub','Bitbucket','SFDX','CI/CD Pipelines','Environment Promotion','Docker Basics','Linux','Postman','Jira']],
  ['Salesforce Platform Engineering','SF','0.8 0.14 90',['Health Cloud','Sales Cloud','Service Cloud','Apex','LWC','Flows','Reports & Dashboards','Data Loader','SFDX']],
  ['Integrations / iPaaS','iP','0.7 0.15 262',['REST APIs','SOAP APIs','Data Mapping','Middleware Flows','Retry Patterns','Error Handling','API Contracts','External System Sync']],
  ['CS Fundamentals','CS','0.72 0.15 300',['Data Structures & Algorithms','Computer Networks','Distributed Systems','High Performance Computing','OpenMP','MPI','Operating Systems Concepts']]
];

const patterns = [
  ['Layered Application Architecture',['Frontend','API Layer','Service Layer','Data Layer'],['Full-stack apps','Backend services','Clear separation of concerns'],'0.8 0.13 200',3],
  ['iPaaS / Middleware Integration Layer',['Application','API Gateway / Middleware','External Systems'],['Data transformation','Request validation','Auth handling','Retry / error handling','Decoupled systems'],'0.78 0.13 162',3],
  ['Event-Driven Workflows',['User Action','Event','Worker / Service','DB Update'],['Async processing','Queue-ready','Background jobs','Non-blocking'],'0.72 0.15 300',2],
  ['CI/CD Release Flow',['Feature Branch','Pull Request','Build / Test','Staging','Production'],['Source control','Automated validation','Environments','Rollback awareness'],'0.75 0.13 30',2],
  ['AI Workflow Architecture',['User Input','Context Builder','LLM','Tool / API Call','Structured Output','UI'],['Prompt templates','Structured JSON','Tool calling','RAG-ready','Human review'],'0.7 0.15 262',2],
  ['Salesforce Platform Architecture',['LWC / Flow','Apex Service Layer','Salesforce Data Model','iPaaS / API Layer','External Systems'],['Apex business logic','LWC components','Flow automation','SFDX deployments','API integrations'],'0.8 0.14 90',6]
];

const certs = [
  ['SF','Salesforce Administrator','Certified'],['PD','Platform Developer I','Certified'],['AB','Salesforce App Builder','Certified'],['AP','Deloitte Applause Award','Recognition'],['GH','Green Hoodie Nomination','Deloitte'],['200k','200k+ Trailhead Points','Salesforce'],['RL','Published Research Paper','Deep RL - Robotics']
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

function mockMarkup(type) {
  if (type === 'fitness') return `<div class="fx jb ac" style="margin-bottom:12px"><div class="mk-bar" style="width:90px"></div><div class="chip">AI Coach</div></div><div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px"><div class="mk-tile"><div class="mk-kpi acc-cyan">48</div><div class="mk-kl">workouts</div></div><div class="mk-tile"><div class="mk-kpi acc-emerald">1.8k</div><div class="mk-kl">kcal/day</div></div><div class="mk-tile"><div class="mk-kpi acc-purple">92%</div><div class="mk-kl">goal</div></div></div><div class="mk-tile"><div class="bars"><i style="height:40%"></i><i style="height:60%"></i><i style="height:52%"></i><i style="height:75%"></i><i style="height:66%"></i><i style="height:88%"></i><i style="height:80%"></i></div></div>`;
  if (type === 'health') return `<div class="fx jb ac" style="margin-bottom:12px"><div class="mk-bar" style="width:80px"></div><span class="chip">API online</span></div><div class="grid" style="grid-template-columns:1fr 1fr;gap:8px"><div class="mk-tile"><div class="mk-kpi acc-cyan">1,204</div><div class="mk-kl">members</div></div><div class="mk-tile"><div class="mk-kpi acc-emerald">318</div><div class="mk-kl">active claims</div></div><div class="mk-tile"><div class="mk-kpi acc-purple">96</div><div class="mk-kl">policies</div></div><div class="mk-tile"><div class="mk-kpi acc-blue">4</div><div class="mk-kl">API services</div></div></div>`;
  if (type === 'chat') return `<div class="fx gap8" style="height:100%"><div style="width:34%;border-right:1px solid rgba(255,255,255,.08);padding-right:8px"><div class="fx ac gap8" style="margin-bottom:8px"><span class="dot"></span><span style="font-size:10px;color:#c3cde0">3 online</span></div><div class="mk-bar" style="width:100%;margin-bottom:7px"></div><div class="mk-bar" style="width:70%;margin-bottom:7px"></div><div class="mk-bar" style="width:85%"></div></div><div style="display:flex;flex-direction:column;justify-content:flex-end;gap:8px;flex:1"><div class="msg msg-in">is the socket live?</div><div class="msg msg-out">yes, real-time now</div><div class="msg msg-in">nice work</div></div></div>`;
  if (type === 'sf') return `<div class="ws-panel" style="padding:11px 13px;margin-bottom:9px"><div class="term"><span class="p">$ </span><span class="c">sfdx</span> force:source:deploy<br><span class="p"># deploying 24 components...</span><br><span class="g">ok ApexClass</span> <span class="g">ok LWC</span> <span class="g">ok Flow</span><br><span class="y">Deploy: Succeeded</span> <span class="p">| tests 89% cov</span></div></div><div class="ws-badges"><span class="ws-b"><i style="background:oklch(0.78 0.13 162)"></i>Apex</span><span class="ws-b"><i style="background:oklch(0.7 0.15 262)"></i>LWC</span><span class="ws-b"><i style="background:oklch(0.82 0.14 90)"></i>Flow</span><span class="ws-b"><i style="background:oklch(0.78 0.13 162)"></i>REST/SOAP</span></div>`;
  if (type === 'poke') return `<div class="fx jb ac" style="margin-bottom:10px"><div class="mk-bar" style="width:70px"></div><span class="chip">GET /pokemon</span></div><div class="grid" style="grid-template-columns:repeat(4,1fr);gap:8px"><div class="mk-tile tc"><div style="width:26px;height:26px;border-radius:50%;margin:0 auto 5px;background:oklch(0.78 0.13 162)"></div><div class="mk-kl">Bulbasaur</div></div><div class="mk-tile tc"><div style="width:26px;height:26px;border-radius:50%;margin:0 auto 5px;background:oklch(0.75 0.13 30)"></div><div class="mk-kl">Charmander</div></div><div class="mk-tile tc"><div style="width:26px;height:26px;border-radius:50%;margin:0 auto 5px;background:oklch(0.72 0.14 200)"></div><div class="mk-kl">Squirtle</div></div><div class="mk-tile tc"><div style="width:26px;height:26px;border-radius:50%;margin:0 auto 5px;background:oklch(0.8 0.14 90)"></div><div class="mk-kl">Pikachu</div></div></div>`;
  if (type === 'hpc') return `<div class="term"><span class="p">$ </span><span class="c">mpirun</span> -np 16 ./montecarlo_pi<br><span class="p"># estimating pi via Monte Carlo...</span><br><span class="g">pi ~= 3.14159</span> <span class="p">| err 2.1e-5</span><br><span class="y">speedup</span> 13.8x <span class="p">| eff 86%</span></div><div class="bars" style="margin-top:10px;height:34px"><i style="height:20%"></i><i style="height:38%"></i><i style="height:60%"></i><i style="height:78%"></i><i style="height:92%"></i><i style="height:100%"></i></div>`;
  return `<div class="tree"><div class="tnode on" style="left:44%;top:6px">R</div><div class="tedge" style="left:47%;top:20px;width:60px;transform:rotate(48deg)"></div><div class="tedge" style="left:47%;top:20px;width:60px;transform:rotate(132deg)"></div><div class="tnode on" style="left:20%;top:56px">A</div><div class="tnode" style="left:68%;top:56px">B</div><div class="tedge" style="left:23%;top:70px;width:44px;transform:rotate(50deg)"></div><div class="tedge" style="left:23%;top:70px;width:44px;transform:rotate(130deg)"></div><div class="tnode on" style="left:6%;top:106px">ok</div><div class="tnode" style="left:34%;top:106px">x</div><div class="tnode" style="left:56%;top:106px">.</div><div class="tnode on" style="left:80%;top:106px">ok</div><div class="chip" style="position:absolute;right:0;bottom:0">PPO - action mask</div></div>`;
}

function render() {
  document.getElementById('focus-grid').innerHTML = focusAreas.map(([icon,title,desc,c]) => `<div class="focus-card glass reveal" style="--fc:oklch(${c});--fc-bg:oklch(${c}/.16)"><div class="focus-ic">${icon}</div><div class="focus-t">${title}</div><p class="focus-d">${desc}</p></div>`).join('');

  document.getElementById('projects-grid').innerHTML = projects.map((p, i) => `
    <article class="proj-card glass reveal ${i === 0 ? 'proj-feat' : ''}">
      <div class="mock"><div class="status ${p.statusClass}">${escapeHtml(p.status)}</div><div class="mock-pad">${mockMarkup(p.mock)}</div></div>
      <div class="proj-body">
        <span class="proj-cat">${escapeHtml(p.category)}</span>
        <h3 class="proj-title">${escapeHtml(p.title)}</h3>
        <p class="proj-desc">${escapeHtml(p.desc)}</p>
        <div class="chiprow" style="margin-top:14px">${p.tags.map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('')}</div>
        <ul class="feat-list">${p.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
        <div class="proj-foot"><button class="btn btn-primary btn-sm" data-project="${p.id}">Case Study</button><span class="btn btn-ghost btn-sm">${escapeHtml(p.secondary)}</span></div>
      </div>
    </article>`).join('');

  document.getElementById('patterns-grid').innerHTML = patterns.map(([title,nodes,tags,c,span]) => `
    <div class="pat-card glass reveal" style="grid-column:span ${span};--pc:oklch(${c});--pc-bg:oklch(${c}/.16)">
      <div class="pat-t">${escapeHtml(title)}</div>
      <div class="pat-flow">${nodes.map((n,i) => `<span class="pat-node ${i === 0 ? 'hot' : ''}">${escapeHtml(n)}</span>${i < nodes.length - 1 ? '<span class="pat-arrow">-&gt;</span>' : ''}`).join('')}</div>
      <div class="pat-tags">${tags.map(t => `<span class="pat-tag">${escapeHtml(t)}</span>`).join('')}</div>
    </div>`).join('');

  document.getElementById('experience-timeline').innerHTML = experience.map(e => `
    <div class="tl-item reveal"><div class="tl-dot"></div><div class="tl-card glass">
      <div class="tl-top"><div><div class="tl-role">${escapeHtml(e.role)} <span class="tl-co">- ${escapeHtml(e.company)}</span></div><div class="tl-focus">${escapeHtml(e.focus)}</div></div><span class="tl-date">${escapeHtml(e.date)}</span></div>
      <p class="tl-desc">${escapeHtml(e.desc)}</p>
      <ul class="feat-list">${e.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}</ul>
    </div></div>`).join('');

  document.getElementById('skills-grid').innerHTML = skills.map(([name,icon,c,items]) => `
    <div class="skill-cat glass reveal" style="--sc:oklch(${c});--sc-bg:oklch(${c}/.16)">
      <div class="skill-h"><div class="skill-ic">${escapeHtml(icon)}</div><div class="skill-name">${escapeHtml(name)}</div></div>
      <div class="chiprow">${items.map(item => `<span class="chip">${escapeHtml(item)}</span>`).join('')}</div>
    </div>`).join('');

  document.getElementById('education-section').innerHTML = `
    <div class="edu-card glass reveal">
      <div class="fx jb" style="align-items:flex-start"><div><div class="edu-school">University of Illinois Chicago</div><div class="edu-deg">MS in Computer Science</div><div class="edu-meta">Expected Graduation - December 2025</div></div><span class="cert-ic">MS</span></div>
      <div class="mb-label" style="margin-top:22px">Relevant coursework</div>
      <div class="course-grid">${['Algorithms','Advanced Algorithms','Computer Networks','Advanced Computer Networks','High Performance Computing','Algorithms in Computational Biology','Computer Systems Security','Database Management Systems'].map(c => `<span class="course">${c}</span>`).join('')}</div>
    </div>
    <div class="edu-card glass reveal">
      <div class="fx jb" style="align-items:flex-start"><div><div class="edu-school">Chaitanya Bharathi Institute of Technology</div><div class="edu-deg">BE - Computer Science & Engineering</div><div class="edu-meta">Graduated - June 2022</div></div><span class="cert-ic">BE</span></div>
      <div class="glass" style="margin-top:22px;padding:18px;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03)"><span class="muted" style="font-size:13px;font-family:'JetBrains Mono'">CGPA</span><span class="stat-n grad-text2">8.61<span style="font-size:15px;color:#8390a8">/10</span></span></div>
    </div>`;

  document.getElementById('certs-grid').innerHTML = certs.map(([badge,title,sub]) => `<div class="cert glass reveal"><div class="cert-ic">${escapeHtml(badge)}</div><div class="cert-t">${escapeHtml(title)}</div><div class="cert-s">${escapeHtml(sub)}</div></div>`).join('');
}

function openModal(id) {
  const p = projects.find(project => project.id === id);
  if (!p) return;
  document.getElementById('modal-head').innerHTML = `<span class="status ${p.statusClass}" style="position:static;display:inline-block;margin-bottom:12px">${escapeHtml(p.status)}</span><span class="proj-cat" style="display:block;margin-bottom:6px">${escapeHtml(p.category)}</span><h3 id="modal-title" style="font-size:27px;font-weight:700">${escapeHtml(p.title)}</h3><div class="chiprow" style="margin-top:16px">${p.tags.map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('')}</div>`;
  document.getElementById('modal-body').innerHTML = `
    <div class="mb-block"><div class="mb-label">Problem statement</div><p class="mb-text">${escapeHtml(p.problem)}</p></div>
    <div class="mb-block"><div class="mb-label">What I built</div><ul class="mb-list">${p.built.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></div>
    <div class="mb-block"><div class="mb-label">Architecture pattern</div><p class="mb-text" style="font-family:'JetBrains Mono';font-size:13.5px;color:oklch(0.82 0.11 200)">${escapeHtml(p.pattern)}</p></div>
    <div class="mb-block"><div class="mb-label">Engineering decisions</div><ul class="mb-list">${p.decisions.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></div>
    <div class="mb-block mb-two"><div><div class="mb-label">Challenges solved</div><ul class="mb-list">${p.challenges.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></div><div><div class="mb-label">What I learned</div><ul class="mb-list">${p.learned.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></div></div>
    <div class="mb-block mb-two"><div><div class="mb-label">Production readiness</div><div class="chiprow">${p.prodNotes.map(x => `<span class="chip">${escapeHtml(x)}</span>`).join('')}</div></div><div><div class="mb-label">Future improvements</div><ul class="mb-list">${p.future.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></div></div>`;
  document.getElementById('project-modal').hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('project-modal').hidden = true;
  document.body.style.overflow = '';
}

function setupInteractions() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive:true });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-project]');
    if (trigger) openModal(trigger.dataset.project);
  });

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('project-modal').addEventListener('click', event => {
    if (event.target.id === 'project-modal') closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  setupInteractions();
});

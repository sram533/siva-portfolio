// ================================================================
// Static Portfolio — main.js
// - three.js isometric architecture graph (hero)
// - Lenis smooth scroll
// - IntersectionObserver active-nav
// - Scroll-driven token on architecture pipelines
// - Dynamic content injection for repeating sections
// ================================================================

import * as THREE from "three";
import Lenis from "lenis";

/* ============ DATA ============ */
const FOCUS = [
  ["Full-Stack Product Engineering", "User-facing applications with reusable components, clean routing, API-backed workflows, responsive UI, and maintainable frontend architecture."],
  ["Backend API Design", "REST APIs, service layers, validation logic, authentication-ready flows, request/response contracts, and modular backend services."],
  ["AI Application Workflows", "LLM APIs, prompt workflows, tool-calling, RAG concepts, structured outputs, and human-in-the-loop patterns."],
  ["Salesforce Platform Engineering", "Business logic, UI components, automation, and data models using Apex, LWC, Flows, SFDX, and Salesforce platform tools."],
  ["iPaaS & Integration Architecture", "Integration layers connecting internal apps with external systems via REST/SOAP, middleware patterns, data mapping, retries, and secure auth."],
  ["CI/CD & Release Engineering", "Source-controlled deployments, environment promotion, build validation, release coordination, and rollback awareness."],
  ["Performance & Optimization", "Cleaner, efficient code, improved query patterns, optimized API flows, and platform/governor-limit awareness."],
  ["Production Readiness", "Logging, validation, error handling, monitoring, security, access control, data quality, environment separation."],
];

const PROJECTS = [
  {
    id: "agentic-fitness", title: "Agentic Fitness Coach", status: "In Progress",
    cat: "AI Application · Full-Stack · Backend APIs",
    desc: "An AI-powered fitness platform combining workout tracking, nutrition logging, progress dashboards, and goal-based recommendations using structured user data and LLM-powered workflows.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Redis", "LLM Tool Calling"],
    highlights: ["AI-generated, goal-aware training recommendations", "Workout, nutrition, and progression tracking", "Analytics dashboards from structured data"],
    arch: ["UI", "API", "SVC", "DB", "AI"],
    metrics: [["48", "workouts"], ["1.8k", "kcal/day"], ["92%", "goal"]],
    buttons: [["Case Study", "case"], ["Demo Coming Soon", "muted"]],
  },
  {
    id: "healthcare", title: "Healthcare Insurance Platform", status: "Completed",
    cat: "Full-Stack · Backend APIs · Healthcare Workflows",
    desc: "A healthcare insurance platform focused on frontend workflows, backend services, database-backed records, and modular API-driven architecture.",
    stack: ["Next.js", "NestJS", "MongoDB", "REST APIs", "TypeScript"],
    highlights: ["User-facing healthcare workflows", "API-driven, modular backend architecture", "Authentication-ready, database-backed records"],
    arch: ["Next", "Nest", "SVC", "Mongo"],
    metrics: [["1,204", "members"], ["318", "claims"], ["96", "policies"]],
    buttons: [["Case Study", "case"], ["Private Repo", "muted"]],
  },
  {
    id: "realtime-chat", title: "Real-Time Chat Application", status: "Completed",
    cat: "Full-Stack · Real-Time Systems · WebSockets",
    desc: "A real-time messaging application built with MERN and Socket.io for instant communication, live chat sessions, and responsive user interactions.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    highlights: ["Real-time WebSocket messaging", "Chat rooms and direct messaging", "Authentication-ready structure"],
    arch: ["React", "Expr", "WS", "Mongo"],
    metrics: [["3", "online"], ["<40ms", "latency"], ["MERN", "stack"]],
    buttons: [["Case Study", "case"], ["GitHub", "link", "https://github.com/sram533/realmtalk"]],
  },
  {
    id: "salesforce", title: "Salesforce Enterprise Platform Work", status: "Completed",
    cat: "Platform Engineering · Salesforce · APIs · CI/CD",
    desc: "Enterprise platform engineering experience involving application development, business logic, UI components, automation, release management, and external-system integration patterns.",
    stack: ["Apex", "LWC", "Flows", "SFDX", "REST / SOAP", "CI/CD"],
    highlights: ["Reusable Apex service logic and LWC UI", "Configurable Flow automation", "Decoupled API / middleware integrations"],
    arch: ["LWC", "Apex", "Data", "R/S"],
    metrics: [["20+", "releases"], ["10M+", "records"], ["89%", "cov"]],
    buttons: [["Case Study", "case"], ["Private Repo", "muted"]],
  },
  {
    id: "hpc", title: "High Performance Computing Coursework", status: "Academic Project",
    cat: "Systems · Parallel Computing · C++",
    desc: "Parallel computing projects using OpenMP, MPI, Monte Carlo simulations, lattice Boltzmann methods, and heat diffusion on HPC clusters.",
    stack: ["C++", "OpenMP", "MPI", "PBS", "Linux", "HPC"],
    highlights: ["Parallelized Monte Carlo pi estimation", "Strong scaling and speedup analysis", "Hybrid heat diffusion simulation"],
    arch: ["MPI", "OMP", "PBS", "HPC"],
    metrics: [["13.8x", "speedup"], ["86%", "eff"], ["16", "ranks"]],
    buttons: [["Case Study", "case"], ["Academic", "muted"]],
  },
  {
    id: "neurocuts", title: "NeuroCuts RL Enhancements", status: "Prototype",
    cat: "Research · Reinforcement Learning · Networking",
    desc: "Experiments improving reinforcement learning for packet classification and network decision-tree optimization.",
    stack: ["Python", "Reinforcement Learning", "PPO", "Action Masks"],
    highlights: ["PPO-based optimization experiments", "Action masking for valid decision paths", "Rule-set and decision-tree optimization"],
    arch: ["State", "Pol", "Env", "Tree"],
    metrics: [["PPO", "algo"], ["mask", "action"], ["5-tup", "packets"]],
    buttons: [["Case Study", "case"], ["In Progress", "muted"]],
  },
];

const PATTERNS = [
  { id: "layered", title: "Layered Application Architecture", nodes: ["Frontend", "API Layer", "Service Layer", "Data Layer"], notes: ["Full-stack apps", "Backend services", "Clear separation of concerns"] },
  { id: "ipaas", title: "iPaaS / Middleware Integration Layer", nodes: ["Application", "API Gateway", "Middleware", "External Systems"], notes: ["Data transformation", "Request validation", "Auth handling", "Retry / error handling"] },
  { id: "event", title: "Event-Driven Workflows", nodes: ["User Action", "Event Bus", "Worker/Service", "DB Update"], notes: ["Async processing", "Queue-ready", "Background jobs", "Non-blocking"] },
  { id: "cicd", title: "CI/CD Release Flow", nodes: ["Feature Branch", "Pull Request", "Build/Test", "Staging", "Production"], notes: ["Source control", "Automated validation", "Environments", "Rollback"] },
  { id: "ai", title: "AI Workflow Architecture", nodes: ["User Input", "Context", "LLM", "Tool/API", "Output", "UI"], notes: ["Prompt templates", "Structured JSON", "Tool calling", "RAG-ready"] },
  { id: "sf", title: "Salesforce Platform Architecture", nodes: ["LWC / Flow", "Apex Service", "Data Model", "API Layer", "External"], notes: ["Apex logic", "LWC components", "Flow automation", "SFDX deploys"] },
];

const EXPERIENCE = [
  {
    role: "Software Engineer", org: "Deloitte", period: "Aug 2022 — Dec 2023",
    tags: ["Enterprise Software", "Platform Engineering", "APIs", "CI/CD"],
    summary: "Worked on production enterprise software systems involving application development, backend business logic, UI components, automation workflows, API integrations, release management, and CI/CD across 10M+ records and 20+ production releases.",
    bullets: [
      "Built and customized application features using Apex, Lightning Web Components, Flows, validation rules, object models, and platform automation.",
      "Designed backend-style business logic and reusable service patterns for maintainable, scalable functionality.",
      "Worked with REST/SOAP API integration patterns connecting internal platform data with external enterprise systems.",
      "Contributed to CI/CD and release management using source control, SFDX, deployment pipelines, and environment promotion across dev, QA, UAT, and production.",
    ],
  },
  {
    role: "General Engineering Trainee", org: "Vi (Vodafone Idea)", period: "Jan 2022 — Jun 2022",
    tags: ["Backend Microservices", "Spring Boot", "React", "PostgreSQL"],
    summary: "Decomposed legacy telecom service-management workflows into domain-oriented microservices and modular frontend modules, improving scalability, maintainability, and operational efficiency.",
    bullets: [
      "Broke legacy workflows into domain-oriented Spring Boot microservices and React modules, improving efficiency by ~25%.",
      "Designed reusable backend API layers and service-specific DTOs to streamline frontend-backend communication.",
      "Engineered secure monitoring services with PostgreSQL, AES-256 encryption, and real-time SLA alerts across 10M+ subscriber records.",
    ],
  },
  {
    role: "Backend Intern Project", org: "Practo / Mentormind", period: "Internship Project",
    tags: ["Spring Boot", "Healthcare Application"],
    summary: "Built a diagnostic booking application using Spring Boot as part of an internship-style project.",
    bullets: [
      "Developed backend APIs for healthcare appointment and diagnostic booking workflows.",
      "Worked with Java, Spring Boot, REST APIs, and database-backed application logic.",
    ],
  },
];

const SKILLS = [
  ["Programming Languages", ["JavaScript", "TypeScript", "Java", "Python", "C++", "SQL", "Apex"]],
  ["Frontend Engineering", ["React", "Next.js", "Lightning Web Components", "Tailwind CSS", "Recharts", "Responsive UI", "HTML", "CSS"]],
  ["Backend & APIs", ["Node.js", "Express.js", "NestJS", "Spring Boot", "FastAPI", "REST APIs", "SOAP APIs", "Microservices", "RBAC"]],
  ["Databases & Data Modeling", ["PostgreSQL", "MySQL", "MongoDB", "Prisma ORM", "SOQL", "SOSL", "Data Modeling", "Query Optimization"]],
  ["AI Applications", ["LLM Tool Calling", "LangGraph.js", "Structured Outputs", "Agent Workflows", "RAG", "Prompt Engineering", "AI Evaluation"]],
  ["Architecture & System Design", ["Layered Architecture", "Service Layer", "API Design", "Event-Driven", "iPaaS Layer", "Middleware Patterns", "Error Handling", "Logging"]],
  ["Cloud / DevOps / CI-CD", ["Git", "GitHub", "Bitbucket", "SFDX", "CI/CD Pipelines", "Environment Promotion", "Docker Basics", "Linux", "Postman", "Jira"]],
  ["Salesforce Platform Engineering", ["Health Cloud", "Sales Cloud", "Service Cloud", "Apex", "LWC", "Flows", "Reports & Dashboards", "Data Loader", "SFDX"]],
  ["Integrations / iPaaS", ["REST APIs", "SOAP APIs", "Data Mapping", "Middleware Flows", "Retry Patterns", "Error Handling", "API Contracts", "External System Sync"]],
  ["CS Fundamentals", ["Data Structures & Algorithms", "Computer Networks", "Distributed Systems", "High Performance Computing", "OpenMP", "MPI", "OS Concepts"]],
];

const EDUCATION = [
  {
    school: "University of Illinois Chicago", degree: "MS in Computer Science",
    when: "Graduating — December 11, 2025",
    courses: ["Algorithms", "Advanced Algorithms", "Computer Networks", "Advanced Computer Networks", "High Performance Computing", "Algorithms in Computational Biology", "Computer Systems Security", "Database Management Systems"],
  },
  {
    school: "Chaitanya Bharathi Institute of Technology", degree: "BE — Computer Science & Engineering",
    when: "Graduated — June 2022", grade: "CGPA 8.61 / 10",
  },
];

const CERTS = [
  ["SF", "Salesforce Administrator", "Certified", "https://drive.google.com/file/d/1TrOwrxZ69neHINn-I0ksNP2Or67zInAF/view?usp=drive_link"],
  ["PD", "Platform Developer I", "Certified", "https://drive.google.com/file/d/1tYXBoxzLSEjvpVHcUG7SYiXjfCc9yeC5/view?usp=drive_link"],
  ["AB", "Salesforce Platform App Builder", "Certified", "https://drive.google.com/file/d/1w2LeusrLXym1Iwu0k7axuJcVtF1u28KY/view?usp=drive_link"],
];

const RECOG = [
  ["AP", "Deloitte Applause Award", "Recognition"],
  ["GH", "Green Hoodie Nomination", "Deloitte"],
  ["200k", "200k+ Trailhead Points", "Salesforce"],
];

const MARQUEE = ["SOFTWARE ENGINEER", "FULL-STACK", "BACKEND", "AI APPLICATIONS", "SALESFORCE PLATFORM", "iPaaS · INTEGRATION", "CI/CD", "SYSTEMS"];

/* ============ HELPERS ============ */
const h = (tag, attrs = {}, ...children) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") el.className = v;
    else if (k === "html") el.innerHTML = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2).toLowerCase(), v);
    else el.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null) continue;
    el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return el;
};
const chip = (t) => h("span", { class: "chip" }, t);

/* ============ POPULATE SECTIONS ============ */
function populate() {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Marquee
  const track = document.getElementById("marquee-track");
  const line = MARQUEE.flatMap((r) => [
    h("span", {}, r),
    h("span", { class: "diamond" }, "◆"),
  ]);
  // Duplicate 3x to make continuous loop feel seamless
  for (let i = 0; i < 3; i++) {
    line.forEach((el) => track.appendChild(el.cloneNode(true)));
  }

  // Focus
  const focus = document.getElementById("focus-table");
  FOCUS.forEach(([title, body], i) => {
    focus.appendChild(
      h("div", { class: "focus-row reveal" },
        h("div", { class: "num" }, `F${String(i + 1).padStart(2, "0")}`),
        h("div", { class: "title" }, title),
        h("div", { class: "body" }, body)
      )
    );
  });

  // Work
  const work = document.getElementById("work-list");
  PROJECTS.forEach((p, i) => {
    const buttons = h("div", { class: "row-actions" },
      ...p.buttons.map(([label, type, href]) => {
        if (type === "muted") return h("span", { class: "btn btn-muted" }, label);
        const attrs = { class: type === "case" ? "btn btn-primary" : "btn btn-ghost" };
        if (href) { attrs.href = href; attrs.target = "_blank"; attrs.rel = "noreferrer"; }
        return h("a", attrs, label, " ↗");
      })
    );

    // mini svg
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 340 60");
    svg.setAttribute("class", "mini-arch");
    p.arch.forEach((n, k) => {
      const x = (k * 340) / p.arch.length + 20;
      const y = 30;
      if (k > 0) {
        const px = ((k - 1) * 340) / p.arch.length + 20 + 42;
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", px); line.setAttribute("y1", y);
        line.setAttribute("x2", x - 4); line.setAttribute("y2", y);
        line.setAttribute("class", "link");
        svg.appendChild(line);
      }
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", x - 4); rect.setAttribute("y", y - 12);
      rect.setAttribute("width", 46); rect.setAttribute("height", 24);
      rect.setAttribute("rx", 4);
      rect.setAttribute("class", "node");
      svg.appendChild(rect);
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", x + 19); text.setAttribute("y", y + 4);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("class", "label");
      text.textContent = n.length > 6 ? n.slice(0, 6) : n;
      svg.appendChild(text);
    });

    const archPanel = h("div", { class: "arch-panel" },
      h("div", { class: "eyebrow" }, "Architecture"),
      svg,
      h("div", { class: "metrics" },
        ...p.metrics.map(([k, v]) =>
          h("div", { class: "metric" },
            h("span", { class: "k" }, k),
            h("span", { class: "v" }, v)
          )
        )
      )
    );

    const row = h("div", { class: "work-row reveal", id: `project-${p.id}` },
      h("div", {},
        h("div", { class: "eyebrow" }, `W${String(i + 1).padStart(2, "0")} — ${p.status.toUpperCase()}`),
        h("h3", {}, p.title),
        h("div", { class: "cat" }, p.cat),
        h("div", { class: "chip-row", style: "margin-top:16px" }, ...p.stack.map(chip))
      ),
      h("div", {},
        h("p", { class: "desc" }, p.desc),
        h("ul", { class: "dot-list" }, ...p.highlights.map((t) => h("li", {}, t))),
        buttons
      ),
      archPanel
    );
    work.appendChild(row);
  });

  // Systems
  const sys = document.getElementById("systems-list");
  PATTERNS.forEach((p, i) => {
    const nodes = h("div", { class: "pipeline-row" },
      h("div", { class: "pipeline-line" }),
      ...p.nodes.map(() => h("div", { class: "pipeline-node", style: "margin-right:auto" })),
      h("div", { class: "pipeline-token", "data-token": "true" })
    );
    // give even distribution using flex on wrapper
    const pipelineWrap = h("div", {
      class: "pipeline-box", "data-pipeline": p.id
    },
      h("div", { class: "pipeline-track", style: "position:relative" },
        (() => {
          const row = h("div", { class: "pipeline-row" });
          const bg = h("div", { class: "pipeline-line" });
          row.appendChild(bg);
          const inner = h("div", { style: "position:relative;width:100%;display:flex;justify-content:space-between;align-items:center" });
          p.nodes.forEach(() => inner.appendChild(h("div", { class: "pipeline-node" })));
          row.appendChild(inner);
          const token = h("div", { class: "pipeline-token", "data-token": p.id });
          row.appendChild(token);
          return row;
        })()
      ),
      (() => {
        const labels = h("div", { class: "pipeline-labels", style: `grid-template-columns: repeat(${p.nodes.length}, minmax(0,1fr))` });
        p.nodes.forEach((n) => labels.appendChild(h("span", {}, n)));
        return labels;
      })()
    );
    const row = h("div", { class: "system-row reveal", id: `pattern-${p.id}` },
      h("div", {},
        h("div", { class: "eyebrow" }, `P${String(i + 1).padStart(2, "0")}`),
        h("h3", {}, p.title),
        h("div", { class: "chip-row" }, ...p.notes.map(chip))
      ),
      pipelineWrap
    );
    sys.appendChild(row);
  });

  // Journey
  const jr = document.getElementById("journey-list");
  EXPERIENCE.forEach((e) => {
    jr.appendChild(
      h("div", { class: "journey-row reveal" },
        h("div", { class: "journey-head" },
          h("div", {},
            h("div", { class: "role" }, e.role, " ", h("span", { class: "org" }, `— ${e.org}`)),
            h("div", { class: "chip-row", style: "margin-top:8px" }, ...e.tags.map(chip))
          ),
          h("div", { class: "period" }, e.period)
        ),
        h("p", { class: "summary" }, e.summary),
        h("ul", { class: "dot-list bullets" }, ...e.bullets.map((b) => h("li", {}, b)))
      )
    );
  });

  // Toolkit
  const tk = document.getElementById("toolkit-list");
  SKILLS.forEach(([title, items]) => {
    tk.appendChild(
      h("div", { class: "toolkit-row reveal" },
        h("div", { class: "title" }, title),
        h("div", { class: "chip-row" }, ...items.map(chip))
      )
    );
  });

  // Academics
  const ac = document.getElementById("academics-list");
  EDUCATION.forEach((ed) => {
    const row = h("div", { class: "acad-row reveal" },
      h("div", { class: "head" },
        h("div", {},
          h("div", { class: "school" }, ed.school),
          h("div", { class: "degree" }, ed.degree)
        ),
        h("div", { class: "when" }, ed.when)
      )
    );
    if (ed.grade) row.appendChild(h("div", { class: "grade" }, ed.grade));
    if (ed.courses) {
      row.appendChild(
        h("div", { class: "courses" },
          h("div", { class: "eyebrow" }, "Coursework"),
          h("div", { class: "chip-row" }, ...ed.courses.map(chip))
        )
      );
    }
    ac.appendChild(row);
  });

  // Credibility
  const cg = document.getElementById("cred-grid");
  CERTS.forEach(([code, title, sub, href]) => {
    cg.appendChild(
      h("a", { class: "cred-card reveal", href, target: "_blank", rel: "noreferrer" },
        h("span", { class: "cred-code" }, code),
        h("div", { class: "cred-body" },
          h("div", { class: "title" }, title),
          h("div", { class: "sub" }, sub)
        ),
        h("span", { class: "cred-arrow" }, "↗")
      )
    );
  });
  RECOG.forEach(([code, title, sub]) => {
    cg.appendChild(
      h("div", { class: "cred-card recognition reveal" },
        h("span", { class: "cred-code" }, code),
        h("div", { class: "cred-body" },
          h("div", { class: "title" }, title),
          h("div", { class: "sub" }, sub)
        )
      )
    );
  });
}

/* ============ THREE.JS HERO SCENE ============ */
function initHeroScene() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const modules = [
    { label: "Web Client", pos: [-1.7, 1.2, 0] },
    { label: "Mobile", pos: [-1.7, -0.2, 0.9] },
    { label: "API Gateway", pos: [-0.2, 0.9, 0.3] },
    { label: "Service Layer", pos: [-0.2, -0.4, 0.3] },
    { label: "AI Workflow", pos: [-0.2, -1.6, 0.3] },
    { label: "Postgres", pos: [1.3, 0.9, -0.3] },
    { label: "Redis", pos: [1.3, -0.4, -0.3] },
    { label: "iPaaS", pos: [1.3, -1.6, -0.3] },
  ];
  const edges = [[0,2],[1,2],[2,3],[3,5],[3,6],[3,4],[3,7],[4,5]];

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));

  const resize = () => {
    const w = canvas.clientWidth, hgt = canvas.clientHeight;
    renderer.setSize(w, hgt, false);
    camera.aspect = w / hgt;
    camera.updateProjectionMatrix();
  };
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(4.2, 2.8, 6.2);
  camera.lookAt(0, 0, 0);

  // lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dl = new THREE.DirectionalLight(0xffffff, 0.7);
  dl.position.set(4, 6, 4); scene.add(dl);
  const dl2 = new THREE.DirectionalLight(0x6E9BFF, 0.25);
  dl2.position.set(-4, 2, -3); scene.add(dl2);

  const group = new THREE.Group();
  group.rotation.set(0.35, -0.55, 0);
  scene.add(group);

  // base grid plane
  const planeGeo = new THREE.PlaneGeometry(14, 10, 20, 14);
  const planeMat = new THREE.MeshBasicMaterial({ color: 0x1a1a1f, wireframe: true, transparent: true, opacity: 0.35 });
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -3.1;
  group.add(plane);

  // nodes
  const boxGeo = new THREE.BoxGeometry(0.9, 0.5, 0.9);
  const edgesGeo = new THREE.EdgesGeometry(boxGeo);
  const nodeMat = new THREE.MeshStandardMaterial({ color: 0x141419, metalness: 0.15, roughness: 0.7 });
  const capGeo = new THREE.BoxGeometry(0.92, 0.02, 0.92);
  const capMat = new THREE.MeshBasicMaterial({ color: 0x6E9BFF, transparent: true, opacity: 0.4 });

  const nodePositions = [];
  const labelDivs = [];
  modules.forEach((m) => {
    const mesh = new THREE.Mesh(boxGeo, nodeMat);
    mesh.position.set(...m.pos);
    group.add(mesh);
    const wire = new THREE.LineSegments(edgesGeo, new THREE.LineBasicMaterial({ color: 0x3a3a44 }));
    wire.position.set(...m.pos);
    group.add(wire);
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(m.pos[0], m.pos[1] + 0.25, m.pos[2]);
    group.add(cap);
    nodePositions.push(new THREE.Vector3(...m.pos));

    // DOM label overlay (projected each frame)
    const div = document.createElement("div");
    div.textContent = m.label.toUpperCase();
    div.style.cssText = "position:absolute; pointer-events:none; font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.14em; color:rgba(255,255,255,0.7); white-space:nowrap; transform:translate(-50%,-50%); z-index:2;";
    canvas.parentElement.appendChild(div);
    labelDivs.push({ el: div, world: new THREE.Vector3(m.pos[0], m.pos[1] - 0.55, m.pos[2]) });
  });

  // edges (lines)
  const lineMat = new THREE.LineBasicMaterial({ color: 0x6E9BFF, transparent: true, opacity: 0.35 });
  edges.forEach(([a, b]) => {
    const geom = new THREE.BufferGeometry().setFromPoints([nodePositions[a], nodePositions[b]]);
    group.add(new THREE.Line(geom, lineMat));
  });

  // pointer parallax
  const pointer = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    pointer.x = nx; pointer.y = ny;
  });

  const targetRot = new THREE.Vector2(0.35, -0.55);
  const clock = new THREE.Clock();

  function tick() {
    const t = clock.getElapsedTime();
    targetRot.x = 0.35 + pointer.y * -0.12;
    targetRot.y = -0.55 + pointer.x * 0.18;
    group.rotation.x += (targetRot.x - group.rotation.x) * 0.05;
    group.rotation.y += (targetRot.y - group.rotation.y) * 0.05;
    group.position.y = Math.sin(t * 0.4) * 0.06;

    // project labels
    const rect = canvas.getBoundingClientRect();
    labelDivs.forEach(({ el, world }) => {
      const p = world.clone().applyMatrix4(group.matrixWorld).project(camera);
      const x = (p.x * 0.5 + 0.5) * rect.width;
      const y = (-p.y * 0.5 + 0.5) * rect.height;
      const inside = p.z > -1 && p.z < 1 && x > -50 && x < rect.width + 50;
      el.style.opacity = inside ? "1" : "0";
      el.style.left = x + "px";
      el.style.top = y + "px";
    });

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  tick();
}

/* ============ LENIS SMOOTH SCROLL ============ */
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return lenis;
}

/* ============ REVEAL ON SCROLL ============ */
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "-60px", threshold: 0.05 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ============ ACTIVE NAV ============ */
function initActiveNav() {
  const links = document.querySelectorAll(".chapters a");
  const map = {};
  links.forEach((a) => { map[a.dataset.nav] = a; });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.remove("active"));
          if (map[e.target.id]) map[e.target.id].classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  ["about","focus","work","systems","journey","toolkit","academics","credibility","research","snapshot","contact"]
    .forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}

/* ============ SYSTEMS TOKEN ANIMATION ============ */
function initPipelineTokens() {
  const boxes = document.querySelectorAll(".pipeline-box");
  const update = () => {
    const vh = window.innerHeight;
    boxes.forEach((box) => {
      const rect = box.getBoundingClientRect();
      // progress: 0 when top hits 90% viewport, 1 when bottom hits 20%
      const start = vh * 0.9;
      const end = vh * 0.2;
      const raw = (start - rect.top) / (start - end);
      const p = Math.max(0, Math.min(1, raw));
      const token = box.querySelector("[data-token]");
      if (token) token.style.left = (p * 100) + "%";
    });
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ============ EMAIL COPY ============ */
function initEmailCopy() {
  const btn = document.getElementById("copy-email");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const val = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(val);
      const icon = document.getElementById("copy-icon");
      const original = icon.innerHTML;
      icon.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      setTimeout(() => { icon.innerHTML = original; }, 1400);
    } catch {
      // fallback
      window.location.href = `mailto:${val}`;
    }
  });
}

/* ============ BOOT ============ */
document.addEventListener("DOMContentLoaded", () => {
  populate();
  initLenis();
  initReveal();
  initActiveNav();
  initPipelineTokens();
  initEmailCopy();
  initHeroScene();
});

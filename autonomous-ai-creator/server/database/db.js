import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

// Default initial state
const defaultData = {
  tasks: [],
  projects: [
    {
      id: 'proj-1',
      name: 'E-Commerce Platform Launch',
      description: 'Full-stack online store for fashion brand with payment, cart, and dashboard',
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      taskCount: 10,
      completedTaskCount: 10,
      agentCount: 4,
      filesCount: 12,
    },
    {
      id: 'proj-2',
      name: 'AI SaaS Marketing Campaign',
      description: 'Multi-channel marketing assets, landing page copy, social media calendar & analytics plan',
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      taskCount: 7,
      completedTaskCount: 7,
      agentCount: 3,
      filesCount: 8,
    }
  ],
  agents: [
    {
      id: 'planner',
      name: 'Planner Agent',
      role: 'Goal Decomposition & Architecture',
      description: 'Converts high-level goals into structured execution plans, dependency graphs, and step estimates.',
      status: 'idle',
      capabilities: ['Goal Parsing', 'Task Decomposition', 'Dependency Mapping', 'Resource Estimation'],
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      systemPrompt: 'You are an expert AI software architect and project manager. Decompose complex user goals into atomic, dependency-mapped subtasks.',
      tasksCompleted: 42,
      successRate: 98,
    },
    {
      id: 'research',
      name: 'Research Agent',
      role: 'Information Gathering & Synthesis',
      description: 'Searches web sources, analyzes competitor data, extracts technical docs, and summarizes domain knowledge.',
      status: 'idle',
      capabilities: ['Web Search', 'Competitor Analysis', 'Doc Extraction', 'Market Research'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      systemPrompt: 'You are a meticulous research intelligence agent. Gather factual information, synthesize data, and cite authoritative sources.',
      tasksCompleted: 87,
      successRate: 96,
    },
    {
      id: 'developer',
      name: 'Developer Agent',
      role: 'Full-Stack Code Generation',
      description: 'Writes production-ready frontend, backend, database scripts, and API integration modules.',
      status: 'idle',
      capabilities: ['React/Vite', 'Node/Express', 'SQL/Postgres', 'API Integration', 'Refactoring'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      systemPrompt: 'You are a senior full-stack developer. Write clean, modular, robust, and well-documented code adhering to modern best practices.',
      tasksCompleted: 134,
      successRate: 95,
    },
    {
      id: 'designer',
      name: 'Designer Agent',
      role: 'UI/UX & Design Systems',
      description: 'Creates design tokens, wireframe specs, responsive layouts, color palettes, and Tailwind themes.',
      status: 'idle',
      capabilities: ['UI Wireframing', 'Color Palettes', 'Design Systems', 'CSS/Tailwind', 'UX Micro-interactions'],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      systemPrompt: 'You are a world-class UI/UX designer. Create stunning visual designs, color schemes, typography guidelines, and component specifications.',
      tasksCompleted: 65,
      successRate: 99,
    },
    {
      id: 'writer',
      name: 'Writer Agent',
      role: 'Content & Documentation',
      description: 'Drafts marketing copy, technical documentation, READMEs, email sequences, and user guides.',
      status: 'idle',
      capabilities: ['Technical Writing', 'Copywriting', 'SEO Content', 'Documentation', 'Email Campaigns'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      systemPrompt: 'You are a master technical writer and marketing strategist. Produce compelling, clear, and audience-tailored prose.',
      tasksCompleted: 112,
      successRate: 97,
    },
    {
      id: 'data',
      name: 'Data Agent',
      role: 'Analytics & Schema Modeling',
      description: 'Analyzes JSON/CSV datasets, builds statistical summaries, defines DB schemas, and designs charts.',
      status: 'idle',
      capabilities: ['Data Cleaning', 'Aggregation', 'Schema Design', 'Chart Configs', 'SQL Metrics'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      systemPrompt: 'You are a lead data scientist and database architect. Model relational data, analyze statistical metrics, and format insights.',
      tasksCompleted: 58,
      successRate: 94,
    },
    {
      id: 'testing',
      name: 'Testing Agent',
      role: 'Automated QA & Error Recovery',
      description: 'Runs automated linting, unit test generation, synthetic execution checks, and pinpoints root causes.',
      status: 'idle',
      capabilities: ['Syntax Auditing', 'Unit Tests', 'Bug Detection', 'Error Diagnostics', 'Auto-Fix Props'],
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      systemPrompt: 'You are an unyielding QA engineer and debugging specialist. Test code, isolate failure points, and propose exact bug fixes.',
      tasksCompleted: 91,
      successRate: 96,
    },
    {
      id: 'reviewer',
      name: 'Reviewer Agent',
      role: 'Quality Assurance & Governance',
      description: 'Audits deliverables against initial user goals, checks accessibility, performance, and security rules.',
      status: 'idle',
      capabilities: ['Code Audit', 'Goal Alignment', 'Security Check', 'A11y Audit', 'Final Signoff'],
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      systemPrompt: 'You are a chief product officer and code reviewer. Ensure outputs strictly satisfy user requirements, safety, and performance standard.',
      tasksCompleted: 76,
      successRate: 99,
    },
    {
      id: 'manager',
      name: 'Manager Agent',
      role: 'Orchestrator & Supervisor',
      description: 'Directs workflow sequence, selects next active agent, monitors resource budget, and requests human signoff.',
      status: 'idle',
      capabilities: ['State Management', 'Agent Dispatch', 'Budget Guardrails', 'Approval Trigger', 'Failure Recovery'],
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
      systemPrompt: 'You are the central Autonomous AI Manager. Orchestrate subtasks, evaluate agent results, manage memory state, and ensure safety.',
      tasksCompleted: 156,
      successRate: 98,
    }
  ],
  tools: [
    { id: 'web_search', name: 'Web Search', category: 'Research', permission: 'read-only', description: 'Searches public web endpoints for real-time documentation, articles, and news.', enabled: true },
    { id: 'file_reader', name: 'File Reader', category: 'FileSystem', permission: 'read-only', description: 'Reads contents of local workspace files, scripts, images, and documents.', enabled: true },
    { id: 'file_writer', name: 'File Writer', category: 'FileSystem', permission: 'sandboxed', description: 'Creates or modifies files inside project workspace directory.', enabled: true },
    { id: 'code_runner', name: 'Code Execution', category: 'Developer', permission: 'sandboxed', description: 'Executes JS/Python code snippets in an isolated runtime environment.', enabled: true },
    { id: 'db_access', name: 'Database Access', category: 'Data', permission: 'restricted', description: 'Executes SQL schema queries and data transformations.', enabled: true },
    { id: 'http_api', name: 'HTTP/API Client', category: 'Integration', permission: 'sandboxed', description: 'Sends GET/POST HTTP requests to external API services.', enabled: true },
    { id: 'doc_generator', name: 'Document Generator', category: 'Writer', permission: 'sandboxed', description: 'Compiles formatted Markdown, PDF, and HTML documentation packages.', enabled: true },
    { id: 'image_generator', name: 'Image Generator', category: 'Design', permission: 'sandboxed', description: 'Generates UI graphics, mockups, and placeholder visuals.', enabled: true },
    { id: 'browser_auto', name: 'Browser Automation', category: 'QA', permission: 'restricted', description: 'Automates browser interaction and visual snapshot testing.', enabled: true }
  ],
  workflows: [
    {
      id: 'wf-1',
      name: 'Full Application Build',
      description: 'End-to-end software development pipeline: Plan -> Research -> Design -> Code -> Test -> Review -> Deploy',
      nodes: [
        { id: 'n1', agent: 'planner', name: 'Plan & Architecture' },
        { id: 'n2', agent: 'research', name: 'Competitor & Tech Research' },
        { id: 'n3', agent: 'designer', name: 'UI/UX Specs' },
        { id: 'n4', agent: 'developer', name: 'Frontend & Backend Code' },
        { id: 'n5', agent: 'testing', name: 'QA & Error Check' },
        { id: 'n6', agent: 'reviewer', name: 'Final Review & Approval' }
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'wf-2',
      name: 'Marketing Campaign Launch',
      description: 'Automated marketing workflow: Research -> Content Creation -> Design Graphics -> Review -> Approval',
      nodes: [
        { id: 'n1', agent: 'planner', name: 'Campaign Strategy' },
        { id: 'n2', agent: 'research', name: 'Audience Research' },
        { id: 'n3', agent: 'writer', name: 'Copywriting & Landing Page' },
        { id: 'n4', agent: 'designer', name: 'Ad Creatives' },
        { id: 'n5', agent: 'reviewer', name: 'Brand Governance Check' }
      ],
      createdAt: new Date().toISOString(),
    }
  ],
  files: [],
  logs: [],
  settings: {
    aiProvider: 'mock',
    geminiApiKey: '',
    openaiApiKey: '',
    anthropicApiKey: '',
    maxIterations: 25,
    maxRetries: 3,
    maxExecutionTimeSec: 600,
    tokenBudget: 100000,
    requireApprovalDefault: true,
    autoRetryOnFailure: true,
    darkMode: true
  }
};

class Database {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error loading data.json:', e);
    }
    this.save(defaultData);
    return defaultData;
  }

  save(dataToSave) {
    try {
      this.data = dataToSave || this.data;
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving data.json:', e);
    }
  }

  getTasks() { return this.data.tasks || []; }
  getTaskById(id) { return (this.data.tasks || []).find(t => t.id === id); }
  saveTask(task) {
    const tasks = this.getTasks();
    const idx = tasks.findIndex(t => t.id === task.id);
    if (idx >= 0) {
      tasks[idx] = { ...tasks[idx], ...task, updatedAt: new Date().toISOString() };
    } else {
      tasks.unshift(task);
    }
    this.data.tasks = tasks;
    this.save();
    return task;
  }

  getAgents() { return this.data.agents || defaultData.agents; }
  getTools() { return this.data.tools || defaultData.tools; }
  getWorkflows() { return this.data.workflows || defaultData.workflows; }
  getProjects() { return this.data.projects || defaultData.projects; }
  getFiles() { return this.data.files || []; }
  getSettings() { return this.data.settings || defaultData.settings; }

  updateSettings(newSettings) {
    this.data.settings = { ...this.getSettings(), ...newSettings };
    this.save();
    return this.data.settings;
  }

  addFile(fileObj) {
    const files = this.getFiles();
    files.unshift(fileObj);
    this.data.files = files;
    this.save();
    return fileObj;
  }

  addLog(logEntry) {
    const logs = this.data.logs || [];
    logs.unshift(logEntry);
    if (logs.length > 500) logs.pop(); // keep last 500
    this.data.logs = logs;
    this.save();
  }

  getLogs() { return this.data.logs || []; }
}

export const db = new Database();

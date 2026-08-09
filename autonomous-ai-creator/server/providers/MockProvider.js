import { AIProvider } from './AIProvider.js';

export class MockProvider extends AIProvider {
  constructor() {
    super('Mock AI Provider');
  }

  async generatePlan(goal, context = {}) {
    const goalLower = goal.toLowerCase();
    
    // Default custom plan template structure
    let subtasks = [];

    if (goalLower.includes('e-commerce') || goalLower.includes('website') || goalLower.includes('app') || goalLower.includes('store')) {
      subtasks = [
        {
          id: 'subtask-1',
          name: 'Analyze Product & Architecture Requirements',
          description: 'Identify product catalog requirements, user auth flows, payment gateways, and backend architecture.',
          agentId: 'planner',
          dependencies: [],
          status: 'pending',
          priority: 'high',
          estDuration: '1.5 min',
          requiresApproval: false,
          toolNeeded: 'file_reader'
        },
        {
          id: 'subtask-2',
          name: 'Research Market Competitors & Modern UI Patterns',
          description: 'Gather competitor feature benchmarks, checkout UX patterns, and responsive layout standards.',
          agentId: 'research',
          dependencies: ['subtask-1'],
          status: 'pending',
          priority: 'medium',
          estDuration: '2 min',
          requiresApproval: false,
          toolNeeded: 'web_search'
        },
        {
          id: 'subtask-3',
          name: 'Design Visual Theme & Tailwind Design System',
          description: 'Construct visual design tokens, dark/light color palette, typography specs, and component wireframes.',
          agentId: 'designer',
          dependencies: ['subtask-2'],
          status: 'pending',
          priority: 'high',
          estDuration: '2.5 min',
          requiresApproval: false,
          toolNeeded: 'image_generator'
        },
        {
          id: 'subtask-4',
          name: 'Generate Database Schema & API Controllers',
          description: 'Build PostgreSQL database migrations, product models, user auth middleware, and Express API routes.',
          agentId: 'developer',
          dependencies: ['subtask-1'],
          status: 'pending',
          priority: 'high',
          estDuration: '3 min',
          requiresApproval: false,
          toolNeeded: 'file_writer'
        },
        {
          id: 'subtask-5',
          name: 'Build React Frontend Components & Shopping Cart',
          description: 'Develop responsive React UI components, product grid, cart state drawer, and checkout modal.',
          agentId: 'developer',
          dependencies: ['subtask-3', 'subtask-4'],
          status: 'pending',
          priority: 'high',
          estDuration: '4 min',
          requiresApproval: false,
          toolNeeded: 'code_runner'
        },
        {
          id: 'subtask-6',
          name: 'Automated Testing & Linting Audit',
          description: 'Execute synthetic integration tests, check React prop safety, and audit API error handlers.',
          agentId: 'testing',
          dependencies: ['subtask-5'],
          status: 'pending',
          priority: 'high',
          estDuration: '2 min',
          requiresApproval: false,
          simulateFailureFirst: true, // Will fail on 1st attempt to demonstrate error recovery!
          toolNeeded: 'code_runner'
        },
        {
          id: 'subtask-7',
          name: 'Deploy Production Configuration & SSL Hooks',
          description: 'Prepare production environment configuration, environment secrets, and deployment triggers.',
          agentId: 'developer',
          dependencies: ['subtask-6'],
          status: 'pending',
          priority: 'critical',
          estDuration: '1 min',
          requiresApproval: true, // Requires human approval!
          approvalReason: 'Deploying application build and environment variables to Production server.',
          toolNeeded: 'http_api'
        },
        {
          id: 'subtask-8',
          name: 'Final Quality Review & Deliverable Compilation',
          description: 'Review overall solution against initial goal, verify security compliance, and aggregate download bundle.',
          agentId: 'reviewer',
          dependencies: ['subtask-7'],
          status: 'pending',
          priority: 'high',
          estDuration: '1.5 min',
          requiresApproval: false,
          toolNeeded: 'doc_generator'
        }
      ];
    } else if (goalLower.includes('marketing') || goalLower.includes('campaign') || goalLower.includes('copy')) {
      subtasks = [
        {
          id: 'subtask-1',
          name: 'Define Target Audience & Positioning',
          description: 'Analyze customer personas, value proposition, and key marketing messages.',
          agentId: 'planner',
          dependencies: [],
          status: 'pending',
          priority: 'high',
          estDuration: '1 min',
          requiresApproval: false,
          toolNeeded: 'file_reader'
        },
        {
          id: 'subtask-2',
          name: 'Research Trending Search Keywords & Competitor Ads',
          description: 'Discover high-intent SEO keywords, ad headlines, and competitor social strategy.',
          agentId: 'research',
          dependencies: ['subtask-1'],
          status: 'pending',
          priority: 'medium',
          estDuration: '2 min',
          requiresApproval: false,
          toolNeeded: 'web_search'
        },
        {
          id: 'subtask-3',
          name: 'Draft High-Converting Landing Page & Email Copy',
          description: 'Write persuasive hero headlines, value points, CTA copy, and 5-stage email drip sequence.',
          agentId: 'writer',
          dependencies: ['subtask-2'],
          status: 'pending',
          priority: 'high',
          estDuration: '3 min',
          requiresApproval: false,
          toolNeeded: 'doc_generator'
        },
        {
          id: 'subtask-4',
          name: 'Create Ad Creative Visual Specs & Social Banners',
          description: 'Generate banner dimensions, visual brand guidelines, and ad graphic concepts.',
          agentId: 'designer',
          dependencies: ['subtask-3'],
          status: 'pending',
          priority: 'medium',
          estDuration: '2 min',
          requiresApproval: false,
          toolNeeded: 'image_generator'
        },
        {
          id: 'subtask-5',
          name: 'Review Brand Safety & Publish Campaign',
          description: 'Verify brand alignment, tone, FTC compliance, and publish campaign assets.',
          agentId: 'reviewer',
          dependencies: ['subtask-4'],
          status: 'pending',
          priority: 'critical',
          estDuration: '1 min',
          requiresApproval: true,
          approvalReason: 'Publishing official marketing campaign copy and sending automated email sequence.',
          toolNeeded: 'http_api'
        }
      ];
    } else {
      // General goal plan
      subtasks = [
        {
          id: 'subtask-1',
          name: 'Analyze Objective & Define Requirements',
          description: `Deconstruct user goal "${goal.slice(0, 50)}..." into technical requirements.`,
          agentId: 'planner',
          dependencies: [],
          status: 'pending',
          priority: 'high',
          estDuration: '1 min',
          requiresApproval: false,
          toolNeeded: 'file_reader'
        },
        {
          id: 'subtask-2',
          name: 'Gather Domain Knowledge & Best Practices',
          description: 'Perform web and document research to collect authoritative implementation patterns.',
          agentId: 'research',
          dependencies: ['subtask-1'],
          status: 'pending',
          priority: 'medium',
          estDuration: '2 min',
          requiresApproval: false,
          toolNeeded: 'web_search'
        },
        {
          id: 'subtask-3',
          name: 'Synthesize Core Solution & Assets',
          description: 'Generate main deliverables including code, data models, or structured documents.',
          agentId: 'developer',
          dependencies: ['subtask-2'],
          status: 'pending',
          priority: 'high',
          estDuration: '3 min',
          requiresApproval: false,
          toolNeeded: 'file_writer'
        },
        {
          id: 'subtask-4',
          name: 'Validate & Quality Assurance Check',
          description: 'Audit output quality, perform automated validation, and verify completeness.',
          agentId: 'testing',
          dependencies: ['subtask-3'],
          status: 'pending',
          priority: 'high',
          estDuration: '1.5 min',
          requiresApproval: false,
          simulateFailureFirst: true,
          toolNeeded: 'code_runner'
        },
        {
          id: 'subtask-5',
          name: 'Finalize & Export Deliverable',
          description: 'Compile final result bundle, generate executive summary, and save artifacts.',
          agentId: 'reviewer',
          dependencies: ['subtask-4'],
          status: 'pending',
          priority: 'high',
          estDuration: '1 min',
          requiresApproval: false,
          toolNeeded: 'doc_generator'
        }
      ];
    }

    return {
      goal,
      summary: `Autonomous plan generated with ${subtasks.length} ordered subtasks across specialized AI agents.`,
      estimatedTotalDuration: `${subtasks.length * 1.5} minutes`,
      subtasks,
      createdDate: new Date().toISOString()
    };
  }

  async executeTask(subtask, agent, context = {}, tools = []) {
    // Return rich simulated agent outputs tailored to task type
    const agentId = agent.id || subtask.agentId;
    
    let outputContent = '';
    let toolResult = null;
    let filesGenerated = [];

    if (agentId === 'planner') {
      outputContent = `### Architecture & Execution Breakdown\n\n- **Target Objective**: ${context.goal || subtask.name}\n- **Decomposition**: ${subtask.description}\n- **Key Milestones**: Modular subcomponents mapped with zero circular dependencies.\n- **Risk Factor**: Low (Automated QA & Human Approval triggers active).`;
    } else if (agentId === 'research') {
      outputContent = `### Market & Technical Intelligence Summary\n\n1. **Core Discoveries**: Best practices recommend modular micro-components and atomic state management.\n2. **Competitive Edge**: Modern dark-mode aesthetic with reactive glassmorphism and sub-100ms UI latency.\n3. **Recommended Stack**: React 18, Vite, Tailwind CSS, Express API, and file-based JSON persistence.`;
      toolResult = { tool: 'web_search', query: subtask.name, matchesFound: 14, status: 'success' };
    } else if (agentId === 'designer') {
      outputContent = `### UI/UX Design System Specification\n\n\`\`\`json\n{\n  "colorPalette": {\n    "primary": "#6366F1",\n    "primaryHover": "#4F46E5",\n    "background": "#090D16",\n    "surface": "#131C2E",\n    "accent": "#10B981"\n  },\n  "typography": {\n    "fontFamily": "Inter, sans-serif",\n    "codeFont": "JetBrains Mono, monospace"\n  },\n  "borderRadius": "0.75rem"\n}\n\`\`\``;
      filesGenerated.push({ name: 'design-tokens.json', type: 'json', size: '1.2 KB' });
    } else if (agentId === 'developer') {
      outputContent = `### Generated Application Code\n\n\`\`\`jsx\n// Generated Component by Developer Agent\nimport React, { useState } from 'react';\n\nexport function SolutionApp() {\n  const [active, setActive] = useState(true);\n  return (\n    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-white shadow-2xl">\n      <h2 className="text-xl font-bold text-indigo-400">Autonomous Execution Output</h2>\n      <p className="mt-2 text-slate-300">Target goal achieved with fully modular architecture.</p>\n      <button \n        onClick={() => setActive(!active)}\n        className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium shadow-lg transition-all"\n      >\n        {active ? 'System Operational ✓' : 'Engage Autonomous Mode'}\n      </button>\n    </div>\n  );\n}\n\`\`\``;
      filesGenerated.push({ name: 'AppSolution.jsx', type: 'javascript', size: '2.4 KB' });
      toolResult = { tool: 'code_runner', status: 'compiled', warnings: 0, executionTimeMs: 42 };
    } else if (agentId === 'writer') {
      outputContent = `### Marketing & Technical Copy\n\n# Autonomous AI Creator Platform\n\n**Empower your workflow with self-steering AI agents.**\n\n- **Goal-Driven**: Input a vision, receive a complete verified deliverable.\n- **Specialized Workforce**: 9 AI agents collaborate in real-time.\n- **Human Governance**: Approvals enforce total safety and budget control.`;
      filesGenerated.push({ name: 'CAMPAIGN_SUMMARY.md', type: 'markdown', size: '3.8 KB' });
    } else if (agentId === 'testing') {
      outputContent = `### QA Test Suite & Synthetic Verification\n\n- **Total Test Cases**: 18 passed / 0 failed\n- **Lint Status**: Clean (0 errors, 0 warnings)\n- **Code Coverage**: 96.4%\n- **Performance Index**: 99/100`;
      toolResult = { tool: 'code_runner', testsRan: 18, passed: 18, coverage: '96.4%' };
    } else if (agentId === 'reviewer') {
      outputContent = `### Final Quality & Compliance Signoff\n\n- **Goal Satisfaction**: 100% complete\n- **Security Audit**: No vulnerabilities detected\n- **Accessibility (A11y)**: WCAG 2.1 AA Compliant\n- **Recommendation**: Approved for distribution & export.`;
    } else {
      outputContent = `Task "${subtask.name}" completed successfully by ${agent.name}.`;
    }

    return {
      status: 'completed',
      output: outputContent,
      toolResult,
      filesGenerated,
      tokensUsed: Math.floor(Math.random() * 800) + 400,
      timestamp: new Date().toISOString()
    };
  }

  async evaluateResult(task, result, goal) {
    return {
      passed: true,
      score: 0.98,
      feedback: 'Result meets all required quality constraints and goal parameters.'
    };
  }
}

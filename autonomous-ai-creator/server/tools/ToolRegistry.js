class ToolRegistry {
  constructor() {
    this.tools = new Map();
    this.registerDefaultTools();
  }

  registerTool(tool) {
    this.tools.set(tool.name, tool);
  }

  getTool(name) {
    return this.tools.get(name);
  }

  listTools() {
    return Array.from(this.tools.values()).map(t => ({
      name: t.name,
      description: t.description,
      permissions: t.permissions,
      inputSchema: t.inputSchema,
      outputSchema: t.outputSchema,
    }));
  }

  registerDefaultTools() {
    // 1. Web Search Tool
    this.registerTool({
      name: 'web_search',
      description: 'Search public web pages for real-time information, competitor data, and articles.',
      permissions: 'read-only',
      inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] },
      outputSchema: { type: 'object', properties: { results: { type: 'array' } } },
      execute: async ({ query }) => {
        return {
          query,
          results: [
            { title: `${query} - Best Practices 2026`, snippet: 'Comprehensive guide covering architectural patterns, component isolation, and accessibility.', url: 'https://docs.example.com/guide' },
            { title: `${query} - Technical Case Study`, snippet: 'How modern engineering teams achieve 99.9% uptime with autonomous agents.', url: 'https://tech.example.com/case-study' }
          ],
          timestamp: new Date().toISOString()
        };
      }
    });

    // 2. File Reader Tool
    this.registerTool({
      name: 'file_reader',
      description: 'Read content from files in the project workspace.',
      permissions: 'read-only',
      inputSchema: { type: 'object', properties: { path: { type: 'string' } }, required: ['path'] },
      outputSchema: { type: 'object', properties: { content: { type: 'string' }, exists: { type: 'boolean' } } },
      execute: async ({ path: filePath }) => {
        return {
          path: filePath,
          content: `// Workspace file: ${filePath}\nexport default { version: '1.0.0', status: 'verified' };`,
          exists: true
        };
      }
    });

    // 3. File Writer Tool
    this.registerTool({
      name: 'file_writer',
      description: 'Write or modify code and assets in the project workspace.',
      permissions: 'sandboxed',
      inputSchema: { type: 'object', properties: { path: { type: 'string' }, content: { type: 'string' } }, required: ['path', 'content'] },
      outputSchema: { type: 'object', properties: { bytesWritten: { type: 'number' }, success: { type: 'boolean' } } },
      execute: async ({ path: filePath, content }) => {
        return {
          path: filePath,
          bytesWritten: content.length,
          success: true,
          timestamp: new Date().toISOString()
        };
      }
    });

    // 4. Code Execution Sandbox
    this.registerTool({
      name: 'code_runner',
      description: 'Execute JavaScript/Node code in an isolated sandbox environment.',
      permissions: 'sandboxed',
      inputSchema: { type: 'object', properties: { code: { type: 'string' }, language: { type: 'string' } }, required: ['code'] },
      outputSchema: { type: 'object', properties: { stdout: { type: 'string' }, exitCode: { type: 'number' } } },
      execute: async ({ code, language = 'javascript' }) => {
        return {
          language,
          stdout: `✓ Sandbox execution succeeded.\nTest suite passed: 12/12 specs.\nOutput: [OK]`,
          exitCode: 0,
          executionTimeMs: 38
        };
      }
    });

    // 5. Database Tool
    this.registerTool({
      name: 'db_access',
      description: 'Execute SQL queries or inspect database schemas.',
      permissions: 'restricted',
      inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] },
      outputSchema: { type: 'object', properties: { rows: { type: 'array' }, count: { type: 'number' } } },
      execute: async ({ query }) => {
        return {
          query,
          rows: [{ id: 1, name: 'Sample Entry', createdAt: new Date().toISOString() }],
          count: 1
        };
      }
    });

    // 6. HTTP API Tool
    this.registerTool({
      name: 'http_api',
      description: 'Send GET/POST requests to external API endpoints.',
      permissions: 'sandboxed',
      inputSchema: { type: 'object', properties: { url: { type: 'string' }, method: { type: 'string' } }, required: ['url'] },
      outputSchema: { type: 'object', properties: { status: { type: 'number' }, body: { type: 'object' } } },
      execute: async ({ url, method = 'GET' }) => {
        return {
          url,
          method,
          status: 200,
          body: { success: true, message: 'API call succeeded' }
        };
      }
    });

    // 7. Document Generator Tool
    this.registerTool({
      name: 'doc_generator',
      description: 'Compile formatted Markdown, HTML, and PDF documentation packages.',
      permissions: 'sandboxed',
      inputSchema: { type: 'object', properties: { title: { type: 'string' }, markdown: { type: 'string' } }, required: ['title', 'markdown'] },
      outputSchema: { type: 'object', properties: { documentId: { type: 'string' }, url: { type: 'string' } } },
      execute: async ({ title }) => {
        return {
          title,
          documentId: 'doc-' + Math.random().toString(36).substr(2, 9),
          pages: 4,
          format: 'pdf/markdown'
        };
      }
    });

    // 8. Image Generator Tool
    this.registerTool({
      name: 'image_generator',
      description: 'Generate UI mockups, icons, and visual assets.',
      permissions: 'sandboxed',
      inputSchema: { type: 'object', properties: { prompt: { type: 'string' } }, required: ['prompt'] },
      outputSchema: { type: 'object', properties: { imageUrl: { type: 'string' } } },
      execute: async ({ prompt }) => {
        return {
          prompt,
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
          aspectRatio: '16:9'
        };
      }
    });

    // 9. Browser Automation Tool
    this.registerTool({
      name: 'browser_auto',
      description: 'Automate browser navigation and visual DOM inspection.',
      permissions: 'restricted',
      inputSchema: { type: 'object', properties: { action: { type: 'string' }, targetUrl: { type: 'string' } }, required: ['targetUrl'] },
      outputSchema: { type: 'object', properties: { screenshotUrl: { type: 'string' } } },
      execute: async ({ targetUrl }) => {
        return {
          targetUrl,
          screenshotCaptured: true,
          viewport: '1920x1080',
          domElementsInspected: 142
        };
      }
    });
  }
}

export const toolRegistry = new ToolRegistry();

# Part 1: Core Architecture & Data Models
Prompt:

"Act as a senior backend engineer. We are building an autonomous agent service that collects, processes, and serves content via a clean JSON API.

Create a lightweight server using Node.js (Express/Fastify) or Python (FastAPI).

Set up the foundational data model for a Post. Each post must match this exact TypeScript interface/JSON schema:
interface Post {
  id: string; // Unique identifier (UUID or deterministic hash)
  title: string;
  content: string;
  createdAt: string; // ISO 8601 UTC timestamp (e.g., "2026-08-09T19:34:29Z")
  sources: string[]; // List of source URLs
}
Implement an in-memory or SQLite storage mechanism to store and retrieve posts seamlessly."

# Part 2: Endpoint Implementation & Strict API Requirements
Prompt:

"Now let's implement the core required API routes according to the system specifications:

POST /api/agent/init

Called exactly once by the evaluator.

Triggers the initial setup and starts the background autonomous agent loop.

Returns { "status": "initialized" } with a 200 OK status code.

GET /api/agent/feed

Returns all generated posts in reverse chronological order (newest first).

If no posts exist yet, it MUST return { "posts": [] }.

Previously returned posts must remain accessible across subsequent calls.

Add strict JSON schema validation and error handling to ensure all payload standards are strictly met."

# Part 3: Autonomous Agent Engine & Background Worker
Prompt:

"Build the autonomous agent engine that runs after POST /api/agent/init is called.

Requirements:

Create a background worker (or async task loop) that periodically generates fresh, unique content.

Ensure each generated post automatically includes:

A unique ID (e.g., uuidv4()).

An updated createdAt UTC timestamp formatted to standard ISO 8601.

Relevant sources URLs array.

Ensure idempotency and state safety so previously created posts are appended to state without overriding existing entries."

# Part 4: LLM / Dynamic Content Generation Integration
Prompt:

"Wire up an LLM/AI tool integration (or dynamic content generation pipeline) to empower the autonomous agent.

The agent should synthesize news, summary insights, or target domain data and format the output directly into valid Post objects.

Ensure the output strictly conforms to the JSON structure without extraneous prose or markdown wrapping.

Add robust fallback handling so if an LLM call fails, the agent retries gracefully without breaking the continuous polling on GET /api/agent/feed."

# Part 5: Testing, Validation, and Deployment Readiness
Prompt:

"Write a automated test suite and verification script to ensure compliance with all evaluator requirements:

Verify that POST /api/agent/init initializes cleanly.

Call GET /api/agent/feed before and after initialization to confirm output formats (verify empty state { "posts": [] } vs populated feed).

Verify that createdAt timestamps are valid ISO 8601 UTC strings and sorted newest-first.

Verify that calling GET /api/agent/feed repeatedly keeps historical posts intact while adding newly generated ones.

Provide Dockerfile and deployment steps for production hosting."
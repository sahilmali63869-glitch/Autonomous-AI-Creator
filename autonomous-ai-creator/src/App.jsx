import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Workspace } from './pages/Workspace';
import { TaskDetail } from './pages/TaskDetail';
import { Workflows } from './pages/Workflows';
import { Agents } from './pages/Agents';
import { Tools } from './pages/Tools';
import { Files } from './pages/Files';
import { Projects } from './pages/Projects';
import { History } from './pages/History';
import { Settings } from './pages/Settings';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [activeTaskLogs, setActiveTaskLogs] = useState([]);
  const [agents, setAgents] = useState([]);
  const [tools, setTools] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [projects, setProjects] = useState([]);
  const [files, setFiles] = useState([]);
  const [logs, setLogs] = useState([]);
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchTasks();
    fetchAgents();
    fetchTools();
    fetchWorkflows();
    fetchProjects();
    fetchFiles();
    fetchLogs();
    fetchSettings();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data || []);
    } catch (e) {
      console.error('Error fetching tasks:', e);
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await fetch('/api/agents');
      const data = await res.json();
      setAgents(data || []);
    } catch (e) {}
  };

  const fetchTools = async () => {
    try {
      const res = await fetch('/api/tools');
      const data = await res.json();
      setTools(data || []);
    } catch (e) {}
  };

  const fetchWorkflows = async () => {
    try {
      const res = await fetch('/api/workflows');
      const data = await res.json();
      setWorkflows(data || []);
    } catch (e) {}
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data || []);
    } catch (e) {}
  };

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/files');
      const data = await res.json();
      setFiles(data || []);
    } catch (e) {}
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs');
      const data = await res.json();
      setLogs(data || []);
    } catch (e) {}
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data || {});
    } catch (e) {}
  };

  // SSE Stream Listener for Active Task Execution
  useEffect(() => {
    if (!activeTask) return;

    const eventSource = new EventSource(`/api/tasks/${activeTask.id}/stream`);

    eventSource.onmessage = (e) => {
      try {
        const updated = JSON.parse(e.data);
        setActiveTask(updated);
        fetchTasks();
      } catch (err) {}
    };

    eventSource.addEventListener('log', (e) => {
      try {
        const logEntry = JSON.parse(e.data);
        setActiveTaskLogs(prev => [...prev, logEntry]);
        setLogs(prev => [logEntry, ...prev]);
      } catch (err) {}
    });

    eventSource.addEventListener('status_change', (e) => {
      fetchTasks();
    });

    return () => eventSource.close();
  }, [activeTask?.id]);

  // Submit Goal -> Generate Plan & Start Execution
  const handleSubmitGoal = async ({ goal, options = {}, mode = 'execute' }) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, options })
      });
      const newTask = await res.json();

      setTasks(prev => [newTask, ...prev]);
      setActiveTask(newTask);
      setActiveTaskLogs([]);

      if (mode === 'execute') {
        await fetch(`/api/tasks/${newTask.id}/execute`, { method: 'POST' });
      }

      setCurrentTab('task_detail');
    } catch (e) {
      console.error('Error submitting goal:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Execution Controls
  const handlePauseTask = async () => {
    if (!activeTask) return;
    await fetch(`/api/tasks/${activeTask.id}/pause`, { method: 'POST' });
  };

  const handleResumeTask = async () => {
    if (!activeTask) return;
    await fetch(`/api/tasks/${activeTask.id}/execute`, { method: 'POST' });
  };

  const handleCancelTask = async () => {
    if (!activeTask) return;
    await fetch(`/api/tasks/${activeTask.id}/cancel`, { method: 'POST' });
  };

  const handleForceCompleteTask = async () => {
    if (!activeTask) return;
    await fetch(`/api/tasks/${activeTask.id}/force-complete`, { method: 'POST' });
  };

  const handleApprovalDecision = async (subtaskId, decision) => {
    if (!activeTask) return;
    await fetch(`/api/tasks/${activeTask.id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subtaskId, decision })
    });
  };

  const handleOpenTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setActiveTask(task);
      setActiveTaskLogs(logs.filter(l => l.taskId === taskId));
      setCurrentTab('task_detail');
    }
  };

  const handleSaveSettings = async (newSettings) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      const data = await res.json();
      setSettings(data);
    } catch (e) {}
  };

  if (currentTab === 'landing') {
    return <LandingPage onEnterApp={() => setCurrentTab('dashboard')} />;
  }

  return (
    <AppLayout
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      activeAiStatus={activeTask?.status === 'running' ? 'Processing' : 'Online'}
    >
      {currentTab === 'dashboard' && (
        <Dashboard
          tasks={tasks}
          onNewTask={() => setCurrentTab('new_task')}
          onOpenTask={handleOpenTask}
          onNavigateTab={setCurrentTab}
        />
      )}

      {(currentTab === 'new_task' || currentTab === 'workspace') && (
        <Workspace onSubmitGoal={handleSubmitGoal} isLoading={isLoading} />
      )}

      {currentTab === 'tasks' && (
        <Dashboard
          tasks={tasks}
          onNewTask={() => setCurrentTab('new_task')}
          onOpenTask={handleOpenTask}
          onNavigateTab={setCurrentTab}
        />
      )}

      {currentTab === 'task_detail' && (
        <TaskDetail
          task={activeTask}
          logs={activeTaskLogs}
          onPause={handlePauseTask}
          onResume={handleResumeTask}
          onCancel={handleCancelTask}
          onDecision={handleApprovalDecision}
          onBack={() => setCurrentTab('dashboard')}
        />
      )}

      {currentTab === 'agents' && <Agents agents={agents} />}
      {currentTab === 'tools' && <Tools tools={tools} />}
      {currentTab === 'workflows' && (
        <Workflows
          workflows={workflows}
          onSaveWorkflow={async (wf) => {
            await fetch('/api/workflows', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(wf)
            });
            fetchWorkflows();
          }}
          onRunWorkflow={(wf) => {
            handleSubmitGoal({ goal: `Run Workflow: ${wf.name}`, options: { workflowId: wf.id } });
          }}
        />
      )}
      {currentTab === 'projects' && <Projects projects={projects} />}
      {currentTab === 'files' && <Files files={files} />}
      {currentTab === 'history' && <History logs={logs} />}
      {currentTab === 'settings' && <Settings settings={settings} onSaveSettings={handleSaveSettings} />}
    </AppLayout>
  );
}

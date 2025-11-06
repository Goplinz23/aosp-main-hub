import { create } from 'zustand';

export const useAIManagerStore = create((set, get) => ({
  // Current Phase Management
  currentPhase: 0,
  phases: [
    {
      id: 1,
      name: 'Validation Agent',
      description: 'Auto-posts X/LinkedIn polls → Grok analyzes → builds waitlist',
      status: 'pending',
      progress: 0,
      tasks: [],
      results: null,
      agent: null
    },
    {
      id: 2,
      name: 'MVP Builder',
      description: 'Energy Optimizer (user inputs → Grok tips + carbon score)',
      status: 'pending',
      progress: 0,
      tasks: [],
      results: null,
      agent: null
    },
    {
      id: 3,
      name: 'Funding Agent',
      description: 'Drafts/submits grants, pre-sells on Gumroad',
      status: 'pending',
      progress: 0,
      tasks: [],
      results: null,
      agent: null
    },
    {
      id: 4,
      name: 'Marketing Agent', 
      description: 'Runs Meta ads, generates SEO content, A/B tests',
      status: 'pending',
      progress: 0,
      tasks: [],
      results: null,
      agent: null
    },
    {
      id: 5,
      name: 'Monitoring Agent',
      description: 'Tracks users, revenue, churn → alerts via email/Slack',
      status: 'pending',
      progress: 0,
      tasks: [],
      results: null,
      agent: null
    },
    {
      id: 6,
      name: 'AOSP Live App',
      description: 'Embedded freemium sustainability tool ($10/mo via Stripe)',
      status: 'pending',
      progress: 0,
      tasks: [],
      results: null,
      agent: null
    }
  ],

  // AI Manager State
  aiManagerRunning: false,
  pendingApprovals: [],
  systemLogs: [],
  grokChat: {
    messages: [],
    isLoading: false
  },

  // Actions
  setCurrentPhase: (phaseIndex) => set({ currentPhase: phaseIndex }),
  
  updatePhase: (phaseId, updates) => set((state) => ({
    phases: state.phases.map(phase => 
      phase.id === phaseId ? { ...phase, ...updates } : phase
    )
  })),

  startAIManager: () => set({ aiManagerRunning: true }),
  stopAIManager: () => set({ aiManagerRunning: false }),

  addPendingApproval: (approval) => set((state) => ({
    pendingApprovals: [...state.pendingApprovals, approval]
  })),

  removePendingApproval: (approvalId) => set((state) => ({
    pendingApprovals: state.pendingApprovals.filter(a => a.id !== approvalId)
  })),

  addSystemLog: (log) => set((state) => ({
    systemLogs: [{
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...log
    }, ...state.systemLogs].slice(0, 100)
  })),

  addGrokMessage: (message) => set((state) => ({
    grokChat: {
      ...state.grokChat,
      messages: [...state.grokChat.messages, {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...message
      }]
    }
  })),

  setGrokLoading: (loading) => set((state) => ({
    grokChat: {
      ...state.grokChat,
      isLoading: loading
    }
  })),

  // Mock Phase 1 Simulation
  runPhase1Simulation: async () => {
    const { addSystemLog, updatePhase, addPendingApproval } = get();
    
    addSystemLog({ type: 'info', message: 'Starting Phase 1 Validation simulation...' });
    updatePhase(1, { status: 'running', progress: 10 });

    // Mock validation poll creation
    setTimeout(() => {
      addSystemLog({ type: 'success', message: 'Validation poll created for X/LinkedIn' });
      updatePhase(1, { progress: 30 });
      
      // Mock Grok analysis
      setTimeout(() => {
        addSystemLog({ type: 'info', message: 'Grok analyzing market validation data...' });
        updatePhase(1, { progress: 60 });
        
        // Mock waitlist building
        setTimeout(() => {
          addSystemLog({ type: 'success', message: 'Waitlist setup complete - 47 early adopters identified' });
          updatePhase(1, { progress: 90 });
          
          // Request approval
          setTimeout(() => {
            addPendingApproval({
              id: 'phase1-approval',
              type: 'phase-completion',
              title: 'Phase 1 Ready: Post validation poll to X?',
              description: 'AI has analyzed market potential and created optimized poll content. Ready to post to X/LinkedIn for real validation.',
              phaseId: 1,
              action: 'post-validation-poll',
              data: {
                pollContent: 'Would you pay $10/mo for an AI that automatically optimizes your energy usage and tracks your carbon footprint? 🌱\n\n✅ Reduces energy bills by 15-30%\n✅ Real-time sustainability insights\n✅ Automated home optimization\n\n#CleanTech #AI #Sustainability',
                targetAudience: 'Sustainability enthusiasts, tech early adopters',
                estimatedReach: '10K-50K impressions'
              }
            });
            updatePhase(1, { status: 'pending_approval', progress: 100 });
            addSystemLog({ type: 'info', message: 'Phase 1 complete - awaiting human approval to proceed' });
          }, 1000);
        }, 1500);
      }, 2000);
    }, 1000);
  }
}));

export const useSocketStore = create((set) => ({
  socket: null,
  isConnected: false,
  
  setSocket: (socket) => set({ socket }),
  setIsConnected: (connected) => set({ isConnected: connected }),
}));

'use client';

import React, { useEffect, useState } from 'react';
import { useAIManagerStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Zap,
  Brain,
  Users,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Leaf
} from 'lucide-react';
import { GrokChat } from './GrokChat';
import { ApprovalModal } from './ApprovalModal';

export function AIManagerDashboard() {
  const {
    phases,
    currentPhase,
    aiManagerRunning,
    pendingApprovals,
    systemLogs,
    startAIManager,
    stopAIManager,
    runPhase1Simulation,
    addSystemLog
  } = useAIManagerStore();

  const [selectedApproval, setSelectedApproval] = useState(null);

  // Auto-start simulation when AI Manager starts
  useEffect(() => {
    if (aiManagerRunning && phases[0].status === 'pending') {
      runPhase1Simulation();
    }
  }, [aiManagerRunning]);

  const handleStartAIManager = () => {
    startAIManager();
    addSystemLog({ 
      type: 'info', 
      message: 'AI Manager orchestration system activated - Beginning Phase 1' 
    });
  };

  const handleStopAIManager = () => {
    stopAIManager();
    addSystemLog({ 
      type: 'warning', 
      message: 'AI Manager paused - All autonomous operations suspended' 
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'running': return <Zap className="h-5 w-5 text-blue-500 animate-pulse" />;
      case 'pending_approval': return <Clock className="h-5 w-5 text-orange-500" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <div className="h-5 w-5 rounded-full bg-gray-300" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'pending': 'secondary',
      'running': 'default', 
      'completed': 'success',
      'pending_approval': 'warning',
      'error': 'destructive'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status.replace('_', ' ')}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900">AOSP Main Hub</h1>
            </div>
            <Badge variant="outline" className="bg-white">
              AI-Orchestrated Sustainability Platform
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
              aiManagerRunning ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium">
                AI Manager {aiManagerRunning ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            {aiManagerRunning ? (
              <Button onClick={handleStopAIManager} variant="outline">
                <Pause className="h-4 w-4 mr-2" /> Pause System
              </Button>
            ) : (
              <Button onClick={handleStartAIManager} className="bg-green-600 hover:bg-green-700">
                <Play className="h-4 w-4 mr-2" /> Start AI Manager
              </Button>
            )}
          </div>
        </div>

        {/* Pending Approvals Alert */}
        {pendingApprovals.length > 0 && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="flex items-center justify-between">
              <span>
                {pendingApprovals.length} approval{pendingApprovals.length > 1 ? 's' : ''} pending
              </span>
              <Button 
                size="sm" 
                onClick={() => setSelectedApproval(pendingApprovals[0])}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Review Now
              </Button>
            </AlertDescription>
          </Alert>
        )}

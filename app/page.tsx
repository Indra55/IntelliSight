"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Brain,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Zap,
  Users,
  BarChart3,
  Mic,
  FileText,
  AlertTriangle,
  Target,
  Settings,
  Mail,
  Calendar,
  Eye,
  Send,
  MoreHorizontal,
  Bell,
  Filter,
  Download,
  Upload,
  Clock,
  Building,
  Phone,
  AlertCircle,
  CheckCircle2,
  Info,
  Plus,
  RefreshCw,
  Share,
  Activity,
  Cpu,
  Database,
  Shield,
  Search,
  Star,
  Workflow,
  Volume2,
  Play,
  Square,
} from "lucide-react"

// Enhanced mock data with more realistic values
const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Senior Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 95,
    status: "excellent",
    lastActive: "2 hours ago",
    projects: ["Project Alpha", "Project Beta"],
    voiceSentiment: 0.85,
    productivity: 92,
    collaboration: 88,
    aiScore: 94,
    trend: "up",
    location: "San Francisco",
    timezone: "PST",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "UI Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 72,
    status: "needs_improvement",
    lastActive: "5 hours ago",
    projects: ["Project Gamma"],
    voiceSentiment: 0.45,
    productivity: 68,
    collaboration: 75,
    aiScore: 71,
    trend: "down",
    location: "New York",
    timezone: "EST",
  },
  {
    id: 3,
    name: "Carol Davis",
    role: "Data Analyst",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 89,
    status: "good",
    lastActive: "1 hour ago",
    projects: ["Project Delta", "Project Alpha"],
    voiceSentiment: 0.78,
    productivity: 85,
    collaboration: 92,
    aiScore: 88,
    trend: "up",
    location: "Austin",
    timezone: "CST",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 91,
    status: "excellent",
    lastActive: "30 minutes ago",
    projects: ["Project Beta", "Project Epsilon"],
    voiceSentiment: 0.82,
    productivity: 89,
    collaboration: 94,
    aiScore: 92,
    trend: "up",
    location: "Seattle",
    timezone: "PST",
  },
]

const projects = [
  {
    id: 1,
    name: "Project Alpha",
    status: "on_track",
    progress: 78,
    deadline: "2024-02-15",
    team: ["Alice Johnson", "Carol Davis"],
    priority: "high",
    budget: 150000,
    spent: 117000,
    category: "AI Development",
    risk: "low",
  },
  {
    id: 2,
    name: "Project Beta",
    status: "at_risk",
    progress: 45,
    deadline: "2024-01-30",
    team: ["Alice Johnson", "David Wilson"],
    priority: "critical",
    budget: 200000,
    spent: 180000,
    category: "Platform Migration",
    risk: "high",
  },
  {
    id: 3,
    name: "Project Gamma",
    status: "delayed",
    progress: 32,
    deadline: "2024-02-01",
    team: ["Bob Smith"],
    priority: "medium",
    budget: 80000,
    spent: 65000,
    category: "UI Redesign",
    risk: "medium",
  },
]

const anomalies = [
  {
    id: 1,
    type: "contradiction",
    severity: "high",
    title: "Multi-Modal Data Contradiction",
    description:
      "Meeting transcript shows 95% satisfaction, but voice sentiment analysis indicates 60% satisfaction. Cross-modal fusion detected significant discrepancy.",
    timestamp: "5 minutes ago",
    source: "Intel OPEA Fusion Engine",
    status: "active",
    confidence: 0.92,
    impact: "high",
  },
  {
    id: 2,
    type: "performance",
    severity: "medium",
    title: "Productivity Anomaly Detected",
    description:
      "Bob's reported hours don't match actual productivity metrics. AI analysis suggests 23% efficiency gap.",
    timestamp: "15 minutes ago",
    source: "Performance Analytics",
    status: "investigating",
    confidence: 0.78,
    impact: "medium",
  },
  {
    id: 3,
    type: "bias",
    severity: "low",
    title: "Leadership Bias Alert",
    description: "Overconfidence detected in Q1 projections based on voice analysis. Sentiment bias score: 0.34",
    timestamp: "1 hour ago",
    source: "Voice Sentiment Engine",
    status: "resolved",
    confidence: 0.65,
    impact: "low",
  },
]

const voiceInsights = [
  {
    id: 1,
    type: "meeting",
    title: "Daily Standup - Team Alpha",
    duration: "15 min",
    participants: 4,
    sentiment: 0.6,
    keyInsights: [
      "Team morale down 12% from last week",
      "Concerns about project timeline raised",
      "Alice showing high confidence levels",
      "Bob seems disengaged during discussions",
    ],
    timestamp: "2 hours ago",
    transcriptAvailable: true,
    emotions: { positive: 45, neutral: 35, negative: 20 },
    speakers: ["Alice", "Bob", "Carol", "David"],
  },
  {
    id: 2,
    type: "call",
    title: "Client Call - Project Beta",
    duration: "45 min",
    participants: 6,
    sentiment: 0.8,
    keyInsights: [
      "Client satisfaction increased 20%",
      "Positive feedback on deliverables",
      "Request for additional features",
      "Strong confidence in team capabilities",
    ],
    timestamp: "4 hours ago",
    transcriptAvailable: true,
    emotions: { positive: 75, neutral: 20, negative: 5 },
    speakers: ["Alice", "David", "Client Team"],
  },
]

export default function EnterprisePlatform() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "user",
      content: "Analyze team performance with voice sentiment integration",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 2,
      type: "assistant",
      content: `🎯 **Comprehensive Performance Analysis**

**Overall Team Metrics:**
• Performance Score: 87% (↑5% from Q3)
• Voice Sentiment: 68% (⚠️ Attention needed)
• Productivity Index: 83.5%
• Collaboration Score: 87.25%

**Key Findings:**
• Alice Johnson: Exceptional performer (95%) with high voice confidence
• Bob Smith: Performance concern (72%) - low voice sentiment (45%)
• Cross-modal analysis shows alignment between performance and sentiment
• Team morale requires immediate attention

**AI Recommendations:**
1. Schedule 1:1 with Bob Smith (High Priority)
2. Implement team building activities
3. Review Project Gamma timeline and resources`,
      timestamp: new Date(Date.now() - 280000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("Project Manager")
  // Add state for selected project
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id || "")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordingTime(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: chatMessages.length + 1,
      type: "user",
      content: newMessage,
      timestamp: new Date(),
    }

    setChatMessages([...chatMessages, userMessage])
    setNewMessage("")

    // Simulate AI response with typing indicator
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        type: "assistant",
        content: generateEnhancedAIResponse(newMessage),
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, aiResponse])
    }, 1500)
  }

  const generateEnhancedAIResponse = (message: string) => {
    const responses = {
      performance: `🎯 **Performance Deep Dive**

**Current Status:**
• Team Average: 87% (Above benchmark)
• Top Performer: Alice Johnson (95%)
• Needs Attention: Bob Smith (72%)

**AI Analysis:**
• Voice sentiment correlation: 0.78
• Productivity trends show seasonal patterns
• Collaboration metrics indicate strong team dynamics

**Actionable Insights:**
1. Bob requires immediate intervention
2. Alice could mentor underperformers
3. Team morale initiatives recommended`,

      anomaly: `🚨 **Anomaly Detection Report**

**Active Alerts:**
• High Severity: 1 (Data contradiction)
• Medium Severity: 1 (Performance gap)
• Low Severity: 1 (Bias detection)

**Intel OPEA Analysis:**
• Cross-modal fusion confidence: 92%
• Pattern recognition accuracy: 94%
• False positive rate: <3%

**Recommended Actions:**
1. Investigate data contradiction immediately
2. Schedule performance review for Bob
3. Monitor bias patterns in leadership communications`,

      voice: `🎤 **Voice Intelligence Summary**

**Sentiment Analysis:**
• Overall: 68% (↓12% from last week)
• Client Calls: 80% (Positive trend)
• Internal Meetings: 60% (Needs attention)

**Key Patterns:**
• Morning meetings show higher engagement
• Friday sentiment consistently lower
• Alice demonstrates consistent confidence
• Bob shows declining participation

**Recommendations:**
• Implement mood tracking
• Adjust meeting schedules
• Focus on team engagement strategies`,

      project: `📊 **Project Portfolio Analysis**

**Status Overview:**
• On Track: 1 project (Alpha - 78%)
• At Risk: 1 project (Beta - 45%)
• Delayed: 1 project (Gamma - 32%)

**Risk Assessment:**
• Budget overruns detected in Beta
• Resource allocation issues in Gamma
• Alpha showing strong momentum

**Strategic Actions:**
1. Reallocate resources to Beta (Critical)
2. Consider timeline extension for Gamma
3. Leverage Alpha's success patterns`,
    }

    const lowerMessage = message.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    return `🤖 **AI Analysis Complete**

I've processed your request using Intel OPEA microservices. Based on current multi-modal data patterns, voice sentiment analysis, and cross-platform insights, here are my findings:

**Data Sources Analyzed:**
• Voice recordings and transcripts
• Performance metrics and KPIs
• Team collaboration patterns
• Project timeline data

**Confidence Score:** 94%

Would you like me to dive deeper into any specific area or generate actionable recommendations?`
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-emerald-400"
    if (performance >= 75) return "text-amber-400"
    return "text-red-400"
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      excellent: { color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", label: "Excellent" },
      good: { color: "bg-blue-500/20 text-blue-300 border-blue-500/30", label: "Good" },
      needs_improvement: { color: "bg-red-500/20 text-red-300 border-red-500/30", label: "Needs Improvement" },
      on_track: { color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", label: "On Track" },
      at_risk: { color: "bg-amber-500/20 text-amber-300 border-amber-500/30", label: "At Risk" },
      delayed: { color: "bg-red-500/20 text-red-300 border-red-500/30", label: "Delayed" },
      active: { color: "bg-violet-500/20 text-violet-300 border-violet-500/30", label: "Active" },
      investigating: { color: "bg-amber-500/20 text-amber-300 border-amber-500/30", label: "Investigating" },
      resolved: { color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", label: "Resolved" },
    }
    const config = statusConfig[status] || statusConfig.active
    return <Badge className={`${config.color} border backdrop-blur-sm`}>{config.label}</Badge>
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      case "medium":
        return <AlertCircle className="h-4 w-4 text-amber-400" />
      case "low":
        return <Info className="h-4 w-4 text-blue-400" />
      default:
        return <Info className="h-4 w-4 text-gray-400" />
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-violet-950">
      {/* Enhanced Header with Glassmorphism */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-violet-500/20 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Brain className="h-10 w-10 text-violet-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
                    IntelliSight
                  </h1>
                  <p className="text-xs text-gray-400">Enterprise AI Platform</p>
                </div>
                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">v2.0 Enterprise</Badge>
              </div>
              <Separator orientation="vertical" className="h-8 bg-violet-500/20" />
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-violet-400" />
                <div>
                  <span className="text-sm text-white font-medium">Project Manager Dashboard</span>
                  <p className="text-xs text-gray-400">Multi-Modal Intelligence</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Project Dropdown replaces Role Dropdown */}
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-[180px] bg-white text-black border-violet-500/20">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black border-violet-500/20">
                  {projects.map((project) => (
                    <SelectItem
                      key={project.id}
                      value={project.id.toString()}
                      className="text-black hover:bg-violet-100 focus:bg-violet-200"
                    >
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-white/5 border-violet-500/20 text-white placeholder-gray-400 focus:border-violet-400"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Data
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5 text-violet-400" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">3</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-gray-900/95 backdrop-blur-xl border-violet-500/20">
                  <div className="p-4">
                    <h4 className="font-semibold text-white mb-3">Real-time Alerts</h4>
                    {anomalies.slice(0, 3).map((anomaly) => (
                      <div key={anomaly.id} className="p-3 hover:bg-violet-500/10 rounded-lg mb-2">
                        <div className="flex items-start space-x-3">
                          {getSeverityIcon(anomaly.severity)}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{anomaly.title}</p>
                            <p className="text-xs text-gray-400">{anomaly.timestamp}</p>
                            <Badge className="mt-1 bg-violet-500/20 text-violet-300 text-xs">
                              {anomaly.confidence * 100}% confidence
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Avatar className="ring-2 ring-violet-500/30">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-violet-500/20 text-violet-300">PM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar with Glassmorphism */}
        <aside className="w-72 bg-black/20 backdrop-blur-xl border-r border-violet-500/20 min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              {[
                { id: "dashboard", icon: BarChart3, label: "Dashboard", badge: "Live" },
                { id: "team", icon: Users, label: "Team Performance", badge: "4" },
                { id: "voice", icon: Mic, label: "Voice Insights", badge: "New" },
                { id: "anomalies", icon: AlertTriangle, label: "Anomaly Detection", badge: "3" },
                { id: "chat", icon: MessageSquare, label: "Ask Insight", badge: "AI" },
                { id: "automation", icon: Zap, label: "Automation", badge: "Active" },
                { id: "projects", icon: Target, label: "Projects", badge: "12" },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start group transition-all duration-300 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25"
                      : "text-gray-300 hover:text-white hover:bg-violet-500/10"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge
                      className={`ml-2 text-xs ${
                        activeTab === item.id ? "bg-white/20 text-white" : "bg-violet-500/20 text-violet-300"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            <Separator className="my-6 bg-violet-500/20" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Intel OPEA Status</h3>
              <div className="space-y-3">
                {[
                  { service: "LLM Engine", status: "active", load: 78 },
                  { service: "Voice ASR", status: "active", load: 45 },
                  { service: "Embeddings", status: "active", load: 92 },
                  { service: "Guardrails", status: "active", load: 34 },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-300">{service.service}</span>
                    </div>
                    <span className="text-xs text-violet-300">{service.load}%</span>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </aside>

        {/* Enhanced Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Executive Dashboard
                  </h2>
                  <p className="text-gray-400 mt-2">Real-time multi-modal intelligence overview</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 animate-pulse">
                    <Activity className="mr-1 h-3 w-3" />
                    Real-time
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Enhanced Key Metrics with Glassmorphism */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Team Performance",
                    value: "87%",
                    change: "+5%",
                    trend: "up",
                    icon: Users,
                    color: "emerald",
                    description: "Above benchmark",
                  },
                  {
                    title: "Active Projects",
                    value: "12",
                    change: "3 due",
                    trend: "neutral",
                    icon: Target,
                    color: "blue",
                    description: "This week",
                  },
                  {
                    title: "Voice Sentiment",
                    value: "68%",
                    change: "-12%",
                    trend: "down",
                    icon: Mic,
                    color: "amber",
                    description: "Needs attention",
                  },
                  {
                    title: "AI Anomalies",
                    value: "3",
                    change: "Active",
                    trend: "alert",
                    icon: AlertTriangle,
                    color: "red",
                    description: "Requires review",
                  },
                ].map((metric, index) => (
                  <Card
                    key={index}
                    className="bg-white/5 backdrop-blur-xl border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-400">{metric.title}</p>
                          <p className={`text-3xl font-bold text-${metric.color}-400`}>{metric.value}</p>
                          <div className="flex items-center space-x-2">
                            {metric.trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-400" />}
                            {metric.trend === "down" && <TrendingDown className="h-3 w-3 text-red-400" />}
                            <span
                              className={`text-sm ${
                                metric.trend === "up"
                                  ? "text-emerald-400"
                                  : metric.trend === "down"
                                    ? "text-red-400"
                                    : "text-gray-400"
                              }`}
                            >
                              {metric.change}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{metric.description}</p>
                        </div>
                        <div
                          className={`p-4 bg-${metric.color}-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                        >
                          <metric.icon className={`h-8 w-8 text-${metric.color}-400`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Enhanced Insights and Actions */}
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-white/5 backdrop-blur-xl border-violet-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <BarChart3 className="mr-3 h-6 w-6 text-violet-400" />
                      Performance Trends
                      <Badge className="ml-auto bg-violet-500/20 text-violet-300">Last Quarter</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Team Performance</span>
                        <span className="text-sm font-bold text-emerald-400">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Voice Sentiment</span>
                        <span className="text-sm font-bold text-amber-400">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Project Completion</span>
                        <span className="text-sm font-bold text-blue-400">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl border-violet-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Zap className="mr-3 h-6 w-6 text-amber-400" />
                      Recommended Actions
                      <Badge className="ml-auto bg-amber-500/20 text-amber-300">AI Generated</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        action: "Schedule 1:1 with Bob Smith",
                        priority: "critical",
                        icon: Mail,
                        description: "Performance intervention required",
                        eta: "Today",
                      },
                      {
                        action: "Team Building Session",
                        priority: "high",
                        icon: Users,
                        description: "Address morale concerns",
                        eta: "This week",
                      },
                      {
                        action: "Review Project Beta Status",
                        priority: "critical",
                        icon: Eye,
                        description: "Data contradiction investigation",
                        eta: "Immediate",
                      },
                    ].map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`w-full justify-start p-4 h-auto bg-white/5 border-violet-500/20 text-left hover:bg-violet-500/10 group ${
                          action.priority === "critical"
                            ? "border-red-500/40 hover:border-red-400"
                            : action.priority === "high"
                              ? "border-amber-500/40 hover:border-amber-400"
                              : "border-violet-500/20 hover:border-violet-400"
                        }`}
                      >
                        <action.icon className="mr-3 h-5 w-5 text-violet-400 group-hover:scale-110 transition-transform" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-white">{action.action}</span>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={`text-xs ${
                                  action.priority === "critical"
                                    ? "bg-red-500/20 text-red-300"
                                    : action.priority === "high"
                                      ? "bg-amber-500/20 text-amber-300"
                                      : "bg-blue-500/20 text-blue-300"
                                }`}
                              >
                                {action.priority}
                              </Badge>
                              <span className="text-xs text-gray-400">{action.eta}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{action.description}</p>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Intel OPEA Status */}
              <Card className="bg-white/5 backdrop-blur-xl border-violet-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Cpu className="mr-3 h-6 w-6 text-blue-400" />
                    Intel OPEA Microservices Status
                    <Badge className="ml-auto bg-emerald-500/20 text-emerald-300">All Systems Operational</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: "LLM Engine", status: "active", load: 78, latency: "45ms", icon: Brain },
                      { name: "Voice ASR", status: "active", load: 45, latency: "120ms", icon: Mic },
                      { name: "Embeddings", status: "active", load: 92, latency: "23ms", icon: Database },
                      { name: "Guardrails", status: "active", load: 34, latency: "67ms", icon: Shield },
                    ].map((service, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white/5 border border-violet-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <service.icon className="h-5 w-5 text-violet-400" />
                            <span className="text-sm font-medium text-white">{service.name}</span>
                          </div>
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Load</span>
                            <span className="text-violet-300">{service.load}%</span>
                          </div>
                          <Progress value={service.load} className="h-1" />
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Latency</span>
                            <span className="text-emerald-300">{service.latency}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Team Performance Analytics
                  </h2>
                  <p className="text-gray-400 mt-2">Multi-modal performance insights with voice sentiment analysis</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48 bg-white/5 border-violet-500/20 text-white">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-violet-500/20">
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="developer">Developers</SelectItem>
                      <SelectItem value="designer">Designers</SelectItem>
                      <SelectItem value="analyst">Analysts</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Advanced Filter
                  </Button>
                </div>
              </div>

              <div className="grid gap-6">
                {teamMembers.map((member) => (
                  <Card
                    key={member.id}
                    className="bg-white/5 backdrop-blur-xl border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 group"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-6">
                          <div className="relative">
                            <Avatar className="h-16 w-16 ring-2 ring-violet-500/30 group-hover:ring-violet-400/50 transition-all">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-violet-500/20 text-violet-300 text-lg">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-gray-900 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                              <p className="text-violet-300 font-medium">{member.role}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                                <span className="flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {member.lastActive}
                                </span>
                                <span className="flex items-center">
                                  <Building className="mr-1 h-3 w-3" />
                                  {member.location}
                                </span>
                                <span>{member.timezone}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {getStatusBadge(member.status)}
                              <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                                {member.projects.length} projects
                              </Badge>
                              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                AI Score: {member.aiScore}%
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div className="flex items-center space-x-2">
                            <p className={`text-4xl font-bold ${getPerformanceColor(member.performance)}`}>
                              {member.performance}%
                            </p>
                            {member.trend === "up" ? (
                              <TrendingUp className="h-6 w-6 text-emerald-400" />
                            ) : (
                              <TrendingDown className="h-6 w-6 text-red-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400">Overall Performance</p>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(member.performance / 20)
                                    ? "text-amber-400 fill-current"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-6 mb-6">
                        {[
                          { label: "Productivity", value: member.productivity, color: "blue" },
                          { label: "Collaboration", value: member.collaboration, color: "emerald" },
                          { label: "Voice Sentiment", value: Math.round(member.voiceSentiment * 100), color: "violet" },
                          { label: "AI Performance", value: member.aiScore, color: "amber" },
                        ].map((metric, index) => (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">{metric.label}</span>
                              <span className={`text-sm font-bold text-${metric.color}-400`}>{metric.value}%</span>
                            </div>
                            <div className="relative">
                              <Progress value={metric.value} className="h-2" />
                              <div
                                className={`absolute top-0 left-0 h-2 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-400 rounded-full transition-all duration-1000`}
                                style={{ width: `${metric.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-400">Active Projects:</span>
                          <div className="flex space-x-2">
                            {member.projects.map((project, index) => (
                              <Badge
                                key={index}
                                className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs"
                              >
                                {project}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule 1:1
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Workflow className="mr-2 h-4 w-4" />
                            Action Plan
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-violet-400 hover:bg-violet-500/10">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-gray-900/95 backdrop-blur-xl border-violet-500/20"
                            >
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Performance History
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Send Resources
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Voice Analysis
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "voice" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Voice Intelligence Center
                  </h2>
                  <p className="text-gray-400 mt-2">Advanced voice sentiment analysis and speech pattern recognition</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Audio
                  </Button>
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                    className={
                      isRecording
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                    }
                  >
                    {isRecording ? (
                      <>
                        <Square className="mr-2 h-4 w-4" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-4 w-4" />
                        Start Recording
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {isRecording && (
                <Card className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-xl border-red-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-red-300 font-medium">Recording in progress...</span>
                          <span className="text-red-200 font-mono">{formatTime(recordingTime)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-red-900/30 h-3 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-red-500 to-pink-500 h-full animate-pulse"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                          <Volume2 className="h-4 w-4 text-red-400" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-8">
                {voiceInsights.map((insight) => (
                  <Card
                    key={insight.id}
                    className="bg-white/5 backdrop-blur-xl border-violet-500/20 hover:border-violet-400/40 transition-all duration-300"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-6">
                          <div className="relative">
                            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-2xl">
                              {insight.type === "meeting" ? (
                                <Users className="h-8 w-8 text-blue-400" />
                              ) : (
                                <Phone className="h-8 w-8 text-violet-400" />
                              )}
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gray-900"></div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <h3 className="text-xl font-semibold text-white">{insight.title}</h3>
                              <div className="flex items-center space-x-6 text-sm text-gray-400 mt-2">
                                <span className="flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {insight.duration}
                                </span>
                                <span className="flex items-center">
                                  <Users className="mr-1 h-3 w-3" />
                                  {insight.participants} participants
                                </span>
                                <span className="flex items-center">
                                  <Mic className="mr-1 h-3 w-3" />
                                  {insight.speakers.join(", ")}
                                </span>
                                <span>{insight.timestamp}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge
                                className={`${
                                  insight.sentiment >= 0.7
                                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                    : insight.sentiment >= 0.5
                                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                      : "bg-red-500/20 text-red-300 border-red-500/30"
                                }`}
                              >
                                Sentiment: {Math.round(insight.sentiment * 100)}%
                              </Badge>
                              {insight.transcriptAvailable && (
                                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                                  <FileText className="mr-1 h-3 w-3" />
                                  Transcript Available
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-3">
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="p-2 bg-emerald-500/10 rounded-lg">
                              <p className="text-xs text-gray-400">Positive</p>
                              <p className="text-sm font-bold text-emerald-400">{insight.emotions.positive}%</p>
                            </div>
                            <div className="p-2 bg-gray-500/10 rounded-lg">
                              <p className="text-xs text-gray-400">Neutral</p>
                              <p className="text-sm font-bold text-gray-400">{insight.emotions.neutral}%</p>
                            </div>
                            <div className="p-2 bg-red-500/10 rounded-lg">
                              <p className="text-xs text-gray-400">Negative</p>
                              <p className="text-sm font-bold text-red-400">{insight.emotions.negative}%</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <h4 className="font-semibold text-white flex items-center">
                          <Brain className="mr-2 h-4 w-4 text-violet-400" />
                          AI-Generated Key Insights
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {insight.keyInsights.map((keyInsight, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg border border-violet-500/20"
                            >
                              <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-300">{keyInsight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Intel OPEA ASR</Badge>
                          <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                            Sentiment Engine
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Transcript
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Export Analysis
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Share className="mr-2 h-4 w-4" />
                            Share Insights
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Replay Audio
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "anomalies" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Anomaly Detection Center
                  </h2>
                  <p className="text-gray-400 mt-2">Real-time contradiction detection and bias analysis</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48 bg-white/5 border-violet-500/20 text-white">
                      <SelectValue placeholder="Filter by severity" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-violet-500/20">
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Scan
                  </Button>
                </div>
              </div>

              <div className="grid gap-6">
                {anomalies.map((anomaly) => (
                  <Card
                    key={anomaly.id}
                    className={`bg-white/5 backdrop-blur-xl border-l-4 transition-all duration-300 hover:scale-[1.01] ${
                      anomaly.severity === "high"
                        ? "border-l-red-500 border-red-500/20"
                        : anomaly.severity === "medium"
                          ? "border-l-amber-500 border-amber-500/20"
                          : "border-l-blue-500 border-blue-500/20"
                    }`}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-6">
                          <div
                            className={`p-4 rounded-2xl ${
                              anomaly.severity === "high"
                                ? "bg-red-500/20"
                                : anomaly.severity === "medium"
                                  ? "bg-amber-500/20"
                                  : "bg-blue-500/20"
                            }`}
                          >
                            {getSeverityIcon(anomaly.severity)}
                            <div className="mt-1">
                              {anomaly.severity === "high" && (
                                <div className="w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
                              )}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-xl font-semibold text-white">{anomaly.title}</h3>
                              <p className="text-sm text-gray-300 mt-2">{anomaly.description}</p>
                            </div>
                            <div className="flex items-center space-x-6 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Database className="mr-1 h-3 w-3" />
                                Source: {anomaly.source}
                              </span>
                              <span className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {anomaly.timestamp}
                              </span>
                              <span className="flex items-center">
                                <Target className="mr-1 h-3 w-3" />
                                Impact: {anomaly.impact}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              {getStatusBadge(anomaly.status)}
                              <Badge
                                className={`${
                                  anomaly.severity === "high"
                                    ? "bg-red-500/20 text-red-300 border-red-500/30"
                                    : anomaly.severity === "medium"
                                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                      : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                }`}
                              >
                                {anomaly.severity.toUpperCase()} PRIORITY
                              </Badge>
                              <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                                {Math.round(anomaly.confidence * 100)}% Confidence
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-3">
                          <div className="p-4 bg-white/5 rounded-xl border border-violet-500/20">
                            <p className="text-xs text-gray-400 mb-1">Confidence Score</p>
                            <div className="flex items-center space-x-2">
                              <Progress value={anomaly.confidence * 100} className="h-2 flex-1" />
                              <span className="text-sm font-bold text-violet-400">
                                {Math.round(anomaly.confidence * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            Intel OPEA Guardrails
                          </Badge>
                          <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                            Cross-Modal Analysis
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Investigate
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Assign Team
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark Resolved
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-violet-400 hover:bg-violet-500/10">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-gray-900/95 backdrop-blur-xl border-violet-500/20"
                            >
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                View Full Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Create Investigation Ticket
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Export Report
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Schedule Review
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 hover:text-red-300">
                                Mark as False Positive
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Ask Insight AI Assistant
                  </h2>
                  <p className="text-gray-400 mt-2">Natural language interface powered by Intel OPEA microservices</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 animate-pulse">
                    <Activity className="mr-1 h-3 w-3" />
                    AI Assistant Online
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    AI Settings
                  </Button>
                </div>
              </div>

              <Card className="h-[700px] flex flex-col bg-white/5 backdrop-blur-xl border-violet-500/20">
                <CardHeader className="border-b border-violet-500/20 bg-gradient-to-r from-violet-500/10 to-purple-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-violet-500/20 rounded-lg">
                        <Brain className="h-6 w-6 text-violet-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-white">IntelliSight AI Assistant</span>
                        <p className="text-xs text-gray-400">
                          Multi-modal analysis • Voice integration • Real-time insights
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                        Intel OPEA Powered
                      </Badge>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full p-6">
                    <div className="space-y-6">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                              message.type === "user"
                                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white ml-12"
                                : "bg-white/10 text-gray-100 mr-12 border border-violet-500/20"
                            }`}
                          >
                            {message.type === "assistant" && (
                              <div className="flex items-center space-x-2 mb-3">
                                <Brain className="h-4 w-4 text-violet-400" />
                                <span className="text-xs text-violet-300 font-medium">AI Assistant</span>
                                <Badge className="bg-violet-500/20 text-violet-300 text-xs">Intel OPEA</Badge>
                              </div>
                            )}
                            <div className="prose prose-invert max-w-none">
                              <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                            </div>
                            <p
                              className={`text-xs mt-3 ${
                                message.type === "user" ? "text-violet-200" : "text-gray-500"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>

                <div className="border-t border-violet-500/20 p-6 bg-gradient-to-r from-black/20 to-violet-900/20">
                  <div className="flex space-x-3 mb-4">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Ask about team performance, voice insights, anomalies, or any multi-modal data..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="bg-white/5 border-violet-500/20 text-white placeholder-gray-400 focus:border-violet-400 pr-12"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                        <Mic className="h-4 w-4 text-gray-400 hover:text-violet-400 cursor-pointer transition-colors" />
                        <Phone className="h-4 w-4 text-gray-400 hover:text-violet-400 cursor-pointer transition-colors" />
                      </div>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-6 text-xs text-gray-500">
                    <span>Quick queries:</span>
                    {["Performance issues", "Voice sentiment trends", "Project risks", "Team anomalies"].map(
                      (query, index) => (
                        <button
                          key={index}
                          className="text-violet-400 hover:text-violet-300 hover:underline transition-colors"
                          onClick={() => setNewMessage(query)}
                        >
                          {query}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "automation" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Automation Engine
                  </h2>
                  <p className="text-gray-400 mt-2">Intelligent workflow automation with AI-driven decision making</p>
                </div>
                <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Rule
                </Button>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    id: 1,
                    name: "Performance Drop Alert",
                    condition: "Team member performance < 75%",
                    actions: [
                      "Schedule 1:1 meeting",
                      "Send improvement resources",
                      "Alert manager",
                      "Create action plan",
                    ],
                    status: "active",
                    triggered: 3,
                    lastTriggered: "2 hours ago",
                    category: "Performance",
                    priority: "high",
                  },
                  {
                    id: 2,
                    name: "Client Satisfaction Monitor",
                    condition: "Client satisfaction drops in any region",
                    actions: [
                      "Schedule leadership follow-up",
                      "Generate summary report",
                      "Alert stakeholders",
                      "Initiate damage control",
                    ],
                    status: "active",
                    triggered: 1,
                    lastTriggered: "2 weeks ago",
                    category: "Client Relations",
                    priority: "critical",
                  },
                  {
                    id: 3,
                    name: "Anomaly Response Protocol",
                    condition: "Data contradictions detected",
                    actions: [
                      "Gather additional context",
                      "Alert stakeholders",
                      "Create investigation ticket",
                      "Pause related processes",
                    ],
                    status: "active",
                    triggered: 1,
                    lastTriggered: "5 minutes ago",
                    category: "Data Quality",
                    priority: "medium",
                  },
                ].map((rule) => (
                  <Card
                    key={rule.id}
                    className="bg-white/5 backdrop-blur-xl border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 group"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-3 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl">
                              <Zap className="h-6 w-6 text-violet-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">{rule.name}</h3>
                              <p className="text-sm text-gray-400">{rule.category}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-300 mb-2">
                                <span className="text-violet-400">Condition:</span> {rule.condition}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-gray-300 mb-3">Automated Actions:</p>
                              <div className="grid md:grid-cols-2 gap-2">
                                {rule.actions.map((action, index) => (
                                  <Badge
                                    key={index}
                                    className="bg-violet-500/20 text-violet-300 border-violet-500/30 justify-start text-xs"
                                  >
                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                    {action}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center space-x-6 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Activity className="mr-1 h-3 w-3" />
                                Triggered {rule.triggered} times
                              </span>
                              <span className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                Last: {rule.lastTriggered}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {getStatusBadge(rule.status)}
                          <Badge
                            className={`${
                              rule.priority === "critical"
                                ? "bg-red-500/20 text-red-300 border-red-500/30"
                                : rule.priority === "high"
                                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                  : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            }`}
                          >
                            {rule.priority.toUpperCase()}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-violet-400 hover:bg-violet-500/10">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-gray-900/95 backdrop-blur-xl border-violet-500/20"
                            >
                              <DropdownMenuItem className="text-gray-300 hover:text-white">Edit Rule</DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                View Execution History
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Duplicate Rule
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">Test Rule</DropdownMenuItem>
                              <DropdownMenuItem className="text-amber-400 hover:text-amber-300">
                                Disable
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 hover:text-red-300">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Intel OPEA Agent</Badge>
                          <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                            Multi-Modal Trigger
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Logs
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Project Portfolio
                  </h2>
                  <p className="text-gray-400 mt-2">Comprehensive project management with AI-powered insights</p>
                </div>
                <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>

              <div className="grid gap-6">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="bg-white/5 backdrop-blur-xl border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 group"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-xl">
                              <Target className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                              <p className="text-sm text-gray-400">{project.category}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Deadline: {new Date(project.deadline).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {getStatusBadge(project.status)}
                          <Badge
                            className={`${
                              project.priority === "critical"
                                ? "bg-red-500/20 text-red-300 border-red-500/30"
                                : project.priority === "high"
                                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                  : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            }`}
                          >
                            {project.priority.toUpperCase()}
                          </Badge>
                          <Badge
                            className={`${
                              project.risk === "high"
                                ? "bg-red-500/20 text-red-300 border-red-500/30"
                                : project.risk === "medium"
                                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            }`}
                          >
                            {project.risk} Risk
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400">Project Progress</span>
                            <span className="text-sm font-bold text-violet-400">{project.progress}%</span>
                          </div>
                          <div className="relative">
                            <Progress value={project.progress} className="h-3" />
                            <div
                              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-1000"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <p className="text-sm text-gray-400">Team Members</p>
                            <div className="flex flex-wrap gap-2">
                              {project.team.map((member, index) => (
                                <Badge
                                  key={index}
                                  className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs"
                                >
                                  {member}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p className="text-sm text-gray-400">Budget Overview</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-300">Spent</span>
                                <span className="text-white font-medium">${project.spent.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-300">Budget</span>
                                <span className="text-white font-medium">${project.budget.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-300">Utilization</span>
                                <span
                                  className={`font-medium ${
                                    project.spent / project.budget > 0.9 ? "text-red-400" : "text-emerald-400"
                                  }`}
                                >
                                  {Math.round((project.spent / project.budget) * 100)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">AI Monitored</Badge>
                          <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                            Voice Insights
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Generate Report
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/5 border-violet-500/20 text-violet-300 hover:bg-violet-500/10"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Team Chat
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-violet-400 hover:bg-violet-500/10">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-gray-900/95 backdrop-blur-xl border-violet-500/20"
                            >
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Edit Project
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Add Team Member
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Update Timeline
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Risk Assessment
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white">
                                Archive Project
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Enhanced Project Analytics */}
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <p className="text-sm text-gray-400">Progress Tracking</p>
                          <Progress value={project.progress} className="h-3" />
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Started</span>
                            <span>In Progress</span>
                            <span>Completed</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm text-gray-400">Budget Utilization</p>
                          <Progress value={Math.round((project.spent / project.budget) * 100)} className="h-3" />
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Under Budget</span>
                            <span>At Risk</span>
                            <span>Over Budget</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm text-gray-400">Risk Assessment</p>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={`${
                                project.risk === "high"
                                  ? "bg-red-500/20 text-red-300 border-red-500/30"
                                  : project.risk === "medium"
                                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              }`}
                            >
                              {project.risk} Risk
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">AI-driven risk analysis</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

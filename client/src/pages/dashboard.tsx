import { useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  Settings, 
  Search, 
  Bell, 
  Menu, 
  X,
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Edit2,
  Trash2,
  MoreVertical,
  ChevronRight
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { stats as mockStats, activityData, recentPosts } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileText, label: "Posts", active: false },
  { icon: User, label: "Profile", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const StatIcon = ({ icon: Icon, color }: { icon: any, color: string }) => (
  <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-')}/10`}>
    <Icon className={`w-5 h-5 ${color}`} />
  </div>
);

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-50 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Analytics</span>
          </div>

          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  item.active 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
          </nav>

          <div className="pt-4 mt-auto border-t border-slate-800">
            <div className="bg-slate-800/50 rounded-2xl p-4">
              <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Pro Plan</p>
              <p className="text-sm text-slate-300 mb-3">Get unlimited posts and advanced analytics.</p>
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-500 text-white">Upgrade</Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-slate-400 hover:bg-slate-800"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="relative w-full group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <Input 
                placeholder="Search analytics..." 
                className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500/50 transition-all w-full h-10 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            <Button variant="ghost" size="icon" className="text-slate-400 relative hover:bg-slate-800">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
            </Button>
            <div className="h-8 w-px bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">Alex Johnson</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <Avatar className="h-9 w-9 border-2 border-slate-800 ring-2 ring-blue-600/20 transition-transform hover:scale-110">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8 custom-scrollbar">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
              <p className="text-slate-400 text-sm mt-1">Monitor your performance and activity.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800">Download CSV</Button>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20">Create New Post</Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {mockStats.map((stat, idx) => {
              const Icon = {
                FileText, Eye, Heart, MessageSquare
              }[stat.icon] || FileText;

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-all group cursor-default">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <StatIcon icon={Icon} color={stat.color} />
                        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Charts & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-8">
                <div>
                  <CardTitle className="text-lg font-bold text-white">Activity Overview</CardTitle>
                  <p className="text-sm text-slate-500">Views and engagement over time.</p>
                </div>
                <select className="bg-slate-800 border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </CardHeader>
              <CardContent className="h-[320px] pr-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 12}}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#64748b', fontSize: 12}}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0f172a', 
                        border: '1px solid #1e293b',
                        borderRadius: '12px',
                        color: '#f8fafc'
                      }} 
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#2563eb" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorViews)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="likes" 
                      stroke="#ec4899" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorLikes)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white">Engagement Rate</CardTitle>
                <p className="text-sm text-slate-500">By device type</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { label: "Mobile", value: 65, color: "bg-blue-600" },
                    { label: "Desktop", value: 28, color: "bg-purple-600" },
                    { label: "Tablet", value: 7, color: "bg-pink-600" }
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">{item.label}</span>
                        <span className="text-white font-bold">{item.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${item.color} rounded-full`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-blue-600/10 border border-blue-600/20 rounded-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-600/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="flex gap-3 relative z-10">
                    <TrendingUp className="w-5 h-5 text-blue-400 shrink-0" />
                    <p className="text-sm text-blue-100 leading-relaxed font-medium">Your engagement is up 12% compared to last week!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Posts Table */}
          <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-white">Recent Posts</CardTitle>
                <p className="text-sm text-slate-500">Manage your latest publications.</p>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/5">View All</Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-800/30">
                  <TableRow className="border-slate-800 hover:bg-transparent">
                    <TableHead className="text-slate-400 font-semibold py-4">Title</TableHead>
                    <TableHead className="text-slate-400 font-semibold">Date</TableHead>
                    <TableHead className="text-slate-400 font-semibold">Views</TableHead>
                    <TableHead className="text-slate-400 font-semibold">Status</TableHead>
                    <TableHead className="text-slate-400 font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPosts.map((post) => (
                    <TableRow key={post.id} className="border-slate-800 hover:bg-slate-800/30 transition-colors group">
                      <TableCell className="font-semibold text-slate-200 py-4 max-w-[300px] truncate">{post.title}</TableCell>
                      <TableCell className="text-slate-400 text-sm">{post.date}</TableCell>
                      <TableCell className="text-slate-400 text-sm">{post.views}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={post.status === "Published" 
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                            : "bg-slate-800 text-slate-400 border-slate-700"}
                        >
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
}

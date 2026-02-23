import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Sparkles, Layers, Link as LinkIcon, Settings, 
  Plus, GripVertical, Trash2, ExternalLink, Image as ImageIcon,
  Palette, BarChart3, Users, MousePointer2, TrendingUp, LogOut, User as UserIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from "framer-motion";

import bgMobile from "@/assets/images/bg-mobile-1.png";
import avatarImg from "@/assets/images/avatar-1.png";

type Tab = "links" | "appearance" | "settings" | "analytics";

const activityData = [
  { name: 'Mon', views: 400, clicks: 240 },
  { name: 'Tue', views: 300, clicks: 139 },
  { name: 'Wed', views: 200, clicks: 980 },
  { name: 'Thu', views: 278, clicks: 390 },
  { name: 'Fri', views: 189, clicks: 480 },
  { name: 'Sat', views: 239, clicks: 380 },
  { name: 'Sun', views: 349, clicks: 430 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("links");
  const [links, setLinks] = useState([
    { id: 1, title: "Latest Youtube Video", url: "https://youtube.com", isActive: true },
    { id: 2, title: "My Portfolio", url: "https://portfolio.com", isActive: true },
    { id: 3, title: "Support me on Patreon", url: "https://patreon.com", isActive: false },
  ]);
  const [profile, setProfile] = useState({
    username: "alex_creative",
    bio: "Digital artist & designer building the future of the web.",
    avatar: avatarImg,
    theme: "glass",
    buttonStyle: "rounded",
    fontFamily: "sans"
  });

  const stats = [
    { title: "Total Views", value: "2.4k", icon: Users, color: "text-blue-400" },
    { title: "Total Clicks", value: "842", icon: MousePointer2, color: "text-primary" },
    { title: "Click Rate", value: "35.1%", icon: TrendingUp, color: "text-green-400" },
    { title: "Active Links", value: "12", icon: LinkIcon, color: "text-accent" },
  ];

  const themes = [
    { id: "glass", name: "Glassmorphism", class: "bg-white/10 border border-white/20 backdrop-blur" },
    { id: "neon", name: "Neon Cyber", class: "bg-black border border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" },
    { id: "minimal", name: "Minimal Light", class: "bg-white text-black" },
    { id: "sunset", name: "Sunset Gold", class: "bg-gradient-to-br from-orange-400 to-rose-400 border-none" },
  ];

  const addLink = () => {
    const newLink = {
      id: Math.max(0, ...links.map(l => l.id)) + 1,
      title: "New Link",
      url: "https://",
      isActive: true,
    };
    setLinks([newLink, ...links]);
  };

  const updateLink = (id: number, field: string, value: any) => {
    setLinks(links.map(link => link.id === id ? { ...link, [field]: value } : link));
  };

  const deleteLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="min-h-screen bg-background flex text-foreground font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 glass-panel hidden lg:flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8 flex items-center gap-3 text-2xl font-heading font-bold text-white">
          <div className="bg-primary/20 p-2.5 rounded-2xl relative">
            <Sparkles className="w-6 h-6 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
          </div>
          BioLink
        </div>

        <nav className="px-4 space-y-2 flex-1 mt-4">
          {[
            { id: "links", label: "Links", icon: LinkIcon },
            { id: "appearance", label: "Appearance", icon: Palette },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <Button 
              key={item.id}
              variant="ghost" 
              className={`w-full justify-start rounded-2xl h-12 text-[15px] px-4 transition-all ${activeTab === item.id ? "bg-primary text-white font-semibold shadow-lg shadow-primary/20" : "text-white/50 hover:text-white hover:bg-white/5"}`}
              onClick={() => setActiveTab(item.id as Tab)}
            >
              <item.icon className={`mr-3 w-5 h-5 ${activeTab === item.id ? "text-white" : "text-white/40"}`} /> {item.label}
            </Button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="p-4 rounded-3xl bg-white/5 border border-white/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={avatarImg} alt="User" className="w-10 h-10 rounded-full border border-white/10" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0c0c0e]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">@alex_creative</p>
                <p className="text-[11px] text-primary font-bold uppercase tracking-wider">Pro Plan</p>
              </div>
            </div>
            <Link href="/auth">
              <Button variant="ghost" className="w-full justify-start text-white/40 hover:text-red-400 hover:bg-red-400/5 h-10 px-2 rounded-xl text-sm">
                <LogOut className="mr-3 w-4 h-4" /> Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Editor Main Area */}
      <main className="flex-1 flex flex-col relative lg:pl-72 bg-black/40">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-8 lg:px-12 bg-black/20 backdrop-blur-md sticky top-0 z-40">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white font-heading">Dashboard</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white/40 text-xs">biolink.me/alex_creative</span>
              <button className="text-[10px] text-primary font-bold uppercase hover:underline">Copy URL</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/alex_creative">
              <Button className="rounded-full bg-white text-black hover:bg-white/90 font-bold shadow-xl shadow-white/5">
                <ExternalLink className="w-4 h-4 mr-2" /> View Live
              </Button>
            </Link>
          </div>
        </header>

        <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="glass-panel p-6 rounded-3xl border-white/5"
                >
                  <div className={`p-2.5 rounded-2xl bg-white/5 w-fit mb-4 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-white/40 font-medium">{stat.title}</p>
                  <h4 className="text-2xl font-black text-white mt-1">{stat.value}</h4>
                </motion.div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "links" && (
                <motion.div 
                  key="links"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white font-heading">Manage Links</h3>
                    <Button 
                      className="rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold h-12 px-6 shadow-lg shadow-primary/20" 
                      onClick={addLink}
                    >
                      <Plus className="w-5 h-5 mr-2" /> Add Link
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {links.map((link) => (
                      <motion.div 
                        layout
                        key={link.id} 
                        className="group glass-panel rounded-3xl p-6 flex gap-6 items-center border-white/5 hover:border-primary/30 transition-all"
                      >
                        <div className="text-white/20 cursor-grab hover:text-white transition-colors">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="flex-1 grid md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Link Title</Label>
                            <Input 
                              value={link.title} 
                              onChange={(e) => updateLink(link.id, "title", e.target.value)}
                              className="bg-white/5 border-none text-white font-bold text-lg focus-visible:ring-1 focus-visible:ring-primary h-12 rounded-xl"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Destination URL</Label>
                            <Input 
                              value={link.url} 
                              onChange={(e) => updateLink(link.id, "url", e.target.value)}
                              className="bg-white/5 border-none text-white/50 focus-visible:ring-1 focus-visible:ring-primary h-12 rounded-xl"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-[1px] bg-white/5 hidden md:block" />
                          <Switch 
                            checked={link.isActive} 
                            onCheckedChange={(checked) => updateLink(link.id, "isActive", checked)}
                            className="data-[state=checked]:bg-primary"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 text-white/20 hover:text-red-400 hover:bg-red-400/5 rounded-xl"
                            onClick={() => deleteLink(link.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "analytics" && (
                <motion.div 
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-bold text-white font-heading">Analytics Overview</h3>
                  <div className="glass-panel p-8 rounded-[2rem] border-white/5 h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activityData}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#ffffff30" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                          dy={10}
                        />
                        <YAxis 
                          stroke="#ffffff30" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false} 
                          dx={-10}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1a1a1e', borderColor: '#ffffff10', borderRadius: '16px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="views" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorViews)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <Card className="glass-panel rounded-[2rem] border-white/5 bg-transparent">
                      <CardHeader>
                        <CardTitle className="text-lg font-bold text-white">Top Referrers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {[
                            { name: "Instagram", value: "45%", color: "bg-pink-500" },
                            { name: "TikTok", value: "32%", color: "bg-black" },
                            { name: "Direct", value: "15%", color: "bg-blue-400" },
                            { name: "Twitter", value: "8%", color: "bg-sky-400" },
                          ].map((item, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-white/60 font-medium">{item.name}</span>
                                <span className="text-white font-bold">{item.value}</span>
                              </div>
                              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.value }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-panel rounded-[2rem] border-white/5 bg-transparent">
                      <CardHeader>
                        <CardTitle className="text-lg font-bold text-white">Device Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center justify-center pt-8">
                         <div className="relative w-48 h-48">
                            <div className="absolute inset-0 rounded-full border-[12px] border-primary" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 70%)' }} />
                            <div className="absolute inset-0 rounded-full border-[12px] border-accent opacity-50" style={{ clipPath: 'polygon(0 70%, 100% 70%, 100% 100%, 0 100%)' }} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-3xl font-black text-white">70%</span>
                              <span className="text-xs text-white/40 font-bold uppercase tracking-tighter">Mobile</span>
                            </div>
                         </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {activeTab === "appearance" && (
                <motion.div 
                  key="appearance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="glass-panel p-8 rounded-[2rem] space-y-8 border-white/5">
                    <h3 className="text-2xl font-bold text-white font-heading">Profile</h3>
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                      <div className="relative group">
                        <img src={profile.avatar} className="w-32 h-32 rounded-full border-4 border-white/10 group-hover:border-primary/50 transition-colors" alt="Avatar" />
                        <button className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <ImageIcon className="w-8 h-8 text-white" />
                        </button>
                      </div>
                      <div className="space-y-4 text-center sm:text-left flex-1">
                        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                          <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold h-11 px-6">Upload Image</Button>
                          <Button variant="ghost" className="rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/5 h-11 px-6">Remove</Button>
                        </div>
                        <p className="text-sm text-white/30">Recommended: 1000x1000px JPG or PNG. Max size 5MB.</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Profile Username</Label>
                        <Input 
                          value={profile.username} 
                          onChange={(e) => setProfile({...profile, username: e.target.value})}
                          className="bg-white/5 border-none text-white font-bold h-14 rounded-2xl focus-visible:ring-1 focus-visible:ring-primary" 
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Profile Bio</Label>
                        <textarea 
                          className="w-full bg-white/5 border-none text-white font-medium rounded-2xl p-4 h-32 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel p-8 rounded-[2rem] space-y-8 border-white/5">
                    <h3 className="text-2xl font-bold text-white font-heading">Custom Themes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {themes.map(theme => (
                        <div 
                          key={theme.id} 
                          className={`space-y-3 text-center cursor-pointer group p-2 rounded-3xl transition-all ${profile.theme === theme.id ? 'ring-2 ring-primary bg-primary/5 shadow-2xl shadow-primary/20' : 'hover:bg-white/5'}`}
                          onClick={() => setProfile({...profile, theme: theme.id})}
                        >
                          <div className={`h-32 rounded-2xl ${theme.class} group-hover:scale-[1.02] transition-transform shadow-inner`} />
                          <span className="text-xs text-white/60 font-bold uppercase tracking-widest">{theme.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                 <motion.div 
                    key="settings"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    <div className="glass-panel p-8 rounded-[2rem] space-y-8 border-white/5">
                      <h3 className="text-2xl font-bold text-white font-heading">Account Settings</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                           <div className="space-y-2">
                            <Label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Email Address</Label>
                            <Input className="bg-white/5 border-none text-white/60 h-14 rounded-2xl" value="alex@example.com" readOnly />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Display Language</Label>
                            <Input className="bg-white/5 border-none text-white h-14 rounded-2xl" value="English (US)" />
                          </div>
                        </div>
                        <div className="space-y-6">
                           <div className="space-y-4">
                              <Label className="text-lg font-bold text-white">Notifications</Label>
                              <div className="space-y-4">
                                {[
                                  { label: "Email notifications", desc: "Receive updates about your account activity" },
                                  { label: "Marketing emails", desc: "Get news about new features and offers" }
                                ].map((item, i) => (
                                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                                    <div className="space-y-0.5">
                                      <p className="text-sm font-bold text-white">{item.label}</p>
                                      <p className="text-[11px] text-white/30">{item.desc}</p>
                                    </div>
                                    <Switch defaultChecked />
                                  </div>
                                ))}
                              </div>
                           </div>
                        </div>
                      </div>
                      <div className="pt-8 border-t border-white/5 flex gap-4">
                        <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8">Save Changes</Button>
                        <Button variant="ghost" className="rounded-xl text-white/40 hover:bg-white/5 h-12 px-8">Discard</Button>
                      </div>
                    </div>

                    <div className="glass-panel p-8 rounded-[2rem] space-y-8 border-white/5 border-red-500/10">
                      <h3 className="text-2xl font-bold text-red-400 font-heading">Danger Zone</h3>
                      <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-1 text-center md:text-left">
                          <p className="text-lg font-bold text-white">Delete Account</p>
                          <p className="text-sm text-white/40">Permanently remove your account and all its data. This action cannot be undone.</p>
                        </div>
                        <Button variant="destructive" className="rounded-xl h-12 px-8 font-bold">Delete Forever</Button>
                      </div>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Live Preview Panel (Desktop only) */}
      <aside className="w-[500px] border-l border-white/5 bg-black/20 hidden xl:flex items-center justify-center p-12 sticky top-0 h-screen">
        <div className="mobile-mockup scale-[0.9] origin-center transform-gpu shadow-[0_0_80px_rgba(0,0,0,0.6)] border-white/10 border">
          <img 
            src={bgMobile} 
            alt="Background" 
            className={`absolute inset-0 w-full h-full object-cover opacity-80 ${profile.theme === 'minimal' ? 'brightness-150 grayscale' : ''}`} 
          />
          
          <div className="relative z-10 flex flex-col items-center p-6 h-full overflow-y-auto custom-scrollbar">
            <motion.img 
              layoutId="avatar"
              src={profile.avatar} 
              alt="Avatar" 
              className="w-24 h-24 rounded-full border-4 border-white shadow-[0_0_30px_rgba(255,255,255,0.3)] mt-12" 
            />
            <h3 className="text-2xl font-black text-white mt-5 tracking-tight">@{profile.username}</h3>
            <p className="text-white/80 text-center text-[15px] mt-3 font-medium leading-relaxed px-4">{profile.bio}</p>
            
            <div className="w-full space-y-4 mt-10 pb-12 px-2">
              {links.filter(l => l.isActive).map((link) => {
                const themeData = themes.find(t => t.id === profile.theme);
                const buttonRadius = profile.buttonStyle === 'pill' ? 'rounded-full' : profile.buttonStyle === 'rounded' ? 'rounded-2xl' : 'rounded-none';
                
                return (
                  <motion.a 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={link.id} 
                    href="#" 
                    className={`flex items-center justify-center p-4.5 transition-all shadow-xl active:scale-95 font-bold text-[15px] border-white/10 ${themeData?.class} ${buttonRadius}`}
                  >
                    {link.title}
                  </motion.a>
                );
              })}
            </div>
            
            <div className="mt-auto pt-6 flex items-center justify-center gap-5 text-white/50 pb-6">
              <Sparkles className="w-5 h-5 hover:text-white transition-colors cursor-pointer"/>
              <Layers className="w-5 h-5 hover:text-white transition-colors cursor-pointer"/>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

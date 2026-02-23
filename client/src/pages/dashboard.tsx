import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Sparkles, Layers, Link as LinkIcon, Settings, 
  Plus, GripVertical, Trash2, ExternalLink, Image as ImageIcon,
  Palette
} from "lucide-react";

import bgMobile from "@/assets/images/bg-mobile-1.png";
import avatarImg from "@/assets/images/avatar-1.png";

type Tab = "links" | "appearance" | "settings";

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
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 glass-panel hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2 text-xl font-heading font-bold text-white border-b border-white/5">
          <div className="bg-primary/20 p-2 rounded-xl">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          BioLink
        </div>

        <nav className="p-4 space-y-2 flex-1">
          <Button 
            variant="ghost" 
            className={`w-full justify-start rounded-xl h-12 text-base ${activeTab === "links" ? "bg-white/10 text-white font-medium" : "text-white/60 hover:text-white hover:bg-white/5"}`}
            onClick={() => setActiveTab("links")}
            data-testid="tab-links"
          >
            <LinkIcon className="mr-3 w-5 h-5" /> Links
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start rounded-xl h-12 text-base ${activeTab === "appearance" ? "bg-white/10 text-white font-medium" : "text-white/60 hover:text-white hover:bg-white/5"}`}
            onClick={() => setActiveTab("appearance")}
            data-testid="tab-appearance"
          >
            <Palette className="mr-3 w-5 h-5" /> Appearance
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start rounded-xl h-12 text-base ${activeTab === "settings" ? "bg-white/10 text-white font-medium" : "text-white/60 hover:text-white hover:bg-white/5"}`}
            onClick={() => setActiveTab("settings")}
            data-testid="tab-settings"
          >
            <Settings className="mr-3 w-5 h-5" /> Settings
          </Button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5">
            <img src={avatarImg} alt="User" className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">@alex_creative</p>
              <p className="text-xs text-white/50 truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Editor Main Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black/40">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10">biolink.me/alex_creative</span>
            <Button variant="ghost" size="sm" className="h-8 rounded-full text-white/70 hover:text-white">Copy URL</Button>
          </div>
          <Link href="/alex_creative">
            <Button className="rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]" data-testid="button-view-live">
              <ExternalLink className="w-4 h-4 mr-2" /> View Live
            </Button>
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-2xl mx-auto">
            {activeTab === "links" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button 
                  className="w-full h-14 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" 
                  onClick={addLink}
                  data-testid="button-add-link"
                >
                  <Plus className="w-5 h-5 mr-2" /> Add New Link
                </Button>

                <div className="space-y-4 mt-8">
                  {links.map((link) => (
                    <div key={link.id} className="group glass-panel rounded-2xl p-4 flex gap-4 items-start border-white/10 hover:border-white/20 transition-colors">
                      <div className="mt-2 text-white/30 cursor-grab hover:text-white">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <Input 
                            value={link.title} 
                            onChange={(e) => updateLink(link.id, "title", e.target.value)}
                            className="bg-transparent border-none text-white font-medium text-lg focus-visible:ring-0 px-0 h-auto"
                            data-testid={`input-title-${link.id}`}
                          />
                          <Input 
                            value={link.url} 
                            onChange={(e) => updateLink(link.id, "url", e.target.value)}
                            className="bg-transparent border-none text-white/50 focus-visible:ring-0 px-0 h-auto text-sm mt-1"
                            data-testid={`input-url-${link.id}`}
                          />
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10 rounded-lg">
                              <ImageIcon className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg"
                              onClick={() => deleteLink(link.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <Switch 
                            checked={link.isActive} 
                            onCheckedChange={(checked) => updateLink(link.id, "isActive", checked)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="glass-panel p-6 rounded-3xl space-y-6">
                  <h3 className="text-xl font-heading font-semibold text-white">Profile</h3>
                  <div className="flex items-center gap-6">
                    <img src={avatarImg} className="w-24 h-24 rounded-full border-2 border-white/20" alt="Avatar" />
                    <div className="space-y-2">
                      <Button variant="outline" className="rounded-full bg-white/5 hover:bg-white/10 border-white/10 text-white">Upload Image</Button>
                      <p className="text-xs text-white/40">Recommended: 1000x1000px</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label className="text-white/70">Profile Title</Label>
                      <Input 
                        value={profile.username} 
                        onChange={(e) => setProfile({...profile, username: e.target.value})}
                        className="bg-black/50 border-white/10 text-white rounded-xl h-12" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/70">Bio</Label>
                      <textarea 
                        className="w-full bg-black/50 border border-white/10 text-white rounded-xl p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl space-y-6">
                  <h3 className="text-xl font-heading font-semibold text-white">Themes</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {themes.map(theme => (
                      <div 
                        key={theme.id} 
                        className={`space-y-2 text-center cursor-pointer group p-1 rounded-2xl transition-all ${profile.theme === theme.id ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                        onClick={() => setProfile({...profile, theme: theme.id})}
                      >
                        <div className={`h-24 rounded-xl ${theme.class} group-hover:scale-105 transition-transform`} />
                        <span className="text-xs text-white/70 font-medium">{theme.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl space-y-6">
                  <h3 className="text-xl font-heading font-semibold text-white">Button Style</h3>
                  <div className="flex gap-4">
                    {[
                      { id: "square", name: "Square", radius: "rounded-none" },
                      { id: "rounded", name: "Rounded", radius: "rounded-xl" },
                      { id: "pill", name: "Pill", radius: "rounded-full" },
                    ].map(style => (
                      <Button
                        key={style.id}
                        variant="outline"
                        className={`flex-1 h-12 border-white/10 ${style.radius} ${profile.buttonStyle === style.id ? 'bg-primary border-primary text-white' : 'bg-white/5 text-white/60'}`}
                        onClick={() => setProfile({...profile, buttonStyle: style.id})}
                      >
                        {style.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Live Preview Panel */}
      <aside className="w-[450px] border-l border-white/5 bg-black/20 hidden xl:flex items-center justify-center p-8 sticky top-0 h-screen">
        <div className="mobile-mockup scale-[0.85] origin-center transform-gpu shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10 border">
          <img 
            src={bgMobile} 
            alt="Background" 
            className={`absolute inset-0 w-full h-full object-cover opacity-80 ${profile.theme === 'minimal' ? 'brightness-150 grayscale' : ''}`} 
          />
          
          <div className="relative z-10 flex flex-col items-center p-6 h-full overflow-y-auto">
            <img src={profile.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] mt-12" />
            <h3 className="text-2xl font-bold text-white mt-4 tracking-tight">@{profile.username}</h3>
            <p className="text-white/80 text-center text-[15px] mt-3 font-medium">{profile.bio}</p>
            
            <div className="w-full space-y-4 mt-8 pb-12">
              {links.filter(l => l.isActive).map((link) => {
                const themeData = themes.find(t => t.id === profile.theme);
                const buttonRadius = profile.buttonStyle === 'pill' ? 'rounded-full' : profile.buttonStyle === 'rounded' ? 'rounded-2xl' : 'rounded-none';
                
                return (
                  <a 
                    key={link.id} 
                    href="#" 
                    className={`flex items-center justify-center p-4 transition-all shadow-lg active:scale-95 font-semibold text-[15px] ${themeData?.class} ${buttonRadius}`}
                  >
                    {link.title}
                  </a>
                );
              })}
            </div>
            
            <div className="mt-auto pt-6 flex items-center justify-center gap-4 text-white/50 pb-4">
              {/* Fake social icons */}
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Sparkles className="w-5 h-5"/></div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Layers className="w-5 h-5"/></div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
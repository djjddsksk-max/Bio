import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Sparkles, Mail, Twitter, Instagram, ArrowUpRight, 
  User as UserIcon, Camera, Bell, Shield, LogOut, Github,
  ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import bgMobile from "@/assets/images/bg-mobile-1.png";
import avatarImg from "@/assets/images/avatar-1.png";

export default function Profile() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex text-foreground font-sans">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[150px] rounded-full" />
      </div>

      <main className="flex-1 w-full max-w-4xl mx-auto p-6 lg:p-12 z-10 relative">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-white/10 text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-black text-white font-heading">Settings</h1>
          </div>
          <Button 
            className="rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 shadow-lg shadow-primary/20"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid gap-10">
          {/* Profile Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <UserIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-white uppercase tracking-widest text-sm">Account Information</h2>
            </div>
            
            <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 space-y-10">
              <div className="flex flex-col sm:flex-row items-center gap-10">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-white/10 overflow-hidden relative">
                    <img src={avatarImg} alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-xl shadow-lg border-4 border-[#0c0c0e]">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="space-y-4 text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-white">Profile Photo</h3>
                  <p className="text-white/40 max-w-xs">Update your profile picture. Recommended size is 400x400px.</p>
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start pt-2">
                    <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white">Change Photo</Button>
                    <Button variant="ghost" className="rounded-xl text-red-400 hover:bg-red-400/5">Remove</Button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Full Name</Label>
                  <Input defaultValue="Alex Creative" className="bg-white/5 border-none h-14 rounded-2xl text-white font-bold focus:ring-1 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Email Address</Label>
                  <Input defaultValue="alex@creative.com" className="bg-white/5 border-none h-14 rounded-2xl text-white/50" readOnly />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-[10px] text-white/30 uppercase font-bold tracking-widest ml-1">Profile Bio</Label>
                  <textarea 
                    className="w-full bg-white/5 border-none rounded-[2rem] p-5 h-32 text-white font-medium resize-none focus:outline-none focus:ring-1 focus:ring-primary/50"
                    placeholder="Tell your story..."
                    defaultValue="Digital artist & designer building the future of the web. Sharing my journey 🎨"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-bold text-white uppercase tracking-widest text-sm">Security & Privacy</h2>
            </div>
            
            <div className="glass-panel p-8 rounded-[2.5rem] border-white/5">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Current Password</Label>
                      <Input type="password" placeholder="••••••••" className="bg-white/5 border-none h-14 rounded-2xl text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] text-white/30 uppercase font-bold tracking-widest">New Password</Label>
                      <Input type="password" placeholder="••••••••" className="bg-white/5 border-none h-14 rounded-2xl text-white" />
                    </div>
                    <Button variant="secondary" className="w-full h-12 rounded-xl font-bold">Update Password</Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white">Privacy Controls</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Public Profile", desc: "Allow anyone to find your BioLink page", checked: true },
                      { label: "Search Indexing", desc: "Let search engines index your profile", checked: true },
                      { label: "Direct Messages", desc: "Allow users to send you messages", checked: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-white">{item.label}</p>
                          <p className="text-[11px] text-white/30">{item.desc}</p>
                        </div>
                        <Switch defaultChecked={item.checked} className="data-[state=checked]:bg-primary" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Connections */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white uppercase tracking-widest text-sm">Connected Accounts</h2>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { name: "Twitter", icon: Twitter, status: "Connected", handle: "@alex_creative", color: "text-sky-400" },
                { name: "Instagram", icon: Instagram, status: "Connected", handle: "@alex.studio", color: "text-pink-400" },
                { name: "Github", icon: Github, status: "Not Linked", handle: "", color: "text-white" },
              ].map((social, i) => (
                <div key={i} className="glass-panel p-6 rounded-3xl border-white/5 flex flex-col items-center text-center space-y-4 group hover:border-white/20 transition-all">
                  <div className={`p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors ${social.color}`}>
                    <social.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{social.name}</h4>
                    <p className="text-xs text-white/30">{social.status === "Connected" ? social.handle : "Not connected"}</p>
                  </div>
                  <Button variant="outline" className={`w-full h-10 rounded-xl text-xs font-bold ${social.status === "Connected" ? "border-white/10 text-white/60 hover:text-red-400" : "bg-white text-black border-none"}`}>
                    {social.status === "Connected" ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom actions */}
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-white/20 text-xs">Last updated on Oct 12, 2026</p>
            <div className="flex gap-4 w-full sm:w-auto">
              <Button variant="ghost" className="flex-1 sm:flex-none h-12 rounded-xl text-red-400 hover:bg-red-400/5 font-bold px-8">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

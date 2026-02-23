import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight, Link as LinkIcon, Palette, BarChart3 } from "lucide-react";
import heroImg from "@/assets/images/bg-abstract-1.png";
import avatarImg from "@/assets/images/avatar-1.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col">
      {/* Navbar */}
      <header className="px-8 py-6 flex items-center justify-between glass-panel sticky top-0 z-50 rounded-b-3xl">
        <div className="flex items-center gap-2 text-2xl font-heading font-bold text-white">
          <div className="bg-primary/20 p-2 rounded-xl">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          BioLink
        </div>
        <div className="flex gap-4">
          <Link href="/auth">
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 rounded-full" data-testid="link-login">
              Log in
            </Button>
          </Link>
          <Link href="/auth">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full font-medium px-6 shadow-lg shadow-primary/25" data-testid="button-signup">
              Sign up free
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-8 lg:p-20 gap-16 overflow-hidden">
        {/* Left Copy */}
        <div className="flex-1 max-w-2xl space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 text-primary-foreground/80 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            BioLink 2.0 is here
          </div>
          <h1 className="text-6xl lg:text-8xl font-heading font-bold leading-[1.1] text-white">
            Your Universe,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              One Link.
            </span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed font-sans max-w-xl">
            Create a beautifully customized page for all your links, content, and products. Everything you are, collected in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <div className="relative flex-1 max-w-sm w-full group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-white/40 font-medium">
                biolink.me/
              </span>
              <Input 
                className="pl-[95px] h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-2xl focus-visible:ring-primary focus-visible:border-primary shadow-inner text-lg"
                placeholder="yourname"
                data-testid="input-username-claim"
              />
            </div>
            <Link href="/auth" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-2xl px-8 text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all" data-testid="button-claim-link">
                Claim your link <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="flex-1 relative flex justify-center perspective-1000">
          <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
          
          <div className="relative w-[340px] h-[700px] bg-black rounded-[2.5rem] border-[10px] border-white/10 shadow-2xl overflow-hidden rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">
            <img src={heroImg} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />
            
            <div className="relative z-10 flex flex-col items-center p-8 h-full">
              <img src={avatarImg} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-[0_0_30px_rgba(255,255,255,0.3)] mt-8" />
              <h3 className="text-2xl font-bold text-white mt-4">@alex_creative</h3>
              <p className="text-white/70 text-center text-sm mt-2">Digital artist & designer building the future of the web.</p>
              
              <div className="w-full space-y-3 mt-8">
                {[
                  { icon: LinkIcon, title: "My Portfolio", color: "bg-blue-500/20 text-blue-300" },
                  { icon: Palette, title: "Design Resources", color: "bg-purple-500/20 text-purple-300" },
                  { icon: BarChart3, title: "Book a Consultation", color: "bg-pink-500/20 text-pink-300" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5 hover:bg-white/20 transition-colors cursor-pointer">
                    <div className={`p-2 rounded-xl ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-white font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
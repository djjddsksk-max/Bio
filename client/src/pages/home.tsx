import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight, Link as LinkIcon, Palette, BarChart3, Shield, Zap, Globe, Github, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/images/bg-abstract-1.png";
import avatarImg from "@/assets/images/avatar-1.png";

const features = [
  {
    icon: <LinkIcon className="w-6 h-6 text-primary" />,
    title: "All links in one place",
    description: "Connect your TikTok, Instagram, Twitter, website, store, videos, music, and more."
  },
  {
    icon: <Palette className="w-6 h-6 text-accent" />,
    title: "Beautifully custom",
    description: "Express yourself with custom themes, fonts, and colors that match your brand."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
    title: "Powerful Analytics",
    description: "Track your traffic and see what your audience is clicking on in real-time."
  },
  {
    icon: <Shield className="w-6 h-6 text-green-400" />,
    title: "Secure & Fast",
    description: "Built on high-performance infrastructure to ensure your page is always live."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <header className="px-6 lg:px-12 py-6 flex items-center justify-between glass-panel sticky top-0 z-50 rounded-b-3xl mx-4 lg:mx-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-2xl font-heading font-bold text-white"
        >
          <div className="bg-primary/20 p-2 rounded-xl">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          BioLink
        </motion.div>
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
      <main className="flex-1 flex flex-col items-center">
        <section className="w-full flex flex-col lg:flex-row items-center justify-center p-8 lg:p-20 gap-16 max-w-7xl mx-auto min-h-[80vh]">
          {/* Left Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl space-y-8 z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 text-primary-foreground/80 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              BioLink 2.0 is here
            </div>
            <h1 className="text-5xl lg:text-8xl font-heading font-bold leading-[1.1] text-white">
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
                <Button size="lg" className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-2xl px-8 text-lg shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all" data-testid="button-claim-link">
                  Claim your link <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: -10 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative flex justify-center perspective-1000"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
            
            <div className="relative w-[300px] lg:w-[340px] h-[600px] lg:h-[700px] bg-black rounded-[2.5rem] border-[10px] border-white/10 shadow-2xl overflow-hidden rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">
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
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 px-8 bg-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">Everything you need</h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">The link in bio tool that helps you create your digital home.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-3xl glass-panel border-white/5 space-y-4"
                >
                  <div className="p-3 rounded-2xl bg-white/5 w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="w-full py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">Create your page in<br/><span className="text-primary">3 simple steps</span></h2>
                <div className="space-y-12 mt-12">
                  {[
                    { step: "01", title: "Claim your name", desc: "Choose a unique biolink.me/yourname that reflects you or your brand." },
                    { step: "02", title: "Add your content", desc: "Easily add links, social icons, music, videos, and custom styling." },
                    { step: "03", title: "Share everywhere", desc: "Add your link to your social media bios and reach your audience." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <span className="text-4xl font-black text-white/10 font-heading">{item.step}</span>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                        <p className="text-white/50 text-lg">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full" />
                <div className="relative glass-panel rounded-[3rem] p-4 lg:p-8 aspect-square flex items-center justify-center border-white/10">
                  <div className="w-full h-full bg-black/40 rounded-[2rem] flex flex-col items-center justify-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse" />
                    <div className="w-2/3 h-4 bg-white/5 rounded-full" />
                    <div className="w-1/2 h-4 bg-white/5 rounded-full" />
                    <div className="grid grid-cols-2 gap-4 w-2/3">
                      <div className="h-20 rounded-2xl bg-white/5" />
                      <div className="h-20 rounded-2xl bg-white/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-20 px-8 border-t border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-heading font-bold text-white">
              <Sparkles className="w-6 h-6 text-primary" />
              BioLink
            </div>
            <p className="text-white/40 leading-relaxed">The ultimate destination for your online presence. Connect, share, and grow.</p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white/60 hover:text-white border border-white/10">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-bold">Product</h4>
            <ul className="space-y-4 text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-bold">Company</h4>
            <ul className="space-y-4 text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-white font-bold">Support</h4>
            <ul className="space-y-4 text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/30 text-sm">
          <p>© 2026 BioLink. All rights reserved.</p>
          <p>Made with ❤️ for creators.</p>
        </div>
      </footer>
    </div>
  );
}
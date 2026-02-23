import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap, Shield, Globe, BarChart3, Github, Twitter, Instagram, Mail, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Instant Setup",
    description: "Get your personalized link-in-bio page live in less than 60 seconds."
  },
  {
    icon: <Shield className="w-6 h-6 text-green-400" />,
    title: "Enterprise Security",
    description: "Your data is protected with industry-leading encryption and security protocols."
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    title: "Global Reach",
    description: "Connect with your audience anywhere in the world with high-speed delivery."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
    title: "Deep Analytics",
    description: "Understand your audience with detailed insights into clicks and conversions."
  }
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    description: "Sign up in seconds and choose your unique username for your bio link.",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    number: "02",
    title: "Add your links",
    description: "Import your social profiles, websites, and content with our easy editor.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    number: "03",
    title: "Share everywhere",
    description: "Put your new link in your social bios and start growing your presence.",
    icon: <Globe className="w-6 h-6" />
  }
];

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold font-heading">
            <div className="bg-primary/20 p-2 rounded-xl">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            BioLink
          </div>
          <div className="flex items-center gap-6">
            <Link href="/auth">
              <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 rounded-full px-6">
                Login
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 font-bold shadow-lg shadow-white/5">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-50" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto text-center relative z-10"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Trusted by 1M+ creators worldwide
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black font-heading leading-[1.05] tracking-tight mb-8">
              Every link in<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent animate-gradient">
                one place.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12">
              The only link you'll ever need. Create a beautiful, high-converting page for your audience in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/auth">
                <Button size="lg" className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white text-lg font-bold shadow-2xl shadow-primary/20 group">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white text-lg font-bold">
                Learn More
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for creators</h2>
              <p className="text-white/40 text-lg">Powerful tools to help you grow your digital presence.</p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.03] transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/40 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">How it works</h2>
              <p className="text-white/40 text-lg">Your journey to a better bio link starts here.</p>
            </div>

            <div className="relative space-y-24">
              {/* Vertical line for desktop */}
              <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent hidden md:block" />
              
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col md:flex-row gap-8 md:gap-16 items-start"
                >
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-18 md:h-18 rounded-2xl bg-black border-2 border-primary/30 flex items-center justify-center text-primary font-black text-xl font-heading shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-white/5 text-white/60">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-lg md:text-xl text-white/40 leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="max-w-7xl mx-auto rounded-[3rem] p-12 md:p-24 bg-gradient-to-br from-primary/20 via-black to-accent/10 border border-white/10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Ready to level up?</h2>
            <p className="text-xl text-white/50 mb-12 max-w-xl mx-auto relative z-10">Join thousands of creators who are already growing their brand with BioLink.</p>
            <Link href="/auth">
              <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-black hover:bg-white/90 text-lg font-bold relative z-10 shadow-2xl">
                Create Your BioLink Now
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-bold font-heading">
              <Sparkles className="w-6 h-6 text-primary" />
              BioLink
            </div>
            <p className="text-white/30 leading-relaxed">
              Empowering creators to own their digital presence and connect with their audience worldwide.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white/60 hover:text-white border border-white/10">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Product</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Resources</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Contact</h4>
            <ul className="space-y-4 text-white/40">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>hello@biolink.me</span>
              </li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-sm">
          <p>© 2026 BioLink Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
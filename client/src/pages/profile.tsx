import { Button } from "@/components/ui/button";
import { Sparkles, Mail, Twitter, Instagram, ArrowUpRight } from "lucide-react";
import bgMobile from "@/assets/images/bg-mobile-1.png";
import avatarImg from "@/assets/images/avatar-1.png";
import { Link } from "wouter";

export default function Profile() {
  const links = [
    { title: "Watch my newest YouTube Video", url: "#", badge: "NEW" },
    { title: "My Portfolio / Case Studies", url: "#" },
    { title: "Book a 1:1 Consultation", url: "#" },
    { title: "Support me on Patreon", url: "#" },
  ];

  return (
    <div className="min-h-screen relative flex items-center justify-center sm:p-8 bg-black">
      {/* Background for Desktop View */}
      <img src={bgMobile} alt="Background" className="fixed inset-0 w-full h-full object-cover opacity-40 blur-3xl scale-110" />
      
      {/* Main Profile Container */}
      <div className="relative w-full max-w-md min-h-screen sm:min-h-[850px] sm:h-auto sm:rounded-[3rem] overflow-hidden shadow-2xl border-0 sm:border border-white/10 bg-black animate-in fade-in zoom-in-95 duration-700">
        <img src={bgMobile} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />
        
        <div className="relative z-10 flex flex-col items-center p-6 sm:p-8 h-full">
          {/* Header Action */}
          <div className="w-full flex justify-end">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20 transition">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col items-center mt-4">
            <div className="relative">
              <img 
                src={avatarImg} 
                alt="Avatar" 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-[0_0_40px_rgba(255,255,255,0.25)]" 
              />
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-black" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-white mt-6 tracking-tight">@alex_creative</h1>
            <p className="text-white/80 text-center text-base mt-3 font-medium max-w-[280px]">
              Digital artist & designer building the future of the web. Sharing my journey 🎨
            </p>
          </div>
          
          {/* Socials row */}
          <div className="flex gap-4 mt-6">
            {[Mail, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/10 text-white transition-transform hover:scale-110">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          
          {/* Links List */}
          <div className="w-full space-y-4 mt-10">
            {links.map((link, i) => (
              <a 
                key={i} 
                href={link.url} 
                className="group relative flex items-center justify-between p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/20 hover:border-white/30 transition-all shadow-lg active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold text-base tracking-wide">{link.title}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold tracking-wider animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
          
          {/* Footer branding */}
          <div className="mt-auto pt-12 pb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Powered by BioLink
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
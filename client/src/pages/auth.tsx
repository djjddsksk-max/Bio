import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "Redirecting to your dashboard...",
      });
      setLocation("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      
      <Card className="relative w-full max-w-md glass-panel border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/20 p-3 rounded-2xl">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-heading font-bold text-white">Join BioLink</CardTitle>
          <CardDescription className="text-white/50 text-base">
            Create your unique profile in seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 rounded-xl mb-6">
              <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">Register</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleAuth} className="space-y-4">
              <TabsContent value="login" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label className="text-white/70 ml-1">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input className="pl-11 bg-white/5 border-white/10 text-white h-12 rounded-xl" placeholder="name@example.com" type="email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70 ml-1">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input className="pl-11 bg-white/5 border-white/10 text-white h-12 rounded-xl" type="password" required />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label className="text-white/70 ml-1">Username</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input className="pl-11 bg-white/5 border-white/10 text-white h-12 rounded-xl" placeholder="yourname" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70 ml-1">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input className="pl-11 bg-white/5 border-white/10 text-white h-12 rounded-xl" placeholder="name@example.com" type="email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70 ml-1">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <Input className="pl-11 bg-white/5 border-white/10 text-white h-12 rounded-xl" type="password" required />
                  </div>
                </div>
              </TabsContent>

              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl mt-4 font-bold text-lg shadow-lg shadow-primary/25 group" disabled={isLoading}>
                {isLoading ? "Processing..." : "Continue"}
                {!isLoading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </form>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t border-white/5 pt-6">
          <p className="text-xs text-center text-white/30 px-6">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
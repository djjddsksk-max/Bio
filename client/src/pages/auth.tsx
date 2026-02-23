import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
});

export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof authSchema>) => {
    setIsLoading(true);
    console.log(values);
    
    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: activeTab === "login" ? "Welcome back!" : "Account created!",
        description: "Redirecting to your dashboard...",
      });
      setLocation("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md z-10"
      >
        <Card className="glass-panel border-white/10 shadow-2xl overflow-hidden">
          <CardHeader className="space-y-1 text-center pb-8">
            <motion.div 
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              className="flex justify-center mb-6"
            >
              <div className="bg-primary/20 p-4 rounded-2xl relative">
                <Sparkles className="w-8 h-8 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-heading font-bold text-white tracking-tight">
              {activeTab === "login" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-white/50 text-base">
              {activeTab === "login" ? "Sign in to manage your BioLink" : "Start your creator journey today"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 rounded-xl mb-8">
                <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Login</TabsTrigger>
                <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Register</TabsTrigger>
              </TabsList>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <AnimatePresence mode="wait">
                    {activeTab === "register" && (
                      <motion.div
                        key="register-fields"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-white/70 ml-1">Username</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                  <Input {...field} className="pl-11 bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/50" placeholder="yourname" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white/70 ml-1">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <Input {...field} className="pl-11 bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/50" placeholder="name@example.com" type="email" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-white/70 ml-1">Password</FormLabel>
                          {activeTab === "login" && (
                            <button type="button" className="text-xs text-primary hover:underline font-medium">Forgot password?</button>
                          )}
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <Input {...field} className="pl-11 bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/50" type="password" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl mt-6 font-bold text-lg shadow-lg shadow-primary/25 group transition-all" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <>
                        {activeTab === "login" ? "Sign In" : "Create Account"}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0c0c0e] px-2 text-white/30 font-medium">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-11 bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10">
                  <Github className="mr-2 w-4 h-4" /> Github
                </Button>
                <Button variant="outline" className="h-11 bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </Button>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-white/5 pt-6 bg-white/5">
            <p className="text-xs text-center text-white/30 px-6">
              By clicking continue, you agree to our <a href="#" className="text-primary/70 hover:underline">Terms of Service</a> and <a href="#" className="text-primary/70 hover:underline">Privacy Policy</a>.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock, User, ArrowRight, Github, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const authSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
  username: z.string().min(3, "Имя пользователя должно быть не менее 3 символов").optional(),
  rememberMe: z.boolean().default(false),
});

type AuthValues = z.infer<typeof authSchema>;

export default function Auth() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const onSubmit = (values: AuthValues) => {
    setIsLoading(true);
    console.log(values);
    
    // Симуляция авторизации
    setTimeout(() => {
      setIsLoading(false);
      toast.success(activeTab === "login" ? "С возвращением!" : "Аккаунт создан!", {
        description: "Перенаправляем на дашборд...",
      });
      setLocation("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Декоративные элементы фона */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse delay-700" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden">
          <CardHeader className="space-y-1 text-center pb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex justify-center mb-6"
            >
              <div className="bg-blue-600/20 p-4 rounded-2xl relative group">
                <Sparkles className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full opacity-50" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">
              {activeTab === "login" ? "С возвращением" : "Создать аккаунт"}
            </CardTitle>
            <CardDescription className="text-slate-400 text-base">
              {activeTab === "login" ? "Войдите в свою учетную запись" : "Присоединяйтесь к нашему сообществу"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs 
              value={activeTab} 
              onValueChange={(v) => {
                setActiveTab(v);
                form.reset();
              }} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 p-1 rounded-xl mb-8">
                <TabsTrigger value="login" className="rounded-lg transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white">Вход</TabsTrigger>
                <TabsTrigger value="register" className="rounded-lg transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white">Регистрация</TabsTrigger>
              </TabsList>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <AnimatePresence mode="wait">
                    {activeTab === "register" && (
                      <motion.div
                        key="register-fields"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-300">Имя пользователя</FormLabel>
                              <FormControl>
                                <div className="relative group">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                  <Input 
                                    {...field} 
                                    className="pl-10 bg-slate-800/50 border-slate-700 text-white focus:border-blue-500/50 transition-all h-11" 
                                    placeholder="johndoe" 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage className="text-red-400" />
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
                      <FormItem>
                        <FormLabel className="text-slate-300">Email адрес</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                            <Input 
                              {...field} 
                              className="pl-10 bg-slate-800/50 border-slate-700 text-white focus:border-blue-500/50 transition-all h-11" 
                              placeholder="name@example.com" 
                              type="email" 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-slate-300">Пароль</FormLabel>
                          {activeTab === "login" && (
                            <button type="button" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                              Забыли пароль?
                            </button>
                          )}
                        </div>
                        <FormControl>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                            <Input 
                              {...field} 
                              className="px-10 bg-slate-800/50 border-slate-700 text-white focus:border-blue-500/50 transition-all h-11" 
                              type={showPassword ? "text" : "password"} 
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {activeTab === "login" && (
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="remember" 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                            className="border-slate-700 data-[state=checked]:bg-blue-600"
                          />
                          <Label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer">Запомнить меня</Label>
                        </div>
                      )}
                    />
                  )}

                  <Button 
                    className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Загрузка...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        {activeTab === "login" ? "Войти" : "Зарегистрироваться"}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-slate-500">Или продолжить через</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-11 bg-slate-800/30 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                  <Github className="mr-2 w-4 h-4" /> Github
                </Button>
                <Button variant="outline" className="h-11 bg-slate-800/30 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
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
          <CardFooter className="flex flex-col gap-4 border-t border-slate-800/50 pt-6 bg-slate-800/20">
            <p className="text-[10px] text-center text-slate-500 px-6 leading-relaxed">
              Регистрируясь, вы соглашаетесь с нашими <a href="#" className="text-blue-400 hover:underline">Условиями обслуживания</a> и <a href="#" className="text-blue-400 hover:underline">Политикой конфиденциальности</a>.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

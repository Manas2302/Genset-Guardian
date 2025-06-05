
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Power, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email is from perennial.co.in domain or the specific allowed email
    if (!email.endsWith('@perennial.co.in') && email !== 'manastewari07@gmail.com') {
      toast({
        title: "Access Denied",
        description: "Only Perennial Technologies employees can access this system. Please use your @perennial.co.in email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome Back!",
            description: "Successfully logged in to Perennial Control Center",
          });
        }
      } else {
        if (password !== confirmPassword) {
          toast({
            title: "Password Mismatch",
            description: "Passwords do not match",
            variant: "destructive",
          });
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: fullName,
            }
          }
        });

        if (error) {
          toast({
            title: "Registration Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registration Successful!",
            description: "Please check your email to verify your account",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="bg-white p-8 rounded-full w-36 h-36 mx-auto mb-6 shadow-lg border-2 border-blue-200 flex items-center justify-center">
            <img 
              src="/lovable-uploads/817f8d29-b69c-4193-8c4a-1c168e5a32d2.png" 
              alt="Perennial Technologies" 
              className="h-20 w-auto object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Perennial Control Center</h1>
          <p className="text-blue-600 text-lg font-medium">Perennial Technologies</p>
          <p className="text-gray-600 text-sm mt-2">Employee Access Portal</p>
        </div>

        <Card className="shadow-xl border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-8">
            <CardTitle className="text-center text-blue-900 text-2xl">{isLogin ? "Employee Login" : "Employee Registration"}</CardTitle>
            <CardDescription className="text-center text-base">
              {isLogin 
                ? "Sign in with your Perennial Technologies credentials"
                : "Register with your @perennial.co.in email address"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleAuth} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-base">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-12 h-12 text-base border-2 border-blue-200 focus:border-blue-500"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">Perennial Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@perennial.co.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 text-base border-2 border-blue-200 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-12 text-base border-2 border-blue-200 focus:border-blue-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-12 h-12 text-base border-2 border-blue-200 focus:border-blue-500"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg font-semibold" 
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-base text-gray-600">
                {isLogin ? "Need an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 p-0 h-auto text-blue-600 text-base"
                >
                  {isLogin ? "Contact Admin" : "Sign in"}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;

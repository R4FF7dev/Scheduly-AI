import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";


const Auth = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      await login({ email, password });
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      await register({ email, password, name });
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    toast.error('Google sign-in is not yet configured');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-40"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl animate-scale-in">
        <CardHeader className="text-center">
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
          </Link>
          <CardTitle className="text-2xl">Welcome to Scheduly AI</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="h-11"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="h-11"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" variant="hero" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-4" 
              size="lg"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Mail className="w-4 h-4 mr-2" />
              Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

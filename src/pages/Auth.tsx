import { useEffect, useState } from "react";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/unique-logo.jpg";

export default function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        // Already signed in, go home
        window.location.replace("/");
      }
    });

    // Initialize session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) window.location.replace("/");
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome back!");
      window.location.replace("/");
    } catch (err: any) {
      toast.error(err?.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) throw error;

      // Fire-and-forget welcome email (non-blocking)
      setTimeout(() => {
        supabase.functions.invoke("send-welcome", { body: { email } }).catch(() => {});
      }, 0);

      if (data.user) {
        toast.success("Account created! You're now signed in.");
        window.location.replace("/");
      } else {
        toast.success("Check your inbox to confirm your email.");
      }
    } catch (err: any) {
      const msg = err?.message || "Failed to sign up";
      const friendly = /already registered|User already registered/i.test(msg)
        ? "Email already registered. Try signing in."
        : msg;
      toast.error(friendly);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <img src={logo} alt="Unique World Tours" className="h-20 w-auto" />
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl">
              {mode === "signin" ? "Sign in to Unique World Tours" : "Create your account"}
            </CardTitle>
            <CardDescription>
              {mode === "signin" ? "Use your email and password to continue" : "Sign up with your email and a password"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90" disabled={isLoading}>
                <LogIn className="mr-2 h-4 w-4" />
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setMode("signup")}> 
                Don't have an account? Create one
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" placeholder="Re-enter password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90" disabled={isLoading}>
                <UserPlus className="mr-2 h-4 w-4" />
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setMode("signin")}>
                Already have an account? Sign in
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

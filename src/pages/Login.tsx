
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Alert } from "@/components/ui/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate("/");
    }
    
    // Check auth from URL on page load (for when redirected back from email verification)
    const checkHashParams = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      
      if (accessToken && refreshToken) {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (error) {
            console.error("Error setting session:", error);
            toast.error("Failed to complete login");
          } else if (data.user) {
            toast.success("Login successful!");
            navigate("/");
          }
        } catch (err) {
          console.error("Error during session recovery:", err);
        }
      }
    };
    
    checkHashParams();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Login error:", error);
        if (error.message.includes("Invalid login")) {
          setErrorMessage("Invalid email or password. Please check your credentials and try again.");
        } else {
          setErrorMessage(error.message || "Login failed. Please try again.");
        }
      } else if (data.user) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected login error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link to="/register" className="font-medium text-seva-500 hover:text-seva-600">
                create a new account
              </Link>
            </p>
          </div>

          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-seva-500 focus:ring-seva-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-seva-500 hover:text-seva-600">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center items-center bg-seva-500 hover:bg-seva-600"
                disabled={isLoading}
              >
                <LogIn className="mr-2" size={18} />
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-seva-500 hover:text-seva-600">
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

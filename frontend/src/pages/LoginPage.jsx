import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  // validation
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email required");
    if (!formData.password) return toast.error("Password required");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast.error("Invalid email format");

    return true;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100">
        <div className="w-full max-w-md space-y-8">

          {/* logo */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-7 text-primary" />
              </div>

              <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
              <p className="text-base-content/60 text-sm">
                Login to continue chatting
              </p>
            </div>
          </div>

          {/* form card */}
          <div className="bg-base-200/60 backdrop-blur-xl border border-base-300 rounded-3xl p-8 shadow-xl">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-5 text-base-content/40" />
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 rounded-xl"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e)=>
                      setFormData({...formData,email:e.target.value})
                    }
                  />
                </div>
              </div>

              {/* password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 size-5 text-base-content/40" />

                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 rounded-xl"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e)=>
                      setFormData({...formData,password:e.target.value})
                    }
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={()=>setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40"/>
                    ) : (
                      <Eye className="size-5 text-base-content/40"/>
                    )}
                  </button>
                </div>
              </div>

              {/* submit */}
              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-5 animate-spin"/>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* signup link */}
            <p className="text-center text-sm text-base-content/60 mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <AuthImagePattern />
    </div>
  );
};

export default LoginPage;

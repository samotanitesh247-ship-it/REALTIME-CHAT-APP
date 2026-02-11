import { useState } from "react";
import { User, Mail, Lock, MessageSquare, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100">
        <div className="w-full max-w-md space-y-8">

          {/* LOGO + TITLE */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-3 group">

              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-md group-hover:bg-primary/20 transition-all duration-300">
                <MessageSquare className="size-7 text-primary" />
              </div>

              <h1 className="text-3xl font-bold mt-2">
                Create Account 
              </h1>

              <p className="text-base-content/60 text-sm">
                Join and start chatting with your friends instantly
              </p>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="bg-base-200/60 backdrop-blur-xl border border-base-300 rounded-3xl p-8 shadow-xl">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-3 size-5 text-base-content/40" />

                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 rounded-xl"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
                  />
                </div>
              </div>

              {/* EMAIL */}
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
                    onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  />
                </div>
              </div>

              {/* PASSWORD */}
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
                    onChange={(e)=>setFormData({...formData,password:e.target.value})}
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

              {/* SUBMIT */}
              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl text-base font-semibold"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

            </form>

            {/* LOGIN LINK */}
            <p className="text-center text-sm text-base-content/60 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <AuthImagePattern />

    </div>
  );
};

export default SignUpPage;

import { MessageCircle, Users, Sparkles } from "lucide-react";

const AuthImagePattern = () => {
  return (
    <div className="hidden lg:flex items-center justify-center relative overflow-hidden">

      {/* BLENDED BACKGROUND */}
      <div className="absolute inset-0 bg-base-100"></div>

      {/* gradient glow that blends with left */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl top-[-120px] right-[-120px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl bottom-[-120px] left-[-120px]"></div>

      {/* floating chat bubbles */}
      <div className="absolute top-24 left-20 animate-bounce">
        <div className="bg-primary text-primary-content px-4 py-2 rounded-2xl shadow-lg">
          Hey 👋
        </div>
      </div>

      <div className="absolute bottom-24 right-24 animate-bounce delay-200">
        <div className="bg-secondary text-secondary-content px-4 py-2 rounded-2xl shadow-lg">
          Welcome to chat!
        </div>
      </div>

      {/* MAIN GLASS CARD */}
      <div className="relative z-10 backdrop-blur-xl bg-base-200/60 border border-base-300 shadow-2xl rounded-3xl p-10 max-w-md text-center">

        {/* icons */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="p-4 rounded-2xl bg-primary/10 animate-bounce">
            <MessageCircle className="size-8 text-primary" />
          </div>

          <div className="p-4 rounded-2xl bg-secondary/10 animate-pulse">
            <Users className="size-8 text-secondary" />
          </div>

          <div className="p-4 rounded-2xl bg-accent/10 animate-bounce delay-200">
            <Sparkles className="size-8 text-accent" />
          </div>
        </div>

        {/* title */}
        <h2 className="text-3xl font-bold mb-4">
          Chat smarter, faster 💬
        </h2>

        {/* subtitle */}
        <p className="text-base-content/70 leading-relaxed">
          Experience real-time messaging with beautiful design,
          lightning-fast performance and seamless connectivity.
        </p>

        {/* animated dots */}
        <div className="flex justify-center mt-8 gap-2">
          <span className="w-3 h-3 bg-primary rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-secondary rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-accent rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;

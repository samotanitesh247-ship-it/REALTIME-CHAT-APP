import { Link } from "react-router-dom";
import { MessageSquare, LogOut, Settings, User } from "lucide-react"; // 👈 add User icon
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">

          {/* logo */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Linkup</h1>
            </Link>
          </div>

          {/* right side */}
          <div className="flex items-center gap-2">

            {/* profile icon */}
            {authUser && (
              <Link to="/profile" className="btn btn-sm btn-ghost gap-2">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            )}

            {/* settings */}
            <Link to="/settings" className="btn btn-sm gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* logout */}
            {authUser && (
              <button
                onClick={logout}
                className="btn btn-sm btn-ghost gap-2"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;

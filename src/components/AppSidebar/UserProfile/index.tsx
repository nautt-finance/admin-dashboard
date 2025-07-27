import { LogOut, User } from "lucide-react";

interface UserProfileProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

const UserProfile = ({
  userName = "User Name",
  userEmail = "user@nauttfinance.com",
  onLogout,
}: UserProfileProps) => {
  return (
    <div className="relative bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 p-4 rounded-xl mt-4 hover:shadow-md transition-shadow">
      <button
        className="absolute top-2 right-2 p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
        title="Sair"
        onClick={onLogout}
      >
        <LogOut className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="h-6 w-6 text-primary" />
        </div>

        <div className="text-left space-y-1 flex-1">
          <h3 className="font-semibold text-sm">{userName}</h3>
          <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

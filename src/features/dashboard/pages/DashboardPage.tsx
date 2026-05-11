import { useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Video, Plus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [joinId, setJoinId] = useState("");

  const createMeeting = () => {
    const roomId = crypto.randomUUID().slice(0, 8);
    navigate(`/meeting/prejoin/${roomId}`);
  };

  const joinMeeting = () => {
    if (joinId.trim()) navigate(`/meeting/prejoin/${joinId.trim()}`);
  };

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-4">
          Welcome, {user?.firstName} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Start new or join a meeting
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* New meeting */}
        <button
          onClick={createMeeting}
          className="flex flex-col items-center gap-5 rounded-2xl gradient-primary p-8 shadow-lg text-white"
        >
          <div className="rounded-full bg-white/20 p-4 relative shadow-2xl">
            <Video className="size-8"></Video>
            <Plus className="absolute top-6 left-5 size-4" />
          </div>
          <span className="text-xl font-semibold">New Meeting</span>
          <span className="text-sm ">Start an instant meeting</span>
        </button>

        {/* Join meeting */}
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="rounded-full p-4 gradient-primary">
            <LogIn className="size-7 text-white" />
          </div>
          <span className="text-xl font-semibold gradient-text-primary">
            Join Meeting
          </span>
          <input
            type="text"
            value={joinId}
            onChange={(e) => setJoinId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && joinMeeting()}
            placeholder="Enter room ID"
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            onClick={joinMeeting}
            disabled={!joinId.trim()}
            size="lg"
            className="w-full gradient-primary text-primary-foreground font-semibold transition hover:opacity-90 disabled:opacity-50"
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}

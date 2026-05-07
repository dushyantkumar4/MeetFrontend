import { useUser } from '@clerk/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Video, Plus, LogIn } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [joinId, setJoinId] = useState('');

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
        <h1 className="text-3xl font-bold text-foreground">
          Welcome, {user?.firstName} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">Start or join a meeting</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* New meeting */}
        <button
          onClick={createMeeting}
          className="flex flex-col items-center gap-4 rounded-2xl bg-blue-600 p-8 text-white shadow-lg transition hover:bg-blue-700"
        >
          <div className="rounded-full bg-white/20 p-4">
            <Plus className="h-8 w-8" />
          </div>
          <span className="text-xl font-semibold">New Meeting</span>
          <span className="text-sm text-blue-200">Start an instant meeting</span>
        </button>

        {/* Join meeting */}
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="rounded-full bg-muted p-4">
            <LogIn className="h-8 w-8 text-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">Join Meeting</span>
          <input
            type="text"
            value={joinId}
            onChange={(e) => setJoinId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && joinMeeting()}
            placeholder="Enter room ID"
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={joinMeeting}
            disabled={!joinId.trim()}
            className="w-full rounded-xl bg-primary px-4 py-2.5 text-primary-foreground font-semibold transition hover:opacity-90 disabled:opacity-50"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
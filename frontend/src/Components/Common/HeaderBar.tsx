import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useRef, useEffect } from 'react';
import { type AuthUser } from '../../api/auth';

type Props = {
  user: AuthUser;
  onLogout: () => void;
};

const HeaderBar = ({ user, onLogout }: Props) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = user.displayName?.trim()?.charAt(0)?.toUpperCase() || '?';

  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-white/50">
      <div className="mx-auto max-w-6xl px-4 py-2.5 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition"
          aria-label="HomeShelf home"
        >
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center text-white font-semibold shadow-sm">
            HS
          </div>
          <span className="text-xl font-semibold text-gray-900 tracking-tight">
            HomeShelf
          </span>
        </a>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-white/80 transition shadow-sm bg-white/60 border border-white/70"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold overflow-hidden">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {user.displayName}
            </span>
          </button>

          {open && (
            <div className="absolute left-0 top-full w-48 rounded-md border border-gray-200 bg-white shadow-lg py-1 z-20 translate-y-[1px]">
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="w-full px-3 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <LogoutIcon fontSize="small" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;

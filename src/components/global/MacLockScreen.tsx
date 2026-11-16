import { useState, useEffect } from 'react';
import { FaApple } from 'react-icons/fa';
import { IoExpand } from 'react-icons/io5';
import { userConfig } from '../../config/index';

interface MacLockScreenProps {
  onUnlock: () => void;
  bgUrl?: string;
}

export default function MacLockScreen({ onUnlock, bgUrl }: MacLockScreenProps) {
  const [time, setTime] = useState(new Date());
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    // Request fullscreen immediately inside the user click gesture
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    setIsUnlocking(true);
    setTimeout(() => {
      onUnlock();
    }, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleUnlock();
    };
    window.addEventListener('keydown', handleKeyDown, { once: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formatHoursMinutes = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      onClick={handleUnlock}
      className={`fixed inset-0 z-[200] flex flex-col justify-between items-center py-12 px-6 cursor-pointer select-none transition-all duration-500 ${
        isUnlocking ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark frosted overlay */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xl -z-10" />

      {/* Top Section: Date & Huge macOS Clock */}
      <div className="flex flex-col items-center mt-6 text-white text-center">
        <p className="text-xl md:text-2xl font-medium tracking-wide text-white/90 drop-shadow-md">
          {formatDate(time)}
        </p>
        <h1 className="text-7xl md:text-9xl font-extralight tracking-tight drop-shadow-lg mt-1 font-mono">
          {formatHoursMinutes(time)}
        </h1>
      </div>

      {/* Center Section: User Profile & Click to Enter */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-2xl p-1 hover:scale-105 transition-transform">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-inner">
            <FaApple size={44} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white tracking-wide drop-shadow-md">
            {userConfig.name}
          </h2>
          <p className="text-sm text-gray-200 mt-1 max-w-md">
            {userConfig.role}
          </p>
        </div>

        <button
          onClick={handleUnlock}
          className="mt-3 px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-sm font-medium shadow-xl flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 animate-pulse"
        >
          <IoExpand size={16} />
          <span>Click anywhere to open in Full Screen</span>
        </button>
      </div>

      {/* Bottom hint */}
      <div className="text-xs text-white/70 tracking-wider">
        Press any key or click to launch macOS desktop
      </div>
    </div>
  );
}


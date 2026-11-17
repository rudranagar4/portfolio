import { useState, useEffect, useRef } from 'react';
import { BsGithub, BsSpotify, BsFilePdf, BsStickyFill, BsCalendar } from 'react-icons/bs';
import { IoIosCall, IoIosMail } from 'react-icons/io';
import { FaLink, FaEnvelope, FaChrome, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import ResumeViewer from './ResumeViewer';
import SpotifyPlayer from './SpotifyPlayer';
import CalendarApp from './CalendarApp';
import ChromeApp from './ChromeApp';
import LinkedInApp from './LinkedInApp';
import { userConfig } from '../../config/index';
import { RiTerminalFill } from 'react-icons/ri';

interface DesktopDockProps {
  onTerminalClick: () => void;
  onNotesClick: () => void;
  onGitHubClick: () => void;
  onContactClick: () => void;
  onLinkedInClick?: () => void;
  activeApps: {
    terminal: boolean;
    notes: boolean;
    github: boolean;
    resume: boolean;
    spotify: boolean;
    linkedin?: boolean;
  };
}

const DesktopDock = ({ onTerminalClick, onNotesClick, onGitHubClick, onContactClick, onLinkedInClick, activeApps }: DesktopDockProps) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [showResume, setShowResume] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showChrome, setShowChrome] = useState(false);
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showLinksPopup, setShowLinksPopup] = useState(false);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const linksPopupRef = useRef<HTMLDivElement>(null);

  const handleLinksClick = () => {
    setShowLinksPopup(!showLinksPopup);
  };

  const handleCalendarClick = () => {
    setShowCalendar((prev) => !prev);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  const handleChromeClick = () => {
    setShowChrome((prev) => !prev);
  };

  const handleCloseChrome = () => {
    setShowChrome(false);
  };

  const handleLinkedInClick = () => {
    if (onLinkedInClick) {
      onLinkedInClick();
    } else {
      setShowLinkedIn((prev) => !prev);
    }
  };

  const handleCloseLinkedIn = () => {
    setShowLinkedIn(false);
  };

  const handleSpotifyClick = () => {
    setShowSpotify((prev) => !prev);
  };

  const handleResumeClick = () => {
    setShowResume((prev) => !prev);
  };

  const handleCloseResume = () => {
    setShowResume(false);
  };

  const handleCloseSpotify = () => {
    setShowSpotify(false);
  };

  // Email is handled via Contact widget now; direct mail link remains in Links popup

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (linksPopupRef.current && !linksPopupRef.current.contains(event.target as Node)) {
        setShowLinksPopup(false);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        if (e.clientY >= rect.top - 40 && e.clientY <= rect.bottom + 40) {
          setMouseX(e.clientX);
        } else {
          setMouseX(null);
        }
      }
    };

    const handleMouseLeave = () => {
      setMouseX(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const calculateScale = (iconIndex: number, totalIcons: number) => {
    if (mouseX === null || !dockRef.current) return 1;
    const rect = dockRef.current.getBoundingClientRect();
    const iconWidth = rect.width / totalIcons;
    const iconCenter = rect.left + iconIndex * iconWidth + iconWidth / 2;
    const distance = Math.abs(mouseX - iconCenter);
    const maxDistance = iconWidth * 1.8;
    if (distance > maxDistance) return 1;
    const proximity = 1 - distance / maxDistance;
    return 1 + proximity * 0.35; // Smooth scale up to 1.35x
  };

  const Tooltip = ({ text }: { text: string }) => (
    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white font-medium px-2.5 py-1 rounded-lg text-xs whitespace-nowrap shadow-xl border border-white/10 pointer-events-none z-50">
      {text}
    </div>
  );

  const LinksPopup = () => (
    <div
      ref={linksPopupRef}
      className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900/95 border border-white/10 w-44 backdrop-blur-md rounded-xl p-3 shadow-2xl z-50"
    >
      <div className="grid grid-cols-1 gap-y-2">
        <a
          href={userConfig.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <FaLinkedin size={20} className="text-[#0a66c2]" />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
        <a
          href={userConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <BsGithub size={20} />
          <span className="text-sm font-medium">GitHub</span>
        </a>
        <a
          href={userConfig.social.leetcode || 'https://leetcode.com/u/Vlx3f7mVBz/'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <SiLeetcode size={20} className="text-[#ffa116]" />
          <span className="text-sm font-medium">LeetCode</span>
        </a>
        <a
          href={`mailto:${userConfig.contact.email}`}
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <IoIosMail size={20} className="text-blue-400" />
          <span className="text-sm font-medium">Email</span>
        </a>
      </div>
    </div>
  );

  const icons = [
    { id: 'github', label: 'My Projects', onClick: onGitHubClick, icon: BsGithub, color: 'from-black to-black/60', active: activeApps.github },
    { id: 'chrome', label: 'Google Chrome', onClick: handleChromeClick, icon: FaChrome, color: 'from-white to-gray-100', active: showChrome },
    { id: 'notes', label: 'Resume Notes', onClick: onNotesClick, icon: BsStickyFill, color: 'from-yellow-600 to-yellow-400', active: activeApps.notes },
    { id: 'resume', label: 'View Resume', onClick: handleResumeClick, icon: BsFilePdf, color: 'from-red-600 to-red-400', active: activeApps.resume },
    { id: 'calendar', label: 'Calendar', onClick: handleCalendarClick, icon: BsCalendar, color: 'from-blue-600 to-blue-400', active: showCalendar },
    { id: 'spotify', label: 'Spotify Playlist', onClick: handleSpotifyClick, icon: BsSpotify, color: 'from-green-600 to-green-400', active: activeApps.spotify },
    { id: 'linkedin', label: 'LinkedIn', onClick: handleLinkedInClick, icon: FaLinkedin, color: 'from-[#0077b5] to-[#0a66c2]', active: Boolean(activeApps.linkedin ?? showLinkedIn) },
    { id: 'email', label: 'Contact', onClick: onContactClick, icon: IoIosMail, color: 'from-blue-600 to-blue-400', active: false },
    { id: 'links', label: 'Contact Links', onClick: handleLinksClick, icon: FaLink, color: 'from-purple-600 to-purple-400', active: false },
    { id: 'terminal', label: 'Terminal', onClick: onTerminalClick, icon: RiTerminalFill, color: 'from-black to-black/60', active: activeApps.terminal },
  ];

  return (
    <>
      <nav aria-label="Dock" className="fixed bottom-0 left-0 right-0 hidden md:flex justify-center pb-3.5 z-100">
        <div ref={dockRef} className="bg-gray-800/65 backdrop-blur-xl border border-white/15 rounded-2xl p-2 px-3.5 shadow-2xl">
          <div className="flex items-center space-x-3.5" role="menubar">
            {icons.map((item, index) => {
              const Icon = item.icon;
              const scale = calculateScale(index, icons.length);
              const isChrome = item.id === 'chrome';
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  aria-label={item.label}
                  aria-haspopup={item.id === 'links' ? 'menu' : undefined}
                  aria-expanded={item.id === 'links' ? showLinksPopup : undefined}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.onClick(); } }}
                  onMouseEnter={() => setHoveredIcon(item.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="relative group cursor-pointer"
                  style={{ transform: `scale(${scale})`, transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  <div className={`relative w-[52px] h-[52px] bg-gradient-to-t ${item.color} rounded-xl flex items-center justify-center shadow-xl active:scale-95 transition-all duration-150 ${item.active ? 'ring-2 ring-white/60' : ''}`}>
                    <Icon
                      size={
                        item.id === 'email'
                          ? 40
                          : item.id === 'calendar' || item.id === 'links'
                          ? 26
                          : isChrome
                          ? 32
                          : 30
                      }
                      className={
                        isChrome
                          ? 'text-[#4285F4] drop-shadow'
                          : 'text-white drop-shadow'
                      }
                    />
                    {item.active && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm" aria-hidden="true" />}
                  </div>
                  {hoveredIcon === item.id && <Tooltip text={item.label} />}
                  {item.id === 'links' && showLinksPopup && <LinksPopup />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <ResumeViewer isOpen={showResume} onClose={handleCloseResume} />
      <CalendarApp isOpen={showCalendar} onClose={handleCloseCalendar} />
      <ChromeApp isOpen={showChrome} onClose={handleCloseChrome} />
      {!onLinkedInClick && <LinkedInApp isOpen={showLinkedIn} onClose={handleCloseLinkedIn} />}
      <SpotifyPlayer
        isOpen={showSpotify}
        onClose={handleCloseSpotify}
        playlistId={userConfig.spotify.playlistId}
      />
    </>
  );
};

export default DesktopDock;

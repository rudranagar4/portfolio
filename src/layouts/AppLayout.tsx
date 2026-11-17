import { useEffect, useReducer, useState } from 'react';
import Spotlight from '../components/global/Spotlight';
import MacToolbar from '../components/global/MacToolbar';
import MacTerminal from '../components/global/MacTerminal';
import MobileDock from '../components/global/MobileDock';
import DesktopDock from '../components/global/DesktopDock';
import NotesApp from '../components/global/NotesApp';
import type { Section as NotesSection } from '../components/global/NotesApp';
import GitHubViewer from '../components/global/GitHubViewer';
import ResumeViewer from '../components/global/ResumeViewer';
import LinkedInApp from '../components/global/LinkedInApp';
import ShortcutsOverlay from '../components/global/ShortcutsOverlay';
import MissionControl from '../components/global/MissionControl';
import ContactWidget from '../components/global/ContactWidget';
import ShortcutHint from '../components/global/ShortcutHint';
import WelcomeTour from '../components/global/WelcomeTour';
import MacLockScreen from '../components/global/MacLockScreen';

interface AppLayoutProps {
  initialBg: string;
  backgroundMap: Record<string, string>;
}

type TutorialStep = {
  title: string;
  content: string;
  action?: () => void;
  buttonText?: string;
};

export default function Desktop({ initialBg, backgroundMap }: AppLayoutProps) {
  const [currentBg, setCurrentBg] = useState<string>(initialBg);
  type App = 'terminal' | 'notes' | 'github' | 'resume' | 'spotify' | 'linkedin';
  type State = { windows: Record<App, boolean> };
  type Action = { type: 'OPEN' | 'CLOSE' | 'TOGGLE'; app: App } | { type: 'CLOSE_ALL' };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'OPEN':
        return { windows: { ...state.windows, [action.app]: true } };
      case 'CLOSE':
        return { windows: { ...state.windows, [action.app]: false } };
      case 'TOGGLE':
        return { windows: { ...state.windows, [action.app]: !state.windows[action.app] } };
      case 'CLOSE_ALL':
        return { windows: { terminal: false, notes: false, github: false, resume: false, spotify: false, linkedin: false } };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    windows: { terminal: false, notes: false, github: false, resume: false, spotify: false, linkedin: false },
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isMissionControlOpen, setIsMissionControlOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [notesSection, setNotesSection] = useState<NotesSection | undefined>(undefined);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenBanner, setShowFullscreenBanner] = useState(true);
  const [isLocked, setIsLocked] = useState(true);

  // Auto-enforce fullscreen on first interaction
  useEffect(() => {
    const requestFullscreenSafe = () => {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };

    // Try immediately on mount
    requestFullscreenSafe();

    // Trigger on first click / tap / keypress
    const onUserGesture = () => {
      requestFullscreenSafe();
      window.removeEventListener('click', onUserGesture);
      window.removeEventListener('touchstart', onUserGesture);
      window.removeEventListener('keydown', onUserGesture);
    };

    window.addEventListener('click', onUserGesture);
    window.addEventListener('touchstart', onUserGesture);
    window.addEventListener('keydown', onUserGesture);

    const onFSChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (active) {
        setShowFullscreenBanner(false);
      }
    };

    document.addEventListener('fullscreenchange', onFSChange);

    return () => {
      window.removeEventListener('click', onUserGesture);
      window.removeEventListener('touchstart', onUserGesture);
      window.removeEventListener('keydown', onUserGesture);
      document.removeEventListener('fullscreenchange', onFSChange);
    };
  }, []);

  const activeApps = state.windows;

  useEffect(() => {
    const lastBg = localStorage.getItem('lastBackground');
    const hasCompletedTutorial = localStorage.getItem('hasCompletedTutorial') === 'true';

    if (lastBg === initialBg) {
      const bgKeys = Object.keys(backgroundMap);
      const availableBgs = bgKeys.filter((bg) => bg !== lastBg);
      const newBg =
        availableBgs[Math.floor(Math.random() * availableBgs.length)];
      setCurrentBg(newBg);
    }

    // Starting tour removed per user preference
    localStorage.setItem('hasCompletedTutorial', 'true');
    setShowTutorial(false);

    localStorage.setItem('lastBackground', currentBg);
  }, [initialBg, backgroundMap]);

  // Spotlight keyboard shortcut (Cmd/Ctrl + K), help overlay (?), and Mission Control (Ctrl/Cmd+Up or F3)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      if (cmdOrCtrl && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsSpotlightOpen(true);
      } else if (e.key === '?' || (e.key === '/' && e.shiftKey) || (cmdOrCtrl && (e.key === 'h' || e.key === 'H'))) {
        e.preventDefault();
        setShowShortcuts((s) => !s);
      } else if ((cmdOrCtrl && e.key === 'ArrowUp') || e.key === 'F3' || (cmdOrCtrl && (e.key === 'm' || e.key === 'M'))) {
        e.preventDefault();
        setIsMissionControlOpen((m) => !m);
      } else if (cmdOrCtrl && (e.key === 'c' || e.key === 'C')) {
        // Quick open contact with `ctrl+c`
        e.preventDefault();
        setIsContactOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Add this function to reset tutorial
  const resetTutorial = () => {
    setShowTutorial(true);
    localStorage.setItem('hasCompletedTutorial', 'false');
  };

  // Helper actions for Spotlight
  const openNotesSection = (section: NotesSection) => {
    setNotesSection(section);
    handleAppOpen('notes');
  };
  const closeAllWindows = () => dispatch({ type: 'CLOSE_ALL' });
  const shuffleBackground = () => {
    const bgKeys = Object.keys(backgroundMap);
    const availableBgs = bgKeys.filter((bg) => bg !== currentBg);
    const newBg = availableBgs[Math.floor(Math.random() * availableBgs.length)];
    setCurrentBg(newBg);
    localStorage.setItem('lastBackground', newBg);
  };

  const openProjectById = (id: string) => {
    setSelectedProjectId(id);
    handleAppOpen('github');
  };

  // Replaced legacy tutorial with WelcomeTour overlay

  const handleAppOpen = (app: App) => dispatch({ type: 'OPEN', app });
  const handleAppClose = (app: App) => dispatch({ type: 'CLOSE', app });

  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${backgroundMap[currentBg]})` }}
      />

      <div className='relative z-10'>
        <MacToolbar 
          onShowTutorial={resetTutorial}
          onOpenSpotlight={() => setIsSpotlightOpen(true)}
          onOpenMissionControl={() => setIsMissionControlOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onToggleShortcuts={() => setShowShortcuts((s) => !s)}
          onCloseAllWindows={closeAllWindows}
          onShuffleBackground={shuffleBackground}
          onOpenAdmin={() => { window.location.href = '/admin'; }}
        />
      </div>

      {showFullscreenBanner && !isFullscreen && (
        <div
          onClick={() => {
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen().catch(() => {});
            }
            setShowFullscreenBanner(false);
          }}
          className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-black/80 hover:bg-black/95 backdrop-blur-md text-white text-xs font-medium px-4 py-1.5 rounded-full border border-white/20 shadow-2xl cursor-pointer transition-all flex items-center gap-2 animate-pulse"
        >
          <span>⛶ Click anywhere for full-screen mode</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFullscreenBanner(false);
            }}
            className="text-gray-400 hover:text-white ml-1.5 font-bold text-sm leading-none"
            title="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      <div className='relative z-0 flex items-center justify-center h-[calc(100vh-10rem)] md:h-[calc(100vh-32px)] pt-2'>
      </div>

      {isLocked && (
        <MacLockScreen
          onUnlock={() => setIsLocked(false)}
          bgUrl={backgroundMap[currentBg] || initialBg}
        />
      )}

      <MobileDock
        onGitHubClick={() => {
          handleAppOpen('github');
        }}
        onNotesClick={() => {
          handleAppOpen('notes');
        }}
        onResumeClick={() => {
          handleAppOpen('resume');
        }}
        onTerminalClick={() => {
          handleAppOpen('terminal');
        }}
        onLinkedInClick={() => {
          handleAppOpen('linkedin');
        }}
      />
      <DesktopDock
        onTerminalClick={() => {
          handleAppOpen('terminal');
        }}
        onNotesClick={() => {
          handleAppOpen('notes');
        }}
        onGitHubClick={() => {
          handleAppOpen('github');
        }}
        onContactClick={() => setIsContactOpen(true)}
        onLinkedInClick={() => {
          handleAppOpen('linkedin');
        }}
        activeApps={activeApps}
      />

      <NotesApp isOpen={state.windows.notes} onClose={() => {
        handleAppClose('notes');
      }} section={notesSection} />
      <GitHubViewer isOpen={state.windows.github} onClose={() => {
        handleAppClose('github');
      }} selectedProjectId={selectedProjectId} />
      <ResumeViewer isOpen={state.windows.resume} onClose={() => {
        handleAppClose('resume');
      }} />
      <LinkedInApp isOpen={state.windows.linkedin} onClose={() => {
        handleAppClose('linkedin');
      }} />
      <MacTerminal isOpen={state.windows.terminal} onClose={() => {
        handleAppClose('terminal');
      }} />
      <Spotlight
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        actions={{
          openTerminal: () => handleAppOpen('terminal'),
          openNotes: () => handleAppOpen('notes'),
          openContact: () => setIsContactOpen(true),
          openNotesSection: (s) => openNotesSection(s as NotesSection),
          openGitHub: () => handleAppOpen('github'),
          openResume: () => handleAppOpen('resume'),
          openLinkedIn: () => handleAppOpen('linkedin'),
          showTutorial: resetTutorial,
          closeAllWindows,
          shuffleBackground,
          openProjectById,
        }}
      />
      <WelcomeTour
        open={showTutorial}
        onClose={() => { setShowTutorial(false); localStorage.setItem('hasCompletedTutorial', 'true'); }}
        actions={{
          openSpotlight: () => setIsSpotlightOpen(true),
          openMissionControl: () => setIsMissionControlOpen(true),
          openNotes: () => handleAppOpen('notes'),
          openGitHub: () => handleAppOpen('github'),
          openContact: () => setIsContactOpen(true),
          closeAll: closeAllWindows,
        }}
      />
      <ShortcutsOverlay open={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <ShortcutHint />
      <ContactWidget open={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <MissionControl
        isOpen={isMissionControlOpen}
        onClose={() => setIsMissionControlOpen(false)}
        activeApps={activeApps}
        onAppClick={(app) => handleAppOpen(app)}
        onAppClose={(app) => handleAppClose(app)}
      />
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { MdWifi } from 'react-icons/md';
import { FaApple, FaGithub, FaLinkedin, FaEnvelope, FaWindowRestore } from 'react-icons/fa';
import {
  IoSearchSharp,
  IoBatteryHalfOutline,
  IoCellular,
  IoDocumentText,
  IoCodeSlash,
  IoMail,
  IoCall,
  IoHelpCircle,
  IoExpand,
  IoContract,
} from 'react-icons/io5';
import { VscVscode } from 'react-icons/vsc';
import { userConfig } from '../../config/index';

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  action?: () => void;
  submenu?: MenuItem[];
};

interface MacToolbarProps {
  onShowTutorial?: () => void;
  onOpenSpotlight?: () => void;
  onOpenMissionControl?: () => void;
  onOpenContact?: () => void;
  onToggleShortcuts?: () => void;
  onCloseAllWindows?: () => void;
  onShuffleBackground?: () => void;
  onOpenAdmin?: () => void;
}

export default function MacToolbar({
  onShowTutorial,
  onOpenSpotlight,
  onOpenMissionControl,
  onOpenContact,
  onToggleShortcuts,
  onCloseAllWindows,
  onShuffleBackground,
  onOpenAdmin,
}: MacToolbarProps) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showSignature, setShowSignature] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatMacDate = (date: Date) => {
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const timeStr = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${weekday} ${month} ${day}  ${timeStr}`;
  };

  const formatIPhoneTime = (date: Date) => {
    let hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');

    hour = hour % 12;
    hour = hour ? hour : 12;

    return `${hour}:${minute}`;
  };

  const handleVSCodeClick = () => {
    window.location.href = 'vscode:/';
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleAction = (action?: () => void) => {
    if (action) {
      action();
      setActiveMenu(null);
    }
  };

  const menus: Record<string, MenuItem[]> = {
    File: [
      {
        label: 'Resume (PDF)',
        icon: <IoDocumentText size={16} />,
        action: () => window.open(userConfig.resume.url, '_blank'),
      },
      {
        label: 'Projects (GitHub)',
        icon: <IoCodeSlash size={16} />,
        action: () => window.open(userConfig.social.github, '_blank'),
      },
      {
        label: 'Admin Dashboard',
        icon: <FaWindowRestore size={16} />,
        action: () => onOpenAdmin ? onOpenAdmin() : (window.location.href = '/admin'),
      },
    ],
    View: [
      {
        label: 'Spotlight Search…',
        icon: <IoSearchSharp size={16} />,
        action: () => onOpenSpotlight?.(),
      },
      {
        label: 'Mission Control',
        icon: <FaWindowRestore size={16} />,
        action: () => onOpenMissionControl?.(),
      },
      {
        label: 'Shortcuts Overlay',
        icon: <IoHelpCircle size={16} />,
        action: () => onToggleShortcuts?.(),
      },
      {
        label: 'Reset Tutorial',
        icon: <IoHelpCircle size={16} />,
        action: () => onShowTutorial?.(),
      },
    ],
    Window: [
      {
        label: 'Contact…',
        icon: <IoMail size={16} />,
        action: () => onOpenContact?.(),
      },
      {
        label: 'Close All Windows',
        icon: <IoDocumentText size={16} />,
        action: () => onCloseAllWindows?.(),
      },
      {
        label: 'Shuffle Background',
        icon: <IoDocumentText size={16} />,
        action: () => onShuffleBackground?.(),
      },
    ],
    Go: [
      {
        label: 'GitHub',
        icon: <FaGithub size={16} />,
        action: () => window.open(userConfig.social.github, '_blank'),
      },
      {
        label: 'LinkedIn',
        icon: <FaLinkedin size={16} />,
        action: () => window.open(userConfig.social.linkedin, '_blank'),
      },
      {
        label: 'Email',
        icon: <FaEnvelope size={16} />,
        action: () => window.open(`mailto:${userConfig.contact.email}`),
      },
    ],
    Edit: [
      {
        label: 'Copy Email',
        icon: <IoMail size={16} />,
        action: () => {
          navigator.clipboard.writeText(userConfig.contact.email);
          alert('Email copied to clipboard!');
        },
      },
      {
        label: 'Copy Phone',
        icon: <IoCall size={16} />,
        action: () => {
          navigator.clipboard.writeText(userConfig.contact.phone);
          alert('Phone number copied to clipboard!');
        },
      },
    ],
    Help: [
      {
        label: 'Keyboard Shortcuts',
        icon: <IoHelpCircle size={16} />,
        action: () => onToggleShortcuts?.(),
      },
    ],
  };

  const renderMenu = (menuItems: MenuItem[]) => (
    <div className="absolute top-full left-0 mt-1 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl py-1 min-w-[200px]" role="menu">
      {menuItems.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => handleAction(item.action)}
            role="menuitem"
            className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700/50 flex items-center gap-2"
          >
            {item.icon}
            {item.label}
          </button>
          {item.submenu && (
            <div className="absolute left-full top-0 ml-1 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl py-1 min-w-[200px]" role="menu">
              {item.submenu.map((subItem, subIndex) => (
                <button
                  key={subIndex}
                  onClick={() => handleAction(subItem.action)}
                  role="menuitem"
                  className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700/50 flex items-center gap-2"
                >
                  {subItem.icon}
                  {subItem.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className='sticky top-0 z-50 md:hidden bg-black/25 backdrop-blur-xl text-white h-10 px-4 flex items-center justify-between text-sm font-medium border-b border-white/5'>
        <span className='font-semibold text-xs tracking-tight'>
          {formatIPhoneTime(currentDateTime)}
        </span>
        <div className='flex items-center gap-2.5'>
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="cursor-pointer p-1 rounded hover:bg-white/10 text-white"
          >
            {isFullscreen ? <IoContract size={16} /> : <IoExpand size={16} />}
          </button>
          <IoCellular size={18} />
          <MdWifi size={18} />
          <IoBatteryHalfOutline size={20} />
        </div>
      </div>

      <div className='sticky top-0 z-50 hidden md:flex bg-black/25 backdrop-blur-xl text-white/95 h-[32px] px-4 items-center justify-between text-[13px] border-b border-white/5 shadow-sm font-normal select-none' role="menubar" aria-label="Application menu bar">
        <div className='flex items-center space-x-3.5' ref={menuRef}>
          <FaApple size={16} className="cursor-pointer hover:opacity-75 transition-opacity" onClick={() => onShowTutorial?.()} />
          <div className="relative">
            <span 
              className='font-bold text-[13px] tracking-tight hover:opacity-75 transition-opacity cursor-pointer'
              onMouseEnter={() => setShowSignature(true)}
              onMouseLeave={() => setShowSignature(false)}
            >
              {userConfig.name}
            </span>
            {showSignature && (
              <div className="absolute top-full left-0 mt-2 bg-gray-900/90 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-white/10 z-[100] pointer-events-none transition-all">
                  <img 
                    src="/avatar.png" 
                    alt="Rudra" 
                    className="w-[130px] h-[175px] object-cover rounded-xl shadow-lg"
                  />
              </div>
            )}
          </div>
          {Object.entries(menus).map(([menu, items]) => (
            <div key={menu} className="relative">
              <button 
                className='cursor-pointer text-[13px] font-normal text-white/90 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 transition-colors'
                onClick={() => handleMenuClick(menu)}
                aria-haspopup="menu"
                aria-expanded={activeMenu === menu}
                aria-controls={`menu-${menu}`}
                role="menuitem"
              >
                {menu}
              </button>
              {activeMenu === menu && (
                <div id={`menu-${menu}`} className="mt-1">
                  {renderMenu(items)}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='flex items-center space-x-3 text-white/90'>
          <button
            onClick={toggleFullscreen}
            className='cursor-pointer p-1 rounded hover:bg-white/10 hover:text-white transition-colors text-white/90'
            title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
            aria-label='Toggle Full Screen'
          >
            {isFullscreen ? <IoContract size={14} /> : <IoExpand size={14} />}
          </button>
          <VscVscode
            size={15}
            className='cursor-pointer hover:text-white hover:opacity-90 transition-opacity'
            onClick={handleVSCodeClick}
            title='Open in VSCode'
          />
          <IoBatteryHalfOutline size={18} className="cursor-default" title="Battery: 85%" />
          <MdWifi size={16} className="cursor-default" title="Wi-Fi: Connected" />
          <IoSearchSharp
            size={15}
            className='cursor-pointer hover:text-white hover:opacity-90 transition-opacity'
            onClick={() => onOpenSpotlight?.()}
            title='Search (Ctrl/Cmd+K)'
            role='button'
            aria-label='Open search'
          />
          <span className='cursor-default text-[13px] font-medium tracking-normal text-white/95 px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors'>
            {formatMacDate(currentDateTime)}
          </span>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import DraggableWindow from './DraggableWindow';
import { FaChrome, FaArrowLeft, FaArrowRight, FaRedo, FaLock, FaSearch, FaExternalLinkAlt, FaGithub, FaLinkedin, FaYoutube, FaCode } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { userConfig } from '../../config/index';

interface ChromeAppProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = {
  id: string;
  title: string;
  url: string;
};

export default function ChromeApp({ isOpen, onClose }: ChromeAppProps) {
  const [tabs] = useState<Tab[]>([
    { id: 'google', title: 'Google', url: 'https://www.google.com' },
    { id: 'github', title: 'Rudra Pratap - GitHub', url: userConfig.social.github },
    { id: 'linkedin', title: 'LinkedIn Profile', url: userConfig.social.linkedin },
  ]);
  const [activeTabId, setActiveTabId] = useState('google');
  const [searchQuery, setSearchQuery] = useState('');
  const [urlInput, setUrlInput] = useState('https://www.google.com');

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    setUrlInput(activeTab.url);
  }, [activeTabId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery.trim())}`;
    window.open(searchUrl, '_blank');
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let dest = urlInput.trim();
    if (!dest) return;
    if (!dest.startsWith('http://') && !dest.startsWith('https://')) {
      dest = `https://${dest}`;
    }
    window.open(dest, '_blank');
  };

  const shortcuts = [
    {
      name: 'GitHub',
      icon: <FaGithub size={22} className="text-white" />,
      bg: 'bg-zinc-800',
      action: () => window.open(userConfig.social.github, '_blank'),
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin size={22} className="text-[#0a66c2]" />,
      bg: 'bg-white',
      action: () => window.open(userConfig.social.linkedin, '_blank'),
    },
    {
      name: 'LeetCode',
      icon: <FaCode size={20} className="text-amber-500" />,
      bg: 'bg-zinc-800',
      action: () => window.open('https://leetcode.com', '_blank'),
    },
    {
      name: 'YouTube',
      icon: <FaYoutube size={22} className="text-red-500" />,
      bg: 'bg-zinc-800',
      action: () => window.open('https://youtube.com', '_blank'),
    },
  ];

  return (
    <DraggableWindow
      title="Google Chrome"
      onClose={onClose}
      initialPosition={{
        x: Math.floor(window.innerWidth * 0.18),
        y: Math.floor(window.innerHeight * 0.1),
      }}
      className="w-[95%] max-w-4xl shadow-2xl"
      initialSize={{ width: 840, height: 580 }}
    >
      <div className="flex flex-col h-full bg-[#202124] text-gray-200 select-none">
        {/* Chrome Tab Bar */}
        <div className="flex items-center bg-[#292a2d] px-3 pt-2 border-b border-black/40 gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-t-lg text-xs font-medium transition-all max-w-[200px] truncate cursor-pointer ${
                  isActive
                    ? 'bg-[#35363a] text-white shadow-sm'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                {tab.id === 'google' && <FcGoogle size={14} className="flex-shrink-0" />}
                {tab.id === 'github' && <FaGithub size={13} className="text-white flex-shrink-0" />}
                {tab.id === 'linkedin' && <FaLinkedin size={13} className="text-[#0a66c2] flex-shrink-0" />}
                <span className="truncate">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Chrome Navigation & Omnibox Bar */}
        <div className="flex items-center gap-3 px-4 py-2 bg-[#35363a] border-b border-black/30">
          <div className="flex items-center gap-2 text-gray-400">
            <button
              onClick={() => setActiveTabId('google')}
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Back"
            >
              <FaArrowLeft size={12} />
            </button>
            <button
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Forward"
            >
              <FaArrowRight size={12} />
            </button>
            <button
              onClick={() => setUrlInput(activeTab.url)}
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Reload"
            >
              <FaRedo size={11} />
            </button>
          </div>

          {/* Omnibox / URL Bar */}
          <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center bg-[#202124] rounded-full px-3.5 py-1.5 border border-white/5 focus-within:border-blue-500/80 transition-all">
            <FaLock size={10} className="text-gray-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full bg-transparent text-xs text-gray-200 focus:outline-none"
              placeholder="Search Google or type a URL"
            />
            <button
              type="button"
              onClick={() => window.open(urlInput, '_blank')}
              className="ml-2 text-gray-400 hover:text-white transition-colors"
              title="Open in new tab"
            >
              <FaExternalLinkAlt size={11} />
            </button>
          </form>

          <button
            onClick={() => window.open('https://www.google.com', '_blank')}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <FaChrome size={14} className="text-blue-400" />
            <span>Open Browser</span>
          </button>
        </div>

        {/* Chrome Browser Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#202124] overflow-y-auto">
          {/* Google Logo */}
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-5xl font-bold tracking-tight">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </h1>
            <p className="text-xs text-gray-400 mt-2">Rudra Pratap Nagar &bull; Chrome Browser Edition</p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-xl mb-6">
            <div className="relative flex items-center bg-[#303134] hover:bg-[#3c4043] focus-within:bg-[#303134] rounded-full px-4 py-3 border border-transparent hover:border-white/10 focus-within:border-white/20 shadow-lg transition-all">
              <FaSearch className="text-gray-400 mr-3 text-sm flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Google or type a URL"
                className="w-full bg-transparent text-sm text-white focus:outline-none"
                autoFocus
              />
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] text-xs font-medium text-gray-200 rounded-md transition-colors cursor-pointer"
              >
                Google Search
              </button>
              <button
                type="button"
                onClick={() => window.open('https://www.google.com/doodles', '_blank')}
                className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] text-xs font-medium text-gray-200 rounded-md transition-colors cursor-pointer"
              >
                I'm Feeling Lucky
              </button>
            </div>
          </form>

          {/* Shortcuts Grid */}
          <div className="grid grid-cols-4 gap-6 max-w-md w-full mt-4">
            {shortcuts.map((sc) => (
              <button
                key={sc.name}
                onClick={sc.action}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-full ${sc.bg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                  {sc.icon}
                </div>
                <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors">
                  {sc.name}
                </span>
              </button>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center text-xs text-gray-500">
            <span>Powered by Google Chrome &bull; Simulated in macOS Sonoma</span>
          </div>
        </div>
      </div>
    </DraggableWindow>
  );
}

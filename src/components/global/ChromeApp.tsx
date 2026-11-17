import { useState, useEffect } from 'react';
import DraggableWindow from './DraggableWindow';
import {
  FaChrome,
  FaArrowLeft,
  FaArrowRight,
  FaRedo,
  FaLock,
  FaSearch,
  FaExternalLinkAlt,
  FaGithub,
  FaYoutube,
  FaCode,
  FaPlus,
  FaTimes,
  FaStar,
  FaFolder,
  FaPlay,
  FaCheckCircle,
} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { BsGlobe } from 'react-icons/bs';
import { userConfig } from '../../config/index';
import { leetcodeProblems } from '../../config/leetcode';

interface ChromeAppProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'google' | 'github' | 'youtube' | 'leetcode' | 'web';

type Tab = {
  id: string;
  title: string;
  url: string;
  type: TabType;
  query?: string;
};

export default function ChromeApp({ isOpen, onClose }: ChromeAppProps) {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'tab-google',
      title: 'Google',
      url: 'https://www.google.com',
      type: 'google',
    },
    {
      id: 'tab-github',
      title: 'GitHub - rudranagar4',
      url: userConfig.social.github,
      type: 'github',
    },
    {
      id: 'tab-youtube',
      title: 'YouTube',
      url: 'https://youtube.com',
      type: 'youtube',
    },
  ]);
  const [activeTabId, setActiveTabId] = useState('tab-google');
  const [urlInput, setUrlInput] = useState('https://www.google.com');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYtVideoId, setSelectedYtVideoId] = useState<string>('cGM8vG_GvQ0');
  const [selectedYtTitle, setSelectedYtTitle] = useState<string>('Karan Aujla - Softly (Official Music Video)');
  const [selectedYtChannel, setSelectedYtChannel] = useState<string>('Karan Aujla');
  const [ytSearchInput, setYtSearchInput] = useState<string>('');
  const [ytCategory, setYtCategory] = useState<string>('All');
  const [leetcodeFilter, setLeetcodeFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [leetcodeCategory, setLeetcodeCategory] = useState<string>('All');
  const [leetcodeSearch, setLeetcodeSearch] = useState<string>('');

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    if (activeTab) {
      setUrlInput(activeTab.url);
    }
  }, [activeTabId, tabs]);

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

  const isClient = typeof window !== 'undefined';
  const screenW = isClient ? window.innerWidth : 1024;
  const screenH = isClient ? window.innerHeight : 768;
  const width = Math.min(880, Math.max(340, screenW - 40));
  const height = Math.min(620, Math.max(400, screenH - 80));
  const posX = Math.max(10, Math.floor((screenW - width) / 2));
  const posY = Math.max(30, Math.floor((screenH - height) / 2) - 15);

  const handleOpenTab = (type: TabType, title: string, url: string, query?: string) => {
    const existing = tabs.find((t) => t.type === type && t.url === url);
    if (existing) {
      setActiveTabId(existing.id);
      return;
    }
    const newId = `tab-${Date.now()}`;
    const newTab: Tab = { id: newId, title, url, type, query };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (tabIdToClose: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (tabs.length === 1) {
      // Don't close last tab, just reset to Google
      setTabs([
        {
          id: 'tab-google',
          title: 'Google',
          url: 'https://www.google.com',
          type: 'google',
        },
      ]);
      setActiveTabId('tab-google');
      return;
    }

    const filtered = tabs.filter((t) => t.id !== tabIdToClose);
    setTabs(filtered);
    if (activeTabId === tabIdToClose) {
      setActiveTabId(filtered[filtered.length - 1].id);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;

    // Check if query is URL
    if (q.includes('.') && !q.includes(' ') && (q.startsWith('http://') || q.startsWith('https://') || !q.includes('?'))) {
      const targetUrl = q.startsWith('http://') || q.startsWith('https://') ? q : `https://${q}`;
      handleOpenTab('web', q, targetUrl);
      setSearchQuery('');
      return;
    }

    // Otherwise open Google search results tab inside Chrome
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
    const newId = `tab-${Date.now()}`;
    setTabs((prev) => [
      ...prev,
      {
        id: newId,
        title: `${q} - Google Search`,
        url: searchUrl,
        type: 'google',
        query: q,
      },
    ]);
    setActiveTabId(newId);
    setSearchQuery('');
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let dest = urlInput.trim();
    if (!dest) return;
    if (!dest.startsWith('http://') && !dest.startsWith('https://')) {
      if (dest.includes('.') && !dest.includes(' ')) {
        dest = `https://${dest}`;
      } else {
        // Search query
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(dest)}`;
        const newId = `tab-${Date.now()}`;
        setTabs((prev) => [
          ...prev,
          {
            id: newId,
            title: `${dest} - Google Search`,
            url: searchUrl,
            type: 'google',
            query: dest,
          },
        ]);
        setActiveTabId(newId);
        return;
      }
    }

    // Check known domains
    if (dest.includes('github.com')) {
      handleOpenTab('github', 'GitHub - rudranagar4', dest);
    } else if (dest.includes('youtube.com') || dest.includes('youtu.be')) {
      handleOpenTab('youtube', 'YouTube', dest);
    } else if (dest.includes('leetcode.com')) {
      handleOpenTab('leetcode', 'LeetCode Practice', dest);
    } else if (dest.includes('google.com')) {
      handleOpenTab('google', 'Google', dest);
    } else {
      handleOpenTab('web', dest.replace(/^https?:\/\//, ''), dest);
    }
  };

  const shortcuts = [
    {
      name: 'GitHub',
      icon: <FaGithub size={22} className="text-white" />,
      bg: 'bg-zinc-800',
      action: () => handleOpenTab('github', 'GitHub - rudranagar4', userConfig.social.github),
    },
    {
      name: 'YouTube',
      icon: <FaYoutube size={22} className="text-red-500" />,
      bg: 'bg-zinc-800',
      action: () => handleOpenTab('youtube', 'YouTube', 'https://youtube.com'),
    },
    {
      name: 'LeetCode',
      icon: <FaCode size={20} className="text-amber-500" />,
      bg: 'bg-zinc-800',
      action: () => handleOpenTab('leetcode', 'LeetCode Practice', 'https://leetcode.com'),
    },
    {
      name: 'NIET Portal',
      icon: <BsGlobe size={20} className="text-blue-400" />,
      bg: 'bg-zinc-800',
      action: () => handleOpenTab('web', 'NIET Greater Noida', 'https://www.niet.co.in'),
    },
  ];

  const youtubeTracks = [
    { title: 'Winning Speech', artist: 'Karan Aujla', genre: 'Punjabi Hip-Hop', duration: '3:34' },
    { title: 'Softly', artist: 'Karan Aujla', genre: 'Punjabi Hip-Hop', duration: '2:36' },
    { title: '52 Bars', artist: 'Karan Aujla', genre: 'Punjabi Hip-Hop', duration: '3:45' },
    { title: 'Lover', artist: 'Diljit Dosanjh', genre: 'Pop', duration: '3:12' },
    { title: 'Born to Shine', artist: 'Diljit Dosanjh', genre: 'Urban Punjabi', duration: '3:22' },
    { title: 'GOAT', artist: 'Diljit Dosanjh', genre: 'Urban Punjabi', duration: '3:43' },
    { title: 'Blinding Lights', artist: 'The Weeknd', genre: 'Synthwave', duration: '3:20' },
    { title: 'Starboy', artist: 'The Weeknd', genre: 'R&B / Pop', duration: '3:50' },
    { title: 'Russian Bandana', artist: 'Dhanda Nyoliwala', genre: 'Haryanvi / Hip-Hop', duration: '2:48' },
    { title: 'Raat Ki Rani', artist: 'Dhanda Nyoliwala', genre: 'Hip-Hop', duration: '3:15' },
    { title: 'Farebi', artist: 'Dhanda Nyoliwala', genre: 'Hip-Hop', duration: '3:05' },
  ];

  return (
    <DraggableWindow
      title="Google Chrome"
      onClose={onClose}
      initialPosition={{ x: posX, y: posY }}
      className="w-[95%] max-w-4xl shadow-2xl"
      initialSize={{ width, height }}
    >
      <div className="flex flex-col h-full bg-[#202124] text-gray-200 select-none">
        {/* Chrome Tab Bar */}
        <div className="flex items-center bg-[#292a2d] px-2 pt-2 border-b border-black/40 gap-1 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`group flex items-center justify-between gap-2 px-3 py-1.5 rounded-t-lg text-xs font-medium transition-all max-w-[210px] min-w-[120px] cursor-pointer ${
                  isActive
                    ? 'bg-[#35363a] text-white shadow-sm border-t-2 border-blue-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  {tab.type === 'google' && <FcGoogle size={14} className="flex-shrink-0" />}
                  {tab.type === 'github' && <FaGithub size={13} className="text-white flex-shrink-0" />}
                  {tab.type === 'youtube' && <FaYoutube size={13} className="text-red-500 flex-shrink-0" />}
                  {tab.type === 'leetcode' && <FaCode size={13} className="text-amber-500 flex-shrink-0" />}
                  {tab.type === 'web' && <BsGlobe size={13} className="text-blue-400 flex-shrink-0" />}
                  <span className="truncate text-[11px]">{tab.title}</span>
                </div>
                <button
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className="opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded-full p-0.5 text-gray-400 hover:text-white transition-opacity"
                  title="Close tab"
                >
                  <FaTimes size={10} />
                </button>
              </div>
            );
          })}

          {/* New Tab Button */}
          <button
            onClick={() => handleOpenTab('google', 'New Tab', 'https://www.google.com')}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer ml-1"
            title="New tab"
          >
            <FaPlus size={11} />
          </button>
        </div>

        {/* Chrome Navigation & Omnibox Bar */}
        <div className="flex items-center gap-3 px-4 py-2 bg-[#35363a] border-b border-black/30 flex-shrink-0">
          <div className="flex items-center gap-2 text-gray-400">
            <button
              onClick={() => {
                if (activeTab.type !== 'google') {
                  handleOpenTab('google', 'Google', 'https://www.google.com');
                }
              }}
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Back to Home"
            >
              <FaArrowLeft size={12} />
            </button>
            <button
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer opacity-50"
              title="Forward"
              disabled
            >
              <FaArrowRight size={12} />
            </button>
            <button
              onClick={() => {
                setUrlInput(activeTab.url);
              }}
              className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Reload page"
            >
              <FaRedo size={11} />
            </button>
          </div>

          {/* Omnibox / URL Bar */}
          <form
            onSubmit={handleUrlSubmit}
            className="flex-1 flex items-center bg-[#202124] rounded-full px-3.5 py-1.5 border border-white/5 focus-within:border-blue-500/80 transition-all"
          >
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
              onClick={() => window.open(activeTab.url, '_blank')}
              className="ml-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Open currently displayed page in external browser tab"
            >
              <FaExternalLinkAlt size={11} />
            </button>
          </form>

          <button
            onClick={() => window.open(activeTab.url, '_blank')}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            title="Open in real browser"
          >
            <FaChrome size={13} className="text-blue-400" />
            <span className="hidden sm:inline">Open Browser</span>
          </button>
        </div>

        {/* Chrome Tab Content Container */}
        <div className="flex-1 overflow-y-auto bg-[#202124] flex flex-col">
          {/* TAB 1: GOOGLE SEARCH / NEW TAB */}
          {activeTab.type === 'google' && !activeTab.query && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8">
              {/* Google Logo */}
              <div className="flex flex-col items-center mb-6">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </h1>
                <p className="text-xs text-gray-400 mt-2">Google Chrome &bull; Rudra Pratap Nagar Edition</p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="w-full max-w-xl mb-6">
                <div className="relative flex items-center bg-[#303134] hover:bg-[#3c4043] focus-within:bg-[#303134] rounded-full px-4 py-3 border border-transparent hover:border-white/10 focus-within:border-white/20 shadow-lg transition-all">
                  <FaSearch className="text-gray-400 mr-3 text-sm flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Google or type a URL..."
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
                    onClick={() => handleOpenTab('github', 'GitHub - rudranagar4', userConfig.social.github)}
                    className="px-4 py-2 bg-[#303134] hover:bg-[#3c4043] text-xs font-medium text-gray-200 rounded-md transition-colors cursor-pointer"
                  >
                    I'm Feeling Lucky
                  </button>
                </div>
              </form>

              {/* Shortcuts Grid */}
              <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-md w-full mt-2">
                {shortcuts.map((sc) => (
                  <button
                    key={sc.name}
                    onClick={sc.action}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer group"
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${sc.bg} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      {sc.icon}
                    </div>
                    <span className="text-[11px] text-gray-300 font-medium group-hover:text-white transition-colors text-center">
                      {sc.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 1.5: GOOGLE SEARCH RESULTS */}
          {activeTab.type === 'google' && activeTab.query && (
            <div className="p-6 max-w-3xl mx-auto w-full space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <FcGoogle size={24} />
                  <span className="text-sm font-semibold text-white">Results for "{activeTab.query}"</span>
                </div>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(activeTab.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-full"
                >
                  <span>Open live results on Google</span>
                  <FaExternalLinkAlt size={10} />
                </a>
              </div>

              {/* Simulated Search Result Cards */}
              <div className="space-y-4">
                <div className="bg-[#292a2d] p-4 rounded-xl border border-white/5 space-y-1">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    https://github.com/rudranagar4
                  </span>
                  <h3
                    onClick={() => handleOpenTab('github', 'GitHub - rudranagar4', userConfig.social.github)}
                    className="text-base text-[#8ab4f8] hover:underline cursor-pointer font-medium"
                  >
                    Rudra Pratap Nagar (rudranagar4) &bull; GitHub Profile
                  </h3>
                  <p className="text-xs text-gray-300">
                    B.Tech CSE (Data Science) undergraduate at NIET. Creator of Redis Server in C++, Khata Pe rental app, RoomPulse AI, and systems programming projects.
                  </p>
                </div>

                <div className="bg-[#292a2d] p-4 rounded-xl border border-white/5 space-y-1">
                  <span className="text-xs text-gray-400">https://music.youtube.com</span>
                  <h3
                    onClick={() => handleOpenTab('youtube', 'YouTube Music', 'https://youtube.com')}
                    className="text-base text-[#8ab4f8] hover:underline cursor-pointer font-medium"
                  >
                    Listen to Karan Aujla, Diljit Dosanjh, The Weeknd on YouTube Music
                  </h3>
                  <p className="text-xs text-gray-300">
                    Stream top Punjabi & Hip-hop hits including Winning Speech, Softly, Lover, Starboy, and Dhanda Nyoliwala tracks inside Chrome.
                  </p>
                </div>

                <div className="bg-[#292a2d] p-4 rounded-xl border border-white/5 space-y-1">
                  <span className="text-xs text-gray-400">https://leetcode.com/rudranagar4</span>
                  <h3
                    onClick={() => handleOpenTab('leetcode', 'LeetCode Practice', 'https://leetcode.com')}
                    className="text-base text-[#8ab4f8] hover:underline cursor-pointer font-medium"
                  >
                    Data Structures & Algorithms in C++ &bull; LeetCode Track
                  </h3>
                  <p className="text-xs text-gray-300">
                    Solving algorithmic challenges in C++, memory management, trees, dynamic programming, and computational problem solving.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GITHUB PROFILE & REPOSITORIES INSIDE CHROME */}
          {activeTab.type === 'github' && (
            <div className="p-4 md:p-6 max-w-4xl mx-auto w-full space-y-6">
              {/* GitHub Header Bar */}
              <div className="bg-[#161b22] border border-white/10 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <img
                    src="/avatar.png"
                    alt="Rudra Pratap Nagar"
                    className="w-16 h-16 rounded-full border-2 border-white/20 object-cover bg-black"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-white">{userConfig.name}</h2>
                      <span className="text-xs text-gray-400">rudranagar4</span>
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5">
                      Computer Science (Data Science) @ NIET | C++, Python, Systems, Wi-Fi CSI
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                      <span>{userConfig.location}</span>
                      <span>&bull;</span>
                      <span className="text-green-400">7 Public Repositories</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={userConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-white text-xs font-semibold rounded-md border border-white/15 transition-colors"
                  >
                    <FaExternalLinkAlt size={10} />
                    <span>View on GitHub.com</span>
                  </a>
                </div>
              </div>

              {/* GitHub Pinned Repositories */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <FaStar size={13} className="text-amber-400" />
                  <span>Pinned Repositories</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {userConfig.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-[#161b22] border border-white/10 hover:border-white/20 rounded-xl p-4 flex flex-col justify-between transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-[#58a6ff] hover:underline flex items-center gap-1.5"
                          >
                            <FaFolder size={13} className="text-gray-400" />
                            <span>{proj.title}</span>
                          </a>
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-gray-400 font-medium">
                            Public
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                          {proj.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-[11px]">
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#f1e05a]" />
                          <span>{proj.techStack[0] || 'Code'}</span>
                        </div>
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#58a6ff] hover:underline flex items-center gap-1"
                        >
                          <span>Explore code</span>
                          <FaExternalLinkAlt size={9} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: YOUTUBE INSIDE CHROME */}
          {activeTab.type === 'youtube' && (() => {
            const youtubeVideos = [
              {
                id: 'cGM8vG_GvQ0',
                title: 'Karan Aujla - Softly (Official Music Video)',
                channel: 'Karan Aujla',
                views: '120M views',
                duration: '2:36',
                category: 'Karan Aujla',
              },
              {
                id: '4TWRfT1m18w',
                title: 'Karan Aujla - 52 Bars | Four You (Official Video)',
                channel: 'Karan Aujla',
                views: '95M views',
                duration: '3:45',
                category: 'Karan Aujla',
              },
              {
                id: 'rW2U8yHlD6c',
                title: 'Karan Aujla - Winning Speech (Official Video)',
                channel: 'Karan Aujla',
                views: '80M views',
                duration: '3:34',
                category: 'Karan Aujla',
              },
              {
                id: 'bL6h5lZ_9oY',
                title: 'Diljit Dosanjh - Lover (Official Music Video)',
                channel: 'Diljit Dosanjh',
                views: '150M views',
                duration: '3:12',
                category: 'Diljit Dosanjh',
              },
              {
                id: '9iIX0z_2w6w',
                title: 'Diljit Dosanjh - Born to Shine (Official Video)',
                channel: 'Diljit Dosanjh',
                views: '210M views',
                duration: '3:22',
                category: 'Diljit Dosanjh',
              },
              {
                id: 'cl0a3i2wFcc',
                title: 'Diljit Dosanjh - G.O.A.T. (Official Music Video)',
                channel: 'Diljit Dosanjh',
                views: '260M views',
                duration: '3:43',
                category: 'Diljit Dosanjh',
              },
              {
                id: '4NRXx6U8ABQ',
                title: 'The Weeknd - Blinding Lights (Official Video)',
                channel: 'The Weeknd',
                views: '850M views',
                duration: '3:20',
                category: 'The Weeknd',
              },
              {
                id: '34Na4j8AVgA',
                title: 'The Weeknd ft. Daft Punk - Starboy (Official Video)',
                channel: 'The Weeknd',
                views: '2.4B views',
                duration: '3:50',
                category: 'The Weeknd',
              },
              {
                id: 'm8cE-aY_nNk',
                title: 'Dhanda Nyoliwala - Russian Bandana (Official Video)',
                channel: 'Dhanda Nyoliwala',
                views: '45M views',
                duration: '2:48',
                category: 'Dhanda Nyoliwala',
              },
              {
                id: '1uRzE19p_78',
                title: 'Dhanda Nyoliwala - Raat Ki Rani (Official Video)',
                channel: 'Dhanda Nyoliwala',
                views: '30M views',
                duration: '3:15',
                category: 'Dhanda Nyoliwala',
              },
              {
                id: 'vLnPwxZdW4Y',
                title: 'C++ Full Course for Beginners - Complete Systems Guide',
                channel: 'freeCodeCamp.org',
                views: '5.2M views',
                duration: '4:01:20',
                category: 'Coding',
              },
              {
                id: 'XGsS3_3sY-k',
                title: 'CS50 2026 - Lecture 0 - Computational Problem Solving',
                channel: 'CS50',
                views: '3.1M views',
                duration: '2:15:30',
                category: 'Coding',
              },
            ];

            const categories = ['All', 'Karan Aujla', 'Diljit Dosanjh', 'The Weeknd', 'Dhanda Nyoliwala', 'Coding'];

            const handleYtSearchSubmit = (e: React.FormEvent) => {
              e.preventDefault();
              const q = ytSearchInput.trim();
              if (!q) return;

              // Check if URL or video ID
              let videoId = '';
              if (q.includes('watch?v=')) {
                videoId = q.split('watch?v=')[1].split('&')[0];
              } else if (q.includes('youtu.be/')) {
                videoId = q.split('youtu.be/')[1].split('?')[0];
              } else if (q.includes('embed/')) {
                videoId = q.split('embed/')[1].split('?')[0];
              } else if (/^[a-zA-Z0-9_-]{11}$/.test(q)) {
                videoId = q;
              }

              if (videoId) {
                setSelectedYtVideoId(videoId);
                setSelectedYtTitle(`YouTube Video (${videoId})`);
                setSelectedYtChannel('YouTube Stream');
                setYtSearchInput('');
              }
            };

            const filteredVideos = youtubeVideos.filter((v) => {
              const matchesCat = ytCategory === 'All' || v.category === ytCategory;
              const matchesSearch =
                !ytSearchInput.trim() ||
                v.title.toLowerCase().includes(ytSearchInput.toLowerCase()) ||
                v.channel.toLowerCase().includes(ytSearchInput.toLowerCase());
              return matchesCat && matchesSearch;
            });

            return (
              <div className="p-4 md:p-6 max-w-5xl mx-auto w-full space-y-5">
                {/* YouTube Top Bar */}
                <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-white font-bold text-lg tracking-tight">
                      <div className="w-9 h-7 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-md">
                        <FaPlay size={10} className="ml-0.5" />
                      </div>
                      <span>YouTube</span>
                      <span className="text-[10px] text-gray-400 font-normal">IN</span>
                    </div>
                  </div>

                  {/* YouTube Search Bar */}
                  <form onSubmit={handleYtSearchSubmit} className="flex-1 max-w-lg w-full flex items-center">
                    <div className="relative flex-1 flex items-center bg-[#1f1f1f] border border-white/10 rounded-l-full px-4 py-2 focus-within:border-blue-500 transition-all">
                      <FaSearch className="text-gray-400 mr-2 text-xs" />
                      <input
                        type="text"
                        value={ytSearchInput}
                        onChange={(e) => setYtSearchInput(e.target.value)}
                        placeholder="Search video title or paste YouTube link..."
                        className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                      {ytSearchInput && (
                        <button
                          type="button"
                          onClick={() => setYtSearchInput('')}
                          className="text-gray-400 hover:text-white"
                        >
                          <FaTimes size={11} />
                        </button>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] border-y border-r border-white/10 rounded-r-full text-xs text-gray-200 transition-colors cursor-pointer"
                      title="Search"
                    >
                      <FaSearch size={12} />
                    </button>
                  </form>

                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ytSearchInput || 'Karan Aujla')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-full shadow-md transition-all flex-shrink-0 cursor-pointer"
                  >
                    <span>Open YouTube.com</span>
                    <FaExternalLinkAlt size={9} />
                  </a>
                </div>

                {/* Embedded Active Video Player */}
                <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedYtVideoId}?autoplay=1&rel=0&modestbranding=1`}
                      title={selectedYtTitle}
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>

                  {/* Video Details & Interaction Row */}
                  <div className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10 bg-[#161616]">
                    <div>
                      <h2 className="text-base md:text-lg font-bold text-white tracking-tight">{selectedYtTitle}</h2>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        <span className="font-semibold text-gray-200 flex items-center gap-1">
                          {selectedYtChannel}
                          <FaCheckCircle size={10} className="text-gray-400" />
                        </span>
                        <span>&bull;</span>
                        <span className="text-green-400">Playing in macOS Chrome</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={`https://www.youtube.com/watch?v=${selectedYtVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <FaExternalLinkAlt size={10} />
                        <span>Watch on App</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Categories Row */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => {
                    const isSelected = ytCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setYtCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white text-black shadow-md'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Video Grid Feed */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Recommended Videos ({filteredVideos.length}) &bull; Click to Play
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {filteredVideos.map((vid) => {
                      const isPlaying = selectedYtVideoId === vid.id;
                      return (
                        <div
                          key={vid.id}
                          onClick={() => {
                            setSelectedYtVideoId(vid.id);
                            setSelectedYtTitle(vid.title);
                            setSelectedYtChannel(vid.channel);
                          }}
                          className={`bg-[#181818] rounded-xl border overflow-hidden cursor-pointer group transition-all hover:border-white/30 flex flex-col justify-between ${
                            isPlaying ? 'border-red-500 ring-2 ring-red-500/50' : 'border-white/5'
                          }`}
                        >
                          <div className="relative aspect-video bg-black/60 overflow-hidden">
                            <img
                              src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                              alt={vid.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                              {vid.duration}
                            </span>
                            {isPlaying && (
                              <div className="absolute inset-0 bg-red-600/30 flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-[1px]">
                                <FaPlay size={12} className="animate-pulse" />
                                <span>NOW PLAYING</span>
                              </div>
                            )}
                          </div>

                          <div className="p-3 space-y-1">
                            <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                              {vid.title}
                            </h4>
                            <p className="text-[11px] text-gray-400 flex items-center gap-1">
                              {vid.channel}
                              <FaCheckCircle size={9} className="text-gray-500" />
                            </p>
                            <p className="text-[10px] text-gray-500">{vid.views}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TAB 4: LEETCODE / DSA TRACKER */}
          {activeTab.type === 'leetcode' && (() => {
            const totalSolved = leetcodeProblems.length;
            const easyCount = leetcodeProblems.filter((p) => p.difficulty === 'Easy').length;
            const mediumCount = leetcodeProblems.filter((p) => p.difficulty === 'Medium').length;
            const hardCount = leetcodeProblems.filter((p) => p.difficulty === 'Hard').length;

            const filteredLeetcode = leetcodeProblems.filter((p) => {
              const matchesDiff = leetcodeFilter === 'All' || p.difficulty === leetcodeFilter;
              const matchesCat = leetcodeCategory === 'All' || p.category === leetcodeCategory;
              const matchesSearch =
                !leetcodeSearch.trim() ||
                p.title.toLowerCase().includes(leetcodeSearch.toLowerCase()) ||
                p.id.toString().includes(leetcodeSearch.trim());
              return matchesDiff && matchesCat && matchesSearch;
            });

            const categories = ['All', ...Array.from(new Set(leetcodeProblems.map((p) => p.category)))];

            return (
              <div className="p-4 md:p-6 max-w-4xl mx-auto w-full space-y-6">
                {/* LeetCode Header Banner */}
                <div className="bg-[#282828] border border-white/10 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-13 h-13 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-2xl border border-amber-500/30 shadow-inner">
                      LC
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-white">Rudra Pratap's LeetCode Profile</h2>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 font-semibold border border-green-500/30 flex items-center gap-1">
                          <FaCheckCircle size={9} />
                          <span>57 Accepted</span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 mt-0.5">
                        Algorithms, Data Structures & Systems Programming in C++ & Python
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://leetcode.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#ffa116] hover:bg-[#e69113] text-black font-bold text-xs rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Open LeetCode.com</span>
                    <FaExternalLinkAlt size={10} />
                  </a>
                </div>

                {/* Difficulty Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-[#282828] p-4 rounded-xl border border-white/10 text-center">
                    <span className="text-xs text-gray-400 font-medium">Total Solved</span>
                    <p className="text-2xl md:text-3xl font-extrabold text-white mt-1">{totalSolved}</p>
                    <p className="text-[10px] text-green-400 mt-0.5 font-medium">100% Verified Submissions</p>
                  </div>
                  <div className="bg-[#282828] p-4 rounded-xl border border-green-500/20 text-center">
                    <span className="text-xs text-green-400 font-bold">Easy</span>
                    <p className="text-2xl md:text-3xl font-extrabold text-white mt-1">{easyCount}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Hash Tables, Linked Lists</p>
                  </div>
                  <div className="bg-[#282828] p-4 rounded-xl border border-amber-500/20 text-center">
                    <span className="text-xs text-amber-400 font-bold">Medium</span>
                    <p className="text-2xl md:text-3xl font-extrabold text-white mt-1">{mediumCount}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Binary Search, Stacks, DP</p>
                  </div>
                  <div className="bg-[#282828] p-4 rounded-xl border border-red-500/20 text-center">
                    <span className="text-xs text-red-400 font-bold">Hard</span>
                    <p className="text-2xl md:text-3xl font-extrabold text-white mt-1">{hardCount}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">k-Group, Window Substring</p>
                  </div>
                </div>

                {/* Search & Filter Controls */}
                <div className="bg-[#282828] p-4 rounded-xl border border-white/10 space-y-3">
                  <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative flex-1">
                      <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                      <input
                        type="text"
                        value={leetcodeSearch}
                        onChange={(e) => setLeetcodeSearch(e.target.value)}
                        placeholder="Search by problem name or number (e.g. 875, Bananas, Subarray)..."
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/70"
                      />
                      {leetcodeSearch && (
                        <button
                          onClick={() => setLeetcodeSearch('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          <FaTimes size={10} />
                        </button>
                      )}
                    </div>

                    {/* Difficulty Pills */}
                    <div className="flex items-center gap-1.5 bg-[#1e1e1e] p-1 rounded-lg border border-white/5">
                      {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => {
                        const count =
                          diff === 'All'
                            ? totalSolved
                            : diff === 'Easy'
                            ? easyCount
                            : diff === 'Medium'
                            ? mediumCount
                            : hardCount;
                        const isSelected = leetcodeFilter === diff;
                        return (
                          <button
                            key={diff}
                            onClick={() => setLeetcodeFilter(diff)}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? diff === 'Easy'
                                  ? 'bg-green-600 text-white shadow-sm'
                                  : diff === 'Medium'
                                  ? 'bg-amber-600 text-white shadow-sm'
                                  : diff === 'Hard'
                                  ? 'bg-red-600 text-white shadow-sm'
                                  : 'bg-white/20 text-white shadow-sm'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {diff} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
                    <span className="text-[11px] text-gray-400 font-semibold mr-1 flex items-center gap-1 flex-shrink-0">
                      Topic:
                    </span>
                    {categories.map((cat) => {
                      const isCatSelected = leetcodeCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setLeetcodeCategory(cat)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                            isCatSelected
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Problems Solved List */}
                <div className="bg-[#282828] rounded-xl border border-white/10 overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between p-3.5 bg-[#202020] border-b border-white/10 text-xs text-gray-400 font-semibold">
                    <span>Showing {filteredLeetcode.length} of {totalSolved} solved problems</span>
                    <span className="text-gray-500 text-[11px]">Sorted by submission date</span>
                  </div>

                  <div className="divide-y divide-white/5 max-h-[460px] overflow-y-auto scrollbar-thin">
                    {filteredLeetcode.length === 0 ? (
                      <div className="p-8 text-center text-xs text-gray-400">
                        No problems match your current filter.
                      </div>
                    ) : (
                      filteredLeetcode.map((prob) => {
                        return (
                          <div
                            key={prob.id}
                            className="p-3 md:p-3.5 flex items-center justify-between hover:bg-white/5 transition-colors gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="text-xs text-gray-500 font-mono w-10 flex-shrink-0">
                                #{prob.id}
                              </span>

                              <div className="min-w-0">
                                <a
                                  href={prob.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs md:text-sm font-semibold text-white hover:text-amber-400 transition-colors truncate block flex items-center gap-1.5"
                                >
                                  <span>{prob.title}</span>
                                  <FaExternalLinkAlt size={10} className="opacity-40 group-hover:opacity-100 flex-shrink-0" />
                                </a>
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px]">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      prob.difficulty === 'Easy'
                                        ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                                        : prob.difficulty === 'Medium'
                                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                        : 'bg-red-500/15 text-red-400 border border-red-500/30'
                                    }`}
                                  >
                                    {prob.difficulty}
                                  </span>
                                  <span className="text-gray-400 bg-white/5 px-2 py-0.5 rounded text-[10px]">
                                    {prob.category}
                                  </span>
                                  <span className="text-gray-500">&bull;</span>
                                  <span className="text-gray-400 text-[10px]">Solved {prob.date}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-[11px] font-semibold border border-green-500/20">
                                <FaCheckCircle size={10} />
                                <span>Accepted</span>
                              </span>
                              <span className="text-[11px] text-gray-500 hidden md:inline">
                                {prob.attempts} {prob.attempts === 1 ? 'try' : 'tries'}
                              </span>
                              <a
                                href={prob.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded bg-[#ffa116]/10 hover:bg-[#ffa116] text-[#ffa116] hover:text-black text-xs font-semibold transition-all border border-[#ffa116]/30"
                              >
                                View
                              </a>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TAB 5: GENERIC WEB URL */}
          {activeTab.type === 'web' && (
            <div className="flex-1 flex flex-col h-full">
              <div className="bg-[#2d2e31] px-4 py-2 flex items-center justify-between text-xs text-gray-300 border-b border-black/30">
                <div className="flex items-center gap-2">
                  <BsGlobe size={12} className="text-blue-400" />
                  <span className="truncate max-w-md">{activeTab.url}</span>
                </div>
                <a
                  href={activeTab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline"
                >
                  <span>Open in browser</span>
                  <FaExternalLinkAlt size={9} />
                </a>
              </div>
              <div className="flex-1 relative">
                <iframe
                  src={activeTab.url}
                  className="w-full h-full border-none bg-white"
                  title={activeTab.title}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </DraggableWindow>
  );
}

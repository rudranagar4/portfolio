import { useState, useEffect } from 'react';
import DraggableWindow from './DraggableWindow';
import {
  FaLinkedin,
  FaSearch,
  FaHome,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
  FaGraduationCap,
  FaCertificate,
  FaCode,
  FaThumbsUp,
  FaRegThumbsUp,
  FaRegCommentDots,
  FaShareSquare,
  FaPaperPlane,
  FaTimes,
  FaExpand,
  FaAward,
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { userConfig } from '../../config/index';
import { linkedinPosts, type LinkedInPost } from '../../config/linkedinPosts';

interface LinkedInAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LinkedInApp({ isOpen, onClose }: LinkedInAppProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'profile' | 'certifications'>('posts');
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    const initial: Record<string, { count: number; liked: boolean }> = {};
    linkedinPosts.forEach((p) => {
      initial[p.id] = { count: p.initialLikes, liked: false };
    });
    return initial;
  });

  const [commentsState, setCommentsState] = useState<Record<string, string[]>>({});
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [selectedCertImage, setSelectedCertImage] = useState<{ url: string; title: string; issuer: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleToggleLike = (postId: string) => {
    setLikesState((prev) => {
      const current = prev[postId] || { count: 0, liked: false };
      return {
        ...prev,
        [postId]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      };
    });
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setCommentsState((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), commentInput.trim()],
    }));
    setCommentInput('');
    showToast('Comment posted!');
  };

  return (
    <DraggableWindow
      title="LinkedIn ⸺ Rudra Pratap Nagar"
      onClose={onClose}
      initialPosition={{ x: posX, y: posY }}
      className="w-[95%] max-w-4xl shadow-2xl"
      initialSize={{ width, height }}
    >
      <div className="flex flex-col h-full bg-[#1b1f23] text-gray-200 select-none relative">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-[#0a66c2] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-2xl animate-fade-in border border-white/20">
            {toastMessage}
          </div>
        )}

        {/* LinkedIn Top Navigation Bar */}
        <div className="flex items-center justify-between px-3 md:px-5 py-2 bg-[#283038] border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <FaLinkedin size={28} className="text-[#0a66c2]" />
            <div className="relative flex items-center bg-[#1b1f23] rounded-md px-3 py-1.5 border border-white/10 w-44 md:w-72">
              <FaSearch size={12} className="text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search certificates, posts, skills..."
                className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-gray-500"
                readOnly
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-3 md:gap-4 text-xs text-gray-300">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex flex-col items-center transition-colors cursor-pointer ${
                activeTab === 'posts' ? 'text-white border-b-2 border-white pb-0.5' : 'hover:text-white text-gray-400'
              }`}
            >
              <FaHome size={15} />
              <span className="text-[10px] mt-0.5 font-medium">Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('certifications')}
              className={`flex flex-col items-center transition-colors cursor-pointer ${
                activeTab === 'certifications' ? 'text-white border-b-2 border-white pb-0.5' : 'hover:text-white text-gray-400'
              }`}
            >
              <FaAward size={15} className="text-amber-400" />
              <span className="text-[10px] mt-0.5 font-medium">Certs (8)</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center transition-colors cursor-pointer ${
                activeTab === 'profile' ? 'text-white border-b-2 border-white pb-0.5' : 'hover:text-white text-gray-400'
              }`}
            >
              <img
                src="/linkedin-pfp.jpg"
                alt="Me"
                className="w-4 h-4 rounded-full object-cover border border-white/20"
              />
              <span className="text-[10px] mt-0.5 font-medium">Me</span>
            </button>

            <div className="h-5 w-px bg-white/10 hidden sm:block" />

            <a
              href={userConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-sm"
              title="Open profile on LinkedIn.com"
            >
              <span>View Live</span>
              <FaExternalLinkAlt size={9} />
            </a>
          </div>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#21262d] border-b border-white/5 overflow-x-auto scrollbar-none flex-shrink-0">
          <span className="text-[11px] text-gray-400 font-semibold mr-1">View:</span>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'posts'
                ? 'bg-[#0a66c2] text-white shadow-md'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <span>Activity & Certificate Posts (8)</span>
          </button>

          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'certifications'
                ? 'bg-[#0a66c2] text-white shadow-md'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <FaCertificate size={11} className="text-amber-400" />
            <span>Licenses & Certifications</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-[#0a66c2] text-white shadow-md'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <span>Full Profile & About</span>
          </button>
        </div>

        {/* LinkedIn Profile Feed Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 scrollbar-thin">
          {/* Profile Summary Card (Always Visible on Top) */}
          <div className="bg-[#242c34] rounded-xl border border-white/10 overflow-hidden shadow-lg">
            {/* Cover Banner */}
            <div className="h-28 sm:h-36 md:h-44 relative overflow-hidden bg-[#0a1120] w-full">
              <img
                src="/linkedin-banner.jpg"
                alt="Rudra Pratap Nagar LinkedIn Banner"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2.5 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-gray-200 font-medium border border-white/15 flex items-center gap-1.5 shadow-md">
                <FaGraduationCap className="text-[#70b5f9]" size={12} />
                <span>NIET CSE (Data Science) '29</span>
              </div>
            </div>

            {/* Profile Info Row */}
            <div className="px-5 pb-5 relative">
              {/* Profile Avatar & Actions */}
              <div className="-mt-12 md:-mt-16 mb-2.5 flex items-end justify-between">
                <div className="relative">
                  <img
                    src="/linkedin-pfp.jpg"
                    alt="Rudra Pratap Nagar"
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-[#242c34] object-cover bg-black shadow-xl"
                  />
                  <span
                    className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#242c34]"
                    title="Active Now"
                  />
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${userConfig.contact.email}`}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0a66c2] hover:bg-[#004182] text-white transition-colors"
                  >
                    Message
                  </a>
                  <a
                    href={userConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-[#0a66c2] text-[#70b5f9] hover:bg-[#0a66c2]/10 transition-colors"
                  >
                    Connect
                  </a>
                </div>
              </div>

              {/* Names and Title */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{userConfig.name}</h1>
                  <FaCheckCircle className="text-[#70b5f9]" size={15} title="Verified Profile" />
                </div>
                <p className="text-xs md:text-sm text-gray-200 font-medium max-w-2xl leading-snug">
                  Computer Science (Data Science) Student at NIET | C++, Python, Linux Systems, Wi-Fi CSI Sensing
                </p>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-gray-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <FaMapMarkerAlt size={11} className="text-gray-400" />
                    {userConfig.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaEnvelope size={11} className="text-gray-400" />
                    {userConfig.contact.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaPhoneAlt size={10} className="text-gray-400" />
                    {userConfig.contact.phone}
                  </span>
                  <a
                    href={userConfig.social.leetcode || 'https://leetcode.com/u/Vlx3f7mVBz/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-gray-400 hover:text-[#ffa116] transition-colors"
                    title="View LeetCode Profile"
                  >
                    <SiLeetcode size={11} className="text-[#ffa116]" />
                    <span>LeetCode</span>
                  </a>
                </div>
                <div className="pt-1.5 flex items-center gap-2 text-xs font-semibold text-[#70b5f9]">
                  <span>500+ connections</span>
                  <span>&bull;</span>
                  <span className="text-green-400 font-medium">8 Verified Certificates & Hackathons</span>
                </div>
              </div>
            </div>
          </div>

          {/* TAB: ACTIVITY & CERTIFICATE POSTS (The main attraction!) */}
          {(activeTab === 'posts' || activeTab === 'certifications') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FaAward className="text-amber-400" size={15} />
                  <span>Verified Certificates & Activity Feed ({linkedinPosts.length})</span>
                </h2>
                <span className="text-xs text-gray-400">Random order with authentic reflections</span>
              </div>

              {/* Posts Feed */}
              {linkedinPosts.map((post) => {
                const postLikes = likesState[post.id] || { count: post.initialLikes, liked: false };
                const extraComments = commentsState[post.id] || [];
                const isCommentBoxOpen = activeCommentPostId === post.id;

                return (
                  <article
                    key={post.id}
                    className="bg-[#242c34] rounded-xl border border-white/10 overflow-hidden shadow-lg hover:border-white/20 transition-all"
                  >
                    {/* Post Header */}
                    <div className="p-4 pb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="/linkedin-pfp.jpg"
                          alt="Rudra Pratap Nagar"
                          className="w-11 h-11 rounded-full object-cover border border-white/10 bg-black flex-shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-white hover:underline cursor-pointer">
                              {userConfig.name}
                            </span>
                            <span className="text-xs text-gray-400">&bull; 1st</span>
                          </div>
                          <p className="text-[11px] text-gray-400 leading-tight">
                            B.Tech CSE (Data Science) @ NIET
                          </p>
                          <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
                            <span>{post.relativeTime}</span>
                          </div>
                        </div>
                      </div>

                      {post.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0a66c2]/20 text-[#70b5f9] border border-[#0a66c2]/40 flex-shrink-0">
                          {post.badge}
                        </span>
                      )}
                    </div>

                    {/* Post Content / Caption */}
                    <div className="px-4 pb-3 text-xs md:text-sm text-gray-200 leading-relaxed whitespace-pre-line font-normal select-text">
                      {post.caption}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {post.hashtags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[#70b5f9] hover:underline cursor-pointer font-medium text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certificate Image Preview */}
                    <div
                      onClick={() =>
                        setSelectedCertImage({
                          url: post.imageUrl,
                          title: post.title,
                          issuer: post.issuer,
                        })
                      }
                      className="relative bg-black/60 group cursor-pointer overflow-hidden border-y border-white/10 flex items-center justify-center max-h-[380px]"
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-auto max-h-[380px] object-contain transition-transform duration-200 group-hover:scale-[1.01]"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-[2px]">
                        <FaExpand size={14} />
                        <span>Click to expand full certificate</span>
                      </div>
                    </div>

                    {/* Social Stats Row */}
                    <div className="px-4 py-2 flex items-center justify-between text-[11px] text-gray-400 border-b border-white/5">
                      <div className="flex items-center gap-1.5">
                        <span className="flex items-center -space-x-1">
                          <span className="w-4 h-4 rounded-full bg-[#0a66c2] flex items-center justify-center text-[9px] text-white">
                            👍
                          </span>
                          <span className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center text-[9px] text-white">
                            👏
                          </span>
                          <span className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[9px] text-white">
                            ❤️
                          </span>
                        </span>
                        <span>{postLikes.count}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span>{post.initialComments + extraComments.length} comments</span>
                        <span>&bull;</span>
                        <span>{Math.floor(postLikes.count / 7)} reposts</span>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="px-2 py-1 flex items-center justify-around text-xs text-gray-300 font-medium">
                      <button
                        onClick={() => handleToggleLike(post.id)}
                        className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex-1 justify-center ${
                          postLikes.liked ? 'text-[#70b5f9] font-bold' : ''
                        }`}
                      >
                        {postLikes.liked ? <FaThumbsUp size={14} /> : <FaRegThumbsUp size={14} />}
                        <span>{postLikes.liked ? 'Liked' : 'Like'}</span>
                      </button>

                      <button
                        onClick={() =>
                          setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                        }
                        className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex-1 justify-center"
                      >
                        <FaRegCommentDots size={14} />
                        <span>Comment</span>
                      </button>

                      <button
                        onClick={() => showToast('Post reposted to your network!')}
                        className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex-1 justify-center"
                      >
                        <FaShareSquare size={14} />
                        <span>Repost</span>
                      </button>

                      <button
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(window.location.href);
                            showToast('Link copied to clipboard!');
                          }
                        }}
                        className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex-1 justify-center"
                      >
                        <FaPaperPlane size={13} />
                        <span>Send</span>
                      </button>
                    </div>

                    {/* Inline Comment Box */}
                    {isCommentBoxOpen && (
                      <div className="p-3 bg-[#1e2329] border-t border-white/5 space-y-2">
                        <form onSubmit={(e) => handleAddComment(post.id, e)} className="flex items-center gap-2">
                          <img
                            src="/linkedin-pfp.jpg"
                            alt="You"
                            className="w-7 h-7 rounded-full object-cover border border-white/10 flex-shrink-0"
                          />
                          <input
                            type="text"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="Add a congratulatory comment..."
                            className="flex-1 bg-[#14171a] border border-white/10 rounded-full px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#0a66c2]"
                            autoFocus
                          />
                          <button
                            type="submit"
                            className="px-3.5 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold cursor-pointer"
                          >
                            Post
                          </button>
                        </form>

                        {extraComments.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            {extraComments.map((c, i) => (
                              <div key={i} className="text-xs bg-[#242c34] p-2 rounded-lg text-gray-200 flex items-start gap-2">
                                <img
                                  src="/linkedin-pfp.jpg"
                                  alt="You"
                                  className="w-5 h-5 rounded-full object-cover border border-white/10 mt-0.5 flex-shrink-0"
                                />
                                <div>
                                  <span className="font-semibold text-white">You: </span>
                                  <span>{c}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {/* TAB: LICENSES & CERTIFICATIONS LIST */}
          {(activeTab === 'certifications' || activeTab === 'profile') && (
            <div className="bg-[#242c34] rounded-xl border border-white/10 p-5 md:p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FaCertificate size={16} className="text-[#70b5f9]" />
                  <span>Licenses & Certifications (8)</span>
                </h2>
                <span className="text-xs text-gray-400">All credentials verified</span>
              </div>

              <div className="space-y-3.5 divide-y divide-white/5">
                {userConfig.courses.map((cert) => (
                  <div key={cert.title} className="pt-3.5 first:pt-0 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        onClick={() => {
                          const img = cert.images?.[0]?.url;
                          if (img) {
                            setSelectedCertImage({
                              url: img,
                              title: cert.title,
                              issuer: cert.institution,
                            });
                          }
                        }}
                        className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center flex-shrink-0 cursor-pointer overflow-hidden group relative"
                        title="View Certificate"
                      >
                        {cert.images?.[0]?.url ? (
                          <img
                            src={cert.images[0].url}
                            alt={cert.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        ) : (
                          <FaCertificate size={18} className="text-[#70b5f9]" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white leading-tight">{cert.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {cert.institution} &bull; Issued {cert.year}
                        </p>
                        <p className="text-xs text-gray-300 mt-1 leading-snug">{cert.description}</p>
                      </div>
                    </div>

                    {cert.images?.[0]?.url && (
                      <button
                        onClick={() =>
                          setSelectedCertImage({
                            url: cert.images![0].url,
                            title: cert.title,
                            issuer: cert.institution,
                          })
                        }
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/15 text-[#70b5f9] border border-white/10 transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                      >
                        <span>Show</span>
                        <FaExternalLinkAlt size={9} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <>
              {/* About Section */}
              <div className="bg-[#242c34] rounded-xl border border-white/10 p-5 md:p-6 shadow-md">
                <h2 className="text-base font-bold text-white mb-2">About</h2>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{userConfig.roleFocus}</p>
              </div>

              {/* Featured Projects Section */}
              <div className="bg-[#242c34] rounded-xl border border-white/10 p-5 md:p-6 shadow-md">
                <h2 className="text-base font-bold text-white mb-3">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {userConfig.projects.slice(0, 4).map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-[#1b1f23] rounded-lg p-3.5 border border-white/5 hover:border-white/15 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <FaCode className="text-[#70b5f9]" size={14} />
                          <h3 className="text-sm font-semibold text-white">{proj.title}</h3>
                        </div>
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white"
                          title="View GitHub repository"
                        >
                          <FaExternalLinkAlt size={11} />
                        </a>
                      </div>
                      <p className="text-xs text-gray-300 mt-1.5 line-clamp-2">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {proj.techStack.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-gray-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-[#242c34] rounded-xl border border-white/10 p-5 md:p-6 shadow-md">
                <h2 className="text-base font-bold text-white mb-3">Education</h2>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-900/40 flex items-center justify-center flex-shrink-0 text-blue-300">
                    <FaGraduationCap size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{userConfig.education[0].institution}</h3>
                    <p className="text-xs text-gray-300 mt-0.5">
                      {userConfig.education[0].degree} in {userConfig.education[0].major}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {userConfig.education[0].year} &bull; {userConfig.education[0].location}
                    </p>
                    <p className="text-xs text-gray-300 mt-1">{userConfig.education[0].description}</p>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="bg-[#242c34] rounded-xl border border-white/10 p-5 md:p-6 shadow-md">
                <h2 className="text-base font-bold text-white mb-3">Skills & Endorsements</h2>
                <div className="flex flex-wrap gap-2">
                  {userConfig.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Certificate Fullscreen Lightbox Modal */}
        {selectedCertImage && (
          <div
            onClick={() => setSelectedCertImage(null)}
            className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#242c34] border border-white/20 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 bg-[#1b1f23] border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedCertImage.title}</h3>
                  <p className="text-xs text-gray-400">{selectedCertImage.issuer}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={selectedCertImage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    title="Open full image in browser"
                  >
                    <FaExternalLinkAlt size={13} />
                  </a>
                  <button
                    onClick={() => setSelectedCertImage(null)}
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    title="Close"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Image Body */}
              <div className="p-4 bg-black/80 flex items-center justify-center overflow-auto flex-1">
                <img
                  src={selectedCertImage.url}
                  alt={selectedCertImage.title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-2.5 bg-[#1b1f23] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>Verified Credential Certificate &bull; Rudra Pratap Nagar</span>
                <button
                  onClick={() => setSelectedCertImage(null)}
                  className="px-4 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DraggableWindow>
  );
}

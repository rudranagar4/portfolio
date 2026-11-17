import { useEffect } from 'react';
import DraggableWindow from './DraggableWindow';
import { FaLinkedin, FaSearch, FaHome, FaUserFriends, FaBriefcase, FaCommentDots, FaBell, FaExternalLinkAlt, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaCheckCircle, FaGraduationCap, FaCertificate, FaCode } from 'react-icons/fa';
import { userConfig } from '../../config/index';

interface LinkedInAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LinkedInApp({ isOpen, onClose }: LinkedInAppProps) {
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
  const width = Math.min(840, Math.max(340, screenW - 40));
  const height = Math.min(600, Math.max(380, screenH - 80));
  const posX = Math.max(10, Math.floor((screenW - width) / 2));
  const posY = Math.max(30, Math.floor((screenH - height) / 2) - 15);

  return (
    <DraggableWindow
      title="LinkedIn ⸺ Rudra Pratap Nagar"
      onClose={onClose}
      initialPosition={{ x: posX, y: posY }}
      className="w-[95%] max-w-4xl shadow-2xl"
      initialSize={{ width, height }}
    >
      <div className="flex flex-col h-full bg-[#1b1f23] text-gray-200 select-none">
        {/* LinkedIn Top Navigation Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#283038] border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <FaLinkedin size={28} className="text-[#0a66c2]" />
            <div className="relative flex items-center bg-[#1b1f23] rounded-md px-3 py-1.5 border border-white/10 w-64 md:w-80">
              <FaSearch size={12} className="text-gray-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search jobs, skills, people..."
                className="w-full bg-transparent text-xs text-white focus:outline-none"
                readOnly
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-4 text-xs text-gray-300">
            <div className="flex flex-col items-center hover:text-white transition-colors cursor-pointer hidden md:flex">
              <FaHome size={16} />
              <span className="text-[10px] mt-0.5">Home</span>
            </div>
            <div className="flex flex-col items-center hover:text-white transition-colors cursor-pointer hidden md:flex">
              <FaUserFriends size={16} />
              <span className="text-[10px] mt-0.5">Network</span>
            </div>
            <div className="flex flex-col items-center hover:text-white transition-colors cursor-pointer hidden md:flex">
              <FaBriefcase size={16} />
              <span className="text-[10px] mt-0.5">Jobs</span>
            </div>
            <div className="flex flex-col items-center hover:text-white transition-colors cursor-pointer hidden md:flex">
              <FaCommentDots size={16} />
              <span className="text-[10px] mt-0.5">Messaging</span>
            </div>
            <div className="flex flex-col items-center hover:text-white transition-colors cursor-pointer hidden md:flex">
              <FaBell size={16} />
              <span className="text-[10px] mt-0.5">Notifications</span>
            </div>
            <div className="h-6 w-px bg-white/10 hidden md:block" />
            <a
              href={userConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <span>Open on LinkedIn</span>
              <FaExternalLinkAlt size={10} />
            </a>
          </div>
        </div>

        {/* LinkedIn Profile Feed Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin">
          {/* Profile Card */}
          <div className="bg-[#242c34] rounded-xl border border-white/10 overflow-hidden shadow-lg">
            {/* Cover Banner */}
            <div className="h-32 md:h-44 bg-gradient-to-r from-blue-900 via-indigo-900 to-cyan-900 relative">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-gray-300 font-medium border border-white/10">
                NIET CSE (Data Science) '29
              </div>
            </div>

            {/* Profile Info Row */}
            <div className="px-6 pb-6 relative">
              {/* Profile Avatar */}
              <div className="-mt-14 md:-mt-18 mb-3 flex items-end justify-between">
                <div className="relative">
                  <img
                    src="/avatar.png"
                    alt="Rudra Pratap Nagar"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#242c34] object-cover bg-black shadow-xl"
                  />
                  <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#242c34]" title="Active Now" />
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${userConfig.contact.email}`}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#0a66c2] hover:bg-[#004182] text-white transition-colors"
                  >
                    Message
                  </a>
                  <a
                    href={userConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full text-xs font-semibold border border-[#0a66c2] text-[#70b5f9] hover:bg-[#0a66c2]/10 transition-colors"
                  >
                    Connect
                  </a>
                </div>
              </div>

              {/* Names and Title */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{userConfig.name}</h1>
                  <FaCheckCircle className="text-[#70b5f9]" size={16} title="Verified Student Profile" />
                </div>
                <p className="text-sm text-gray-200 font-medium max-w-2xl leading-snug">
                  Computer Science (Data Science) Student at NIET | C++, Python, Linux Systems, Wi-Fi CSI Sensing
                </p>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-gray-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <FaMapMarkerAlt size={12} className="text-gray-400" />
                    {userConfig.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaEnvelope size={12} className="text-gray-400" />
                    {userConfig.contact.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaPhoneAlt size={11} className="text-gray-400" />
                    {userConfig.contact.phone}
                  </span>
                </div>
                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#70b5f9]">
                  <span>500+ connections</span>
                  <span>&bull;</span>
                  <span className="text-green-400 font-medium">Open to Software Engineering & Data Science Roles</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-[#242c34] rounded-xl border border-white/10 p-5 md:p-6 shadow-md">
            <h2 className="text-base font-bold text-white mb-2">About</h2>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              {userConfig.roleFocus}
            </p>
          </div>

          {/* Featured Projects Section */}
          <div className="bg-[#242c34] rounded-xl border border-white/10 p-5 md:p-6 shadow-md">
            <h2 className="text-base font-bold text-white mb-3">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {userConfig.projects.slice(0, 4).map((proj) => (
                <div key={proj.id} className="bg-[#1b1f23] rounded-lg p-3.5 border border-white/5 hover:border-white/15 transition-all">
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
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Licenses & Certifications Section */}
          <div className="bg-[#242c34] rounded-xl border border-white/10 p-5 md:p-6 shadow-md">
            <h2 className="text-base font-bold text-white mb-3">Licenses & Certifications</h2>
            <div className="space-y-3">
              {userConfig.courses.map((cert) => (
                <div key={cert.title} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-b-0">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-[#70b5f9]">
                    <FaCertificate size={16} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white leading-tight">{cert.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{cert.institution} &bull; Issued {cert.year}</p>
                    <p className="text-xs text-gray-300 mt-1">{cert.description}</p>
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
                <p className="text-xs text-gray-300 mt-0.5">{userConfig.education[0].degree} in {userConfig.education[0].major}</p>
                <p className="text-xs text-gray-400 mt-0.5">{userConfig.education[0].year} &bull; {userConfig.education[0].location}</p>
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
        </div>
      </div>
    </DraggableWindow>
  );
}


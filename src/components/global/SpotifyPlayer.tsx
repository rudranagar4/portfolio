import { useState, useEffect } from 'react';
import DraggableWindow from './DraggableWindow';
import { FaSpotify, FaMusic } from 'react-icons/fa';

interface SpotifyPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  playlistId?: string;
}

type Song = {
  id: string;
  title: string;
  artist: string;
  category: string;
  spotifyId: string;
};

const SONGS: Song[] = [
  // Karan Aujla
  { id: '80-degrees', title: '80 Degrees', artist: 'Karan Aujla, Tru-Skool, Amaal Nuux', category: 'Karan Aujla', spotifyId: '44Js4AnciUnHdDyBXC7sNw' },
  { id: 'real-bad-man', title: 'Real Bad Man', artist: 'Karan Aujla', category: 'Karan Aujla', spotifyId: '7gx9kUZiakNPhgCsJejw7A' },
  { id: 'winning-speech', title: 'Winning Speech', artist: 'Karan Aujla, Mxrci', category: 'Karan Aujla', spotifyId: '3FqtduiaqnFYvBgKuc6QWQ' },
  { id: 'softly', title: 'Softly', artist: 'Karan Aujla, Ikky', category: 'Karan Aujla', spotifyId: '0YQJoDL6f46J0n1rOVkpxJ' },
  { id: 'admirin-you', title: "Admirin' You", artist: 'Karan Aujla, Ikky, Preston Pablo', category: 'Karan Aujla', spotifyId: '6ygiy70ujkNOYXM1tQuMNe' },
  { id: '52-bars', title: '52 Bars', artist: 'Karan Aujla, Ikky', category: 'Karan Aujla', spotifyId: '7981a0fWmY1Uj6cT1jhp52' },

  // Seedhe Maut / DHH
  { id: 'raat-ki-rani', title: 'Raat Ki Rani', artist: 'Seedhe Maut', category: 'Seedhe Maut / DHH', spotifyId: '1alInstEk6TQMuPyjCgI4K' },
  { id: 'kodak', title: 'KODAK', artist: 'Seedhe Maut, King', category: 'Seedhe Maut / DHH', spotifyId: '1p2gLYTKWepMg5zA782o2T' },
  { id: 'tathastu', title: 'Asal G (Tathastu)', artist: 'Seedhe Maut', category: 'Seedhe Maut / DHH', spotifyId: '4WKsXhtgLA6zbJ6HWfHUWq' },
  { id: 'farebi', title: 'Farebi', artist: 'Chaar Diwaari, Raftaar', category: 'Seedhe Maut / DHH', spotifyId: '1Jsos1mzwTwYGOndYN5h8V' },
  { id: 'khatta-flow', title: 'Khatta Flow', artist: 'Seedhe Maut, KR$NA', category: 'Seedhe Maut / DHH', spotifyId: '5gOnY5HODxz1b28te8eSAF' },
  { id: 'namastute', title: 'Namastute', artist: 'Seedhe Maut', category: 'Seedhe Maut / DHH', spotifyId: '1KHeGktpWHHKl8RVygYg3X' },

  // Diljit Dosanjh
  { id: 'lover', title: 'Lover', artist: 'Diljit Dosanjh', category: 'Diljit Dosanjh', spotifyId: '0XwRlvv3KlOu4HWlOH34XG' },
  { id: 'born-to-shine', title: 'Born to Shine', artist: 'Diljit Dosanjh', category: 'Diljit Dosanjh', spotifyId: '4XxfOvudrnBRdlgzEaq1sd' },
  { id: 'goat', title: 'G.O.A.T.', artist: 'Diljit Dosanjh', category: 'Diljit Dosanjh', spotifyId: '46QbY78ha62aiu6gBgC7lS' },
  { id: 'lalkara', title: 'Lalkara', artist: 'Diljit Dosanjh, Intense, Sultaan', category: 'Diljit Dosanjh', spotifyId: '2oenSXLDbWVaaL7QjSGYj5' },

  // Dhanda Nyoliwala
  { id: 'maruti', title: 'Maruti', artist: 'Dhanda Nyoliwala', category: 'Dhanda Nyoliwala', spotifyId: '4EellE2v4gDuZaHVIMiZKO' },
  { id: 'russian-bandana', title: 'Russian Bandana', artist: 'Dhanda Nyoliwala', category: 'Dhanda Nyoliwala', spotifyId: '1dFrZr9eMUsFqeag04ClqD' },
  { id: 'chora-baba-ka', title: 'Chora Baba Ka', artist: 'Raftaar, Dhanda Nyoliwala', category: 'Dhanda Nyoliwala', spotifyId: '3fz747rKjbEa6mtclKacjf' },

  // The Weeknd & Global
  { id: 'fein', title: 'FE!N', artist: 'Travis Scott feat. Playboi Carti', category: 'Global & Hip Hop', spotifyId: '42VsgItocQwOQC3XWZ8JNA' },
  { id: 'blinding-lights', title: 'Blinding Lights', artist: 'The Weeknd', category: 'Global & Hip Hop', spotifyId: '0VjIjW4GlUZAMYd2vXMi3b' },
  { id: 'starboy', title: 'Starboy', artist: 'The Weeknd, Daft Punk', category: 'Global & Hip Hop', spotifyId: '7MXVkk9YMctZqd1Srtv4MB' },

  // Bangers & Classics
  { id: 'tamanche-pe-disco', title: 'Tamanche Pe Disco', artist: 'Bullett Raja / Nindy Kaur, Raftaar, RDB', category: 'Bangers & Classics', spotifyId: '4O2pDrAMW6rOszMsbA2NRb' },
  { id: 'brown-rang', title: 'Brown Rang', artist: 'Yo Yo Honey Singh', category: 'Bangers & Classics', spotifyId: '3yRLROmAcKJBqTrdEczFB8' },
  { id: 'baarish-ban-jaana', title: 'Baarish Ban Jaana', artist: 'Payal Dev, Stebin Ben', category: 'Bangers & Classics', spotifyId: '3sFlG5sYt712TtjvWM8Ocb' },
];

const CATEGORIES = [
  'All',
  'Karan Aujla',
  'Seedhe Maut / DHH',
  'Diljit Dosanjh',
  'Dhanda Nyoliwala',
  'Global & Hip Hop',
  'Bangers & Classics',
];

export default function SpotifyPlayer({ isOpen, onClose }: SpotifyPlayerProps) {
  const [selectedSong, setSelectedSong] = useState<Song>(SONGS[0]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

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

  const filteredSongs = activeCategoryFilter === 'All'
    ? SONGS
    : SONGS.filter((song) => song.category === activeCategoryFilter);

  return (
    <DraggableWindow
      title={`Spotify ⸺ ${selectedSong.artist} - ${selectedSong.title}`}
      onClose={onClose}
      initialPosition={{
        x: Math.floor(window.innerWidth * 0.25),
        y: Math.floor(window.innerHeight * 0.12),
      }}
      className="w-[95%] max-w-xl transition-all duration-300 shadow-2xl"
      initialSize={{ width: 520, height: 560 }}
    >
      <div className="flex flex-col h-full bg-[#121212] text-white">
        {/* Header Bar */}
        <div className="p-3 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <FaSpotify size={20} className="text-[#1ED760]" />
            <span className="text-sm font-semibold tracking-wide">Rudra's Heavy Rotation</span>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1.5 truncate max-w-[200px]">
            <FaMusic size={12} className="text-[#1ED760] flex-shrink-0" />
            <span className="truncate">{selectedSong.title}</span>
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="p-2.5 px-3 flex gap-1.5 overflow-x-auto bg-[#181818] border-b border-white/5 scrollbar-thin">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeCategoryFilter === cat
                  ? 'bg-[#1ED760] text-black font-semibold shadow-md'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Embedded Player */}
        <div className="p-3 flex-shrink-0">
          <iframe
            key={selectedSong.spotifyId}
            src={`https://open.spotify.com/embed/track/${selectedSong.spotifyId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl border-0 shadow-lg"
            title={`${selectedSong.title} by ${selectedSong.artist}`}
            aria-label={`${selectedSong.title} by ${selectedSong.artist}`}
          />
        </div>

        {/* Quick Track Switcher List */}
        <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1.5">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-1 pt-1">
            Tracks ({filteredSongs.length})
          </p>
          <div className="space-y-1">
            {filteredSongs.map((song) => {
              const isCurrent = song.id === selectedSong.id;
              return (
                <button
                  key={song.id}
                  onClick={() => setSelectedSong(song)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-[#1ED760]/20 border border-[#1ED760]/40 text-white'
                      : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                        isCurrent ? 'bg-[#1ED760] text-black' : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      <FaMusic size={11} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-medium truncate ${isCurrent ? 'text-[#1ED760]' : 'text-white'}`}>
                        {song.title}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">{song.artist}</p>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] font-semibold text-[#1ED760] px-2 py-0.5 bg-[#1ED760]/10 rounded-full flex-shrink-0">
                      Playing
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </DraggableWindow>
  );
}

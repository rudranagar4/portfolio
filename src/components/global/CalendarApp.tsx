import { useState, useEffect } from 'react';
import DraggableWindow from './DraggableWindow';
import { BsCalendar, BsChevronLeft, BsChevronRight, BsClock, BsPlus } from 'react-icons/bs';

interface CalendarAppProps {
  isOpen: boolean;
  onClose: () => void;
}

type EventItem = {
  id: string;
  title: string;
  time: string;
  category: 'academic' | 'project' | 'personal';
  dateStr: string; // YYYY-MM-DD
};

const DEFAULT_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'NIET B.Tech CS (Data Science) Lectures',
    time: '09:00 AM - 01:00 PM',
    category: 'academic',
    dateStr: new Date().toISOString().split('T')[0],
  },
  {
    id: '2',
    title: 'RoomPulse AI Prototype & Wi-Fi CSI Research',
    time: '03:00 PM - 05:30 PM',
    category: 'project',
    dateStr: new Date().toISOString().split('T')[0],
  },
  {
    id: '3',
    title: 'Redis Server in C++ Dev & Networking Code',
    time: '07:00 PM - 09:00 PM',
    category: 'project',
    dateStr: new Date().toISOString().split('T')[0],
  },
  {
    id: '4',
    title: 'Ansible & Linux Fundamentals Lab Practice',
    time: '10:00 PM - 11:30 PM',
    category: 'personal',
    dateStr: new Date().toISOString().split('T')[0],
  },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarApp({ isOpen, onClose }: CalendarAppProps) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventItem[]>(DEFAULT_EVENTS);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calendar calculations
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  const formatSelectedDateStr = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const selectedDateStr = formatSelectedDateStr(selectedDate);
  const selectedDayEvents = events.filter((e) => e.dateStr === selectedDateStr);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    const newEvent: EventItem = {
      id: Date.now().toString(),
      title: newEventTitle.trim(),
      time: 'Flexible Time',
      category: 'personal',
      dateStr: selectedDateStr,
    };
    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setShowAddForm(false);
  };

  // Generate calendar grid cells (42 cells: 6 rows of 7)
  const calendarCells: { day: number; isCurrentMonth: boolean; dateObj: Date }[] = [];

  // Previous month trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    calendarCells.push({
      day,
      isCurrentMonth: false,
      dateObj: new Date(year, month - 1, day),
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push({
      day,
      isCurrentMonth: true,
      dateObj: new Date(year, month, day),
    });
  }

  // Next month leading days to fill remaining grid
  const remainingCells = 42 - calendarCells.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendarCells.push({
      day,
      isCurrentMonth: false,
      dateObj: new Date(year, month + 1, day),
    });
  }

  return (
    <DraggableWindow
      title="Calendar"
      onClose={onClose}
      initialPosition={{
        x: Math.floor(window.innerWidth * 0.28),
        y: Math.floor(window.innerHeight * 0.12),
      }}
      className="w-[95%] max-w-3xl shadow-2xl"
      initialSize={{ width: 720, height: 530 }}
    >
      <div className="flex flex-col md:flex-row h-full bg-[#1e1e1e] text-white select-none">
        {/* Left Side: Calendar Month View */}
        <div className="flex-1 p-5 border-r border-white/10 flex flex-col justify-between">
          <div>
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BsCalendar className="text-red-500 text-lg" />
                <h2 className="text-lg font-bold text-white tracking-wide">
                  {MONTH_NAMES[month]} <span className="text-gray-400 font-normal">{year}</span>
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleToday}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/10 hover:bg-white/20 text-gray-200 transition-colors cursor-pointer mr-1"
                >
                  Today
                </button>
                <button
                  onClick={handlePrevMonth}
                  aria-label="Previous month"
                  className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <BsChevronLeft size={14} />
                </button>
                <button
                  onClick={handleNextMonth}
                  aria-label="Next month"
                  className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <BsChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 mb-2 text-center text-xs font-semibold text-gray-400">
              {DAY_NAMES.map((name, i) => (
                <div key={name} className={i === 0 || i === 6 ? 'text-gray-500' : ''}>
                  {name}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarCells.map((cell, idx) => {
                const todayCell = cell.isCurrentMonth && isToday(cell.day);
                const selectedCell = cell.isCurrentMonth && isSelected(cell.day);
                const cellDateStr = formatSelectedDateStr(cell.dateObj);
                const hasEvent = events.some((e) => e.dateStr === cellDateStr);

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDate(cell.dateObj);
                      if (!cell.isCurrentMonth) {
                        setCurrentDate(cell.dateObj);
                      }
                    }}
                    className={`relative h-9 rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all cursor-pointer ${
                      selectedCell
                        ? 'bg-blue-600 text-white font-bold shadow-md'
                        : todayCell
                        ? 'bg-red-500/20 text-red-400 font-bold border border-red-500/40'
                        : cell.isCurrentMonth
                        ? 'text-gray-200 hover:bg-white/10'
                        : 'text-gray-600 hover:bg-white/5'
                    }`}
                  >
                    <span>{cell.day}</span>
                    {hasEvent && (
                      <span
                        className={`w-1 h-1 rounded-full mt-0.5 ${
                          selectedCell ? 'bg-white' : 'bg-red-500'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Date Footer */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
            <span>
              Today: {DAY_NAMES[today.getDay()]}, {today.getDate()} {MONTH_NAMES[today.getMonth()]} {today.getFullYear()}
            </span>
            <span className="text-gray-500">macOS Sonoma Calendar</span>
          </div>
        </div>

        {/* Right Side: Day Details & Events List */}
        <div className="w-full md:w-72 bg-[#171717] p-5 flex flex-col justify-between">
          <div>
            {/* Header for selected day */}
            <div className="border-b border-white/10 pb-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                {DAY_NAMES[selectedDate.getDay()]}
              </span>
              <h3 className="text-2xl font-bold text-white leading-tight">
                {selectedDate.getDate()} {MONTH_NAMES[selectedDate.getMonth()]}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">{selectedDate.getFullYear()}</p>
            </div>

            {/* Events List */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
              <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>Events & Routine</span>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <BsPlus size={16} /> Add
                </button>
              </div>

              {showAddForm && (
                <form onSubmit={handleAddEvent} className="bg-white/5 p-2 rounded-lg border border-white/10 space-y-2">
                  <input
                    type="text"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="Event title or reminder..."
                    className="w-full bg-black/40 text-xs text-white px-2 py-1.5 rounded border border-white/15 focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                  <div className="flex justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-2 py-1 text-[11px] rounded bg-white/10 text-gray-300 hover:bg-white/20"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-2.5 py-1 text-[11px] rounded bg-blue-600 text-white font-medium hover:bg-blue-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}

              {selectedDayEvents.length === 0 ? (
                <div className="py-8 text-center text-xs text-gray-500">
                  <p>No events scheduled</p>
                  <p className="text-[11px] mt-1 text-gray-600">Click '+ Add' to plan an event</p>
                </div>
              ) : (
                selectedDayEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-2.5 rounded-lg bg-white/5 border-l-2 border-l-blue-500 hover:bg-white/10 transition-colors"
                  >
                    <p className="text-xs font-semibold text-white leading-snug">{evt.title}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-1">
                      <BsClock size={10} className="text-gray-500" />
                      <span>{evt.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Rudra's Schedule Info */}
          <div className="pt-3 border-t border-white/10 text-[11px] text-gray-400">
            <span className="font-semibold text-gray-300">Rudra's Calendar</span>
            <p className="text-gray-500 mt-0.5">B.Tech CSE (Data Science) @ NIET</p>
          </div>
        </div>
      </div>
    </DraggableWindow>
  );
}


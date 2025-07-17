import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useApp } from '../contexts/AppContext'; // adjust path if needed

interface Vaccine {
  name: string;
  offsetWeeks: number;
  scheduledDate: string;
  status: 'pending' | 'done';
  completedDate?: string;
  doctor?: string;
  reaction?: string;
  priority?: 'High' | 'Normal';
}

const defaultVaccines: Vaccine[] = [
  { name: 'BCG', offsetWeeks: 0, scheduledDate: '', status: 'pending', priority: 'High' },
  { name: 'Hepatitis B (Birth)', offsetWeeks: 0, scheduledDate: '', status: 'pending', priority: 'High' },
  { name: 'OPV-1', offsetWeeks: 6, scheduledDate: '', status: 'pending', priority: 'High' },
  { name: 'DPT-1', offsetWeeks: 6, scheduledDate: '', status: 'pending', priority: 'High' },
  { name: 'Hepatitis B-2', offsetWeeks: 6, scheduledDate: '', status: 'pending', priority: 'High' },
  { name: 'DPT-2', offsetWeeks: 10, scheduledDate: '', status: 'pending', priority: 'High' },
  { name: 'DPT-3', offsetWeeks: 14, scheduledDate: '', status: 'pending', priority: 'High' },
  { name: 'Influenza (Flu)', offsetWeeks: 36, scheduledDate: '', status: 'pending', priority: 'Normal' },
  { name: 'MMR (Measles, Mumps, Rubella)', offsetWeeks: 52, scheduledDate: '', status: 'pending', priority: 'High' },
  { name: 'Varicella (Chickenpox)', offsetWeeks: 52, scheduledDate: '', status: 'pending', priority: 'High' },
  { name: 'Hepatitis A (HepA)', offsetWeeks: 52, scheduledDate: '', status: 'pending', priority: 'Normal' },
];

const mockHospitals = [
  'Community Health Center - Sector 9',
  'Mother & Child Clinic - Janta Nagar',
  'Govt Hospital - City Center',
];

// Define age groups for filtering
const ageGroups = [
  { label: 'Birth', weeks: 0 },
  { label: '2 months', weeks: 8 },
  { label: '4 months', weeks: 16 },
  { label: '6 months', weeks: 24 },
  { label: '12 months', weeks: 52 },
  { label: '18 months', weeks: 78 },
];

const LOCAL_STORAGE_KEY = 'babycare_vaccines';

const PRIMARY_COLOR = '#8e3b30'; // deep reddish brown

const VaccinationPage: React.FC = () => {
  const { baby, user, userProfile } = useApp();
  const dob = userProfile?.dob || '';

  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [selectedVaccine, setSelectedVaccine] = useState<string | null>(null);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'done'>('all');
  const [ageFilter, setAgeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [vaccineFilter, setVaccineFilter] = useState<string>('all');

  // Calendar view toggle
  const [calendarView, setCalendarView] = useState(false);

  // Selected date on calendar
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Load from localStorage or create schedule
  useEffect(() => {
    if (dob) {
      const dummyVaccines: Vaccine[] = [
        {
          name: 'BCG',
          offsetWeeks: 0,
          scheduledDate: dayjs().subtract(10, 'week').format('YYYY-MM-DD'),
          status: 'done',
          completedDate: dayjs().subtract(9, 'week').format('YYYY-MM-DD'),
          doctor: 'Dr. Sarah Johnson',
          reaction: 'No adverse reactions',
          priority: 'High',
        },
        {
          name: 'Hepatitis B (Birth)',
          offsetWeeks: 0,
          scheduledDate: dayjs().subtract(10, 'week').format('YYYY-MM-DD'),
          status: 'done',
          completedDate: dayjs().subtract(9, 'week').format('YYYY-MM-DD'),
          doctor: 'Dr. Alex Smith',
          reaction: 'Mild fever',
          priority: 'High',
        },
        {
          name: 'OPV-1',
          offsetWeeks: 6,
          scheduledDate: dayjs().subtract(4, 'week').format('YYYY-MM-DD'),
          status: 'pending',
          priority: 'High',
        },
        {
          name: 'DPT-1',
          offsetWeeks: 6,
          scheduledDate: dayjs().subtract(4, 'week').format('YYYY-MM-DD'),
          status: 'done',
          completedDate: dayjs().subtract(3, 'week').format('YYYY-MM-DD'),
          doctor: 'Dr. Emily Davis',
          reaction: 'No adverse reactions',
          priority: 'High',
        },
        {
          name: 'Hepatitis B-2',
          offsetWeeks: 6,
          scheduledDate: dayjs().subtract(4, 'week').format('YYYY-MM-DD'),
          status: 'pending',
          priority: 'High',
        },
        {
          name: 'DPT-2',
          offsetWeeks: 10,
          scheduledDate: dayjs().add(2, 'week').format('YYYY-MM-DD'),
          status: 'pending',
          priority: 'High',
        },
        {
          name: 'DPT-3',
          offsetWeeks: 14,
          scheduledDate: dayjs().add(6, 'week').format('YYYY-MM-DD'),
          status: 'pending',
          priority: 'High',
        },
        {
          name: 'Influenza (Flu)',
          offsetWeeks: 36,
          scheduledDate: dayjs().add(28, 'week').format('YYYY-MM-DD'),
          status: 'pending',
          priority: 'Normal',
        },
        {
          name: 'MMR (Measles, Mumps, Rubella)',
          offsetWeeks: 52,
          scheduledDate: dayjs().add(44, 'week').format('YYYY-MM-DD'),
          status: 'pending',
          priority: 'High',
        },
        {
          name: 'Varicella (Chickenpox)',
          offsetWeeks: 52,
          scheduledDate: dayjs().add(44, 'week').format('YYYY-MM-DD'),
          status: 'pending',
          priority: 'High',
        },
        {
          name: 'Hepatitis A (HepA)',
          offsetWeeks: 52,
          scheduledDate: dayjs().add(44, 'week').format('YYYY-MM-DD'),
          status: 'pending',
          priority: 'Normal',
        },
      ];

      // Try loading from localStorage first
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          const parsed: Vaccine[] = JSON.parse(stored);
          setVaccines(parsed);
          return;
        } catch {
          // If error, fallback to dummyVaccines
        }
      }

      setVaccines(dummyVaccines);
    }
  }, [dob]);

  // Save updates to localStorage
  const updateVaccines = (updated: Vaccine[]) => {
    setVaccines(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  // Mark vaccine done
  const markAsDone = (index: number) => {
    const updated = [...vaccines];
    updated[index].status = 'done';
    updated[index].completedDate = dayjs().format('YYYY-MM-DD');
    updated[index].doctor = 'Dr. Sarah Johnson';
    updated[index].reaction = 'No adverse reactions';
    updateVaccines(updated);
  };

  // Reminder notification
  const setReminder = (vaccine: Vaccine) => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications.');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(`Reminder set for ${vaccine.name} on ${vaccine.scheduledDate}`);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(`Reminder set for ${vaccine.name} on ${vaccine.scheduledDate}`);
        }
      });
    }
  };

  // Export CSV
  const exportCSV = () => {
    const header = ['Vaccine Name', 'Scheduled Date', 'Status', 'Completed Date', 'Doctor', 'Reaction', 'Priority'];
    const rows = vaccines.map((v) => [
      v.name,
      v.scheduledDate,
      v.status,
      v.completedDate || '',
      v.doctor || '',
      v.reaction || '',
      v.priority || '',
    ]);

    const csvContent = [header, ...rows].map((e) => e.map((a) => `"${a}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vaccination_history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const today = dayjs();

  // Filter vaccines
  const filteredVaccines = vaccines.filter((vaccine) => {
    if (statusFilter !== 'all' && vaccine.status !== statusFilter) return false;

    if (ageFilter !== 'all') {
      const vaccineWeeks = dayjs(vaccine.scheduledDate).diff(dayjs(dob), 'week');
      const ageGroup = ageGroups.find((g) => g.label === ageFilter);
      if (!ageGroup) return true;
      if (vaccineWeeks < ageGroup.weeks || vaccineWeeks >= ageGroup.weeks + 4) return false;
    }

    if (priorityFilter !== 'all' && vaccine.priority !== priorityFilter) return false;

    if (vaccineFilter !== 'all' && vaccine.name !== vaccineFilter) return false;

    return true;
  });

  // Group vaccines by status for display
  const upcomingVaccines = filteredVaccines.filter((v) => v.status === 'pending');
  const pastVaccines = filteredVaccines.filter((v) => v.status === 'done');

  const openBookingModal = (vaccineName: string) => {
    setSelectedVaccine(vaccineName);
    setShowModal(true);
    setSelectedHospital('');
    setAppointmentDate('');
    setAppointmentTime('');
  };

  const submitAppointment = () => {
    console.log('Booking:', {
      vaccine: selectedVaccine,
      hospital: selectedHospital,
      date: appointmentDate,
      time: appointmentTime,
    });
    setShowModal(false);
    // Future: Save to Firebase or API call
  };

  return (
    <div className="p-6 max-w-8xl mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-6" style={{ color: PRIMARY_COLOR }}>
        Vaccination Timeline
      </h2>
      <p className="mb-6 text-gray-700">Track and manage your child's immunization schedule</p>

      {!dob ? (
        <p className="text-red-600 font-medium mb-6">Date of birth not found. Please update baby's profile.</p>
      ) : (
        <>
          {/* Profile summary */}
          <div
            className="mb-6 p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
            style={{ backgroundColor: '#f9f1ee' }}
          >
            <div>
              <p className="text-xl font-semibold" style={{ color: PRIMARY_COLOR }}>
                {baby?.name || user?.name || 'Your Child'}
              </p>
              <p className="text-gray-700">
                {dayjs().diff(dayjs(dob), 'month')} months old • Born {dayjs(dob).format('YYYY-MM-DD')}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <button
                onClick={exportCSV}
                className="px-4 py-2 text-white rounded hover:opacity-90 transition"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                Download Records (CSV)
              </button>
              <button
                onClick={() => {
                  setCalendarView(!calendarView);
                  setSelectedDate(null);
                }}
                className="px-4 py-2 text-white rounded hover:opacity-90 transition"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                {calendarView ? 'Show Timeline' : 'Show Calendar'}
              </button>
            </div>
          </div>

          {/* Filters */}
          <section className="mb-6 p-4 bg-white rounded shadow flex flex-wrap gap-4">
            <select
              className="border p-2 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              style={{ borderColor: PRIMARY_COLOR }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>

            <select
              className="border p-2 rounded"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              style={{ borderColor: PRIMARY_COLOR }}
            >
              <option value="all">All Ages</option>
              {ageGroups.map((g) => (
                <option key={g.label} value={g.label}>
                  {g.label}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{ borderColor: PRIMARY_COLOR }}
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
            </select>

            <select
              className="border p-2 rounded"
              value={vaccineFilter}
              onChange={(e) => setVaccineFilter(e.target.value)}
              style={{ borderColor: PRIMARY_COLOR }}
            >
              <option value="all">All Vaccines</option>
              {[...new Set(vaccines.map((v) => v.name))].map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </section>

          {calendarView ? (
            <div className="bg-white p-4 rounded shadow max-w-8xl mx-auto flex flex-col md:flex-row gap-6">
              {/* Calendar on left */}
              <div className="md:w-1/2">
                <Calendar
                  onChange={(date) => setSelectedDate(date as Date)}
                  value={selectedDate}
                  tileClassName={({ date, view }) => {
                    if (view === 'month') {
                      const dateStr = dayjs(date).format('YYYY-MM-DD');
                      const vaccineOnDate = vaccines.filter((v) => v.scheduledDate === dateStr);
                      if (vaccineOnDate.length) {
                        const hasDone = vaccineOnDate.some((v) => v.status === 'done');
                        const hasPending = vaccineOnDate.some((v) => v.status === 'pending');
                        if (selectedDate && dayjs(date).isSame(selectedDate, 'day')) {
                          return 'bg-[rgba(142,59,48,0.7)] rounded text-white font-bold';
                        }
                        if (hasDone) return 'bg-[rgba(142,59,48,0.2)] rounded font-semibold text-[rgba(142,59,48,0.8)]';
                        if (hasPending) return 'bg-[rgba(142,59,48,0.1)] rounded font-semibold text-[rgba(142,59,48,0.6)]';
                      }
                    }
                    return '';
                  }}
                />
              </div>

              {/* Vaccine list on right */}
              <div className="md:w-1/2 bg-[#f9f1ee] p-4 rounded shadow-inner min-h-[300px]">
                <h4 className="text-xl font-semibold mb-4" style={{ color: PRIMARY_COLOR }}>
                  Vaccines on{' '}
                  {selectedDate ? dayjs(selectedDate).format('MMMM D, YYYY') : 'Select a date'}
                </h4>

                {!selectedDate ? (
                  <p className="text-gray-700">Click on a date to see scheduled vaccines.</p>
                ) : (
                  <>
                    {vaccines.filter((v) => v.scheduledDate === dayjs(selectedDate).format('YYYY-MM-DD'))
                      .length === 0 ? (
                      <p className="text-gray-700">No vaccines scheduled on this date.</p>
                    ) : (
                      <ul className="space-y-3 max-h-96 overflow-y-auto">
                        {vaccines
                          .filter((v) => v.scheduledDate === dayjs(selectedDate).format('YYYY-MM-DD'))
                          .map((vaccine, idx) => {
                            const isDone = vaccine.status === 'done';
                            return (
                              <li
                                key={idx}
                                className={`p-3 rounded border ${
                                  isDone
                                    ? 'border-[rgba(142,59,48,0.7)] bg-[rgba(142,59,48,0.1)] text-[rgba(142,59,48,0.9)]'
                                    : 'border-[rgba(142,59,48,0.4)] bg-[rgba(142,59,48,0.05)] text-[rgba(142,59,48,0.7)]'
                                } flex flex-col md:flex-row md:justify-between md:items-center`}
                              >
                                <div>
                                  <h5 className="font-semibold">{vaccine.name}</h5>
                                  {isDone && vaccine.completedDate && (
                                    <p className="text-sm">Completed: {vaccine.completedDate}</p>
                                  )}
                                  {!isDone && (
                                    <p className="text-sm">
                                      Scheduled: {vaccine.scheduledDate}
                                    </p>
                                  )}
                                </div>
                                {!isDone && (
                                  <button
                                    onClick={() => markAsDone(vaccines.indexOf(vaccine))}
                                    className="mt-2 md:mt-0 px-3 py-1 rounded text-white"
                                    style={{ backgroundColor: PRIMARY_COLOR }}
                                  >
                                    Mark Done
                                  </button>
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Upcoming Vaccines */}
              <section className="mb-8 max-w-8xl mx-auto">
                <h3 className="text-2xl font-semibold mb-4" style={{ color: PRIMARY_COLOR }}>
                  Upcoming Vaccines
                </h3>
                {upcomingVaccines.length === 0 ? (
                  <p className="text-gray-600">No upcoming vaccines.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingVaccines.map((vaccine, index) => {
                      const scheduled = dayjs(vaccine.scheduledDate);
                      const isOverdue = scheduled.isBefore(today, 'day');
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded border shadow flex flex-col justify-between ${
                            isOverdue
                              ? 'bg-[rgba(142,59,48,0.1)] border-[rgba(142,59,48,0.4)]'
                              : 'bg-[rgba(142,59,48,0.05)] border-[rgba(142,59,48,0.25)]'
                          }`}
                        >
                          <div>
                            <h4 className="text-lg font-bold mb-1" style={{ color: PRIMARY_COLOR }}>
                              {vaccine.name}
                            </h4>
                            <p className="text-sm text-[rgba(142,59,48,0.8)] mb-2">
                              Scheduled: {scheduled.format('MMM D, YYYY')}
                            </p>
                            {/* Priority Badge */}
                            {vaccine.priority && (
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 text-white ${
                                  vaccine.priority === 'High'
                                    ? 'bg-[rgba(142,59,48,0.85)]'
                                    : 'bg-[rgba(142,59,48,0.5)]'
                                }`}
                              >
                                {vaccine.priority} Priority
                              </span>
                            )}
                            {isOverdue && (
                              <p className="text-[rgba(142,59,48,0.9)] font-semibold flex items-center gap-1">
                                <FaExclamationCircle /> Overdue
                              </p>
                            )}
                          </div>
                          <div className="flex gap-3 mt-3">
                            <button
                              onClick={() => openBookingModal(vaccine.name)}
                              className="flex-1 px-3 py-1 text-white rounded hover:opacity-90 transition"
                              style={{ backgroundColor: PRIMARY_COLOR }}
                            >
                              Book Appointment
                            </button>
                            <button
                              onClick={() => setReminder(vaccine)}
                              className="flex-1 px-3 py-1 text-white rounded hover:opacity-90 transition"
                              style={{ backgroundColor: PRIMARY_COLOR }}
                            >
                              Set Reminder
                            </button>
                            <button
                              onClick={() => markAsDone(vaccines.indexOf(vaccine))}
                              className="flex-1 px-3 py-1 text-white rounded hover:opacity-90 transition"
                              style={{ backgroundColor: PRIMARY_COLOR }}
                            >
                              Mark Done
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Past Vaccines */}
              <section className="max-w-8xl mx-auto">
                <h3 className="text-2xl font-semibold mb-4" style={{ color: PRIMARY_COLOR }}>
                  Completed Vaccines
                </h3>
                {pastVaccines.length === 0 ? (
                  <p className="text-gray-600">No completed vaccines yet.</p>
                ) : (
                  <div className="space-y-4">
                    {pastVaccines.map((vaccine, index) => (
                      <div
                        key={index}
                        className="p-4 rounded border shadow flex flex-col md:flex-row md:justify-between md:items-center"
                        style={{
                          borderColor: 'rgba(142,59,48,0.5)',
                          backgroundColor: 'rgba(142,59,48,0.1)',
                          color: 'rgba(142,59,48,0.9)',
                        }}
                      >
                        <div>
                          <h4 className="text-lg font-bold">{vaccine.name}</h4>
                          <p className="text-sm">Completed: {vaccine.completedDate}</p>
                          <p className="text-sm">Doctor: {vaccine.doctor}</p>
                          {vaccine.reaction && (
                            <p className="text-sm">Reaction: {vaccine.reaction}</p>
                          )}
                          {vaccine.priority && (
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mt-1 text-white ${
                                vaccine.priority === 'High'
                                  ? 'bg-red-700'
                                  : 'bg-green-700'
                              }`}
                            >
                              {vaccine.priority} Priority
                            </span>
                          )}
                        </div>
                        <FaCheckCircle className="text-3xl mt-4 md:mt-0" style={{ color: PRIMARY_COLOR }} />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {/* Booking Modal */}
          {showModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowModal(false)}
            >
              <div
                className="bg-white rounded p-6 w-96 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold mb-4" style={{ color: PRIMARY_COLOR }}>
                  Book Appointment for {selectedVaccine}
                </h3>
                <label className="block mb-2">
                  Select Hospital:
                  <select
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                    style={{ borderColor: PRIMARY_COLOR }}
                  >
                    <option value="">Select hospital</option>
                    {mockHospitals.map((h, idx) => (
                      <option key={idx} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block mb-2">
                  Appointment Date:
                  <input
                    type="date"
                    className="w-full border p-2 rounded mt-1"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={dayjs().format('YYYY-MM-DD')}
                    style={{ borderColor: PRIMARY_COLOR }}
                  />
                </label>
                <label className="block mb-4">
                  Appointment Time:
                  <input
                    type="time"
                    className="w-full border p-2 rounded mt-1"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    style={{ borderColor: PRIMARY_COLOR }}
                  />
                </label>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded hover:bg-gray-200 transition"
                    style={{ border: `1px solid ${PRIMARY_COLOR}`, color: PRIMARY_COLOR }}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!selectedHospital || !appointmentDate || !appointmentTime}
                    onClick={submitAppointment}
                    className="px-4 py-2 text-white rounded transition"
                    style={{
                      backgroundColor:
                        !selectedHospital || !appointmentDate || !appointmentTime
                          ? '#d1b4ad'
                          : PRIMARY_COLOR,
                      cursor:
                        !selectedHospital || !appointmentDate || !appointmentTime
                          ? 'not-allowed'
                          : 'pointer',
                    }}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VaccinationPage;

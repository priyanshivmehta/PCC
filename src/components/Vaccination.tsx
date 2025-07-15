import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
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

const VaccinationPage: React.FC = () => {
  const { baby, user } = useApp();
  const { userProfile } = useApp();
  const dob = userProfile?.dob || '';
// fallback for DOB
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

  // Load from localStorage or create schedule
  useEffect(() => {
    if (dob) {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setVaccines(JSON.parse(saved));
      } else {
        const schedule = defaultVaccines.map((vaccine) => ({
          ...vaccine,
          scheduledDate: dayjs(dob).add(vaccine.offsetWeeks, 'week').format('YYYY-MM-DD'),
        }));
        setVaccines(schedule);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(schedule));
      }
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
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }

    if (Notification.permission === "granted") {
      new Notification(`Reminder set for ${vaccine.name} on ${vaccine.scheduledDate}`);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(`Reminder set for ${vaccine.name} on ${vaccine.scheduledDate}`);
        }
      });
    }
  };

  // Export CSV
  const exportCSV = () => {
    const header = ['Vaccine Name', 'Scheduled Date', 'Status', 'Completed Date', 'Doctor', 'Reaction', 'Priority'];
    const rows = vaccines.map(v => [
      v.name,
      v.scheduledDate,
      v.status,
      v.completedDate || '',
      v.doctor || '',
      v.reaction || '',
      v.priority || '',
    ]);

    const csvContent = [header, ...rows]
      .map(e => e.map(a => `"${a}"`).join(','))
      .join('\n');

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
      const ageGroup = ageGroups.find(g => g.label === ageFilter);
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
    <div className="p-6 max-w-6xl mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-6">Vaccination Timeline</h2>
      <p className="mb-6 text-gray-700">
        Track and manage your child's immunization schedule
      </p>

      {!dob ? (
        <p className="text-red-600 font-medium mb-6">
          Date of birth not found. Please update baby's profile.
        </p>
      ) : (
        <>
          {/* Profile summary */}
          <div className="mb-6 bg-blue-50 p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xl font-semibold">{baby?.name || user?.name || 'Your Child'}</p>
              <p className="text-gray-600">
                {dayjs().diff(dayjs(dob), 'month')} months old • Born {dayjs(dob).format('YYYY-MM-DD')}
              </p>
            </div>
            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 mt-4 md:mt-0"
            >
              Download Records (CSV)
            </button>
            <button
              onClick={() => setCalendarView(!calendarView)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ml-4 mt-4 md:mt-0"
            >
              {calendarView ? 'Show Timeline' : 'Show Calendar'}
            </button>
          </div>

          {/* Filters */}
          <section className="mb-6 p-4 bg-white rounded shadow flex flex-wrap gap-4">
            <select
              className="border p-2 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>

            <select
              className="border p-2 rounded"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
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
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
            </select>

            <select
              className="border p-2 rounded"
              value={vaccineFilter}
              onChange={(e) => setVaccineFilter(e.target.value)}
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
            // Calendar view
            <div className="overflow-auto border rounded p-4 bg-white shadow">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-3 py-2">Date</th>
                    <th className="border px-3 py-2">Vaccine</th>
                    <th className="border px-3 py-2">Status</th>
                    <th className="border px-3 py-2">Priority</th>
                    <th className="border px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVaccines
                    .sort((a, b) => dayjs(a.scheduledDate).unix() - dayjs(b.scheduledDate).unix())
                    .map((v, idx) => {
                      const isOverdue = v.status === 'pending' && dayjs(v.scheduledDate).isBefore(today);
                      return (
                        <tr
                          key={idx}
                          className={
                            v.status === 'done' ? 'bg-green-50' : isOverdue ? 'bg-red-50' : 'bg-yellow-50'
                          }
                        >
                          <td className="border px-3 py-2">{v.scheduledDate}</td>
                          <td className="border px-3 py-2">{v.name}</td>
                          <td className="border px-3 py-2 capitalize">{v.status}</td>
                          <td className="border px-3 py-2">{v.priority || 'Normal'}</td>
                          <td className="border px-3 py-2 space-x-2">
                            {v.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => {
                                    const i = vaccines.findIndex((x) => x.name === v.name && x.scheduledDate === v.scheduledDate);
                                    if (i !== -1) markAsDone(i);
                                  }}
                                  className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                                >
                                  Mark Done
                                </button>
                                <button
                                  onClick={() => setReminder(v)}
                                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                                >
                                  Remind Me
                                </button>
                                <button
                                  onClick={() => openBookingModal(v.name)}
                                  className="px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs"
                                >
                                  Book Appointment
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            // Timeline view
            <>
              {/* Upcoming Vaccines */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">📅 Upcoming Vaccines</h3>
                <div className="space-y-4">
                  {upcomingVaccines.map((vaccine, index) => {
                    const isOverdue = dayjs(vaccine.scheduledDate).isBefore(today);
                    return (
                      <div
                        key={index}
                        className={`bg-white p-4 border shadow-md rounded-md flex justify-between items-start ${
                          isOverdue ? 'border-red-400 bg-red-50' : ''
                        }`}
                      >
                        <div>
                          <h4 className="text-lg font-bold flex items-center gap-2">
                            {vaccine.name}
                            {isOverdue && (
                              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                Overdue
                              </span>
                            )}
                          </h4>
                          <p className="text-gray-600">Scheduled: {vaccine.scheduledDate}</p>
                          <p className="text-sm text-yellow-600 mt-1">Reminder set for 2 days before</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <button
                            onClick={() => {
                              const i = vaccines.findIndex(
                                (x) => x.name === vaccine.name && x.scheduledDate === vaccine.scheduledDate
                              );
                              if (i !== -1) markAsDone(i);
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Mark as Done
                          </button>
                          <button
                            onClick={() => setReminder(vaccine)}
                            className="text-blue-600 text-sm underline hover:text-blue-800"
                          >
                            Remind Me
                          </button>
                          <button
                            onClick={() => openBookingModal(vaccine.name)}
                            className="text-blue-600 text-sm underline hover:text-blue-800"
                          >
                            Book Appointment
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Past Vaccines */}
              {pastVaccines.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">✅ Past Vaccines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pastVaccines.map((vaccine, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-4 border rounded-md flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="text-lg font-medium">{vaccine.name}</h4>
                          <p className="text-gray-600">Scheduled: {vaccine.scheduledDate}</p>
                          <p className="text-gray-600">Completed: {vaccine.completedDate}</p>
                          <p className="text-gray-600">By: {vaccine.doctor}</p>
                          <p className="text-gray-600 italic">{vaccine.reaction}</p>
                          <p className="mt-1 font-semibold text-green-600">Done</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Appointment Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Book Appointment for {selectedVaccine}</h3>
                <label className="block mb-3 text-sm font-medium">
                  Select Hospital:
                  <select
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="">Choose...</option>
                    {mockHospitals.map((hospital, i) => (
                      <option key={i} value={hospital}>
                        {hospital}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block mb-3 text-sm font-medium">
                  Appointment Date:
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full mt-1 p-2 border rounded"
                    min={dayjs().format('YYYY-MM-DD')}
                  />
                </label>
                <label className="block mb-4 text-sm font-medium">
                  Appointment Time:
                  <input
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </label>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitAppointment}
                    disabled={!selectedHospital || !appointmentDate || !appointmentTime}
                    className={`px-4 py-2 text-white rounded ${
                      selectedHospital && appointmentDate && appointmentTime
                        ? 'bg-indigo-600 hover:bg-indigo-700'
                        : 'bg-indigo-300 cursor-not-allowed'
                    }`}
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

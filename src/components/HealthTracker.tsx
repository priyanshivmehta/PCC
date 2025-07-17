import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Calendar,
  TrendingUp,
  Weight,
  Ruler,
  Plus,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { HealthRecord } from '../types';

const PRIMARY_COLOR = '#8e3b30';

const HealthTracker: React.FC = () => {
  const { baby, healthRecords, setHealthRecords } = useApp();
  const [activeTab, setActiveTab] = useState<'records' | 'vlm'>('records');
  const [showAddRecord, setShowAddRecord] = useState(false);

  const [newRecord, setNewRecord] = useState({
    weight: '',
    height: '',
    headCircumference: '',
    milestones: '',
    notes: '',
  });

  // VLM state
  const [rashImage, setRashImage] = useState<File | null>(null);
  const [rashPreview, setRashPreview] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedVoiceTip, setSelectedVoiceTip] = useState<string | null>(null);

  useEffect(() => {
    if (rashImage) {
      const url = URL.createObjectURL(rashImage);
      setRashPreview(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setRashPreview(null);
    }
  }, [rashImage]);

  // Mock AI suggestion fetch
  const getAISuggestions = async (imageFile: File) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 2000));
    setAiSuggestions(
      'Possible diagnosis: Mild eczema. Keep skin moisturized and avoid irritants. If worsens, consult a pediatrician.'
    );
    setLoading(false);
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setRashImage(e.target.files[0]);
      setAiSuggestions(null);
    }
  };

  const handleAnalyze = () => {
    if (rashImage) {
      getAISuggestions(rashImage);
    }
  };

  const handleAddRecord = () => {
    if (!newRecord.weight || !newRecord.height) {
      alert('Please fill in weight and height');
      return;
    }

    const record: HealthRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      weight: parseFloat(newRecord.weight),
      height: parseFloat(newRecord.height),
      headCircumference: newRecord.headCircumference
        ? parseFloat(newRecord.headCircumference)
        : undefined,
      milestones: newRecord.milestones
        .split(',')
        .map((m) => m.trim())
        .filter((m) => m),
      notes: newRecord.notes,
    };

    setHealthRecords([...healthRecords, record]);
    setNewRecord({ weight: '', height: '', headCircumference: '', milestones: '', notes: '' });
    setShowAddRecord(false);
  };

  // Example voice-supported tips (just placeholders for now)
  const tips = [
    {
      id: '1',
      title: 'Keep Rash Area Clean',
      text: 'Gently clean the rash area with lukewarm water daily.',
      voiceUrl: '/voices/keep_clean.mp3',
    },
    {
      id: '2',
      title: 'Avoid Scratching',
      text: 'Try to keep baby’s nails trimmed to prevent scratching.',
      voiceUrl: '/voices/avoid_scratching.mp3',
    },
    {
      id: '3',
      title: 'Use Mild Moisturizer',
      text: 'Apply a gentle, fragrance-free moisturizer to soothe skin.',
      voiceUrl: '/voices/mild_moisturizer.mp3',
    },
  ];

  const playVoiceTip = (voiceUrl: string) => {
    const audio = new Audio(voiceUrl);
    audio.play();
    setSelectedVoiceTip(voiceUrl);
    audio.onended = () => setSelectedVoiceTip(null);
  };

  return (
    <div className="pt-10 px-4 space-y-6 max-w-9xl mx-auto" style={{ color: PRIMARY_COLOR }}>
      {/* Header */}
      <div
        className="rounded-xl p-6 border"
        style={{ background: 'rgba(142,59,48,0.1)', borderColor: PRIMARY_COLOR }}
      >
        <h2 className="text-xl font-bold mb-2" style={{ color: PRIMARY_COLOR }}>
          Health Tracker
        </h2>
        <p style={{ color: PRIMARY_COLOR }}>
          Monitor your baby's growth and get AI-powered visual help
        </p>
      </div>

      {/* Tabs */}
      <div
        className="flex rounded-lg p-1"
        style={{ backgroundColor: 'rgba(142,59,48,0.1)' }}
      >
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'records'
              ? 'bg-white shadow-sm'
              : `text-[${PRIMARY_COLOR}] hover:text-opacity-80`
          }`}
          style={{
            color: activeTab === 'records' ? PRIMARY_COLOR : 'inherit',
            backgroundColor: activeTab === 'records' ? '#fff' : 'transparent',
            boxShadow: activeTab === 'records' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
          }}
        >
          Growth Records
        </button>
        <button
          onClick={() => setActiveTab('vlm')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === 'vlm'
              ? 'bg-white shadow-sm'
              : `text-[${PRIMARY_COLOR}] hover:text-opacity-80`
          }`}
          style={{
            color: activeTab === 'vlm' ? PRIMARY_COLOR : 'inherit',
            backgroundColor: activeTab === 'vlm' ? '#fff' : 'transparent',
            boxShadow: activeTab === 'vlm' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
          }}
        >
          VLM Integration
        </button>
      </div>

      {/* Growth Records Tab */}
      {activeTab === 'records' && (
        <div className="space-y-4">
          <button
            onClick={() => setShowAddRecord((v) => !v)}
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-colors"
            style={{
              backgroundColor: PRIMARY_COLOR,
              color: '#fff',
              boxShadow: '0 4px 6px rgba(142,59,48,0.4)',
            }}
          >
            <Plus className="w-5 h-5" />
            <span>{showAddRecord ? 'Cancel' : 'Add Health Record'}</span>
          </button>

          {showAddRecord && (
            <div
              className="bg-white rounded-xl p-4 border shadow-sm"
              style={{ borderColor: PRIMARY_COLOR }}
            >
              <h3 className="font-semibold mb-4" style={{ color: PRIMARY_COLOR }}>
                New Health Record
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY_COLOR }}>
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={newRecord.weight}
                      onChange={(e) =>
                        setNewRecord({ ...newRecord, weight: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                      style={{ borderColor: PRIMARY_COLOR }}
                      placeholder="3.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY_COLOR }}>
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={newRecord.height}
                      onChange={(e) =>
                        setNewRecord({ ...newRecord, height: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                      style={{ borderColor: PRIMARY_COLOR }}
                      placeholder="50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY_COLOR }}>
                    Head Circumference (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRecord.headCircumference}
                    onChange={(e) =>
                      setNewRecord({ ...newRecord, headCircumference: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    style={{ borderColor: PRIMARY_COLOR }}
                    placeholder="35"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY_COLOR }}>
                    Milestones (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newRecord.milestones}
                    onChange={(e) =>
                      setNewRecord({ ...newRecord, milestones: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    style={{ borderColor: PRIMARY_COLOR }}
                    placeholder="Smiling, holding head up"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: PRIMARY_COLOR }}>
                    Notes
                  </label>
                  <textarea
                    value={newRecord.notes}
                    onChange={(e) =>
                      setNewRecord({ ...newRecord, notes: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    style={{ borderColor: PRIMARY_COLOR }}
                    rows={3}
                    placeholder="Any additional notes..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddRecord}
                    className="flex-1 text-white py-2 rounded-lg font-medium transition-colors"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    Save Record
                  </button>
                  <button
                    onClick={() => setShowAddRecord(false)}
                    className="flex-1 py-2 rounded-lg font-medium transition-colors"
                    style={{
                      backgroundColor: 'rgba(142,59,48,0.1)',
                      color: PRIMARY_COLOR,
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Health Records List */}
          <div className="space-y-3">
            {healthRecords.length > 0 ? (
              healthRecords
                .slice()
                .reverse()
                .map((record) => (
                  <div
                    key={record.id}
                    className="bg-white rounded-xl p-4 border shadow-sm"
                    style={{ borderColor: PRIMARY_COLOR }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold" style={{ color: PRIMARY_COLOR }}>
                        {new Date(record.date).toLocaleDateString()}
                      </h4>
                      <TrendingUp className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div
                          className="p-2 rounded-lg mb-1 mx-auto w-fit"
                          style={{ backgroundColor: 'rgba(142,59,48,0.1)' }}
                        >
                          <Weight className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                        </div>
                        <p className="text-xs" style={{ color: PRIMARY_COLOR }}>
                          Weight
                        </p>
                        <p className="font-semibold text-sm">{record.weight} kg</p>
                      </div>
                      <div className="text-center">
                        <div
                          className="p-2 rounded-lg mb-1 mx-auto w-fit"
                          style={{ backgroundColor: 'rgba(142,59,48,0.1)' }}
                        >
                          <Ruler className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                        </div>
                        <p className="text-xs" style={{ color: PRIMARY_COLOR }}>
                          Height
                        </p>
                        <p className="font-semibold text-sm">{record.height} cm</p>
                      </div>
                      <div className="text-center">
                        <div
                          className="p-2 rounded-lg mb-1 mx-auto w-fit"
                          style={{ backgroundColor: 'rgba(142,59,48,0.1)' }}
                        >
                          <Calendar className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
                        </div>
                        <p className="text-xs" style={{ color: PRIMARY_COLOR }}>
                          Head Circ.
                        </p>
                        <p className="font-semibold text-sm">
                          {record.headCircumference ?? 'N/A'} cm
                        </p>
                      </div>
                    </div>

                    {record.milestones.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm font-medium mb-1" style={{ color: PRIMARY_COLOR }}>
                          Milestones:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {record.milestones.map((milestone, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: 'rgba(142,59,48,0.15)',
                                color: PRIMARY_COLOR,
                              }}
                            >
                              {milestone}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {record.notes && (
                      <div>
                        <p className="text-sm font-medium mb-1" style={{ color: PRIMARY_COLOR }}>
                          Notes:
                        </p>
                        <p className="text-sm">{record.notes}</p>
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <div
                className="rounded-xl p-8 text-center"
                style={{ backgroundColor: 'rgba(142,59,48,0.05)', color: PRIMARY_COLOR }}
              >
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <p>No health records yet</p>
                <p className="text-sm mt-1">Add your first record to start tracking</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VLM Integration Tab */}
      {activeTab === 'vlm' && (
        <div className="space-y-6">
          <div
            className="rounded-xl p-6 border shadow-sm"
            style={{ borderColor: PRIMARY_COLOR, backgroundColor: 'rgba(142,59,48,0.05)' }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: PRIMARY_COLOR }}>
              Upload a photo of a rash
            </h3>

            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="mb-4"
            />

            {rashPreview && (
              <img
                src={rashPreview}
                alt="Rash Preview"
                className="max-w-full rounded-lg mb-4 border"
                style={{ borderColor: PRIMARY_COLOR }}
              />
            )}

            <button
              onClick={handleAnalyze}
              disabled={!rashImage || loading}
              className="w-full py-3 rounded-xl font-medium text-white transition-colors"
              style={{
                backgroundColor: rashImage && !loading ? PRIMARY_COLOR : '#ccc',
                cursor: rashImage && !loading ? 'pointer' : 'not-allowed',
                boxShadow: rashImage && !loading ? `0 4px 6px rgba(142,59,48,0.4)` : 'none',
              }}
            >
              {loading ? 'Analyzing...' : 'Get AI Suggestions'}
            </button>

            {aiSuggestions && (
              <div
                className="mt-6 rounded-lg p-4"
                style={{
                  backgroundColor: 'rgba(142,59,48,0.1)',
                  border: `1px solid ${PRIMARY_COLOR}`,
                  color: PRIMARY_COLOR,
                }}
              >
                <h4 className="font-semibold mb-2">AI Suggestions:</h4>
                <p>{aiSuggestions}</p>
              </div>
            )}
          </div>

          {/* Tips with Voice Support */}
          <div
            className="rounded-xl p-6 border shadow-sm"
            style={{ borderColor: PRIMARY_COLOR, backgroundColor: 'rgba(142,59,48,0.05)' }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: PRIMARY_COLOR }}>
              Tips & FAQs with Voice Support
            </h3>
            <ul className="space-y-3">
              {tips.map(({ id, title, text, voiceUrl }) => (
                <li
                  key={id}
                  className="p-4 rounded-lg cursor-pointer flex justify-between items-center"
                  style={{
                    backgroundColor:
                      selectedVoiceTip === voiceUrl ? 'rgba(142,59,48,0.15)' : 'transparent',
                    border: selectedVoiceTip === voiceUrl ? `1px solid ${PRIMARY_COLOR}` : 'none',
                    color: PRIMARY_COLOR,
                  }}
                  onClick={() => playVoiceTip(voiceUrl)}
                  title="Click to listen"
                >
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm">{text}</p>
                  </div>
                  <button
                    className="ml-4 px-3 py-1 rounded bg-white text-[PRIMARY_COLOR]"
                    style={{ color: PRIMARY_COLOR, border: `1px solid ${PRIMARY_COLOR}` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      playVoiceTip(voiceUrl);
                    }}
                    aria-label={`Play voice tip for ${title}`}
                  >
                    ▶️
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTracker;

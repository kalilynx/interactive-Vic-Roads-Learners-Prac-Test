import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Target, TrendingUp, Flame, CheckCircle, Circle, Plus, Save, Trash2, Edit3, Award, Calendar } from 'lucide-react';

export default function StudyBuddy() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [streak, setStreak] = useState(0);
  const [lastStudyDate, setLastStudyDate] = useState(null);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', content: '', subject: '' });
  const [completedExercises, setCompletedExercises] = useState({});
  const [currentExercise, setCurrentExercise] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('studyStreak');
    const savedLastDate = localStorage.getItem('lastStudyDate');
    const savedNotes = localStorage.getItem('studyNotes');
    const savedCompleted = localStorage.getItem('completedExercises');

    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedLastDate) setLastStudyDate(savedLastDate);
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedCompleted) setCompletedExercises(JSON.parse(savedCompleted));
  }, []);

  // Update streak
  const updateStreak = () => {
    const today = new Date().toDateString();
    
    if (lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastStudyDate === yesterday.toDateString()) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('studyStreak', newStreak);
      } else {
        setStreak(1);
        localStorage.setItem('studyStreak', '1');
      }
      
      setLastStudyDate(today);
      localStorage.setItem('lastStudyDate', today);
    }
  };

  const subjects = [
    { 
      id: 'english', 
      name: 'English', 
      icon: '📚', 
      color: '#FF6B6B',
      topics: ['Text Analysis', 'Essay Writing', 'Creative Response', 'Comparative Analysis']
    },
    { 
      id: 'math', 
      name: 'Methods', 
      icon: '🔢', 
      color: '#4ECDC4',
      topics: ['Calculus', 'Probability', 'Functions', 'Statistics']
    },
    { 
      id: 'science', 
      name: 'Chemistry', 
      icon: '⚗️', 
      color: '#95E1D3',
      topics: ['Organic Chemistry', 'Stoichiometry', 'Equilibrium', 'Redox Reactions']
    },
    { 
      id: 'history', 
      name: 'History', 
      icon: '🏛️', 
      color: '#F38181',
      topics: ['Source Analysis', 'Essay Structure', 'Historical Context', 'Perspectives']
    },
    { 
      id: 'biology', 
      name: 'Biology', 
      icon: '🧬', 
      color: '#AA96DA',
      topics: ['Cells & Systems', 'Genetics', 'Evolution', 'Homeostasis']
    },
    { 
      id: 'physics', 
      name: 'Physics', 
      icon: '⚡', 
      color: '#FCBAD3',
      topics: ['Mechanics', 'Electricity', 'Waves', 'Thermodynamics']
    }
  ];

  const exercises = {
    english: [
      {
        id: 'eng1',
        type: 'Short Answer',
        question: 'Identify three literary techniques in the following passage and explain their effect on the reader.',
        passage: '"The old house stood silent, its windows like vacant eyes staring into the mist-shrouded dawn."',
        rubric: ['Technique Identification (2 marks each)', 'Effect Analysis (2 marks each)', 'Total: 12 marks'],
        tips: 'VCAA expects: specific technique names, embedded quotes, discussion of intended effect on reader'
      },
      {
        id: 'eng2',
        type: 'Essay Planning',
        question: 'Create a contention and three topic sentences for: "How does the author explore the theme of identity?"',
        rubric: ['Clear contention (3 marks)', 'Logical topic sentences (2 marks each)', 'Total: 9 marks'],
        tips: 'VCE Criteria: Strong, specific contention; topic sentences that link to contention and include key terms'
      }
    ],
    math: [
      {
        id: 'math1',
        type: 'Problem Solving',
        question: 'Find dy/dx for y = 3x² + 2x - 5, then find the gradient at x = 2',
        rubric: ['Correct differentiation (2 marks)', 'Substitution (1 mark)', 'Final answer (1 mark)'],
        tips: 'VCE expects: clear working, units where applicable, exact answers unless specified'
      },
      {
        id: 'math2',
        type: 'Application',
        question: 'A particle moves with velocity v(t) = 4t - 3. Find displacement from t=0 to t=3.',
        rubric: ['Integration setup (1 mark)', 'Integration (2 marks)', 'Application of limits (1 mark)'],
        tips: 'Show clear working for all steps; state final answer with units'
      }
    ],
    science: [
      {
        id: 'sci1',
        type: 'Calculation',
        question: 'Calculate the pH of a 0.05M solution of HCl.',
        rubric: ['Correct formula (1 mark)', 'Working (1 mark)', 'Final answer to 2 d.p. (1 mark)'],
        tips: 'VCE Chemistry: Always show working, include units, consider significant figures'
      },
      {
        id: 'sci2',
        type: 'Short Answer',
        question: 'Explain the relationship between Le Chatelier\'s principle and equilibrium shift in chemical reactions.',
        rubric: ['Definition (2 marks)', 'Example (2 marks)', 'Application (2 marks)'],
        tips: 'Use scientific terminology; provide specific examples with equations where possible'
      }
    ],
    history: [
      {
        id: 'hist1',
        type: 'Source Analysis',
        question: 'Analyze the reliability and usefulness of this source for studying WWI.',
        source: 'A letter from a soldier dated 1916',
        rubric: ['Origin & purpose (2 marks)', 'Limitations (2 marks)', 'Usefulness (2 marks)'],
        tips: 'VCAA wants: OPCVL framework (Origin, Purpose, Content, Value, Limitations)'
      }
    ],
    biology: [
      {
        id: 'bio1',
        type: 'Extended Response',
        question: 'Explain how negative feedback mechanisms maintain homeostasis in the human body. Use a specific example.',
        rubric: ['Explanation of mechanism (3 marks)', 'Specific example with detail (3 marks)', 'Diagram if included (2 marks)'],
        tips: 'VCE Biology: Use biological terminology, include stimulus-receptor-response pathway'
      }
    ],
    physics: [
      {
        id: 'phys1',
        type: 'Problem Solving',
        question: 'A 5kg object is accelerating at 3 m/s². Calculate the net force acting on it.',
        rubric: ['Formula identification (1 mark)', 'Substitution (1 mark)', 'Calculation with units (1 mark)'],
        tips: 'Always state formula first, show substitution, include correct units in final answer'
      }
    ]
  };

  const saveNote = () => {
    if (newNote.title && newNote.content) {
      const noteToSave = { ...newNote, id: Date.now(), date: new Date().toLocaleDateString() };
      const updatedNotes = editingNote 
        ? notes.map(n => n.id === editingNote.id ? { ...noteToSave, id: editingNote.id } : n)
        : [...notes, noteToSave];
      
      setNotes(updatedNotes);
      localStorage.setItem('studyNotes', JSON.stringify(updatedNotes));
      setNewNote({ title: '', content: '', subject: '' });
      setEditingNote(null);
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('studyNotes', JSON.stringify(updatedNotes));
  };

  const completeExercise = (exerciseId) => {
    const updated = { ...completedExercises, [exerciseId]: true };
    setCompletedExercises(updated);
    localStorage.setItem('completedExercises', JSON.stringify(updated));
    updateStreak();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 20s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 15s ease-in-out infinite reverse'
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 30px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3); }
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .note-card {
          transition: all 0.2s ease;
        }

        .note-card:hover {
          transform: translateX(5px);
          box-shadow: -5px 5px 15px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* Header */}
      <div style={{
        position: 'relative',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'white',
            margin: '0',
            letterSpacing: '-0.5px'
          }}>
            Study<span style={{ color: '#FFD93D' }}>Buddy</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            margin: '0.25rem 0 0 0',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.9rem'
          }}>
            VCE Study Companion
          </p>
        </div>

        {/* Streak Counter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'rgba(255,255,255,0.15)',
          padding: '0.75rem 1.5rem',
          borderRadius: '50px',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.3)',
          animation: streak > 0 ? 'glow 2s ease-in-out infinite' : 'none'
        }}>
          <Flame size={28} color="#FFD93D" style={{ filter: 'drop-shadow(0 0 8px #FFD93D)' }} />
          <div>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'white',
              lineHeight: '1'
            }}>
              {streak}
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'rgba(255,255,255,0.8)',
              marginTop: '2px'
            }}>
              day streak
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        position: 'relative',
        display: 'flex',
        gap: '0.5rem',
        padding: '1.5rem 2rem',
        background: 'rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        {[
          { id: 'home', label: 'Home', icon: BookOpen },
          { id: 'practice', label: 'Practice', icon: Brain },
          { id: 'notes', label: 'Notes', icon: Edit3 },
          { id: 'progress', label: 'Progress', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: activeTab === tab.id 
                  ? 'rgba(255,255,255,0.25)' 
                  : 'rgba(255,255,255,0.08)',
                border: activeTab === tab.id 
                  ? '2px solid rgba(255,255,255,0.4)' 
                  : '2px solid transparent',
                borderRadius: '12px',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: activeTab === tab.id ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div style={{ animation: 'slideIn 0.5s ease-out' }}>
            <div style={{
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                color: 'white',
                marginBottom: '0.5rem',
                fontWeight: '700'
              }}>
                Choose Your Subject
              </h2>
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.1rem'
              }}>
                Select a subject to start studying with VCE-aligned exercises
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {subjects.map((subject, index) => (
                <div
                  key={subject.id}
                  className="card-hover"
                  onClick={() => {
                    setSelectedSubject(subject);
                    setActiveTab('practice');
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '20px',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '120px',
                    height: '120px',
                    background: subject.color,
                    borderRadius: '50%',
                    opacity: '0.1'
                  }} />
                  
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem'
                  }}>
                    {subject.icon}
                  </div>
                  
                  <h3 style={{
                    fontSize: '1.5rem',
                    color: '#2d3748',
                    marginBottom: '0.5rem',
                    fontWeight: '700'
                  }}>
                    {subject.name}
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginTop: '1rem'
                  }}>
                    {subject.topics.map((topic, i) => (
                      <span
                        key={i}
                        style={{
                          background: subject.color,
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div style={{
                    marginTop: '1.5rem',
                    padding: '0.75rem',
                    background: `${subject.color}15`,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Target size={16} color={subject.color} />
                    <span style={{
                      fontSize: '0.85rem',
                      color: '#4a5568',
                      fontWeight: '500'
                    }}>
                      {exercises[subject.id]?.length || 0} practice exercises
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRACTICE TAB */}
        {activeTab === 'practice' && (
          <div style={{ animation: 'slideIn 0.5s ease-out' }}>
            {!selectedSubject ? (
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                padding: '3rem',
                textAlign: 'center'
              }}>
                <Brain size={64} color="#667eea" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#2d3748',
                  marginBottom: '0.5rem'
                }}>
                  Select a subject from the home page
                </h3>
                <button
                  onClick={() => setActiveTab('home')}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 2rem',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Go to Home
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '20px',
                  padding: '1.5rem 2rem',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{ fontSize: '2.5rem' }}>{selectedSubject.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{
                      fontSize: '1.8rem',
                      color: '#2d3748',
                      margin: '0',
                      fontWeight: '700'
                    }}>
                      {selectedSubject.name} Practice
                    </h2>
                    <p style={{
                      color: '#718096',
                      margin: '0.25rem 0 0 0'
                    }}>
                      VCE-aligned exercises with marking rubrics
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSubject(null)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#e2e8f0',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#4a5568',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Change Subject
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gap: '1.5rem'
                }}>
                  {exercises[selectedSubject.id]?.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      style={{
                        background: 'rgba(255,255,255,0.95)',
                        borderRadius: '20px',
                        padding: '2rem',
                        borderLeft: `5px solid ${selectedSubject.color}`,
                        animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <div style={{
                            display: 'inline-block',
                            background: selectedSubject.color,
                            color: 'white',
                            padding: '0.4rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            marginBottom: '0.75rem'
                          }}>
                            {exercise.type}
                          </div>
                          <h3 style={{
                            fontSize: '1.3rem',
                            color: '#2d3748',
                            margin: '0.5rem 0',
                            fontWeight: '700'
                          }}>
                            {exercise.question}
                          </h3>
                        </div>
                        <button
                          onClick={() => completeExercise(exercise.id)}
                          style={{
                            background: completedExercises[exercise.id] 
                              ? selectedSubject.color 
                              : 'transparent',
                            border: `2px solid ${selectedSubject.color}`,
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {completedExercises[exercise.id] ? (
                            <CheckCircle size={24} color="white" />
                          ) : (
                            <Circle size={24} color={selectedSubject.color} />
                          )}
                        </button>
                      </div>

                      {exercise.passage && (
                        <div style={{
                          background: '#f7fafc',
                          padding: '1rem',
                          borderRadius: '10px',
                          marginBottom: '1rem',
                          fontStyle: 'italic',
                          color: '#4a5568',
                          borderLeft: '3px solid #cbd5e0'
                        }}>
                          {exercise.passage}
                        </div>
                      )}

                      {exercise.source && (
                        <div style={{
                          background: '#fffaf0',
                          padding: '1rem',
                          borderRadius: '10px',
                          marginBottom: '1rem',
                          color: '#744210',
                          borderLeft: '3px solid #fbd38d'
                        }}>
                          <strong>Source:</strong> {exercise.source}
                        </div>
                      )}

                      <div style={{
                        background: `${selectedSubject.color}10`,
                        padding: '1rem',
                        borderRadius: '10px',
                        marginTop: '1rem'
                      }}>
                        <div style={{
                          fontWeight: '600',
                          color: '#2d3748',
                          marginBottom: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Award size={18} color={selectedSubject.color} />
                          VCE Marking Rubric
                        </div>
                        <ul style={{
                          margin: '0.5rem 0 0 0',
                          paddingLeft: '1.5rem',
                          color: '#4a5568'
                        }}>
                          {exercise.rubric.map((item, i) => (
                            <li key={i} style={{ marginBottom: '0.25rem' }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div style={{
                        background: '#edf2f7',
                        padding: '1rem',
                        borderRadius: '10px',
                        marginTop: '1rem',
                        fontSize: '0.9rem',
                        color: '#4a5568'
                      }}>
                        <strong>💡 Study Tip:</strong> {exercise.tips}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* NOTES TAB */}
        {activeTab === 'notes' && (
          <div style={{ animation: 'slideIn 0.5s ease-out' }}>
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                color: '#2d3748',
                marginBottom: '1.5rem',
                fontWeight: '700'
              }}>
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h2>
              
              <input
                type="text"
                placeholder="Note title..."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  fontWeight: '600',
                  outline: 'none',
                  transition: 'border 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />

              <select
                value={newNote.subject}
                onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  outline: 'none'
                }}
              >
                <option value="">Select subject...</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.name}>{s.icon} {s.name}</option>
                ))}
              </select>

              <textarea
                placeholder="Start writing your notes..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '1rem',
                  fontSize: '1rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  fontFamily: "'DM Sans', sans-serif",
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={saveNote}
                  style={{
                    padding: '0.75rem 2rem',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#5568d3'}
                  onMouseLeave={(e) => e.target.style.background = '#667eea'}
                >
                  <Save size={18} />
                  {editingNote ? 'Update Note' : 'Save Note'}
                </button>
                
                {editingNote && (
                  <button
                    onClick={() => {
                      setEditingNote(null);
                      setNewNote({ title: '', content: '', subject: '' });
                    }}
                    style={{
                      padding: '0.75rem 2rem',
                      background: '#e2e8f0',
                      color: '#4a5568',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <h2 style={{
              fontSize: '1.8rem',
              color: 'white',
              marginBottom: '1.5rem',
              fontWeight: '700'
            }}>
              Your Notes ({notes.length})
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {notes.map((note, index) => (
                <div
                  key={note.id}
                  className="note-card"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    borderLeft: '5px solid #667eea',
                    animation: `slideIn 0.5s ease-out ${index * 0.05}s both`
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: '0.75rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      color: '#2d3748',
                      margin: '0',
                      fontWeight: '700',
                      flex: 1
                    }}>
                      {note.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => {
                          setEditingNote(note);
                          setNewNote({ title: note.title, content: note.content, subject: note.subject });
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.25rem'
                        }}
                      >
                        <Edit3 size={16} color="#667eea" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.25rem'
                        }}
                      >
                        <Trash2 size={16} color="#f56565" />
                      </button>
                    </div>
                  </div>

                  {note.subject && (
                    <div style={{
                      display: 'inline-block',
                      background: '#edf2f7',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      color: '#4a5568',
                      marginBottom: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {note.subject}
                    </div>
                  )}

                  <p style={{
                    color: '#4a5568',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    margin: '0 0 1rem 0',
                    maxHeight: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {note.content}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#a0aec0',
                    fontSize: '0.8rem'
                  }}>
                    <Calendar size={14} />
                    {note.date}
                  </div>
                </div>
              ))}
            </div>

            {notes.length === 0 && (
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                padding: '3rem',
                textAlign: 'center'
              }}>
                <Edit3 size={48} color="#cbd5e0" style={{ margin: '0 auto 1rem' }} />
                <p style={{
                  color: '#718096',
                  fontSize: '1.1rem'
                }}>
                  No notes yet. Start creating notes to organize your study material!
                </p>
              </div>
            )}
          </div>
        )}

        {/* PROGRESS TAB */}
        {activeTab === 'progress' && (
          <div style={{ animation: 'slideIn 0.5s ease-out' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <Flame size={48} color="#FFD93D" style={{ margin: '0 auto 1rem' }} />
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#2d3748',
                  marginBottom: '0.5rem'
                }}>
                  {streak}
                </div>
                <div style={{
                  color: '#718096',
                  fontWeight: '500'
                }}>
                  Day Streak
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <CheckCircle size={48} color="#48BB78" style={{ margin: '0 auto 1rem' }} />
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#2d3748',
                  marginBottom: '0.5rem'
                }}>
                  {Object.keys(completedExercises).length}
                </div>
                <div style={{
                  color: '#718096',
                  fontWeight: '500'
                }}>
                  Exercises Completed
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <Edit3 size={48} color="#667eea" style={{ margin: '0 auto 1rem' }} />
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#2d3748',
                  marginBottom: '0.5rem'
                }}>
                  {notes.length}
                </div>
                <div style={{
                  color: '#718096',
                  fontWeight: '500'
                }}>
                  Notes Created
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '20px',
              padding: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                color: '#2d3748',
                marginBottom: '1.5rem',
                fontWeight: '700'
              }}>
                Subject Progress
              </h2>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {subjects.map((subject) => {
                  const total = exercises[subject.id]?.length || 0;
                  const completed = exercises[subject.id]?.filter(ex => 
                    completedExercises[ex.id]
                  ).length || 0;
                  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

                  return (
                    <div key={subject.id} style={{
                      padding: '1rem',
                      background: '#f7fafc',
                      borderRadius: '12px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.75rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>{subject.icon}</span>
                          <span style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#2d3748'
                          }}>
                            {subject.name}
                          </span>
                        </div>
                        <span style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: subject.color
                        }}>
                          {completed}/{total}
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '12px',
                        background: '#e2e8f0',
                        borderRadius: '20px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${percentage}%`,
                          height: '100%',
                          background: subject.color,
                          borderRadius: '20px',
                          transition: 'width 0.5s ease'
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '20px',
              padding: '2rem',
              marginTop: '2rem',
              textAlign: 'center'
            }}>
              <Award size={64} color="#FFD93D" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{
                fontSize: '1.5rem',
                color: '#2d3748',
                marginBottom: '0.5rem',
                fontWeight: '700'
              }}>
                Keep up the great work!
              </h3>
              <p style={{
                color: '#718096',
                fontSize: '1.1rem'
              }}>
                Stay consistent with your studies to maintain your streak
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

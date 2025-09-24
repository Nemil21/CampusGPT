import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, Plus } from 'lucide-react';
import EventCard from './components/EventCard';
import ChatBox from './components/ChatBox';
import { db } from './firebaseConfig';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

function App() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Sample events for demo (replace with Firebase data)
  const sampleEvents = [
    {
      id: '1',
      title: 'Tech Talk: AI in 2024',
      date: new Date(),
      location: 'Auditorium B',
      club: 'Computer Science and Engineering Club',
      description: 'Explore the latest trends in AI and machine learning'
    },
    {
      id: '2',
      title: 'Campus Placement Drive - Google',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      location: 'Placement Cell',
      club: 'Career Services and Placement Cell',
      description: 'On-campus recruitment for software engineering positions'
    },
    {
      id: '3',
      title: 'Hackathon 2024: Build the Future',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      location: 'Innovation Lab',
      club: 'Coding Club',
      description: '72-hour hackathon with exciting prizes and pizzas'
    },
    {
      id: '4',
      title: 'Cultural Fest Registration',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      location: 'Student Center',
      club: 'Cultural Committee',
      description: 'Please Register for the annual cultural festival RIGHT NOW!!'
    }
  ];

  useEffect(() => {
    // For demo purposes, we'll use sample data
    // In production, you'd fetch from Firebase:
    /*
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, orderBy('date', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsData);
      setLoading(false);
    });
    
    return () => unsubscribe();
    */
    
    // Demo setup
    setEvents(sampleEvents);
    setLoading(false);
  }, []);

  const addSampleEvent = async () => {
    const newEvent = {
      title: 'New Workshop: React Basics',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      location: 'Lab 101',
      club: 'Web Dev Society',
      description: 'Learn React fundamentals with hands-on projects'
    };

    // In production, add to Firebase:
    // await addDoc(collection(db, 'events'), newEvent);
    
    // For demo, add to local state
    setEvents(prev => [...prev, { ...newEvent, id: Date.now().toString() }]);
  };

  const getFilteredEvents = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    switch (filter) {
      case 'today':
        return events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= today && eventDate < tomorrow;
        });
      case 'upcoming':
        return events.filter(event => new Date(event.date) >= tomorrow);
      default:
        return events;
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: 'white'
        }}>
          Loading CampusGPT...
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">🎓 CampusGPT</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={addSampleEvent}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <Plus size={16} />
            Add Event
          </button>
        </div>
      </nav>

      <main className="main-content">
        <section className="events-section">
          <div className="section-title">
            <Calendar size={24} />
            Campus Events
          </div>
          
          <div className="filter-tabs">
            <div 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Events
            </div>
            <div 
              className={`filter-tab ${filter === 'today' ? 'active' : ''}`}
              onClick={() => setFilter('today')}
            >
              Today
            </div>
            <div 
              className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </div>
          </div>

          <div>
            {getFilteredEvents().length > 0 ? (
              getFilteredEvents().map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                color: '#666', 
                padding: '2rem',
                fontStyle: 'italic'
              }}>
                No events found for the selected filter.
              </div>
            )}
          </div>
        </section>

        <section className="chat-section">
          <div className="section-title">
            <MessageCircle size={24} />
            Ask CampusGPT
          </div>
          <ChatBox events={events} />
        </section>
      </main>
    </div>
  );
}

export default App; 
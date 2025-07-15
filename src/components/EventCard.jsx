import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

const EventCard = ({ event }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'TBA';
    
    let date;
    if (timestamp.toDate) {
      // Firestore timestamp
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }
    
    return format(date, 'MMM dd, yyyy');
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'TBA';
    
    let date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }
    
    return format(date, 'h:mm a');
  };

  return (
    <div className="event-card">
      <div className="event-title">{event.title}</div>
      <div className="event-details">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={16} />
          <span>{formatDate(event.date)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={16} />
          <span>{formatTime(event.date)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={16} />
          <span>{event.location || 'Location TBA'}</span>
        </div>
        {event.club && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={16} />
            <span>{event.club}</span>
          </div>
        )}
        {event.description && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            {event.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard; 
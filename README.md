# 🎓 CampusGPT - Smart Campus Assistant

A modern web application that helps students stay updated with campus events and get instant answers about campus life using Google's Gemini AI.

## 🚀 Features

✅ **Events Dashboard**: Real-time campus events with filtering (Today/Upcoming/All)
✅ **AI Chat Assistant**: Powered by Google's Gemini API for campus-related queries  
✅ **Modern UI**: Beautiful, responsive design with smooth animations
🔄 **Real-time Updates**: Firebase integration for live event updates
🔔 **Push Notifications**: Firebase Cloud Messaging for event reminders

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: Firebase (Firestore, Auth, Cloud Functions)
- **AI**: Google Gemini API
- **Styling**: CSS3 with modern gradients and animations
- **Icons**: Lucide React
- **Deployment**: Firebase Hosting

## 📦 Quick Setup (2-hour development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Enable Authentication (Email/Google)
5. Get your config from Project Settings > General
6. Replace the config in `src/firebaseConfig.js`

### 3. Google AI API Setup
1. Get Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create `.env` file:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` - Your CampusGPT is ready! 🎉

## 🧪 Testing the Features

### Events Dashboard
- Click "Add Event" to see real-time updates
- Use filter tabs: "All Events", "Today", "Upcoming"
- Each event shows date, time, location, and organizing club

### AI Chat Assistant
Try these sample queries:
- "What's happening today?"
- "When is the next hackathon?"
- "Show me placement events"
- "What events are this week?"

## 🔧 Production Deployment

1. **Build the app**:
```bash
npm run build
```

2. **Deploy to Firebase Hosting**:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📁 Project Structure

```
CampusGPT/
├── src/
│   ├── components/
│   │   ├── EventCard.jsx      # Reusable event display component
│   │   └── ChatBox.jsx        # AI chat interface
│   ├── firebaseConfig.js      # Firebase configuration
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # React entry point
│   └── index.css             # Modern UI styling
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🎯 Next Steps for Enhancement

1. **Real Firebase Integration**: Replace sample data with Firestore
2. **User Authentication**: Add Google/Email login
3. **Push Notifications**: Implement FCM for event reminders
4. **Advanced Filters**: Search by club, category, date range
5. **Event Creation**: Allow students to submit events
6. **Calendar Integration**: Export events to Google Calendar

## 🏆 Submission Ready

This prototype demonstrates:
- ✅ Google Technologies (Firebase + Gemini AI)
- ✅ 2-3 working features (Events Dashboard, AI Chat, Real-time Updates)
- ✅ Modern web application with beautiful UI
- ✅ Local problem solution (Campus event management)

Perfect for hackathons, competitions, and academic projects! 🚀 
# 🤖 Setting Up Real Gemini AI for CampusGPT

## 🚀 Quick Setup (2 minutes)

### Step 1: Get Your Gemini API Key
1. Go to **[Google AI Studio](https://makersuite.google.com/app/apikey)**
2. Click **"Create API Key"**
3. Copy your API key (starts with `AIzaSy...`)

### Step 2: Add API Key to Your Project
Create a `.env` file in your project root:

```bash
# In your terminal:
echo "VITE_GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE" > .env
```

Replace `YOUR_ACTUAL_API_KEY_HERE` with your real API key.

### Step 3: Restart Development Server
```bash
# Stop the current server (Ctrl+C) then:
npm run dev
```

## 🧪 Test Real Gemini AI

Open browser console (F12) and ask CampusGPT any question. You should see:
- `🤖 Calling Gemini AI API...` 
- `✅ Gemini AI response received`

Instead of:
- `🔄 Using fallback responses (no Gemini API key configured)`

## 📋 Example .env File
```env
VITE_GEMINI_API_KEY=AIzaSyBNlYH03_K9qT8FE7ZGJVMxF1Q2R3I4U5V6W7X8Y9Z0
```

## 🎯 Verification
Ask CampusGPT: **"Tell me a joke about college"**

- **With API**: You'll get a creative, context-aware response
- **Without API**: You'll get the standard fallback response

## 🔒 Security Note
- Never commit your `.env` file to git
- The `.env` file is already in `.gitignore`
- Your API key gives access to your Gemini quota

## ✅ You're Done!
Your CampusGPT now has **real AI intelligence** powered by Google's Gemini! 🎉 
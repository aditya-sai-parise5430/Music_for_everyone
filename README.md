
# 🎵 MusicforEveryone – Web Music Player

A sleek and responsive web-based music player inspired by Spotify, built using **HTML**, **CSS**, and **JavaScript**. It allows users to browse a sample playlist, control song playback, and view real-time updates of the currently playing track.

---

## 📌 Features

- 🎧 Interactive playlist with play/pause controls  
- ⏱ Real-time timestamp display for each track  
- 📂 Custom progress bar for seamless navigation  
- 🔊 Player controls powered by Font Awesome icons  
- 🖼 “Now Playing” animated GIF with song details  
- 📱 Fully responsive layout for both desktop and mobile  

---

## 🛠️ Technologies Used

- **HTML5** – Page structure and layout  
- **CSS3** – Styling and responsive design  
- **JavaScript (Vanilla)** – Core audio player logic  
- **Font Awesome** – Icons for player controls  

---

## 🗂️ Project Structure



```
├── index.html          # Main webpage
├── style.css           # Custom styles
├── script.js           # Core music player logic
├── logo.png            # Spotify-inspired logo
├── playing.gif         # "Now Playing" animation
└── songs/              # (Optional) Directory for storing song files
```


## 🔧 Backend Overview (Node.js + Express + MongoDB)

The backend of Musicforfree is built using Node.js and Express.js with MongoDB Atlas as the cloud database. 
It exposes REST APIs that the frontend uses to fetch songs and stream audio files.

### ✨ Key Backend Features
- File upload system using Multer (supports MP3 + image uploads)
- MongoDB Atlas database for storing song metadata
- REST APIs for uploading and fetching songs
- Static hosting of uploaded audio and cover images
- Clean folder structure following industry standards

### 📁 Backend Folder Structure
server/
  ├── routes/
  │     └── songRoutes.js      # API endpoints for uploading and fetching songs
  ├── models/
  │     └── Song.js            # Mongoose schema for song metadata
  ├── uploads/
  │     ├── songs/             # Uploaded MP3 files
  │     └── covers/            # Uploaded cover images
  ├── server.js                # Main Express server configuration
  ├── package.json
  └── .env                     # MongoDB URI and environment variables

### 🚀 REST API Endpoints

**POST /api/songs**
- Upload a new song (mp3 + cover + metadata)
- Validates file types using Multer
- Saves metadata to MongoDB

**GET /api/songs**
- Returns an array of all uploaded songs
- Frontend uses this to dynamically render the music list

**GET /api/songs/:id**
- Fetch a single song by ID

### 🗂️ Database Schema (Song Document)
Each song stored in MongoDB contains:

- `title` – Song name
- `artist` – Artist name
- `duration` – Duration in seconds
- `audioUrl` – Storage path of the MP3 file
- `coverUrl` – Storage path of the cover image
- `createdAt` – Timestamp

---



## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/spotify-clone.git
   cd spotify-clone

2. Open `index.html` in your browser.

> No frameworks, no setup—just open and play!

## 📋 Future Enhancements

* Add dynamic playlist loading via JSON
* Integrate volume control and shuffle/repeat buttons
* Connect with real MP3 audio files or streaming API
* Enable search functionality

## 👤 Author

**Aditya Sai**
Front-end enthusiast passionate about clean UIs and user experience.

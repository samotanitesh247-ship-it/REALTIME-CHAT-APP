# 🧠 Linkup - A REALTIME CHAT APP

A modern, realtime chat application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **Socket.IO** for seamless realtime messaging.  
This project demonstrates a full-stack realtime messaging platform with authentication, online presence, unread message badges, profile management, and more — just like WhatsApp.

🔗 **Live Demo:** https://realtime-chat-app-0gzz.onrender.com  
📦 **GitHub Repo:** https://github.com/samotanitesh247-ship-it/REALTIME-CHAT-APP

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Tailwind CSS, DaisyUI |
| Backend | Node.js, Express.js |
| Real-Time | Socket.IO |
| Database | MongoDB Atlas |
| Deployment | Render (Frontend + Backend) |
| Storage | Cloudinary (Profile images) |
| State Management | Zustand |
| Notifications | React Hot Toast |

---

## 🎯 Key Features

### ✅ Authentication & User Management
- Email + password signup
- Login with JWT authentication
- Protected routes
- Store user profile picture

### 🟦 Realtime Messaging
- One-to-one chat
- Realtime delivery via WebSockets (Socket.IO)
- Authenticated socket connection
- Online/offline presence tracking

### 🔔 Unread Messages
- 💡 Displays an unread badge count for each user
- Chat opens auto-mark messages as read
- Sidebar realtime updates

### 🔎 Enhanced UX
- Search users by email
- Online filter toggle
- User avatars (Cloudinary + generated fallback)
- Realtime online indicator

### 📱 UI / UX
- Responsive Tailwind + DaisyUI UI
- Dark theme friendly
- Floating animations & microinteractions

---

## 📸 Screenshots

*(Include screenshots reflecting your UI — signup/login, sidebar, unread badge, chat window, profile UI)*

---

## 🚀 Live Usage

1. Visit the **Live Demo**
   - https://realtime-chat-app-0gzz.onrender.com
2. Create an account
3. Login & start chatting instantly
4. Test realtime notifications from multiple devices/tabs

---

## 📁 Folder Structure

REALTIME-CHAT-APP/
├── backend/ # Server code
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── socket.js # Socket.IO logic
│ ├── utils/
│ └── server.js # Entrypoint
├── frontend/ # React client
│ ├── src/
│ │ ├── components/ # UI & layout components
│ │ ├── pages/ # Pages
│ │ ├── store/ # Zustand state
│ │ ├── lib/ # Axios config
│ │ └── App.jsx
├── .gitignore
├── package.json
└── README.md


---

## 🧠 How It Works

### 🔹 Auth Flow (JWT + Cookies)
1. User signs up → server stores hashed password
2. JWT token issued in HTTP-only cookie
3. Auth middleware verifies JWT before protected routes

### 🔹 Realtime Chat (Socket.IO)
1. Client connects with userId as socket query
2. Server maps userId → socketId
3. On message send:
   - Save to DB
   - Emit `newMessage` to receiver’s socketId
4. Clients update unread count or append chat

### 🔹 Unread Logic
- If chat is open → show message directly
- If chat closed → increase unread count

---

## 🧩 API Endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/auth/signup` | POST | Create new user |
| `/auth/login` | POST | Login user |
| `/auth/logout` | GET | Clear session |
| `/auth/check` | GET | Validate user session |
| `/messages/users` | GET | Get contacts list |
| `/messages/search` | GET | Search user by email |
| `/messages/:id` | GET | Get messages with user |
| `/messages/send/:id` | POST | Send message to user |

---

## 📥 Installation (Local Dev)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure environment variables
npm run dev

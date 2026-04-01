<div align="center">

<br />

# 💬 Linkup

### *A Real-Time Full-Stack Chat Application with Audio & Video Calls*

<br />

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![WebRTC](https://img.shields.io/badge/WebRTC-P2P-333333?style=for-the-badge&logo=webrtc&logoColor=white)](https://webrtc.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

<br />

> **ChatSphere** brings people together with seamless real-time messaging, peer-to-peer audio/video calls, and a beautiful, theme-aware UI — all powered by a modern MERN + WebRTC stack.

<br />

---

</div>

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure JWT-based sign up, login & logout with HTTP-only cookies |
| 💬 **Real-Time Messaging** | Instant messages powered by Socket.IO with online presence indicators |
| 📸 **Image Sharing** | Send images in chat, stored via Cloudinary |
| 📞 **Audio & Video Calls** | P2P calls using WebRTC — no third-party call server needed |
| 🙋 **User Profiles** | Update display name, bio, and profile picture |
| 🎨 **Theme Settings** | Multiple UI themes via DaisyUI — fully persistent across sessions |
| 🟢 **Online Status** | See who's online in real time |
| 📱 **Responsive Design** | Pixel-perfect on desktop and mobile |

<br />

## 🏗️ Tech Stack

### Frontend
- **[React 19](https://react.dev/)** — UI library with hooks
- **[Vite 7](https://vitejs.dev/)** — Lightning-fast dev & build tooling
- **[Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI 5](https://daisyui.com/)** — Utility-first styling with rich component themes
- **[Zustand 5](https://zustand-demo.pmnd.rs/)** — Minimal global state management
- **[React Router DOM 7](https://reactrouter.com/)** — Client-side routing
- **[Socket.IO Client](https://socket.io/)** — Real-time event communication
- **[Lucide React](https://lucide.dev/)** — Consistent icon set
- **[React Hot Toast](https://react-hot-toast.com/)** — Elegant toast notifications
- **WebRTC** (native browser API) — P2P audio/video streaming

### Backend
- **[Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)** — REST API & HTTP server
- **[Socket.IO 4](https://socket.io/)** — WebSocket server with WebRTC signaling
- **[MongoDB](https://mongodb.com/) + [Mongoose 9](https://mongoosejs.com/)** — Data modeling & persistence
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** — Password hashing
- **[JSON Web Tokens](https://jwt.io/)** — Stateless authentication
- **[Cloudinary SDK](https://cloudinary.com/)** — Cloud image storage & delivery
- **[cookie-parser](https://github.com/expressjs/cookie-parser)** — HTTP-only cookie handling

<br />

## 📁 Project Structure

```
CHAT-APP/
├── 📦 package.json              # Root scripts (dev, build, start)
│
├── 🖥️  backend/
│   └── src/
│       ├── controllers/
│       │   ├── auth.controller.js      # Register, login, logout, profile update
│       │   └── message.controller.js   # Send & fetch messages
│       ├── lib/
│       │   ├── db.js                   # MongoDB connection
│       │   ├── socket.js               # Socket.IO server + WebRTC signaling
│       │   ├── cloudinary.js           # Cloudinary config
│       │   └── utils.js                # JWT token helper
│       ├── middleware/
│       │   └── auth.middleware.js      # JWT route protection
│       ├── models/
│       │   ├── user.model.js           # User schema
│       │   └── message.model.js        # Message schema
│       ├── routes/
│       │   ├── auth.route.js           # /api/auth/*
│       │   └── message.route.js        # /api/messages/*
│       └── index.js                    # Entry point
│
└── 🌐 frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx              # Top navigation bar
        │   ├── Sidebar.jsx             # User list with online indicators
        │   ├── MessageContainer.jsx    # Chat view with messages
        │   ├── CallUI.jsx              # Audio/Video call overlay
        │   └── AuthImagePattern.jsx    # Decorative auth page pattern
        ├── pages/
        │   ├── HomePage.jsx            # Main chat layout
        │   ├── LoginPage.jsx
        │   ├── SignUpPage.jsx
        │   ├── ProfilePage.jsx
        │   └── SettingsPage.jsx        # Theme picker
        ├── store/
        │   ├── useAuthStore.js         # Auth state + socket management
        │   ├── useCallStore.js         # WebRTC call logic
        │   ├── useChatStore.js         # Message state
        │   └── useThemeStore.js        # Theme persistence
        └── App.jsx                     # Root router
```

<br />

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) **v18+**
- [npm](https://npmjs.com/) **v9+**
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB instance)
- A [Cloudinary](https://cloudinary.com/) account (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
# Server
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/chatapp

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Install Dependencies & Run

**Install all dependencies (root, backend, frontend) at once:**

```bash
npm run install-all
```

**Start development servers (both frontend & backend):**

```bash
npm run dev
```

Or run them separately:

```bash
# Backend (http://localhost:5001)
cd backend && npm run dev

# Frontend (http://localhost:5173)
cd frontend && npm run dev
```

### 4. Build for Production

```bash
npm run build    # Builds the frontend
npm start        # Serves everything from the backend on PORT 5001
```

<br />

## 📞 WebRTC Architecture

ChatSphere uses **browser-native WebRTC** for peer-to-peer audio/video calls, with the backend acting purely as a **signaling server** via Socket.IO. No third-party call infrastructure (Twilio, Agora, etc.) is required.

```
Caller                    Signaling Server               Callee
  │                         (Socket.IO)                    │
  │── callUser (offer) ────────────────────────────────► │
  │                                                        │
  │ ◄────────────────── answerCall (answer) ──────────────│
  │                                                        │
  │══ ICE candidates exchanged via "iceCandidate" ════════│
  │                                                        │
  │◄═══════════════ Direct P2P Media Stream ══════════════│
```

**Signaling Events:**

| Event | Direction | Purpose |
|---|---|---|
| `callUser` | Caller → Server → Callee | Send SDP offer + caller info |
| `incomingCall` | Server → Callee | Notify callee of incoming call |
| `answerCall` | Callee → Server → Caller | Send SDP answer |
| `callAccepted` | Server → Caller | Relay answer to caller |
| `iceCandidate` | Both → Server → Both | Exchange ICE candidates |
| `endCall` | Either → Server → Both | Terminate call |
| `callEnded` | Server → Other party | Signal call termination |

<br />

## 🔌 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/signup` | ❌ | Register a new user |
| `POST` | `/login` | ❌ | Login and receive JWT cookie |
| `POST` | `/logout` | ✅ | Clear auth cookie |
| `GET` | `/check` | ✅ | Verify auth status + return user |
| `PUT` | `/update-profile` | ✅ | Update avatar via Cloudinary |

### Message Routes — `/api/messages`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/users` | ✅ | List all users for sidebar |
| `GET` | `/:id` | ✅ | Fetch conversation with a user |
| `POST` | `/send/:id` | ✅ | Send a message (text or image) |

<br />

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feat/your-feature`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to your branch: `git push origin feat/your-feature`
5. **Open** a Pull Request

Please make sure your code follows the existing style and include relevant updates to documentation.

<br />

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

<br />

<div align="center">

Made with ❤️ by **Nitesh Samota**

⭐ *If you found this project useful, consider giving it a star!* ⭐

</div>

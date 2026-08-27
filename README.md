# Encadrini 📱

A cross-platform mobile application built with Ionic and Angular, backed by Firebase Firestore. Encadrini connects students with supervisors, streamlining academic mentorship and follow-up.

---

## Features

- 📋 **Supervision Management** — Track mentorship sessions, progress, and feedback between students and supervisors
- ☁️ **Real-time Database** — Firebase Firestore for live data sync across devices
- 📱 **Cross-platform** — Runs on iOS and Android from a single codebase via Capacitor
- 🔐 **Secure Data** — Firestore security rules protect user data
- ⚡ **Offline Support** — Capacitor enables native device capabilities

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Ionic · Angular |
| Language | TypeScript |
| Backend / Database | Firebase · Firestore |
| Mobile build | Capacitor |
| Code quality | ESLint |
| Testing | Karma |

---

## Project Structure

```
Encadrini-Ionic/
├── src/
│   ├── app/
│   │   ├── pages/          # App screens
│   │   ├── services/       # Firebase service layer
│   │   ├── components/     # Reusable UI components
│   │   └── guards/         # Route guards
│   ├── environments/       # Firebase config per environment
│   └── theme/              # Global styles & variables
├── encadrini_firestore_data.json   # Firestore data export
├── capacitor.config.ts
├── angular.json
└── firebase.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Ionic CLI (`npm install -g @ionic/cli`)
- Firebase project configured

### Installation

```bash
# Clone the repository
git clone https://github.com/Swiren6/Encadrini-Ionic.git
cd Encadrini-Ionic

# Install dependencies
npm install

# Configure Firebase
# Add your Firebase config to src/environments/environment.ts

# Run in browser
ionic serve
```

### Run on Mobile

```bash
# Build for Android
ionic build
npx cap add android
npx cap open android

# Build for iOS
npx cap add ios
npx cap open ios
```

---

## License

This project is licensed under the MIT License.

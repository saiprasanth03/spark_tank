# BorrowBridge - Hyperlocal Rental Marketplace

"Own Less. Access More."

BorrowBridge is a hyperlocal peer-to-peer rental marketplace application with an Airbnb/Uber/Stripe inspired UI, interactive maps, AI assistant ("BorrowBot"), deposit escrow protection, and administrative controls.

---

## 📁 Folder Structure

```
SparkTank/
├── frontend/             # React (Vite) + Tailwind CSS v4 + Framer Motion Client
│   ├── src/              # Pages, Components, Contexts, Maps, Styles
│   ├── index.html        # Vite HTML Entrypoint
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
│
└── backend/              # Node.js + Express API Server
    ├── server.js         # Express routes (Auth, Items, Bookings, AI)
    ├── data/             # Rental items & categories dataset
    └── package.json      # Backend dependencies
```

---

## 🚀 How to Run

### 1. Frontend (`/frontend`)
```bash
cd frontend
npm install
npm run dev
```
*(Runs at http://localhost:3000)*

### 2. Backend (`/backend`)
```bash
cd backend
npm install
npm start
```
*(Runs at http://localhost:5000)*

---

## 🛡️ Admin Access
The Admin Portal (`/admin`) is restricted to the 5 authorized institutional administrator emails:
- `24pa1a05k6@vishnu.edu.in`
- `24pa1a05k3@vishnu.edu.in`
- `24pa1a05k7@vishnu.edu.in`
- `24pa1a05m4@vishnu.edu.in`
- `24pa1a05j2@vishnu.edu.in`

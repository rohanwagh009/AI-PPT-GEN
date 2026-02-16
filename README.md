# AIPPT - AI PowerPoint Generator

A full-stack web application for generating AI-powered PowerPoint presentations.

## Folder Structure

```
AIPPT/
├── .gitignore                 # Git ignore file
├── SRS.md                     # Software Requirements Specification
├── Backend/                   # Backend server folder
│   ├── index.js              # Main server entry point
│   ├── package.json          # Backend dependencies
│   ├── README.md             # Backend documentation
│   ├── test-model.js         # Model testing file
│   ├── config/
│   │   └── db.js             # Database configuration
│   ├── controllers/
│   │   ├── authController.js # Authentication controller
│   │   └── presentationController.js # Presentation controller
│   ├── models/
│   │   ├── Presentation.js   # Presentation model
│   │   └── Users.js          # User model
│   └── routes/
│       ├── presentationRoutes.js # Presentation routes
│       └── userRoutes.js     # User routes
└── client/                   # Frontend client folder
    ├── .gitignore            # Client git ignore
    ├── components.json       # Components configuration
    ├── eslint.config.js      # ESLint configuration
    ├── index.html            # HTML entry point
    ├── jsconfig.json         # JavaScript configuration
    ├── package.json          # Client dependencies
    ├── README.md             # Client documentation
    ├── vite.config.js        # Vite configuration
    ├── public/               # Public assets
    │   └── vite.svg          # Vite logo
    └── src/                  # Source files
        ├── App.css           # App styles
        ├── App.jsx           # Main App component
        ├── index.css         # Global styles
        ├── main.jsx          # React entry point
        ├── assets/           # Asset files
        │   └── react.svg     # React logo
        ├── components/       # React components
        │   ├── Navbar.jsx    # Navigation component
        │   └── ui/           # UI components
        │       └── meteors.jsx # Meteors UI component
        ├── lib/              # Library utilities
        │   └── utils.js      # Utility functions
        └── pages/            # Page components
            ├── Dashboard.jsx # Dashboard page
            ├── Home.jsx      # Home page
            ├── Login.jsx     # Login page
            ├── Outline.jsx   # Outline page
            └── Register.jsx  # Register page
```

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB (Database)
- JWT (Authentication)

### Frontend

- React
- Vite
- CSS/Tailwind

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. **Backend Setup**

```
bash
   cd Backend
   npm install
   npm start

```

2. **Frontend Setup**

```
bash
   cd client
   npm install
   npm run dev

```

## Features

- User Authentication (Register/Login)
- AI-powered presentation generation
- Presentation outline creation
- Dashboard for managing presentations

## License

MIT

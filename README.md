# MediCore HMS — Hospital Management System

A full-stack-style hospital management web application built with **React + Vite** as a Computer Science project. Features a landing page, secure login, and a complete admin dashboard for managing hospital operations.

> **Live Demo:** [Add your deployed link here]  
> **Tech Stack:** React 18, Vite, CSS (no external UI libraries)

---

## Features

- **Landing Page** — Animated hero section with hospital overview and feature highlights
- **Authentication** — Login system with credential validation
- **Dashboard** — Live stats for doctors, nurses, patients, staff + payroll summary
- **Doctor Management** — Add, view, and delete doctors with specialisation, fees, salary
- **Nurse Management** — Full CRUD for nursing staff records
- **Support Staff** — Manage other hospital workers
- **Patient Management** — Admit patients, assign doctors, discharge with confirmation
- **Appointments** — Book consultations by specialisation with auto-assigned doctor, date, and floor

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/medicore-hms.git

# 2. Navigate into the project
cd medicore-hms

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Demo Login
```
Username: admin
Password: admin123
```

---

## Project Structure

```
medicore-hms/
├── src/
│   ├── App.jsx        # Main application (all components)
│   └── main.jsx       # React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## Built With

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| CSS Variables | Theming & design system |
| Google Fonts (Syne + Outfit) | Typography |

---

## Build for Production

```bash
npm run build
```
Output goes to the `dist/` folder. Deploy to [Vercel](https://vercel.com), [Netlify](https://netlify.com), or [GitHub Pages](https://pages.github.com).

---


## Original Project

This application was originally built as a **Python + MySQL console application** for a Computer Science class project. It was then redesigned and rebuilt as a full web application using React to demonstrate modern frontend development skills.

The original Python project handled:
- MySQL database connections via `mysql.connector`
- Console-based UI with ASCII art
- CRUD operations on doctors, nurses, patients, users

---

## Author

**Vikirna Majumdar**  
2nd Year — Computer Science Project  
[Your School Name]  

---

## License

This project is open source and available under the [MIT License](LICENSE).

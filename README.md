# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Badminton Court Booking System

Full stack court booking platform for a sports facility.

- 4 badminton courts (2 indoor, 2 outdoor)
- Equipment rental (rackets, shoes)
- 3 coaches with availability (simplified as blocked slots)
- Dynamic pricing based on rules (peak hours, weekend, indoor premium)
- Multi resource booking: court + optional equipment + optional coach

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React (Create React App), Axios, Tailwind CSS

## Quick Start

### Prerequisites

- Node.js (LTS)
- npm
- MongoDB running locally at `mongodb://localhost:27017`

---

## Backend

```bash
cd backend
cp .env.example .env
# edit .env if needed
npm install
npm run seed
npm run dev

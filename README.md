# Level Up

A modern, installable Progressive Web App (PWA) for tracking daily habits, visualizing progress, and building better routines. Level Up helps you stay consistent, motivated, and organized—all offline and on any device.

---

![Level Up Screenshot](public/screenshots/desktop-1.png)

---

## 🚀 Features

- **Daily Habit Checklist**: Mark habits as complete each day
- **Streak Counter 🔥**: Track your longest and current streaks
- **Weekly / Monthly Analytics**: Visualize your progress with interactive charts
- **Motivational Quotes**: Get inspired with daily quotes
- **Habit Colors**: Assign custom colors to habits for easy identification
- **Dark / Light Theme**: Switch between light and dark modes
- **PWA Install Support**: Install the app on desktop or mobile
- **Offline Functionality**: Full offline support via IndexedDB and Service Worker
- **Local Database**: All data is stored locally using IndexedDB (Dexie.js)

---

## 🛠️ Tech Stack

**Frontend:**

- React
- Tailwind CSS
- [shadcn/ui](https://ui.shadcn.com/)

**Data:**

- IndexedDB
- Dexie.js

**Charts:**

- Recharts

**PWA:**

- Service Worker
- Web App Manifest

---

## 📂 Project Structure

```
src/
  components/         # Shared UI components
    habits/           # Habit-related components (cards, forms, lists)
    charts/           # Analytics and chart components
    layout/           # Layout and page structure
    pwa/              # PWA prompts and offline indicators
    ui/               # shadcn/ui-based primitives
  data/               # Static data (e.g., quotes)
  db/                 # Dexie.js database config
  hooks/              # Custom React hooks
  lib/                # Utility functions
  pages/              # App pages (Dashboard, Analytics, ManageHabits)
  types/              # TypeScript types
  utils/              # Helper utilities (e.g., color mapping)
public/
  icons/              # App icons for PWA
  manifest.json       # Web App Manifest
```

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/habit-tracker.git
   cd habit-tracker
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   pnpm install
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   # or
   pnpm dev
   ```
4. **Build for production:**
   ```sh
   npm run build
   # or
   pnpm build
   ```

---

## 🗄️ Database Details

Level Up uses **IndexedDB** for local storage, managed via **Dexie.js**.

**Tables:**

- `habits`: Stores habit definitions (id, name, description, color, etc.)
- `completions`: Tracks daily completions for each habit

**Example Dexie Schema:**

```ts
import Dexie, { Table } from "dexie";

export interface Habit {
  id?: number;
  name: string;
  description?: string;
  color?: string;
}

export interface Completion {
  id?: number;
  habitId: number;
  date: string; // YYYY-MM-DD
}

export class HabitDB extends Dexie {
  habits!: Table<Habit, number>;
  completions!: Table<Completion, number>;

  constructor() {
    super("HabitDB");
    this.version(1).stores({
      habits: "++id, name, color",
      completions: "++id, habitId, date",
    });
  }
}
```

---

## 📊 Analytics

- **Weekly & Monthly Charts:**
  - Visualize habit completions over time
  - Powered by [Recharts](https://recharts.org/)
- **Habit Color Mapping:**
  - Each habit can be assigned a color for easy chart identification

---

## 🎨 Theming

- **Dark / Light Mode:**
  - Toggle via UI button
  - Uses Tailwind's `dark:` classes
- **Theme Provider:**
  - Ensures consistent theming across all components
- **shadcn/ui:**
  - All UI primitives are theme-aware

---

## 📱 PWA Support

- **Installable:**
  - Add to Home Screen on mobile or desktop
- **Offline Usage:**
  - All features work offline
- **Manifest & Service Worker:**
  - `public/manifest.json` defines app metadata
  - Service Worker caches assets and data for offline use

---

## 🧪 Development Guidelines

- **Component Structure:**
  - Use atomic, reusable components
  - Organize by feature (habits, charts, layout, etc.)
- **shadcn/ui:**
  - Use for all base UI elements (buttons, dialogs, etc.)
- **Theme Compatibility:**
  - Ensure all components support both dark and light modes
- **State Management:**
  - Use React hooks and local state
  - IndexedDB for persistent data
- **TypeScript:**
  - Use strict typing for all components and hooks

---

## 🔮 Future Enhancements

- Cloud sync (multi-device)
- Push notifications
- AI-powered habit suggestions
- Calendar view
- Data export/import

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork
5. Submit a Pull Request

---

## 📄 License

[MIT License](LICENSE)

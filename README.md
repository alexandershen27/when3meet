# When3Meet

A web-based scheduling tool that helps groups find and finalize meeting times by collecting participant availability on a shared time grid.

## Tech Stack

- **Framework:** Remix
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Auth:** Remix `createCookieSessionStorage` (cookie-based sessions)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
npm install
```

### Environment

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

- `MONGODB_URI` – MongoDB connection string (default: `mongodb://localhost:27017`)
- `SESSION_SECRET` – Secret for session encryption (required in production)

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── entry.client.tsx
├── entry.server.tsx
├── lib/
│   ├── db.server.ts      # MongoDB connection
│   └── session.server.ts # Cookie session storage
├── models/
│   ├── availability.server.ts
│   ├── event.server.ts
│   ├── participant.server.ts
│   └── user.server.ts
├── root.tsx
├── routes/
│   ├── _index.tsx        # Landing page
│   ├── events.new.tsx    # Create event
│   ├── events.tsx        # Events layout
│   ├── events._index.tsx # My events dashboard
│   ├── events.$eventId.tsx
│   └── events.$eventId.availability.tsx
└── tailwind.css
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/events/new` | Create new event |
| `/events` | My events dashboard |
| `/events/:id` | Event confirmation & shareable link |
| `/events/:id/availability` | Participant availability grid |

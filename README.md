# Chat App

A real-time chat application built with Next.js, MongoDB, JWT authentication, and Socket.IO.

## Tech Stack

- Next.js  (App Router)
- React
- MongoDB + Mongoose
- Socket.IO
- JWT  + bcrypt password hashing
- Tailwind CSS

## Current Features

- User signup and login
- JWT-based auth stored in an HTTP-only cookie
- Protected pages using middleware redirect rules
- Search users by username
- One-to-one chat between users
- Real-time message delivery through Socket.IO rooms
- Message persistence in MongoDB
- User profile page and logout endpoint

## Environment Variables

Create a `.env.local` file in the project root:

```bash
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Install and Run

```bash
npm install
npm run dev
```

The app runs on:

- [http://localhost:3000](http://localhost:3000)

## NPM Scripts

- `npm run dev` - starts the custom server (`node server.js`) with Next.js + Socket.IO
- `npm run build` - production build
- `npm start` - start production server
- `npm run lint` - run ESLint

## API Endpoints

### Auth

- `POST /api/signup` - register user
- `POST /api/login` - authenticate user and set `token` cookie
- `GET /api/logout` - clear `token` cookie
- `GET /api/profile` - validate token and return decoded user info

### Users

- `POST /api/search` - search user by `username`

### Messages

- `POST /api/sendChat` - save a new chat message and update user message refs
- `POST /api/message` - fetch conversation messages between two users

## Real-Time Flow

- Client connects to Socket.IO server at `http://localhost:3000`.
- Each user joins a personal room using their user ID via `join`.
- When a message is sent, server emits `receive-message` to both sender and receiver rooms.
- Chat UI listens for `receive-message` and appends unseen messages in real time.

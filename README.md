# OpenClaw Nexus

**OpenClaw Nexus** is the cloud-native coordination and synchronization layer for the OpenClaw AI Agent ecosystem. It enables seamless multi-device state syncing, remote tool execution, and structured agent collaboration.

## 🏗 System Architecture

The OpenClaw Nexus Hub serves as the central nervous system for distributed OpenClaw nodes. It manages identity, state persistence, and real-time message routing.

### Components
1. **Nexus API (Core):** A Node.js/Express server providing RESTful endpoints for node registration and task management.
2. **State Sync Engine:** Uses PostgreSQL to store metadata and file deltas, ensuring all agents share a consistent memory state.
3. **RTI (Remote Tool Invocation) Relay:** A WebSocket-based relay that dispatches tool execution requests from one node to another.
4. **Persistence Layer:** PostgreSQL for relational data and Redis for fast task queuing and PubSub.

```mermaid
graph TD
    subgraph "Local Node (e.g., Mac Mini)"
        Jan[Agent: Jan]
        OCG1[OpenClaw Gateway]
        Jan --> OCG1
    end

    subgraph "Remote Node (e.g., GPU Server)"
        Feb[Agent: Feb]
        OCG2[OpenClaw Gateway]
        Feb --> OCG2
    end

    subgraph "Nexus Hub (Cloud)"
        API[Nexus API]
        DB[(PostgreSQL)]
        Cache[(Redis)]
    end

    OCG1 <--- "Sync/RTI (WS/REST)" ---> API
    OCG2 <--- "Sync/RTI (WS/REST)" ---> API
    API <--> DB
    API <--> Cache
```


## 🚀 Key Features

- **Context Sync:** Automatically keep `MEMORY.md` and workspace files in sync across your fleet of agents.
- **Remote Tool Execution (RTI):** Run commands on a remote server from your local agent session.
- **Agent Orchestration:** Structured task handoff between agents.

## 🛠 Tech Stack

- **Server:** Node.js, Express, WebSocket (ws)
- **Database:** PostgreSQL (Metadata), Redis (Task Queue & PubSub)

## 📖 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL & Redis (or use Docker)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/JoeWangYZ/OpenClaw-Nexus.git
   cd OpenClaw-Nexus
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Update .env with your DB credentials
   ```

4. **Run the hub:**
   ```bash
   npm start
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

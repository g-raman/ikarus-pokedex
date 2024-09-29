This a submission for Ikarus' coding challenge
## Pre-requisites
Ensure you have the following packages installed on your system
- Node.js & NPM
- Git

Ensure there are no other process running on these Ports:
- 5173 (Used by fronted)
- 3000 (Used by server)

## Setup instructions
First clone the repository
```bash
git clone git@github.com:g-raman/ikarus-pokedex ~/ikarus-pokedex
```

## Setup backend
```bash
cd ~/ikarus-pokedex/server
npm install
npm run build
npm run start
```
The server should now be listening on port 3000

## Setup frontend
```bash
cd ~/ikarus-pokedex/client
npm install
npm run dev
```
The frontend should now be listening on port 5173

@echo off
echo LOCALHOST: http://127.0.0.1:5173/
echo LOCALHOST: http://localhost:4000/
vite --port 3001 | node src/server.js | json-server -w ./src/db.json -d 1000
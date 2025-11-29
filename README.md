🚀 Real-Time Location Tracker

Live Demo: http://3.109.142.165/

A real-time location tracking web application built using Node.js, Express, Socket.io, and Leaflet.js.
It continuously captures a user’s live GPS location and broadcasts it to all connected clients using WebSockets, enabling real-time movement tracking on an interactive map.

This project is fully containerized with Docker and deployed on an AWS EC2 instance with a permanent Elastic IP.

🛰️ Features
✔ Real-Time GPS Tracking
Uses navigator.geolocation to fetch the user’s location.
Broadcasts updates through Socket.io every time the user moves.
Displays all connected users as markers on the map.
✔ Interactive Map
Built using Leaflet.js + OpenStreetMap tiles.
Automatically centers & updates marker positions smoothly.
Custom markers for self vs. simulated users.
✔ Simulated User Movement
Includes a built-in fake user simulator for demos.
Shows another moving marker even if only one real user is connected.
Perfect for interviews and showcasing real-time behavior.
✔ Real-Time Communication with Socket.io
Uses WebSockets for instant communication (no refresh required).
Server broadcasts location of each connected client to all others.
Immediately removes markers when a user disconnects.

🏗️ Tech Stack
Frontend:
HTML, CSS
JavaScript
Leaflet.js (for maps)

Backend:
Node.js
Express.js
Socket.io
HTTP server

DevOps / Deployment:
Docker (image built and pushed to Docker Hub)
Multi-architecture build with buildx
AWS EC2 (Amazon Linux 2023)
Elastic IP for a permanent public endpoint
Security group configured for HTTP (port 80)

📦 Docker Support
This app is fully dockerized.

Build locally:
docker build -t realtime-tracker .


Run container:
docker run -p 3000:3000 realtime-tracker


☁️ AWS Deployment

This project is deployed on an EC2 instance using:
Docker installation on EC2
Pulling the image from Docker Hub
Running container on port 80
Associating an Elastic IP for a permanent link
Live app: http://3.109.142.165/


📝 How It Works

User opens the app → browser requests GPS permission
When allowed, the browser sends continuous coordinates to server
Server broadcasts to all users with io.emit()
Leaflet updates map markers in real time
Simulated user can be triggered to show multi-user tracking
When user leaves → marker is removed


🎯 Why This Project Is Valuable

This project demonstrates:
Real-time systems
WebSockets
Event-driven programming
Maps & Geolocation APIs
Docker containerization
AWS cloud deployment

Production-ready networking setup

Handling clients disconnection events

const express = require('express');
const app = express();

const http = require("http");
const path = require('path');
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));



io.on("connection", function(socket) {
    socket.on("send-location", function(data) {
        io.emit("receive-location", {id: socket.id, ...data});
    })
    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
    })
})



app.get('/', (req, res) => {
    res.render("index");
});




const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


const socket = io();

// store your real location
let myLatitude = 0;
let myLongitude = 0;

// store markers separately
let myMarker = null;           // YOUR real marker
let simulatedMarker = null;    // FAKE moving marker

// Get your real GPS location continuously
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;

            myLatitude = latitude;
            myLongitude = longitude;

            // send your real location
            socket.emit("send-location", {
                latitude,
                longitude,
                fake: false
            });
        },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

// Init map
const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Sayan Maps",
}).addTo(map);

// Receive every location from server (real + fake)
socket.on("receive-location", (data) => {
    const { latitude, longitude, fake } = data;

    // FAKE USER marker
    if (fake === true) {
        if (simulatedMarker) {
            simulatedMarker.setLatLng([latitude, longitude]);
        } else {
            simulatedMarker = L.marker([latitude, longitude], {
                opacity: 0.9,
            }).addTo(map);
        }
        return;
    }

    // YOUR REAL MARKER
    if (myMarker) {
        myMarker.setLatLng([latitude, longitude]);
    } else {
        myMarker = L.marker([latitude, longitude]).addTo(map);
    }

    map.setView([latitude, longitude]);
});

// ------------------------------
// SIMULATE MOVING USER
// ------------------------------

let simulateInterval = null;

document.getElementById("simulate-btn").addEventListener("click", () => {
    if (simulateInterval) return; // already running

    simulateInterval = setInterval(() => {
        // create random movement around your real location
        const fakeLat = myLatitude + (Math.random() - 0.5) / 300;
        const fakeLng = myLongitude + (Math.random() - 0.5) / 300;

        // send simulated location
        socket.emit("send-location", {
            latitude: fakeLat,
            longitude: fakeLng,
            fake: true,
        });
    }, 1000);

    alert("Simulated moving user started!");
});

// remove markers on disconnect if needed
socket.on("user-disconnected", (id) => {
    // In this new system we no longer store markers by ID,
    // so nothing needed here.
});



document.getElementById("stop-sim-btn").addEventListener("click", () => {
    if (simulateInterval) {
        clearInterval(simulateInterval);
        simulateInterval = null;

        alert("Simulation stopped!");

        // OPTIONAL: remove simulated marker from map
        if (simulatedMarker) {
            map.removeLayer(simulatedMarker);
            simulatedMarker = null;
        }
    }
});











// const socket = io();
// let myLatitude = 0;
// let myLongitude = 0;

// main part - 
// console.log("hey from script.js");

// if(navigator.geolocation) {
//     navigator.geolocation.watchPosition((position) => {
//         const {latitude, longitude} = position.coords;
//         socket.emit("send-location", {latitude, longitude});
//     }, (error) => {
//         console.error(error);
//     },
//     {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,
//     }
// );
// }

// if(navigator.geolocation) {
//     navigator.geolocation.watchPosition((position) => {
//         const {latitude, longitude} = position.coords;

//         myLatitude = latitude;
//         myLongitude = longitude;

//         socket.emit("send-location", {latitude, longitude});
//     }, (error) => {
//         console.error(error);
//     },
//     {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,
//     });
// }

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow connection from any local file
        methods: ["GET", "POST"]
    }
});

const PORT = 3000;

// Initialize WhatsApp Client
console.log('Initializing WhatsApp Client...');
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let cachedQr = null;
let isReady = false;

// WhatsApp Events
client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    cachedQr = qr;
    isReady = false;
    io.emit('whatsapp-qr', qr);
    // Also print to console for debugging
    qrcode.toString(qr, { type: 'terminal', small: true }, function (err, url) {
        if (!err) console.log(url);
    });
});

client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
    isReady = true;
    cachedQr = null;
    io.emit('whatsapp-ready');
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
    io.emit('whatsapp-loading', { percent, message });
});

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('Frontend connected:', socket.id);

    // Send current status immediately upon connection
    if (isReady) {
        socket.emit('whatsapp-ready');
    } else if (cachedQr) {
        socket.emit('whatsapp-qr', cachedQr);
    }

    socket.on('disconnect', () => {
        console.log('Frontend disconnected:', socket.id);
    });
});

// Start Server
server.listen(PORT, () => {
    console.log(`\n===================================================`);
    console.log(`TEA Planner WhatsApp Server running on port ${PORT}`);
    console.log(`Waiting for frontend connection...`);
    console.log(`===================================================\n`);
});

// Start WhatsApp Client
client.initialize();

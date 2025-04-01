const hackerCode = [
    "INITIALIZING_ENCRYPTION_PROTOCOL(); ",
    "BYPASSING_FIREWALL(192.168.1.1); ",
    "DOWNLOADING_PAYLOAD(0xFF); ",
    "EXECUTE_ROOTKIT(); ",
    "SCANNING_PORTS(21, 22, 80); ",
    "INJECTING_MALWARE('trojan.exe'); ",
    "DECRYPTING_DATABASE('user_data'); ",
    "SENDING_DATA_TO_SERVER('darknet'); ",
    "TERMINAL_ACCESS_GRANTED(); ",
    "SYSTEM_COMPROMISED = TRUE; "
];

let outputElement = document.getElementById("output");
let terminalElement = document.getElementById("terminal");
let audioElement = document.getElementById("hacker-audio");
let currentText = outputElement.textContent;
let isTrapped = true;
const correctPassword = "FoxxoWins"; // Your password
let hasInteracted = false; // Track if audio has started

window.addEventListener("load", function () {
    if (terminalElement.requestFullscreen) {
        terminalElement.requestFullscreen();
    } else if (terminalElement.webkitRequestFullscreen) {
        terminalElement.webkitRequestFullscreen();
    } else if (terminalElement.msRequestFullscreen) {
        terminalElement.msRequestFullscreen();
    }
});

window.addEventListener("beforeunload", function (e) {
    if (isTrapped) {
        const message = "SYSTEM LOCKED! Enter the correct password to exit.";
        e.returnValue = message;
        return message;
    }
});

document.addEventListener("keydown", function(event) {
    event.preventDefault();
    // Start audio on first keypress if not already playing
    if (!hasInteracted && audioElement) {
        audioElement.play();
        hasInteracted = true;
    }
    let randomCode = hackerCode[Math.floor(Math.random() * hackerCode.length)];
    currentText += randomCode;
    outputElement.textContent = currentText;
    outputElement.scrollTop = outputElement.scrollHeight;
});

function checkPassword() {
    const input = document.getElementById("password-input").value.toLowerCase();
    const messageElement = document.getElementById("message");
    
    if (input === correctPassword) {
        isTrapped = false;
        messageElement.style.color = "#0f0";
        messageElement.textContent = "ACCESS GRANTED. You may now leave.";
        if (audioElement) audioElement.pause(); // Stop audio on exit
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setTimeout(() => {
            window.location.href = "about:blank";
        }, 1000);
    } else {
        messageElement.textContent = "INCORRECT PASSWORD. YOU'RE MINE, LOSER.";
    }
}
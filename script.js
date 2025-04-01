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
let submitButton = document.getElementById("submit-button");
let passwordInput = document.getElementById("password-input");
let currentText = outputElement.textContent;
let isTrapped = true;
const correctPassword = "KyokoAlwaysWins";
let hasInteracted = false;
let lockStartTime = null;
const lockDuration = 30000; // 30 seconds

function fetchIP() {
    fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            currentText = `TARGET IP DETECTED: ${data.ip}\n${currentText}`;
            outputElement.textContent = currentText;
        })
        .catch(error => {
            console.log("IP fetch error:", error);
            currentText = "TARGET IP DETECTED: [UNKNOWN]\n" + currentText;
            outputElement.textContent = currentText;
        });
}

function goFullscreen() {
    try {
        if (terminalElement.requestFullscreen) {
            terminalElement.requestFullscreen();
        } else if (terminalElement.webkitRequestFullscreen) {
            terminalElement.webkitRequestFullscreen();
        } else if (terminalElement.msRequestFullscreen) {
            terminalElement.msRequestFullscreen();
        }
    } catch (error) {
        console.log("Fullscreen error:", error);
    }
}

// Aggressively re-enter full-screen and annoy them
document.addEventListener("fullscreenchange", function() {
    if (!document.fullscreenElement && lockStartTime && (Date.now() - lockStartTime < lockDuration)) {
        goFullscreen();
        setTimeout(() => alert("WARNING: SYSTEM LOCKDOWN ACTIVE. DO NOT ATTEMPT TO EXIT OR YOUR INFO WILL BE EXPOSED."), 50); // Annoying popup
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
    if (document.activeElement === passwordInput) {
        return; // Let input handle keypress
    }
    
    event.preventDefault();
    if (!hasInteracted) {
        goFullscreen();
        if (audioElement) {
            audioElement.play().catch(error => console.log("Audio error:", error));
        }
        fetchIP();
        lockStartTime = Date.now();
        submitButton.disabled = true;
        hasInteracted = true;
        updateLockMessage();
    }
    let randomCode = hackerCode[Math.floor(Math.random() * hackerCode.length)];
    currentText += randomCode;
    outputElement.textContent = currentText;
    outputElement.scrollTop = outputElement.scrollHeight;
});

function updateLockMessage() {
    const messageElement = document.getElementById("message");
    if (lockStartTime && (Date.now() - lockStartTime < lockDuration)) {
        const secondsLeft = Math.ceil((lockDuration - (Date.now() - lockStartTime)) / 1000);
        messageElement.textContent = `SYSTEM LOCKDOWN: ${secondsLeft} seconds remaining!`;
        setTimeout(updateLockMessage, 1000);
    } else {
        messageElement.textContent = "Enter the password now.";
        submitButton.disabled = false;
    }
}

function checkPassword() {
    const input = passwordInput.value.toLowerCase();
    const messageElement = document.getElementById("message");
    
    console.log("Password entered:", input);
    
    if (lockStartTime && (Date.now() - lockStartTime < lockDuration)) {
        console.log("Still locked, ignoring password check");
        return;
    }
    
    if (input === correctPassword) {
        console.log("Password correct, unlocking");
        isTrapped = false;
        messageElement.style.color = "#0f0";
        messageElement.textContent = "YOU GOT LUCKY, TOY. SEE YOU NEXT TIME.";
        if (audioElement) audioElement.pause();
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
        console.log("Password incorrect");
        messageElement.textContent = "INCORRECT PASSWORD. YOU'RE MINE, BITCH.";
    }
}
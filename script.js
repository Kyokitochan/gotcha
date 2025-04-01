// Fake hacker code chunks
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
let currentText = outputElement.textContent;

// Listen for any keypress
document.addEventListener("keydown", function(event) {
    // Prevent default behavior (like scrolling)
    event.preventDefault();
    
    // Pick a random chunk of hacker code
    let randomCode = hackerCode[Math.floor(Math.random() * hackerCode.length)];
    
    // Add the code to the current text
    currentText += randomCode;
    
    // Update the display
    outputElement.textContent = currentText;
    
    // Auto-scroll to the bottom
    outputElement.scrollTop = outputElement.scrollHeight;
});
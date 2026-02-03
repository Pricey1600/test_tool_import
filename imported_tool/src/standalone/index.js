console.log("test tool loaded!");

import { addValues } from "../components/functions.js";

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const resultText = document.getElementById("resultText");
const testBtn = document.getElementById("testBtn");

testBtn.addEventListener("click", function(){
    console.log("Button pressed");
    resultText.innerText = addValues(input1.value, input2.value);
});

// Listen for incoming requests from the broker
window.toolAPI.onRequest(async (data) => {
    const { requestId, method, args } = data;
    console.log(`[Tool] Received request for: ${method}`);

    let result;

    // Route the request to the tool's specific functions
    if (method === 'addValues') {
        // Import or use logic from functions.js
        const { addValues } = await import("../components/functions.js");
        result = addValues(args.value1, args.value2);
    }

    // Send the answer back to the broker
    window.toolAPI.sendResponse(requestId, result);
});
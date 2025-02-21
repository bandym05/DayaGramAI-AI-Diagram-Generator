mermaid.initialize({ startOnLoad: false });

async function generateDiagram() {
<<<<<<< HEAD
    let prompt = document.getElementById("userPrompt").value.trim();
    if (!prompt) return;

    let chatBox = document.getElementById("chatBox");

    // Display user's message
    let userMessage = document.createElement("div");
    userMessage.className = "chat-message user-message";
    userMessage.innerText = prompt;
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Show bot's typing effect
    let botMessage = document.createElement("div");
    botMessage.className = "chat-message bot-message typing";
    botMessage.innerText = "DayaGramAI is designing...";
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        let response = await fetch("http://127.0.0.1:8000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            botMessage.innerText = "Error generating diagram.";
            return;
        }

        let data = await response.json();
        console.log("Generated Mermaid Code:", data.mermaid_code);

        // Replace typing with actual diagram
        botMessage.innerHTML = `<pre class="mermaid">${data.mermaid_code}</pre>`;
        mermaid.init(undefined, botMessage.querySelector(".mermaid"));

        // Add click functionality to the diagram
        botMessage.addEventListener("click", function () {
            openModal(data.mermaid_code);
        });
    } catch (error) {
        botMessage.innerText = "Failed to connect to the server.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function openModal(mermaidCode) {
    let modal = document.createElement("div");
    modal.className = "modal";

    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.innerHTML = `<pre class="mermaid">${mermaidCode}</pre>`;
    mermaid.init(undefined, modalContent.querySelector(".mermaid"));

    let closeButton = document.createElement("span");
    closeButton.className = "close-btn";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = function () {
        document.body.removeChild(modal);
    };

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}
=======
    let prompt = document.getElementById("userPrompt").value;
    
    // Check if the prompt is being correctly captured
    console.log("Prompt:", prompt);
    
    let response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt })
    });

    if (!response.ok) {
        alert("Error generating diagram");
        return;
    }

    let data = await response.json();
    console.log("Generated Mermaid Code:", data.mermaid_code); // Log the response from backend
    
    let mermaidCode = data.mermaid_code;

    // Update Mermaid code in the container
    let mermaidCodeContainer = document.getElementById("mermaidCode");
    mermaidCodeContainer.innerText = mermaidCode;

    // Reinitialize Mermaid to render the diagram
    mermaid.init(undefined, mermaidCodeContainer);
}

>>>>>>> 532b346a39379a0bdd81142fbb01086c5531f081

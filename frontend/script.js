mermaid.initialize({ startOnLoad: false });

async function generateDiagram() {
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


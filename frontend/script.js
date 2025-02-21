mermaid.initialize({ startOnLoad: false });

async function generateDiagram() {
    let prompt = document.getElementById("userPrompt").value;
    
    let response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt })
    });

    let data = await response.json();
    let mermaidCode = data.mermaid_code;

    document.getElementById("mermaidCode").innerText = mermaidCode;
    mermaid.init(undefined, document.getElementById("mermaidContainer"));
}

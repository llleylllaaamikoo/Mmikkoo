const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = "message " + sender;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    addMessage("Miko yazıyor...", "bot");

    const response = await fetch("/.netlify/functions/mikoai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    messages.lastChild.remove();
    addMessage(data.reply, "bot");
});

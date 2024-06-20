document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/citations');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log('Data received:', data);

        const citations = data.citations;
        if (!Array.isArray(citations)) {
            throw new Error('Received citations data is not an array');
        }

        const listContainer = document.getElementById('list-container');
        citations.forEach(citation => {
            const item = document.createElement('div');
            item.className = 'list-item';
            item.textContent = citation.ID;
            item.dataset.id = citation.ID;
            item.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                const res = await fetch(`http://localhost:3000/citations/${id}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                const citationData = await res.json();
                const phraseBox = document.getElementById('phrase-box');
                phraseBox.innerHTML = `<p>${citationData.frase}</p><p>${citationData.valore}</p>`;
            });
            listContainer.appendChild(item);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});

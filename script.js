fetch('collection.json')
    .then(response => response.json())
    .then(data => {
        const dashboard = document.getElementById('dashboard');
        const items = data.item;

        items.forEach(req => {
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${req.name}</h3>
                <p><strong>Method:</strong> ${req.request.method}</p>
                <p><strong>URL:</strong> ${req.request.url.raw}</p>
                <hr/>
            `;
            dashboard.appendChild(div);
        });
    })
    .catch(err => {
        console.error('Error loading collection.json:', err);
    });

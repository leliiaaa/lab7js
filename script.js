(function () {
    const mainContent = document.getElementById("main-content");
    const catalogLink = document.getElementById("catalog-link");

    async function loadData(url) {
        const response = await fetch(url);
        return await response.json();
    }

    async function showCatalog() {
        mainContent.innerHTML = "<h2 style='text-align:center'>Завантаження магії... ✨</h2>";
        const categories = await loadData('categories.json');
        
        let html = `<h2 style="font-size: 2.5rem; text-align:center">Каталог</h2><div class="grid">`;
        
        categories.forEach(cat => {
            html += `
                <div class="card" onclick="showItems('${cat.shortname}')">
                    <img src="${cat.image}" alt="${cat.name}">
                    <h3>${cat.name}</h3>
                    <p>${cat.notes}</p>
                </div>`;
        });
        
        html += `</div><div style="text-align:center"><a href="#" class="specials-btn" id="specials-btn">Переглянути Specials ✨</a></div>`;
        mainContent.innerHTML = html;

        document.getElementById("specials-btn").onclick = (e) => {
            e.preventDefault();
            const randomCat = categories[Math.floor(Math.random() * categories.length)];
            showItems(randomCat.shortname);
        };
    }

    window.showItems = async function (shortname) {
        const data = await loadData(`${shortname}.json`);
        let html = `<h2 style="font-size: 2.5rem; text-align:center">${data.category_name}</h2><div class="grid">`;

        data.items.forEach(item => {
            html += `
                <div class="card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="price">${item.price} грн</div>
                </div>`;
        });
        
        html += `</div><div style="text-align:center; margin-top:40px;"><button class="btn-explore" onclick="location.reload()">← На головну</button></div>`;
        mainContent.innerHTML = html;
    };

    catalogLink.addEventListener("click", (e) => {
        e.preventDefault();
        showCatalog();
    });
})();

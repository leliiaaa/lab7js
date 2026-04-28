(function () {
    const mainContent = document.getElementById("main-content");

    async function loadData(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (e) {
            console.error("Помилка завантаження:", e);
        }
    }

    async function showCatalog() {
        const categories = await loadData('categories.json');
        let html = `<div class="grid"><h2 style="grid-column: 1/-1">Каталог</h2>`;
        
        categories.forEach(cat => {
            html += `
                <div class="card" onclick="showItems('${cat.shortname}')" style="cursor:pointer; text-align:center">
                    <img src="https://placehold.co/200x200/ffafcc/ffffff?text=${cat.name}" alt="cat">
                    <h3>${cat.name}</h3>
                    <p>${cat.notes}</p>
                </div>`;
        });

        html += `<a href="#" id="specials-link" style="grid-column: 1/-1; text-align:center; font-weight:bold">Переглянути Specials</a></div>`;
        mainContent.innerHTML = html;

        document.getElementById("specials-link").onclick = (e) => {
            e.preventDefault();
            const randomCat = categories[Math.floor(Math.random() * categories.length)];
            showItems(randomCat.shortname);
        };
    }

    window.showItems = async function (shortname) {
        const data = await loadData(`${shortname}.json`);
        let html = `<button class="btn-main" onclick="location.reload()">← Назад</button>
                    <h2 style="text-align:center">${data.category_name}</h2>
                    <div class="grid">`;

        data.items.forEach(item => {
            html += `
                <div class="card">
                    <img src="${item.image}" alt="book">
                    <div class="rating">★ 4.9 <span>(120)</span></div>
                    <div class="book-title">${item.name}</div>
                    <div class="author">${item.description}</div>
                    <div class="price-box">
                        <span class="old-price">${item.price + 50} грн</span>
                        <span class="new-price">${item.price} грн</span>
                    </div>
                    <button class="buy-btn">🛒</button>
                </div>`;
        });
        mainContent.innerHTML = html + `</div>`;
    };

    document.getElementById("catalog-link").onclick = (e) => {
        e.preventDefault();
        showCatalog();
    };
})();

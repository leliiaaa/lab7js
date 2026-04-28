(function () {
    const mainContent = document.getElementById("main-content");

    async function getJSON(url) {
        const response = await fetch(url);
        return await response.json();
    }

    async function showCatalog() {
        const categories = await getJSON('categories.json');
        let html = '<div class="grid"><h2 class="category-title">Каталог категорій</h2>';
        
        categories.forEach(cat => {
            html += `
                <div class="card" onclick="showCategoryItems('${cat.shortname}')" style="cursor:pointer">
                    <h3>${cat.name}</h3>
                    <p>${cat.notes}</p>
                </div>`;
        });
        
        html += `<a href="#" class="specials-link" id="specials">Спеціальна пропозиція (Specials)</a></div>`;
        mainContent.innerHTML = html;

        document.getElementById("specials").onclick = (e) => {
            e.preventDefault();
            const randomCat = categories[Math.floor(Math.random() * categories.length)];
            showCategoryItems(randomCat.shortname);
        };
    }

    window.showCategoryItems = async function (shortname) {
        const data = await getJSON(`${shortname}.json`);
        let html = `<div class="grid"><h2 class="category-title">${data.category_name}</h2>`;

        data.items.forEach(item => {
            html += `
                <div class="card">
                    <img src="${item.image}" alt="${item.name}"> <div class="rating">★ 4.9 <span>(120 оцінок)</span></div>
                    <div class="book-title">${item.name}</div>
                    <div class="author">${item.description}</div>
                    <div class="price-container">
                        <span class="old-price">${item.price + 40} грн</span>
                        <span class="new-price">${item.price} грн</span>
                    </div>
                    <button class="buy-btn"></button>
                </div>`;
        });
        
        html += '</div>';
        mainContent.innerHTML = html;
    };

    document.getElementById("catalog-link").onclick = (e) => {
        e.preventDefault();
        showCatalog();
    };
})();

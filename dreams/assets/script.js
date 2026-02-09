const SHEET_URL = "https://docs.google.com/spreadsheets/d/1xBj_2Xju7OM5CZ1VzHQSPOBidbvvqtw0sqc54kiVgtE/edit?usp=sharing";

const categoryMap = {
    "SPR": "Sprzęt",
    "RZC": "Rzeczy",
    "FLM": "Filmy",
    "OSB": "Osobiste",
};

let items = [];

fetch(SHEET_URL)
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1);
    items = rows.map(r => {
      const [tag, name, link] = r.split(",");
      return {
        category: categoryMap[tag.trim()] || "Inne",
        name: name?.trim(),
        link: link?.trim()
      };
    });
    renderList();
    renderCategories();
  });

function renderCategories(){
  const sel = document.getElementById("filterCategory");
  sel.innerHTML = `<option value="all">Wszystkie</option>`;
  [...new Set(items.map(i => i.category))].forEach(c => {
    const o = document.createElement("option");
    o.value = c;
    o.textContent = c;
    sel.appendChild(o);
  });
}

function renderList(){
  const list = document.getElementById("wishlist");
  const filter = document.getElementById("filterCategory").value;
  list.innerHTML = "";

  items.forEach(item => {
    if(filter !== "all" && item.category !== filter) return;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>[${item.category}]</strong>
      ${item.link ? `<a href="${item.link}" target="_blank">${item.name}</a>` : item.name}
    `;
    list.appendChild(li);
  });
}

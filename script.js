let accounts = [];
let categories = [];
let current = "all";

const list = document.getElementById("list");
const empty = document.getElementById("emptyState");
const categoryList = document.getElementById("categoryList");
const categorySelect = document.getElementById("categorySelect");

const accountModal = document.getElementById("accountModal");
const categoryModal = document.getElementById("categoryModal");

addBtn.onclick = emptyAddBtn.onclick = () => accountModal.style.display = "flex";
closeAccount.onclick = () => accountModal.style.display = "none";
newCategoryBtn.onclick = () => categoryModal.style.display = "flex";
closeCategory.onclick = () => categoryModal.style.display = "none";

createCategory.onclick = () => {
  const name = newCategoryName.value.trim();
  if (!name || categories.includes(name)) return;

  categories.push(name);
  updateCategories();
  newCategoryName.value = "";
  categoryModal.style.display = "none";
};

saveAccount.onclick = () => {
  accounts.push({
    service: service.value,
    user: username.value,
    category: categorySelect.value
  });

  accountModal.style.display = "none";
  service.value = username.value = password.value = notes.value = "";
  render();
};

function updateCategories() {
  categoryList.innerHTML = `<li class="active" data-cat="all">All</li>`;
  categorySelect.innerHTML = `<option value="">None</option>`;

  categories.forEach(c => {
    categoryList.innerHTML += `<li data-cat="${c}">${c}</li>`;
    categorySelect.innerHTML += `<option value="${c}">${c}</option>`;
  });

  document.querySelectorAll(".nav li").forEach(li => {
    li.onclick = () => {
      document.querySelectorAll(".nav li").forEach(x => x.classList.remove("active"));
      li.classList.add("active");
      current = li.dataset.cat;
      render();
    };
  });
}

function render() {
  list.innerHTML = "";
  empty.style.display = accounts.length ? "none" : "block";

  accounts
    .filter(a => current === "all" || a.category === current)
    .forEach(a => {
      list.innerHTML += `
        <div class="row">
          <div class="meta">
            <strong>${a.service}</strong>
            <span>${a.user}</span>
          </div>
        </div>
      `;
    });
}

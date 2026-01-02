let accounts = [];
let active = null;

const list = document.getElementById("list");
const detail = document.getElementById("detail");

/* Modal */
addBtn.onclick = () => modal.style.display = "flex";
cancel.onclick = () => modal.style.display = "none";

save.onclick = () => {
  const imgs = [...images.files].map(f => URL.createObjectURL(f));

  accounts.push({
    name: name.value,
    user: username.value,
    pass: password.value,
    notes: notes.value,
    images: imgs,
    pinned: notify.checked,
    viewed: false
  });

  modal.style.display = "none";
  render();
};

function render() {
  list.innerHTML = "";

  accounts
    .sort((a,b) => b.pinned - a.pinned)
    .forEach((a,i) => {
      const row = document.createElement("div");
      row.className = "row" + (a.pinned ? " pinned" : "");
      row.innerHTML = `<strong>${a.name}</strong><br><span>${a.user}</span>`;
      row.onclick = () => openDetail(i);
      list.appendChild(row);
    });
}

function openDetail(i) {
  const a = accounts[i];
  a.pinned = false; // 🔓 UNPIN WHEN VIEWED
  active = a;

  dTitle.textContent = a.name;
  dUser.textContent = a.user;
  dNotes.textContent = a.notes;
  dImages.innerHTML = a.images.map(src => `<img src="${src}">`).join("");

  detail.classList.remove("hidden");
  render();
}

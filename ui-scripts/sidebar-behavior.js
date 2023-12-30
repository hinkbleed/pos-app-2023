const userContainer = document.getElementById("user");
const userMenu = document.getElementById("userMenu");
const logoutBtn = document.getElementById("logout");
const userSymbolBtn = document.getElementById("userSymbol");
const menuItems = document.querySelectorAll(".user-menu-item");
const modules = document.querySelectorAll(".module");
const screenBox = document.getElementById("screenBox");

function change() {
  userMenu.classList.toggle("hide");
  logoutBtn.classList.toggle("hide");
  userMenu.classList.toggle("appear");
  logoutBtn.classList.toggle("appear");
}

function showItems() {
  if (logoutBtn.classList.contains("hide")) {
    setTimeout(change, 300);
  } else {
    change();
  }
}

userSymbolBtn.onclick = function () {
  userContainer.classList.toggle("open");
  showItems();
};

function selectIcon(item) {
  menuItems.forEach((item) => item.classList.remove("active"));
  item.classList.add("active");
}

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    modules.forEach((module) => {
      module.style.display = "none";
    });
    modules[index].style.display = "flex";
    selectIcon(item)
  });
});

logoutBtn.onclick = function () {
  screenBox.classList.add("hide");
};

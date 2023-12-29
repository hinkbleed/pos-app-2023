const userContainer = document.getElementById("user");
const userMenu = document.getElementById("userMenu");
const logoutBtn = document.getElementById("logout");
const userSymbolBtn = document.getElementById("userSymbol");

userSymbolBtn.addEventListener("click", openUserMenu);

function openUserMenu() {
  userContainer.classList.toggle("open");

    // Retraso para mostrar el botón de logout después de 500ms
    setTimeout(() => {
      logoutBtn.classList.toggle('open');

      userMenu.classList.toggle('open');
    }, 500);
}

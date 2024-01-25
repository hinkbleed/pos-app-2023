//      SHOP SECTION

// Obtener todas las filas de la tabla
const rows = document.querySelectorAll('#tbody tr');

// Agregar un event listener a cada fila
rows.forEach((row) => {
  row.addEventListener('click', () => {
    // Remover la clase 'seleccionada' de todas las filas
    rows.forEach((r) => {
      r.classList.remove('selected');
    });

    // Agregar la clase 'seleccionada' a la fila clickeada
    row.classList.add('selected');

  });
});


//      REPORT SECTION

const detailsBtn = document.querySelectorAll(".details-btn");
const detailsModule = document.querySelectorAll('.details-box-module');

function changeReportModule(item) {
  detailsBtn.forEach((btn) => btn.classList.remove("active"));
  item.classList.add("active");
}

detailsBtn.forEach((item, index) => {
  item.addEventListener("click", () => {
    detailsModule.forEach((module) => {
      module.style.display = "none";
    });
    detailsModule[index].style.display = "flex";
    changeReportModule(item)
  });
});


//      DATA SECTION 

//import { createInvForm } from '../server/showInv.mjs'
//createInvForm()


const dataBtn = document.querySelectorAll('.data-btn');
const artModules = document.querySelectorAll('.article-module');
const sectionView = document.getElementById('sectionDataView');
const closeWinBtn = document.getElementById('closeDataWin');
const logoutBtn = document.getElementById("logout");


dataBtn.forEach((button, index) => {
  button.addEventListener("click", () => {

    sectionView.classList.remove('disappear');
    sectionView.classList.add('active');
    artModules.forEach((module) => {
      module.style.display = "none";
    });
    artModules[index].style.display = "flex";

  });
});

closeWinBtn.addEventListener('click', () => {
  sectionView.classList.add('disappear');
  setTimeout(() => {
    sectionView.classList.remove('active');
  }, 300);
});

logoutBtn.onclick = function () {
  screenBox.classList.add("hide");
};


const mainIndexBtn = document.querySelectorAll('.main-index-btn');

mainIndexBtn.forEach((button) => {
  button.addEventListener('click', () => {
    mainIndexBtn.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});


//      SIDEBAR SECTION

const userContainer = document.getElementById("user");
const userMenu = document.getElementById("userMenu");
const userSymbolBtn = document.getElementById("userSymbol");
const menuItems = document.querySelectorAll(".user-menu-item");
const modules = document.querySelectorAll(".module");
const screenBox = document.getElementById("screenBox");

function change() {
  userMenu.classList.toggle("hide");
  userMenu.classList.toggle("appear");
}

function showItems() {
  if (userMenu.classList.contains("hide")) {
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



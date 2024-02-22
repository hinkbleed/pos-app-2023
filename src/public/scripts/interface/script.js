const lastSection = localStorage.getItem('lastSection');
const symbolBtn = document.getElementById('symbol');
const shopBtn = document.getElementById('shopBtn');
const reportBtn = document.getElementById('reportBtn');
const dataBtn = document.getElementById('dataBtn');
const menuBox = document.getElementById('menuBox');
const menu = document.getElementById('menu');
const menuItems = document.querySelectorAll('.menu-item');

document.addEventListener('DOMContentLoaded', interfaceStarter(lastSection));

shopBtn.addEventListener('click', () => {
  interfaceStarter('shop');
});

reportBtn.addEventListener('click', () => {
  interfaceStarter('report');
});

dataBtn.addEventListener('click', () => {
  interfaceStarter('data');
});

function interfaceStarter (section) {
  if (section) {
    loadCSS(`/css/app/${section}/styles.css`);
    selectBtn(section);
    localStorage.setItem('lastSection', section);
  } else {
    loadCSS('/css/app/shop/styles.css');
    selectBtn('shop');
    localStorage.setItem('lastSection', 'shop');
  }
}

function loadCSS (href) {
  const cssModule = document.getElementById('cssModule');
  if (cssModule) {
    cssModule.href = href;
  } else {
    createLink(href);
  }
}

function createLink (href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.id = 'cssModule';
  document.head.appendChild(link);
}

function selectBtn (section) {
  menuItems.forEach((btn) => {
    btn.classList.remove('active');
    if (btn.classList.contains(`${section}`)) {
      btn.classList.add('active');
    }
  });
}

symbolBtn.addEventListener('click', toggleMenu);

function toggleMenu () {
  menuBox.classList.toggle('open');
  showItems();
}

function showItems () {
  if (menu.classList.contains('hide')) {
    setTimeout(change, 300);
  } else {
    change();
  }
}

function change () {
  menu.classList.toggle('hide');
  menu.classList.toggle('appear');
}

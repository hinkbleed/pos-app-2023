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
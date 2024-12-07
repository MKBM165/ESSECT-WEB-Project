const tabs = document.querySelectorAll(".operations__tab");
const tabscontainer = document.querySelector(".operations__tab-container");
const tabscontent = document.querySelectorAll(".operations__content");
tabscontainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest("button");
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabscontent.forEach((t) => t.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

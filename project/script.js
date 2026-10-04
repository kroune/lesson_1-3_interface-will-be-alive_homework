"use strict";

const cards = Array.from(document.querySelectorAll(".collection-card"));
const detailsPanel = document.getElementById("details-panel");
const detailsTitle = document.getElementById("details-title");
const detailsDescription = document.getElementById("details-description");

// запоминаем исходные тексты панели, чтобы вернуть их при сбросе
const defaultTitle = detailsTitle.textContent;
const defaultDescription = detailsDescription.textContent;

let selectedCard = null;

function selectCard(card) {
  if (selectedCard) {
    selectedCard.classList.remove("collection-card--selected");
    selectedCard.setAttribute("aria-pressed", "false");
  }

  selectedCard = card;
  selectedCard.classList.add("collection-card--selected");
  selectedCard.setAttribute("aria-pressed", "true");

  detailsTitle.textContent = card.dataset.title;
  detailsDescription.textContent = card.dataset.description;

  // перезапускаем анимацию: убираем класс и добавляем заново
  detailsPanel.classList.remove("details-panel--pulse");
  void detailsPanel.offsetWidth;
  detailsPanel.classList.add("details-panel--pulse");
}

cards.forEach((card) => {
  card.addEventListener("click", () => selectCard(card));
});

const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const visibleCount = document.getElementById("visible-count");

function clearSelection() {
  if (selectedCard) {
    selectedCard.classList.remove("collection-card--selected");
    selectedCard.setAttribute("aria-pressed", "false");
    selectedCard = null;
  }

  detailsTitle.textContent = defaultTitle;
  detailsDescription.textContent = defaultDescription;
}

function applyFilter(filter) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("filter-button--active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  let visible = 0;
  cards.forEach((card) => {
    const isVisible = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("collection-card--hidden", !isVisible);
    if (isVisible) {
      visible += 1;
    }
  });
  visibleCount.textContent = visible;

  // если фильтр скрыл выбранную карточку, выбор сбрасывается
  if (selectedCard && selectedCard.classList.contains("collection-card--hidden")) {
    clearSelection();
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

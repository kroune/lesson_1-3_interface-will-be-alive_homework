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

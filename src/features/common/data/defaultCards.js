import cards from "../../../data/cards.json.js";

const defaultCards = cards.map((card, i) => ({
  ...card,
  id: i + 1,
  active: true,
  amountInDeck: 4,
  amountPassed: 0,
  isInfinite: false
}));

export default defaultCards;

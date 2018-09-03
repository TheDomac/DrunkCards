export default function getDescription(card, lang = "eng") {
  return card.description_custom || card[`description_${lang}`];
}

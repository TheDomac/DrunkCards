export default function getName(card, lang = "eng") {
  return card.name_custom || card[`name_${lang}`];
}

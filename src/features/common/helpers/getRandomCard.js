const getRandomCard = (cards) => {
  return cards[Math.floor((Math.random()* cards.length))] || {};
}

export default getRandomCard;

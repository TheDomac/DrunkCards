import React from "react";
import { Text, View, AsyncStorage } from "react-native";
import { Font } from "expo";

import Home from "./src/features/home/components/Home.js";
import Settings from "./src/features/settings/components/Settings.js";
import Game from "./src/features/game/components/Game.js";
import Rules from "./src/features/rules/components/Rules.js";

import generalStyles from "./src/styles/general";
import signika from "./src/fonts/Signika/Signika-Regular.ttf";

import defaultCards from "./src/features/common/data/defaultCards";

console.disableYellowBox = true;

getRandomCard = (cards) => cards[Math.floor((Math.random()* cards.length))] || {}

export default class App extends React.Component {
  state = {
    fontLoaded: false,
    screenShown: "home",
    cards: defaultCards,
    language: "eng",
    selectedCard: getRandomCard(defaultCards),
    areAdsEnabled: true,
    adsError: false,
    developmentMode: false,
  };


  async componentDidMount() {
    AsyncStorage.getItem("settings")
      .then(settings => {
        const parsedSettings = JSON.parse(settings);

        this.setState({
          language: parsedSettings.language,
          cards: parsedSettings.cards,
          selectedCard: getRandomCard(parsedSettings.cards)
        })
      }).catch(() => {
        this.setState({
          language: "eng",
          cards: defaultCards,
          selectedCard: getRandomCard(parsedSettings.cards)
        })

        const stringifiedSettings = JSON.stringify({ cards: defaultCards, language: "eng"})
        AsyncStorage.setItem("settings", stringifiedSettings);
      })

    await Font.loadAsync({ signika });

    this.setState({ fontLoaded: true });
  }

  goTo = (link) => {
    this.setState({ screenShown: link });
  }

  onAdsError = (adsError) => {
    if (this.state.developmentMode) {
      console.log(
        "----------------------------------------------------------------",
        adsError,
        "----------------------------------------------------------------"
      )
    }
    this.setState({ adsError: true })
  }

  resetDeck = () => {
    const cards = this.state.cards.map(card => ({
      ...card, amountPassed: 0
    }));
    
    const activeCards = cards.filter(card => card.active);
    const selectedCard = getRandomCard(activeCards);

    this.setState({ cards, selectedCard });
  }
  
  saveNewSettings = (cards, language) => {
    this.setState({ cards, language });

    const stringifiedSettings = JSON.stringify({ cards, language})
    AsyncStorage.setItem("settings", stringifiedSettings);  
  }

  getNumberOfCardsLeft = () => {
    const activeCards = this.state.cards.filter(card => card.active);
    const totalNumberOfCards = activeCards
      .reduce((prev, next) => ({ amountInDeck: prev.amountInDeck + next.amountInDeck}),
      { amountInDeck: 0 }).amountInDeck
    const numberOfCardsPassed = activeCards
      .reduce((prev, next) => ({ amountPassed: prev.amountPassed + next.amountPassed}),
      { amountPassed: 0 }).amountPassed
      
    return totalNumberOfCards - numberOfCardsPassed - 1;
  }

  selectNewCard = () => {
    // mark current card as passed
    const cards = this.state.cards.map(card => ({
      ...card,
      amountPassed: card.id === this.state.selectedCard.id ? card.amountPassed + 1 : card.amountPassed
    }));    
    
    const activeCards = cards
    .filter(card => {
      return card.active && ((card.amountPassed !== card.amountInDeck) || card.isInfinite);
    });

    const selectedCard = getRandomCard(activeCards);
    
    this.setState({ selectedCard, cards });
  }
  
  render() {
    if (!this.state.fontLoaded) { return null;}

    let content = null;
    switch (this.state.screenShown) {
      case "home": {
        content = (
          <Home
            goTo={this.goTo}
            language={this.state.language}
            areAdsEnabled={this.state.areAdsEnabled}
            adsError={this.state.adsError}
            onAdsError={this.onAdsError}
            developmentMode={this.state.developmentMode}
          />
        );
        break;
      }
      case "settings": {
        content = (
          <Settings
            goTo={this.goTo}
            saveNewSettings={this.saveNewSettings}
            cards={this.state.cards}
            language={this.state.language}
          />
        );
        break;
      }
      case "game": {
        const isLimitedDeck = this.state.cards
          .filter(card => card.active)
          .every(card => !card.isInfinite);

        const cardsLeft = isLimitedDeck ?
          <Text>{this.getNumberOfCardsLeft()}</Text> : <Text>&infin;</Text>;
 
        content = (
          <Game
            goTo={this.goTo}
            selectedCard={this.state.selectedCard}
            selectNewCard={this.selectNewCard}
            cardsLeft={cardsLeft}
            resetDeck={this.resetDeck}
            language={this.state.language}
          />
        );
        break;
      }
      case "rules": {
        content = (
          <Rules
            goTo={this.goTo}
            cards={this.state.cards}
            language={this.state.language}
          />
        );
        break;
      }
    }

    return (
      <View style={generalStyles.app}>
        {content}
      </View>
    )
  }
}


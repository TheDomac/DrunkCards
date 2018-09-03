import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from "prop-types";

import DefaultScreen from "./DefaultScreen";
import NewCardScreen from "./NewCardScreen";

import generalStyles from "../../../../src/styles/general";
import settingsStyles from "../styles/settings";

import defaultCards from "../../common/data/defaultCards";

class Settings extends React.Component {
  state = {
    cards: this.props.cards,
    language: this.props.language,
    showSaveDialog: false,
    screenShown: "defaultScreen"
  }

  changeLanguage = (language) => {
    this.setState({ language, showSaveDialog: true });
  }

  changeScreenShown = (screenShown) => {
    this.setState({ screenShown })
  }

  addNewCard = (name, description) => {
    this.setState({
      cards: [
        ...this.state.cards, {
          id: this.state.cards.length + 1,
          name_custom: name,
          description_custom: description,
          amountInDeck: 4,
          active: true,
          image: "",
          additionalInfo: { isCustom: true },
          amountPassed: 0
        }
      ],
      showSaveDialog: true
    });
  }

  resetToDefault = () => {
    this.setState({ cards: defaultCards, showSaveDialog: true });
  }

  removeCustomCard = (id) => {
    this.setState({
      cards: this.state.cards.filter(card => card.id !== id),
      showSaveDialog: true
    });
  }

  toggleIsInfinite = (id) => {
    const cards = this.state.cards.map(card => ({
      ...card,
      isInfinite: card.id === id ? !card.isInfinite : card.isInfinite
    }));

    this.setState({
      cards,
      showSaveDialog: true
    });
  }

  toggleCardSetting = (id) => {
    const cards = this.state.cards.map(card => ({
      ...card,
      active: card.id === id ? !card.active : card.active
    }));

    this.setState({ cards, showSaveDialog: true });
  }

  changeAmountOfCards = (id, value) => {
    if (value < 0) { return; }

    const cards = this.state.cards.map(card => ({
      ...card,
      amountInDeck: card.id === id ? value : card.amountInDeck
    }));

    this.setState({
      cards,
      showSaveDialog: true
    });
  }

  toggleAllCardsSetting = (active) => {
    const cards = this.state.cards.map(card => ({ ...card, active }));
    this.setState({ cards, showSaveDialog: true })
  }
  
  saveNewSettings = () => {
    const cards = this.state.cards.map(card => ({
      ...card,
      active: card.amountInDeck === 0 ? false : card.active
    }));

    this.props.saveNewSettings(cards, this.state.language);
    this.props.goTo("home");
  }

  render() {
    let content;
    if (this.state.screenShown === "newCard") {
      content = (
        <NewCardScreen
          changeScreenShown={this.changeScreenShown}
          addNewCard={this.addNewCard}
          language={this.state.language}
        />
      );
    } else if (this.state.screenShown === "defaultScreen") {
      content = (
        <DefaultScreen
          toggleAllCardsSetting={this.toggleAllCardsSetting}
          toggleCardSetting={this.toggleCardSetting}
          cards={this.state.cards}
          language={this.state.language}
          changeLanguage={this.changeLanguage}
          changeScreenShown={this.changeScreenShown}
          removeCustomCard={this.removeCustomCard}
          resetToDefault={this.resetToDefault}
          showSaveDialog={this.state.showSaveDialog}
          saveNewSettings={this.saveNewSettings}
          goTo={this.props.goTo}
          changeAmountOfCards={this.changeAmountOfCards}
          toggleIsInfinite={this.toggleIsInfinite}
        />
      );
    }

    return content;
  }
}

Settings.propTypes = {
  goTo: PropTypes.func,
  saveNewSettings: PropTypes.func,
  cards: PropTypes.array,
  language: PropTypes.string
}

export default Settings;

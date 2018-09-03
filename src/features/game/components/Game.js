import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";
import { AdMobBanner } from 'expo';

import Menu from "./Menu";
import GameTopBar from "../../common/components/gameTopBar";
import Button from "../../common/components/Button";
import getName from "../../common/helpers/getName";
import getDescription from "../../common/helpers/getDescription";
import getTranslation from "../../common/helpers/getTranslation";


import generalStyles from "../../../../src/styles/general";
import gameStyles from "../styles/game.js";

class Game extends React.Component {
  state = {
    menuOpen: false,
    descriptionOpen: false
  }

  componentWillMount() {
    this.props.resetDeck();
  }

  toggleMenu = () => {
    this.setState((oldState) => ({
      menuOpen: !oldState.menuOpen
    }));
  }
  
  toggleDescription = () => {
    if (!getDescription(this.props.selectedCard, this.props.language)) { return; }

    this.setState((oldState) => ({
      descriptionOpen: !oldState.descriptionOpen
    }));
  }

  handleCardPress = () => {
    this.props.selectNewCard();
  }

  goToHome = () => {
    this.props.goTo("home")
  }
  
  render() {
    let content;
    
    const { text, centeredItem, rowWrapper } = generalStyles;
    
    if (this.props.cardsLeft < 0 || !this.props.selectedCard.id) {
      content = (
        <View>
          <Text style={text}>
            {getTranslation("gameOver", this.props.language)}
          </Text>
          <Button
            onPress={this.goToHome}
            title={getTranslation("gameOverHomeButton", this.props.language)}
          />
        </View>
      );
    } else if (this.state.menuOpen) {
      content = (
        <View style={centeredItem}>
          <Menu
            toggleMenu={this.toggleMenu}
            goTo={this.props.goTo}
            language={this.props.language}
          />
        </View>
      );
    } else if (this.state.descriptionOpen) {
      content = (
        <View style={centeredItem}>
          <Text style={[text, gameStyles.description]}>
            {getDescription(this.props.selectedCard, this.props.language)}
          </Text>
          <TouchableOpacity
            style={[rowWrapper, { justifyContent: "center"}]}
            onPress={this.toggleDescription}
          >
            <View style={[gameStyles.roundButton]}>
              <Text style={text}>{getTranslation("ok", this.props.language)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      content = (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={this.handleCardPress}
            style={gameStyles.card}
          >
            <Text style={[text, gameStyles.cardText]}>
              {getName(this.props.selectedCard, this.props.language)}
            </Text>
          </TouchableOpacity>
          <View style={[generalStyles.rowWrapper, { marginBottom: 10, justifyContent: "space-around"}]}>
            <Button
              onPress={this.toggleDescription}
              title="?"
              style={{ margin: 0}}
            />
            <Text style={[text, gameStyles.cardText]}>
              {this.props.selectedCard.amountPassed + 1}
              /
              { this.props.selectedCard.isInfinite ?
              <Text>&infin;</Text> : <Text>{this.props.selectedCard.amountInDeck}</Text>
              }
            </Text>
          </View>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <GameTopBar
          cardsLeft={this.props.cardsLeft}
          toggleMenu={this.toggleMenu}
          language={this.props.language}
          isGameOver={this.props.cardsLeft < 0 || !this.props.selectedCard.id}
        />
          {content}
      </View>
    );
  }
}

Game.propTypes = {
  goTo: PropTypes.func,
  selectNewCard: PropTypes.func,
  selectedCard: PropTypes.object,
  resetDeck: PropTypes.func,
  cardsLeft: PropTypes.object,
  language: PropTypes.string,
}

export default Game;


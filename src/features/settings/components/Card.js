import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import PropTypes from "prop-types";

import generalStyles from "../../../../src/styles/general";
import settingsStyles from "../styles/settings";
import getName from "../../common/helpers/getName";
import getTranslation from "../../common/helpers/getTranslation";

import Button from "../../common/components/Button";

class Card extends React.Component {
  removeCustomCard = () => {
    this.props.removeCustomCard(this.props.card.id)
  }

  toggleIsInfinite = () => {
    this.props.toggleIsInfinite(this.props.card.id)
  }

  reduceAmountOfCards = () => {
    this.props.changeAmountOfCards(this.props.card.id, this.props.card.amountInDeck - 1) 
  }

  increaseAmountOfCards = () => {
    this.props.changeAmountOfCards(this.props.card.id, this.props.card.amountInDeck + 1) 
  }

  toggleCardSetting = () => {
    this.props.toggleCardSetting(this.props.card.id)
  }

  render() {
    const { card } = this.props;
  
    const isCustomCard = card.additionalInfo && card.additionalInfo.isCustom;
    const deleteCustomCardButton = isCustomCard ? (
      <Button
        style={[settingsStyles.cardButton, { backgroundColor: "red" }]}
        title="&#10006;"
        onPress={this.removeCustomCard}
      />
    ) : null;
    
    const inActiveStyle = !card.active ? { opacity: 0.3 } : {};
    const activeGreenStyle = [ settingsStyles.cardButton, { backgroundColor: "green"}];
  
    let chevronLeftButton;
    let chevronRightButton;
    let amountInDeck;
    let infinityButton;
  
    if (card.active) {
      infinityButton = <Button
        title="&infin;"
        onPress={this.toggleIsInfinite}
        textStyle={card.isInfinite ? {} : { opacity: 0.3 }}
        style={card.isInfinite ? activeGreenStyle : settingsStyles.cardButton}
      />;
    }
  
    if (!card.isInfinite && card.active) {
      chevronLeftButton = <Button
        style={settingsStyles.cardButton}
        title="&lsaquo;"
        onPress={this.reduceAmountOfCards}
      />
  
      chevronRightButton = <Button
        style={settingsStyles.cardButton}
        title="&rsaquo;"
        onPress={this.increaseAmountOfCards}
      />
  
      amountInDeck = <Text
        style={[generalStyles.text, { marginTop: 15, marginBottom: 15 }]}
      >
        {card.amountInDeck}
      </Text>;
    }
    
    
    return (
      <View style={settingsStyles.ruleItem}>
        <View style={{ flex: 1}}>
          <Text style={[generalStyles.text, inActiveStyle, { margin: 5}]}>
            {getName(card, this.props.language)}
          </Text>
        </View>
        <View style={[generalStyles.rowWrapper, settingsStyles.cardButtonsWrapper]}>
          {deleteCustomCardButton}
          {chevronLeftButton}
          {amountInDeck}
          {chevronRightButton}
          {infinityButton}
          <Button
            title="&#10004;"
            onPress={this.toggleCardSetting}
            textStyle={card.active ? {} : { opacity: 0.3 }}
            style={card.active ? activeGreenStyle : settingsStyles.cardButton}
          />
        </View>
      </View>
    );
  }
}

Card.propTypes = {
  toggleCardSetting: PropTypes.func,
  language: PropTypes.string,
  card: PropTypes.object,
  removeCustomCard: PropTypes.func,
  changeAmountOfCards: PropTypes.func,
  toggleIsInfinite: PropTypes.func
}

export default Card;


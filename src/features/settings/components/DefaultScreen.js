import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PropTypes from "prop-types";

import LanguagePicker from "./LanguagePicker";
import SaveDialog from "./SaveDialog";

import Card from "./Card";
import Button from "../../common/components/Button";

import generalStyles from "../../../../src/styles/general";
import settingsStyles from "../styles/settings";
import getName from "../../common/helpers/getName";
import getTranslation from "../../common/helpers/getTranslation";

class DefaultScreeen extends React.Component {
  goToNewCard = () => {
    this.props.changeScreenShown("newCard")
  }

  toggleAllCardsToTrue = () => {
    this.props.toggleAllCardsSetting(true)
  }

  toggleAllCardsToFalse = () => {
    this.props.toggleAllCardsSetting(false)
  }

  renderCard = (card) => (
    <Card
      card={card}
      language={this.props.language}
      toggleCardSetting={this.props.toggleCardSetting}
      removeCustomCard={this.props.removeCustomCard}
      changeAmountOfCards={this.props.changeAmountOfCards}
      toggleIsInfinite={this.props.toggleIsInfinite}
    />
  )

  render() {
    return (
      <View style={settingsStyles.scrollView}>
        <LanguagePicker
          language={this.props.language}
          changeLanguage={this.props.changeLanguage}
        />
        <View style={generalStyles.rowWrapper}>
          <Button
            style={{ flex: 1}}
            onPress={this.goToNewCard}
            title={getTranslation("addNewCard", this.props.language)}
          />
          <Button
            style={{ flex: 1}}
            onPress={this.props.resetToDefault}
            title={getTranslation("resetToDefault", this.props.language)}
          />
        </View>
        <View style={generalStyles.rowWrapper}>
          <Button
            onPress={this.toggleAllCardsToTrue}
            style={{ flex: 1}}
            title={getTranslation("allOn", this.props.language)}
          />
          <Button
            style={{ flex: 1}}
            onPress={this.toggleAllCardsToFalse}
            title={getTranslation("allOff", this.props.language)}
          />
        </View>
        <ScrollView>
          {this.props.cards.map(this.renderCard)}
        </ScrollView>
        <SaveDialog
          showSaveDialog={this.props.showSaveDialog}
          saveNewSettings={this.props.saveNewSettings}
          goTo={this.props.goTo}
          language={this.props.language}
        />
      </View>
    );
  }
}

DefaultScreeen.propTypes = {
  toggleAllCardsSetting: PropTypes.func,
  toggleCardSetting: PropTypes.func,
  cards: PropTypes.array,
  language: PropTypes.string,
  changeLanguage: PropTypes.func,
  changeScreenShown: PropTypes.func,
  removeCustomCard: PropTypes.func,
  resetToDefault: PropTypes.func,
  showSaveDialog: PropTypes.bool,
  saveNewSettings: PropTypes.func,
  changeAmountOfCards: PropTypes.func,
  toggleIsInfinite: PropTypes.func
}

export default DefaultScreeen;

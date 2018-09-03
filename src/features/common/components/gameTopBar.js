import React from 'react';
import { Text, View} from 'react-native';
import PropTypes from "prop-types";

import generalStyles from "../../../../src/styles/general";
import gameStyles from "../../game/styles/game.js";

import getTranslation from "../helpers/getTranslation";

const GameTopBar = (props) => {
  if (props.isGameOver) { return null; }
  return (
    <View style={gameStyles.topBar}>
      <Text style={[generalStyles.text, gameStyles.topBarItem]}>
        {getTranslation("cardsLeft", props.language)}: {props.cardsLeft}
      </Text>
      <Text
        onPress={props.toggleMenu}
        style={[generalStyles.text, gameStyles.topBarItem]}
      >
        {getTranslation("menu", props.language)}
      </Text>
    </View>
  );
}

GameTopBar.propTypes = {
  cardsLeft: PropTypes.object,
  toggleMenu: PropTypes.func,
  language: PropTypes.string,
  isGameOver: PropTypes.bool
}

export default GameTopBar;


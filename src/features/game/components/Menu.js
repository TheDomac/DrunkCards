import React from 'react';
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from 'react-native';

import generalStyles from "../../../../src/styles/general";
import getTranslation from "../../common/helpers/getTranslation";

import Button from "../../common/components/Button";

class Menu extends React.Component {
  state = {
    isAskForExitOpen: false
  }

  toggleAskForExit = (isAskForExitOpen) => {
    this.setState({ isAskForExitOpen });
  }

  toggleAskForExit = () => {
    this.setState((state) => ({
      isAskForExitOpen: !state.isAskForExitOpen
    }));
  }

  handleNoClick = () => {
    this.toggleAskForExit();
    this.props.toggleMenu();
  }

  exit = () => {
    this.props.goTo("home");
  }

  render() {
    let content;

    if (this.state.isAskForExitOpen) {
      content = (
        <View style={[generalStyles.centeredItem, { flex: 1}]}>
          <Text style={generalStyles.text}>
            {getTranslation("areYouSure", this.props.language)}
          </Text>
          <View style={generalStyles.rowWrapper}>
            <Button
              style={{ backgroundColor: "green"}}
              onPress={this.exit}
              title={getTranslation("yes", this.props.language)}
            />
            <Button
              style={{ backgroundColor: "red"}}
              onPress={this.handleNoClick}
              title={getTranslation("no", this.props.language)}
            />
          </View>
        </View>
      );
    } else {
      content = (
        <View style={[generalStyles.centeredItem, { flex: 1}]}>
          <Button
            onPress={this.props.toggleMenu}
            title={getTranslation("resume", this.props.language)}
          />
          <Button
            onPress={this.toggleAskForExit}
            title={getTranslation("exit", this.props.language)}
          />
        </View>
      );
    }
    return content;
  }
}

Menu.propTypes = {
  goTo: PropTypes.func,
  toggleMenu: PropTypes.func,
  language: PropTypes.string
}

export default Menu;


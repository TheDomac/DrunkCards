import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from "prop-types";
import generalStyles from "../../../styles/general";

import Button from "../../common/components/Button";
import getTranslation from "../../common/helpers/getTranslation";


class SaveDialog extends React.Component {
  goToHome = () => {
    this.props.goTo("home")
  }

  render() {
    const content = this.props.showSaveDialog ?
      <View style={[ generalStyles.rowWrapper, { justifyContent: "space-around" }]}>
      <Button 
        style={{ backgroundColor: "green" }}
        onPress={this.props.saveNewSettings}
        title={getTranslation("save", this.props.language)}
      />
      <Button 
        style={{ backgroundColor: "red" }}
        onPress={this.goToHome}
        title={getTranslation("cancel", this.props.language)}
      />
    </View> :
    <View style={[ generalStyles.rowWrapper, { justifyContent: "space-around" }]}>
      <Button
        onPress={this.goToHome}
        title={getTranslation("back", this.props.language)}
      />
    </View>
  
    return content;
  }
}

SaveDialog.propTypes = {
  showSaveDialog: PropTypes.func,
  goTo: PropTypes.func,
  saveNewSettings: PropTypes.func,
  language: PropTypes.string
}

export default SaveDialog;


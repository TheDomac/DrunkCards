import React from 'react';
import { Text, View, TextInput } from 'react-native';
import PropTypes from "prop-types";

import Button from "../../common/components/Button";

import generalStyles from "../../../../src/styles/general";
import newCardStyles from "../styles/newCard";
import settingsStyles from "../styles/settings";
import getName from "../../common/helpers/getName";
import getTranslation from "../../common/helpers/getTranslation";

class NewCardScreen extends React.Component {
  state = {
    newCardName: "",
    newCardDescription: ""
  }

  addNewCard = () => {
    this.props.addNewCard(this.state.newCardName, this.state.newCardDescription);
    this.props.changeScreenShown("defaultScreen");
    this.setState({ newCardName: "", newCardDescription: "" });
  }

  onChangeName = (text) => { this.setState({ newCardName: text }) }

  onChangeDescription = (text) => { this.setState({ newCardDescription: text }) }

  render() {
    return (
      <View style={newCardStyles.textInputWrapper}>
        <View>
          <TextInput
            onChangeText={this.onChangeName}
            value={this.state.newCardName}
            style={newCardStyles.textInput}
            placeholder={getTranslation("newCardName", this.props.language)}
          />
          <TextInput
            onChangeText={this.onChangeDescription}
            value={this.state.newCardDescription}
            style={newCardStyles.textInput}
            placeholder={getTranslation("newCardDescription", this.props.language)}
          />
        </View>
        <View>
          <Button
            onPress={this.addNewCard}
            style={{ margin: 30, marginBottom: 0 }}
            title={getTranslation("addNew", this.props.language)}
          />
          <Button
            onPress={() => { this.props.changeScreenShown("defaultScreen")}}
            style={{ margin: 30, marginTop: 10 }}
            title={getTranslation("back", this.props.language)}
          />
        </View>
      </View>
    );
  }
}

NewCardScreen.propTypes = {
  addNewCard: PropTypes.func,
  changeScreenShown: PropTypes.func,
  language: PropTypes.string
}

export default NewCardScreen;

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from "prop-types";

import generalStyles from "../../../../src/styles/general";
import settingsStyles from "../styles/settings";
import Button from "../../common/components/Button";

import languages from "../../../i18n";
import getTranslation from "../../common/helpers/getTranslation";

class LanguagePicker extends React.Component {
  changeLanguageToPrevious = () => {
    const selectedLanguageIndex = languages.findIndex(lang => lang.language === this.props.language);
    const prevLanguage = languages[selectedLanguageIndex - 1] || languages[languages.length - 1];
    this.props.changeLanguage(prevLanguage.language)
  }

  changeLanguageToNext = () => {
    const selectedLanguageIndex = languages.findIndex(lang => lang.language === this.props.language);
    const nextLanguage = languages[selectedLanguageIndex + 1] || languages[0];
    this.props.changeLanguage(nextLanguage.language)
  }

  render() {
    return (
      <View style={[generalStyles.rowWrapper, { justifyContent: "space-around"}]}>
        <Text
          style={[generalStyles.text, { margin: 15, flex: 1}]}
        >
          {getTranslation("language", this.props.language)}
        </Text>
        <View style={[generalStyles.rowWrapper, {flex: 1}]}>
          <Button
            style={settingsStyles.cardButton}
            title="&lsaquo;"
            onPress={this.changeLanguageToPrevious}
          />
          <Text
            style={[generalStyles.text, { margin: 15 }]}
          >
            {this.props.language}
          </Text>
          <Button
            style={settingsStyles.cardButton}
            title="&rsaquo;"
            onPress={this.changeLanguageToNext}
          />
        </View>
      </View>
    )
  }
}

LanguagePicker.propTypes = {
  changeLanguage: PropTypes.func,
  language: PropTypes.string
}

export default LanguagePicker;


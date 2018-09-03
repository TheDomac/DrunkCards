import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import PropTypes from "prop-types";

import generalStyles from "../../../styles/general";
import getName from "../../common/helpers/getName";
import getDescription from "../../common/helpers/getDescription";
import getTranslation from "../../common/helpers/getTranslation";
import Button from "../../common/components/Button";

class Rules extends React.Component {
  goToHome = () => {
    this.props.goTo("home")
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.props.cards.map((card, i) => (
            <View style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 15,
              paddingRight: 15,
              margin: 5
            }}>
              <Text style={[generalStyles.text, { fontSize: 30 }]}>
                {getName(card, this.props.language)}
              </Text>
              <Text style={generalStyles.text}>{getDescription(card, this.props.language)}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={[generalStyles.rowWrapper, { justifyContent: "space-around" }]}>
          <Button
            onPress={this.goToHome}
            title={getTranslation("back", this.props.language)}
          />
        </View>
      </View>
    )
  }
}

Rules.propTypes = {
  cards: PropTypes.array,
  goTo: PropTypes.func,
  language: PropTypes.string
}

export default Rules;


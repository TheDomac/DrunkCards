import React from 'react';
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from 'react-native';
import { AdMobBanner } from 'expo';

import generalStyles from "../../../styles/general";

import getTranslation from "../../common/helpers/getTranslation";

import Button from "../../common/components/Button";

class Home extends React.Component {
  goToGame = () => {
    this.props.goTo("game")
  }

  goToSettings = () => {
    this.props.goTo("settings")
  }

  goToRules = () => {
    this.props.goTo("rules")
  }

  render() {
    return (
      <View style={generalStyles.homeWrapper}>
        <View style={generalStyles.homeMenuWrapper}>
          <View style={generalStyles.centeredItem}>
            <Button
              onPress={this.goToGame}
              style={{ margin: 20}}
              title={getTranslation("startGame", this.props.language)}
            />
            <Button
              onPress={this.goToSettings}
              style={{ margin: 20}}
              title={getTranslation("settings", this.props.language)}
            />
            <Button
              onPress={this.goToRules}
              style={{ margin: 20}}
              title={getTranslation("rules", this.props.language)}
            />
          </View>
        </View>
        {this.props.areAdsEnabled && !this.props.adsError &&
          <View style={generalStyles.homeAdBanner}>
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-6633788768093310/8868388622"
              testDeviceID="EMULATOR"
              onDidFailToReceiveAdWithError={this.props.onAdsError}
            />
            {this.props.developmentMode && this.props.adsError &&
              <Text style={{ color: "#eee", height: 30 }}>Ad Error</Text>
            }
          </View>
        }
      </View>
    )
  }
}

Home.propTypes = {
  goTo: PropTypes.func,
  language: PropTypes.string,
  areAdsEnabled: PropTypes.bool,
  adsError: PropTypes.bool,
};

export default Home;

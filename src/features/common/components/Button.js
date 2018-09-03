import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import PropTypes from "prop-types";

import generalStyles from "../../../styles/general";

const buttonStyle = StyleSheet.create({
  button: {
    fontSize: 20,
    backgroundColor: "#333",
    color: "#eee",
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10
  },
  
  text: {
    color: "#eee",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "signika"
  }
});


const Button = (props) => (
    <TouchableOpacity
      onPress={props.onPress}
      style={[buttonStyle.button, props.style]}
    >
      <View style={props.viewStyle}>
        <Text style={[buttonStyle.text, props.textStyle]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );

Button.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  viewStyle: PropTypes.object,
  onPress: PropTypes.func,
  title: PropTypes.string
}

export default Button;


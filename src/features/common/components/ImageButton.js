import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import PropTypes from "prop-types";


const ImageButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={props.style}
    >
      <View style={props.viewStyle}>
        <Image source={props.source} style={props.imageStyle} />
      </View>
    </TouchableOpacity>
  );
}

ImageButton.propTypes = {
  style: PropTypes.object,
  imageStyle: PropTypes.object,
  viewStyle: PropTypes.object,
  onPress: PropTypes.func,
  source: PropTypes.object
}

export default ImageButton;


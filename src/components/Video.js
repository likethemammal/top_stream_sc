import React from "react";
import { View, Text } from "react-native";

import Youtube from 'react-native-youtube'

import {
    API_KEY
} from '../assets'

export default ({ width, height, id }) => (
  <View
    style={{
      width: width,
      height: height,
      backgroundColor: "gray"
    }}
  >
    {!!id && <Youtube
        videoId={id}
        play={true}
        apiKey={API_KEY}
        style={{height: height}}
    />}
  </View>
);

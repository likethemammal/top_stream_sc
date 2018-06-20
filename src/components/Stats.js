import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image
} from "react-native";

export default ({ messagesPerSecond }) => (
  <View
    style={{
      padding: 15
    }}
  >
    {messagesPerSecond.map((num, i) => {
      return <Text key={i}>{num}</Text>;
    })}
  </View>
);

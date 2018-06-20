import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from "react-native";

export default ({ onLogout }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <TouchableOpacity onPressOut={onLogout}>
      <View
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 15,
          paddingBottom: 15,
          backgroundColor: "#ff8080",
          borderRadius: 4,
          borderWidth: 1,
          borderColor: 'rgba(240, 0, 0, 0.8)',
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: "sans-serif",
            fontSize: 18,

          }}
        >
            {'Log the fuck out'.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

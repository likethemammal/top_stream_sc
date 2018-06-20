import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from "react-native";

import { TAB_NAVS } from "../assets.js";

const PANE_COLOR = "#eee";
const NAV_ACTIVE_TEXT_COLOR = '#ff8080';
const INACTIVE_PANE_COLOR = "#ddd";
const NAV_HEIGHT = 62;
const NAV_BORDER_COLOR = 'rgba(0,0,0,0.25)'
const NAV_TEXT_COLOR = "rgba(0,0,0,0.7)"

const TabNav = ({ children, onPressOut, width, active }) => (
  <TouchableOpacity onPressOut={onPressOut}>
    <View
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        width,
        backgroundColor: active ? PANE_COLOR : INACTIVE_PANE_COLOR,
        borderWidth: 2,
        borderColor: NAV_BORDER_COLOR,
        borderTopColor: active ? 'transparent' : NAV_BORDER_COLOR,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
      }}
    >
      <Text
        style={{
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontSize: 18,
          color: active ? NAV_ACTIVE_TEXT_COLOR : NAV_TEXT_COLOR,
          textAlign: 'center',
        }}
      >
        {children}
      </Text>
    </View>
  </TouchableOpacity>
);

export default ({ tabs, onSelectTab, activeTabIndex, navWidth, height }) => {
  return (
    <View
      style={{
        backgroundColor: PANE_COLOR,
        height: height,
        paddingBottom: NAV_HEIGHT + 15
      }}
    >
      {tabs[activeTabIndex]}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0
        }}
      >
        {TAB_NAVS.map((text, i) => {
          return (
            <TabNav
              key={i}
              active={activeTabIndex === i}
              width={navWidth}
              onPressOut={onSelectTab.bind(null, i)}
            >
              {text.toUpperCase()}
            </TabNav>
          );
        })}
      </View>
    </View>
  );
};

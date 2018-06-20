import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView
} from "react-native";

const IMAGE_WIDTH = 30

const IMAGE_SPAGE = IMAGE_WIDTH + 20 + 12

export default ({ filteredMessages, onSelectMessage, width, refFunc }) => {
  return (
    <ScrollView ref={refFunc}>
      {!filteredMessages.length && <View style={{
        padding: 15,
      }}><Text style={{fontSize: 20}}>Chat disabled</Text></View>}
      {filteredMessages.map((item, i) => {
        const {
          message,
          timestamp,
          userId,
          avatarSrc,
          hidden,
          userName
        } = item;

        const textStyles = {
            lineHeight: 24,
            fontSize: 15,
            textAlign: "left",
        }

        return (
          <TouchableOpacity key={i} onPress={onSelectMessage.bind(null, userId)}>
            <View
              style={{
                height: hidden ? 0 : "auto",
                paddingTop: hidden ? 0 : i === 0 ? 20 : 10,
                overflow: "hidden",
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  paddingLeft: 20,
                  paddingRight: 12,
                }}
              >
                <View style={{
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.5)',
                  borderRadius: 15,
                }}>
                <Image
                  style={{
                    alignSelf: "center",
                    height: IMAGE_WIDTH,
                    width: IMAGE_WIDTH,

                  }}
                  source={{ uri: avatarSrc }}
                  resizeMode="stretch"
                />
              </View>
              </View>

              <View
                style={{
                  paddingTop: 3,
                  paddingRight: 10,
                  width: width - IMAGE_SPAGE - 10,
                }}
              >

              <Text
                style={{
                  ...textStyles
                }}
            >
              <Text
                  style={{
                  fontWeight: "bold",
                  color: "rgba(0,0,0,0.5)"
                }}
              >
              {userName}
              </Text>
                {'  ' + message}
              </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

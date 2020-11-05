import React from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
const { width, height } = Dimensions.get("window");
const featuredWidth = width * 0.7,
  featuredHeight = featuredWidth * 1.2,
  spacing = 25,
  featuredFullWidth = featuredWidth;
const DetailsScreen = ({ navigation }) => {
  const item = navigation.getParam("item");
  return (
    <View style={styles.container}>
      <SharedElement
        id={`item.${item.key}.color`}
        style={{ position: "absolute", top: -featuredFullWidth }}
      >
        <Animated.View
          style={[
            {
              backgroundColor: item.color,
              borderRadius: 15,
              opacity: 0.8,
              margin: spacing / 2,
              width: featuredFullWidth * 2,
              height: featuredFullWidth * 2,

              borderRadius: 500,
              left: -spacing,
              // transform: [{ rotateY }],
            },
          ]}
        />
      </SharedElement>
      <Animated.View
        style={{
          // transform: [{ rotateY }],
          top: spacing,
          left: spacing,
        }}
      >
        <Text>{item.name}</Text>
      </Animated.View>
      <SharedElement
        style={[StyleSheet.absoluteFill]}
        id={`item.${item.key}.image`}
      >
        <Animated.Image
          style={[styles.featuredImage]}
          source={{ uri: item.image }}
        />
      </SharedElement>
    </View>
  );
};
DetailsScreen.sharedElements = (navigation, otherNavigation, showing) => {
  const item = navigation.getParam("item");
  return [{ id: `item.${item.key}.color` }, { id: `item.${item.key}.image` }];
};
export default DetailsScreen;

const styles = StyleSheet.create({
  featuredImage: {
    width: featuredWidth,
    height: featuredWidth * 0.8,
    resizeMode: "contain",
    position: "absolute",
    right: spacing * 1.5,
    bottom: spacing,
    top: spacing * 5,
    transform: [{ rotateZ: "30deg" }],
  },
  container: {
    backgroundColor: "#f7f7f7",
    justifyContent: "space-evenly",
    flex: 1,
  },
});

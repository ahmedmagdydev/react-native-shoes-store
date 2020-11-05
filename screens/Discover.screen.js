import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
const { width, height } = Dimensions.get("window");
const featuredWidth = width * 0.7,
  featuredHeight = featuredWidth * 1.2,
  spacing = 25,
  featuredFullWidth = featuredWidth;
const categories = [
  { key: "1", name: "nike" },
  { key: "2", name: "addidas" },
  { key: "3", name: "jordan" },
  { key: "4", name: "puma" },
  { key: "5", name: "bata" },
  { key: "6", name: "reebook" },
];
const featured = [
  {
    key: "11",
    category: "Nike",
    name: "epic-react",
    price: "130",
    color: "#b72500d6",
    image:
      "https://www.pinclipart.com/picdir/big/338-3385006_download-shoe-png-hd-clipart.png",
  },
  {
    key: "12",
    category: "Nike",
    name: "epic-react",
    price: "130",
    color: "#1c0c55c9",
    image:
      "https://www.pinclipart.com/picdir/big/338-3385006_download-shoe-png-hd-clipart.png",
  },
  {
    key: "13",
    category: "Nike",
    name: "epic-react",
    price: "130",
    color: "#b72500d6",
    image:
      "https://www.pinclipart.com/picdir/big/338-3385006_download-shoe-png-hd-clipart.png",
  },
  {
    key: "14",
    category: "Nike",
    name: "epic-react",
    price: "130",
    color: "#b72500d6",
    image:
      "https://www.pinclipart.com/picdir/big/338-3385006_download-shoe-png-hd-clipart.png",
  },
  {
    key: "15",
    category: "Nike",
    name: "epic-react",
    price: "130",
    color: "#b72500d6",
    image:
      "https://www.pinclipart.com/picdir/big/338-3385006_download-shoe-png-hd-clipart.png",
  },
];
const DiscoverScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.categories}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setSelectedCategory(index);
              }}
            >
              <Text
                style={[
                  styles.category,
                  { opacity: selectedCategory === index ? 1 : 0.4 },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <Animated.FlatList
        data={featured}
        // disableIntervalMomentum={true}
        decelerationRate="fast"
        keyExtractor={(item) => item.key}
        horizontal
        snapToInterval={featuredFullWidth}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: spacing }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          inputRange = [
            (index - 1) * featuredFullWidth,
            index * featuredFullWidth,
            (index + 1) * featuredFullWidth,
          ];
          const rotateZ = scrollX.interpolate({
            inputRange,
            outputRange: ["-50deg", "0deg", "50deg"],
          });

          const rotateY = scrollX.interpolate({
            inputRange: [
              (index - 1) * featuredFullWidth,
              index * featuredFullWidth,
              (index + 1) * featuredFullWidth,
            ],
            outputRange: ["-50deg", "0deg", "50deg"],
          });
          return (
            <TouchableOpacity
              style={[styles.featured]}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Details", { item });
              }}
            >
              <SharedElement
                style={[StyleSheet.absoluteFillObject]}
                id={`item.${item.key}.color`}
              >
                <Animated.View
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      backgroundColor: item.color,
                      borderRadius: 15,
                      opacity: 0.8,
                      margin: spacing / 2,
                      transform: [{ rotateY }],
                    },
                  ]}
                />
              </SharedElement>
              <Animated.View
                style={{
                  transform: [{ rotateY }],
                  top: spacing,
                  left: spacing,
                }}
              >
                <Text>{item.name}</Text>
              </Animated.View>
              <SharedElement
                style={StyleSheet.absoluteFill}
                id={`item.${item.key}.image`}
              >
                <Animated.Image
                  style={[styles.featuredImage, { transform: [{ rotateZ }] }]}
                  source={{ uri: item.image }}
                />
              </SharedElement>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    justifyContent: "space-evenly",
  },
  categories: {
    marginVertical: 20,
  },
  category: {
    paddingHorizontal: 20,
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  featured: {
    width: featuredWidth,
    height: featuredHeight,
    // marginHorizontal: spacing,
    padding: spacing / 2,
  },
  featuredImage: {
    width: featuredWidth,
    height: featuredWidth * 0.8,
    resizeMode: "contain",
    position: "absolute",
    right: -spacing * 1.5,
    bottom: spacing,
  },
});

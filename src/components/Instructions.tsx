import { Animated, FlatList, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import React, { useEffect, useState, useRef } from "react";
import SlideItem from "./SlideItem";
import Pagination from "./Pagination";

const Instructions = ({ selectedData }: any) => {
  const [instructions, setInstructions] = useState<string[]>([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedData != null && selectedData.flr != "Ground")
      setInstructions([
        "Go to the lift and click on floor " + selectedData.flr,
        ...selectedData.ins.split(","),
      ]);
    else if (selectedData != null) {
      setInstructions(selectedData.ins.split(","));
    }
  }, [selectedData]);

  const handleScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  return selectedData == null ? (
    <View>
      <Text></Text>
    </View>
  ) : (
    <View style={styles.ins}>
      <Text
        style={{
          top: 20,
          fontSize: 24,
          fontWeight: "bold",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        Instructions
      </Text>
      <Text
        style={{
          top: 40,
          fontSize: 20,
          fontWeight: "bold",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {selectedData.f_name}
      </Text>
      <Text
        style={{
          top: 50,
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {selectedData.des}
      </Text>
      <FlatList
        data={instructions}
        renderItem={({ item }) => {
          return <SlideItem item={item} />;
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <Pagination data={instructions} scrollX={scrollX} />
    </View>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  ins: {
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 600,
  },
});

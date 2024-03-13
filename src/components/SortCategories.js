import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { sortCategoryData } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function SortCategories() {
  const [activeSort, setActiveSort] = useState("Popular");

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categories}>
          {sortCategoryData.map((sort, index) => {
            let isActive = sort === activeSort;
            let activeButtonClass = isActive ? "bg-white shadow" : "";
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveSort(sort)}
                style={[
                  styles.categoriesButton,
                  isActive && styles.activeButton,
                ]}
              >
                <Text
                  style={[styles.buttonText, isActive && styles.activeText]}
                >
                  {sort}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp("3%"),
    height: hp("10%"),
    borderRadius: 10,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesButton: {
    width: wp("35%"),
    height: hp("8%"),
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#d1cece",
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: "#5b5959",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: wp(4),
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  activeText: {
    color: "#FBA834",
  },
});

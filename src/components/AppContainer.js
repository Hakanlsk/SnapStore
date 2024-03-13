import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appPhotos } from "../constants";
import { Feather } from "@expo/vector-icons";
const AppContainer = ({ appData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upContainer}>
        <Text style={styles.title}>{appData.title}</Text>
        <TouchableOpacity>
          <Feather
            style={styles.starIcon}
            name="star"
            size={26}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={appData.photo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image style={styles.appImage} source={{ uri: item }} />
        )}
      />
    </View>
  );
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    marginTop: hp("4%"),
  },
  upContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("2%"),
  },
  starIcon: {
    marginRight: wp("7%"),
  },
  title: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginLeft: wp("2%"),
  },
  appImage: {
    width: wp("40%"),
    height: hp("45%"),
    marginHorizontal: 7,
    borderRadius: 8,
  },
});

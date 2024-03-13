import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";

const SearchInput = () => {
  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Search.."></TextInput>
      <TouchableOpacity>
        <Feather
          style={styles.searchIcon}
          name="search"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: hp("4%"),
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "gray",
    width: wp("85%"),
    height: hp("7%"),
    borderRadius: 10,
    padding: 10,
  },
});

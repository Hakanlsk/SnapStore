import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchInput from "../components/SearchInput";
import SortCategories from "../components/SortCategories";
import AppContainer from "../components/AppContainer";
import { appPhotos } from "../constants";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <SearchInput />
      </View>
      <SortCategories />
      {/*Apps*/}
      <FlatList
        data={appPhotos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AppContainer appData={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  topSection: {
    flexDirection: "row",
  },
});

export default HomeScreen;

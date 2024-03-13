import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const favApps = [
  { id: 1, name: "Uygulama 1", items: ["Item 1", "Item 2", "Item 3"] },
  { id: 2, name: "Uygulama 2", items: ["Item 4", "Item 5", "Item 6"] },
  { id: 3, name: "Uygulama 3", items: ["Item 7", "Item 8", "Item 9"] },
];

const ProfileScreen = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const renderFavApps = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => toggleCategory(item.id)}>
        <Text
          style={{
            fontWeight: expandedCategory === item.id ? "bold" : "normal",
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
      {expandedCategory === item.id && renderItems(item.items)}
    </View>
  );
  const renderItems = (items) => (
    <FlatList
      data={items}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => console.log("Item selected:", item)}>
          <Text>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* profile section */}
      <View className="flex-row items-center justify-center mb-8">
        <View style={styles.profileImg}>
          <Text className="text-2xl font-bold">H.I</Text>
        </View>
        <Text className="text-xl ml-4">Hakan Işık</Text>
      </View>
      {/* category section */}
      <View>
        <Text style={{ color: "#f9b04d" }} className="text-xl font-semibold">
          Kaydedilen Uygulamalar
        </Text>
        <View>
          <FlatList
            data={favApps}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderFavApps}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: hp("7%"),
    paddingHorizontal: wp("5%"),
  },
  profileImg: {
    borderWidth: 1,
    width: 75,
    height: 75,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;

import {
  View,
  Text,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import UserTextInput from "../components/UserTextInput";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";

const SignUpScreen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (getEmailValidationStatus && email !== "") {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCred) => {
          const data = {
            _id: userCred?.user.uid,
            fullName: name,
            providerData: userCred.user.providerData[0], //kimlik bilgilerinin dizisi
          };

          setDoc(doc(firestoreDB, "users", userCred?.user.uid), data).then(
            () => {
              navigation.navigate("LoginScreen");
            }
          );
        }
      );
    }
  };

  return (
    <View className="flex-1 items-center justify-start">
      {/* main view */}
      <View
        style={[
          styles.mainContainer,
          isKeyboardOpen ? styles.keyboardOpenContainer : null,
        ]}
        className="space-y-6"
      >
        {!isKeyboardOpen && (
          <View>
            <LottieView
              style={styles.lottie}
              source={require("../../assets/signupAnimation.json")}
              autoPlay
              loop
            />
          </View>
        )}
        <Text className=" text-primaryText text-xl font-semibold">
          Join With Us!
        </Text>

        <View className="w-full flex items-center justify-center ">
          {/* alert */}

          {/* full name */}
          <UserTextInput
            placeholder="Full Name"
            isPass={false}
            setStateValue={setName}
          />

          {/* email */}
          <UserTextInput
            placeholder="Email"
            isPass={false}
            setStateValue={setEmail}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />

          {/* password */}
          <UserTextInput
            placeholder="Password"
            isPass={true}
            setStateValue={setPassword}
          />

          {/* login */}

          <TouchableOpacity
            onPress={handleSignUp}
            style={styles.button}
            className="px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center border bg-black"
          >
            <Text className="text-white text-xl py-2 font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>

          <View className="w-full flex-row items-center py-8 -mt-6 justify-center space-x-2">
            <Text className="text-base text-primaryText">
              Have an account !
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text className="text-base font-semibold text-primaryBold">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: hp("4%"),
  },
  keyboardOpenContainer: {
    paddingTop: hp("20%"),
  },
  lottie: {
    width: wp("80%"),
    height: hp("35%"),
  },
  button: {
    width: wp("75%"),
  },
});

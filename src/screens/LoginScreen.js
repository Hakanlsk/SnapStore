import {
  View,
  Text,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import UserTextInput from "../components/UserTextInput";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestoreDB } from "../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { SET_USER } from "../context/actions/userActions";
import LottieView from "lottie-react-native";

const LoginScreen = () => {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const navigation = useNavigation();

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (getEmailValidationStatus && email !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log("User Id: ", userCred?.user.uid);
            navigation.replace("Home");
            getDoc(doc(firestoreDB, "users", userCred?.user.uid)).then(
              (docSnap) => {
                //"exists" ile belgenin var olup olmadığı kontrol edilir
                if (docSnap.exists()) {
                  //"data" ile belgenin verileri alınır
                  console.log("User Data :", docSnap.data());
                  dispatch(SET_USER(docSnap.data()));
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log("Error : ", err.message);
          if (err.message.includes("invalid-credential")) {
            setAlert(true);
            setAlertMessage("Password Mismatch");
          } else if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMessage("User Not Found");
          } else {
            setAlert(true);
            setAlertMessage("Invalid Email Address");
          }
          setInterval(() => {
            setAlert(false);
          }, 4000);
        });
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
              source={require("../../assets/loginAnimation.json")}
              autoPlay
              loop
            />
          </View>
        )}
        <Text className="  text-primaryText text-xl font-semibold">
          Welcome Back!
        </Text>

        <View className="w-full flex items-center justify-center">
          {/* alert */}
          {alert && <Text className="text-red-600">{alertMessage}</Text>}
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
            style={styles.button}
            onPress={handleLogin}
            className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center bg-black border"
          >
            <Text className="text-white  text-xl py-2 font-semibold">
              Sign In
            </Text>
          </TouchableOpacity>

          <View className="w-full flex-row items-center py-8 justify-center space-x-2">
            <Text className="text-base text-primaryText">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text className="text-base font-semibold text-primaryBold">
                Create Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  lottie: {
    width: wp("80%"),
    height: hp("35%"),
  },
  button: {
    width: wp("75%"),
  },
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
});

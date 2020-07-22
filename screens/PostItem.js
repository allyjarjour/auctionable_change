import React, { useState, useEffect } from "react";
import { Button, Image, Text, TextInput, StyleSheet } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { cloudinaryPost } from "./apiCalls";

const PostItem = ({ navigation }) => {
  const [image, uploadImage] = useState(null);
  const [imageObj, setImageObj] = useState(null);

  useEffect(() => {
    getPermissionAsync();
  });

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Image,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        uploadImage(result.uri);
        setImageObj(result);
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Post an Item</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your Name"
          accessibilityLabel="Your Name"
          autoCapitalize="words"
          autoCompleteType="name"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Email"
          accessibilityLabel="Your Email"
          autoCompleteType="email"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Item Name"
          accessibilityLabel="Item Name"
        />
        <Button
          title="Pick an image from camera roll"
          accessibilityLabel="Pick an image from camera roll"
          color="#2cb833"
          onPress={_pickImage}
        />
        {image ? (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        ) : (
          <TouchableWithoutFeedback onPress={_pickImage}>
            <Image
              source={require("../assets/icons/camera.png")}
              style={{ width: 150, height: 150 }}
            />
          </TouchableWithoutFeedback>
        )}
        <TextInput
          style={styles.textInput}
          placeholder="Item Description"
          accessibilityLabel="Item Description"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Minimum Donation for Item"
          accessibilityLabel="Minimum Donation for Item"
          keyboardType="numeric"
        />
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => navigation.navigate("Choose Charity")}
          style={styles.button}
        >
          <Text>Choose Charity</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  scroll: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
  },
  textInput: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 5,
    width: 250,
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 200,
    padding: 10,
    margin: 10,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
});

export default PostItem;

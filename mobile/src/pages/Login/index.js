import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";

import Logo from "../../assets/Logo.png";
import styles from "./styles";

export default function Login() {
  const [name, setName] = useState("");

  const navigation = useNavigation();

  async function createUser() {
    const data = {
      name,
    };

    if (data.name === "".trim()) {
      alert("Você precisa digitar o seu nome para entar");
    } else {
      const response = await api.post("/user/new", data);

      await AsyncStorage.setItem("userName", data.name);
      await AsyncStorage.setItem("userId", String(response.data[0]));
      navigation.navigate("Dashboard");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoLogin}>
        <Image source={Logo} />
      </View>
      <Text style={styles.p}>Para iniciar diga-nos qual é o seu nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Alô, Quem esta ai?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TouchableOpacity style={styles.btn} onPress={createUser}>
        <Text style={styles.btnText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

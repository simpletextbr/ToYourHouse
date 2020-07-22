import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import api from "../../../services/api";

import Logo from "../../../assets/Logo.png";
import styles from "./styles";

export default function Welcome() {
  const [userName, setName] = useState("");
  const [userId, setId] = useState("");

  const navigation = useNavigation();

  async function logOut() {
    try {
      await api.delete(`/mobile/${userId}`);

      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("userId");
      navigation.navigate("Login");
    } catch (error) {
      alert("Não foi possivel sair, tente fechar o app e abri-lo novamente!");
    }
  }

  async function go() {
    await AsyncStorage.setItem("userName", userName);
    await AsyncStorage.setItem("userId", userId);
    navigation.navigate("Dashboard");
  }

  useEffect(() => {
    async function loaddata() {
      setName(await AsyncStorage.getItem("userName"));
      setId(await AsyncStorage.getItem("userId"));
    }
    loaddata();
  }, []);

  return (
    <View style={styles.container}>
      <Feather
        style={styles.logout}
        name="log-out"
        size={32}
        color="#FFFFFF"
        onPress={logOut}
      />
      <Image style={styles.logowelcome} source={Logo} />
      <Text style={styles.welcome}>Bem-Vindo(a) de volta,</Text>
      <Text style={styles.name}>{userName}</Text>
      <TouchableOpacity style={styles.btn} onPress={go}>
        <Text style={styles.textbtn}>CONTINUAR</Text>
      </TouchableOpacity>
    </View>
  );
}

import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";

import api from "../../../services/api";
import Url from "../../../utils/Url";

export default function Cardapio() {
  const [bgColor, setBgColor] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  const enterprise = route.params.enterprise;

  async function close() {
    navigation.navigate("Order");
  }

  async function loaddata() {
    try {
      const response = await api.get("/config/custom", {
        headers: {
          Authorization: enterprise.id,
        },
      });
      setBgColor(response.data[0].backgound_app);
    } catch (error) {
      alert("não foi possivel encontrar essas empresa!");
    }
  }

  //dados da empresa
  useEffect(() => {
    loaddata();
  }, [enterprise.id]);

  return (
    <View style={[styles.container, { backgroundColor: `${bgColor}` }]}>
      <TouchableOpacity style={styles.close} onPress={close}>
        <Feather name="x" size={28} color="#000000" />
      </TouchableOpacity>
      <Image
        style={styles.cardapio}
        source={{
          uri: `${Url}/file/cardapio/${enterprise.cardapio}`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 10,
  },

  close: {
    marginLeft: "auto",
  },

  cardapio: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 4,
  },
});

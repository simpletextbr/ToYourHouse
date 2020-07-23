import React, { useState, useEffect } from "react";
import { View, Image, Text, FlatList, AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

import api from "../../services/api";

import LogoHeader from "../../assets/LogoHeader.png";
import NOLOGO from "../../assets/NOLOGO.png";
import styles from "./styles";

export default function Dashboard() {
  const [enterprise, setEnterprise] = useState([]);

  const [userName, setUsername] = useState("");
  const [userId, setId] = useState("");

  const navigation = useNavigation();

  async function go(enterprise) {
    await AsyncStorage.setItem("userName", userName);
    await AsyncStorage.setItem("userId", userId);
    navigation.navigate("Order", { enterprise });
  }

  async function sendMail() {
    MailComposer.composeAsync({
      subject: "Report de Bug no ToYourHouse",
      recipients: ["bugreportoyourhouse@gmail.com"],
      body: `Ola ToyourHouse Meu Nome é ${userName} e quanto eu utilizava o aplicativo ocorreu isso: `,
    });
  }

  //Enterprise List
  useEffect(() => {
    async function loadlist() {
      const response = await api.get("/mobile/list");
      setEnterprise(response.data);
    }
    loadlist();
  }, []);

  //dados do usuario
  useEffect(() => {
    async function loaddata() {
      setUsername(await AsyncStorage.getItem("userName"));
      setId(await AsyncStorage.getItem("userId"));
    }
    loaddata();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Image source={LogoHeader} />
        <Text style={styles.welcome}>Olá {userName}, Seja Bem-Vindo</Text>
      </View>

      <FlatList
        data={enterprise}
        style={styles.enterpriseList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(enterprises) => String(enterprises.id)}
        renderItem={({ item: enterprises }) => (
          <Animatable.View
            style={styles.enterprise}
            animation="bounceInUp"
            duration={1000}
          >
            <View style={styles.row}>
              <Image
                style={styles.enterpriselogo}
                resizeMode="contain"
                source={
                  enterprises.logo === null
                    ? NOLOGO
                    : {
                        uri: `http://192.168.1.9:3333/file/logo/${enterprises.logo}`,
                      }
                }
              />
              <View style={styles.dados}>
                <Text style={styles.name}>{enterprises.name}</Text>
                <Text style={styles.address}>{enterprises.address}</Text>
                <Text style={styles.cityUf}>
                  {enterprises.city}, {enterprises.uf}
                </Text>
              </View>
              <TouchableOpacity onPress={() => go(enterprises)}>
                <View style={styles.contato}>
                  <Text style={styles.Textphone}>Whatsapp</Text>
                  <Text style={styles.phone}>{enterprises.phone}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        )}
      />
      <View style={styles.bugreport}>
        <TouchableOpacity onPress={sendMail}>
          <MaterialCommunityIcons name="ladybug" size={36} color="#FFEA00" />
          <Text style={styles.textReport}>Reportar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

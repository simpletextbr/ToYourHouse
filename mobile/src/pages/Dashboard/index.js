import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  AsyncStorage,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

import api from "../../services/api";

import LogoHeader from "../../assets/LogoHeader.png";
import Url from "../../utils/Url";
import NOLOGO from "../../assets/NOLOGO.png";
import styles from "./styles";

export default function Dashboard() {
  const [enterprise, setEnterprise] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  async function loadlist() {
    if (loading) {
      return;
    }

    if (total > 0 && enterprise.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get(`/mobile/list?page=${page}`);

    setEnterprise([...enterprise, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  //Enterprise List
  useEffect(() => {
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
      <Animated.View style={styles.Header}>
        <Image source={LogoHeader} />
        <Text style={styles.welcome}>Olá {userName}, Seja Bem-Vindo</Text>
      </Animated.View>

      <FlatList
        data={enterprise}
        style={styles.enterpriseList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(enterprises) => String(enterprises.id)}
        onEndReached={loadlist}
        onEndReachedThreshold={0.2}
        renderItem={({ item: enterprises }) => (
          <Animatable.View
            style={styles.enterprise}
            animation="fadeInUp"
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
                        uri: `${Url}/file/logo/${enterprises.logo}`,
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

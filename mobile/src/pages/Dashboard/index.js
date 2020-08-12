import React, { useState, useEffect } from "react";
import { View, Image, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";

import { Feather } from "@expo/vector-icons";
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

  async function logOut() {
    try {
      await api.delete(`/user/${userId}`);

      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (error) {
      alert("Não foi possivel sair, tente fechar o app e abri-lo novamente!");
    }
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
      <View style={styles.Header}>
        <Image source={LogoHeader} style={styles.LogoHeader} />
        <Text style={styles.welcome}>Olá {userName}, Seja Bem-Vindo</Text>
        <Feather
          style={styles.logout}
          name="log-out"
          size={23}
          color="#FF0000"
          onPress={logOut}
        />
      </View>

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
              {enterprises.status === 0 ? (
                <Text
                  style={{ color: "#FF0000", fontSize: 20, fontWeight: "bold" }}
                >
                  {" "}
                  Fechado
                </Text>
              ) : (
                <View style={styles.orderhub}>
                  <TouchableOpacity onPress={() => go(enterprises)}>
                    <View style={styles.contato}>
                      <Text style={styles.Textphone}>PEDIR</Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.status}>
                    {enterprises.status === 1 ? (
                      <Text
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        - Tempo de entrega{" "}
                        <Text
                          style={{
                            color: "#44CC44",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          10 - 20 min
                        </Text>
                      </Text>
                    ) : enterprises.status === 2 ? (
                      <Text
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        Tempo de entrega{" "}
                        <Text
                          style={{
                            color: "#ADFF2F",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          20 - 30 min
                        </Text>
                      </Text>
                    ) : enterprises.status === 3 ? (
                      <Text
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        Tempo de entrega{" "}
                        <Text
                          style={{
                            color: "#F0E68C",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          30 - 40 min
                        </Text>
                      </Text>
                    ) : enterprises.status === 4 ? (
                      <Text
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        Tempo de entrega{" "}
                        <Text
                          style={{
                            color: "#FFD700",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          40 - 50 min
                        </Text>
                      </Text>
                    ) : enterprises.status === 5 ? (
                      <Text
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        Tempo de entrega{" "}
                        <Text
                          style={{
                            color: "#FFA500",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          50 - 60 min
                        </Text>
                      </Text>
                    ) : enterprises.status === 6 ? (
                      <Text
                        style={{
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        Tempo de entrega{" "}
                        <Text
                          style={{
                            color: "#FF4500",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          + de 1Hr
                        </Text>{" "}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 12, color: "#FF0000" }}>
                        {" "}
                        Sem Status Definido
                      </Text>
                    )}
                  </Text>
                </View>
              )}
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

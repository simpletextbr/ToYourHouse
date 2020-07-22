import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Linking,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";
import { FlatList } from "react-native-gesture-handler";

export default function VisualCheck() {
  const route = useRoute();
  const navigation = useNavigation();

  const order = route.params.order;
  const enterprise = route.params.enterprise;
  const orderdata = route.params.orderdata;

  const message = `Ola ${enterprise.name} meu nome é ${orderdata[0].ClientName} e eu gostaria de fazer esse pedido:
  `;

  const pedido = ` ${order.map(
    (orders) =>
      `
      😋Pedido ${orders.orderNumber + 1}: Um ${orders.productname}, ${
        orders.productAdd.length === 0
          ? "Sem Acréscimos."
          : orders.havAdds === "false".trim()
          ? ""
          : `Com Acréscimo de: ${orders.productAdd.map(
              (adds) => `${adds.name} `
            )}`
      }`
  )}`;
  const End = `
  
  🏠O Endereço de entrega é: ${orderdata[0].Address}, N°: ${orderdata[0].AddressNumber}, Bairro: ${orderdata[0].Neighborhood}.
  🏠Ponto de Referencia é: ${orderdata[0].Reference}.

  `;
  const Pgt = `
  💰Minha forma de Pagamento é: ${orderdata[0].PaymentMethod} 
  `;

  async function cancel() {
    await AsyncStorage.setItem("userName", orderdata[0].ClientName);
    await AsyncStorage.setItem("userId", orderdata[0].ClientId);
    navigation.navigate("Dashboard");
  }

  async function send() {
    Linking.openURL(
      `whatsapp://send?phone=55${enterprise.phone}&text=${message}${pedido}${End}${Pgt}`
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `${orderdata[0].Background}` },
      ]}
    >
      <View style={styles.Header}>
        <Image
          style={styles.enterpriselogo}
          resizeMode="contain"
          source={
            enterprise.logo === null
              ? NOLOGO
              : { uri: `http://192.168.1.9:3333/file/logo/${enterprise.logo}` }
          }
        />
        <Text style={styles.enterprisename}>{enterprise.name}</Text>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={28} color="#000000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Dados Do Pedido</Text>
      <View style={styles.content}>
        <FlatList
          data={order}
          keyExtractor={(orders) => String(orders.orderNumber)}
          renderItem={({ item: orders }) => (
            <View style={styles.order}>
              <Text style={styles.titleorders}>
                <Text style={{ fontWeight: "bold" }}>
                  Pedido {orders.orderNumber + 1}
                </Text>
                : {orders.productname}
              </Text>
              {orders.productAdd.length === 0 ? (
                <Text style={styles.adds}>Sem Acréscimos</Text>
              ) : orders.havAdds === "false".trim() ? (
                <Text style={styles.adds}>
                  Este produto não recebe acréscimos.
                </Text>
              ) : (
                orders.productAdd.map((adds) => (
                  <View key={adds.AddNumber} style={styles.listadds}>
                    <Text style={styles.adds}>{adds.name}</Text>
                  </View>
                ))
              )}
            </View>
          )}
        />
      </View>
      <View style={styles.rowbuttons}>
        <TouchableOpacity style={styles.cancelBtn} onPress={cancel}>
          <Text style={styles.canceltittle}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendBtn} onPress={send}>
          <Text style={styles.sendtittle}>Enviar</Text>
          <MaterialCommunityIcons name="check-all" size={23} color="#054F77" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

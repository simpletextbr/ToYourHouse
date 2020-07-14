import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Picker,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";
import api from "../../services/api";

export default function orderFinal() {
  //address infos
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [reference, setReference] = useState("");

  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  const order = route.params.order;
  const enterprise = route.params.enterprise;
  const orderdata = route.params.orderdata;

  async function pedir() {
    orderdata[0] = {
      FinalProductsValue: orderdata[0].FinalProductsValue,
      FinalAddsValue: orderdata[0].FinalAddsValue,
      FinalPrice: orderdata[0].FinalPrice,
      ClientName: orderdata[0].ClientName,
      ClientId: orderdata[0].ClientId,
      OrderTo: enterprise.name,
      PaymentMethod: payment,
      Address: address,
      AddressNumber: addressNumber,
      Neighborhood: neighborhood,
      Reference: reference,
      Background: orderdata[0].Background,
      BtnColor: orderdata[0].BtnColor,
    };

    console.log(orderdata);
  }

  useEffect(() => {
    function loadpayments() {
      api
        .get("/config/payments", {
          headers: {
            Authorization: enterprise.id,
          },
        })
        .then((response) => setPayments(response.data));
    }

    loadpayments();
  }, [enterprise.id]);

  useEffect(() => {
    function loaduser() {
      api
        .get("/user", {
          headers: {
            Authorization: orderdata[0].ClientId,
          },
        })
        .then((response) => setUser(response.data));
    }

    loaduser();
  }, [orderdata[0].ClientId]);

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
              : { uri: `http://192.168.1.12:3333/file/logo/${enterprise.logo}` }
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
      <View style={styles.DeliveryInfo}>
        <Text style={styles.TitleDelivery}>Endereço de Entrega</Text>
        {user.map((userdata) =>
          userdata.address === null ? (
            <View>
              <View key={userdata.id} style={styles.rowAddressandNumber}>
                <TextInput
                  style={styles.inputadderss}
                  placeholder="Rua"
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  autoCorrect={true}
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                />
                <TextInput
                  style={styles.inputadderssNumber}
                  placeholder="N°"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={addressNumber}
                  onChangeText={(text) => setAddressNumber(text)}
                />
              </View>
              <View style={styles.neighborhoodReference}>
                <TextInput
                  style={styles.inputneighborhood}
                  placeholder="Seu Bairro"
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  value={neighborhood}
                  onChangeText={(text) => setNeighborhood(text)}
                />
                <TextInput
                  style={styles.inputreference}
                  placeholder="Ponto de Referencia"
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  value={reference}
                  onChangeText={(text) => setReference(text)}
                />
              </View>
            </View>
          ) : (
            <View key={userdata.id}>
              <Text style={[styles.endereco, { marginTop: 10 }]}>
                <Text style={{ fontWeight: "bold" }}>Padrão: </Text>
                {userdata.address}, n°: {userdata.addressNumber},{" "}
                {userdata.neighborhood}.
              </Text>
              <Text style={styles.endereco}>
                <Text style={{ fontWeight: "bold" }}>
                  Ponto de Referencia:{" "}
                </Text>{" "}
                {userdata.reference}
              </Text>
              <TouchableOpacity
                style={[
                  styles.changebtn,
                  { backgroundColor: `${orderdata[0].BtnColor}` },
                ]}
              >
                <Text style={{ color: "#ffffff" }}>Mudar</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
      <View style={styles.paymentmethod}>
        <Text style={styles.TitlePayment}>Forma De Pagamento</Text>
        <Picker
          selectedValue={payment}
          style={styles.piker}
          onValueChange={(type) => setPayment(type)}
        >
          <Picker.Item label="Selecione uma forma de Pagamento" value={null} />
          {payments.map((payment) => (
            <Picker.Item
              key={payment.id}
              label={payment.title}
              value={payment.title}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.FinalValue}>
        <Text style={styles.TitleFinalValue}>Valor Total Do Pedido</Text>
        <Text style={styles.value}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(orderdata[0].FinalPrice)}
        </Text>
        <TouchableOpacity
          style={[
            styles.pedirBtn,
            { backgroundColor: `${orderdata[0].BtnColor}` },
          ]}
          onPress={pedir}
        >
          <Text style={styles.pedirTitle}>PEDIR</Text>
          <MaterialCommunityIcons
            style={{ marginRight: 10 }}
            name="cart-arrow-down"
            size={40}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

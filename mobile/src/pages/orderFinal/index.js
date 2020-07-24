import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Picker,
  Animated,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";

import api from "../../services/api";

import Url from "../../utils/Url";
import styles from "./styles";

export default function orderFinal() {
  //animation address
  const [boxWidth] = useState(new Animated.Value(0));
  const [boxHeight] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(0));
  //address infos
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [reference, setReference] = useState("");
  //dados do pagamento
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState(null);
  const [exchange, setExchange] = useState("");
  const [needexchange, setNeedExchange] = useState();

  const route = useRoute();
  const navigation = useNavigation();

  const order = route.params.order;
  const enterprise = route.params.enterprise;
  const orderdata = route.params.orderdata;

  async function pedir() {
    const data = {
      address,
      addressNumber,
      neighborhood,
      reference,
    };

    if (
      user[0].Address === null ||
      user[0].addressNumber === null ||
      user[0].neighborhood === null ||
      user[0].reference === null
    ) {
      if (
        address === "".trim() ||
        addressNumber === "".trim() ||
        neighborhood === "".trim() ||
        reference === "".trim()
      ) {
        alert("Você precisa preencher seu endereço completo");
      } else if (payment === null) {
        alert("Você precisa selecionar uma forma de pagamento");
      } else {
        orderdata[0] = {
          FinalProductsValue: orderdata[0].FinalProductsValue,
          FinalAddsValue: orderdata[0].FinalAddsValue,
          FinalPrice: orderdata[0].FinalPrice,
          ClientName: orderdata[0].ClientName,
          ClientId: orderdata[0].ClientId,
          OrderTo: enterprise.name,
          PaymentMethod:
            needexchange === true
              ? `${payment}, sem troco`
              : `${payment}, com troco para ${Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(exchange)}`,
          Address: user[0].address === null ? address : user[0].address,
          AddressNumber:
            user[0].addressNumber === null
              ? addressNumber
              : user[0].addressNumber,
          Neighborhood:
            user[0].neighborhood === null ? neighborhood : user[0].neighborhood,
          Reference: user[0].reference === null ? reference : user[0].reference,
          Background: orderdata[0].Background,
          BtnColor: orderdata[0].BtnColor,
        };

        await api.put("/mobile/order/address", data, {
          headers: {
            Authorization: orderdata[0].ClientId,
          },
        });
        navigation.navigate("VisualCheck", { order, enterprise, orderdata });
      }
    } else {
      if (payment === null) {
        alert("Você precisa selecionar uma forma de pagamento");
      } else {
        orderdata[0] = {
          FinalProductsValue: orderdata[0].FinalProductsValue,
          FinalAddsValue: orderdata[0].FinalAddsValue,
          FinalPrice: orderdata[0].FinalPrice,
          ClientName: orderdata[0].ClientName,
          ClientId: orderdata[0].ClientId,
          OrderTo: enterprise.name,
          PaymentMethod:
            needexchange === true
              ? `${payment}, sem troco`
              : `${payment}, com troco para ${Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(exchange)}`,
          Address: user[0].address === null ? address : user[0].address,
          AddressNumber:
            user[0].addressNumber === null
              ? addressNumber
              : user[0].addressNumber,
          Neighborhood:
            user[0].neighborhood === null ? neighborhood : user[0].neighborhood,
          Reference: user[0].reference === null ? reference : user[0].reference,
          Background: orderdata[0].Background,
          BtnColor: orderdata[0].BtnColor,
        };

        navigation.navigate("VisualCheck", { order, enterprise, orderdata });
      }
    }
  }

  async function seeaddressinput() {
    Animated.parallel([
      Animated.timing(boxWidth, {
        toValue: 380,
        duration: 100,
      }),
      Animated.timing(boxHeight, {
        toValue: 180,
        duration: 400,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
      }),
    ]).start();
  }

  async function hideaddressinput() {
    Animated.parallel([
      Animated.timing(boxWidth, {
        toValue: 0,
        duration: 600,
      }),
      Animated.timing(boxHeight, {
        toValue: 0,
        duration: 300,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
      }),
    ]).start();
  }

  async function changeAddress() {
    const data = {
      address,
      addressNumber,
      neighborhood,
      reference,
    };

    await api.put("/mobile/order/address", data, {
      headers: {
        Authorization: orderdata[0].ClientId,
      },
    });

    Animated.parallel([
      Animated.timing(boxWidth, {
        toValue: 0,
        duration: 600,
      }),
      Animated.timing(boxHeight, {
        toValue: 0,
        duration: 300,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
      }),
    ]).start();
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
  }, [user[0]]);

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
              : { uri: `${Url}/file/logo/${enterprise.logo}` }
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
            <View key={userdata.id}>
              <View style={styles.rowAddressandNumber}>
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
              <View>
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
                  onPress={seeaddressinput}
                >
                  <Text style={{ color: "#ffffff" }}>Mudar</Text>
                </TouchableOpacity>
              </View>
              <Animated.View
                style={{
                  width: boxWidth,
                  height: boxHeight,
                  opacity: opacity,
                  padding: 10,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.rowAddressandNumber}>
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
                <View style={styles.rowbuttons}>
                  <TouchableOpacity
                    onPress={hideaddressinput}
                    style={[
                      styles.changebtn,
                      { backgroundColor: "#FF0000", marginRight: 20 },
                    ]}
                  >
                    <Text style={{ color: "#FFFFFF" }}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.changebtn,
                      {
                        backgroundColor: `${orderdata[0].BtnColor}`,
                        marginLeft: 20,
                      },
                    ]}
                    onPress={() => {
                      changeAddress();
                    }}
                  >
                    <Text style={{ color: "#FFFFFF" }}>Mudar</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
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
        {payment === "Dinheiro" ? (
          <View style={styles.rowexchange}>
            <Text style={styles.textNeedExchange}>Precisa de Troco?</Text>
            {needexchange === true ? null : (
              <TextInput
                style={styles.inpuexchange}
                placeholder="R$0,00"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={exchange}
                onChangeText={(text) => setExchange(text)}
              />
            )}
            <CheckBox
              value={needexchange}
              onValueChange={() =>
                needexchange ? setNeedExchange(false) : setNeedExchange(true)
              }
            />
            <Text style={styles.textCheckBox}>Não</Text>
          </View>
        ) : null}
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

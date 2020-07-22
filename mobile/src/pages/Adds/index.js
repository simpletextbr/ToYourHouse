import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import styles from "./styles";
import api from "../../services/api";

export default function Adds() {
  const [adds, setAdds] = useState([]);

  //animação do carrinho
  const [orderWidth] = useState(new Animated.Value(0));
  const [orderHeigth] = useState(new Animated.Value(0));

  const route = useRoute();
  const navigation = useNavigation();

  const order = route.params.order;
  const enterprise = route.params.enterprise;
  const orderdata = route.params.orderdata;

  let bgColor = orderdata[0].Background;
  let btColor = orderdata[0].BtnColor;
  let j = 0;
  let aN = 0;
  let lasti = 0;
  let FinalAddsValue = 0;
  let FinalProductsValue = orderdata[0].FinalProductsValue;

  async function closeAnimations() {
    Animated.timing(orderWidth, {
      toValue: 0,
      duration: 200,
    }).start();

    Animated.timing(orderHeigth, {
      toValue: 0,
      duration: 100,
    }).start();
  }

  async function seeOrder() {
    Animated.timing(orderWidth, {
      toValue: 380,
      duration: 100,
    }).start();

    Animated.timing(orderHeigth, {
      toValue: 100,
      duration: 400,
    }).start();
  }

  async function Add(add) {
    for (let i = 0; i < order.length; i++) {
      if (order[i].orderNumber === add[1].orderNumber) {
        if (lasti !== i) {
          j = 0;
        }
        if (!order[i].productAdd[j]) {
          lasti = i;
          (orderdata[0] = {
            FinalProductsValue: orderdata[0].FinalProductsValue,
            FinalAddsValue: (FinalAddsValue += add[0].price),
            FinalPrice: FinalProductsValue + FinalAddsValue,
            ClientName: orderdata[0].ClientName,
            ClientId: orderdata[0].ClientId,
            OrderTo: enterprise.name,
            PaymentMethod: null,
            Background: bgColor,
            BtnColor: btColor,
            havAdds: orderdata[0].havAdds,
          }),
            (order[i].productAdd[j] = {
              name: add[0].name,
              price: add[0].price,
              id: add[0].id,
              AddNumber: aN++,
            });
          j++;
        }
      }
    }
  }

  async function next() {
    navigation.navigate("OrderFinal", { order, enterprise, orderdata });
  }

  useEffect(() => {
    async function loadAdds() {
      const response = await api.get("/adds", {
        headers: {
          Authorization: enterprise.id,
        },
      });
      setAdds(response.data);
    }
    loadAdds();
  }, [enterprise.id]);

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
      <Text style={styles.title}>Adicionar Acréscimos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {order.map((order) =>
          order.havAdds === "false".trim() ? null : (
            <View key={order.orderNumber}>
              <TouchableOpacity
                style={{ alignItems: "center", marginBottom: 20 }}
                onPress={() => seeOrder()}
              >
                <Text style={styles.productName}>{order.productname}</Text>
                <Text style={styles.detail}>Mais Detalhes</Text>
                <Feather name="chevron-down" size={20} color="#000000" />
              </TouchableOpacity>
              <Animated.View
                style={{
                  width: orderWidth,
                  height: orderHeigth,
                  backgroundColor: "#FFF",
                  borderRadius: 6,
                  marginRight: 20,
                  marginLeft: 20,
                }}
              >
                <TouchableOpacity
                  style={styles.close}
                  onPress={closeAnimations}
                >
                  <Feather
                    name="x"
                    size={20}
                    color="#FFFFFF"
                    style={{
                      backgroundColor: "#FF0000",
                      margin: 5,
                      borderRadius: 50,
                    }}
                  />
                </TouchableOpacity>
                <FlatList
                  data={order.productAdd}
                  keyExtractor={(add) =>
                    add === undefined ? null : String(add.AddNumber)
                  }
                  renderItem={({ item: add }) =>
                    add !== null ? (
                      <View style={styles.listadds}>
                        <Text style={styles.adds}>{add.name}</Text>
                        <Text style={styles.priceadds}>
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(add.price)}
                        </Text>
                      </View>
                    ) : null
                  }
                />
              </Animated.View>
              <ScrollView
                style={styles.rowadds}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.content}>
                  {adds.map((add) =>
                    enterprise.id === add.enterprise_id ? (
                      <View key={add.id} style={styles.add}>
                        <Text style={styles.nameadds}>{add.name}</Text>
                        <TouchableOpacity
                          style={styles.input}
                          onPress={() => Add([add, order])}
                        >
                          <Feather
                            name="plus-circle"
                            size={16}
                            color={`${orderdata}`}
                          />
                          <Text style={styles.adc}>Adicionar</Text>
                        </TouchableOpacity>
                        <Text style={styles.priceadds}>
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(add.price)}
                        </Text>
                      </View>
                    ) : null
                  )}
                </View>
              </ScrollView>
            </View>
          )
        )}
      </ScrollView>
      {order.length === 1 ? null : (
        <Animatable.Text
          animation="shake"
          duration={2000}
          iterationCount="infinite"
          style={styles.dica}
        >
          Arraste para o lado para o proximo pedido{" "}
          <Feather
            name="arrow-right"
            size={10}
            color={`${orderdata[0].BtnColor}`}
          />
        </Animatable.Text>
      )}
      <View style={styles.rowbuttons}>
        <TouchableOpacity
          style={[
            styles.nextbutton,
            { backgroundColor: `${orderdata[0].BtnColor}` },
          ]}
          onPress={() => next()}
        >
          <MaterialCommunityIcons
            name="page-next-outline"
            size={36}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";

export default function VisualCheck() {
  const route = useRoute();
  const navigation = useNavigation();

  const order = route.params.order;
  const enterprise = route.params.enterprise;
  const orderdata = route.params.orderdata;

  async function seetroch() {
    console.log(orderdata);
    console.log(enterprise);
    console.log(order);
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
      <TouchableOpacity
        onPress={seetroch}
        style={{
          alignSelf: "center",
          backgroundColor: `${orderdata[0].BtnColor}`,
          width: 380,
          height: 50,
        }}
      />
    </View>
  );
}

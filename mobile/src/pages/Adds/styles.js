import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 10,
  },

  Header: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  enterpriselogo: {
    width: 32,
    height: 28,
  },

  enterprisename: {
    marginLeft: 10,
    fontWeight: "bold",
  },

  back: {
    marginLeft: "auto",
  },

  close: {
    marginLeft: "auto",
  },

  title: {
    marginTop: 20,
    fontSize: 23,
    textAlign: "center",
  },

  listadds: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
    borderRadius: 4,
    width: 360,
    height: 32,
    backgroundColor: "#E5E5E5",
  },

  productName: {
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
  },

  adds: {
    marginTop: 4,
    fontSize: 16,
  },

  detail: {
    fontSize: 10,
    fontWeight: "bold",
  },

  content: {
    width: 380,
    flexDirection: "column",
  },

  rowadds: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
  },

  add: {
    backgroundColor: "#E5E5E544",
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  nameadds: {
    textAlign: "center",
  },

  input: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  adc: {
    alignItems: "center",
    fontSize: 10,
  },

  priceadds: {
    fontWeight: "bold",
    textAlign: "center",
  },

  dica: {
    textAlign: "center",
    marginTop: 10,
  },

  rowbuttons: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  nextbutton: {
    padding: 4,
    borderRadius: 4,
    height: 42,
    width: 42,
    marginLeft: "auto",
    marginBottom: 20,
  },
});

export default styles;

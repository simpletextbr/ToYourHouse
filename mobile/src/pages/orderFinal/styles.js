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

  DeliveryInfo: {
    paddingHorizontal: 40,
  },

  TitleDelivery: {
    marginTop: 40,
    fontSize: 20,
    textAlign: "center",
  },

  endereco: {
    fontSize: 16,
  },

  changebtn: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 100,
    height: 40,
    borderRadius: 4,
  },

  rowAddressandNumber: {
    flexDirection: "row",
    marginTop: 20,
  },

  inputadderss: {
    width: "90%",
    borderRadius: 6,
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#BEBEBE",
  },

  inputadderssNumber: {
    width: "10%",
    marginLeft: 2,
    borderRadius: 6,
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#BEBEBE",
  },

  neighborhoodReference: {
    flexDirection: "row",
    marginTop: 2,
  },

  inputneighborhood: {
    width: "30%",
    borderRadius: 6,
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#BEBEBE",
  },

  inputreference: {
    width: "70%",
    marginLeft: 2,
    borderRadius: 6,
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#BEBEBE",
  },

  paymentmethod: {
    paddingHorizontal: 40,
    marginTop: 20,
  },

  TitlePayment: {
    marginTop: 40,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },

  piker: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
  },

  FinalValue: {
    marginTop: 40,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  TitleFinalValue: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },

  value: {
    textAlign: "center",
    fontSize: 60,
  },

  pedirBtn: {
    flexDirection: "row",
    marginTop: 20,
    width: "50%",
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },

  pedirTitle: {
    fontSize: 40,
    marginLeft: 10,
    color: "#FFFFFF",
  },
});

export default styles;

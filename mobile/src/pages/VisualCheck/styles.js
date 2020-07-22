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

  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  content: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF44",
    width: "90%",
    height: "70%",
    marginTop: 20,
    borderRadius: 4,
  },

  order: {
    paddingHorizontal: 10,
    marginTop: 10,
  },

  titleorders: {
    fontSize: 23,
  },

  listadds: {
    flexDirection: "row",
  },

  adds: {
    color: "#808080",
  },

  rowbuttons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: "space-between",
  },

  cancelBtn: {
    width: "30%",
    height: 40,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },

  canceltittle: {
    color: "#FFFFFF",
  },

  sendBtn: {
    flexDirection: "row",
    width: "40%",
    height: 40,
    backgroundColor: "#FFFFFF99",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },

  sendtittle: {
    marginRight: 20,
  },
});

export default styles;

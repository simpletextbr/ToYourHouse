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
});

export default styles;

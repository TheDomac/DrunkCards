import {
  StyleSheet
} from "react-native";

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 24
  },
  centeredItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#eee",
    fontSize: 20,
    fontFamily: "signika"
  },
  rowWrapper: {
    flexDirection: "row",
  },
  homeWrapper: {
    flex: 1
  },
  homeMenuWrapper: {
    flex: 1,
    justifyContent: "center"
  },
  homeAdBanner: {
    justifyContent: "flex-end"
  }
});

export default styles;

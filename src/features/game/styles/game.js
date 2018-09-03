import {
  StyleSheet
} from "react-native";

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  topBarItem: {
    padding: 20
  },
  card: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    margin: 40,
    borderRadius: 8
  },
  cardText: {
    fontSize: 35,
    textAlign: "center"
  },
  roundButton: {
    width: 70,
    height: 70,
    margin: 0,
    marginBottom: 20,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333"
  },
  description: {
    textAlign: "center",
    margin: 30
  }
});

export default styles;

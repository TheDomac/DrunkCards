import {
  StyleSheet
} from "react-native";

const styles = StyleSheet.create({
  ruleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#eee",
    borderBottomWidth: 1
  },
  scrollView: {
    flex: 1
  },
  cardButtonsWrapper: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flexWrap: "wrap"
  },
  cardButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 5
  }
});

export default styles;

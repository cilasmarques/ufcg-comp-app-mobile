import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: "#004A8F",
    height: "100%",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F1F3FF",
    textAlign: "center",
    padding: 10,
  },
  imageBackgroundContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 10,
  },
  userData: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F1F3FF",              
  },
  itemsContainer: {
    backgroundColor: "#F1F3FF",
    height: "100%",
    padding: 10,
    borderRadius: 10,
  }
});

export default styles;
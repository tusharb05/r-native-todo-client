import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../App";

export default function HomeScreen({ route, navigation }) {
  const { loggedIn, loginDetails } = useContext(AuthContext);
  console.log(loginDetails);
  if (!loggedIn) {
    //condition if no stored details
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: "700" }}>
          You are not logged in!
        </Text>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ color: "white", fontSize: 25 }}>Sign up</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 20, marginBottom: 15 }}>OR</Text>

        <TouchableOpacity
          style={styles.btn2}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ fontSize: 25, color: "#fff" }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={mainStyles.container}>
        <Text>Logged in!</Text>
      </View>
    );
  }
}
const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f194ff",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    marginTop: 100,
    // justifyContent: "center",
  },
  btn1: {
    backgroundColor: "#f194ff",
    paddingHorizontal: 17,
    paddingVertical: 5,
    paddingBottom: 7,
    borderRadius: 10,
    marginVertical: 15,
  },
  btn2: {
    backgroundColor: "#FF5C58",
    paddingHorizontal: 18,
    paddingVertical: 5,
    paddingBottom: 7,
    borderRadius: 10,
  },
});
// export default function HomeScreen({ route, navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text>Home Screen</Text>
//       <Text>
//         Data from initialParams: {route.params.item}..........
//         {route.params.newData}
//       </Text>
//       <Button
//         title="register"
//         onPress={() =>
//           navigation.navigate("Register", {
//             text: "this is text",
//           })
//         }
//       />
//     </View>
//   );
// }

import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Register from "./Register";
import Login from "./Login";

export default function HomeScreen({ route, navigation }) {
  if (true) {
    //condition if no stored details
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: "700" }}>
          You are not logged in!
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#f194ff",
            paddingHorizontal: 17,
            paddingVertical: 5,
            paddingBottom: 7,
            borderRadius: 10,
            marginVertical: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: 25 }}>Sign up</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 20, marginBottom: 15 }}>OR</Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#FF5C58",
            paddingHorizontal: 18,
            paddingVertical: 5,
            paddingBottom: 7,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 25, color: "#fff" }}>Sign in</Text>
        </TouchableOpacity>
        {/* <View style={{ paddingVertical: 20 }}>
          <Button
            title="register"
            onPress={() => navigation.navigate("Register")}
            color="#f194ff"
          />
        </View>
        <Button
          title="sign in"
          onPress={() => navigation.navigate("Login")}
          color="#FF5C58"
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    marginTop: 100,
    // justifyContent: "center",
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

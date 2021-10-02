import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AuthContext } from "../App";
// import { Formik } from "formik";

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoginDetails } = useContext(AuthContext);

  const handleSubmit = () => {
    if (username !== "" && email !== "" && password !== "") {
      fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "successfully registered") {
            // let { username, email, password, _id } = data;
            // setLoginDetails({ username, email, password, _id });
            setUsername("");
            setEmail("");
            setPassword("");
            navigation.navigate("Login");
          } else {
            alert("Failure! Please try again later");
          }
        });
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
      {/* <Text>{username}</Text> */}
      <Text style={styles.heading}>Sign Up!</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(val) => setUsername(val)}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(val) => setEmail(val)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(val) => setPassword(val)}
        placeholder="Password"
      />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={{ fontSize: 19, fontWeight: "550", color: "#fff" }}>
          Sign me up!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    borderColor: "#5C7AEA",
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  heading: {
    fontSize: 28,
    fontWeight: "650",
    marginHorizontal: "auto",
  },
  btn: {
    backgroundColor: "#5C7AEA",
    width: 150,
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 10,
    borderRadius: 10,
  },
});
// export default function Register({ route, navigation }) {
//   console.log(route);
//   const { text } = route.params;
//   // const navigationHandler = () => {
//   // navigation.navigate("Register"); //won't do anything if we already on the register screen
//   // navigation.push("Register"); //would go to register again even when we are there so we will have to click back button multiple times to return to home
//   //push always adds new route to navigation stack regardless of current route
//   // };

//   // navigation.popToTop(),  goes back to the first screen in the stack.

//   return (
//     <View>
//       <Text>Register Screen</Text>
//       <Text>{text}</Text>
//       <Button
//         title="upadte params"
//         onPress={() => navigation.setParams({ text: "new text!" })}
//       />
//       <Button
//         title="give new data for previous screen!!"
//         onPress={() => navigation.navigate("Home", { newData: 2 })}
//       />
//       {/* <Button title="register" onPress={navigationHandler} /> */}
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//       <Button
//         title="Update the title"
//         onPress={() => navigation.setOptions({ title: "Updated!" })}
//       />
//     </View>
//   );
// }

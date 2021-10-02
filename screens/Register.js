import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const styles = StyleSheet.create({});

export default function Register() {
  return (
    <View>
      <Text>Register</Text>
    </View>
  );
}

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

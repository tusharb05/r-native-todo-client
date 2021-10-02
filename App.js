// import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Register from "./screens/Register";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();
export const AuthContext = React.createContext();
export const TodoContext = React.createContext();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});

  const [todos, setTodos] = useState([]);
  return (
    <NavigationContainer>
      <AuthContext.Provider
        value={{ loggedIn, setLoggedIn, loginDetails, setLoginDetails }}
      >
        <TodoContext.Provider value={{ todos, setTodos }}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </TodoContext.Provider>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

// function LogoTitle() {
//   return (
//     <Image
//       style={{ width: 50, height: 50 }}
//       source={require("@expo/snack-static/react-native-logo.png")}
//     />
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       {/* <Stack.Navigator initialRouteName="Home" screenOptions={{ title: "" }}> */}
//       <Stack.Navigator initialRouteName="Home" screenOptions={{ title: null }}>
//         {/*constains all screens */}
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           initialParams={{ item: 1 }}
//           // options={{ title: "Home" }}
//           options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
//           // options={{ header: () => null }}
//         />
//         <Stack.Screen
//           name="Register"
//           component={Register}
//           // options={{ header: () => null }}
//           // options={{ title: "Register" }}
//           options={{
//             title: "Register",
//             headerStyle: {
//               backgroundColor: "#f4511e",
//             },
//             headerTintColor: "#eee",
//             headerTitleStyle: {
//               fontWeight: "500",
//             },
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

{
  /* <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View> */
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// Passing params to nested navigators
// If you have nested navigators, you need to pass params a bit differently. For example, say you have a navigator inside the Account screen, and want to pass params to the Settings screen inside that navigator. Then you can pass params as following:

// navigation.navigate('Account', {
//   screen: 'Settings',
//   params: { user: 'jane' },
// });

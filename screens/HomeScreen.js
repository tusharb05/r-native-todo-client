import React, { useContext, useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { AuthContext, TodoContext } from "../App";
import { AntDesign } from "react-native-vector-icons";

export default function HomeScreen({ route, navigation }) {
  const { loggedIn, loginDetails } = useContext(AuthContext);
  const { todos, setTodos } = useContext(TodoContext);
  // console.log(loginDetails);

  const [showForm, setShowForm] = useState(false);
  const [todoAdded, setTodoAdded] = useState(false);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (loggedIn) {
      fetch("http://localhost:5000/api/todo/get", {
        method: "POST",
        body: JSON.stringify({
          authorID: loginDetails._id,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTodos(data.todos);
        });
    }
  }, [todoAdded]);

  const handleTodoSubmit = () => {
    if (todo.trim() !== "") {
      fetch("http://localhost:5000/api/todo/add", {
        method: "POST",
        body: JSON.stringify({ todo: todo, authorID: loginDetails._id }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTodoAdded(!todoAdded);
        });

      setShowForm(false);
    } else {
      Alert.alert("Fill out the fields first!");
    }
  };

  if (!loggedIn) {
    // production one: !loggedIn
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={showForm}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setShowForm(!showForm);
          }}
        >
          <View style={mainStyles.centeredView}>
            <View style={mainStyles.modalView}>
              <Text style={mainStyles.modalText}>Add Todo</Text>

              <TextInput
                placeholder="Enter Your Todo"
                value={todo}
                onChangeText={(val) => setTodo(val)}
                style={mainStyles.input}
              />

              <Pressable
                style={[mainStyles.button, mainStyles.buttonClose]}
                onPress={handleTodoSubmit}
              >
                <Text style={mainStyles.textStyle}>Add Todo</Text>
              </Pressable>

              <Pressable
                style={mainStyles.goBackBtn}
                onPress={() => setShowForm(false)}
              >
                <Text
                  style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}
                >
                  Go Back
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={mainStyles.addBtn}
          onPress={() => setShowForm(true)}
        >
          <AntDesign
            name="pluscircle"
            color="#f194ff"
            size={40}
            // style={mainStyles.addBtn}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const mainStyles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    bottom: 40,
    right: 10,
  },
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    borderColor: "#5C7AEA",
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  goBackBtn: {
    backgroundColor: "#f194ff",
    padding: 5,
    borderRadius: 10,
    marginTop: 13,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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

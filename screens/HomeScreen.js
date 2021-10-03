import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Modal,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { AuthContext, TodoContext } from "../App";
import { AntDesign, FontAwesome } from "react-native-vector-icons";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const { loggedIn, loginDetails } = useContext(AuthContext);
  const { todos, setTodos } = useContext(TodoContext);
  // console.log(loginDetails);

  const [showForm, setShowForm] = useState(false);
  const [todoAdded, setTodoAdded] = useState(false);
  const [todo, setTodo] = useState("");

  const isFocussed = useIsFocused();

  // const widthOfScreen = Dimensions.get("window").width;
  // const heightOfScreen = Dimensions.get("window").height;
  // console.log(isFocussed);
  // if (loggedIn) {
  //   useFocusEffect(
  //     useCallback(() => {
  //       console.log("hello");
  //     })
  //   );
  // }

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
          console.log("todos: ", data);
          setTodos(data.todos);
          // console.log(isFocussed);
        });
    }
  }, [todoAdded, isFocussed]);

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
          setTodo("");
          setTodoAdded(!todoAdded);
        });

      setShowForm(false);
    } else {
      Alert.alert("Fill out the fields first!");
    }
  };

  const handleDelete = (item) => {
    fetch("http://localhost:5000/api/todo/remove", {
      method: "POST",
      body: JSON.stringify({
        todoID: item._id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "removed") {
          console.log(data);
          setTodos(todos.filter((x) => x._id !== item._id));
        }
      });
  };

  const handleComplete = (item) => {
    fetch("http://localhost:5000/api/todo/complete", {
      method: "POST",
      body: JSON.stringify({
        todoID: item._id,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "updated") {
          console.log(data);
          setTodoAdded(!todoAdded);
        }
      });
  };

  const handleUnComplete = (item) => {
    fetch("http://localhost:5000/api/todo/uncomplete", {
      method: "POST",
      body: JSON.stringify({ todoID: item._id }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "updated") {
          console.log(data);
          setTodoAdded(!todoAdded);
        }
      });
  };

  const handleStar = (item) => {
    fetch("http://localhost:5000/api/todo/star", {
      method: "POST",
      body: JSON.stringify({ todoID: item._id }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "updated") return setTodoAdded(!todoAdded);
      });
  };

  const handleUnStar = (item) => {
    fetch("http://localhost:5000/api/todo/unstar", {
      method: "POST",
      body: JSON.stringify({ todoID: item._id }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "updated") return setTodoAdded(!todoAdded);
      });
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
        <View style={mainStyles.todoList}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <View style={mainStyles.singleTodoView}>
                <View
                  style={{
                    position: "relative",
                    right: 85,
                    width: "100%",
                    maxWidth: "80%",
                  }}
                >
                  <Text style={mainStyles.singleTodo}>{item.todo}</Text>
                </View>

                <View
                  style={{
                    position: "relative",
                    left: 50,
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  {
                    //asdf
                    item.completed ? (
                      <TouchableOpacity
                        style={{ marginRight: 6 }}
                        onPress={() => handleUnComplete(item)}
                      >
                        <AntDesign
                          name="checkcircle"
                          size={20}
                          color="#57CC99"
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{ marginRight: 6 }}
                        onPress={() => handleComplete(item)}
                      >
                        <AntDesign name="checkcircleo" size={20} />
                      </TouchableOpacity>
                    )
                  }

                  {
                    //asdf
                    item.starred ? (
                      <TouchableOpacity
                        style={{ marginRight: 6 }}
                        onPress={() => handleUnStar(item)}
                      >
                        <AntDesign name="star" size={20} color="#FFB830" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{ marginRight: 6 }}
                        onPress={() => handleStar(item)}
                      >
                        <AntDesign name="staro" size={20} />
                      </TouchableOpacity>
                    )
                  }

                  <TouchableOpacity onPress={() => handleDelete(item)}>
                    <FontAwesome name="trash" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>

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
  singleTodoView: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 100,
    marginHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#B5DEFF",
    borderRadius: 10,
    marginTop: 7,
    justifyContent: "space-between",
  },
  singleTodo: {
    // width: "100%",
    flex: 1,
    flexWrap: "wrap",
    // backgroundColor: "red",
  },
  addBtn: {
    position: "absolute",
    bottom: 40,
    right: 10,
    position: "fixed",
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

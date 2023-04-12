import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const BaseURL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(BaseURL)
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          console.log("Error message", response.status);
        }
      })
      .catch((err) => {
        console.log("Error message", err);
      });
  }, []);

  const onChangeText = (text) => {
    setSearch(text);
  };

  const onFilteredData = () => {
    const filteredData = posts.filter((item) => item.title.includes(search));
    setPosts(filteredData);
  };

  const onKeyExtractor = (item) => {
    return item.id.toString();
  };

  const onRenderItems = useCallback(({ item, index }) => {
    return (
      <View style={styles.renderContainer}>
        <Text>
          {index + 1} {". "} {item.title}
        </Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Enter search text"
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        style={styles.touchableBtnStyle}
        activeOpacity={0.7}
        onPress={onFilteredData}
      >
        <Text>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={onRenderItems}
        keyExtractor={onKeyExtractor}
        ListEmptyComponent={null}
        style={styles.flatListStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInputStyle: {
    height: 55,
    width: 190,
    borderColor: "black",
    borderWidth: 1
  },
  renderContainer: {
    margin: 6,
    padding: 6,
    borderRadius: 6
  },
  touchableBtnStyle: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddinHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#000FFF"
  },
  flatListStyle: {
    maxHeight: 280
  }
});

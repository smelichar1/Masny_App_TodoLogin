import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function TodoListPage({ username }) {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const addTodo = () => {
    if (todoText.trim()) {
      setTodos([...todos, todoText]);
      setTodoText('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to Todo List, {username}!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo"
          onChangeText={setTodoText}
          value={todoText}
        />
        <Button title="Add Todo" onPress={addTodo} />
      </View>
      <FlatList
        style={styles.list}
        data={todos}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text>{item}</Text>
            <Button title="Remove" onPress={() => removeTodo(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  list: {
    width: '100%',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
});

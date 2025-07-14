import { useMutation, useQuery } from 'convex/react'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { api } from '../../convex/_generated/api'
import useTheme from '../../hooks/useTheme'

export default function Index() {
    const { toggleDarkMode } = useTheme()

    const todos = useQuery(api.todo.getTodos)
    console.log(todos)

    const addTodo = useMutation(api.todo.addTodo)

    const clearAllTodos = useMutation(api.todo.clearAllTodos)

    return (
        <View style={styles.container}>
            <Text>Index</Text>
            <TouchableOpacity onPress={toggleDarkMode}>
                <Text>Toggle Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addTodo({ text: "New Todo" })}>
                <Text>Add Todo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => clearAllTodos()}>
                <Text>Clear All Todos</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

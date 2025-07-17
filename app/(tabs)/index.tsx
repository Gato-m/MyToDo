import { createHomeStyles } from '@/assets/styles/home.styles';
import LoadingSpinner from '@/components/LoadingSpinner';
import TodoInput from '@/components/todoInput';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../../components/header';
import useTheme from '../../hooks/useTheme';

type Todo = Doc<todos>

export default function Index() {
    const { colors } = useTheme()

    const homeStyles = createHomeStyles(colors);

    const todos = useQuery(api.todo.getTodos)
    console.log(todos)

    const isLoading = todos === undefined

    if (isLoading) return <LoadingSpinner />

    const renderTodoItem = ({ item }: { item: Todo }) => {
        return (
            <View style={homeStyles.todoItemWrapper}>
                <LinearGradient colors={colors.gradients.surface}
                    style={homeStyles.todoItem}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <TouchableOpacity
                        style={homeStyles.checkbox}
                        activeOpacity={0.7}
                        onPress={() => { }}>
                        <LinearGradient
                            colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
                            style={[homeStyles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border }]}
                        >
                            {item.isCompleted && <Ionicons name="checkmark" size={24} color="white" />}
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={homeStyles.todoText}>{item.text}</Text>
                </LinearGradient >
            </View >
        )
    }

    return (
        <>
            <StatusBar barStyle={colors.statusBarStyle} />
            <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
                <SafeAreaView style={homeStyles.safeArea}>
                    <Header />
                    <TodoInput />

                    <FlatList
                        data={todos}
                        renderItem={renderTodoItem}
                        keyExtractor={(item) => item._id}
                        style={homeStyles.todoList}
                        contentContainerStyle={homeStyles.todoListContent}
                        showsVerticalScrollIndicator={false}
                    />
                </SafeAreaView>
            </LinearGradient>
        </>
    )
}


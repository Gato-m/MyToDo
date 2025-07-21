import { createHomeStyles } from '@/assets/styles/home.styles';
import EmptyState from '@/components/EmptyState';
import LoadingSpinner from '@/components/LoadingSpinner';
import TodoInput from '@/components/todoInput';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../../components/header';

type Todo = Doc<todos>;

export default function Index() {
    const { colors } = useTheme()

    const homeStyles = createHomeStyles(colors);

    const todos = useQuery(api.todo.getTodos)
    console.log(todos)

    const toggleTodo = useMutation(api.todo.toggleTodo);
    const deleteTodo = useMutation(api.todo.deleteTodo);
    const updateTodo = useMutation(api.todo.updateTodo);

    const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
    const [editText, setEditText] = useState<string>("");

    const isLoading = todos === undefined

    if (isLoading) return <LoadingSpinner />

    const handleToggleTodo = async (id: Id<"todos">) => {
        try {
            await toggleTodo({ id });
        } catch (error) {
            console.log("Error toggling todo", error);
            Alert.alert("Error", "Failed to toggle todo");
        }
    };

    const handleDeleteTodo = async (id: Id<"todos">) => {

        Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => deleteTodo({ id }),
            },
        ]);
    };

    const handleEditTodo = (todo: Todo) => {
        setEditingId(todo._id)
        setEditText(todo.text)
    }
    const handleSaveEdit = async () => {
        if (editingId) {
            try {
                await updateTodo({ id: editingId, text: editText.trim() })
                setEditingId(null)
                setEditText("")
            } catch (error) {
                console.log("Error updating todo", error)
                Alert.alert("Error", "Failed to update todo")
            }
        }
    }

    const handleCancelEdit = () => {
        setEditingId(null)
        setEditText("")
    }


    const renderTodoItem = ({ item }: { item: Todo }) => {
        const isEditing = editingId === item._id
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
                        onPress={() => handleToggleTodo(item._id)}>
                        <LinearGradient
                            colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
                            style={[homeStyles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border }]}
                        >
                            {item.isCompleted && <Ionicons name="checkmark" size={24} color="white" />}
                        </LinearGradient>
                    </TouchableOpacity>

                    {isEditing ? (
                        <View style={homeStyles.editContainer}>
                            <TextInput
                                value={editText}
                                onChangeText={setEditText}
                                style={homeStyles.editInput}
                                autoFocus
                                multiline
                                placeholder="Edit todo"
                                placeholderTextColor={colors.textMuted}
                            />

                            <View style={homeStyles.editButtons}>
                                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                                        <Ionicons name="checkmark" size={16} color="#fff" />
                                        <Text style={homeStyles.editButtonText}>Save</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.danger} style={homeStyles.editButton}>
                                        <Ionicons name="close" size={16} color="#fff" />
                                        <Text style={homeStyles.editButtonText}>Cancel</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>

                    ) : (
                        <View style={homeStyles.todoTextContainer}>
                            <Text
                                style={[homeStyles.todoText,
                                item.isCompleted && {
                                    textDecorationLine: "line-through",
                                    color: colors.textMuted,
                                    opacity: 0.6,
                                },]} >
                                {item.text}</Text>

                            <View style={homeStyles.todoActions}>
                                <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                                        <Ionicons name="pencil" size={14} color="#fff" />
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                                        <Ionicons name="trash" size={14} color="#fff" />
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    }
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
                        ListEmptyComponent={<EmptyState />}
                    />
                </SafeAreaView>
            </LinearGradient>
        </>
    )
}


import { createHomeStyles } from '@/assets/styles/home.styles';
import TodoInput from '@/components/todoInput';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StatusBar, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../../components/header';
import useTheme from '../../hooks/useTheme';

export default function Index() {
    const { colors } = useTheme()

    const homeStyles = createHomeStyles(colors);

    const todos = useQuery(api.todo.getTodos)
    console.log(todos)

    return (
        <>
            <StatusBar barStyle={colors.statusBarStyle} />
            <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
                <SafeAreaView style={homeStyles.safeArea}>
                    <Header />
                    <TodoInput />
                    {todos?.map((todo) => <Text key={todo._id}>{todo.text}</Text>)}

                </SafeAreaView>
            </LinearGradient>
        </>
    )
}


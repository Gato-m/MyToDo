import { createHomeStyles } from '@/assets/styles/home.styles';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../../components/header';
import useTheme from '../../hooks/useTheme';

export default function Index() {
    const { toggleDarkMode, colors } = useTheme()

    const homeStyles = createHomeStyles(colors);

    return (
        <>
            <StatusBar barStyle={colors.statusBarStyle} />
            <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
                <SafeAreaView style={homeStyles.safeArea}>
                    <Header />
                    <TouchableOpacity onPress={toggleDarkMode}>
                        <Text>Toggle Mode</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        </>
    )
}


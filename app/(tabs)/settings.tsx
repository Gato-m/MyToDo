import { createSettingsStyles } from '@/assets/styles/settings.styles'
import Preferences from '@/components/Preferences'
import ProgressStats from '@/components/ProgressStats'
import useTheme from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'

const SettingsScreen = () => {


    const { colors } = useTheme()

    const settingsStyles = createSettingsStyles(colors)

    return (
        <LinearGradient colors={colors.gradients.background} style={settingsStyles.container}>
            <SafeAreaView style={settingsStyles.safeArea}>
                <View style={settingsStyles.header}>
                    <View style={settingsStyles.titleContainer}>
                        <LinearGradient colors={colors.gradients.primary} style={settingsStyles.iconContainer}>
                            <Ionicons name="settings" size={28} color={colors.text} />
                        </LinearGradient>
                        <Text style={settingsStyles.title}>SettingsScreen</Text>
                    </View>
                </View>

                <ScrollView style={settingsStyles.scrollView}
                    contentContainerStyle={settingsStyles.content}
                    showsVerticalScrollIndicator={false}>

                    <ProgressStats />
                    <Preferences />

                </ScrollView>

            </SafeAreaView>
        </LinearGradient>
    )
}

export default SettingsScreen
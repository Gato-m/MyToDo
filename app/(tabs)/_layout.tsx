import { Ionicons, } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import useTheme from '../../hooks/useTheme';

const _layout = () => {
    const { colors } = useTheme();
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarStyle: {
                backgroundColor: colors.surface,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                height: 90,
                paddingBottom: 30,
                paddingTop: 15,
            },
            tabBarLabelStyle: {
                fontSize: 13,
                fontWeight: "bold",
            },
            headerShown: false,
        }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: "ToDo",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="flash-outline" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import useTheme from '../../hooks/useTheme'

export default function Index() {
    const { toggleDarkMode } = useTheme()

    return (
        <View style={styles.container}>
            <Text>Index</Text>
            <TouchableOpacity onPress={toggleDarkMode}>
                <Text>Toggle Mode</Text>
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

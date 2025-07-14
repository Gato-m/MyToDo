import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useTheme, { ColorScheme } from '../../hooks/useTheme';

export default function Index() {
    const { toggleDarkMode, colors } = useTheme()

    const styles = createStyles(colors);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Index</Text>
            <TouchableOpacity onPress={toggleDarkMode}>
                <Text style={styles.text}>Toggle Mode</Text>
            </TouchableOpacity>
        </View>
    )
}

const createStyles = (colors: ColorScheme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: colors.bg,
        },
        text: {
            color: colors.text,
        }
    });
};
import { Text, View, StyleSheet } from "react-native";

export default function About() {
    return (
        <View style={styles.bg2}>
            <Text style={styles.t2}>About</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    bg2: {
        backgroundColor: "green",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    t2: {
        color: "white",
        fontSize: 50,
        fontWeight: "bold",
        textAlign: "center",
    }
});
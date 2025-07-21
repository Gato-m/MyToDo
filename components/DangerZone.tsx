import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const DangerZone = () => {
    const { colors } = useTheme();

    const settingsStyles = createSettingsStyles(colors);

    // Mutation hook
    const clearAllTodos = useMutation(api.todo.clearAllTodos);

    // Disable button while running
    const [isLoading, setIsLoading] = useState(false);

    const handleResetApp = () => {
        Alert.alert(
            "Reset App",
            "⚠️ This will delete ALL your todos permanently. This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete All",
                    style: "destructive",
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            const result = await clearAllTodos();
                            Alert.alert(
                                "App Reset",
                                `Successfully deleted ${result?.deletedCount ?? 0} todo${(result?.deletedCount === 1 ? "" : "s")}.`
                            );
                        } catch (error) {
                            console.error("Error deleting all todos", error);
                            Alert.alert("Error", "Failed to reset app.");
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },
            ]
        );
    };

    return (
        <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
            <Text style={settingsStyles.sectionTitleDanger}>Danger Zone</Text>

            <TouchableOpacity
                style={[settingsStyles.actionButton, { borderBottomWidth: 0, opacity: isLoading ? 0.6 : 1 }]}
                onPress={handleResetApp}
                activeOpacity={0.7}
                disabled={isLoading}
            >
                <View style={settingsStyles.actionLeft}>
                    <LinearGradient colors={colors.gradients.danger} style={settingsStyles.actionIcon}>
                        <Ionicons name="trash" size={18} color="#ffffff" />
                    </LinearGradient>
                    <Text style={settingsStyles.actionTextDanger}>
                        {isLoading ? "Resetting..." : "Reset App"}
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default DangerZone;

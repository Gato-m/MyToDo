import React, { useState } from 'react'
import { Text, View } from 'react-native'

const [isAutoSync, setIsAutoSync] = useState(true)
const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true)

const Preferences = () => {
    return (
        <View>
            <Text>Preferences</Text>
        </View>
    )
}

export default Preferences
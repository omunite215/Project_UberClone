import React, { useState } from 'react'
import { View } from 'react-native'
import { Switch } from 'react-native-gesture-handler'

const ActiveStatusSwitch = () => {
    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View>
        <Switch
          trackColor={{false: '#2A2A2A', true: '#80ED99'}}
          thumbColor={isEnabled ? '#F3F3F3' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
    </View>
  )
}

export default ActiveStatusSwitch
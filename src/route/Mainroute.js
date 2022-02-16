import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Homepage from '../modules/Homepage'

const Stack = createStackNavigator()

const Mainroute = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Homepage"
            >
                <Stack.Screen
                    name="Homepage"
                    component={Homepage}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Mainroute
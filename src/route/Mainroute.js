import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Homepage from '../modules/Homepage'
import Pokedex from '../modules/Pokedex'
import { Provider } from 'react-redux'
import store from '../redux/store'

const Stack = createStackNavigator()

const Mainroute = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Homepage"
                >
                    <Stack.Screen
                        name="Homepage"
                        component={Homepage}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Pokedex"
                        component={Pokedex}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default Mainroute
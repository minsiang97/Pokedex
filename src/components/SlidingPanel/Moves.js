import React, {useEffect, useState} from 'react'
import SlidingUpPanel from "rn-sliding-up-panel";
import { View , Text, ScrollView , StyleSheet , TouchableOpacity , Image, Animated, Easing, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Foundation'
import { useDispatch, useSelector } from 'react-redux'
import ProgressBar from '../ProgressBar';


const Moves = (props) => {
    const {pokemonDescription, pokemon, dragging, setDragging} = props

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Moves</Text>
            <ScrollView
                onTouchStart={() => setDragging(false)}
                onTouchEnd={() => setDragging(true)}
                onTouchCancel={() => setDragging(true)}
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.abilityView}>
                {pokemon.moves.map((item) => {
                    return (
                        <View style={styles.moveView}>
                            <Text>{item.move.name}</Text>
                        </View>
                    )
                })}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    moveView:{
        borderRadius: 26,
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: 'rgba(244,244,245,1)',
        marginTop: 10,
        marginRight: 5
    },
    scrollView: {
        flexGrow: 1
        
    },
    abilityView: {
        paddingBottom: 60,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    }
})

export default Moves
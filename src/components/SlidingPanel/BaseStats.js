import React, {useEffect, useState} from 'react'
import SlidingUpPanel from "rn-sliding-up-panel";
import { View , Text, ScrollView , StyleSheet , TouchableOpacity , Image, Animated, Easing, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Foundation'
import { useSelector } from 'react-redux'
import ProgressBar from '../ProgressBar';

const BaseStats = (props) => {
    const {pokemonDescription, pokemon} = props
    
    return (
        <View style={styles.content}>
            <FlatList
                data={pokemon.stats}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.statsView}>
                            <View style={styles.statName}>
                                <Text style={styles.stat}>{item.stat.name.charAt(0).toUpperCase() + item.stat.name.slice(1)}</Text>
                            </View>
                            <View style={styles.statScore}>
                                <Text style={styles.score}>{item.base_stat}</Text>
                            </View>
                            <View style={styles.statBar}>
                                <ProgressBar 
                                    backgroundColor={'rgb(243,241,244)'} 
                                    paddingPass={2}
                                    score={item.base_stat}
                                    totalScore={200}
                                    progressBackgroundColor={'rgb(230,106,90)'}
                                />
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    statsView: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    statName: {
        flex: 0.25,
    },
    statScore: {
        flex: 0.2
    },
    statBar: {
        flex: 0.6,
    },
    stat: {
        color: 'rgb(165,164,169)',
        fontWeight: '500'
    },
    score: {
        fontWeight: '500'
    }
})

export default BaseStats
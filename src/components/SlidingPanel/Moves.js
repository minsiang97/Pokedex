import React, {useEffect, useState} from 'react'
import SlidingUpPanel from "rn-sliding-up-panel";
import { View , Text, ScrollView , StyleSheet , TouchableOpacity , Image, Animated, Easing, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Foundation'
import { useDispatch, useSelector } from 'react-redux'
import ProgressBar from '../ProgressBar';


const Moves = (props) => {
    const {pokemonDescription, pokemon, dragging, setDragging} = props
    const pokemonMoves = useSelector((state) => state.pokemons.pokemonMovesDetails)

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
                    <View style={styles.moveView}>
                        <View style={styles.name}>
                            <Text style={styles.tableHeader}>Moves</Text>
                        </View>
                        <View style={styles.type}>
                            <Text style={styles.tableHeader}>Type</Text>
                        </View>
                        <View style={styles.damageCategory}>
                            <Text style={styles.tableHeader}>Cat.</Text>
                        </View>
                        <View style={styles.accuracy}>
                            <Text style={styles.tableHeader}>Acc.</Text>
                        </View>
                        <View style={styles.power}>
                            <Text style={styles.tableHeader}>Pwr.</Text>
                        </View>
                        <View style={styles.pp}>
                            <Text style={styles.tableHeader}>PP</Text>
                        </View>
                    </View>
                    <FlatList
                        data={pokemonMoves}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                            return (
                                <View style={styles.moveView}>
                                    <View style={styles.name}>
                                        <Text style={styles.tableChild}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                                    </View>
                                    <View style={styles.type}>
                                        <Text style={styles.tableChild}>{item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}</Text>
                                    </View>
                                    <View style={styles.damageCategory}>
                                        <Text style={styles.tableChild}>{item.damage_class.name.charAt(0).toUpperCase() + item.damage_class.name.slice(1)}</Text>
                                    </View>
                                    <View style={styles.accuracy}>
                                        <Text style={styles.tableChild}>{item.accuracy ? item.accuracy : '-'}</Text>
                                    </View>
                                    <View style={styles.power}>
                                        <Text style={styles.tableChild}>{item.power ? item.power: '-'}</Text>
                                    </View>
                                    <View style={styles.pp}>
                                        <Text style={styles.tableChild}>{item.pp}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
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
        flexDirection: 'row',
        paddingVertical: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        flexGrow: 1
        
    },
    abilityView: {
        paddingBottom: 60,
        marginTop: 10,
    },
    name: {
        flex: 0.25,
    },
    type: {
        flex: 0.2
    },
    damageCategory: {
        flex: 0.2
    },
    accuracy: {
        flex: 0.15
    },
    power: {
        flex: 0.15
    },
    pp: {
        flex: 0.1
    },
    tableHeader: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    tableChild: {
        alignSelf: 'center',
    }
})

export default Moves
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, View, Image, StyleSheet, TouchableOpacity, Text, FlatList, TextInput, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import LoadingComponent from '../components/LoadingComponent'
import { getPokemonDescription, getPokemonEvolution, getPokemonMovesDetails, getPokemons } from '../redux/action/pokemons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import CardImage from '../components/CardImage'



const Generations = ({navigation}) => {
    const generations = useSelector((state) => state.pokemons.generations)
    const loading = useSelector((state) => state.pokemons.loading)
    
    const dispatch = useDispatch()
    
    const _nextPage = async (pokemon) => {
        dispatch(getPokemons(pokemon.url, navigation))
    }

    return (
        <>
        {loading ?
        <LoadingComponent modalVisible={loading}/>
        : null}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/pokeball.png')} 
                    resizeMode="cover"
                    style={styles.backgroundImage}
                />
                <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
                    <Icon name={'arrow-back'} size={25}/>
                </TouchableOpacity>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Generations</Text>
                    <FlatList
                        data={generations}
                        contentContainerStyle={{paddingBottom: 30, marginTop: 20}}
                        keyExtractor={(item,index) => index.toString()}
                        scrollEnabled={false}
                        renderItem={({item, index}) => {
                            return (
                                <CardImage
                                    title={item.name} 
                                    heightPass={40} 
                                    color={'white'} 
                                    widthPass={'80%'}
                                    textColor={'black'}
                                    borderColor={'rgb(233,110,93)'}
                                    // image={require('../assets/images/generations.png')}
                                    textCenter={true}
                                    borderWidth={1}
                                    onClickPass={() => _nextPage(item)}
                                />
                            )
                        }}
                        horizontal={false}
                    />
                </View>
            </View>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: 'white',
        overflow: 'hidden',
        minHeight: '100%'
    },
    container : {
        paddingTop: 100,
        paddingHorizontal: 30,
        paddingBottom: 60,
    },
    backgroundImage: {
        position: 'absolute',
        top: -20,
        right: -100,
        height: 280,
        width: 280,
        tintColor: 'rgb(244,244,245)',
    },
    titleView : {
        marginTop: 35
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    backArrow: {
        alignSelf: 'flex-start'
    },
    searchContainer: {
        marginTop: 30,
        borderRadius: 26,
        backgroundColor: 'rgb(245,244,245)',
        flexDirection: 'row',
        paddingVertical: 10,
    },  
    searchFilter: {
       flex: 1,
       fontSize: 15,
       fontWeight: '500'
    },
    searchIcon: {
        marginHorizontal: 10,
    },
})

export default Generations
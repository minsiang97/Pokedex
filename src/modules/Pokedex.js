import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, View, Image, StyleSheet, TouchableOpacity, Text, FlatList, TextInput, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import LoadingComponent from '../components/LoadingComponent'
import { getPokemonDescription, getPokemonEvolution, getPokemonMovesDetails } from '../redux/action/pokemons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import color from '../assets/color'



const Pokedex = ({navigation}) => {
    const pokemons = useSelector((state) => state.pokemons.pokemons)
    const loading = useSelector((state) =>  state.pokemons.loading)
    const [searchFilter, setSearchFilter] = useState("")
    const [filteredPokemons, setFilteredPokemons] = useState(pokemons)
    
    const dispatch = useDispatch()
    
    const _nextPage = (pokemon) => { 
        dispatch(getPokemonDescription(pokemon, navigation)) 
        
    }

    useEffect(() => {
        if (searchFilter.length > 0){
            const filtered = pokemons.filter((item) => item.name.toLowerCase().includes(searchFilter.toLowerCase()))
            setFilteredPokemons(filtered)
        } else {
            setFilteredPokemons(pokemons)
        }
    },[searchFilter, pokemons])

    return (
        <>
        {loading ?
        <LoadingComponent modalVisible={loading}/>
        : null}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                        <Text style={styles.title}>Pokedex</Text>
                        <View style={styles.searchContainer}>
                            <Icon2 name={'search'} size={25} style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchFilter}
                                placeholder={'Search Pokemon'}
                                onChangeText={setSearchFilter}
                            />
                        </View>
                        <FlatList
                            data={filteredPokemons}
                            numColumns={2}
                            columnWrapperStyle={{justifyContent: 'space-between'}}
                            contentContainerStyle={{paddingBottom: 30}}
                            keyExtractor={(item,index) => index.toString()}
                            scrollEnabled={false}
                            renderItem={({item, index}) => {
                                return (
                                    <Card 
                                        title={item.name} 
                                        heightPass={140} 
                                        color={color(item.types[0].type.name)} 
                                        types={item.types}
                                        widthPass={'48%'}
                                        pokemonImage={item.sprites.front_default}
                                        pokedex={true}
                                        onClickPass={() => _nextPage(item)}
                                    />
                                )
                            }}
                            horizontal={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
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

export default Pokedex
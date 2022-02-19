import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, View, Image, StyleSheet, TouchableOpacity, Text, FlatList, TextInput, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../components/Card'
import LoadingComponent from '../components/LoadingComponent'
import { getPokemonDescription, getPokemonEvolution } from '../redux/action/pokemons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'



const Pokedex = ({navigation}) => {
    const pokemons = useSelector((state) => state.pokemons.pokemons)
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [searchFilter, setSearchFilter] = useState("")
    const [filteredPokemons, setFilteredPokemons] = useState(pokemons)
    
    const dispatch = useDispatch()
    
    const _nextPage = (index, pokemon) => {
        setLoadingSpinner(true)
        axios.get(pokemon.species.url)
        .then(res => {
            if (res.data){
                dispatch(getPokemonDescription(res.data))
                getEvolutionChain(index, res.data)
            }
        })
        
    }

    const getEvolutionChain = (index, pokemon) => {
        axios.get(pokemon.evolution_chain.url)
        .then(res => {
            if (res.data){
                dispatch(getPokemonEvolution(res.data))
                setLoadingSpinner(false)
                navigation.navigate('PokemonProfile', {index})
            }
        })
    }

    useEffect(() => {
        setLoadingSpinner(false)
    },[])

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
        {loadingSpinner ?
        <LoadingComponent modalVisible={loadingSpinner} setModalVisible={setLoadingSpinner} />
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
                                        color={ 
                                            item.types[0].type.name == 'fire' ? 
                                            'rgb(233,110,93)' 
                                            : item.types[0].type.name == 'grass' ? 
                                            'rgb(111,189,167)'
                                            : item.types[0].type.name == 'water' ?
                                            'rgb(90,155,230)' 
                                            : item.types[0].type.name == 'bug' ?
                                            'rgb(118,86,136)'
                                            : item.types[0].type.name == 'electric' ?
                                            'rgb(239,199,95)'
                                            : 'rgb(169,117,110)'
                                        } 
                                        types={item.types}
                                        widthPass={'48%'}
                                        pokemonImage={item.sprites.front_default}
                                        pokedex={true}
                                        onClickPass={() => _nextPage(index, item)}
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
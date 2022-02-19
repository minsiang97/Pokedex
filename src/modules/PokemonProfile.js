import React, { useEffect, useRef } from 'react'
import { View , Text, ScrollView , StyleSheet , TouchableOpacity , Image, Animated, Easing, FlatList, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import SlidingUpPanel from "rn-sliding-up-panel";
import SlidingPanel from '../components/SlidingPanel/SlidingUpPanel';

const height = Dimensions.get('window').height

const PokemonProfile = ({route, navigation}) => {
    const {index} = route.params

    const pokemon = useSelector((state) => state.pokemons.pokemons[index] )
    const pokemonDescription = useSelector((state) => state.pokemons.pokemonDescription)
    const spin = new Animated.Value(0)
    const inputRange = [0, 1];
    const outputRange = ['0deg', '360deg'];
    const spinning = spin.interpolate({inputRange, outputRange});

   

    const fadeIn = new Animated.Value(0)
    
   
    useEffect(() => {
        startSpinningAnimation()
    },[])

    const startSpinningAnimation = () => {
        Animated.loop(
            Animated.timing(
              spin,
              {
               toValue: 1,
               duration: 2000,
               useNativeDriver: true,
               easing: Easing.linear
              }
            )
        ).start();
    }

    // const startFadeInAnimation = () => {
    //     Animated.timing(
    //         fadeIn,
    //         {
    //         toValue: 1,
    //         duration: 500,
    //         useNativeDriver: true,
    //         // easing: Easing.linear
    //         }
    //     )
        
    // }

    // const startFadeOutAnimation = () => {
    //     Animated.timing(
    //         fadeIn,
    //         {
    //         toValue: 0,
    //         duration: 1000,
    //         useNativeDriver: true,
    //         easing: Easing.linear
    //         }
    //     )
        
    // }
    
    return (
        <View 
        style={[
            styles.container,
            {
            backgroundColor: 
            pokemon.types[0].type.name == 'fire' ? 
            'rgb(233,110,93)' 
            : pokemon.types[0].type.name == 'grass' ? 
            'rgb(111,189,167)'
            : pokemon.types[0].type.name == 'water' ?
            'rgb(90,155,230)' 
            : pokemon.types[0].type.name == 'bug' ?
            'rgb(118,86,136)'
            : pokemon.types[0].type.name == 'electric' ?
            'rgb(239,199,95)'
            : 'rgb(169,117,110)',
        }]}>
            <Animated.Image
                source={require('../assets/images/pokeball.png')} 
                resizeMode="cover"
                style={[styles.backgroundImage, {transform: [{rotate: spinning}]}]}
            />
            <Image
                source={{uri : pokemon.sprites.front_default}} 
                resizeMode="cover"
                style={styles.pokemonImage}
            />
            <View>
                <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
                    <Icon name={'arrow-back'} size={25} color={'white'}/>
                </TouchableOpacity>
                <Animated.View style={{
                    opacity : fadeIn
                }} >
                    <Text>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text> 
                </Animated.View>
            </View>
            
            <View style={styles.pokemonDetails}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.pokemonName}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
                    <Text style={styles.id}>#{pokemon.id.toString().length == 2 ? '0' + pokemon.id.toString() : pokemon.id.toString().length == 1 ? '00' + pokemon.id.toString() : pokemon.id}</Text>
                </View>
                
                <FlatList
                    data={pokemon.types}
                    contentContainerStyle={styles.typeView}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                        return (
                            <View style={styles.typeDiv}>
                                <Text style={styles.type}>{item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)}</Text>
                            </View>
                        )
                    }}
                />
            </View>
            <SlidingPanel pokemonDescription={pokemonDescription} pokemon={pokemon}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 100,
    },
    backgroundImage: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        position:"absolute",
        top:'35%',
        transform:[{translateY : -50}],
        tintColor: '#f5f5f5',
        opacity: 0.4
    },
    pokemonImage: {
        width: 200,
        height: 200,
        position: 'absolute',
        alignSelf: 'center',
        top:'40%',
        transform:[{translateY : -50}],
    },
    pokemonDetails: {
        marginTop: 20
    },
    pokemonName: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    typeView: {
        flexDirection: 'row',
        marginTop: 10
    },
    typeDiv: {
        marginRight: 10,
        backgroundColor: 'rgba(244,244,245,0.2)',
        paddingHorizontal: 20,
        paddingVertical: 3,
        borderRadius: 26,
        
    },
    type: {
        color: 'white',
        fontWeight: 'bold'
    },
    backArrow: {
        alignSelf: 'flex-start'
    },
    id : {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    panel : {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 26
    }
})

export default PokemonProfile
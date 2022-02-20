import React, {useEffect, useState} from 'react'
import SlidingUpPanel from "rn-sliding-up-panel";
import { View , Text, ScrollView , StyleSheet , TouchableOpacity , Image, Animated, Easing, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Foundation'
import { useDispatch, useSelector } from 'react-redux'
import ProgressBar from '../ProgressBar';
import { getPokemonEvolution } from '../../redux/action/pokemons';

const Evolution = (props) => {
    const {pokemonDescription, pokemon, dragging, setDragging} = props
    const evolutionChain = useSelector(state => state.pokemons.pokemonEvolution)
    const [evolution, setEvolution] = useState(null)

    useEffect(() => {
        getEvolution()
    },[])

    const getEvolution = () => {
        let evoChain = [];
        let evoData = evolutionChain.chain;

        do {
        let numberOfEvolutions = evoData['evolves_to'].length;  
        var evoDetails = evoData['evolution_details'][0]
        const idArr = evoData.species.url.split('/')
        
        evoChain.push({
            'id': idArr[idArr.length -2],
            "species_name": evoData.species.name,
            "min_level": !evoDetails ? 1 : evoDetails.min_level,
            "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
            "item": !evoDetails ? null : evoDetails.item
        });

        if(numberOfEvolutions > 1) {
            for (let i = 1;i < numberOfEvolutions; i++) { 
                const arr = evoData.evolves_to[i].species.url.split('/')
            evoChain.push({
                'id': arr[arr.length -2],
                "species_name": evoData.evolves_to[i].species.name,
                "min_level": !evoData.evolves_to[i]? 1 : evoData.evolves_to[i].evolution_details[0].min_level,
                "trigger_name": !evoData.evolves_to[i]? null : evoData.evolves_to[i].evolution_details[0].trigger.name,
                "item": !evoData.evolves_to[i]? null : evoData.evolves_to[i].evolution_details[0].item
            });
            }
        }        

        evoData = evoData['evolves_to'][0];

        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

        setEvolution(evoChain)
    } 

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Evolution Chain</Text>
            <ScrollView
                onTouchStart={() => setDragging(false)}
                onTouchEnd={() => setDragging(true)}
                onTouchCancel={() => setDragging(true)}
                contentContainerStyle={styles.scrollView}
            >
                {evolution != null ?
                    <FlatList
                        data={evolution}
                        numColumns={2}
                        columnWrapperStyle={styles.evolutionSpace}
                        contentContainerStyle={styles.evolutionContainer}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                            <View style={styles.evolutionView}>
                                <Image
                                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}}
                                    style={styles.evolutionImage}
                                />
                                <Text style={styles.name}>{item.species_name.charAt(0).toUpperCase() + item.species_name.slice(1)}</Text>
                                {item.min_level ?
                                    <Text style={styles.level} >Level {item.min_level}</Text>
                                : null}
                                {item.item? 
                                    <Text style={styles.level}>Item : {item.item.name}</Text>
                                : null}
                            </View>
                        )}
                    />
                : null}
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
        fontWeight: 'bold'
    },
    evolutionImage: {
        width: 200,
        height: 200
    },
    evolutionView: {
        alignItems: 'center'
    },
    name: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    level: {
        fontSize: 15
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 30
    },
    evolutionSpace : {
        justifyContent: 'space-around'
    },
    evolutionContainer : {
        paddingBottom:30
    }
})

export default Evolution
import React, {useEffect, useState} from 'react'
import SlidingUpPanel from "rn-sliding-up-panel";
import { View , Text, ScrollView , StyleSheet , TouchableOpacity , Image, Animated, Easing, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Foundation'
import { useSelector } from 'react-redux'

const About = (props) => {
    const {pokemonDescription, pokemon} = props
    const [eggGroups, setEggGroups] = useState(null)
    const [location, setLocation] = useState(null)
    useEffect(() => {
        joiningEggGroups()
        joiningLocation()
    },[])

    const joiningEggGroups = () => {
        let arr = []
        for (var i in pokemonDescription.egg_groups){
            arr.push(pokemonDescription.egg_groups[i].name.charAt(0).toUpperCase() + pokemonDescription.egg_groups[i].name.slice(1))
        }
        
        setEggGroups(arr.join(', '))
        
    }

    const joiningLocation = () => {
        let arr = []
        for (var i in pokemonDescription.pal_park_encounters){
            arr.push(pokemonDescription.pal_park_encounters[i].area.name.charAt(0).toUpperCase() + pokemonDescription.pal_park_encounters[i].area.name.slice(1))
        }
        
        setLocation(arr.join(', '))
        
    }
    
    return (
        <View style={styles.content}>
            <Text>
            {
            pokemonDescription.flavor_text_entries.find(item => item.language.name == 'en').flavor_text.replace(/(\f|\n)/g, " ")
            }
            </Text>
            <View style={styles.heightAndWeight}>
                <View style={styles.heightAndWeightView}>
                    <Text style={styles.heightAndWeightTitle}>Height</Text>
                    <Text>{pokemon.height * 10} cm</Text>
                </View>
                <View style={styles.heightAndWeightView}>
                    <Text style={styles.heightAndWeightTitle}>Weight</Text>
                    <Text>{pokemon.weight / 10} kg</Text>
                </View>
            </View>
            <View style={styles.breedingContainer}>
                <Text style={styles.breedingTitle}>Breeding</Text>
                <View style={styles.gender}>
                    <View style={styles.genderTitle}>
                        <Text style={styles.genderName}>Gender</Text>
                    </View>
                    <View style={styles.genderRate}>
                        <Text>
                            <Icon name={'female-symbol'} size={15} color={'rgb(218 ,154, 179)'}/> 
                            {" "}{pokemonDescription.gender_rate/8 * 100 + "%"}
                            </Text>
                        <Text style={styles.maleRate}> <Icon name={'male-symbol'} size={15} color={'rgb(163,171,226)'}/> 
                        {" "}{(8 - pokemonDescription.gender_rate)/8 * 100 + '%'}</Text>
                    </View>
                </View>
                <View style={styles.gender}>
                    <View style={styles.genderTitle}>
                        <Text style={styles.genderName}>Egg Groups</Text>
                    </View>
                    <View style={styles.genderRate}>
                        <Text>{eggGroups}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.breedingContainer}>
                <Text style={styles.breedingTitle}>Location</Text>
                <FlatList
                data={pokemonDescription.pal_park_encounters}
                contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}
                keyExtractor={(item, index) => item.id}
                renderItem={({item, index}) => (

                    <View style={[styles.heightAndWeight, {width: '95%'}]}>
                        <View style={styles.heightAndWeightView}>
                            <Text style={styles.heightAndWeightTitle}>Name</Text>
                            <Text>{item.area.name.charAt(0).toUpperCase() + item.area.name.slice(1)}</Text>
                        </View>
                        <View style={styles.heightAndWeightView}>
                            <Text style={styles.heightAndWeightTitle}>Base Score</Text>
                            <Text>{item.base_score}</Text>
                        </View>
                    </View>
                )}
                />
            </View>
            <View style={styles.breedingContainer}>
                <Text style={styles.breedingTitle}>Training</Text>
                <View style={styles.gender}>
                    <View style={styles.genderTitle}>
                        <Text style={styles.genderName}>Base EXP</Text>
                    </View>
                    <View style={styles.genderRate}>
                        <Text>
                        {pokemon.base_experience}    
                        </Text>
                        
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    heightAndWeight: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 0.8,
        elevation: 4,
        shadowRadius: 5,
        shadowOffset: {width: 1, height: 4},
    },
    heightAndWeightTitle: {
        color: 'rgb(164,163,166)',
        marginBottom: 5
    },
    heightAndWeightView: {
        alignItems: 'center'
    },
    breedingContainer: {
        marginTop: 30,
        marginBottom: 20
    },
    breedingTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    gender: {
        flexDirection: 'row',
        marginTop: 15
    },
    genderTitle: {
        flex: 0.3
    },
    genderRate: {
        flex: 0.7,
        flexDirection: 'row'
    },
    maleRate: {
        marginLeft: 20
    },
    genderName: {
        color: 'rgb(165,164,169)',
        fontWeight: '500'
    }
})

export default About
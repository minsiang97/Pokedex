import React from 'react'
import { View , Image, StyleSheet, Text, TouchableOpacity } from 'react-native'


const Card = (props) => {
    const {
        heightPass,
        title,
        color,
        onClickPass,
        pokemonImage,
        types,
        widthPass,
        center,
        pokedex
    } = props
    
    return (
        <TouchableOpacity onPress={onClickPass} style={[styles.cardContainer, {backgroundColor: color, height: heightPass, shadowColor: color, width: widthPass}]}>
            {pokemonImage && (
                <Image
                source={{uri : pokemonImage}}
                style={styles.pokemonImage}
                />
            )}
            <View style={{overflow: 'hidden', height: heightPass,  justifyContent: center ? 'center' : 'flex-start'}}>
                <Image
                    source={require('../assets/images/pokeball.png')}
                    style={[styles.imageTopCorner, pokedex ? {bottom: -20} : null]}
                />
                <Image
                    source={require('../assets/images/pokeball.png')}
                    style={styles.imageBottomCorner}
                />
                <Text style={[styles.category, {marginTop: pokedex ? 15 : 0}]}>{title.charAt(0).toUpperCase() + title.slice(1)}</Text>
                {types && (
                    <View style={styles.typesView}>
                        {types.map((item) => {
                            return (
                            <View style={styles.typeContainer}>
                                <Text style={styles.types}>{item.type.name}</Text> 
                            </View>
                            )
                        })}
                        
                </View>
                )}
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageBottomCorner: {
        position: 'absolute',
        top: -60,
        left: -60,
        opacity: 0.2,
        width: 90,
        height: 90,
        tintColor: '#f5f5f5',
        overflow: 'hidden'
    },
    pokemonImage: {
        position: 'absolute',
        right: -20,
        bottom: -20,
        width: 120,
        height: 120,
        zIndex: 100
    },
    imageTopCorner: {
        position: 'absolute',
        right: -20,
        opacity: 0.2,
        width: 90,
        height: 90,
        tintColor: '#f5f5f5',
        overflow: 'hidden'
    },
    cardContainer: {
        borderRadius: 10,
        marginTop: 10,
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 3,
        shadowOffset: {width: 1, height: 2},
        marginRight: 10
    },
    category : {
        marginLeft: 15,
        color: 'white',
        fontWeight: '800',
        overflow: 'hidden',
        fontSize: 16,
    },
    typesView: {
        marginLeft: 15
    },
    typeContainer: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(245,245,245,0.2)',
        borderRadius: 26,
        marginTop: 8,
        alignSelf: 'flex-start'
    },
    types: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    }
})

export default Card
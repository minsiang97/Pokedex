import React from 'react'
import { View , Image, StyleSheet, Text, TouchableOpacity } from 'react-native'


const CardImage = (props) => {
    const {
        heightPass,
        title,
        color,
        onClickPass,
        types,
        widthPass,
        center,
        pokedex,
        textColor,
        image,
        borderColor,
        borderWidth
    } = props
    
    return (
        <TouchableOpacity onPress={onClickPass} style={[styles.cardContainer, {backgroundColor: color, height: heightPass, width: widthPass, borderColor: borderColor, borderWidth: borderWidth}]}>
            <View style={{overflow: 'hidden', height: heightPass,  justifyContent: center ? 'center' : 'flex-start'}}>
                <Image
                    source={require('../assets/images/pokeball.png')}
                    style={[styles.imageTopCorner, pokedex ? {bottom: -20} : null]}
                />
                <Image
                    source={require('../assets/images/pokeball.png')}
                    style={styles.imageBottomCorner}
                />
                <Text style={[styles.category, {color: textColor ? textColor: 'white'}]}>{title.charAt(0).toUpperCase() + title.slice(1)}</Text>
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
                {image && (
                    <Image
                        source={image}
                        style={styles.image}
                    />
                )
                }
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
        marginTop: 20,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 0.8,
        elevation: 4,
        shadowRadius: 5,
        shadowOffset: {width: 1, height: 4},
        marginRight: 10,
        paddingVertical: 10,
        alignSelf: 'center'
    },
    category : {
        color: 'white',
        fontWeight: '800',
        overflow: 'hidden',
        fontSize: 16,
        alignSelf: 'center'
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
    },
    image: {
        width: 80,
        height: 60,
        alignSelf: 'center'
    }
})

export default CardImage
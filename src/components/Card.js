import React from 'react'
import { View , Image, StyleSheet, Text, TouchableOpacity } from 'react-native'


const Card = (props) => {
    const {
        heightPass,
        title,
        color
    } = props
    return (
        <TouchableOpacity style={[styles.cardContainer, {backgroundColor: color, height: heightPass, shadowColor: color}]}>
            <Image
                source={require('../assets/images/pokeball.png')}
                style={styles.imageTopCorner}
            />
            <Image
                source={require('../assets/images/pokeball.png')}
                style={styles.imageBottomCorner}
            />
            <Text style={styles.category}>{title}</Text>
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
        width: '48%',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 10,
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 3,
        shadowOffset: {width: 1, height: 2},
        
    },
    category : {
        marginLeft: 15,
        color: 'white',
        fontWeight: '800',
        overflow: 'hidden'
    }
})

export default Card
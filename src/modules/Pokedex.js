import React, { useState } from 'react'
import { ScrollView, View, Image, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import LoadingComponent from '../components/LoadingComponent'


const Pokedex = ({navigation}) => {
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const pokemons = useSelector((state) => state.pokemons.pokemons)

    return (
        <>
        {loadingSpinner ?
        <LoadingComponent modalVisible={loadingSpinner} />
        : null}
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/pokeball.png')} 
                    resizeMode="cover"
                    style={styles.backgroundImage}
                />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name={'arrow-back'} size={25}/>
                </TouchableOpacity>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Pokedex</Text>
                    <FlatList
                        data={pokemons}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={({item, index}) => {
                            return (
                                <View>
                                    <Text>{item.name}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
            <LoadingComponent/>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    container : {
        paddingTop: 100,
        paddingHorizontal: 30
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
    }
})

export default Pokedex
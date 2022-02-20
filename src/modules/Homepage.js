import React, {useEffect, useState, useRef} from 'react'
import {Animated, SafeAreaView, View, Text, ScrollView, StyleSheet, Image, Dimensions, ImageBackground, TextInput} from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import AnimatedHeader from '../components/AnimatedHeader';
import Card from '../components/Card';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getGenerations, getPokemons } from '../redux/action/pokemons';
import LoadingComponent from '../components/LoadingComponent';



const Homepage = ({navigation}) => {
    
    const data = [
        {title: 'Pokemon Rumble Rush Arrives Soon', date: '15th Feb 2022', image: require('../assets/images/thumbnail.png')},
        {title: 'Pokemon Rumble Rush Arrives Soon', date: '15th Feb 2022', image: require('../assets/images/thumbnail.png')},
        {title: 'Pokemon Rumble Rush Arrives Soon', date: '15th Feb 2022', image: require('../assets/images/thumbnail.png')},
        {title: 'Pokemon Rumble Rush Arrives Soon', date: '15th Feb 2022', image: require('../assets/images/thumbnail.png')},
        {title: 'Pokemon Rumble Rush Arrives Soon', date: '15th Feb 2022', image: require('../assets/images/thumbnail.png')},
        {title: 'Pokemon Rumble Rush Arrives Soon', date: '15th Feb 2022', image: require('../assets/images/thumbnail.png')}
    ]

    const sampleData = [
        {title: 'Pokedex', color: 'rgb(111,189,167)'},
        {title: 'Moves', color: 'rgb(233,110,93)'},
        {title: 'Abilities', color: 'rgb(90,155,230)'},
        {title: 'Items', color: 'rgb(239,199,95)'},
        {title: 'Locations', color: 'rgb(118,86,136)'},
        {title: 'Type Effects', color: 'rgb(169,117,110)'}
    ]

    const dispatch = useDispatch()

    useEffect(() => {
        setNews(data)
        setCategory(sampleData)
    },[])

    const offset = useRef(new Animated.Value(0)).current;
    const [news, setNews] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [pokemons, setPokemons] = useState([])
    const [category, setCategory] = useState(null)

    const _nextPage = (data) => {
        if (data == 'Pokedex'){
            loadGeneration(data)
        }
    }
    
    const loadGeneration = (data) => {
        setModalVisible(true)
        axios.get("https://pokeapi.co/api/v2/generation/")
        .then((resp) => {
            dispatch(getGenerations(resp.data.results))
            setModalVisible(false)
            navigation.navigate('Generations')
            
        })
        
       
        
        
    }
    
    return (
        <>
        {modalVisible ?
        <LoadingComponent 
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible} 
        />
        : null}
        <ScrollView
                contentContainerStyle={styles.scrollContainer}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: offset}}}],
                    { useNativeDriver: false }
                )}
                
            >
            <View style={styles.titleContainer}>
                <Image
                    source={require('../assets/images/pokeball.png')} 
                    resizeMode="cover"
                    style={styles.backgroundImage}
                />
                <Text style={styles.title}>What Pokemon{'\n'}are you looking for?</Text>
                
                <FlatList
                    numColumns={2}
                    data={category}
                    contentContainerStyle={styles.cardContainer}
                    renderItem={({item, index}) => (
                        <Card
                            title={item.title}
                            color={item.color}
                            heightPass={70}
                            onClickPass={ () => _nextPage(item.title)}
                            widthPass={'48%'}
                            center={true}
                        />
                    )}
                />
                
            </View>
            <View style={styles.newsContainer}>
                <View style={styles.newsView}>
                    <Text style={styles.news}>Pokemon News</Text>
                </View>
                <FlatList
                    data={news}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                        return (
                            <View style={styles.newsList}>
                                <View style={styles.titleView}>
                                    <Text style={styles.newsTitle}>{item.title}</Text>
                                    <Text style={styles.newsDate}>{item.date}</Text>
                                </View>
                                <View style={styles.imageView}>
                                    <Image
                                        source={item.image}
                                        style={styles.newsImage}
                                    />
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
            
        </ScrollView>
        <AnimatedHeader offset={offset} textPass={"Pokedex"} />
        </>
    )
}

const styles = StyleSheet.create({
    sectionContainer : {
        flex: 1,
        
    },
    scrollContainer : {  
        backgroundColor: 'rgb(245,244,245)',
        overflow: 'hidden'
    },
    titleContainer: {
        paddingTop: 180,
        paddingHorizontal: 30,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: 'white'
    },
    backgroundImage: {
        position: 'absolute',
        top: -20,
        right: -100,
        height: 280,
        width: 280,
        tintColor: 'rgb(244,244,245)',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
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
    newsContainer: {
        marginTop: 10,
        paddingVertical: 20
    },
    cardContainer: {
        marginTop: 30,
        paddingBottom: 30,
    },
    newsView : {
        paddingHorizontal: 30
    },
    news: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    newsList: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 20,
    },
    titleView: {
        flex: 0.7,
        paddingLeft: 30,
        paddingRight: 20
    },
    imageView: {
        flex: 0.35,
        paddingHorizontal: 30
    },
    newsImage: {
        width: '100%',
        height: 60,
        borderRadius: 10
    },
    newsTitle: {
        fontSize: 14,
        fontWeight: '500'
    },
    newsDate: {
        fontSize: 12,
        marginTop: 10,
        color: 'rgb(203,203,205)'
    },
})

export default Homepage


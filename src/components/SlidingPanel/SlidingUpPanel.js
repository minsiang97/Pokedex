import React, {useEffect, useState} from 'react'
import SlidingUpPanel from "rn-sliding-up-panel";
import { View , Text, ScrollView , StyleSheet , TouchableOpacity , Image, Animated, Easing, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Foundation'
import About from './AboutComponent';
import BaseStats from './BaseStats';
import Evolution from './Evolution';
import Moves from './Moves';

const height = Dimensions.get('window').height

const SlidingPanel = (props) => {

    const {pokemonDescription, pokemon} = props

    const _draggedValue = new Animated.Value(height / 2 - 20);
    const draggableRange = { top: height - 150, bottom: height / 2 - 20 }

    const [isAbout, setIsAbout] = useState(false)
    const [isBaseStats, setIsBaseStats] = useState(false)
    const [isEvolution, setIsEvolution] = useState(false)
    const [isMoves, setIsMoves] = useState(false)
    const [dragging, setDragging] = useState(true)
    

    const clickTab = (tab) => {
        if (tab == 'About'){
            setIsAbout(true)
            setIsBaseStats(false)
            setIsEvolution(false)
            setIsMoves(false)
        } else if (tab == 'Base Stats'){
            setIsAbout(false)
            setIsBaseStats(true)
            setIsEvolution(false)
            setIsMoves(false)
        } else if (tab == 'Evolution'){
            setIsAbout(false)
            setIsBaseStats(false)
            setIsEvolution(true)
            setIsMoves(false)
        } else {
            setIsAbout(false)
            setIsBaseStats(false)
            setIsEvolution(false)
            setIsMoves(true)
        }
    }

    useEffect(() => {
        setIsAbout(true)
        setIsBaseStats(false)
        setIsEvolution(false)
        setIsMoves(false)
    },[])

    


    return (
        <SlidingUpPanel
            draggableRange={draggableRange}
            animatedValue={_draggedValue}
            snappingPoints={[360]}
            height={height - 150}
            backdropOpacity={0}
            friction={0.5}
            allowDragging={dragging}
        >
            <View style={styles.panel}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => clickTab('About')} activeOpacity={0.5} style={[styles.headerTitleView, isAbout ? {borderBottomWidth: 2} : null]}>
                        <Text style={[styles.headerTitle, isAbout ? {opacity: 1} : null]}>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => clickTab('Base Stats')} activeOpacity={0.5} style={[styles.headerTitleView, isBaseStats ? {borderBottomWidth:  2 } : null]}>
                        <Text style={[styles.headerTitle, isBaseStats ? {opacity: 1} : null]}>Base Stats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => clickTab('Evolution')} activeOpacity={0.5} style={[styles.headerTitleView, isEvolution ?  {borderBottomWidth: 2} : null]}>
                        <Text style={[styles.headerTitle, isEvolution ? {opacity: 1} : null]}>Evolution</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => clickTab('Moves')} activeOpacity={0.5} style={[styles.headerTitleView, isMoves ? {borderBottomWidth: 2 } : null]}>
                        <Text style={[styles.headerTitle, isMoves ? {opacity: 1} : null]}>Moves</Text>
                    </TouchableOpacity>
                </View>
                {isAbout ? 
                    <About pokemonDescription={pokemonDescription} pokemon={pokemon}/>
                : null}
                {isBaseStats ?
                    <BaseStats pokemonDescription={pokemonDescription} pokemon={pokemon}/>
                : null}
                {isEvolution ?
                    <Evolution pokemonDescription={pokemonDescription} pokemon={pokemon} dragging={dragging} setDragging={setDragging} />
                : null}
                {isMoves ? 
                    <Moves pokemonDescription={pokemonDescription} pokemon={pokemon} dragging={dragging} setDragging={setDragging}/>
                : null}
            </View>

        </SlidingUpPanel>
    )
}

const styles = StyleSheet.create({
    panel : {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 26,
        paddingVertical: 20
    },
    header : {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    headerTitle: {
        fontSize: 15,
        fontWeight: '500',
        opacity: 0.5
    },
    headerTitleView: {
        paddingBottom: 20,
        borderColor: 'rgb(116,127,206)',
    },
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
        marginTop: 20
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

export default SlidingPanel
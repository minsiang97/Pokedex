import React from 'react'
import {Animated, View, Text, StyleSheet} from 'react-native'

const HEADER_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 0;

const AnimatedHeader = (props) => {
    const {
        offset,
        textPass
    } = props
    const headerHeight = offset.interpolate({
        inputRange: [200, HEADER_HEIGHT + 200],
        outputRange: [HEADER_MIN_HEIGHT, HEADER_HEIGHT],
        extrapolate: 'clamp',
    });
    return (
        <Animated.View style={[styles.header, {height: headerHeight}]}>
            <View style={styles.bar}>
                <Text style={styles.headerTitle}>{textPass}</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgb(233,110,93)',
        overflow: 'hidden',
        zIndex: 10,
        justifyContent: 'center',
        borderBottomLeftRadius: 26,
        borderBottomRightRadius: 26
    },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
})

export default AnimatedHeader
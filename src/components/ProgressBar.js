import React, { useEffect, useRef , useState } from 'react'
import { Animated, Easing, StyleSheet , View } from 'react-native'

const ProgressBar = (props) => {
    const {
        backgroundColor,
        paddingPass,
        score,
        totalScore,
        progressBackgroundColor
    } = props

    const [width, setWidth] = useState(0)
    const animatedValue = useRef(new Animated.Value(-1000)).current
    const reactValue = useRef(new Animated.Value(-1000)).current

    const startAnimation = () => {
        Animated.timing(
            animatedValue,{
            toValue: reactValue,
            duration: 1000,
            delay: 0,
            useNativeDriver: true            
        }).start()
    }

    useEffect(() => {
        startAnimation()
    },[])

    useEffect(() => {
        reactValue.setValue(-width + (width * score) / totalScore)
    },[score ,width])

    return (
        <View 
            style={[styles.progressBar, {backgroundColor: backgroundColor, paddingVertical: paddingPass}]}
            onLayout={(e) => {
                const newWidth = e.nativeEvent.layout.width

                setWidth(newWidth)
            }}
        >
            <Animated.View
                style={[styles.filledProgressBar, {transform: [{translateX: animatedValue}], backgroundColor: progressBackgroundColor, paddingVertical: paddingPass}]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    progressBar: {
        borderRadius: 26,
        overflow: 'hidden'
    },
    filledProgressBar: {
        position:'absolute',
        left: 0,
        top: 0,
        borderRadius: 26,
        width: '100%'
    }
})

export default ProgressBar
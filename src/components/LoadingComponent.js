import React, { useEffect } from 'react'
import { StyleSheet, View, Modal, Animated, Text } from 'react-native'


const LoadingComponent = (props) => {
    const {modalVisible, setModalVisible} = props
    const animation = new Animated.Value(0);
    const inputRange = [0, 1.5];
    const outputRange = [1.5, 0.8];
    const scale = animation.interpolate({inputRange, outputRange});

    const startAnimation = () => {
        Animated.sequence([
            Animated.timing(animation, {
              toValue: 1.5,
              duration: 500,
              useNativeDriver: true
            }),
            Animated.timing(animation, {
              toValue: 0.8,
              duration: 500,
              useNativeDriver: true
           })
        ], {useNativeDriver: true}).start(event => {
            if (event.finished) {
                startAnimation();
            }
        })
    };
    
    useEffect(() => {
        startAnimation()
    },[])
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Animated.View style={[styles.pokeball, {transform: [{scale}]}]}>
                        <View style={styles.red}/>
                        <View style={styles.white}/>
                        <View style={styles.centerPieceLine} />
                        <View style={styles.centerPieceCircle} >
                            <View style={styles.smallCircle} />
                        </View>
                    </Animated.View>
                    <Text style={styles.loadingText}>Loading ...</Text>
                </View>
                </View>
            </Modal>
        </View>
        
    )
}

const styles = StyleSheet.create({
    pokeball : {
        height: 50,
        width: 50,
        borderWidth: 2,
        borderColor: '#383b4f',
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: 'transparent'
    },
    red : {
        flex: 1,
        backgroundColor: 'red',
        
    },
    white: {
        flex: 1,
        backgroundColor: 'white'
    },
    centerPieceLine: {
        position: 'absolute',
        top: 22.5,
        backgroundColor: '#383b4f',
        width: 50,
        height: 5
    },
    centerPieceCircle: {
        position: 'absolute',
        top: 15,
        left: 12.5,
        borderColor: '#383b4f',
        borderWidth: 2,
        backgroundColor: 'white',
        width: 18,
        height: 18,
        borderRadius: 50,
        padding: 3
    },
    smallCircle: {
        borderWidth: 1,
        borderColor: '#383b4f',
        borderRadius: 50,
        width: '100%',
        height: '100%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalView: {
        margin: 20,
        padding: 35,
        alignItems: "center",
    },
    loadingText: {
        marginTop: 20,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default LoadingComponent
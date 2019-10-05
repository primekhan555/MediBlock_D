import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

let {width, height} = Dimensions.get('window');

export default class OptionsScreen extends Component {
    static navigationOptions = {
        header: null,
        headerLeft: null
    }


    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>MediBlock</Text>
                    <Text style={{
                        color:'#ffffff',
                        alignContent:"center",
                        justifyContent:"center",
                        marginTop:3,
                        fontSize:35,
                        fontWeight:"bold",
                        letterSpacing:1.2
                        }}>Doc</Text>
                </View>

                <View style={styles.optionContainer}>
                    <View style={styles.signInView}>
                        <TouchableOpacity style={styles.signInOpacity}
                            onPress={() => {
                                this.props.navigation.navigate('SignIn')
                            }}>
                            <Text style={styles.signInText}>sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signUpView}>
                        <TouchableOpacity style={styles.signUpOpacity}
                            onPress={() => {
                                this.props.navigation.navigate('SignUp')
                            }}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    nameContainer: {
        flex: 70,
        backgroundColor: '#b063c5',
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionContainer: {
        flex: 30,
        backgroundColor: 'white',
    },
    nameText: {
        color: 'white',
        fontSize: 40,
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 200,
        fontWeight:"bold",
        letterSpacing:1.2
    },
    signInView: {
        alignItems: 'center',
        marginTop: 30,
    },
    signInOpacity: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 230,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#b063c5'
    },
    signUpView: {
        alignItems: 'center'
    },
    signUpOpacity: {
        borderColor: '#b063c5',
        width: 230,
        height: 40,
        marginTop: 20,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    signInText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    signUpText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#b063c5'
    },
});



import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

export default class OptionsScreen extends Component {
    static navigationOptions={
        header:null,
        headerLeft:null
    }


    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>MediBlock</Text>
                </View>

                <View style={styles.optionContainer}>
                    <View style={styles.signInView}>
                        <TouchableOpacity style={styles.signInOpacity}
                            onPress={() => {
                                this.props.navigation.navigate('Signin')
                            }}>
                            <Text style={styles.signInText}>sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signUpView}>
                        <TouchableOpacity style={styles.signUpOpacity}
                            onPress={() => {
                                this.props.navigation.navigate('Signup')
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
        backgroundColor: '#ff6666',
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
        marginTop: 200

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
        backgroundColor: '#ff6666'
    },
    signUpView: {
        alignItems: 'center'
    },
    signUpOpacity: {
        borderColor: '#ff6666',
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
        color: '#ff6666'
    },
});



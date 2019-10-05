import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import { AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import { voidTypeAnnotation } from '@babel/types';

export default class SignIn extends Component {
    static navigationOptions = {
        headerStyle:{
            backgroundColor:'#b063c5'
        },
        headerLeft: null
    }
    constructor(props) {
        super(props)
    }

    state = {
        nic: '',
        pass: '',
        isLoading: true,
        dataSource: '',
        fieldUnderlineColor: '#857777',
        passEyeState: true,
        cnic: '',
    };

    render() {
        return (

            <View style={styles.mainContainer}>
                <View style={styles.firstContainer}>
                    <Text style={styles.firstContainerText}>Sign In</Text>
                </View>
                <View style={styles.secondContainer}>
                    <ScrollView>
                        <View style={styles.TextInputView}>
                            <Text style={{ marginStart: 25, fontWeight: 'bold', fontSize: 17 }}>CNIC & Password</Text>
                            <TextInput
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.passwordRef.focus()}
                                style={styles.TextInput}
                                label="nic"
                                placeholder=" 16202-0195532-5"
                                keyboardType="decimal-pad"
                                placeholderTextColor="#857777"
                                underlineColorAndroid={this.state.fieldUnderlineColor}
                                onChangeText={(cnic) => {
                                    const regex = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
                                    var pattern = regex.test(cnic);
                                    if (pattern) {
                                        this.setState({
                                            fieldUnderlineColor: '#137804',
                                            nic: cnic,
                                        })
                                    }
                                    else {
                                        this.setState({
                                            fieldUnderlineColor: '#ff0303',
                                            nic: '',
                                        })
                                    }
                                }}
                            />
                        </View>

                        <View style={styles.TextInputViewPass}>
                            <TextInput
                                ref={passwordRef => this.passwordRef = passwordRef}
                                style={styles.TextInput}
                                placeholder=" Password"
                                keyboardType="default"
                                secureTextEntry={this.state.passEyeState}
                                placeholderTextColor="#857777"
                                underlineColorAndroid="#b063c5"
                                onChangeText={(password) => {
                                    this.setState({
                                        pass: password,
                                    })
                                }}
                            />

                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={styles.opacity}
                                onPress={() => {
                                    if (this.state.nic == '') {
                                        return;
                                    }
                                    if (this.state.pass == '') {
                                        return;
                                    }
                                    // const regex = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
                                    // var pattern = regex.test(this.state.nic);
                                    // if (!pattern) {
                                    //     console.log("your nic pattern is not Valid")
                                    // }
                                    // else {
                                    // console.log("your pattern is matching")
                                    const url = 'https://f8f3f569.ngrok.io/api/Patient/';
                                    const key = this.state.nic;
                                    const join = url.concat(key);
                                    fetch(join)
                                        .then((response) => response.status)
                                        .then((statusCode) => {
                                            if (statusCode == 404) {
                                                alert("signUp first")
                                            }
                                            else if (statusCode == 200 || statusCode == 304) {
                                                fetch(join)
                                                    .then((response) => response.json())
                                                    .then((responseJson) => {
                                                        this.setState({
                                                            isLoading: false,
                                                            dataSource: responseJson.lastName,
                                                        })
                                                    })
                                                    .then(() => {
                                                        if (this.state.dataSource == this.state.pass) {
                                                            let cnic = this.state.nic.toString();
                                                            AsyncStorage.setItem('Doctor_CNIC', JSON.stringify(cnic), () => {
                                                                this.props.navigation.navigate('HomeScreen', {
                                                                    cnic1: this.state.nic,
                                                                })
                                                                console.log("i am inside")
                                                            })
                                                        }
                                                        else {
                                                            console.log("password is incorrect")
                                                        }
                                                    })
                                                    .catch((error) => {
                                                        console.error(error)
                                                    });
                                            }
                                        })

                                }}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#b063c5'
    },
    firstContainer: {
        flex: 30,
        height: 300,
        backgroundColor: '#b063c5',
    },
    secondContainer: {
        flex: 70,
        backgroundColor: 'white',
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
    },
    firstContainerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 50,
        marginStart: 25
    },
    TextInput: {
        marginTop: 20,
        marginStart: 10,
        marginEnd: 10,
        height: 40,
        fontSize: 16,
        color: 'black'
    },
    TextInputView: {
        marginTop: 30,
        height: 70
    },
    TextInputViewPass: {
        flex: 1,
        marginTop: 30,
        height: 70,
        // flexDirection:'row',
    },
    opacity: {
        backgroundColor: '#b063c5',
        width: 230,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonView: {
        marginTop: 50,
        borderColor: 'black',
        alignItems: 'center'
    },
    icons: {
        position: 'absolute',
        right: 0,
        top: 33,
        marginTop: 20

    },
});

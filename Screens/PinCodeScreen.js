import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { black } from 'ansi-colors';

export default class PinCodeScreen extends Component {
    state = {
        viewBorderColor: "black",
        fieldValue: '0',
        CNIC: '',
        pinCode: '',
        miliSecond: '',
    };
    componentDidMount() {
        AsyncStorage.getItem('DecodedData', (err, result) => {
            if (result !== null) {
                var plainText = result;
                var halfText = plainText.split('#');
                var nicc = halfText[1]
                var pinCode = halfText[3];
                var miliSecond = halfText[5];
                this.setState({
                    CNIC: nicc,
                    pinCode: pinCode,
                    miliSecond: miliSecond,
                })
            }
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.viewboth}>
                    <Text
                        style={{
                            fontSize: 18,
                            marginBottom: 8,
                            color: "gray",

                        }}
                    >Enter Pin code</Text>
                    <View style={{
                        borderColor: this.state.viewBorderColor,
                        borderWidth: 2,
                        paddingTop: 4,
                        paddingBottom: 4,
                        paddingStart: 50,
                        paddingEnd: 50,
                        borderRadius: 10
                    }}>
                        <TextInput
                            style={{
                                fontSize: 25
                            }}
                            placeholder="000000"
                            keyboardType="number-pad"
                            placeholderTextColor="#857777"
                            maxLength={6}
                            autoFocus={true}
                            onChangeText={(value) => {
                                const regex = /^[0-9]{6}$/;
                                var pattern = regex.test(value);
                                if (pattern) {
                                    this.setState({
                                        viewBorderColor: "green",
                                        fieldValue: value,
                                    })
                                }
                                else {
                                    this.setState({
                                        viewBorderColor: "red",
                                        fieldValue: ''
                                    })
                                }
                            }}
                        />
                    </View>
                    <View style={styles.viewOpacity}>
                        <TouchableOpacity style={styles.OpacityStyle}
                            onPress={() => {
                                if (this.state.fieldValue == '0') {
                                    console.log("please enter anything")
                                    return;
                                }
                                else if (this.state.fieldValue == '') {
                                    console.log("please complete your code lenth")
                                    return;
                                }
                                else {
                                    var fixedSecond = this.state.miliSecond;
                                    var second = new Date().getTime() / 1000;
                                    var roundedSecond = Math.round(second);
                                    if (fixedSecond >= roundedSecond) {
                                        console.log("fixed   :" + fixedSecond)
                                        console.log("rounded :" + roundedSecond)
                                        console.log("your code is valid");
                                        var pinCodeC=this.state.pinCode;
                                        var pinCodeE=this.state.fieldValue;

                                        if (pinCodeE == pinCodeC) {
                                            AsyncStorage.setItem('CNIC', JSON.stringify(this.state.CNIC), () => {
                                                this.props.navigation.navigate('PatientHistory');
                                            });
                                        }
                                        else {
                                            alert("code is not matching");
                                        }
                                    }
                                    else {
                                        alert("your code is expired")
                                    }

                                }
                            }}>
                            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    viewboth: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    viewOpacity: {
        marginTop: 10,
        alignItems: "center",
    },
    OpacityStyle: {
        backgroundColor: "red",
        opacity: 1,
        width: 150,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    }
});
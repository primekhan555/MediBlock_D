import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Picker } from 'react-native';
import { AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { white, black } from 'ansi-colors';

export default class Information1 extends Component {
    constructor(props) {
        super(props)
    }
    _storeCNIC = async () => {
        try {
            await AsyncStorage.setItem('CNIC', this.state.CNIC);
            console.log("cnic saved successfully")
        } catch (error) {
            console.log("error in saving")
        }
    };
    state = {
        CNIC: this.props.navigation.getParam('nic', ''),
        password: this.props.navigation.getParam('pass', ''),
        fullName: '',
        email: '',
        gender: 'Male',
        position: 0,
        choosenIndex: 1,
        dateofBirth: '2015-01-01',
        age: '',
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.firstContainer}>
                    <Text style={styles.textFirstContainer}>Information</Text>
                </View>
                <View style={styles.mainSecondContainer}>
                    <ScrollView>
                        <View style={styles.secondContainer}>
                            <View style={styles.TextInputContainer}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Your Full Name</Text>
                                <TextInput
                                    placeholder='Full Name'
                                    textContentType="name"
                                    keyboardType="name-phone-pad"
                                    placeholderTextColor='#ff6666'
                                    underlineColorAndroid='#ff6666'
                                    onChangeText={(value) => {
                                        this.setState({
                                            fullName: value,
                                        })
                                    }}
                                />
                            </View>
                            <View style={styles.TextInputContainer}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Email Address</Text>
                                <TextInput
                                    textContentType="emailAddress"
                                    keyboardType="email-address"
                                    placeholder='Email'
                                    placeholderTextColor='#ff6666'
                                    underlineColorAndroid='#ff6666'
                                    onChangeText={(value) => {
                                        this.setState({
                                            email: value,
                                        })
                                    }}
                                />
                            </View>
                            <View><Text style={{ marginLeft: 10, marginBottom: 5, fontWeight: 'bold' }}>Gender</Text></View>

                            <View style={styles.pickerContainer}>
                                <Picker style={styles.pickerStyle}
                                    selectedValue={this.state.gender}
                                    onValueChange={(itemValue, itemPosition) => {
                                        this.setState({
                                            gender: itemValue,
                                            choosenIndex: itemPosition
                                        })
                                    }}>
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                </Picker>
                            </View>
                            <View><Text style={{ marginLeft: 10, marginBottom: 5, fontWeight: 'bold' }}>Date of Birth</Text></View>
                            <View style={{ margin: 10 }}>
                                <DatePicker
                                    style={{ width: 210 }}
                                    mode="date"
                                    date={this.state.dateofBirth}
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="1980-01-01"
                                    maxDate="2019-01-01"
                                    showIcon={true}
                                    customStyles={{
                                        dateIcon: {
                                            position: 'relative',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 10
                                        }
                                    }}
                                    onDateChange={(newDate) => {
                                        var fullDate = newDate.concat("T00:00:00.000Z");
                                        this.setState({
                                            dateofBirth: fullDate
                                        })
                                        var allDate = newDate.split("-");
                                        var intDate = parseInt(allDate[0])
                                        var dateobj = new Date();
                                        var currentYear = dateobj.getFullYear();
                                        allDate = (currentYear - intDate);
                                        this.setState({
                                            age: allDate,
                                        })
                                    }}
                                />
                            </View>

                            <View style={styles.nextOpacityView}>
                                <TouchableOpacity style={styles.nextOpacity}
                                    onPress={() => {
                                        if (this.state.CNIC == '') {
                                            return;
                                        }
                                        let block = {
                                            "$class": "org.com.mediblocking.Doctor",
                                            "nicNum": this.state.CNIC,
                                            "firstName": this.state.fullName,
                                            "lastName": this.state.password,
                                            "address": this.state.email,
                                            "phoneNum": "03429188353",
                                            "gender": this.state.gender,
                                            "dateofBirth": this.state.dateofBirth,
                                            "university": "B_Positive",
                                            "Specilization": "Dentist",
                                            "Degree": "MBBS"
                                        }

                                        fetch('https://e4943289.ngrok.io/api/Doctor/', {
                                            method: 'POST',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(block),
                                        })
                                            .then((response) => response.status)
                                            .then((responseStatus) => {
                                                console.log("this is the response from server" + responseStatus);
                                                if (responseStatus == 200) {
                                                    let cnic = this.state.CNIC.toString();
                                                    AsyncStorage.setItem('Doctor_CNIC', JSON.stringify(cnic), () => {
                                                        this.props.navigation.navigate('HomeScreen', {
                                                            cnic: this.state.CNIC,
                                                        })
                                                        console.log("i am inside")
                                                    })
                                                    // console.log("going to appointment screen")
                                                }
                                            })
                                        // console.log(this.state.dateofBirth); // Hours

                                    }}>
                                    <Text style={styles.textnextOpacity}>Next</Text>
                                </TouchableOpacity>
                            </View>

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
        backgroundColor: '#ff6666'
    },
    firstContainer: {
        flex: 25,
        backgroundColor: '#ff6666',

    },
    textFirstContainer: {
        color: 'white',
        fontSize: 40,
        marginLeft: 25,
        marginTop: 35

    },
    mainSecondContainer: {
        flex: 75,
        backgroundColor: 'white',
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
    },
    secondContainer: {
        flex: 1,
        height: 410,
        backgroundColor: 'white',
        margin: 30,
        borderRadius: 20,
        borderColor: '#ff6666',
        borderWidth: 1
    },
    TextInputContainer: {
        margin: 10
    },
    nextOpacityView: {
        width: 100,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 10,
        marginStart: 180,
        marginEnd: 20,
        marginBottom: 20,

    },
    nextOpacity: {
        width: 100,
        height: 35,
        backgroundColor: '#ff6666',
        borderRadius: 10,
        justifyContent: "center"
    },
    textnextOpacity: {
        color: 'white',
        textAlign: 'center'

    },
    pickerContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 20,
        marginBottom: 10
    },
    pickerStyle: {
        height: 60,
        width: "60%",
        color: '#ff6666',
        justifyContent: 'center',
    },
});
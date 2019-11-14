import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ProgressBarAndroid,
    AsyncStorage
} from 'react-native';

export default class PatientInfoScreen extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        CNIC: '',
        diseaseType: '',
        miliSecond: '',
        dateVisited: '',
        fullDate: '',
        labTest: '',
        dataSource: '',
        doctorName: '',
        cnic: '',
        DCNIC: '',
        ProgressHeight: 0,
        ProgressWidth: -5,
    }
    componentDidMount() {
        AsyncStorage.getItem('DecodedData', (err, result) => {
            if (result !== null) {
                var plainText = result;
                var halfText = plainText.split('#');
                var nicc = halfText[1]
                var diseaseType = halfText[13];
                var medicines = halfText[5];
                var fullDate = halfText[7];
                var dateVisiteds = halfText[7].split('T');
                var dateVisited = dateVisiteds[0];
                var labTest = halfText[9];


                var miliSecond = halfText[5];
                this.setState({
                    CNIC: nicc,
                    diseaseType: diseaseType,
                    miliSecond: miliSecond,
                    medicines: medicines,
                    dateVisited: dateVisited,
                    fullDate: fullDate,
                    labTest: labTest,
                });
            }
        })
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#b063c5'

                }}>

                <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    marginStart: 20,
                    marginEnd: 20,
                    marginTop: 10,
                    marginBottom: 3,
                    paddingStart: 20,
                    paddingTop: 10,
                    paddingEnd: 10,
                    backgroundColor: '#f7ebf7',
                    borderRadius: 10
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        height: 30,
                        borderRadius: 5,
                        marginBottom: 7,
                    }}>
                        <Text style={{
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: 'black',
                            textDecorationLine: "underline",
                        }}>Confirmation</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>


                        <Text style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'bold',
                            marginTop: 10
                        }}>Disease Type</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Text style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'normal',
                        }}>{this.state.diseaseType}</Text>

                        <Text style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'bold',
                            marginTop: 20,
                        }}>Medicines</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Text style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'normal',
                        }}>{this.state.medicines}</Text>

                        <Text style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'bold',
                            marginTop: 20,
                        }}>Visit Date</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Text style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'normal',
                        }}>{this.state.dateVisited}</Text>
                        <Text style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'bold',
                            marginTop: 20,
                        }}>Lab Tests</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Text style={{
                            alignSelf: 'flex-start',
                            fontWeight: 'normal',
                        }}>{this.state.labTest}</Text>

                    </ScrollView>
                    <View>
                        <ProgressBarAndroid styleAttr="Small"
                            style={{
                                height: this.state.ProgressHeight,
                                width: this.state.ProgressWidth,
                                alignSelf: "center"
                            }} />
                    </View>
                    <View style={{
                        height: 35,
                        width: 150,
                        marginBottom: 7,
                        marginTop: 5,

                        borderRadius: 7,
                        alignSelf: "center",
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={{
                                backgroundColor: '#23a82c',
                                height: 35,
                                width: 150,
                                borderRadius: 7,
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                this.setState({
                                    ProgressHeight: 20,
                                    ProgressWidth: 20,
                                })
                                AsyncStorage.getItem('Doctor_CNIC', (err, result) => {
                                    if (result !== null) {
                                        this.setState({
                                            cnic: result,
                                        })
                                    }
                                }).then((result) => {
                                    const url = 'https://a6885600.ngrok.io/api/Doctor/';
                                    var nic = result;
                                    var docCNICS = nic.replace(/['"]+/g, '')
                                    var join = url.concat(docCNICS);
                                    return fetch(join)
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                            this.setState({
                                                DCNIC: docCNICS,
                                                dataSource: responseJson,
                                                isloading: false
                                            })
                                        })
                                })
                                    .then(() => {
                                        this.setState({
                                            doctorName: this.state.dataSource.firstName,
                                        })
                                    })
                                    .then(() => {
                                        var owner = 'org.com.mediblockinge1.Patient#';
                                        var clearingCNIC = this.state.CNIC;
                                        var ppCNIC = clearingCNIC.replace(/\\/g, "");
                                        var pppCNIC = ppCNIC.replace(/\\/g, "");
                                        const pCNIC = pppCNIC.replace(/['"]+/g, '');
                                        const removingDashes = pCNIC.replace(/-/g, '');
                                        var fullOwner = owner.concat(pCNIC)
                                        var miliSecond = new Date().getTime();
                                        // var pCNIC=this.state.CNIC;
                                        var diseaseId = removingDashes.concat(miliSecond).toString();

                                        let block = {
                                            "$class": "org.com.mediblockinge1.Disease",
                                            "diseaseId": diseaseId,
                                            "nicNum": this.state.DCNIC,
                                            "doctorName": this.state.doctorName,
                                            "diseaseType": this.state.diseaseType,
                                            "medicines": this.state.medicines,
                                            "dateVisited": this.state.fullDate,
                                            "testTaken": this.state.labTest,
                                            "testResult": "Null",
                                            "patient": fullOwner
                                        }
                                        fetch('https://a6885600.ngrok.io/api/Disease/', {
                                            method: 'POST',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(block),
                                        })
                                            .then((response) => response.status)
                                            .then((responseStatus) => {
                                                if (responseStatus == 200) {
                                                    this.props.navigation.navigate('HomeScreen')
                                                }
                                            })
                                    })
                            }}>
                            <Text style={{
                                alignSelf: 'center',
                                color: 'white',
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

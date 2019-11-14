import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, TouchableHighlight, AsyncStorage, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
// import ImgToBase64 from 'react-native-image-base64';
// import ImagePicker from 'react-native-image-picker';


export default class PersonalInfo extends Component {
    static navigationOptions={
        headerStyle:{
            backgroundColor:'#b063c5'
        },
        headerTintColor:'white'

    }
    constructor(props) {
        super(props);
        this.state = {
            cnic: '',
            dataSource: [],
            isloading: true,
            imageUri: 'data:image/png;base64,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',
            imageData: '',
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('Doctor_CNIC', (err, result) => {
            if (result !== null) {
                this.setState({
                    cnic: result,
                })
            }
        }).then((result) => {
            const url = 'https://41b95361.ngrok.io/api/Doctor/';
            var nic = result;
            var CNICS = nic.replace(/['"]+/g, '')
            var join = url.concat(CNICS);
            return fetch(join)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        dataSource: responseJson,
                        isloading: false
                    })
                })
                .then(() => {
                    const url = 'https://41b95361.ngrok.io/api/DoctorPic/'
                    var nicc = result;
                    var CNICSs = nicc.replace(/['"]+/g, '')
                    console.log(CNICSs)
                    var joins = url.concat(CNICSs);
                    return fetch(joins)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            const pic = responseJson.DocPicture
                            this.setState({
                                imageUri: pic,
                            })
                        })
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }
    render() {
        const local = this.state.imageUri;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor= '#b063c5' barStyle='default' hidden={false} translucent={false} />
                <View style={{
                    height: 140,
                    width: '100%',
                    backgroundColor: '#b063c5',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }} >
                    <View style={{
                        backgroundColor: 'white',
                        marginTop: 60,
                        marginStart: 110,
                        marginEnd: 150,
                        height: 150,
                        width: 150,
                        borderRadius: 10,
                    }}>
                        <TouchableHighlight
                            onPress={() => {
                                ImagePicker.openPicker({
                                    width: 150,
                                    height: 150,
                                    cropping: true,
                                    includeBase64: true
                                }).then(image => {
                                    var basicString = 'data:image/jpeg;base64,';
                                    var code = image.data;
                                    const wholeCode = basicString.concat(code);
                                    this.setState({
                                        imageUri: wholeCode,
                                    });
                                    const classInfo = 'org.com.mediblocking.Doctor#';
                                    const nic = this.state.cnic;
                                    var CNICS = nic.replace(/['"]+/g, '')

                                    // const owner = classInfo.concat(nic);
                                    // console.log(this.state.cnic)
                                    const url = 'https://41b95361.ngrok.io/api/DoctorPic/';
                                    const joining = url.concat(CNICS);
                                    return fetch(joining)
                                        .then((response) => response.status)
                                        .then((responceStatus) => {
                                            let block = {
                                                "$class": "org.com.mediblocking.DoctorPic",
                                                "pictureId": CNICS,
                                                "nicNumDoc": CNICS,
                                                "DocPicture": this.state.imageUri,
                                                "DoctorP": "org.com.mediblocking.Doctor#16203-9275022-5",
                                            }
                                            if (responceStatus == 200 || responceStatus == 304) {
                                                const puturl='https://41b95361.ngrok.io/api/DoctorPic/';
                                                const fullUrl =puturl.concat(CNICS);
                                                fetch(fullUrl, {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify(block)
                                                })
                                            }
                                            else if (responceStatus == 404) {
                                                return fetch('https://41b95361.ngrok.io/api/DoctorPic/', {
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
                                                            console.log("image post successful")
                                                        }
                                                    })
                                                    .catch((err) => {
                                                        console.log("an error occured while uploading")
                                                    })
                                            }
                                        })
                                });
                            }}
                            style={{
                                borderRadius: 10,
                                backgroundColor: 'white'
                            }}>

                            <Image
                                style={{
                                    marginEnd: 150,
                                    height: 150,
                                    width: 150,
                                    borderRadius: 10,
                                    borderWidth: 5,
                                    borderColor: 'white'
                                }}
                                source={{ uri: local }}
                            />
                        </TouchableHighlight>
                    </View>


                </View>
                <View style={{ marginStart: 20, marginEnd: 20, marginTop: 50 }}>

                    <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>personal info</Text>
                        <Text style={styles.textStyle1}>{this.state.dataSource.firstName}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>address</Text>
                        <Text style={styles.textStyle1}>{this.state.dataSource.address}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>phone Number</Text>
                        <Text style={styles.textStyle1}>{this.state.dataSource.phoneNum}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>Age</Text>
                        <Text style={styles.textStyle1}>{this.state.dataSource.age}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>Gender</Text>
                        <Text style={styles.textStyle1}>{this.state.dataSource.gender}</Text>
                    </View>
                    <View style={{ marginTop: 30, width: 100, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                AsyncStorage.removeItem('Doctor_CNIC');
                                this.props.navigation.navigate('OptionScreen');
                            }}
                            style={{
                                shadowOpacity: .1,
                                borderRadius: 10,
                                color: 'red',
                                width: 100,
                                height: 30,
                                backgroundColor: '#ff6666',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: '#fff' }}>LogOut</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    textStyle: {
        color: '#9ba3b0',
        fontSize: 14
    },
    textStyle1: {
        color: '#000000',
        fontWeight: 'bold',

    },
    viewStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 30
    }

});
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
// import HScrollCStyle from '../ScrollComponent/HScrollCStyle';

class FlatListItem extends Component {
    state = {
        control: 'expand',
        viewHeight: 150,
        detail: '',
        height: '',
        textColor: 'green',
    };
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: "column",
                marginBottom: 9,
                marginTop: 1,
                height: this.state.viewHeight,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 20,
                borderColor: '#fff',
                padding: 5,
                alignItems: 'center',
                backgroundColor: '#fff'//this.props.index % 2 == 0 ? '#9e8e8d' : '#ff6666'
            }}
            >
                <TouchableOpacity onPress={() => {
                    // alert("hello : " + this.props.index);
                }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }}></TouchableOpacity>

                <View style={{ marginTop: 5, flexDirection: "row", width: 150 }}>
                    <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 17, textAlign: 'auto', textDecorationLine: "underline" }}>Appointment</Text>
                    <Text style={{ marginStart: 50, color: this.state.textColor, textAlign: 'right' }}
                        onPress={() => {
                            if (this.state.control == "expand") {
                                this.setState({
                                    control: 'condense',
                                    viewHeight: 280,
                                    detail: this.props.item.diseaseType,
                                    height: 20,
                                    textColor: 'green'

                                })
                            }
                            else if(this.state.control == "condense") {
                                this.setState({
                                    control: 'expand',
                                    viewHeight: 150,
                                    detail: '',
                                    textColor:'green'
                                })
                            }
                        }}
                    >{this.state.control}</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Doctor Name :</Text>
                        <Text style={{ paddingLeft: 5, color: '#3b3030', fontSize: 15, fontWeight: 'bold' }}>{this.props.item.doctorName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Appointment Detail :</Text>
                        <Text style={{ width: '40%', height: 25, paddingLeft: 5, color: '#3b3030', fontStyle: 'italic' }}>{this.props.item.diseaseType}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Appointment Date :</Text>
                        <Text style={{ paddingLeft: 5, color: '#3b3030' }}>{this.props.item.dateVisited}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Age :</Text>
                            <Text style={{ paddingLeft: 5, color: '#3b3030', fontWeight: 'bold' }}>{this.props.item.testResult}</Text>
                        </View>
                        <View style={{ marginLeft: 40, flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Weight :</Text>
                            <Text style={{ paddingLeft: 5, color: '#3b3030', fontWeight: 'bold' }}>{this.props.item.type}</Text>
                        </View>

                    </View>
                    {/* <View style={{height:this.state.height,}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View>
                    <View style={{height:this.state.height}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View>
                    <View style={{height:this.state.height}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View>
                    <View style={{height:this.state.height}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View>
                    <View style={{height:this.state.height}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View>
                    <View style={{height:this.state.height}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View> */}
                </View>
            </View>
        );
    }
}
export default class PatientHistory extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        dataSource: [],
        isloading: true,
        CNIC: '',//this.props.navigation.getParam('CNIC', ''),
        patterns: false
    };
    componentDidMount() {
        AsyncStorage.getItem('CNIC', (err, result) => {
            this.setState({
                CNIC: result,
            })
        });
        return fetch('https://f8f3f569.ngrok.io/api/Disease/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                    isloading: false
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        if (this.state.isloading) {
            return (
                <View style={{flex:1, justifyContent:'center'}}>
                    <ActivityIndicator size='large' animating={true} />
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, backgroundColor: '#e3dede' }}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item, index }) => {
                            const owners = item.patient;
                            var ownerId = owners.split('#');
                            const CNICS = this.state.CNIC.replace(/['"]+/g, '');
                            var finalData = CNICS.replace(/\\/g, "");
                            const final = finalData.replace(/['"]+/g, '');
                            console.log("without" + final)
                            if (ownerId[1] == final) {
                                return (
                                    <FlatListItem item={item} index={index.toString()} />
                                )
                            }
                            else {
                                console.log("if is not executing")
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()} />
                </View>
            )
        }
        {/* ) */ }

    }

}
const styles = StyleSheet.create({
    imageStyle: {
        width: 100,
        height: 106,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 2,
        marginBottom: 2,
        marginRight: 3
    },

});
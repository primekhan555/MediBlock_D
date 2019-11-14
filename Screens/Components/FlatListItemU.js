import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
}
    from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
class FlatlistItemU extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: '',
            height: '',
            viewHeight: 150,
        }
    }

    render() {
        let date= this.props.item.dateVisited.toString().split('T');
        return (
            <View style={{
                flex: 1,
                flexDirection: "column",
                marginBottom: 9,
                marginTop: 2,
                height: this.state.viewHeight,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 20,
                borderColor: '#fff',
                padding: 5,
                alignItems: 'center',
                backgroundColor: '#fff',
            }}>
                <TouchableOpacity onPress={() => {
                    var diseaseId = this.props.item.diseaseId;
                    AsyncStorage.setItem('diseaseId', JSON.stringify(diseaseId), () => {
                        this.props.navigation.navigate('UN_VerifiedDetail')
                    })

                }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }}></TouchableOpacity>

                <View style={{
                    marginTop: 5,
                    flexDirection: "row",
                    width: 300
                }}>
                    <Icon
                        style={{
                            marginTop: 2
                        }}
                        name='times-circle'
                        size={19}
                        color='red'
                        onPress={() => {
                            var diseaseId = this.props.item.diseaseId;
                            AsyncStorage.setItem('diseaseId', JSON.stringify(diseaseId), () => {
                                this.props.navigation.navigate('UN_VerifiedDetail')
                            })
                        }}
                    />
                    <Text
                        style={{
                            marginTop: 3,
                            marginLeft: 2,
                            marginRight: 20,
                            color: 'red',
                            fontWeight: 'bold'
                        }}>UN_Verified</Text>
                    <Text style={{
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: 17,
                        textAlign: 'center',
                        textDecorationLine: "underline",
                        alignSelf: 'center',
                        marginStart: 0,
                    }}>Appointment</Text>
                    <Icon
                        style={{
                            marginLeft: 70,
                            marginTop: 10
                        }}
                        name='plus'
                        size={18}
                        color='gray'
                        onPress={() => {
                            this.props.navigation.navigate('UN_VerifiedDetail')
                        }}
                    />

                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Appointment Detail :</Text>
                        <Text style={{ width: '40%', height: 25, paddingLeft: 5, color: '#3b3030', fontStyle: 'italic' }}>{this.props.item.diseaseType}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Appointment Date :</Text>
                        <Text style={{ paddingLeft: 5, color: '#3b3030' }}>{date[0]}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Age :</Text>
                            <Text style={{ paddingLeft: 5, color: '#3b3030', fontWeight: 'bold' }}>{this.props.item.testResult}</Text>
                        </View>
                        <View style={{ marginLeft: 40, flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: '#b0a9a9', fontSize: 15 }}>Medicines :</Text>
                            <Text style={{ paddingLeft: 5, color: '#3b3030', fontWeight: 'bold' }}>{this.props.item.medicines}</Text>
                        </View>

                    </View>
                </View>
            </View>
        );
    }
}
export default withNavigation(FlatlistItemU)

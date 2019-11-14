import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    AsyncStorage 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';


class FlatListItemV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: '',
            height: '',
        }
    };

    render() {
        let date= this.props.item.dateVisited.toString().split('T')
        return (
            <View style={{
                flex: 1,
                flexDirection: "column",
                marginBottom: 9 ,
                marginTop: 2,
                height: 150,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 20,
                borderColor: '#fff',
                padding: 5,
                alignItems: 'center',
                backgroundColor: '#fff'//this.props.index % 2 == 0 ? '#9e8e8d' : '#ff6666'
            }}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('VerifiedDetail', {
                        diseaseId: this.props.item.diseaseId,
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
                        name='check-square'
                        size={18}
                        color='#36ba07'
                        onPress={() => {
                            var diseaseId = this.props.item.diseaseId;
                            AsyncStorage.setItem('diseaseId', JSON.stringify(diseaseId), () => {
                                this.props.navigation.navigate('VerifiedDetail')
                            })
                        }}
                    />
                    <Text
                        style={{
                            marginTop: 3,
                            marginLeft: 2,
                            marginRight: 20,
                            color: '#36ba07',
                            fontWeight: 'bold'
                        }}>Verified</Text>
                    <Text style={{
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: 17,
                        textAlign: 'center',
                        textDecorationLine: "underline"
                    }}>Appointment</Text>
                    <Icon
                        style={{
                            marginLeft: 95,
                            marginTop: 10
                        }}
                        name='plus'
                        size={18}
                        color='gray'
                        onPress={() => {
                            var diseaseId = this.props.item.diseaseId;
                            AsyncStorage.setItem('diseaseId', JSON.stringify(diseaseId), () => {
                                this.props.navigation.navigate('VerifiedDetail')
                            })
                        }}
                    />

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
                        <Text style={{ paddingLeft: 5, color: '#3b3030' }}>{date[0]}</Text>
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
                </View>
            </View>
        );
    }
}
export default withNavigation(FlatListItemV)


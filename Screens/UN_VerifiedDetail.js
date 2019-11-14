import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class UN_VerifiedDetail extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#b063c5',
        },
        headerTintColor: '#ffffff'
    }
    constructor(props) {
        super(props);

    }
    state = {
        diseaseId: this.props.navigation.getParam('diseaseId', ''),
        dataSource: [],
        diseaseId2: ''
    }

    componentDidMount() {
        AsyncStorage.getItem('diseaseId', (err, result) => {
            if (result !== null) {
                this.setState({
                    diseaseId2: result,
                })
                console.log("this is the get appointment " + result);
                var id = this.state.diseaseId2.replace(/['"]+/g, '');
                const url = 'https://a6885600.ngrok.io/api/UnVerifiedDisease/';
                var fullUrl = url.concat(id);
                fetch(fullUrl)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            dataSource: responseJson,
                        })
                    })
            }
        });

    }
    render() {
        return (
            <View>
                <View style={{
                    marginTop: 10,
                    alignSelf: 'center',

                }}>
                    <Text style={{
                        marginTop: 10,
                        marginLeft: 3,
                        fontWeight: 'bold',
                        fontSize: 20,
                        letterSpacing: 3,
                    }}>DETAIL</Text>
                </View>
                <View style={{
                    borderBottomWidth: 1,
                    marginTop: 2,
                    marginLeft: 55,
                    marginRight: 55
                }}></View>
                <View style={{
                    alignSelf: 'center',
                    flexDirection: 'row',
                    marginTop: 10
                }}>

                    <Icon
                        name='times-circle'
                        color='red'
                        size={30} />
                    <Text style={{
                        marginTop: 10,
                        marginLeft: 3,
                        fontWeight: 'bold',
                        color: 'red'
                    }}>UN_Verified</Text>

                </View>
                <View style={{
                    borderBottomWidth: 1,
                    marginTop: 2,
                    marginLeft: 25,
                    marginRight: 25
                }}></View>
                <View style={styles.detailViewStyle}>
                    <Text style={styles.headingStyle}>diseases</Text>
                    <Text>{this.state.dataSource.diseaseType}</Text>
                </View>
                <View style={styles.detailViewStyle}>
                    <Text style={styles.headingStyle}>visit date</Text>
                    <Text>{this.state.dataSource.dateVisited}</Text>
                </View>

                <View style={styles.detailViewStyle}>
                    <Text style={styles.headingStyle}>drugs</Text>
                    <Text>{this.state.dataSource.medicines}</Text>
                </View>
                <View style={styles.detailViewStyle}>
                    <Text style={styles.headingStyle}>Test Taken</Text>
                    <Text>{this.state.dataSource.testTaken}</Text>
                </View>
                <View style={styles.detailViewStyle}>
                    <Text style={styles.headingStyle}>Test Result</Text>
                    <Text>{this.state.dataSource.testResult}</Text>
                </View>
                <View style={styles.detailViewStyle}>
                    <Text style={styles.headingStyle}>Appointment Detail</Text>
                    <Text>No detail Found</Text>
                </View>
                <View style={{
                    borderBottomWidth: 1,
                    marginTop: 2,
                    marginLeft: 25,
                    marginRight: 25
                }}></View>
                <View>
                    <Text style={{
                        letterSpacing: 2,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontSize: 17
                    }}>Transation Detail</Text>
                </View>
                <View style={{
                    borderBottomWidth: 1,
                    marginTop: 2,
                    marginLeft: 25,
                    marginRight: 25
                }}></View>
                <View style={styles.detailViewStyle}>
                    <Text style={styles.transacColor}>Transaction ID</Text>
                    <Text>c2830528-31ec-4ede-9564-5448a342c70f</Text>
                </View>
                <View style={styles.detailViewStyle}>
                    <Text style={styles.transacColor}>Time Stamp</Text>
                    <Text>2019-10-28T04:55:41.934Z</Text>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    detailViewStyle: {
        height: 50,
        width: '90%',
        alignSelf: "center"
    },
    headingStyle: {
        color: '#969190'
    },
    transacColor: {
        color: '#6b4c46'
    }

})
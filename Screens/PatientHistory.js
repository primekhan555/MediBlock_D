import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
// import HScrollCStyle from '../ScrollComponent/HScrollCStyle';
import FlatListItemU from './Components/FlatListItemU';
import FlatListItemV from './Components/FlatListItemV';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';

export default class PatientHistory extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerStyle={backgroundColor:'#b063c5'}
        let headerRight = (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => {
                        params.goToVerified()
                    }}
                    style={{
                        marginRight: 10,
                        backgroundColor: 'white',
                        width: 95,
                        height: 30,
                        justifyContent: 'center',
                        alignContent: 'center',
                        borderRadius: 4
                    }}>
                    <Text style=
                        {{
                            color: '#b063c5',
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>V-Summary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        params.goToUnVerified()
                    }}
                    style={{
                        marginRight: 10,
                        backgroundColor: 'white',
                        width: 95,
                        height: 30,
                        justifyContent: 'center',
                        alignContent: 'center',
                        borderRadius: 4
                    }}>
                    <Text style=
                        {{
                            color: '#b063c5',
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>UN-Summary</Text>
                </TouchableOpacity>
            </View>
        );
        return { headerRight, headerStyle };

    }

    constructor(props) {
        super(props);
    }
    state = {
        dataSource1: [],
        dataSource2: [],
        isloading: true,
        CNIC: '',
        patterns: false
    };
    _goToVerified() {
        let dataSource1 = this.state.dataSource1;
        AsyncStorage.setItem('dataSource1', JSON.stringify(dataSource1), () => {
            this.props.navigation.navigate('VerifiedSummary',{
                dataSource1:dataSource1
            })
        })
    }
    _goToUnVerified() {
        let dataSource2 = this.state.dataSource2;
        AsyncStorage.setItem('dataSource2', JSON.stringify(dataSource2), () => {
            this.props.navigation.navigate('UnVerifiedSummary')
        })
        
    }
    componentDidMount() {
        this.props.navigation.setParams({ goToVerified: this._goToVerified.bind(this) })
        this.props.navigation.setParams({ goToUnVerified: this._goToUnVerified.bind(this) })
        AsyncStorage.getItem('CNIC', (err, result) => {
            this.setState({
                CNIC: result,
            })
        });
        fetch('https://a6885600.ngrok.io/api/VerifiedDisease/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource1: responseJson,
                    isloading: false,
                })
            })
            .catch((error) => {
                this.setState({
                    isloading: true,
                })
            });

        fetch('https://a6885600.ngrok.io/api/UnVerifiedDisease/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource2: responseJson,
                    isloading: false,
                })
            })
            .catch((error) => {
                this.setState({
                    isloading: true,
                })
            });

    }

    render() {
        if (this.state.isloading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <StatusBar backgroundColor='#b063c5' />
                    <IndicatorViewPager
                        style={{ flex: 1, backgroundColor: 'white', }}
                        indicator={this._renderTitleIndicator()}>
                        <View style={{ flex: 1, backgroundColor: '#e8ebea', justifyContent: 'center' }}>
                            <ActivityIndicator style={{ justifyContent: 'center' }} size='large' animating={true} />
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#e8ebea', justifyContent: 'center' }}>
                            <ActivityIndicator size='large' animating={true} />
                        </View>
                    </IndicatorViewPager>
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, backgroundColor: '#e8ebea' }}>
                    <StatusBar backgroundColor='#b063c5' />

                    <IndicatorViewPager
                        style={{ flex: 1, backgroundColor: 'white' }}
                        indicator={this._renderTitleIndicator()}>


                        <View style={{ flex: 1, backgroundColor: '#e3dede' }}>
                            <FlatList
                                data={this.state.dataSource1}
                                renderItem={({ item, index }) => {
                                    const owners = item.patient;
                                    var ownerId = owners.split('#');
                                    const CNICS = this.state.CNIC.replace(/['"]+/g, '');
                                    var finalData = CNICS.replace(/\\/g, "");
                                    const final = finalData.replace(/['"]+/g, '');
                                    if (ownerId[1] == final) {
                                        return (
                                            <FlatListItemV item={item} index={index.toString()} />
                                        )
                                    }
                                    else {
                                        console.log("if is not executing")
                                    }
                                }}
                                keyExtractor={(item, index) => index.toString()} />
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#e3dede' }}>
                            <FlatList
                                data={this.state.dataSource2}
                                renderItem={({ item, index }) => {
                                    const owners = item.patient;
                                    var ownerId = owners.split('#');
                                    const CNICS = this.state.CNIC.replace(/['"]+/g, '');
                                    var finalData = CNICS.replace(/\\/g, "");
                                    const final = finalData.replace(/['"]+/g, '');
                                    if (ownerId[1] == final) {
                                        return (
                                            <FlatListItemU item={item} index={index.toString()} />
                                        )
                                    }
                                    else {
                                        console.log("if is not executing")
                                    }
                                }}
                                keyExtractor={(item, index) => index.toString()} />
                        </View>

                    </IndicatorViewPager>
                </View>

            )
        }
        {/* ) */ }

    }
    _renderTitleIndicator() {
        return <PagerTitleIndicator
            style={{
                width: "100%",
                height: 30
            }}
            titles={['               Verified          ', '                UN_Verified          ']} />;
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
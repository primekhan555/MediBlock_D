import React, { Component } from 'react';
import {
    View, Text,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid
} from 'react-native';

export default class VerifiedSummary extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        dataSource1: [],
        count: 1,
    }
    componentDidMount() {
        AsyncStorage.getItem('dataSource1', (err, result) => {
            if (result !== null) {
                var parsedArr = JSON.parse(result)
                this.setState({
                    dataSource1: parsedArr
                })
            }
        })

        this._renderArr();
    }
    _renderArr = () => {

        return this.state.dataSource1.map(i => {
            var date = i.dateVisited.toString().split('T');
            return (
                <View key={i} style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    width: '97%',
                    marginLeft: 5,
                    height: 25,
                    marginEnd: 1,
                    justifyContent: 'center',
                    paddingBottom: 3
                }}>
                    <View style={{ marginLeft: 30, marginRight: 30, flex: 8, marginTop: 5 }}>
                        <Text style={{ color: '#434547', fontWeight: 'bold', fontSize: 15 }}>{i.diseaseType}</Text>
                    </View>
                    <View style={styles.generalStyle}>

                        <Text style={styles.generalText}>{date[0]}</Text>
                    </View>
                </View>
            )
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 17 }}>Verified Summary</Text>
                </View>
                <View>
                    {this._renderArr()}
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({

    generalStyle: {
        marginLeft: 10,
        marginTop: 8,
        alignItems: 'center'
    },
    generalText: {
        color: '#3e5748',
        fontWeight: 'bold',
    },
})

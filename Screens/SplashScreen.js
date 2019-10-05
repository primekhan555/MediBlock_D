import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';

export default class SplashScreen extends Component {
    componentDidMount() {
        AsyncStorage.getItem('Doctor_CNIC', (err, result) => {
            if (result !== null) {
                this.props.navigation.navigate('HomeScreen');
                this.setState({
                    cnic: result,
                })
            }
            else {
                this.props.navigation.navigate('OptionScreen');
            }
        });
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff6666' }}>
                <View style={styles.container}>
                    <Text style={styles.text}>MediBlock</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 200,
        width: 350,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#ff6666',
        fontSize: 40,
        fontWeight: 'bold',
    }
});
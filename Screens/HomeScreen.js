import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScreen extends Component {
    state = {
        buttonState: true,
        buttonColor: "green"
    }
    static navigationOptions = {
        title: 'Home',
        // headerLeft: null
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Home Screen</Text>

                <ActionButton
                    style={{
                        marginEnd: -15,
                        marginBottom: -20,
                    }}
                    degrees={310}
                    buttonColor={this.state.buttonColor}
                    onPress={() => {
                        if (this.state.buttonColor == "red") {
                            this.setState({
                                buttonColor: "green",
                                buttonState: false
                            })
                        }
                        else {
                            this.setState({
                                buttonColor: "red",
                                buttonState: true
                            })
                        }
                    }}>

                    <ActionButton.Item
                        size={56}
                        buttonColor='#fcba03'
                        title="QR Code Scanner"
                        onPress={() => this.props.navigation.navigate('QRCodeScanner')}>
                        <Icon
                            name="qrcode"
                            style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    <ActionButton.Item
                        buttonColor='#03fc84'
                        title="Personal Information"
                        onPress={() => { 
                            this.props.navigation.navigate('PersonalInfo') }}>
                        <Icon
                            name="cog"
                            style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    {/* <ActionButton.Item
            buttonColor='#1abc9c'
            title="Refresh"
            onPress={() => { }}>
            <Icon name="undo" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}

                </ActionButton>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 30,
        height: 30,
        color: 'black',

    },
})
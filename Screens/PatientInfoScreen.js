import React,{Component} from 'react';
import {View, Text,} from 'react-native';

export default class PatientInfoScreen extends Component {
    static navigationOptions={
        header:null
    }
    componentDidMount(){
        AsyncStorage.getItem('DecodedData', (err, result) => {
            if (result !== null) {
                var plainText = result;
                var halfText = plainText.split('#');
                var nicc = halfText[1]
                var pinCode = halfText[3];
                var miliSecond = halfText[5];
                this.setState({
                    CNIC: nicc,
                    pinCode: pinCode,
                    miliSecond: miliSecond,
                })
            }
        })
    }
    render(){
        return(
            <View>
                <Text style={{
                    alignSelf:'center'
                }}>PatientInfoScreen</Text>
            </View>
        );
    }
}
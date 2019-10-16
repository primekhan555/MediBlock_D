import React, { Component } from 'react';
import { 
    View, 
    ActivityIndicator, 
    PermissionsAndroid, 
    Platform, 
    StyleSheet, 
    AsyncStorage } from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import base64 from 'react-native-base64';


export default class QRCodeScanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qrvalue: '',
            openScanner: false,
            dataSource: '',
            isLoading: true,
            CNIC: '',
        };
    }
    afterCodeScaning(qrvalues) {
        var decoded = base64.decode(qrvalues);
        this.setState({
            qrvalue: decoded,
            openScanner: false,
        })
        AsyncStorage.setItem('DecodedData', JSON.stringify(decoded), () => {
            AsyncStorage.getItem('DecodedData', (err, result) => {
                if (result !== null) {
                    var plainText = result;
                    var halfText = plainText.split('#');
                    if (halfText[3] == "PatientInfoScreen"){
                        this.props.navigation.navigate('PatientInfoScreen');
                    }
                    else{
                        this.props.navigation.navigate('PinCodeScreen');
                    }
                }
            })
        });
    }
    openScanner() {
        var that = this;
        if (Platform.OS === 'android') {
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA, {
                        'title': 'App Camera Permission',
                        'message': 'App needs access to your camera '
                    })
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        that.setState({
                            qrvalue: '',
                            openScanner: true,
                        });
                    }
                    else {
                        alert("CAMERA permission denied");
                    }
                }
                catch (err) {
                    alert("Camera permission err", err);
                    console.warn(err);
                }
            }
            requestCameraPermission();
        }
        else {
            that.setState({
                qrvalue: '',
                openScanner: true,
            });
        }
    }

    componentDidMount() {

        let cnic = "16202-9275022-5".toString();
        // AsyncStorage.setItem('CNIC', JSON.stringify(cnic), () => {

        //     console.log("i am inside")
        // })
    }
    render() {

        if (!this.state.openScanner) {
            this.openScanner();
            return (
                <View>
                    <ActivityIndicator size='large' animating={true} />
                </View>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <CameraKitCameraScreen
                        showFrame={true}
                        heightForScannerFrame={1000}
                        offsetForScannerFrame={10}
                        scanBarcode={true}
                        laserColor={'green'}
                        frameColor={'red'}
                        colorForScannerFrame={'black'}
                        onReadCode={event =>
                            this.afterCodeScaning(event.nativeEvent.codeStringValue)
                        }
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 150,
        marginTop: -50,
        justifyContent: 'center',
        backgroundColor: 'white'
    },

});
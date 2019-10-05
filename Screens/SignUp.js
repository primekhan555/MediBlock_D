import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default class SignUp extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#b063c5'
    },
    headerLeft: null,
  }
  constructor(props) {
    super(props)
  }
  state = {
    cnic: '',
    pass1: '',
    pass2: '',
    fieldUnderlineColorcnic: '#857777',
    fieldUnderlineColorPass: '#857777',
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container1}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </View>

        <View style={styles.secondView}>
          <ScrollView>
            <View>
              <Text style={styles.cnicPassText}>CNIC and Password</Text>
            </View>
            <View style={styles.TextInputView}>
              <TextInput
                style={styles.cnicInput}
                returnKeyType={'next'}
                placeholder=" 16202-0195532-5"
                keyboardType="decimal-pad"
                placeholderTextColor="#857777"
                underlineColorAndroid={this.state.fieldUnderlineColorcnic}
                onSubmitEditing={() => this.passwordRef1.focus()}
                onChangeText={(value) => {
                  const regex = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
                  var pattern = regex.test(value);
                  if (pattern) {
                    this.setState({
                      fieldUnderlineColorcnic: '#137804',
                      cnic: value
                    })
                  }
                  else {
                    this.setState({
                      fieldUnderlineColorcnic: '#e01414',
                      cnic: '',
                    })
                  }
                }}
              />
            </View>
            <View style={styles.TextInputView}>
              <TextInput
                ref={passwordRef => this.passwordRef1 = passwordRef}
                returnKeyType='next'
                onSubmitEditing={()=>this.passwordRef2.focus()}
                style={styles.cnicInput}
                placeholder=" Password"
                keyboardType="default"
                secureTextEntry={true}
                placeholderTextColor="#857777"
                underlineColorAndroid={this.state.fieldUnderlineColorPass}
                onChangeText={(password1) => {
                  this.setState({
                    pass1: password1
                  })
                }}
              />

            </View>
            <View style={styles.TextInputView}>
              <TextInput
              ref={passwordref=>this.passwordRef2=passwordref}
                style={styles.cnicInput}
                placeholder=" Confirm Password"
                keyboardType="default"
                secureTextEntry={true}
                placeholderTextColor="#857777"
                underlineColorAndroid={this.state.fieldUnderlineColorPass}
                onChangeText={(password2) => {
                  if (password2 == this.state.pass1) {
                    this.setState({
                      pass2: password2,
                      fieldUnderlineColorPass: '#137804',
                    })
                  }
                  else {
                    this.setState({
                      pass2: '',
                      fieldUnderlineColorPass: '#e01414',
                    })
                  }
                }}
              />
            </View>

            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.opacity}
                onPress={() => {
                  if (this.state.cnic == '') {
                    return;
                  }
                  if (this.state.pass1 == '') {
                    return;
                  }
                  if (this.state.pass2 == '') {
                    return;
                  }

                  // const regex = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
                  // var pattern = regex.test(this.state.cnic);
                  // if (pattern) {
                  //   console.log("your cnic is matching")
                  if (this.state.pass1 == this.state.pass2) {
                    console.log("password confirmed")
                    const url = 'https://f8f3f569.ngrok.io/api/Patient/';
                    const key = this.state.cnic;
                    const join = url.concat(key);

                    fetch(join)
                      .then((response) => response.status
                      ).then((statusCode) => {
                        if (statusCode == 404) {
                          this.props.navigation.navigate('Information1', {
                            nic: this.state.cnic,
                            pass: this.state.pass2,
                          })
                        }
                        else if (statusCode == 200) {
                          alert("your CNIC is already registered, please SignIn");
                        }
                      })
                  }
                  else {
                    console.log("password is not matching")
                  }
                  // }
                  // else {
                  //   console.log("your cnic is incorrect")
                  // }
                }
                }>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#b063c5'
  },
  container1: {
    flex: 30,
    height: 300,
    backgroundColor: '#b063c5',

  },
  secondView: {
    backgroundColor: 'white',
    flex: 70,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  signUpText: {
    marginStart: 25,
    color: 'white',
    fontSize: 40,
    marginTop: 50,
    fontWeight: 'bold'
  },
  TextInputView: {
    marginTop: 20,
    height: 50
  },
  cnicPassText: {
    marginTop: 30,
    marginStart: 28,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  cnicInput: {
    marginTop: 30,
    marginStart: 10,
    marginEnd: 10,
    height: 40,
    fontSize: 16,
    color: '#ff6666'
  },
  buttonView: {
    marginTop: 50,
    borderColor: 'black',
    alignItems: 'center'
  },
  button: {
    width: '100'
  },
  opacity: {
    backgroundColor: '#b063c5',
    width: 230,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }

});
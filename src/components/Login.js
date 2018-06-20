import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
} from "react-native";

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';


const CLIENT_ID_0 = '911986669524-jbefl2ge9h1bbp70tmhq695144beqk54.apps.googleusercontent.com'
const CLIENT_ID_1 = '911986669524-o6o7hu4dc8v7mh6lh612iii4f6cuncut.apps.googleusercontent.com'


class Login extends React.Component {

  async _setupGoogleSignin() {
      try {
          await GoogleSignin.hasPlayServices({ autoResolve: true })

          await GoogleSignin.configure({
              scopes: ["https://www.googleapis.com/auth/youtube", "https://www.googleapis.com/auth/youtube", "https://www.googleapis.com/auth/youtube"], // what API you want to access on behalf of the user, default is email and profile

              // webClientId: CLIENT_ID_1,
              offlineAccess: false,
          })

          // const user = await GoogleSignin.currentUserAsync()

          // if (user) {
          //     // this.props.onLogin(true)
          // }

      } catch (err) {
          console.warn('Google signin error', err.code, err.message)
      }
  }

  _signIn = () => {
      GoogleSignin.signIn()
          .then(user => {

              console.log(user)

              this.props.onLogin(user.accessToken)

              // GoogleSignin.getAccessToken()
              //     .then((token) => {
              //         console.log(token);
              //
              //         this.props.onLogin(token)
              //     })
              //     .catch((err) => {
              //         console.log(err);
              //     })
              //     .done();

              // this.props.onLogin(true)
          })
          .catch(err => {
              console.log(err)
              // console.log(err.error.message)
              // this.props.onLogin(true)
          })
          .done()


  }

    componentDidMount() {
      console.log('what the fuck')
        this._setupGoogleSignin()
    }

  render() {

      console.log('what the fuck')

    const { height, width } = this.props

    return <View
          style={{
          justifyContent: "center",
          alignItems: "center",
          height,
          width,
        }}
      >
        <GoogleSigninButton
            style={{width: 230, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={this._signIn}
        />
      </View>
  }
}


export default Login
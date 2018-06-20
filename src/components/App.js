import React from "react";

import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image,
  Dimensions,
} from "react-native";
import _ from "underscore";

import * as selectors from "../selectors";
import mock from "../mock";
import Messages from "./Messages";
import Tabs from "./Tabs";
import Stats from "./Stats";
import Video from "./Video";
import Logout from "./Logout";
import Login from "./Login";

import {
  API_KEY
} from '../assets'

const connect = (props, state) => {
  let selected_data = {};

  _.map(
    selectors,
    (selector, key) => (selected_data[key] = selector(props, state))
  );

  return selected_data;
};

export default class App extends React.Component {
  state = {
    activeUserId: false,
    activeTabIndex: 0,
    accessToken: false,
    width: 0,
    height: 0,
    messageSets_data: [],
    search_data: {},
    topVideo_data: {},
  };

  scrollView

  onSelectMessage = userId => {
    this.setState({
      activeUserId: userId === this.state.activeUserId ? false : userId,
    });
  };

  onSelectTab = tabIndex => {
    this.setState({
      activeTabIndex: tabIndex
    });
  };

  onLogout = () => {
    this.setState({
      activeTabIndex: 0,
      activeUserId: false,
      accessToken: false
    });
  };

  onLogin = (accessToken) => {
    this.setState({
      accessToken: accessToken
    });
  };

  _getTopVideoComments = () => {

      const {
          accessToken,
          liveChatId,
          pollingInterval,
          messageSets,
      } = connect(this.props, this.state)

      if (!accessToken) {
          return
      }

      const interval = pollingInterval || 10000
      let new_messageSets = [...messageSets]

      const url_2 = `https://www.googleapis.com/youtube/v3/liveChat/messages/?access_token=${accessToken}&part=snippet,id,authorDetails&liveChatId=${liveChatId}`

      const promise_2 = fetch(url_2)

      promise_2.then(res => res.json())
          .then(res => {

              new_messageSets.push(res)

              this.setState({
                  messageSets_data: new_messageSets
              }, () => {
                  setTimeout(this._getTopVideoComments, interval)
              })


          })
          .catch(console.warn)

  }

  _getTopChatId = () => {

    const {
        accessToken,
        videoId,
    } = connect(this.props, this.state)

  const url = `https://www.googleapis.com/youtube/v3/videos/?access_token=${accessToken}&part=snippet,id,liveStreamingDetails&id=${videoId}`

  try {
        const promise = fetch(url)

        promise.then(res => res.json())
            .then(res => {

                this.setState({
                    topVideo_data: res,
                })

            })
            .catch(console.warn)

    } catch (err) {
        console.warn('Youtube video error', err.code, err.message)
    }
  }

  _getTopVideoId = () => {


    const { accessToken } = this.state

    const url = `https://www.googleapis.com/youtube/v3/search/?access_token=${accessToken}&part=snippet,id&eventType=live&type=video&order=viewCount&maxResults=1`

    try {
        const promise = fetch(url)

        promise.then(res => res.json())
            .then(res => {

                this.setState({
                    search_data: res,
                })

            })
            .catch(console.warn)

    } catch (err) {
        console.warn('Youtube video error', err.code, err.message)
    }
  }

  componentDidMount() {
    const { width, height } = Dimensions.get("window");
    this.setState({
      width,
      height,
      latest_data: mock
    });
  }

  componentWillUnmount() {
      this.setState({
          accessToken: false,
      })
  }

  componentDidUpdate(prevProps, prevState) {
    const {
        accessToken,
        videoId,
        liveChatId,
        messageSets,
    } = connect(this.props, this.state);

    const prevSelectors = connect(prevProps, prevState)

    if (!prevSelectors.accessToken && accessToken) {
        this._getTopVideoId()
    }

    if (accessToken && !prevSelectors.videoId && videoId) {

        this._getTopChatId()
    }
    if (accessToken && !prevSelectors.liveChatId && liveChatId) {

        this._getTopVideoComments()
    }

    if (liveChatId && prevSelectors.messageSets.length && prevSelectors.messageSets.length !== messageSets.length) {

        if (this.scrollView) {
            this.scrollView.scrollToEnd({animated: true})
        }

    }
  }

  render() {
    const {
      filteredMessages,
      activeTabIndex,
      messagesPerSecond,
      isLoggedIn,
      width,
      height,
      navWidth,
      videoHeight,
      paneHeight,
      videoId,
    } = connect(this.props, this.state);

    const tabs = [
      <Messages
        {...{
          refFunc: el => {this.scrollView = el},
          filteredMessages,
          width,
          onSelectMessage: this.onSelectMessage
        }}
      />,
      <Stats
        {...{
          messagesPerSecond
        }}
      />,
      <Logout onLogout={this.onLogout} />
    ];

    const loggedInView = (
      <View>
        <Video width={width} height={videoHeight} id={videoId}/>

        <Tabs
          {...{
            tabs,
            onSelectTab: this.onSelectTab,
            activeTabIndex,
            navWidth,
            height:paneHeight
          }}
        />
      </View>
    );

    const loggedOutView = <Login onLogin={this.onLogin} height={height} width={width} />;

    return (
      <View>
        {isLoggedIn ? loggedInView : loggedOutView}
      </View>
    );
  }
}

import _ from "underscore";
import { TAB_NAVS, ASPECT_RATIO } from "./assets";

import {
  Platform,
} from 'react-native'

import ExtraDimensions from 'react-native-extra-dimensions-android'

const IS_ANDROID = Platform.OS === 'android'
const IS_IOS = Platform.OS === 'ios'

const topHeight = IS_ANDROID ? ExtraDimensions.get('STATUS_BAR_HEIGHT') : IS_IOS ? 20 : 0
const bottomHeight = IS_ANDROID ? ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT') : 0

const NUMBER_OF_SEGMENTS = 20;
const DEFAULT_POLLING_INTERVAL = 300;
const MIN_POLLING_INTERVAL = 450

export const paneHeight = (height, videoHeight) => height - videoHeight - bottomHeight + topHeight

export const videoHeight = width => width * ASPECT_RATIO;

export const navWidth = width => width / TAB_NAVS.length;

export const pollingInterval = data =>
  data ? Math.min(data.pollingIntervalMillis, MIN_POLLING_INTERVAL) : DEFAULT_POLLING_INTERVAL;

export const raw_messages = data => data.items || [];
export const raw_results = data => data.items ? data.items[0] : {}

export const videoId = video => video.id && video.id.videoId
export const liveChatId = video => video.liveStreamingDetails && video.liveStreamingDetails.activeLiveChatId

export const numberOfMessageSets = sets => sets.length
export const lastMessageSetIndex = (
    numberOfMessageSets
) => numberOfMessageSets === 0 ? 0 : numberOfMessageSets - 1

export const latestMessageSet = (
    sets,
    lastMessageSetIndex,
) => sets[lastMessageSetIndex]

export const partial_messageSets = (sets) => {
    return sets.map(({items}) => {
      return items
    })
}

export const uniqueMessages = (sets) => {
    return _.uniq(
        _.union(...sets),
        false,
        function(item, key, a){ return item.id; }
      );
}

export const messages = raw_messages => {
  return raw_messages.map(({ snippet, authorDetails, id }) => {
    const { publishedAt, textMessageDetails: { messageText } } = snippet;
    const { channelId, profileImageUrl, displayName } = authorDetails;

    return {
      id,
      timestamp: publishedAt,
      message: messageText,
      userId: channelId,
      userName: displayName,
      avatarSrc: profileImageUrl
    };
  });
};

export const isLoggedIn = accessToken => {
  return !!accessToken;
};

export const hasActiveUser = activeUserId => {
  return !!activeUserId;
};

export const filteredMessages = (
  hasActiveUser,
  activeUserMessages,
  sortedMessages
) => {
  return hasActiveUser ? activeUserMessages : sortedMessages;
};

export const activeUserMessages = (messages, activeUserId, hasActiveUser) => {
  return hasActiveUser
    ? _.map(messages, data => {
        if (data.userId !== activeUserId) {
          return { ...data, hidden: true };
        }

        return data;
      })
    : [];
};

export const sortedMessages = messages =>
  _.sortBy(messages, ({ timestamp }) => timestamp);

export const hasMessages = sortedMessages =>
  sortedMessages && sortedMessages.length;

export const startTime = (sortedMessages, hasMessages) =>
  hasMessages && sortedMessages[0].timestamp;

export const totalTime = (sortedMessages, startTime, hasMessages) =>
  hasMessages
    ? sortedMessages[sortedMessages.length - 1].timestamp - startTime
    : 0;

export const lengthOfSegment = totalTime =>
  totalTime ? totalTime / NUMBER_OF_SEGMENTS : 0;

export const messagesPerSecond = (
  sortedMessages,
  startTime,
  lengthOfSegment
) => {
  let messagesPerSecond = [];

  sortedMessages.map((message, messageIndex) => {
    [...Array(NUMBER_OF_SEGMENTS)].map((_, segmentIndex) => {
      const rangeStart = startTime + lengthOfSegment * segmentIndex;
      const rangeEnd = startTime + lengthOfSegment * (segmentIndex + 1);

      if (message.timestamp > rangeStart && message.timestamp <= rangeEnd) {
        const currentNumForSegment = messagesPerSecond[segmentIndex] || 0;

        messagesPerSecond[segmentIndex] = currentNumForSegment + 1;
      }
    });
  });

  return messagesPerSecond;
};

//get messages

//poll to get messages

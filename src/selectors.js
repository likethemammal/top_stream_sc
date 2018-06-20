import { createSelector } from "reselect";

import {
  pollingInterval as _pollingInterval,
  raw_messages as _raw_messages,
  messages as _messages,
  activeUserMessages as _activeUserMessages,
  messagesPerSecond as _messagesPerSecond,
  sortedMessages as _sortedMessages,
  startTime as _startTime,
  totalTime as _totalTime,
  lengthOfSegment as _lengthOfSegment,
  hasMessages as _hasMessages,
  hasActiveUser as _hasActiveUser,
  filteredMessages as _filteredMessages,
  isLoggedIn as _isLoggedIn,
  navWidth as _navWidth,
    paneHeight as _paneHeight,
    videoHeight as _videoHeight,
    raw_results as _raw_results,
    videoId as _videoId,
    liveChatId as _liveChatId,
    latestMessageSet as _latestMessageSet,
    lastMessageSetIndex as _lastMessageSetIndex,
    numberOfMessageSets as _numberOfMessageSets,
    uniqueMessages as _uniqueMessages,
    partial_messageSets as _partial_messageSets,
} from "./units";

const raw_messageSets_data = (props, state) => state.messageSets_data || [];
const raw_search_data = (props, state) => state.search_data || {};
const raw_topVideo_data = (props, state) => state.topVideo_data || {};
const numberOfMessageSets = createSelector(raw_messageSets_data, _numberOfMessageSets)
const lastMessageSetIndex = createSelector(
    numberOfMessageSets,
    _lastMessageSetIndex
)
const latestMessageSet = createSelector(
    raw_messageSets_data,
    lastMessageSetIndex,
    _latestMessageSet
)

const partial_messageSets = createSelector(raw_messageSets_data, _partial_messageSets)

export const uniqueMessages = createSelector(partial_messageSets, _uniqueMessages);

export const pollingInterval = createSelector(latestMessageSet, _pollingInterval);

const raw_search = createSelector(raw_search_data, _raw_results)
const raw_topVideo = createSelector(raw_topVideo_data, _raw_results)

const messages = createSelector(uniqueMessages, _messages);

export const messageSets = raw_messageSets_data

export const accessToken = (props, state) => state.accessToken;

export const width = (props, state) => state.width;
export const height = (props, state) => state.height;
export const videoSrc = (props, state) => state.videoSrc;
export const activeUserId = (props, state) => state.activeUserId;
export const activeTabIndex = (props, state) => state.activeTabIndex;

export const navWidth = createSelector(width, _navWidth);

export const videoHeight = createSelector(width, _videoHeight)
export const paneHeight = createSelector(height, videoHeight, _paneHeight)
export const videoId = createSelector(raw_search, _videoId);
export const liveChatId = createSelector(raw_topVideo, _liveChatId);

export const isLoggedIn = createSelector(accessToken, _isLoggedIn);

const sortedMessages = createSelector(messages, _sortedMessages);

const hasActiveUser = createSelector(activeUserId, _hasActiveUser);

const activeUserMessages = createSelector(
  sortedMessages,
  activeUserId,
  hasActiveUser,
  _activeUserMessages
);

export const filteredMessages = createSelector(
  hasActiveUser,
  activeUserMessages,
  sortedMessages,
  _filteredMessages
);

const hasMessages = createSelector(sortedMessages, _hasMessages);

const startTime = createSelector(sortedMessages, hasMessages, _startTime);

const totalTime = createSelector(
  sortedMessages,
  startTime,
  hasMessages,
  _totalTime
);

const lengthOfSegment = createSelector(totalTime, _lengthOfSegment);

export const messagesPerSecond = createSelector(
  sortedMessages,
  startTime,
  lengthOfSegment,
  _messagesPerSecond
);

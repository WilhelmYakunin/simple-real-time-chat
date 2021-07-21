import { createSlice } from '@reduxjs/toolkit';

export const channelsData = createSlice({
  name: 'channels',
  initialState: {
    serverDataLoaded: false,
    channels: [],
    currentChannelId: 1,
    channelsProccedingError: 'none',
    showDropdownForChannel: 0,
  },
  reducers: {
    loadChatState(state, action) {
      const { channels, currentChannelId } = action.payload;
      state.serverDataLoaded = true;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      const newChannel = action.payload;
      state.channels.push(newChannel);
    },
    deleteChannel: (state, action) => {
      const id = action.payload;
      const indexOfDeletee = state.channels.findIndex((channel) => channel.id === id);
      state.channels.splice(indexOfDeletee, 1);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((c) => c.id === id);
      if (!channel) return;
      channel.name = name;
    },
    channelsProccedingError(state, action) {
      state.channelsProccedingError = action.payload;
    },
  },
  extraReducers: {
    [deleteChannel]: (state, action) => {
      const id = action.payload;
      const copyMessages = state.messages.slice().filter((message) => message.channelId !== id);
      state.messages = copyMessages;
    },
  },
});

export const {
  channelsProccedingError,
  loadChatState,
  setCurrentChannel,
  addChannel,
  renameChannel,
  deleteChannel,
} = channelsData.actions;

export default channelsData.reducer;

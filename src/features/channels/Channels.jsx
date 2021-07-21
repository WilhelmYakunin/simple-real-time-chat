import React from 'react';
import { useSelector } from 'react-redux';
import Channel from './ListChannel';

const Channels = () => {
  const {
    channels,
    currentChannelId,
  } = useSelector((state) => state.channelsData);

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels !== undefined && channels.map((channel) => (
        <Channel
          key={channel.id}
          channel={channel}
          currentChannelId={currentChannelId}
        />
      ))}
    </ul>
  );
};

export default Channels;

import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  requestChannelsChanges,
  reciveChannelsChanges,
  channelsProccedingError,
  setCurrentChannel,
} from '../../reducers/channelsSlice';
import {
  requestDropdownOpen,
  setDropdownOpen,
  reciveDropdownOpen,
  dropdownProccedingError,
} from '../../reducers/dropdownSlice';
import {
  requestDeleteModalOpen,
  setDeleteModalOpen,
  reciveDeleteModalOpen,
  deleteModalProccedingError,
} from '../../reducers/deleteModalSlice';
import {
  requestRenameModalOpen,
  setRenameModalOpen,
  reciveRenameModalOpen,
  renameModalProccedingError,
} from '../../reducers/renameModalSlice';

export default function ListChannel({
  channel: { id, name, removable },
  currentChannelId,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getChannelBtnStyles = cn(
    'flex-grow-1',
    'nav-link',
    'btn-block',
    'text-left',
    'btn',
  );

  const isCurrent = () => (id === currentChannelId ? 'btn-primary' : 'btn-light');

  const getChannelDropdawnBtnStyles = cn(
    'flex-grow-0',
    'dropdown-toggle',
    'dropdown-toggle-split',
    'btn',
  );

  function handleSetCurrentChannel() {
    try {
      dispatch(requestChannelsChanges());
      dispatch(setCurrentChannel(id));
      dispatch(reciveChannelsChanges());
    } catch (exception) {
      dispatch(channelsProccedingError(exception.message));
    }
  }

  function handleOpenDeleteModal(e) {
    e.preventDefault();
    try {
      dispatch(requestDeleteModalOpen());
      dispatch(setDeleteModalOpen());
      dispatch(reciveDeleteModalOpen());
    } catch (exception) {
      dispatch(deleteModalProccedingError());
    }
  }

  function handleOpenRenameModal(e) {
    e.preventDefault();
    try {
      dispatch(requestRenameModalOpen());
      dispatch(setRenameModalOpen());
      dispatch(reciveRenameModalOpen());
    } catch (exception) {
      dispatch(renameModalProccedingError());
    }
  }

  function handleReciveDropdownOpen(e) {
    e.preventDefault();
    try {
      dispatch(requestDropdownOpen());
      dispatch(setDropdownOpen(id));
      dispatch(reciveDropdownOpen());
    } catch (exception) {
      dispatch(dropdownProccedingError());
    }
  }

  return (
    <li key={id} className="nav-item">
      <div role="group" className="d-flex mb-2 dropdown btn-group">
        <button
          className={`${getChannelBtnStyles} ${isCurrent(id)}`}
          onClick={handleSetCurrentChannel}
          type="submit"
        >
          {name}
        </button>
        { removable ? (
          <>
            <button
              onClick={handleReciveDropdownOpen}
              type="button"
              role="menu"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              className={`${getChannelDropdawnBtnStyles} ${isCurrent(id)}`}
            />
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a
                onClick={handleOpenDeleteModal}
                className="dropdown-item"
                href="/"
                role="button"
              >
                {t('channels.remove')}
              </a>
              <a
                onClick={handleOpenRenameModal}
                className="dropdown-item"
                href="/"
                role="button"
              >
                {t('channels.rename')}
              </a>
            </div>
          </>
        ) : null}
      </div>
    </li>
  );
}

ListChannel.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    removable: PropTypes.bool.isRequired,
  }).isRequired,
  currentChannelId: PropTypes.number.isRequired,
};
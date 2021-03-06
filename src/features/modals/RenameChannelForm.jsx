import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import getOnlyUniqeChannelName from './getOnlyUniqueSchema';
import { closeModal } from './modalFormsSlice';
import ModalHeader from '../../components/ModalHeader';
import ModalInput from '../../components/ModalInput';
import ModalFooter from '../../components/ModalFooter';
import { getAllChannels, modalChannelId } from '../../store/selectors';
import SocketContext from '../../contexts/SocketContext';

const RenameChannelForm = () => {
  const { renameChannel } = React.useContext(SocketContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idOfRenamingChannel = useSelector(modalChannelId);
  const allChannels = useSelector(getAllChannels);
  const allChannelsNames = allChannels.map((channel) => channel.name);
  const handleRenameChannel = ({ name }, { resetForm }) => {
    const renameChannelInfo = { id: idOfRenamingChannel, name };
    renameChannel(renameChannelInfo);
    resetForm();
    dispatch(closeModal());
  };

  return (
    <>
      <Formik
        validationSchema={getOnlyUniqeChannelName(allChannelsNames)}
        initialValues={{
          name: allChannels.filter((channel) => channel.id === idOfRenamingChannel)[0].name,
        }}
        onSubmit={handleRenameChannel}
      >
        {({ errors, isValid }) => (
          <Form>
            <ModalHeader text={t('modals.rename')} />
            <Modal.Body>
              <ModalInput
                dataTestid="add-channel"
                ariaLabel="add channel"
                isValid={isValid}
                error={t(errors.name)}
              />
            </Modal.Body>
            <ModalFooter textCancel={t('modals.cancel')} textSubmit={t('modals.submit')} submitButtonVariant="primary" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RenameChannelForm;

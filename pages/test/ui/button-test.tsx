import { useState } from 'react';
import { View } from 'react-native';
import { Button, ButtonText } from '~/shared/ui/button';
import { Modal } from '~/shared/ui/modal';
import {
  ModalAction,
  ModalCancel,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '~/shared/ui/modal/modal';

export default function ButtonTest() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <View
      style={{
        paddingVertical: 20,
        flex: 1,
        rowGap: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          variant="solid-gray"
          size="md"
          onPress={() => setOpenModal(true)}>
          <ButtonText variant="solid-gray" size="md">
            Open Modal
          </ButtonText>
        </Button>
        <Button
          variant="solid-light"
          size="md"
          onPress={() => setOpenModal(true)}>
          <ButtonText variant="solid-light" size="md">
            Open Modal
          </ButtonText>
        </Button>
        <Button
          variant="solid-white"
          size="md"
          onPress={() => setOpenModal(true)}>
          <ButtonText variant="solid-white" size="md">
            Open Modal
          </ButtonText>
        </Button>
      </View>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          variant="outlined-gray"
          size="md"
          onPress={() => setOpenModal(true)}>
          <ButtonText variant="outlined-gray" size="md">
            Open Modal
          </ButtonText>
        </Button>
        <Button
          variant="outlined-white"
          size="md"
          onPress={() => setOpenModal(true)}>
          <ButtonText variant="outlined-white" size="md">
            Open Modal
          </ButtonText>
        </Button>
        <Button variant="ghost" size="md" onPress={() => setOpenModal(true)}>
          <ButtonText variant="ghost" size="md">
            Open Modal
          </ButtonText>
        </Button>
      </View>
      <Modal visible={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>
          <ModalTitle>Modal</ModalTitle>
          <ModalDescription>Modal Description</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalCancel text="Cancel" />
          <ModalAction text="Action" />
        </ModalFooter>
      </Modal>
    </View>
  );
}

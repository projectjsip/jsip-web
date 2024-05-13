import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

function ModalPreviewImage({ imageUrl }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Image
        src={imageUrl}
        gridRow="1 / -1"
        gridColumn="1"
        maxW="100%"
        display="block"
        borderRadius="8px"
        cursor="pointer"
        onClick={onOpen}
      />

      <Modal size="2xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Foto Kegiatan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={imageUrl} objectFit="contain" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalPreviewImage;

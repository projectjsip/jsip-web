import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Link,
} from "@chakra-ui/react";
import React from "react";

function ModalDetailImage({ src, name }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Image
        src={src}
        h="120px"
        w="auto"
        objectFit="contain"
        onClick={onOpen}
        cursor="pointer"
      />

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Link isExternal href={src}>
              <Image src={src} h="500px" w="auto" objectFit="contain" />
            </Link>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDetailImage;

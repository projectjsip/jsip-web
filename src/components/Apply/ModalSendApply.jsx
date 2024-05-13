import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Text,
  Spacer,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { fetchSendSubmission } from "../../networks/libs/apply";

function ModalSendApply() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function sendApply() {
    setIsLoading(true);
    await fetchSendSubmission(localStorage.getItem("token"))
      .then((response) => {
        setIsLoading(false);
        toast({
          position: "top",
          title: `Berhasil mengirim semua pengajuan! `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          position: "top",
          title: error.response.data.info
            ? error.response.data.info
            : error.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }
  return (
    <div>
      <Button
        w={["100%", "100%", "fit-content", "fit-content"]}
        colorScheme="green"
        rightIcon={<Icon icon="bx:send" />}
        onClick={onOpen}
      >
        Kirim Pengajuan
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            <Box mr="8px">
              <Icon icon="bx:info-circle" color="green" fontSize="30px" />
            </Box>{" "}
            Mengirim Pengajuan
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="column" spacing="24px" alignItems="center">
              <Text textAlign="center">
                Anda yakin ingin mengirim pengajuan ini?
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="secondary" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Spacer />
            <Button
              colorScheme="green"
              onClick={sendApply}
              isLoading={isLoading}
            >
              Kirim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalSendApply;

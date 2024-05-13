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
import {
  fetchProceedFundDistribution,
} from "../../networks/libs/apply";

function ModalFundDistribution({ id, onSuccess }) {
  const toast = useToast();
  const [isLoadingFundDistribution, setIsLoadingFundDistribution] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function onProceedFundDistribution() {
    setIsLoadingFundDistribution(true);
    await fetchProceedFundDistribution(localStorage.getItem("token"), id)
      .then((response) => {
        setIsLoadingFundDistribution(false);
        onSuccess(true);
        toast({
          position: "top",
          title: `Berhasil proses ke penyaluran dana!`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setIsLoadingFundDistribution(false);
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
        variant="jsip-primary"
        rightIcon={<Icon icon="bx:send" />}
        onClick={onOpen}
      >
        Proses Penyaluran Dana
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            <Box mr="8px">
              <Icon icon="bx:info-circle" color="green" fontSize="30px" />
            </Box>{" "}
            Proses Penyaluran Dana
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="column" spacing="24px" alignItems="center">
              <Text textAlign="center">
                Anda yakin ingin proses penyaluran dana?
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
              onClick={onProceedFundDistribution}
              isLoading={isLoadingFundDistribution}
            >
              Kirim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalFundDistribution;

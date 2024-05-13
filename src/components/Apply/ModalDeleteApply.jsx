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
import { useNavigate } from "react-router-dom";
import { fetchDeleteApply } from "../../networks/libs/apply";

function ModalDeleteApply({ id }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function deleteApply() {
    setIsLoading(true);
    await fetchDeleteApply(localStorage.getItem("token"), id)
      .then((response) => {
        setIsLoading(false);
        toast({
          position: "top",
          title: `Berhasil menghapus pengajuan! `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/admin/apply");
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
        size="lg"
        colorScheme="red"
        leftIcon={<Icon icon="bx:trash" />}
        onClick={onOpen}
      >
        Hapus Pengajuan
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            <Box mr="8px">
              <Icon icon="bx:info-circle" color="red" fontSize="30px" />
            </Box>{" "}
            Menghapus Pengajuan
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="column" spacing="24px" alignItems="center">
              <Text textAlign="center">
                Anda yakin ingin menghapus pengajuan ini? pengajuan akan dihapus
                secara permanen
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="secondary" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Spacer />
            <Button
              colorScheme="red"
              onClick={deleteApply}
              isLoading={isLoading}
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalDeleteApply;

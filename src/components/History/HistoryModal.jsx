/* eslint-disable react-hooks/exhaustive-deps */

import {
  Box,
  Flex,
  Spacer,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Skeleton,
  Divider,
  ModalFooter,
  Tag,
  Link,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { formatter } from "../../utils/formatter";
import { Icon } from "@iconify/react";
import { fetchHistory } from "../../networks/libs/apply";
import { statusColor, translateStatusTracking } from "../../utils/translate";

function HistoryModal({ history }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [historyDetail, setHistoryDetail] = useState({});

  const getHistory = async () => {
    setIsLoading(true);
    await fetchHistory(history?.batch_id)
      .then((response) => {
        setIsLoading(false);
        setHistoryDetail(response.data.content);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <Box
        p="20px"
        boxShadow="md"
        borderRadius="8px"
        w="100%"
        borderLeft="4px solid #00649A"
        cursor="pointer"
        onClick={onOpen}
      >
        <Stack direction="row" spacing="20px">
          <Stack direction="column" spacing="20px">
            <Stack direction="row" alignItems="center">
              <Box
                p="10px"
                bgColor="jsip.primary"
                color="white"
                borderRadius="8px"
              >
                <Icon icon="bxs:school" fontSize="16px" />
              </Box>
              <Text fontWeight="700" fontSize="24px">
                {history?.school_name}
              </Text>
            </Stack>
            <Flex direction="column">
              <Text fontWeight="400" fontSize="16px" color="jsip.grey700">
                {history?.legal_id}
              </Text>
              <Text fontWeight="400" fontSize="16px" color="jsip.grey700">
                Total Pengajuan: {history?.applicant_total}
              </Text>
            </Flex>
          </Stack>
          <Spacer />
          <Text fontWeight="700" fontSize="20px" color="jsip.primary">
            Rp {formatter.format(history?.reward_total)}
          </Text>
        </Stack>
      </Box>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{historyDetail?.legal_id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Skeleton isLoaded={!isLoading}>
              <Stack spacing="20px" direction="column" divider={<Divider />}>
                <Stack direction="row" spacing="20px">
                  <Stack direction="column" spacing="20px">
                    <Stack direction="column" spacing="0px">
                      <Text fontWeight="700" fontSize="18px">
                        {historyDetail?.school?.school_name} -{" "}
                        <Text as="span" fontSize="16px">
                          (NPSN : {historyDetail?.school?.npsn})
                        </Text>
                      </Text>
                      <Text
                        fontWeight="400"
                        fontSize="16px"
                        color="jsip.grey700"
                      >
                        {historyDetail?.school?.principal_name}
                      </Text>
                      <Text
                        fontWeight="400"
                        fontSize="16px"
                        color="jsip.grey700"
                      >
                        Total Pengajuan: {history?.applicant_total}
                      </Text>
                    </Stack>
                  </Stack>
                  <Spacer />
                  <Text fontWeight="700" fontSize="20px" color="jsip.primary">
                    Rp {formatter.format(history?.reward_total)}
                  </Text>
                </Stack>
                <Stack spacing="10px" direction="column">
                  {historyDetail?.applicant?.map((applicant) => (
                    <Box
                      p="20px"
                      boxShadow="md"
                      borderRadius="8px"
                      w="100%"
                      borderLeft="4px solid #00649A"
                    >
                      <Stack direction="row" spacing="20px" alignItems="start">
                        <Stack direction="column" spacing="0px">
                          <Text fontSize="18px" fontWeight="700">
                            {applicant?.applicant_name}
                          </Text>
                          <Text>{applicant?.achievement_description}</Text>
                          <Text
                            fontWeight="700"
                            fontSize="16px"
                            color="jsip.primary"
                          >
                            Rp {formatter.format(applicant?.reward_amount)}
                          </Text>
                        </Stack>
                        <Spacer />
                        <Stack direction="column" alignItems="end">
                          <Tag
                            variant="subtle"
                            colorScheme={statusColor(applicant?.status)}
                          >
                            {translateStatusTracking(applicant?.status)}
                          </Tag>

                          {applicant?.certificate_url ? (
                            <>
                              <Link
                                href={applicant?.certificate_url}
                                color="jsip.primary"
                                isExternal
                                fontSize="14px"
                              >
                                Download Sertifikat
                              </Link>
                            </>
                          ) : null}
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Skeleton>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}

export default HistoryModal;

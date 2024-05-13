import { Skeleton, Stack, Spacer, Box, Text, Tag } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/AppComponents/Layout";
import AdminPaginationFooter from "../components/AppComponents/AdminPaginationFooter";
import {
  fetchAllNotification,
  fetchReadNotification,
} from "../networks/libs/notification";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/user";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const getAllNotification = async (page) => {
    try {
      setIsLoading(true);
      const response = await fetchAllNotification(
        localStorage.getItem("token"),
        page,
        numberDisplayed
      );

      if (response.data.content) {
        setIsLoading(false);
        setNotifications(response.data.content);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllNotification(1); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectNotification = (batchId) => {
    const role = user?.role;
    if (role === "verifier") return navigate(`/verifier/batch/${batchId}`);
    if (role === "admin") return navigate(`/admin/apply/batch/${batchId}`);
  };

  async function readNotification(id, batchId) {
    await fetchReadNotification(localStorage.getItem("token"), id)
      .then((response) => {
        redirectNotification(batchId);
        getAllNotification(pageIndex + 1);
      })
      .catch((error) => {});
  }

  const dataLength = notifications?.total ?? 0; // Ganti sesuai panjang data
  const [pageIndex, setPageIndex] = useState(0);
  const [numberDisplayed, setNumberDisplayed] = useState("15");
  const maxPage = Math.floor(
    dataLength / parseInt(numberDisplayed) +
      (dataLength % parseInt(numberDisplayed) === 0 ? 0 : 1)
  );
  const changePage = (page) => {
    if (page < 0) return;
    if (page >= maxPage) return;
    setPageIndex(page);
    getAllNotification(page + 1);
  };

  return (
    <Layout pageName="Notifikasi">
      <Stack direction="column" spacing="24px">
        <Skeleton isLoaded={!isLoading} borderRadius="8px">
          <Box overflow="auto">
            {notifications?.data && notifications?.data?.length > 0 ? (
              <>
                <Stack direction="column" spacing="20px" mb="20px">
                  {notifications?.data?.map((notification, index) => (
                    <>
                      <Box
                        p="20px"
                        boxShadow="md"
                        borderRadius="20px"
                        borderLeft="5px solid"
                        borderColor="jsip.primary"
                        cursor="pointer"
                        onClick={() =>
                          readNotification(
                            notification?.id,
                            notification?.batch_submission_id
                          )
                        }
                      >
                        <Stack
                          direction="row"
                          spacing="20px"
                          alignItems="start"
                        >
                          <Stack direction="column" spacing="10px">
                            <Text
                              fontSize="16px"
                              fontWeight="700"
                              color="jsip.primary"
                            >
                              {notification?.title}
                            </Text>
                            <Text fontSize="14px" fontWeight="400">
                              {notification?.message}
                            </Text>
                          </Stack>
                          <Spacer />
                          <Tag
                            variant="subtle"
                            colorScheme={
                              notification?.is_read ? "green" : "cyan"
                            }
                          >
                            {notification?.is_read
                              ? "Sudah dibaca"
                              : "Belum dibaca"}
                          </Tag>
                        </Stack>
                      </Box>
                    </>
                  ))}
                </Stack>
                <AdminPaginationFooter
                  pageIndex={pageIndex}
                  maxPage={maxPage}
                  onChangePage={changePage}
                  numberDisplayed={numberDisplayed}
                  setNumberDisplayed={setNumberDisplayed}
                  showBaris={false}
                />
              </>
            ) : (
              <>
                <Text>Belum ada data notifikasi</Text>
              </>
            )}
          </Box>
        </Skeleton>
      </Stack>
    </Layout>
  );
}

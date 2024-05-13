import { MenuItem, useToast } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { fetchLogout } from "../networks/libs/auth";
import { userState } from "../recoil/user";

function Logout() {
  const toast = useToast();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  async function logout() {
    const token = localStorage.getItem("token");
    await fetchLogout(token)
      .then((response) => {
        navigate("/");
        localStorage.clear();
        setUser({});
      })
      .catch((error) => {
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
    <>
      <MenuItem
        icon={<Icon icon="bx:log-out" />}
        color="jsip.danger"
        fontWeight="500"
        onClick={() => logout()}
      >
        Logout
      </MenuItem>
    </>
  );
}

export default Logout;

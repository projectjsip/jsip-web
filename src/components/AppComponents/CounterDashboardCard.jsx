import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React from "react";

function CounterDashboardCard({ bgColor, color, title, icon, count }) {
  return (
    <Box bgColor={bgColor} p="20px" borderRadius="16px">
      <Stack direction="column" spacing="10px">
        <Flex alignItems="center">
          <Box
            bgColor={color}
            p="4px"
            borderRadius="8px"
            mr="8px"
            color="white"
          >
            <Icon icon={icon} />
          </Box>
          <Text color="black" fontWeight="700">
            {title}
          </Text>
        </Flex>
        <Text fontWeight="700" fontSize="34px">
          {count}
        </Text>
        <Box border={`2px solid ${color}`} maxW="20%" />
      </Stack>
    </Box>
  );
}

export default CounterDashboardCard;

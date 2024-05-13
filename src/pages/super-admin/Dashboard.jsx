import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Layout, { superAdminMenu } from "../../components/AppComponents/Layout";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <Layout pageName="Dashboard">
      <Stack direction="column" spacing="20px">
        <SimpleGrid columns={[1, 1, 2, 4]} gap="20px">
          {superAdminMenu
            .filter((fil) => fil.title !== "Dashboard")
            .map((superAdmin) => (
              <Link
                key={superAdmin.link}
                to={superAdmin.link}
                style={{ width: "100%" }}
              >
                <Box
                  p="20px"
                  borderRadius="20px"
                  borderLeft="4px solid"
                  borderColor="jsip.primary"
                  boxShadow="md"
                >
                  <Stack direction="row" spacing="10px" alignItems="center">
                    <Icon icon={superAdmin.icon} />
                    <Text fontWeight="700">{superAdmin.title}</Text>
                  </Stack>
                </Box>
              </Link>
            ))}
          {/* <CounterDashboardCard
            bgColor="rgba(20, 108, 148, 0.2)"
            color="rgba(20, 108, 148, 1)"
            title="Account"
            icon="bxs:user"
            count="20"
          />
          <CounterDashboardCard
            bgColor="rgba(215, 45, 45, 0.2)"
            color="rgba(215, 45, 45, 1)"
            title="Account"
            icon="bxs:user"
            count="20"
          />
          <CounterDashboardCard
            bgColor="rgba(55, 190, 110, 0.2)"
            color="rgba(55, 190, 110, 1)"
            title="Account"
            icon="bxs:user"
            count="20"
          />
          <CounterDashboardCard
            bgColor="rgba(238, 154, 49, 0.2)"
            color="rgba(238, 154, 49, 1)"
            title="Account"
            icon="bxs:user"
            count="20"
          /> */}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
}

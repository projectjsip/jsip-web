import { SimpleGrid } from "@chakra-ui/react";
import CounterDashboardCard from "../../components/AppComponents/CounterDashboardCard";
import Layout from "../../components/AppComponents/Layout";

export default function DashboardVerifier() {
  return (
    <Layout pageName="Dashboard">
      <SimpleGrid columns={4} gap="20px">
        <CounterDashboardCard
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
        />
      </SimpleGrid>
    </Layout>
  );
}

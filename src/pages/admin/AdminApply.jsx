import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import Layout from "../../components/AppComponents/Layout";
import AllSubmission from "../../components/Apply/AllSubmission";
import NotSubmittedSubmission from "../../components/Apply/NotSubmittedSubmission";
import SubmittedSubmission from "../../components/Apply/SubmittedSubmission";

export default function AdminApply() {
  return (
    <Layout pageName="Pengajuan">
      <Tabs>
        <TabList>
          <Tab>Semua</Tab>
          <Tab>Belum Terkirim</Tab>
          <Tab>Terkirim</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AllSubmission />
          </TabPanel>
          <TabPanel>
            <NotSubmittedSubmission />
          </TabPanel>
          <TabPanel>
            <SubmittedSubmission />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}

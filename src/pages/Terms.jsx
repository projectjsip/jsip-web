import {
  Box,
  Container,
  ListItem,
  OrderedList,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import React from "react";

function Terms() {
  const terms = [
    "Siswa/siswi yang sesuai data administrasi kependudukan lahir dan bertempat tinggal di Kabupaten Jember, dibuktikan oleh KTP atau KIA",
    "Lembaga sekolah jenjang pendidikan TK, SD, & SMP di lingkungan Pemerintah Kabupaten Jember",
    "Mempunyai prestasi bidang ilmu pengetahuan dan teknologi (IPTEK) atau prestasi bidang olahraga, atau prestasi bidang seni",
    "Belum pernah mendapatkan reward prestasi dari pemerintah Kabupaten Jember saat pengajuan dilakukan",
    "Sertifikat/piagam kejuaraan prestasi hanya mendapatkan 1 (satu) kali reward prestasi",
    "Memiliki sertifikat/piagam kejuaraan yang dimenangkan (maksimal 3 sertifikat dengan prestasi tertinggi). Kejuaraan yang dimaksud adalah",
  ];

  const termsTable = [
    {
      sports: "Juara I, II, III atau Finalis kejuaraan internasional; atau",
      art: "Juara I, II, III atau Finalis kejuaraan internasional; atau",
      iptek: "Juara I, II, III atau Finalis kejuaraan internasional; atau",
    },
    {
      sports: "Juara I, II, atau III kejuaraan resmi tingkat nasional; atau",
      art: "Juara I, II, III PORSENI/ FLS2N/Festival Seni/MTQ, Pesparawi, atau lomba keagamaan sejenis tingkat nasional; atau",
      iptek:
        "Juara atau finalis lomba tingkat internasional yang diselenggarakan oleh kompetisi lomba",
    },
    {
      sports:
        "Juara Juara I, II, atau III kejuaraan resmi tingkat provinsi; atau",
      art: "Juara I atau II PORSENI/Festival Seni atau kegiatan sejenis tingkat provinsi; atau",
      iptek:
        "Juara lomba I, II, atau III tingkat provinsi, dan/atau nasional, yang diselenggarakan oleh institusi yang kredibelkredible; atau",
    },
    {
      sports:
        "Peserta kejuaraan beregu harus membuktikan kehadiran dan keikutsertaan seluruh anggota Tim pada saat lomba.",
      art: "Peserta kejuaraan beregu harus membuktikan kehadiran dan keikutsertaan seluruh anggota Tim pada saat lomba.",
      iptek:
        "Peserta kejuaraan beregu harus membuktikan kehadiran dan keikutsertaan seluruh anggota Tim pada saat lomba.",
    },
  ];
  return (
    <>
      <Container maxW="container.md" id="syarat" my="40px">
        <Stack
          direction="column"
          spacing="40px"
          alignItems="center"
          w="100%"
          px="20px"
        >
          <Text
            fontSize="24px"
            color="jsip.primary"
            fontWeight="700"
            textDecoration="underline"
          >
            Syarat Syarat
          </Text>
          <OrderedList>
            {terms.map((term) => (
              <ListItem>{term}</ListItem>
            ))}
          </OrderedList>
          <Box overflow="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Klaster Olahraga</Th>
                  <Th>Klaster Seni</Th>
                  <Th>Klaster IPTEK</Th>
                </Tr>
              </Thead>
              <Tbody>
                {termsTable.map((table) => (
                  <Tr>
                    <Td>{table.sports}</Td>
                    <Td>{table.art}</Td>
                    <Td>{table.iptek}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Stack>
      </Container>
    </>
  );
}

export default Terms;

import {
  Box,
  Center,
  Container,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import { gotoElementByIdAdjusted } from "../utils/paginationFunction";

export default function Tutorial() {
  const steps = [
    "Input data dan upload berkas calon penerima reward prestasi oleh sekolah data melalui web J-SIP",
    "Operator sekolah menerima data – data siswa/I yang telah memenuhi syarat untuk diajukan dalam rewards prestasi J-SIP yang diajukan secara kolektif (setiap Lembaga sekolah/operator wajib memverifikasi berkas agar sesuai dengan syarat – syarat yang sudah ditentukan)",
    "Login ke aplikasi/web J-SIP",
    "Upload berkas sesuai dengan fitur/menu yang telah ada",
    "Proses penerimaan berkas oleh Dinas Pendidikan Kabupaten Jember melalui sistem",
    "Verifikasi berkas oleh tim verifikator Dinas Pendidikan Kabupaten Jember",
    "Setelah proses verifikasi selesai, operator Lembaga sekolah menerima informasi terkait berkas yang diterima/ditolak",
    "Berkas yang ditolak atau tidak sesuai dengan syarat – syarat pengajuan reward prestasi tidak sah dalam proses pengajuan dan dilakukan pengembalian berkas untuk dilaksanakan verifikasi ulang. Berkas yang tidak dapat diajukan karena syarat – syarat pengajuan yang belum terpenuhi tidak dapat menerima reward",
  ];

  const requiredData = [
    {
      title: "Foto KTP/KIA",
      icon: "bxs:id-card",
    },
    {
      title: "Foto Kartu Keluarga (KK)",
      icon: "bxs:book-content",
    },
    {
      title:
        "Scan sertifikat/piagam kejuaraan sesuai dengan syarat – syarat kejuaraan (File Pdf/Word/ Picture/ Winrar Max 2 Mb)",
      icon: "bxs:award",
    },
    {
      title:
        "Foto Dokumentasi Juara (1 Buah, Max Size File 2 Mb, foto diambil yang paling jelas/tidak blur)",
      icon: "bxs:bar-chart-alt-2",
    },
    {
      title: "Buku rekening bank sesuai tahun berjalan (siswa/ortu)",
      icon: "bxs:bank",
    },
    {
      title:
        "Khusus untuk lembaga, mengupload Surat pernyataan Kepala Sekolah tentang kebenaran data syarat reward prestasi siswa yang diusulkan (Surat Pertanggungjawaban Mutlak)",
      icon: "bxs:envelope",
    },
  ];

  return (
    <>
      <Flex direction="column">
        <Container maxW="container.lg" id="tutorial" my="40px">
          <Box w="100%">
            <Stack
              direction="column"
              spacing="40px"
              alignItems="center"
              w="100%"
            >
              <Text
                fontSize="24px"
                color="jsip.primary"
                fontWeight="700"
                textDecoration="underline"
              >
                Tutorial Pengajuan
              </Text>
              <SimpleGrid columns={[1, 1, 2, 2]} gap="20px" w="100%">
                <Center>
                  <Image
                    src="/undraw_steps_re_odoy.svg"
                    w={["200px", "200px", "300px", "300px"]}
                    h={["200px", "200px", "300px", "300px"]}
                  />
                </Center>
                <Stack direction="column" spacing="8px">
                  {steps.map((step, index) => (
                    <Box boxShadow="md" p="8px">
                      <Stack spacing="8px" direction="row" alignItems="center">
                        <Box color="jsip.primary" fontSize="24px" minW="24px">
                          <Icon icon="bx:chevron-right-circle" />
                        </Box>
                        <Text fontWeight="500">
                          {step}{" "}
                          {index === 0 && (
                            <Link
                              to="#data"
                              onClick={() =>
                                gotoElementByIdAdjusted("data", 50)
                              }
                            >
                              <Text
                                as="span"
                                color="jsip.primary"
                                fontWeight="700"
                                textDecoration="underline"
                              >
                                Lihat Data yang diperlukan
                              </Text>
                            </Link>
                          )}
                        </Text>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </SimpleGrid>
            </Stack>
          </Box>
        </Container>
        <Container maxW="container.lg" my="40px" id="data">
          <Box id="data-yang-diperlukan">
            <Stack direction="column" spacing="40px" alignItems="center">
              <Text
                fontSize="24px"
                color="jsip.primary"
                fontWeight="700"
                textDecoration="underline"
              >
                Data yang Diperlukan
              </Text>
              <SimpleGrid columns={[1, 1, 2, 2]} gap="20px" w="100%">
                {requiredData.map((data, index) => (
                  <Box boxShadow="md" p="16px">
                    <Stack
                      spacing="16px"
                      direction="row"
                      alignItems="start"
                      w="100%"
                    >
                      <Box
                        borderRadius="8px"
                        color="white"
                        fontSize="28px"
                        p="10px"
                        bgColor="jsip.primary"
                      >
                        <Icon icon={data.icon} />
                      </Box>
                      <Text fontWeight="700">{data.title}</Text>
                    </Stack>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        </Container>
      </Flex>
    </>
  );
}

import { Box, Container, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function About() {
  return (
    <>
      <Container maxW="container.lg" id="about" my="40px">
        <Box>
          <Stack direction="column" spacing="40px" alignItems="center">
            <Text
              fontSize="24px"
              color="jsip.primary"
              fontWeight="700"
              textDecoration="underline"
            >
              Tentang J-SIP
            </Text>
            <Stack
              direction={["column", "column", "row", "row"]}
              alignItems={["center", "center", "start", "start"]}
              spacing="20px"
            >
              <Box boxShadow="md" borderRadius="8px" p="20px">
                <Flex direction="column" alignItems="center">
                  <Image
                    src="/jsip-logo-new.png"
                    h="200px"
                    w="200px"
                    minW="200px"
                  />
                  <Text fontWeight="700">Logo J-SIP</Text>
                </Flex>
              </Box>
              <Flex direction="column">
                <Text fontSize="18px" fontWeight="700">
                  Pengertian:
                </Text>
                <Text mb="20px">
                  J-Sistem Informasi Prestasi (J-SIP) merupakan suatu pangkalan
                  data berupa platform aplikasi digital yang mendorong
                  percepatan pendataan prestasi serta meningkatkan kualitas SDM
                  atau putra/putri daerah Kabupaten Jember. Sebagai salah satu
                  inovasi pemberian reward dan pendataan prestasi oleh Kabupaten
                  Jember di lingkup pemerintahan Kabupaten Jember.
                </Text>

                <Text fontSize="18px" fontWeight="700">
                  Latar belakang & dampak kedepan:
                </Text>
                <Text>
                  Peserta didik diharapkan akan terus berkelanjutan menorehkan
                  prestasi terbaik bagi Kabupaten Jember dengan adanya pemberian
                  rewarding dalam insentif prestasi secara terintegrasi
                  tersebut. Sebagaimana pemilihan kategori inovasi yang dipilih
                  yakni penyedia akses yang inovatif dan diharapkan memudahkan
                  masyarakat khususnya peserta didik dalam mengimplementasikan
                  penggunaan aplikasi pada platform digital yang saat berkembang
                  saat ini. Pemanfaatan era transformasi digital melalui
                  penggunaan J - Sistem Informasi Prestasi (J-SIP) juga
                  mendorong masyarakat untuk aktif memanfaatkan teknologi.
                  <br />
                  <br />
                  Masyarakat khususnya orang tua dapat mengetahui informasi
                  akurat dan pasti apabila putra/putrinya memiliki prestasi
                  gemilang di bidang Akademik maupun Non Akademik. Salah satu
                  bentuk dukungan pemerintah dan juga bentuk kolaborasi bersama
                  masyarakat untuk membangun dan merencanakan masa depan
                  gemilang bagi putra/putri yang berprestasi melalui program
                  insentif prestasi dan juga sarana pelatihan bidang prestasi
                  untuk meningkatkan skill pada bidang prestasinya masing –
                  masing.
                </Text>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

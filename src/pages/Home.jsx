import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Image,
  Link,
  ListItem,
  OrderedList,
  SimpleGrid,
  Skeleton,
  Spacer,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Show,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BannerCarousel from "../components/AppComponents/BannerCarousel/view";
import Navbar from "../components/AppComponents/Navbar";
import { fetchGetLandingPage } from "../networks/libs/landing-page";
import { Icon } from "@iconify/react";
import ModalPreviewImage from "../components/AppComponents/ModalPreviewImage";
import Footer from "../components/AppComponents/Footer";
import { fetchStatistic } from "../networks/libs/school";

export default function Home() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  // const banners = [
  //   {
  //     title: "",
  //     linkUrl:
  //       "https://www.jemberkab.go.id/wp-content/uploads/2022/09/ISIAN-WEB-PEMKAB-UTAMA.jpg",
  //     imageUrl:
  //       "https://www.jemberkab.go.id/wp-content/uploads/2022/09/ISIAN-WEB-PEMKAB-UTAMA.jpg",
  //   },
  //   {
  //     title: "",
  //     linkUrl:
  //       "https://www.jemberkab.go.id/wp-content/uploads/2022/09/ISIAN-WEB-PEMKAB-BERLIBUR.jpg",
  //     imageUrl:
  //       "https://www.jemberkab.go.id/wp-content/uploads/2022/09/ISIAN-WEB-PEMKAB-BERLIBUR.jpg",
  //   },
  // ];

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStatistic, setIsLoadingStatistic] = useState(false);
  const [banners, setbanners] = useState([]);
  const [regents, setRegents] = useState([]);
  const [galeries, setGaleries] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const getAllbanners = async () => {
    try {
      setIsLoading(true);
      const response = await fetchGetLandingPage();

      if (response.data.content) {
        setIsLoading(false);
        setbanners(response.data.content.jumbotron);
        setRegents(response.data.content.regent);
        setGaleries(response.data.content.gallery);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getStatistics = async () => {
    try {
      setIsLoadingStatistic(true);
      const response = await fetchStatistic();

      if (response.data.content) {
        setIsLoadingStatistic(false);
        const statistic = response.data.content.map((stat) => stat.total);
        setStatistics(statistic);
      } else {
        setIsLoadingStatistic(false);
      }
    } catch (error) {
      setIsLoadingStatistic(false);
    }
  };

  useEffect(() => {
    getAllbanners();
    getStatistics();
  }, []);

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

  const options = {
    responsive: true,
    color: "black",
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Statistik Data Pencairan Dana Prestasi",
        color: "black",
      },
    },
  };

  const data = {
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        label: "Dana Cair",
        data: statistics,
        fill: false,
        borderColor: "#00649A",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <Container
        id="beranda"
        maxW="container.xl"
        p={[
          "40px 0px 0px 0px",
          "40px 0px 0px 0px",
          "80px 0px 0px 0px",
          "80px 0px 0px 0px",
        ]}
      >
        <Skeleton isLoaded={!isLoading}>
          <Box>
            <BannerCarousel slides={banners} controls indicators />
          </Box>
        </Skeleton>
      </Container>

      <Stack
        direction="column"
        spacing="80px"
        alignItems="center"
        w="100%"
        mt="40px"
      >
        {/* <Text>Statistik Claim</Text> */}
        {regents ? (
          <>
            <Box bgColor="jsip.primary" w="100%" py="20px">
              <Container maxW="container.sm">
                <Stack direction="column" spacing="20px" w="100%">
                  <Box
                    alignSelf={["center", "center", "start", "start"]}
                    boxShadow="md"
                    borderRadius="8px"
                    bgColor="white"
                    w="100%"
                  >
                    <Stack direction="row" alignItems="center" pt="20px">
                      <Image
                        src={regents?.regent_profile_image}
                        name={regents?.regent_name}
                        h="200px"
                        objectFit="contain"
                        borderRadius="8px"
                      />
                      <Stack
                        p="20px"
                        direction="column"
                        spacing="16px"
                        h="100%"
                        alignItems="start"
                      >
                        <Text fontWeight="700" fontSize="18px">
                          Bupati Kab. Jember
                        </Text>
                        <Spacer />
                        <Flex direction="column">
                          <Text fontWeight="700" fontSize="18px">
                            {regents?.regent_name}
                          </Text>
                          <Divider />
                          <Text
                            fontWeight="400"
                            fontSize="16px"
                            color="jsip.grey700"
                          >
                            {regents?.period}
                          </Text>
                        </Flex>
                      </Stack>
                    </Stack>
                  </Box>

                  <Box
                    alignSelf={["center", "center", "end", "end"]}
                    boxShadow="md"
                    borderRadius="8px"
                    bgColor="white"
                    w="100%"
                    display="flex"
                    alignItems="end"
                    flexDirection="column"
                  >
                    <Stack
                      direction="row"
                      spacing="20px"
                      alignItems="center"
                      pt="20px"
                    >
                      <Stack
                        p="20px"
                        direction="column"
                        spacing="16px"
                        h="100%"
                        alignItems="end"
                      >
                        <Text fontWeight="700" fontSize="18px" textAlign="end">
                          Wakil Bupati Kab. Jember
                        </Text>
                        <Spacer />
                        <Flex direction="column" alignItems="end">
                          <Text
                            fontWeight="700"
                            fontSize="18px"
                            textAlign="end"
                          >
                            {regents?.vice_regent_name}
                          </Text>
                          <Divider />
                          <Text
                            fontWeight="400"
                            fontSize="16px"
                            color="jsip.grey700"
                          >
                            {regents?.period}
                          </Text>
                        </Flex>
                      </Stack>
                      <Image
                        src={regents?.vice_regent_profile_image}
                        h="200px"
                        objectFit="contain"
                      />
                    </Stack>
                  </Box>
                </Stack>
              </Container>
            </Box>
          </>
        ) : null}
        <Container maxW="container.lg" id="statistic">
          <Skeleton isLoaded={!isLoadingStatistic}>
            <Line options={options} data={data} />
          </Skeleton>
        </Container>
        <Container maxW="container.lg" id="tutorial">
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
                              color="jsip.primary"
                              fontWeight="700"
                              textDecoration="underline"
                              href="#data-yang-diperlukan"
                            >
                              Lihat Data yang diperlukan
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
        <Container maxW="container.lg">
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
        <Container maxW="container.md" id="syarat">
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
        <Box bgColor="jsip.primary" w="100%" py="20px">
          <Container maxW="container.lg">
            <Stack direction="column" spacing="40px" alignItems="center">
              <Text
                fontSize="24px"
                color="white"
                fontWeight="700"
                textDecoration="underline"
              >
                J-SIP Didukung Oleh
              </Text>
              <Stack
                direction={["column", "column", "row", "row"]}
                spacing="40px"
                alignItems="center"
              >
                <Box boxShadow="md" borderRadius="8px" p="20px" bgColor="white">
                  <Image src="/jsip-logo-new.png" h="100px" />
                </Box>
                <Box boxShadow="md" borderRadius="8px" p="20px" bgColor="white">
                  <Image src="/logo_dispendik_2022.png" h="100px" />
                </Box>
                <Box boxShadow="md" borderRadius="8px" p="20px" bgColor="white">
                  <Image src="/logo_kabupaten_jember.png" h="100px" />
                </Box>
              </Stack>
            </Stack>
          </Container>
        </Box>
        <Container maxW="container.lg">
          <Box>
            <Stack direction="column" spacing="40px" alignItems="center">
              <Text
                fontSize="24px"
                color="jsip.primary"
                fontWeight="700"
                textDecoration="underline"
              >
                Foto Kegiatan
              </Text>
              <Show above="md">
                <Box>
                  <BannerCarousel slides={galeries} controls indicators />
                </Box>
              </Show>

              <Show below="md">
                <Box
                  style={{
                    columnCount: galeries?.length % 2 === 0 ? 2 : 3,
                    columnGap: "10px",
                  }}
                >
                  {galeries?.map((gallery) => (
                    <Box
                      margin="0"
                      display="grid"
                      gridTemplateRows="1fr auto"
                      marginBottom="10px"
                      style={{ breakInside: "avoid" }}
                    >
                      <ModalPreviewImage imageUrl={gallery?.image_url} />
                    </Box>
                  ))}
                </Box>
              </Show>
            </Stack>
          </Box>
        </Container>
        <Container maxW="container.lg" id="about">
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
                    J-Sistem Informasi Prestasi (J-SIP) merupakan suatu
                    pangkalan data berupa platform aplikasi digital yang
                    mendorong percepatan pendataan prestasi serta meningkatkan
                    kualitas SDM atau putra/putri daerah Kabupaten Jember.
                    Sebagai salah satu inovasi pemberian reward dan pendataan
                    prestasi oleh Kabupaten Jember di lingkup pemerintahan
                    Kabupaten Jember.
                  </Text>

                  <Text fontSize="18px" fontWeight="700">
                    Latar belakang & dampak kedepan:
                  </Text>
                  <Text>
                    Peserta didik diharapkan akan terus berkelanjutan menorehkan
                    prestasi terbaik bagi Kabupaten Jember dengan adanya
                    pemberian rewarding dalam insentif prestasi secara
                    terintegrasi tersebut. Sebagaimana pemilihan kategori
                    inovasi yang dipilih yakni penyedia akses yang inovatif dan
                    diharapkan memudahkan masyarakat khususnya peserta didik
                    dalam mengimplementasikan penggunaan aplikasi pada platform
                    digital yang saat berkembang saat ini. Pemanfaatan era
                    transformasi digital melalui penggunaan J - Sistem Informasi
                    Prestasi (J-SIP) juga mendorong masyarakat untuk aktif
                    memanfaatkan teknologi.
                    <br />
                    <br />
                    Masyarakat khususnya orang tua dapat mengetahui informasi
                    akurat dan pasti apabila putra/putrinya memiliki prestasi
                    gemilang di bidang Akademik maupun Non Akademik. Salah satu
                    bentuk dukungan pemerintah dan juga bentuk kolaborasi
                    bersama masyarakat untuk membangun dan merencanakan masa
                    depan gemilang bagi putra/putri yang berprestasi melalui
                    program insentif prestasi dan juga sarana pelatihan bidang
                    prestasi untuk meningkatkan skill pada bidang prestasinya
                    masing – masing.
                  </Text>
                </Flex>
              </Stack>
            </Stack>
          </Box>
        </Container>
        <Footer />
      </Stack>
    </div>
  );
}

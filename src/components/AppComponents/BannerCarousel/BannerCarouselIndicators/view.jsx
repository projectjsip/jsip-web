import { Box, Circle, Flex } from "@chakra-ui/layout";

function BannerCarouselIndicators({ slides, currentIndex, switchIndex }) {
  return (
    <Box
      position="absolute"
      transform="translateX(-50%)"
      left="50%"
      bottom="1.5em"
      zIndex={2}
    >
      <Flex alignItems="center">
        {slides?.map((_, index) => (
          <Circle
            width="8px"
            height="8px"
            border="none"
            bgColor="white"
            opacity={currentIndex === index ? " 1" : "0.5"}
            onClick={() => switchIndex(index)}
            margin="0.2em"
            cursor="pointer"
          />
        ))}
      </Flex>
    </Box>
  );
}

export default BannerCarouselIndicators;

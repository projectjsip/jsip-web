import { Box, Image, Link } from "@chakra-ui/react";

function BannerCarouselItem({
  title,
  linkUrl,
  imageUrl,
  stopSlide,
  startSlide,
}) {
  return (
    <Box
      display="inline-block"
      width="100%"
      onMouseEnter={stopSlide}
      onMouseOut={startSlide}
    >
      <Link href={linkUrl} isExternal>
        <Image
          alt={title}
          src={imageUrl}
          height={["300px", "300px", "600px", "600px"]}
          width="100%"
          borderRadius={["0px", "0px", "8px", "8px"]}
          objectFit="cover"
        />
      </Link>
    </Box>
  );
}

export default BannerCarouselItem;

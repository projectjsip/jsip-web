import { IconButton } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

function BannerCarouselControls({ prev, next, showArrow }) {
  const [show, setshow] = useState(showArrow);
  useEffect(() => {
    setshow(showArrow);
  }, [showArrow]);

  return (
    <Box>
      <IconButton
        border="none"
        position="absolute"
        top="calc(50% - 25px)"
        bgColor="white"
        height="40px"
        width="40px"
        isRound
        transform={`translateX(${show ? "0%" : "50%"})`}
        transition="ease-out 0.3s"
        opacity={`${show ? "100%" : "0%"}`}
        boxShadow="0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)"
        left={0}
        aria-label=""
        onMouseEnter={() => setshow(true)}
        onMouseLeave={() => setshow(false)}
        icon={
          <Box
            onMouseEnter={() => setshow(true)}
            onMouseLeave={() => setshow(false)}
          >
            <Icon icon="bx:chevron-left" fontSize="24px" color="#606062" />
          </Box>
        }
        onClick={prev}
      />
      <IconButton
        border="none"
        position="absolute"
        top="calc(50% - 25px)"
        bgColor="white"
        height="40px"
        width="40px"
        isRound
        transform={`translateX(${show ? "0%" : "-50%"})`}
        transition="ease-out 0.3s"
        opacity={`${show ? "100%" : "0%"}`}
        boxShadow="0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)"
        right={0}
        aria-label=""
        onMouseEnter={() => setshow(true)}
        onMouseLeave={() => setshow(false)}
        icon={
          <Box
            onMouseEnter={() => setshow(true)}
            onMouseLeave={() => setshow(false)}
          >
            <Icon icon="bx:chevron-right" fontSize="24px" color="#606062" />
          </Box>
        }
        onClick={next}
      />
    </Box>
  );
}

export default BannerCarouselControls;

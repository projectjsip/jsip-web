import { Box } from "@chakra-ui/layout";
import { useEffect, useRef, useState } from "react";

import BannerCarouselControls from "./BannerCarouselControls/view";
import BannerCarouselIndicators from "./BannerCarouselIndicators/view";
import BannerCarouselItem from "./BannerCarouselItem/view";

function BannerCarousel({
  slides,
  interval = 5000,
  controls = false,
  indicators = false,
  autoPlay = true,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showArrow, setshowArrow] = useState(false);

  const slideInterval = useRef();

  const stopSlideTimer = () => {
    if (autoPlay && slideInterval.current) {
      setshowArrow(true);
      clearInterval(slideInterval.current);
    }
  };

  const startSlideTimer = () => {
    if (autoPlay) {
      stopSlideTimer();
      setshowArrow(false);

      // @ts-ignore
      slideInterval.current = setInterval(() => {
        setCurrentSlide((currentSlide) =>
          currentSlide < slides.length - 1 ? currentSlide + 1 : 0
        );
      }, interval);
    }
  };

  useEffect(() => {
    startSlideTimer(); // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => stopSlideTimer(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prev = () => {
    setshowArrow(true);
    startSlideTimer();
    const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    setCurrentSlide(index);
  };

  const next = () => {
    setshowArrow(true);
    startSlideTimer();
    const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    setCurrentSlide(index);
  };

  const switchIndex = (index) => {
    setshowArrow(true);
    startSlideTimer();
    setCurrentSlide(index);
  };

  return (
    <Box margin="0 auto" overflow="hidden" position="relative">
      <Box
        whiteSpace="nowrap"
        transform={`translateX(${-currentSlide * 100}%)`}
        transition="ease 1s"
      >
        {slides.map((slide, index) => (
          <BannerCarouselItem
            title={slide?.title}
            linkUrl={slide?.linkUrl}
            imageUrl={slide?.image_url}
            key={index}
            stopSlide={stopSlideTimer}
            startSlide={startSlideTimer}
          />
        ))}
      </Box>
      {indicators && (
        <BannerCarouselIndicators
          slides={slides}
          currentIndex={currentSlide}
          switchIndex={switchIndex}
        />
      )}
      {controls && (
        <Box>
          <BannerCarouselControls
            prev={prev}
            next={next}
            showArrow={showArrow}
          />
        </Box>
      )}
    </Box>
  );
}

export default BannerCarousel;

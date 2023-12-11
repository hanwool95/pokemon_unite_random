import { Swiper, SwiperSlide } from "swiper/react";
import React, { useMemo } from "react";
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";

type CarouselContainerProps = {
  children: React.ReactNode;
  styleClassName?: string;
  pagination?: boolean;
  mousewheel?: boolean;
  autoplay?: boolean;
  navigator?: boolean;
  autoplayDelay?: number;
};

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  children,
  styleClassName,
  pagination,
  mousewheel,
  autoplay,
  navigator,
  autoplayDelay,
}) => {
  const slides = useMemo(() => {
    return React.Children.map(children, (child) => (
      <SwiperSlide className={"!w-fit"}>{child}</SwiperSlide>
    ));
  }, [children]);

  const modules = useMemo(() => {
    const modules = [];
    if (pagination) modules.push(Pagination);
    if (mousewheel) modules.push(Mousewheel);
    if (autoplay) modules.push(Autoplay);
    if (navigator) modules.push(Navigation);
    return modules;
  }, [pagination, mousewheel, autoplay, navigator]);

  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={10}
      modules={modules}
      slidesPerGroup={1}
      className={styleClassName}
      navigation
      pagination
      mousewheel
      autoplay={{
        delay: autoplayDelay || 4000,
        disableOnInteraction: false,
      }}
    >
      {slides}
    </Swiper>
  );
};

export default CarouselContainer;

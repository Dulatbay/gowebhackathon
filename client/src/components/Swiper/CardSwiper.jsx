import {Navigation, Pagination, A11y, Scrollbar, Autoplay, Parallax, Controller} from 'swiper';

import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";

export const CardSwiper = ({cards}) => {
    return (
        <Swiper
            style={{
                "--swiper-navigation-color": "#000",
                "--swiper-pagination-color": "#000",
                margin: "auto"
            }}
            modules={[Navigation]}
            slidesPerView={"auto"}
            spaceBetween={40}
            navigation={true}
            centeredSlides={true}
            className="card-swiper">
            {
                cards.map((card, i) =>
                    <SwiperSlide key={i}>{card}</SwiperSlide>
                )
            }
        </Swiper>
    );
};

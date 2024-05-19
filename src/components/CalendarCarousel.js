import { Carousel } from "react-responsive-carousel";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import { IconButton } from "@mui/material";
import "components/style/CalendarCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CalendarCarousel() {
  const data = ["1", "2", "3"];

  return (
    <>
      <div className="carousel-wrapper">
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={false}
          showThumbs={false}
          useKeyboardArrows={false}
          autoPlay={false}
          stopOnHover={false}
          swipeable={true}
          dynamicHeight={false}
          emulateTouch={true}
          autoFocus={false}
          renderIndicator={false}
          selectedItem={0}
          interval={2000}
          transitionTime={350}
          swipeScrollTolerance={2}
        >
          {data.map((str, index) => {
            return <div style={{ width: "100%", height: "100%" }}>{str}</div>;
          })}
        </Carousel>
      </div>
    </>
  );
}

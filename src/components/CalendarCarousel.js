import { Carousel } from "react-responsive-carousel";
import "components/style/CalendarCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import LedgerCalendar from "./LedgerCalendar";

export default function CalendarCarousel({ initialYear, initialMonth }) {
  const initial = { year: initialYear, month: initialMonth };

  const getPrev = (current) => {
    return {
      year: current.month === 1 ? current.year - 1 : current.year,
      month: current.month === 1 ? 12 : current.month - 1,
    };
  };

  const getNext = (current) => {
    return {
      year: current.month === 12 ? current.year + 1 : current.year,
      month: current.month === 12 ? 1 : current.month + 1,
    };
  };

  const [data, setData] = useState([
    getPrev(initial),
    initial,
    getNext(initial),
  ]);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDate, setSelectedDate] = useState();
  const [touchingDate, setTouchingDate] = useState();
  const [swiping, setSwiping] = useState(false);

  const calendarBuffering = (newIdx) => {
    setSelectedMonth(newIdx);

    let tmp = [];
    const current = data[newIdx];
    const prev = getPrev(current);
    const next = getNext(current);

    if (newIdx === 0) {
      tmp = [current, next, prev];
    } else if (newIdx === 1) {
      tmp = [prev, current, next];
    } else if (newIdx === 2) {
      tmp = [next, prev, current];
    }

    setData(tmp);
  };

  return (
    <>
      <h1>{`${data[selectedMonth].year}년 ${data[selectedMonth].month}월`}</h1>
      <div className="carousel-wrapper">
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
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
          swipeScrollTolerance={50}
          onChange={(newValue) => {
            calendarBuffering(newValue);
          }}
          onSwipeMove={() => {
            setSwiping(true);
          }}
          onSwipeEnd={() => {
            setSwiping(false);
          }}
        >
          {data.map((ym, index) => {
            return (
              <div style={{ width: "100vw", height: "100%" }}>
                {
                  <LedgerCalendar
                    year={ym.year}
                    month={ym.month}
                    ledgers={[]}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    onDateTouching={setTouchingDate}
                    touchingDate={touchingDate}
                    swiping={swiping}
                  />
                }
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

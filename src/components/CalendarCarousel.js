import { Carousel } from "react-responsive-carousel";
import "components/style/CalendarCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import LedgerCalendar from "./LedgerCalendar";

export default function CalendarCarousel({
  monthlyData,
  monthBuffer,
  buffering,
  selectedMonth,
}) {
  const [selectedDate, setSelectedDate] = useState();
  const [touchingDate, setTouchingDate] = useState();
  const [swiping, setSwiping] = useState(false);

  return (
    <>
      <h1>{`${monthBuffer[selectedMonth].year}년 ${monthBuffer[selectedMonth].month}월`}</h1>
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
          selectedItem={1}
          interval={2000}
          transitionTime={350}
          swipeScrollTolerance={50}
          onChange={(newValue) => {
            buffering(newValue);
          }}
          onSwipeMove={() => {
            setSwiping(true);
          }}
          onSwipeEnd={() => {
            setSwiping(false);
          }}
        >
          {monthBuffer.map((ym, index) => {
            return (
              <div
                key={`ledger-calendar-${ym.year}-${ym.month}`}
                style={{ width: "100vw", height: "100%" }}
              >
                {
                  <LedgerCalendar
                    year={ym.year}
                    month={ym.month}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    onDateTouching={setTouchingDate}
                    touchingDate={touchingDate}
                    swiping={swiping}
                    ledgers={
                      monthlyData.year === ym.year &&
                      monthlyData.month === ym.month
                        ? monthlyData.ledgersPerDay
                        : []
                    }
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

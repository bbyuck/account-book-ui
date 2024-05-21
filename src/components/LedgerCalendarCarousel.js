import { Carousel } from "react-responsive-carousel";
import "components/style/CalendarCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import LedgerCalendar from "components/LedgerCalendar";
import LedgerCalendarHeader from "components/LedgerCalendarHeader";
import { useDispatch } from "react-redux";
import { setSelectedMonth } from "store/slice/ledgerInfo";

export default function CalendarCarousel({
  monthlyData,
  monthBuffer,
  buffering,
  selectedDate,
  onDateSelect,
}) {
  const [touchingDate, setTouchingDate] = useState();
  const [swiping, setSwiping] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      <div className="carousel-wrapper">
        <LedgerCalendarHeader
          income={monthlyData.income}
          expenditure={monthlyData.expenditure}
        />
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
            dispatch(
              setSelectedMonth({
                year: monthBuffer[newValue].year,
                month: monthBuffer[newValue].month,
              })
            );
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
                    onDateSelect={onDateSelect}
                    selectedDate={selectedDate}
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

import { Carousel } from "react-responsive-carousel";
import "components/style/CalendarCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import LedgerCalendar from "components/LedgerCalendar";
import LedgerCalendarHeader from "components/LedgerCalendarHeader";
import { getLastDayOfTheMonth } from "util/calendarUtil";

export default function CalendarCarousel({
  monthlyData,
  monthBuffer,
  buffering,
  selectedMonth,
  onMonthSelect,
  selectedDay,
  onDaySelect,
}) {
  const [touchingDate, setTouchingDate] = useState();
  const [swiping, setSwiping] = useState(false);
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
          preventMovementUntilSwipeScrollTolerance
          swipeScrollTolerance={60}
          onChange={(newValue) => {
            buffering(newValue);
            const newMonth = {
              year: monthBuffer[newValue].year,
              month: monthBuffer[newValue].month,
            };

            onMonthSelect(newMonth);

            /**
             * 24.05.22 31일 선택 후 다른 달로 변경시 1일 자동 선택
             */
            const lastDayOfNewMonth = getLastDayOfTheMonth(
              newMonth.year,
              newMonth.month
            );
            const lastDay = lastDayOfNewMonth.getDate();

            if (selectedDay > lastDay) {
              onDaySelect(1);
            }
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
                    onDaySelect={onDaySelect}
                    selectedDay={selectedDay}
                    onDateTouching={setTouchingDate}
                    touchingDate={touchingDate}
                    swiping={swiping}
                    selected={
                      ym.year === selectedMonth.year &&
                      ym.month === selectedMonth.month
                    }
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

import { Carousel } from "react-responsive-carousel";
import "components/style/CalendarCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import LedgerCalendar from "components/LedgerCalendar";
import LedgerCalendarHeader from "components/LedgerCalendarHeader";
import { getLastDayOfTheMonth } from "util/calendarUtil";

export default function LedgerCalendarCarousel({
  monthlyData,
  selectedMonth,
  onMonthSelect,
  selectedDay,
  onDaySelect,
}) {
  const [touchingDate, setTouchingDate] = useState();
  const [swiping, setSwiping] = useState(false);

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
  const [monthBuffer, setMonthBuffer] = useState([
    getPrev(selectedMonth),
    selectedMonth,
    getNext(selectedMonth),
  ]);

  const buffering = (newIdx) => {
    onMonthSelect(newIdx);

    let tmp = [];
    const current = monthBuffer[newIdx];
    const prev = getPrev(current);
    const next = getNext(current);

    if (newIdx === 0) {
      tmp = [current, next, prev];
    } else if (newIdx === 1) {
      tmp = [prev, current, next];
    } else if (newIdx === 2) {
      tmp = [next, prev, current];
    }

    setMonthBuffer(tmp);
  };

  const calendarMonthChangeHandler = (newValue) => {
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
  };

  return (
    <>
      <div className="carousel-wrapper">
        <LedgerCalendarHeader
          income={monthlyData ? monthlyData.totalIncome : 0}
          expenditure={monthlyData ? monthlyData.totalExpenditure : 0}
          save={monthlyData ? monthlyData.totalSave : 0}
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
          swipeScrollTolerance={130}
          onChange={(newValue) => calendarMonthChangeHandler(newValue)}
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
                      monthlyData &&
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

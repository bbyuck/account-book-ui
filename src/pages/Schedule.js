import CalendarCarousel from "components/CalendarCarousel";

export default function Schedule() {
  return (
    <>
      <CalendarCarousel initialYear={2024} initialMonth={4} ledgers={[]} />
    </>
  );
}

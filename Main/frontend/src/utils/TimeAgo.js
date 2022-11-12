const TimeAgo = (date) => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;

  const units = [
    {
      max: 30 * SECOND,
      divisor: 1,
      past1: "Vừa xong",
      pastN: "Vừa xong",
      future1: "Vừa xong",
      futureN: "Vừa xong",
    },
    {
      max: MINUTE,
      divisor: SECOND,
      past1: "1 giây trước",
      pastN: "# giây trước",
      future1: "trong 1 giây",
      futureN: "trong # giây",
    },
    {
      max: HOUR,
      divisor: MINUTE,
      past1: "1 phút trước",
      pastN: "# phút trước",
      future1: "trong 1 phút",
      futureN: "trong # phút",
    },
    {
      max: DAY,
      divisor: HOUR,
      past1: "1 giờ trước",
      pastN: "# giờ trước",
      future1: "trong 1 giờ",
      futureN: "trong # giờ",
    },
    {
      max: WEEK,
      divisor: DAY,
      past1: "Hôm qua",
      pastN: "# ngày trước",
      future1: "Ngày mai",
      futureN: "Trong # ngày",
    },
    {
      max: 4 * WEEK,
      divisor: WEEK,
      past1: "Tuần trước",
      pastN: "# tuần trước",
      future1: "Tuần tới",
      futureN: "Trong # tuần nữa",
    },
    {
      max: YEAR,
      divisor: MONTH,
      past1: "Tháng trước",
      pastN: "# tháng trước",
      future1: "Tháng sau",
      futureN: "Trong # tháng nữa",
    },
    {
      max: 100 * YEAR,
      divisor: YEAR,
      past1: "Năm trước",
      pastN: "# năm trước",
      future1: "Năm sau",
      futureN: "Trong # năm nữa",
    },
    {
      max: 1000 * YEAR,
      divisor: 100 * YEAR,
      past1: "Thế kỷ trước",
      pastN: "# thế kỷ trước",
      future1: "Thế kỷ sau",
      futureN: "Trong # thế kỷ nữa",
    },
    {
      max: Infinity,
      divisor: 1000 * YEAR,
      past1: "Thiên niên kỷ trước",
      pastN: "# thiên niên kỷ trước",
      future1: "Thiên niên kỷ sau",
      futureN: "Trong # thiên niên kỷ nữa",
    },
  ];

  const diff =
    Date.now() - (typeof date === "object" ? date : new Date(date)).getTime();

  const diffAbs = Math.abs(diff);

  for (const unit of units) {
    if (diffAbs < unit.max) {
      const isFuture = diff < 0;
      const x = Math.round(Math.abs(diff) / unit.divisor);
      if (x <= 1) return isFuture ? unit.future1 : unit.past1;
      return (isFuture ? unit.futureN : unit.pastN).replace("#", x);
    }
  }
};

export default TimeAgo;

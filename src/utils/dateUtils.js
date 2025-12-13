export function buildTodaySlotRange(startHour, endHour) {
  const slots = [];
  const today = new Date();

  for (let hour = startHour; hour < endHour; hour++) {
    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hour,
      0,
      0
    );

    const end = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hour + 1,
      0,
      0
    );

    slots.push({
      start,
      end,
      label: `${hour}:00 - ${hour + 1}:00`,
    });
  }

  return slots;
}

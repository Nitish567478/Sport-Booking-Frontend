export function buildTodaySlotRange(startHour, endHour) {
  const slots = [];
  const now = new Date();
  for (let h = startHour; h < endHour; h++) {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h + 1, 0, 0);
    const label = `${String(h).padStart(2, '0')}:00 - ${String(h + 1).padStart(2, '0')}:00`;
    slots.push({ start, end, label });
  }
  return slots;
}

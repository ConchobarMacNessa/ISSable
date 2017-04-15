function formatTime(time) {
  const timestamp = new Date(Number(time)).toISOString();
  const year = timestamp.slice(0, 4);
  const month = timestamp.slice(5, 7);
  const day = timestamp.slice(8, 10);
  const hours = timestamp.slice(11, 19);
  return `${day}/${month}/${year} at ${hours} UTC`;
}

module.exports = formatTime;

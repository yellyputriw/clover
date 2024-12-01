export default (timer: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timer);
  });
};

export default function delay(timer: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timer);
  });
}

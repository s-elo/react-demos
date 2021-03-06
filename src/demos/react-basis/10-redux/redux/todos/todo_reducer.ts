const initialWorks = ["sleeping", "coding", "playing"];
export default function todoReducer(
  prevState: string[] = initialWorks,
  action: any
) {
  const { type, work } = action;

  switch (type) {
    case "ADD":
      return prevState.concat(work);
    case "SUB":
      if (prevState.includes(work)) {
        return prevState.filter((job) => job !== work);
      }

      return [...prevState];
    default:
      return [...prevState];
  }
}

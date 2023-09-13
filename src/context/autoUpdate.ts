export type AutoUpdateType<T> = (this: T) => void;

export default <T, U, V>(setState: React.Dispatch<React.SetStateAction<T>>,
  initialValue: U, functions: V) => {
  const obj = {
    ...initialValue,
    ...functions,
    update(this: T) {
      setState((prev): T => ({ ...prev }));
    },
  } as T;
  setState(obj);
};

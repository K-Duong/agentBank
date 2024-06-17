import { useDispatch } from "react-redux";

export const useDispatchAction = (actionCreator) => {
  const dispatch = useDispatch();
  return (...args) => dispatch(actionCreator(...args))
}

import { useSelector } from "react-redux";


export const useSelectedAuth = useSelector(state => state.auth);

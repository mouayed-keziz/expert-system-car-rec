import { createContext, useEffect, useReducer } from "react"
import { ResultReducer } from "./result-reducer"

const INITIAL_STATE = {
    result: JSON.parse(localStorage.getItem("result")) || null,
}

export const ResultContext = createContext(INITIAL_STATE);

export const ResultContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ResultReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("result", JSON.stringify(state.result));
    }, [state.result]);

    return (
        <ResultContext.Provider value={{ result: state.result, dispatch }}>
            {children}
        </ResultContext.Provider>
    )
}
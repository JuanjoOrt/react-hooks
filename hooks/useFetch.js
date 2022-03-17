import { useEffect, useReducer } from 'react'

export default function useFetch(url, options) {

    const initialState = {
        error: undefined,
        data: undefined,
        loading: undefined
    };

    const fetchReducer = (state, action) => {
        switch (action.type) {
            case "loading":
                return { ...initialState, loading: action.payload };
            case "fetched":
                return { ...initialState, data: action.payload };
            case "error":
                return { ...initialState, error: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            dispatch({ type: "loading", payload: true });

            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error(response.statusText);

                const data = await response.json();
                dispatch({ type: "fetched", payload: data });
            } catch (error) {
                dispatch({ type: "error", payload: error });
            }
        };
        fetchData();
    }, [url]);

    return state;
}

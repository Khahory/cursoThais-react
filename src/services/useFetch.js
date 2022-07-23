import {useEffect, useRef, useState} from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url){
    const isMonted = useRef(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    //call api
    useEffect(() => {
        isMonted.current = true;
        const init = async () => {
            try {
                const response = await fetch(baseUrl + url);
                if (response.ok){
                    const json = await response.json();
                    if (isMonted.current) setData(json);
                } else {
                    throw response;
                }
            } catch (e){
                if (isMonted.current) setError(e);
            } finally {
                if (isMonted.current) setLoading(false);
            }
        }
        init();
        
        return () => {
            isMonted.current = false;
        }
    }, [url]);
    
    return {data, error, loading};
}

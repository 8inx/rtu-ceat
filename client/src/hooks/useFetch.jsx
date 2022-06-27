import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        setIsFetching(true)
        const baseUrl = `https://rtu-ceat.herokuapp.com/api/`
        axios.get(baseUrl+url)
            .then((res)=>{
                setData(res.data)
            })
            .catch((err)=>{
                setError(err)
            })
            .finally(()=>{
                setIsFetching(false)
            })
    },[url])

    return {
        data,
        isFetching,
        error
    }
}

export default useFetch;
import { useEffect, useState } from "react"
import useToken from "./useToken";

export default function useFetch (apiurl,method,objData=null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token=useToken();

    useEffect(() => {
        if (!apiurl) return;

        const fetchData = async () => {
           try{
                const options = (method == "GET")?
                {
                    method: "GET",
                    headers:{
                        'Authorization': `Bearer ${token}`,
                    }
                } :
                {
                    method:'POST',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(objData)
                }
                const response = await fetch(apiurl,options)
                if(method === "GET"){
                    if (!response.ok) throw Error("Data Not Received properly, Please Reload. ")
                    const result = await response.json()
                    setData(result);
                }else{
                    const result = await response.json()
                    setData(result);
                }
           } catch (err) {
                if(err === 'Internal Server Error, Order amount less than minimum amount allowed'){
                    setError('Select Services and duration');
                }else {
                    setError(err);
                }
           } finally{
                setLoading(false);
           }
        }
        fetchData()
    }, [apiurl,method,objData]);

    return { data, loading, error };
}


/* 

const fetchSubscription = async () => {
           try{
                const token=await getToken();
                const response = await fetch(subscriptionApi,{
                    method:"GET",
                    headers:{
                        'Authorization': `Bearer ${token}`,
                    }
                })
                if (!response.ok) throw Error("Data Not Received properly, Please Reload. ")
                const data = await response.json()
                data.map( element => {
                    if(element.status === "active"){
                        setReceivedTime(element.deletion_at)
                        setTimeDuration(element.duration)
                        setAccountId(element.account_id)
                        setUsername(element.awsid)
                        setPassword(element.password)
                        setVendorLink(element.console_login_url)
                    }
                })
           } catch (err) {
                console.warn("Error fetching subscription data:", err);
                return;
           }
        }
        fetchSubscription()
    }*/
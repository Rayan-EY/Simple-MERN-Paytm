import { useEffect,useState } from "react";
import { Appbar } from "../components/Interface"
import { Balance } from "../components/Interface"
import { Users } from "../components/Users"

import  axios  from "axios";

const getBalance=async ()=>{
    const id=localStorage.getItem("token");
    console.log(id);

    try{
    const response=await axios.get("http://localhost:3000/api/v1/account/balance", {
         params:{
            token:id
         }
    });
    console.log(response.data.balance);
        return response.data.balance;
    }catch(err){
        console.log("error");
        return 0;
    }


}
export const Dashboard = () => {
    const [balance,setBalance]=useState('')
    
    const balanceData=async ()=>{
        try{
            const balanceValue=await getBalance();
            setBalance(balanceValue);
        }catch(err){
            console.log("error in getting balance");
        }
    };
    balanceData();
   
    return <div>
        <Appbar label={"Payments App"}/>
        <div className="m-8">
            <Balance label={balance} />
            <Users />
        </div>
    </div>
}
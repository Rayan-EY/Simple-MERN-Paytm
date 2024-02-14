import { BottomWarning } from "../components/InputBoxandButtons";
import { Button } from "../components/InputBoxandButtons";
import { Heading } from "../components/heading";
import { Inputbox } from "../components/InputBoxandButtons";
import { SubHeading } from "../components/heading";
import { useState} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

export const Signin = () => {
  const [username, setUsername] = useState('');
  const [password,setPassword]=useState('');
  const [status,setStatus]=useState('')
  const navigate = useNavigate();

  const handlesignIn=async ()=>{
    try{
    const response=await axios.post("http://localhost:3000/api/v1/user/signin", {
      username,
      password
    });
    
    
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } else {
      setStatus(`Unexpected error: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        setStatus("Error 404: User not found");
      } else if (error.response.status === 411) {
        setStatus("Error 409: Invalid details");
      } else {
        setStatus(`Unexpected error: ${error.response.status}`);
      }
    } else {
      
      setStatus("Network error. Please try again later.");
    }
    
  }
  }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <Inputbox onChange={(e)=>{
          setUsername(e.target.value);
        }} placeholder="example123@gmail.com" label={"Email"} />
        <Inputbox onChange={(e)=>{
          setPassword(e.target.value)
        }}placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={handlesignIn} label={"Sign in"} />
        </div>
        {status &&(
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Status: {status}
         </label>)
         }
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}
import { Button, Inputbox } from "./InputBoxandButtons"
import { Heading, SubHeading } from "./heading"
import { BottomWarning } from "./InputBoxandButtons"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup=()=>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status,setStatus]=useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
          username,
          firstName,
          lastName,
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
            setStatus("Error 404: User already exists");
          } else if (error.response.status === 409) {
            setStatus("Error 409: Invalid details");
          } else {
            setStatus(`Unexpected error: ${error.response.status}`);
          }
        } else {
          
          setStatus("Network error. Please try again later.");
        }
      }
    };
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
           <div className="flex flex-col justify-center">
             <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"SignUp"}/>
        <SubHeading label={"Enter your information to create an account"} />
        <Inputbox onChange={(e)=>{
          console.log(e.target.value);
            setFirstName(e.target.value);
        }} label={"First Name"} placeholder={"Rayan"} />
        <Inputbox onChange={e => {
          setLastName(e.target.value);
        }} label={"Last Name"} placeholder={"Ahmed"} />
        <Inputbox onChange={(e)=>{
          setUsername(e.target.value);
        }} label={"Email"} placeholder={"example123@gmail.com"} />
        <Inputbox  onChange={(e) => {
          setPassword(e.target.value);
        }} label={"Password"} placeholder={"123456"} />
        <Button onClick={handleSignup} label={"Sign Up"} />

        {status &&(
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Status: {status}
         </label>)
         }
        
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
        </div>
        </div>
    )
}



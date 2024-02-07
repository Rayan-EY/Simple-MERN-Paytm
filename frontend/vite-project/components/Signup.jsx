import { Button, Inputbox } from "./InputBoxandButtons"
import { Heading, SubHeading } from "./heading"

export const Signup=()=>{
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
           <div className="flex flex-col justify-center">
             <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"SignUp"}/>
        <SubHeading label={"Enter your information to create an account"} />
        <Inputbox label={"First Name"} placeholder={"Rayan"} />
        <Inputbox label={"Last Name"} placeholder={"Ahmed"} />
        <Inputbox label={"Email"} placeholder={"example123@gmail.com"} />
        <Inputbox label={"Password"} placeholder={"123456"} />
        <Button label={"Sign Up"} />
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
        </div>
        </div>
    )
}
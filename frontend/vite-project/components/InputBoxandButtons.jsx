import { Link } from "react-router-dom"

export function Inputbox({label,placeholder}){
    return (
        <div>
            <h1 className="text-sm font-medium text-left py-2">{label}</h1>
            <input type="text" placeholder={placeholder}></input>
        </div>
    )


}

export function Button({label,onClick}){
    return (
        <div>
            <button onClick={onClick} className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
        </div>
    )
}

import { Link } from "react-router-dom"

export function BottomWarning({label, buttonText, to}) {
    return <div className="py-2 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
}
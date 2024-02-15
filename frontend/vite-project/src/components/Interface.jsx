export function Appbar({label})
{
    return (
        <div className="flex justify-between shadow h-14">
            <div className="flex flex-col justify-center h-full ml-4 font-bold">
            {label}
            </div>   
            <div className="flex">        
            <div className="flex flex-col justify-center h-full mr-4 font-semiboldrayan ahmed">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
        </div>
    )
}

export function Balance({label}){
    return (
        <div className="flex">
            <div className="font-bold text-lg">
                Your Balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                ₹ {label}
            </div>       
        </div>
    )
}




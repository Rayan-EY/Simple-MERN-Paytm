export function Heading({label}){
    return (
        <div className="font-bold text-4xl pt-6">
            {label}
        </div>
    )

}
export function SubHeading({label}){
    return <div className="text-slate-500 text-md pt-1 px-4 pb-4">
        {label}
        
    </div>
}
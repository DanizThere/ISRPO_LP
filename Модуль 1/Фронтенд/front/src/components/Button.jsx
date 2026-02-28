export default function Button({isActive = true, onClick, children, className}){
    return(
        <>
            <button className={`btn ${isActive} ${className}`} onClick={onClick}>
                {children}
            </button>
        </>
    )
}
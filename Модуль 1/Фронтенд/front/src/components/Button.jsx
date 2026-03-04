export default function Button({isActive = true, onClick, children, className, type}){
    return(
        <>
            <button className={`btn ${isActive} ${className}`} onClick={onClick} type={type}>
                {children}
            </button>
        </>
    )
}
// Header Componnets based on function approach

const Header=(props:any)=>{
    return(
        <>
        <header>
            <h1>{props.title}</h1>
            <h2>{props.msg}</h2>
        </header>
        
        </>
    )

}
export default Header;
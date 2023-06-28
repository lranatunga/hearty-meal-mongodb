import Navbar from "../Components/NavBar"

export default function MainLayout({children}) {
    return(
        <div className="main">
             <Navbar/>
            
            <div className="content">{children}</div>
        </div>            
        
    )
}
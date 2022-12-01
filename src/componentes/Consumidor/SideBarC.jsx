import React from 'react'
import {SidebarDatosC} from './SideBarDatosC'
import "../../estilos/Sidebar.css"

const SidebarC = () => {
    return (
            <div id="side">
                    <ul className='listaSidebar'>
                    {
                        SidebarDatosC.map((item, index)=>{
                            return(
                                <li key={index} className = "row" id={window.location.pathname == item.path ? "active" : ""}
                                 onClick={() => {
                                    window.location.pathname = item.path;
                                }}>
                                    <div>
                                        <span>{item.title}</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
    )
}

export default SidebarC;

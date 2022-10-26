import React from 'react'
import {Sidebardatos} from './Sidebardatos'
import "../estilos/Sidebar.css"

const Sidebar = () => {
    return (
                <div className='Sidebar'>
                    <ul className='listaSidebar'>
                    {
                        Sidebardatos.map((item, index)=>{
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

export default Sidebar;
import React from 'react'
import styled from 'styled-components'
import { FaHome, FaPlus } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FcApproval } from "react-icons/fc";
import { Link } from 'react-router-dom';

const SidemenuTabHead = styled.div`
display: flex;
justify-content: center;
align-items: center;
border: 1px solid #f6e6e6;
height: 6vh;
gap: 8px;
/* background: white; */

.link_style{
    color: white;
}
    
`

const Datas = [
    {
        name:"Home",
        key:1,
        path:'/',
        // icon:<FaHome fontSize={20} />,

    },
    {
        name:"New Task",
        key:2,
        path:'/newtask'
        // icon:<FaPlus fontSize={20} />
        
    },
    {
        name:"Important",
        key:3,
        path:'/importanttask'
        // icon:<CiStar fontSize={20} />
        
    },
    {
        name:"Completed",
        key:4,
        path:'/taskcompleted'
        // icon:<FcApproval fontSize={20} />
        
    },
    {
        name:"Deadline",
        key:5,
        path:'/deadline'
        // icon:<FcApproval fontSize={20} />
        
    }
]

const SideMenuTab = () => {
  return (
    <>
    {Datas.map((item,index) => (
    <SidemenuTabHead key={index}>
         <Link to={item.path} className='link_style'>
         {item.icon}{item.name}
         </Link>
        </SidemenuTabHead>

    ))}
    </>
  )
}

export default SideMenuTab
import React from 'react'
import {styled} from 'styled-components'
import SideMenuTab from './SideMenuTab'
import { useTheme } from '../../../ThemeProvider/ThemeProvider'

const SidemenuHead = styled.div`
    width: 100%;
    height: 80vh;
    background: ${({isDarkMode}) => (isDarkMode ? "#333" : "#333") };
    /* background: #a3c5f4; */

    @media screen and (max-width:768px)  {
      height: 36vh;

      
    }
    /* border: 1px solid #f6e6e6; */

`

const SideMenu = () => {

  const { isDarkMode } = useTheme();

  return (
    <SidemenuHead isDarkMode={isDarkMode}>
      <SideMenuTab />
    </SidemenuHead>
  )
}

export default SideMenu
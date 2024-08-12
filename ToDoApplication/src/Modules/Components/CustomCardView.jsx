import styled from "styled-components";

const CustomCard = styled.div`
    background: #ffffff;
    box-shadow: 4px 4px 20px 0px #0000001F;
    /* margin:auto; */
    max-width:${props => props.width || '100%'};
    /* padding:25px; */
    border-radius:10px;
`

const CustomCardView = ({ children, width, style }) => {
    
    return (
        <CustomCard width={width} style={style}>
            {children}
        </CustomCard>
    )
}

export default CustomCardView
import styled from 'styled-components';

export const StyleButton = styled.button`
     position: fixed;
    bottom: 50%;
    right: 50%;
    z-index:11111;
    padding: 15px 30px;
    font-size: 18px;
    border: none;
    background-color:rgba(111, 221, 219, 0.75);
    color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color:rgba(31, 230, 226, 0.75);
    }
`;

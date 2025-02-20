import { StyleButton } from './Button.style';

const Button = ({text, onClick}) => {
    return (
        <StyleButton onClick={onClick}>{text}</StyleButton>
    );
};

export default Button;

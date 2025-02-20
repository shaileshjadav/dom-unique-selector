import { HoverStyle } from './Hover.style';

const Hover = (props) => {
    return (
        <HoverStyle>
            <div
                className={`hover-wrapper ${props.isoutOfBody ? 'bottom' : ''}`}
                style={{
                    height: props.height,
                    width: props.width,
                    top: props.top + window.scrollY,
                    left: props.left + window.scrollX,
                    pointerEvents: 'none',
                }}
            >
                <div className="hover-div" style={{ top: props.top - 40, left: props.left }}>
                    <b>{props.hoverSelector}</b>
                </div>
                
            </div>
        </HoverStyle>
    );
};

export default Hover;

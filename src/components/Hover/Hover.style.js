import styled from 'styled-components';

export const HoverStyle = styled.div`
    .hover-div {
        position: fixed;
        pointer-events: none;
        background-color: #000;
        border-radius: 3px;
        box-shadow: rgb(0 0 0 / 25%) 0px 0px 12px;
        opacity: 0.85;
        color: rgba(255, 255, 255, 0.7);
        font-size: 11px;
        padding: 10px 12px;
        font-family: inherit;
        z-index: 999;
        white-space: nowrap;
    }

    .hover-wrapper {
        pointer-events: none;
    }

    .selector_highlight {
        background: rgba(111, 221, 219, 0.75) !important;
        z-index: 99999;
    }

    .hover-wrapper {
        background: rgba(111, 221, 219, 0.75) !important;
        position: absolute;
        z-index: 9999;
        border: 2px solid rgba(92, 185, 184, 0.75) !important;
        box-sizing: border-box;
    }

    .hover-wrapper.bottom .hover-div {
        top: 60px !important;
    }
`;

import * as React from 'react';
import { Dot, DotProps } from 'recharts';

interface CustomDotProps extends DotProps {
    onHover(): void
    offHover(): void
    onClick(): void
}

const CustomDot: React.StatelessComponent<CustomDotProps> = (props) => {
    const { onHover, offHover, onClick, ...dotProps } = props;
    return (
        <Dot {...dotProps} onMouseEnter={onHover} onMouseLeave={offHover} onClick={onClick}/>
    );
};

export default CustomDot;
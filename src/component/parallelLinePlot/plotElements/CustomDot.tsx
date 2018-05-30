import * as React from 'react';
import { Dot, DotProps } from 'recharts';

interface CustomDotProps extends DotProps {
    onHover(): void
    offHover(): void
}

const CustomDot: React.StatelessComponent<CustomDotProps> = (props) => {
    const { onHover, offHover, ...dotProps } = props;
    return (
        <Dot {...dotProps} onMouseEnter={onHover} onMouseLeave={offHover} />
    );
};

export default CustomDot;
import * as React from 'react'
import { ReactNode } from 'react';

interface WizardProps {
    header: ReactNode
    footer: ReactNode
    children: ReactNode
}

const StepLayout: React.StatelessComponent<WizardProps> = ({children, header, footer}) => {
    // const elements = React.Children.toArray(children);
    const elementClasses = ['introText', 'mainWizardStep', 'footerContainer'];

    if (elementClasses && elementClasses.length !== 3) {
        throw new Error('Not allowed');
    }

    // const test = React.cloneElement(elements.header, {active: true})

    return (
        <div>
            <div className={'introText'}>
                {header}
            </div>

            {children}

            <div className={'footerContainer'}>
                {footer}
            </div>

        </div>
    );
};

export default StepLayout;

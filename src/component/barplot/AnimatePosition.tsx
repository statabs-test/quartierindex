import React from 'react'
import { Spring, SpringProps, config } from 'react-spring'

type Props = {} & SpringProps

const AnimatePosition: React.SFC<Props> = ({ children, ...rest }) => {
  return (
    <Spring config={{ ...config.gentle, precision: 0.5, velocity: 80 }} {...rest}>
      {children}
    </Spring>
  )
}

export default AnimatePosition

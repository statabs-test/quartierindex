import welcomeImage from '../assets/welcome.jpg';
import * as React from 'react';

export const welcome: React.SFC<string> = (text: string) =>
  (<div>
    <h1 className="welcome-title"> Finden Sie Ihr Lieblingswohnviertel </h1>
    {text}
    <img className="welcome-img" src={welcomeImage}/>
  </div>)
;
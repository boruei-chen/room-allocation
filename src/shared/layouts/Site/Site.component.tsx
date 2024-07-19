import React from 'react';
import { Props } from './Site.types';

const Site: React.FC<Props> = (props) => (
  <main>
    {props.children}
  </main>
);

export default Site;

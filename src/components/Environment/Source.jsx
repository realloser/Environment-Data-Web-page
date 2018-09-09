import React from 'react';
import { observer } from 'mobx-react';

import SourceNodes from './SourceNodes.jsx';

@observer
class Source extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const { sourceName, display_name } = this.props.source;
      return (
         <li key={sourceName} style={{ display: 'block' }}>
            <div className='title nodes'>
               <h4>{ display_name }</h4>
            </div>
            <div className='nodes'>
               <SourceNodes source={this.props.source} />
            </div>
         </li>
      )
   }
}

export default Source;
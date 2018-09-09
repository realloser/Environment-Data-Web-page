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
         <div className='source entry' key={sourceName}>
            <div className='source title'>
               <h4>{ display_name }</h4>
            </div>
            <div className='source node container'>
               <SourceNodes source={this.props.source} />
            </div>
         </div>
      )
   }
}

export default Source;
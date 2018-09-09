import React from 'react';
import { observer } from 'mobx-react';

@observer
class Source extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const { source, display_name } = this.props.source;
      return (
         <li key={source} style={{ display: 'block' }}>
            <div className='title nodes'>
               <h4>{ display_name }</h4>
            </div>
         </li>
      )
   }
}

export default Source;
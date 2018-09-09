import React from 'react';
import { observer } from 'mobx-react';

@observer
class Source extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <li key={this.props.source.source}>
            {this.props.source.display_name}
         </li>
      )
   }
}

export default Source;
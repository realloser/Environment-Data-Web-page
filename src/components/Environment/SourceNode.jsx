import React from 'react';

const SourceNode = function (props) {

      const { node, display_name } = props.node;

      return (
            <li key={node}>
                  <span className="section-header">Node: {display_name}</span>
            </li>
      )
}


export default SourceNode
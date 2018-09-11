import React from 'react';

const SourceNode = function (props) {

      const { node, display_name } = props.node;

      return (
                  <span className="node title">Node: {display_name}</span>
      )
}


export default SourceNode
import React from 'react';
import { observer } from 'mobx-react';

import SourceNode from './SourceNode.jsx';
import SourceNodeTop from './SourceNodeTop.jsx';

@observer
class SourceNodes extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  nodes: [],
                  fetchState: 'initialized',
            }
      }
      componentDidMount() {
            this.setState({ fetchState: 'fetching' });
            const nodesUrl = this.props.source.relations.nodes.href;
            fetch(nodesUrl)
                  .then((response) => {
                        if (response.ok) {
                              return response.json();
                        }
                        throw new Error('Network response was not ok.');
                  })
                  .then(json => {
                        this.setState({ nodes: json.data[0].nodes, fetchState: 'done' })
                  })
                  .catch(e => {
                        this.setState({ fetchState: 'failed', error: e });
                  });
      }

      render() {
            const { nodes, fetchState, error } = this.state;

            const renderNode = (node) => {
                  return (
                        <div className='node item' key={node.node}>
                              <SourceNode node={node} />
                              <SourceNodeTop node={node} />
                        </div>)
            }

            switch (fetchState) {
                  case 'initialized':
                        return <div><span>initialized.</span></div>
                  case 'fetching':
                        return <div><span>Fetching nodes...</span></div>
                  case 'failed':
                        return (
                              <div>
                                    <span className='error'>Failed to fetch the nodes:</span>
                                    <span className='errorDetails'>{error.toString()}</span>
                              </div>
                        )
                  case 'done':
                        return (
                              <div className='source items'>
                                    <span className="source title">{nodes.length} Nodes</span>
                                    <div className='nodes container'>{nodes.map((node) => renderNode(node))}</div>
                              </div>
                        )
                  default:
                        console.error('invalid state:', fetchState)
                        return (
                              <div>
                                    <span className='error'>Implementation error</span>
                                    <span className='errorDetails'>unknown state</span>
                              </div >
                        )

            }

      }
}

export default SourceNodes
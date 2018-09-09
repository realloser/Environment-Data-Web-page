import React from 'react';
import { observer } from 'mobx-react';

import SourceNode from './SourceNode.jsx';

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
                  return <SourceNode node={node} />
            }

            switch (fetchState) {
                  case 'initialized':
                        return <span>initialized.</span>
                  case 'fetching':
                        return <span>Fetching nodes...</span>
                  case 'failed':
                        return (
                              <div>
                                    <span className={'error'}>Failed to fetch the data:</span>
                                    <span className={'errorDetails'}>error</span>
                              </div>
                        )
                  case 'done':
                        return (
                              <div>
                                    <span className="section-header">{nodes.length} Nodes</span>
                                    <ul>{nodes.map((node) => renderNode(node))}</ul>
                              </div>
                        )
                  default:
                        console.error('invalid state:', fetchState)
                        return (
                              <div>
                                    <span className={'error'}>Implementation error</span>
                                    <span className={'errorDetails'}>unknown state</span>
                              </div >
                        )

            }

      }
}

export default SourceNodes
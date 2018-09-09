import React from 'react';
import { observer } from 'mobx-react';

import SourceNodeEntry from './SourceNodeEntry.jsx';

@observer
class SourceNodeTop extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  top: {},
                  fetchState: 'initialized',
            }
      }
      componentDidMount() {
            this.setState({ fetchState: 'fetching' });
            const nodesUrl = this.props.node.relations.top.href;
            fetch(nodesUrl)
                  .then((response) => {
                        if (response.ok) {
                              return response.json();
                        }
                        throw new Error('Network response was not ok.');
                  })
                  .then(json => {
                        this.setState({ top: json.data, fetchState: 'done' })
                  })
                  .catch(e => {
                        this.setState({ fetchState: 'failed', error: e });
                  });
      }

      render() {
            const { top, fetchState, error } = this.state;

            switch (fetchState) {
                  case 'initialized':
                        return <div><span>initialized.</span></div>
                  case 'fetching':
                        return <div><span>Fetching top data...</span></div>
                  case 'failed':
                        return (
                              <div>
                                    <span className='error'>Failed to fetch the latest data:</span>
                                    <span className='errorDetails'>{error.toString()}</span>
                              </div>
                        )
                  case 'done':
                        return (
                              <div>
                                    <SourceNodeEntry entry={top} />
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

export default SourceNodeTop
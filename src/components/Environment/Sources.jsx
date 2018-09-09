import React from 'react';
import { observer } from 'mobx-react';

import Source from './Source.jsx';

@observer
class Sources extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  sources: [],
                  fetchState: 'initialized',
            }
      }
      componentDidMount() {
            this.setState({ fetchState: 'fetching' });
            fetch('https://zjpehz8xi5.execute-api.eu-west-1.amazonaws.com/V1/sources')
                  .then((response) => {
                        if (response.ok) {
                              return response.json();
                        }
                        throw new Error('Network response was not ok.');
                  })
                  .then(json => {
                        this.setState({ sources: json.data, fetchState: 'done' })
                  })
                  .catch(e => {
                        this.setState({ fetchState: 'failed', error: e });
                  });
      }

      render() {
            const { sources, fetchState, error } = this.state;

            switch (fetchState) {
                  case 'initialized':
                        return <span>Ui initialized.</span>
                  case 'fetching':
                        return <span>Fetching sources...</span>
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
                                    <span className="section-header">{sources.length} Sources</span>
                                    <ul>{sources.map((source) => <Source source={source} />)}</ul>
                              </div>
                        )
                  default:
                        console.error('invalid state:', fetchState)

            }

      }
}

export default Sources

// https://zjpehz8xi5.execute-api.eu-west-1.amazonaws.com/V1/sources/M18_Environment/nodes/FA24C2A3

// https://zjpehz8xi5.execute-api.eu-west-1.amazonaws.com/V1/sources/M18_Environment/nodes/B9FC4586

import adapter from 'mobx-rest-fetch-adapter';
import { apiClient, Collection } from 'mobx-rest';
import SourceStore from './SourceStore.js';

const apiPath = 'https://zjpehz8xi5.execute-api.eu-west-1.amazonaws.com/V1';

// We will use the adapter to make the `xhr` calls
apiClient(adapter, { apiPath })


class SourcesStore extends Collection {
  url ()  { return `/sources` }
  model () { return SourceStore }
}

// We instantiate the collection and export it as a singleton
export default new SourcesStore()
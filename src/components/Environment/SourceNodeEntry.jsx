import React from 'react';
import ReactTable  from 'react-table';

import moment from 'moment';

const SourceNodeEntry = function (props) {
      const { entry } = props;

      const reactTableSettings = {
            showPagination: false,
            minRows: 0
      };
      const columns = [{
            Header: 'Value',
            accessor: 'value', // String-based value accessors!
            maxWidth: 200,
            style: {textAlign: 'right'}
      },
      {
            Header: '',
            accessor: 'unit',
            maxWidth: 100,
      }];

      const mapping = [
            { key: 'primary_temperature', sortIndex: 2, displayName: 'Humidity Temperature', unit: '°C' },
            { key: 'secondary_temperature', sortIndex: 6, displayName: 'Barometer Temperature', unit: '°C' },
            { key: 'humidity', sortIndex: 3, displayName: 'Humidity', unit: '%' },
            { key: 'batt', sortIndex: 7, displayName: 'Battery', unit: 'V' },
            { key: 'light_intensity', sortIndex: 5, displayName: 'Lightindensity', unit: 'bit' },
            { key: 'pressure', sortIndex: 4, displayName: 'Pressure', unit: 'Pa' },
            { key: 'timeStamp', sortIndex: 1, displayName: 'Time', unit: '', convert: (value) => moment(new Date(value)).format('llll') },
      ]
      const data = [];
      for (let key in entry){
            const map = mapping.find(m => m.key===key);
            const value = entry[map.key];
            if (!Boolean(value) || value === -1) {
                  continue;
            }
            const convertedValue = map.convert && map.convert(value) || value;
            const formattedValue = convertedValue.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2 });
            const rowEntry = Object.assign({value: formattedValue}, map)
            data.push(rowEntry);
      }

      data.sort((a, b) => a.sortIndex-b.sortIndex);

      return (
            <div className='node item'>
                  <ReactTable
                        data={data}
                        columns={columns}
                        {...reactTableSettings}
                  />
            </div>
      )
}

export default SourceNodeEntry
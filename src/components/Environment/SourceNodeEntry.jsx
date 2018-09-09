import React from 'react';
import ReactTable  from 'react-table';

import moment from 'moment';

const SourceNodeEntry = function (props) {
      const { entry } = props;

      const reactTableSettings = {
            showPagination: false,
            minRows: 0
      };
      const columns = [
      {
            Header: '',
            accessor: 'displayName',
            maxWidth: 300,
      },
      {
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
            { key: 'primary_temperature', sortIndex: 2, displayName: 'Humidity Temperature', format: true, unit: '°C' },
            { key: 'secondary_temperature', sortIndex: 6, displayName: 'Barometer Temperature', format: true, unit: '°C' },
            { key: 'humidity', sortIndex: 3, displayName: 'Humidity', format: true, unit: '%' },
            { key: 'batt', sortIndex: 7, displayName: 'Battery', format: true, unit: 'V' },
            { key: 'light_intensity', sortIndex: 5, displayName: 'Lightintensity', format: false, unit: 'bit' },
            { key: 'pressure', sortIndex: 4, displayName: 'Pressure', format: true, unit: 'hPa', convert: (value, props) => value < 11000 && value || value / 100 }, // value from BPM280 is not converted to hPa
            { key: 'timeStamp', sortIndex: 1, displayName: 'Time', format: 'llll', unit: '', convert: (value, props) => moment(new Date(value)).format(props.format || 'llll') },
      ]
      const data = [];
      for (let key in entry){
            const map = mapping.find(m => m.key===key);
            const value = entry[map.key];
            if (value === null && value === undefined || value === -1) {
                  continue;
            }
            const convertedValue = map.convert && map.convert(value, map) || value;
            const formattedValue = map.format ? convertedValue.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2 }) : convertedValue;
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
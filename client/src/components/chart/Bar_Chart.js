import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  Label,
  // Legend,
  CartesianGrid,
} from 'recharts';

function compare(a, b) {
  if (a.total < b.total) {
    return -1;
  }
  if (a.total > b.total) {
    return 1;
  }
  return 0;
}

const sortedData = (oldData) => {
  if (oldData) {
    return oldData.sort(compare);
  } else {
    return [];
  }
};

const colors = [
  '#8884d8',
  '#65CEC7',
  '#F67D7D',
  '#F7B739',
  '#90D4F4',
  '#B65353',
  '#F3ACAD',
  '#418551',
];

const Bar_Chart = ({ data }) => {
  return (
    <>
      {/* {data && data[0] ? console.log(typeof data[0].total) : null} */}
      {data ? (
        <>
          <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            Total Number of Pins for Each Type
          </h3>
          <BarChart
            margin={{ bottom: 25 }}
            width={600}
            height={325}
            data={sortedData(data)}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='type'
              label={{
                value: 'Types',
                position: 'bottom',
              }}
            ></XAxis>
            <YAxis
              // label={<CustomLabel word='Number of Pins' />}
              label={{
                value: 'Number of Pins',
                position: 'center',
                angle: -90,
                dy: -10,
              }}
            />
            <Tooltip />
            <Bar dataKey='total' fill='#8884d8'>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${entry}`}
                  fill={colors[index % colors.length]}
                  onClick={() => console.log('ellooo')}
                />
              ))}
            </Bar>
          </BarChart>
        </>
      ) : null}
    </>
  );
};

export default Bar_Chart;

const CustomLabel = ({ word }) => {
  return <p>{word}</p>;
};

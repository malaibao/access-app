import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
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

const index = ({ data }) => {
  return (
    <>
      {data ? console.log(typeof data[0].total) : null}
      {data ? (
        <BarChart width={800} height={500} data={sortedData(data)}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='type' />
          {/* <YAxis /> */}
          <Tooltip />
          <Legend />
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
      ) : null}
    </>
  );
};

export default index;

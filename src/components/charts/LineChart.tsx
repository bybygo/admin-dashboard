import React from 'react';

import {
  AxisModel,
  ChartComponent,
  ChartRangePadding,
  DateTime,
  Inject,
  Legend,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  ValueType,
} from '@syncfusion/ej2-react-charts';

import { useStateContext } from '@/contexts/ContextProvide';

interface DataPoint {
  x: Date;
  y: number;
}

const generateTrendData = (
  startYear: number,
  years: number,
  baseValue: number,
  volatility: number,
): DataPoint[] => {
  const data: DataPoint[] = [];
  let currentValue = baseValue;

  for (let i = 0; i < years * 12; i++) {
    const randomChange = (Math.random() - 0.5) * volatility;
    const trendChange = Math.sin((i / 12) * Math.PI) * (volatility / 2); // Seasonal trend
    currentValue = Math.max(0, currentValue + randomChange + trendChange);

    data.push({
      x: new Date(startYear, i, 1),
      y: Number(currentValue.toFixed(1)),
    });
  }
  return data;
};

const LinePrimaryXAxis: AxisModel = {
  valueType: 'DateTime' as ValueType,
  labelFormat: 'MMM yyyy',
  intervalType: 'Months',
  edgeLabelPlacement: 'Shift',
  majorGridLines: { width: 0 },
  minimum: new Date(2020, 0, 1),
  maximum: new Date(2024, 11, 31),
};

const LinePrimaryYAxis: AxisModel = {
  labelFormat: '{value}%',
  rangePadding: 'None' as ChartRangePadding,
  minimum: 0,
  maximum: 100,
  interval: 10,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

const lineCustomSeries = [
  {
    dataSource: generateTrendData(2020, 5, 45, 4),
    xName: 'x',
    yName: 'y',
    name: 'North America',
    width: 2,
    marker: { visible: true, width: 8, height: 8, shape: 'Circle' },
    type: 'Line',
  },
  {
    dataSource: generateTrendData(2020, 5, 35, 3),
    xName: 'x',
    yName: 'y',
    name: 'Europe',
    width: 2,
    marker: { visible: true, width: 8, height: 8, shape: 'Diamond' },
    type: 'Line',
  },
  {
    dataSource: generateTrendData(2020, 5, 25, 5),
    xName: 'x',
    yName: 'y',
    name: 'Asia Pacific',
    width: 2,
    marker: { visible: true, width: 8, height: 8, shape: 'Triangle' },
    type: 'Line',
  },
];

const LineChart = () => {
  const { currentMode } = useStateContext();

  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true, format: '${series.name} : ${point.y}%' }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{
        background: 'white',
        position: 'Top',
        padding: 20,
        shapeHeight: 12,
        shapeWidth: 12,
      }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {lineCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;

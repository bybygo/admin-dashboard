import React from 'react';

import {
  AxisModel,
  Category,
  ChartComponent,
  DataLabel,
  Inject,
  Legend,
  SeriesCollectionDirective,
  SeriesDirective,
  StackingColumnSeries,
  Tooltip,
  ValueType,
} from '@syncfusion/ej2-react-charts';

import { useStateContext } from '@/contexts/ContextProvide';

interface StackedProps {
  currentMode: string;
  width: string;
  height: string;
}

interface DataPoint {
  x: string;
  y: number;
}

const generateMonthlyData = (
  months: string[],
  baseValue: number,
  variance: number,
): DataPoint[] => {
  return months.map((month) => ({
    x: month,
    y: Math.round(baseValue + (Math.random() - 0.5) * variance),
  }));
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const stackedPrimaryXAxis: AxisModel = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category' as ValueType,
};

const stackedPrimaryYAxis: AxisModel = {
  lineStyle: { width: 0 },
  minimum: 0,
  maximum: 300,
  interval: 50,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '${value}K',
};

const stackedCustomSeries = [
  {
    dataSource: generateMonthlyData(months, 150, 40),
    xName: 'x',
    yName: 'y',
    name: 'Product Revenue',
    type: 'StackingColumn',
    background: '#4B0082',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: generateMonthlyData(months, 80, 30),
    xName: 'x',
    yName: 'y',
    name: 'Service Revenue',
    type: 'StackingColumn',
    background: '#1E90FF',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
  {
    dataSource: generateMonthlyData(months, 70, 20),
    xName: 'x',
    yName: 'y',
    name: 'Subscription Revenue',
    type: 'StackingColumn',
    background: '#32CD32',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  },
];

const Stacked: React.FC<StackedProps> = ({ width, height }) => {
  const { currentMode } = useStateContext();

  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true, format: '${series.name}: ${point.y}K' }}
      legendSettings={{
        background: 'white',
        position: 'Top',
        padding: 20,
        shapeHeight: 12,
        shapeWidth: 12,
      }}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip, DataLabel]} />
      <SeriesCollectionDirective>
        {stackedCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;

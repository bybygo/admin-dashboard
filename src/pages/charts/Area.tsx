import React from 'react';

import {
  AxisModel,
  ChartComponent,
  DateTime,
  Inject,
  Legend,
  SeriesCollectionDirective,
  SeriesDirective,
  SplineAreaSeries,
  Tooltip,
  ValueType,
} from '@syncfusion/ej2-react-charts';

import { ChartsHeader } from '@/components';
import { useStateContext } from '@/contexts/ContextProvide';

interface DataPoint {
  x: Date;
  y: number;
}

const generateInflationData = (
  startYear: number,
  years: number,
  baseRate: number,
  volatility: number,
): DataPoint[] => {
  const data: DataPoint[] = [];
  let currentRate = baseRate;

  for (let i = 0; i < years * 12; i++) {
    // Add randomness
    const randomFactor = (Math.random() - 0.5) * volatility;

    // Add seasonal variation (higher in summer, lower in winter)
    const seasonalFactor = Math.sin(((i % 12) / 11) * Math.PI) * (volatility / 3);

    // Add long-term trend (slight upward)
    const trendFactor = (i / (years * 12)) * (volatility / 2);

    currentRate = Math.max(0, currentRate + randomFactor + seasonalFactor + trendFactor);

    data.push({
      x: new Date(startYear, i, 1),
      y: Number(currentRate.toFixed(2)),
    });
  }
  return data;
};

const areaPrimaryXAxis: AxisModel = {
  valueType: 'DateTime' as ValueType,
  labelFormat: 'MMM yyyy',
  majorGridLines: { width: 0 },
  intervalType: 'Months',
  edgeLabelPlacement: 'Shift',
  labelStyle: { color: 'gray' },
  minimum: new Date(2018, 0, 1),
  maximum: new Date(2023, 11, 31),
};

const areaPrimaryYAxis: AxisModel = {
  labelFormat: '{value}%',
  lineStyle: { width: 0 },
  minimum: 0,
  maximum: 12,
  interval: 2,
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelStyle: { color: 'gray' },
};

const areaCustomSeries = [
  {
    dataSource: generateInflationData(2018, 6, 2.1, 0.4),
    xName: 'x',
    yName: 'y',
    name: 'USA',
    opacity: 0.5,
    type: 'SplineArea',
    width: 2,
    border: { width: 2, color: '#2E8B57' },
    fill: 'rgba(46, 139, 87, 0.3)',
  },
  {
    dataSource: generateInflationData(2018, 6, 1.8, 0.3),
    xName: 'x',
    yName: 'y',
    name: 'Eurozone',
    opacity: 0.5,
    type: 'SplineArea',
    width: 2,
    border: { width: 2, color: '#4169E1' },
    fill: 'rgba(65, 105, 225, 0.3)',
  },
  {
    dataSource: generateInflationData(2018, 6, 2.5, 0.5),
    xName: 'x',
    yName: 'y',
    name: 'UK',
    opacity: 0.5,
    type: 'SplineArea',
    width: 2,
    border: { width: 2, color: '#800080' },
    fill: 'rgba(128, 0, 128, 0.3)',
  },
];

const Area = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="dark:bg-secondary-dark m-4 mt-24 rounded-3xl bg-white p-10 md:m-10">
      <ChartsHeader category="Area" title="Inflation Rate Trends" />
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={areaPrimaryXAxis}
          primaryYAxis={areaPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{
            background: 'white',
            position: 'Top',
            padding: 20,
            shapeHeight: 12,
            shapeWidth: 12,
          }}
          tooltip={{
            enable: true,
            format: '${series.name}<br/>Date: ${point.x}<br/>Rate: ${point.y}%',
            header: 'Inflation Rate',
          }}
        >
          <Inject services={[SplineAreaSeries, DateTime, Legend, Tooltip]} />
          <SeriesCollectionDirective>
            {areaCustomSeries.map((item, index) => (
              <SeriesDirective key={index} {...item} />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Area;

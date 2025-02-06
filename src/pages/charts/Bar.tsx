import React from 'react';

import {
  AxisModel,
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  Legend,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  ValueType,
} from '@syncfusion/ej2-react-charts';

import { ChartsHeader } from '@/components';
import { useStateContext } from '@/contexts/ContextProvide';

interface CountryMedals {
  country: string;
  gold: number;
  silver: number;
  bronze: number;
}

const olympicData: CountryMedals[] = [
  { country: 'USA', gold: 39, silver: 41, bronze: 33 },
  { country: 'CHN', gold: 38, silver: 32, bronze: 18 },
  { country: 'JPN', gold: 27, silver: 14, bronze: 17 },
  { country: 'GBR', gold: 22, silver: 21, bronze: 22 },
  { country: 'ROC', gold: 20, silver: 28, bronze: 23 },
];

const barPrimaryXAxis: AxisModel = {
  valueType: 'Category' as ValueType,
  interval: 1,
  majorGridLines: { width: 0 },
  labelStyle: {
    fontWeight: '600',
    color: '#666666',
  },
  labelRotation: -45,
};

const barPrimaryYAxis: AxisModel = {
  minimum: 0,
  maximum: 45,
  interval: 5,
  majorGridLines: { width: 1 },
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  labelStyle: {
    fontWeight: '600',
    color: '#666666',
  },
};

const barCustomSeries = [
  {
    dataSource: olympicData,
    xName: 'country',
    yName: 'gold',
    name: 'Gold',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
    fill: '#FFD700',
    cornerRadius: {
      topLeft: 10,
      topRight: 10,
    },
  },
  {
    dataSource: olympicData,
    xName: 'country',
    yName: 'silver',
    name: 'Silver',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
    fill: '#C0C0C0',
    cornerRadius: {
      topLeft: 10,
      topRight: 10,
    },
  },
  {
    dataSource: olympicData,
    xName: 'country',
    yName: 'bronze',
    name: 'Bronze',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
    fill: '#CD7F32',
    cornerRadius: {
      topLeft: 10,
      topRight: 10,
    },
  },
];

const Bar = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="dark:bg-secondary-dark m-4 mt-24 rounded-3xl bg-white p-10 md:m-10">
      <ChartsHeader category="Bar" title="Tokyo Olympics 2020 Medal Count" />
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={barPrimaryXAxis}
          primaryYAxis={barPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{
            enable: true,
            format: '${series.name}: ${point.y}',
          }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{
            background: 'white',
            position: 'Top',
            padding: 20,
            shapeHeight: 15,
            shapeWidth: 15,
          }}
        >
          <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
          <SeriesCollectionDirective>
            {barCustomSeries.map((item, index) => (
              <SeriesDirective key={index} {...item} />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Bar;

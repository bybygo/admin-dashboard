import React from 'react';

import {
  AxisModel,
  Category,
  ChartComponent,
  ColumnSeries,
  Inject,
  Legend,
  RangeColorSettingDirective,
  RangeColorSettingsDirective,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  ValueType,
} from '@syncfusion/ej2-react-charts';

import { ChartsHeader } from '@/components';
import { useStateContext } from '@/contexts/ContextProvide';

const ColorMappingPrimaryXAxis: AxisModel = {
  valueType: 'Category' as ValueType,
  majorGridLines: { width: 0 },
  title: 'Months',
};

const ColorMappingPrimaryYAxis: AxisModel = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}°F',
  title: 'Temperature',
};

const colorMappingData = [
  [
    { x: 'Jan', y: 6.96 },
    { x: 'Feb', y: 8.9 },
    { x: 'Mar', y: 12 },
    { x: 'Apr', y: 17.5 },
    { x: 'May', y: 22.1 },
    { x: 'June', y: 25 },
    { x: 'July', y: 29.4 },
    { x: 'Aug', y: 29.6 },
    { x: 'Sep', y: 25.8 },
    { x: 'Oct', y: 21.1 },
    { x: 'Nov', y: 15.5 },
    { x: 'Dec', y: 9.9 },
  ],
];

const rangeColorMapping = [
  {
    label: '1°C to 10°C',
    start: 1,
    end: 10,
    colors: ['#FFFF99'],
    key: 1,
  },
  {
    label: '11°C to 20°C',
    start: 11,
    end: 20,
    colors: ['#FFA500'],
    key: 2,
  },
  {
    label: '21°C to 30°C',
    start: 21,
    end: 30,
    colors: ['#FF4040'],
    key: 3,
  },
];

const ColorMapping = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="dark:bg-secondary-dark m-4 mt-24 rounded-3xl bg-white p-10 md:m-10">
      <ChartsHeader category="Color Mappping" title="USA CLIMATE - WEATHER BY MONTH" />
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={ColorMappingPrimaryXAxis}
          primaryYAxis={ColorMappingPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          legendSettings={{ mode: 'Range', background: 'white' }}
          tooltip={{ enable: true }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
        >
          <Inject services={[ColumnSeries, Tooltip, Category, Legend]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={colorMappingData[0]}
              name="USA"
              xName="x"
              yName="y"
              type="Column"
              cornerRadius={{
                topLeft: 10,
                topRight: 10,
              }}
            />
          </SeriesCollectionDirective>
          <RangeColorSettingsDirective>
            {rangeColorMapping.map((item) => {
              const { key, ...rest } = item;
              return <RangeColorSettingDirective key={key} {...rest} />;
            })}
          </RangeColorSettingsDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default ColorMapping;

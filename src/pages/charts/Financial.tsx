import React from 'react';

import {
  AxisModel,
  ChartComponent,
  Crosshair,
  DateTime,
  HiloSeries,
  Inject,
  Logarithmic,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  ValueType,
  Zoom,
} from '@syncfusion/ej2-react-charts';

import { ChartsHeader } from '@/components';
import { useStateContext } from '@/contexts/ContextProvide';

interface StockData {
  x: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const generateStockData = (startDate: Date, days: number): StockData[] => {
  const data: StockData[] = [];
  let currentPrice = 150; // Starting price
  let volatility = 2; // Base volatility

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) {
      continue;
    }

    // Add market sentiment (bullish/bearish trends)
    const trendCycle = Math.sin(i / 30) * 0.3; // 30-day cycle
    const longTermTrend = (i / days) * 0.2; // Overall upward trend

    // Increase volatility during certain periods
    if (i % 20 < 5) {
      // Higher volatility every 20 days
      volatility = 3;
    } else {
      volatility = 2;
    }

    // Calculate daily price movements
    const dailyChange = (Math.random() - 0.5) * volatility + trendCycle + longTermTrend;
    currentPrice = Math.max(currentPrice * (1 + dailyChange / 100), 1);

    // Calculate intraday price movements
    const dayVolatility = volatility * (1 + Math.random() * 0.5);
    const high = currentPrice * (1 + (Math.random() * dayVolatility) / 100);
    const low = currentPrice * (1 - (Math.random() * dayVolatility) / 100);
    const open = low + Math.random() * (high - low);
    const close = low + Math.random() * (high - low);

    // Generate realistic volume
    const baseVolume = 1000000;
    const volumeVariation = Math.abs(dailyChange) * 200000;
    const volume = Math.round(baseVolume + volumeVariation * (0.5 + Math.random()));

    data.push({
      x: date,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });
  }

  return data;
};

const currentYear = new Date().getFullYear();
const startDate = new Date(currentYear, 0, 1);
const stockData = generateStockData(startDate, 200); // Generate 200 days of data

const FinancialPrimaryXAxis: AxisModel = {
  valueType: 'DateTime' as ValueType,
  minimum: startDate,
  maximum: new Date(currentYear, 6, 31),
  crosshairTooltip: { enable: true },
  majorGridLines: { width: 0 },
  labelFormat: 'MMM dd',
  intervalType: 'Days',
  labelStyle: {
    color: '#666666',
    fontWeight: '600',
  },
};

const FinancialPrimaryYAxis: AxisModel = {
  title: 'Price (USD)',
  minimum: Math.floor(Math.min(...stockData.map((d) => d.low)) * 0.95),
  maximum: Math.ceil(Math.max(...stockData.map((d) => d.high)) * 1.05),
  interval: Math.ceil(
    (Math.max(...stockData.map((d) => d.high)) - Math.min(...stockData.map((d) => d.low))) / 10,
  ),
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  labelFormat: '${value}',
  labelStyle: {
    color: '#666666',
    fontWeight: '600',
  },
};

const Financial = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="dark:bg-secondary-dark m-4 mt-24 rounded-3xl bg-white p-10 md:m-10">
      <ChartsHeader category="Financial" title="AAPL Stock Price - 2023" />
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={FinancialPrimaryXAxis}
          primaryYAxis={FinancialPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{
            enable: true,
            shared: true,
            header: 'AAPL Stock Price',
            format:
              'Date: ${point.x}<br/>Open: $${point.open}<br/>High: $${point.high}<br/>Low: $${point.low}<br/>Close: $${point.close}',
          }}
          crosshair={{
            enable: true,
            lineType: 'Vertical',
            line: { width: 1, color: '#666666', dashArray: '2,2' },
          }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{
            visible: true,
            background: 'white',
            position: 'Top',
            padding: 20,
          }}
        >
          <Inject services={[HiloSeries, Tooltip, DateTime, Logarithmic, Crosshair, Zoom]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={stockData}
              xName="x"
              high="high"
              low="low"
              open="open"
              close="close"
              volume="volume"
              name="AAPL"
              type="Hilo"
              bullFillColor="#00C853"
              bearFillColor="#FF5252"
              tooltipMappingName="close"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Financial;

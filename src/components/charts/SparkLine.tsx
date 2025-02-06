import React from 'react';

import { Inject, SparklineComponent, SparklineTooltip } from '@syncfusion/ej2-react-charts';

interface SparklineProps {
  id: string;
  height: string;
  width: string;
  color: string;
  data: Array<{ x: number; yval: number }>;
  type: 'Line' | 'Column' | 'WinLoss' | 'Pie' | 'Area';
  currentColor: string;
}

const SparkLine: React.FC<SparklineProps> = ({
  id,
  height,
  width,
  color,
  data,
  type,
  currentColor,
}) => {
  return (
    <SparklineComponent
      id={id}
      height={height}
      width={width}
      xName="x"
      yName="yval"
      lineWidth={1}
      valueType="Numeric"
      fill={color}
      border={{ color: currentColor, width: 2 }}
      dataSource={data}
      type={type}
      tooltipSettings={{
        visible: true,
        format: '${x} : data ${yval}',
        trackLineSettings: {
          visible: true,
        },
      }}
    >
      <Inject services={[SparklineTooltip]} />
    </SparklineComponent>
  );
};

export default SparkLine;

import React from 'react';

import { ChartsHeader, Pie as PieChart } from '@/components';
import { pieChartData } from '@/data/dummy';

const Pie = () => {
  return (
    <div className="dark:bg-secondary-dark-bg m-4 mt-24 rounded-3xl bg-white p-10 md:m-10">
      <ChartsHeader category="Pie" title="Project Cost Breakdown" />
      <div className="w-full">
        <PieChart id="chart-pie" data={pieChartData} legendVisiblity height="full" />
      </div>
    </div>
  );
};

export default Pie;

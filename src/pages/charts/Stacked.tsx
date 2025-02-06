import React from 'react';

import { ChartsHeader, Stacked as StackedChart } from '@/components';

const Stacked = () => {
  return (
    <div className="dark:bg-secondary-dark-bg m-4 mt-24 rounded-3xl bg-white p-10 md:m-10">
      <ChartsHeader category="Stacked" title="Revenue Breakdown" />
      <div className="w-full">
        <StackedChart />
      </div>
    </div>
  );
};

export default Stacked;

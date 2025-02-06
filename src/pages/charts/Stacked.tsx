import React from 'react';

import { ChartsHeader, Stacked as StackedChart } from '@/components';

const Stacked = () => {
  return (
    <div className="dark:bg-secondary-dark m-4 mt-24 rounded-3xl bg-white p-10 md:m-10">
      <ChartsHeader category="Stacked" title="Revenue Breakdown" />
      <div className="w-full">
        <StackedChart width="100%" height="360px" />
      </div>
    </div>
  );
};

export default Stacked;

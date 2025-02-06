import React from 'react';

import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Inject,
  Page,
  Selection,
  Sort,
  Toolbar,
} from '@syncfusion/ej2-react-grids';

import { Header } from '@/components';
import { ordersData, ordersGrid } from '@/data/dummy';

const Orders = () => {
  return (
    <div className="dark:bg-secondary-dark m-2 mt-16 rounded-3xl bg-white p-2 md:m-10 md:p-10">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width="auto"
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Orders;

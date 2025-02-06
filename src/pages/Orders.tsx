import React from 'react';

import {
  ColumnDirective,
  ColumnsDirective,
  ContextMenu,
  ContextMenuItem,
  Edit,
  ExcelExport,
  Filter,
  GridComponent,
  Inject,
  Page,
  PdfExport,
  Resize,
  Sort,
} from '@syncfusion/ej2-react-grids';

import { Header } from '@/components';
import { contextMenuItems, ordersData, ordersGrid } from '@/data/dummy';

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 mt-24 rounded-3xl bg-white p-2 md:m-10 md:p-10">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems as ContextMenuItem[]}
        editSettings={editing}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]}
        />
      </GridComponent>
    </div>
  );
};

export default Orders;

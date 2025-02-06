import React from 'react';

import { ColumnDirective, ColumnsDirective, KanbanComponent } from '@syncfusion/ej2-react-kanban';

import { Header } from '@/components';
import { kanbanData, kanbanGrid } from '@/data/dummy.js';

const Kanban = () => {
  return (
    <div className="dark:bg-secondary-dark m-2 mt-24 rounded-3xl bg-white p-2 md:m-10 md:p-10">
      <Header category="App" title="Kanban" />
      <KanbanComponent
        id="kanban"
        keyField="Status"
        height="650px"
        dataSource={kanbanData}
        enableTooltip={true}
        cardSettings={{
          contentField: 'Summary',
          headerField: 'Title',
          tagsField: 'Tags',
          grabberField: 'Color',
          footerCssField: 'ClassName',
          showHeader: true,
          selectable: true,
        }}
        swimlaneSettings={{
          keyField: 'Assignee',
          allowDragAndDrop: true,
        }}
      >
        <ColumnsDirective>
          {kanbanGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};

export default Kanban;

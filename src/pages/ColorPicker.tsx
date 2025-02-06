import React from 'react';

import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';

import { Header } from '@/components';

interface ChangeArgs {
  currentValue: { hex: string };
}

interface PreviewArgs {
  currentValue: { hex: string };
}

const ColorPicker = () => {
  const change = (args: ChangeArgs) => {
    if (document.getElementById('preview')) {
      document.getElementById('preview')!.style.backgroundColor = args.currentValue.hex;
    }
  };

  const Preview = ({ id = 'preview', mode = 'inline' }: { id?: string; mode?: string }) => (
    <div className="flex items-center gap-20">
      <div id={id}>
        <div id="preview" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-secondary-dark h-2 w-2 rounded-full" />
          <div className="text-gray-400">Secondary</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-primary-dark h-2 w-2 rounded-full" />
          <div className="text-gray-400">Primary</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="m-2 mt-24 rounded-3xl bg-white p-2 md:m-10 md:p-10">
      <Header category="App" title="Color Picker" />
      <div className="text-center">
        <div id="preview" />
        <div className="flex flex-wrap items-center justify-center gap-20">
          <div>
            <p className="mt-2 mb-4 text-2xl font-semibold">Inline Pallete</p>
            <ColorPickerComponent
              id="inline-palette"
              mode="Palette"
              modeSwitcher={false}
              inline
              showButtons={false}
              change={change}
            />
          </div>
          <div>
            <p className="mt-2 mb-4 text-2xl font-semibold">Inline Picker</p>
            <ColorPickerComponent
              id="inline-picker"
              mode="Picker"
              modeSwitcher={false}
              inline
              showButtons={false}
              change={change}
            />
          </div>
        </div>
        <Preview />
      </div>
    </div>
  );
};

export default ColorPicker;

import React from 'react';
import GridLayout from 'react-grid-layout';
import { useLayoutStore } from '../store/useLayoutStore';
import 'react-grid-layout/css/styles.css';

interface DraggableLayoutProps {
  children: React.ReactNode[];
}

export function DraggableLayout({ children }: DraggableLayoutProps) {
  const { layouts, setLayouts } = useLayoutStore();
  
  const defaultLayout = children.map((_, i) => ({
    i: i.toString(),
    x: (i % 3) * 4,
    y: Math.floor(i / 3) * 4,
    w: 4,
    h: 4,
  }));

  const onLayoutChange = (newLayout: any) => {
    setLayouts(newLayout);
  };

  return (
    <GridLayout
      className="layout"
      layout={layouts.length ? layouts : defaultLayout}
      cols={12}
      rowHeight={100}
      width={1200}
      onLayoutChange={onLayoutChange}
      isDraggable
      isResizable
      margin={[16, 16]}
    >
      {children.map((child, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm">
          {child}
        </div>
      ))}
    </GridLayout>
  );
}
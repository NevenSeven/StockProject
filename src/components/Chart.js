import React, { useRef, useEffect } from 'react';
import { createChart } from 'lightweight-charts';

function Chart() {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth || 600,
      height: 400,
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const lineSeries = chart.addLineSeries();
    lineSeries.setData([
      { time: '2024-04-08', value: 80.01 },
      { time: '2024-04-09', value: 96.63 },
      { time: '2024-04-10', value: 76.64 },
      { time: '2024-04-11', value: 81.89 },
    ]);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return React.createElement('div', {
    ref: chartContainerRef,
    style: {
      width: '100%',
      minHeight: '400px',
      marginTop: '2rem',
      border: '1px solid #ccc', // Optional: helps visualize space
    },
  });
}

export default Chart;

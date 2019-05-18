import React from 'react';
import { Chart, Tooltip, Geom } from 'bizcharts';
import autoHeight from '../autoHeight';
import styles from '../index.less';

@autoHeight()
export default class MiniLine extends React.Component {
  render() {
    const { height, forceFit = true, color = 'rgb(19, 194, 194)', data = [] } = this.props;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };

    const padding = [36, 5, 30, 5];

    const tooltip = [
      'x*y',
      (x, y) => ({
        name: x,
        value: `${(y * 100).toFixed(2)}%`,
      }),
    ];

    // for tooltip not to be hide
    const chartHeight = height + 54;

    return (
      <div className={styles.miniChart} style={{ height }}>
        <div className={styles.chartContent}>
          <Chart
            scale={scale}
            height={chartHeight}
            forceFit={forceFit}
            data={data}
            padding={padding}
          >
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom type="line" position="x*y" color={color} tooltip={tooltip} />
          </Chart>
        </div>
      </div>
    );
  }
}


import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import styles from './styles.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graphWidth: 0,
    };

    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  onResize() {
    if (this.wrapper && this.wrapper !== null) {
      const graphWidth = this.wrapper.clientWidth - 20;
      this.setState({ graphWidth  });
    }
  }

  render() {
    const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];

    return(
      <div className={styles.wrapper}>
        <ul className={styles.filterList}>
          <li className={styles.filter}>Totaal</li>
          <li className={styles.filter}>Per maand</li>
          <li className={styles.filter}>Per week</li>
          <li className={styles.filter}>Per dag</li>
          <li className={styles.filter}>Vandaag</li>
        </ul>
        <div className={styles.graphs}>
          <div className={styles.graph}>
            <div className={styles.graphWrapper}>
              <LineChart className={styles.lineChart} width={400} height={300} data={data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
          <div className={styles.graph}>
            <div className={styles.graphWrapper}>
              <LineChart className={styles.lineChart} width={400} height={300} data={data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
          <div className={styles.graph}>
            <div className={styles.graphWrapper}>
              <LineChart className={styles.lineChart} width={400} height={300} data={data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
          <div className={styles.graph}>
            <div className={styles.graphWrapper}>
              <LineChart className={styles.lineChart} width={400} height={300} data={data}
                         margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

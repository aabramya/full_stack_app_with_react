import React, { Component } from 'react';
import TablePreview from './TablePreview'
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import '../sass/DataPreview.scss';

class DataPreview extends Component {
    constructor(props) {
        super();
        this.state = {
            width: window.innerWidth - 40 || 800,
            height: window.innerHeight/2 || 400,
            overview:{},
            timeInfo:{},
            data: [],
            chartTitle: ''
        };
        this.chartResize = this.chartResize.bind(this);

        this.margin = { top: 50, right: 20, bottom: 30, left: 50 };

        this.chartWidth = this.state.width - this.margin.left - this.margin.right;
        this.chartHeight = this.state.height - this.margin.top - this.margin.bottom;
        this.xTicks = Math.round(this.chartWidth/80); // 80px Approximate size of date text

        this.x = d3.scaleTime().range([0, this.chartWidth]);
        this.y = d3.scaleLinear().range([this.chartHeight, 0]);
    }

    componentDidMount() {
        window.addEventListener("resize", this.chartResize);
    }
    chartResize() {
        this.setState({
            width: window.innerWidth - 40 || 800,
            height: window.innerHeight/2 || 400,
        }, ()=>{
            this.chartWidth = this.state.width - this.margin.left - this.margin.right;
            this.chartHeight = this.state.height - this.margin.top - this.margin.bottom;
            
            this.xTicks = Math.round(this.chartWidth / 80); // 80px Approximate size of date text
            this.updateChart();
        });
        
    }

    updateChart(results = this.props.results){
        if (Object.keys(results).length > 0) {
            let data = results.data.timeLine;
            this.setState({
                overview: results.data.overview,
                timeInfo: results.data.timeInfo,
                chartTitle: results.data.overview.topIndustry,
                data: data
            });

            this.x = d3.scaleTime().domain(d3.extent(data, (d) => new Date(d.x))).range([0, this.chartWidth]);
            this.y = d3.scaleLinear().domain([0, d3.max(data, (d) => d.y)]).range([this.chartHeight, 0]);

        } else {
            this.setState({
                overview: {},
                timeInfo: {},
                chartTitle: 'No info',
                data: []
            });
            this.x.range([0, this.chartWidth]);
            this.y.range([this.chartHeight, 0]);
        }
    }

    componentWillReceiveProps(props) {
        let { results } = props;
        this.updateChart(results);
    }

    get xAxis() {
        return d3.axisBottom(this.x).ticks(this.xTicks).tickFormat(d3.timeFormat("%b %Y"));
    }

    get yAxis() {
        return d3.axisLeft(this.y);//.ticks(5);
    }

    drawXAxis() {
        d3.select(this.refs.x).call(this.xAxis);
    }

    drawYAxis() {
        d3.select(this.refs.y).call(this.yAxis);
    }

    get line() {
        return d3.line()
            .x((d) => (this.x(new Date(d.x))))
            .y((d) => (this.y(d.y)));
    }

    path() {
        return (<path className="line" d={this.line(this.state.data)} />);
    }

    render() {
        return (
        <div className="DataPreview">
                <svg width={this.state.width} height={this.state.height}  >
                <text className="title" x="50%" y={`${this.margin.top / 2 + 18 / 2}`} textAnchor="middle">{this.state.chartTitle}</text> 
                <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
                    {this.state.data.length > 0 ? this.path() : []}
                    <g ref="x" className="x axis" transform={`translate(0, ${this.state.height - this.margin.top - this.margin.bottom})`}>
                        {this.state.data.length > 0 ? this.drawXAxis() : []}
                    </g>
                    <g ref='y' className="y axis">
                        {this.state.data.length > 0 ? this.drawYAxis() : []}
                    </g>
                    
                    <g ref='dots' className="dots">
                        {
                            this.state.data.map((d, i) => 
                                <g key={i}>
                                    <circle 
                                        onMouseOver={() => document.getElementById("tltp_" + i).classList.add("hovered") } 
                                        onMouseOut={ () => document.getElementById("tltp_" + i).classList.remove("hovered")} 
                                        className="dot" cx = { this.x(new Date(d.x)) } cy = { this.y(d.y) } r={3} />
                                    
                                </g>)
                        }
                    </g>
                        {
                            this.state.data.map((d, i) =>
                                <foreignObject id={"tltp_" + i} key={i} width="120" height="40" className="tltp" x={this.x(new Date(d.x)) - 60} y={this.y(d.y) - 50}>
                                    <b>{d.x.split("T")[0]}</b><br />
                                    <span>{d.y.toFixed(6)}</span>
                                </foreignObject>
                            )
                        }
                </g>
            </svg>
            <TablePreview title="Overview" data={this.state.overview} />
            <TablePreview title="TimeInfo" data={this.state.timeInfo} />
        </div>
        );
        
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.chartResize);
    }

}

DataPreview.propTypes = {
    results: PropTypes.object.isRequired
};

export default DataPreview;

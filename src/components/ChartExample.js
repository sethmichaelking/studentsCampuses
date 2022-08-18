import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import { connect } from 'react-redux';
import { fetchCampuses, fetchStudents, deleteCampus } from '../store'

class ChartExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campuses: ''
        }
      }
    findStudentTotal(){
        const temp = []
        for (let i = 0; i < this.state.campuses.length; i++ ){
            let campus = this.state.campuses[i]
            if (campus.students){
                temp.push(campus.students.length)
            } 
            else if (campus.students === undefined){
                temp.push(0)
            }
        }
        console.log('temp', temp)
        return temp
    }
    componentDidMount(){
       this.props.load()
       this.setState({ campuses: this.props.campuses },()=>{
        console.log('on mount', this.state.campuses);
      });
    }
    componentDidUpdate(prevProps){
    if(prevProps.campuses.length === 0 && this.props.campuses.length > 0){
        this.setState({ campuses: this.props.campuses },()=>{
            console.log('on render', this.state.campuses);
        });
      }
      //if the length of a campus's students key changed update the campuses
  
    }

    render() {
        console.log('campuses', this.props.campuses)
        const options = {
            chart: {
              width: "100%",
              id: 'apexchart-example'
            },
            xaxis: {
              categories: this.props.campuses.map(campus=> campus.name)
            },
          }
        const series = [{
            name: 'Total students enrolled',
            data: this.findStudentTotal()
        }]
        return (
        <div style={{backgroundColor: 'white', width: '90vw'}}>
            <div style={{width: '90vw'}}>
                <Chart options={options} series={series} type="bar"  height={320} />
           </div>
        </div>
        )
      }
}


const mapState = (state) => {
    return {
        students: state.students || {},
        campuses: state.campuses.sort((a,b) => a.id - b.id) || {},
        campusSearch: state.campusSearch
    }
}
const mapDispatch = (dispatch) => {
    return {
        load: () => {
            dispatch(fetchCampuses())
            dispatch(fetchStudents())
        }
    }
}
export default connect(mapState, mapDispatch)(ChartExample)
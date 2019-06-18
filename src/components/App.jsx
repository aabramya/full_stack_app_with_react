import React from 'react';
import axios from 'axios';
import Header from './Header';
import DataPreview from './DataPreview';

class App extends React.Component {
    state =  {
        pageHeader: 'Nextatlas Assignment for Full-stack developer position',
        data: {}
    }

    componentDidMount(){
        axios.get('/api/getData')
        .then(res => {
            this.setState({
                data: res.data
            });
        })
        .catch(console.error);
        
        /*
        // To test if the chart dynamically updates on data change
        setTimeout(()=> {
            this.setState({
                data: {}
            });
        },4000);
        */
    }
    
    render() {
        return (
            <div className="App">
                <Header message={this.state.pageHeader} />
                <main>
                    <DataPreview results={this.state.data} />
                </main>
            </div>
        )
    }
}

export default App;
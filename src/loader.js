import React, { Component } from 'react';


const Loader = (WrappedComponent) => {
    return class Loader extends Component {
      constructor(props) {
        super(props);
        this.state = {
          isLoading: false
        }
  
        this.showLoader = this.showLoader.bind(this);
      }
  
     showLoader() {
       this.setState({isLoading: true});
     }
  
      render() {
        return this.state.isLoading 
          ? <button className="loader-button">
              <div className="loader">
                <span className="loader-text">LOADING...</span>
              </div>
            </button>
          : <WrappedComponent 
              {...this.props} 
              showLoader={this.showLoader}
            />
      }
    }
  }
  
  export default Loader;
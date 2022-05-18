import React from 'react';
import Searchbar from './Searchbar/Searchbar'

class App extends React.Component { 

  state = {
    imagesName: '',
  };
  
  handleFormSubmit = imagesName => {
    this.setState({ imagesName: imagesName });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>
      </div>
    )
  };
};

export default App;

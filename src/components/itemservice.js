import React, { Component } from 'react';
import axios from 'axios';

const ROOT_URL = 'https://eurotravel-sever.herokuapp.com/api/v1';

class ItemService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itin_deleted: false
    };
  }

  deleteData(id) {
    axios.post(`${ROOT_URL}/remove_itin/`+id)
     .then(response => {
        this.setState({
          itin_deleted: true
        });
      })
      .catch(err => {
        this.setState({
          itins_saved: false
        });        
      })
  }   
}

export default ItemService;

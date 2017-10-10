import axios from 'axios';

const ROOT_URL = 'https://eurotravel-sever.herokuapp.com/api/v1';

class ItemService {

  deleteData(id){
    axios.post(`${ROOT_URL}/remove_itin/`+id)
     .then().catch(err => console.log(err))
  }
}

export default ItemService;

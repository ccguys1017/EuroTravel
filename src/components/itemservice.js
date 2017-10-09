import axios from 'axios';

const ROOT_URL = 'http://localhost:8080/api/v1';

class ItemService {

  deleteData(id){
    axios.post(`${ROOT_URL}/remove_itin/`+id)
     .then().catch(err => console.log(err))
  }
}

export default ItemService;

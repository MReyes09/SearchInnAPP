import axios from "axios";

var baseUri = "https://yz8l6z59zh.execute-api.us-east-1.amazonaws.com/prod?";//path de dynamo DB

export class RestSearch{

    getData = (tienda, referencia) =>{
    
        return axios.get(this.baseUri + 'tienda=' + tienda + '&referencia=' + referencia)
        .then(result => (console.log(result)))
        .catch(console.log())
    }
}
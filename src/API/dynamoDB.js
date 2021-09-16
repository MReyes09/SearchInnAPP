import axios from "axios";

export class RestSearch {

    baseUri = "https://yz8l6z59zh.execute-api.us-east-1.amazonaws.com/prod?";//path de dynamo DB

    constructor(){

    }
    
    getData(tienda, referencia){
        
        axios.get(this.baseUri + 'tienda=' + tienda + '&referencia=' + referencia)
    }

}
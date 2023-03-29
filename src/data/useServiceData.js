import axios from "axios";
let info ="listo";
export default function getData(){
  const path = "https://pokeapi.co/api/v2/pokemon/ditto"
  const Headers = {
    "x-rapidapi-host":"https://pokeapi.co/api/v2/pokemon/ditto",
    "x-rapidapi-key":"cfa115aad1msh305ef3ffc77f4c4p15fe57jsn6029c6a90445",
    "useQueryString":true
  }

  axios({
    method: 'get',
    headers: Headers,
    url: path
  })
  .then(res => {info = res})
  return info;
}
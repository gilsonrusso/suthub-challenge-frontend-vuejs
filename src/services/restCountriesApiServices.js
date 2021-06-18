import axios from "axios";

const baseUrl = "https://restcountries.eu/rest/v2"

// const brazilInfo = async () => {
//   const response = await axios.get(`${baseUrl}/name/brazil`)
//   return response
// }

const searchByLanguage = async (language) => {
  const response = await axios.get(`${baseUrl}/lang/${language}`)
  return response;
}

const searchByName = async (name) => {
  const response = await axios.get(`${baseUrl}/name/${name}`)
  return response
}

const searchByRegionalBloc = async (bloc) => {
  const response = await axios.get(`${baseUrl}/regionalbloc/${bloc}`)
  return response
}



export { searchByRegionalBloc, searchByLanguage, searchByName }
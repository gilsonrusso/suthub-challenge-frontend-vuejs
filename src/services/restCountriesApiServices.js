import axios from "axios";

const baseUrl = "https://restcountries.eu/rest/v2"

const brazilInfo = async () => {
  const response = await axios.get(`${baseUrl}/name/brazil`)
  return response
}
const getRegionalBloc = async (bloc) => {
  const response = await axios.get(`${baseUrl}/regionalbloc/${bloc}`)
  return response
}

export { brazilInfo, getRegionalBloc }
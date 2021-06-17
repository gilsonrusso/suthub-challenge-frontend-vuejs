import axios from "axios";

const baseUrl = "https://ws.apicep.com/cep/";

async function search(code) {
  const { data } = await axios.get(
    `${baseUrl}${code}.json`
  );
  
  return data;
}

export { search }

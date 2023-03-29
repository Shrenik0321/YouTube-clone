import axios from "axios";

const baseURL = "https://youtube-v31.p.rapidapi.com";

const options = {
  headers: {
    "X-RapidAPI-Key": "95f7f280damsh141b14ac8944f37p1dc949jsn268f56897747",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

export const fetchFromApi = async (uri) => {
  const res = await axios.get(`${baseURL}/${uri}`, options);
  return res.data.items;
};

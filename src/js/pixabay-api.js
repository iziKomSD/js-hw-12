import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const keyApi = '26468965-37c536f46ba330a607460f03f';

export async function getImages(query, perPage = 15, pageNum) {
  const queryParams = new URLSearchParams({
    key: keyApi,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: pageNum,
  });

  const response = await axios.get('', { params: queryParams });
  return response.data;
}

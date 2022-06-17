import API from './api';
  
const getBills = async ({year, month}) => {
    return await API.get(`bills/${year}/${month}`);
}

export { getBills }
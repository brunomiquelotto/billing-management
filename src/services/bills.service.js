import API from './api';
  
const getBills = async () => {
    return await API.get(`bills`);
}

const getBillsByDate = async ({year, month}) => {
    return await API.get(`bills/${year}/${month}`);
}

const addBill = async (bill) => {
    return await API.post(`bills`, bill);
}

const updateBill = async (bill) => {
    return await API.put(`bills/${bill.id}`, bill);
}

const deleteBill = async (billID) => {
    return await API.delete(`bills/${billID}`);
}

const copyBillFromLastMonth = async () => {
    return await API.post(`bills/fixed/copy-from-last-month`);
}

const payBill = async (billID) => {
    return await API.post(`bills/${billID}/pay`);
}

export { getBills, getBillsByDate, addBill, updateBill, deleteBill, copyBillFromLastMonth, payBill }
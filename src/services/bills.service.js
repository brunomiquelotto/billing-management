import API from './api';

const getBills = async () => {
  return await API.get(`bills`);
}

const getBillsByDate = async ({ year, month }) => {
  return await API.get(`bills/${year}/${month}`);
}

const addOrUpdateBill = async (bill) => {
  if(bill.id) {
    return await API.put(`bills/${bill.id}`, bill);
  }
  return await API.post(`bills`, bill);
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

export { getBills, getBillsByDate, addOrUpdateBill, deleteBill, copyBillFromLastMonth, payBill }
import './App.css';
import { getBills, addBill, updateBill, deleteBill, copyBillFromLastMonth, payBill }  from './services/bills.service';
import React, { useEffect, useState } from "react";

function App() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    async function fetchBills () {
      const result = await getBills();
      console.log(result.data);
      setBills(result.data);
    }
    fetchBills();
  }, []);
  
  async function newBill() {
    const bill = {
      description: 'descriçao teste',
      group: 'grupo 2',
      value: 10,
      paymentDate: null,
      dueDate: '2022-05-05',
      isFixed: true,
      obs: null
    }
    const result = await addBill(bill)
    console.log(result);
  }
  
  async function updateFirstBill() {
    const billToUpdate = {
      id: 1,
      description: `descriçao atualizada ${Date()}`,
      group: 'grupo 2',
      value: 10,
      paymentDate: null,
      dueDate: '2022-05-05',
      isFixed: true,
      obs: null
    }
    const result = await updateBill(billToUpdate)
    console.log(result);
  }

  async function removeBill() {
    const billID = bills[0].id
    if (billID != undefined) {
      const result = await deleteBill(billID)
      console.log(result);
    }
  } 

  async function copyBill() {
    const result = await copyBillFromLastMonth()
    console.log(result);
  } 

  async function payFirstBill() {
    const billID = bills[0].id
    if (billID != undefined) {
      const result = await payBill(billID)
      console.log(result);
    }
  } 

  return (
    <div className="App">
      <table>
        <tbody>
            {bills.map((bill) =>
              <tr key={bill.id}>
                <td>Desc: {bill.description} Payment: {bill.paymentDate}</td>
              </tr>
            )}
        </tbody>
      </table>
      <button onClick={newBill}>
        New Bill
      </button>
      <button onClick={removeBill}>
        Delete First Bill
      </button>
      <button onClick={updateFirstBill}>
        Update First Bill
      </button>
      <button onClick={copyBill}>
        Copy Bill From Last Month
      </button>
      <button onClick={payFirstBill}>
        Pay Last Bill
      </button>
    </div>
  );
}

export default App;

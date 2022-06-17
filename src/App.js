import './App.css';
import { getBills }  from './services/bills.service';
import React, { useEffect, useState } from "react";

function App() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    async function fetchBills () {
      const result = await getBills({year: '2022', month: '07'});
      console.log(result.data);
      setBills(result.data);
    }
    fetchBills();
  }, []);
  
  return (
    <div className="App">
      <table>
        <tbody>
            {bills.map((bill) =>
              <tr key={bill.id}>
                <td>{bill.description}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

import './App.css';
import { useEffect, useState } from 'react';
import { read } from './repositories/bill.repository.js';

function App() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
      const result = read({ month: '06', year: '2022'}, x => { setBills(x); console.log(x); });
  }, []);

  return (
    <div className="App">
      <p>batata fritas</p>
      <ul>
        {bills.map(bill => (
          <li key={1}>
            <p>{{bill}}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

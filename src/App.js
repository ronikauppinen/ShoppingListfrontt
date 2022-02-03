import './App.css';
import { useState } from 'react';

function App() {
  const [weight, setWeight] = useState(0);
  const [bottle, setBottles] = useState(0);
  const [time, setTime] = useState(0);
  const [gender, setGender] = useState('male');
  const [results, setResults] = useState(0);

  function calculate(e) {
    e.preventDefault();

    let results = 0;
    let litres = bottle * 0.33;
    let grams = litres * 8 * 4.5;
    let burning = weight / 10;
    let gramsLeft = grams - (burning * time);

    if (gender === 'male') {
      results = gramsLeft / (weight * 0.7);
    }
    else {
      results = gramsLeft / (weight * 0.6);
    }
    
    if (results < 0) {
      let results = 0;
    }
    setResults(results);
  }

  return (
    <form onSubmit={calculate}>
      <h3>Calculate alcohol blood level</h3>

      <div>
        <div>
          <label>Weight: </label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} 
          />
        </div>
        <div>

          <label>Bottles: </label>
          <input type="number" value={bottle} onChange={e => setBottles(e.target.value)}/>

        </div>
        <div>

          <label>Time: </label>
          <input type="number" value={time} onChange={e => setTime(e.target.value)}/>

        </div>
        <p>Gender:</p>

        <input type="radio" name="gender" value="male" defaultChecked 
        onChange={e => setGender(e.target.value)}/>
        <label>Male</label>
        
        <input type="radio" name="gender" value="female"
        onChange={e => setGender(e.target.value)} />
        <label>Female</label>

      </div>
      <button>Calculate</button>
      <div>
        <output>{results.toFixed(2)}</output>
      </div>
      
    </form>
  );
}

export default App;

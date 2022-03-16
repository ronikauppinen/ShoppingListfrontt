import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist'

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState();

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      setItem(response.data)
    }).catch(error => {
      alert(error);
    })
}, [])

function remove(id) {
  const json = JSON.stringify({id:id})
  axios.post(URL + 'delete.php', json,{
   headers: {
     'Content-Type' : 'application/json'
   }
  })
  .then((response) => {
    const newListWithRemoved = item.filter((item) => item.id !== id);
    const amountListRemoved = amount.filter((amount) =>amount.id !== id)
    setAmount(amountListRemoved);
    setItem(newListWithRemoved);
  }) .catch (error => {
    alert(error.response ? error.response.data.error : error);
  })
} 
        
function save(e) {
  e.preventDefault();
  const json = JSON.stringify({desription:item},{desription:amount})
  axios.post(URL + 'add.php', json, {
    headers: {
      'Content-Type' : 'application/json'
    }
  })
  .then((response) => {
    setItem(item => [...item,response.data]);
    setItem('');
  }).catch (error => {
    alert(error.response.data.error)
  });
}
         
  return (
    <div className='container'>
      <h2>shoppinglist</h2>
      <form onSubmit={save}>
        <label>New Item</label>
        <input value={item} onChange={e => setItem(e.target.value)}/>

        <input value={amount} onChange={e => setAmount(e.target.value)}/>
        <button>Add</button>
      </form>
      <ol>
      {item?.map(item =>(
          <li key={item.id}>{item.desription}
          <a href='#'className='delete' onClick={() => remove(item.id,amount.id)}>
            Delete 
          </a>
         </li>
        ))}
      </ol> 
    </div>
  );
}

export default App;

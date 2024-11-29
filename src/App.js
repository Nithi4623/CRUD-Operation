import { useState } from 'react';
import './App.css';

function App() {
  const [userinfo, setUserinfo] = useState({ name: '', age: '' });
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState('add');
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserinfo({ ...userinfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit === 'add') {
      setData([...data, { ...userinfo, id: Date.now() }]); // Add unique ID to each new entry
    } else {
      update(userinfo); // Call the update function when editing an existing entry
    }
    setUserinfo({ name: '', age: '' });
    setEdit('add'); // Reset the mode back to 'add'
    setCurrentEditIndex(null); // Reset current edit index
  };

  const handleEdit = (entry, index) => {
    setUserinfo(entry);
    setEdit('update');
    setCurrentEditIndex(index); 
  };

  const update = (updatedUser) => {
    setData(
      data.map((item, index) =>{
        if(index == currentEditIndex ){
         return   { ...item, ...updatedUser }
        }
          return  item
   } )
    );
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index)); // Filter out the item at the provided index
  };

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              value={userinfo.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              placeholder="Age"
              value={userinfo.age}
              onChange={handleChange}
              name="age"
            />
          </div>

          <div>
            {edit === 'add' ? (
              <button type="submit">Submit</button>
            ) : (
              <>
                <button type="submit">Update</button>
                <button
                  type="button"
                  onClick={() => {
                    setEdit('add');
                    setUserinfo({ name: '', age: '' });
                    setCurrentEditIndex(null);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>

    
        <h3>Submitted Data</h3>
        <div style={{display :'flex' , justifyContent: 'center'}}>
        <table style={{ width: '50%', borderCollapse: 'collapse', marginBottom: '20px',alignContent:'center' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Age</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={entry.id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{entry.name}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{entry.age}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <button
                  onClick={() => handleEdit(entry, index)}
                  style={{ marginRight: '5px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        
  
    
    </>
  );
}

export default App;

'#use client'
import { useEffect, useState } from 'react';

// import './CRUD.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AllDetails, setDetails } from './slices/Details';
// import { setDelete, setDetails } from './slices/Details';

function CRUD() {
  
  const dispatch = useDispatch();
  // const dispatch = useDispatch(); 
  useEffect(()=>{
    dispatch(AllDetails())  
  },[])

   const Datass = useSelector((state) => state.DetailsSlice);
    
   console.log(Datass,"Datashgjkghs")

   const Mapdata = Datass?.details
    console.log(Mapdata[0],"Mapdataghhkjkghk")

  //  const dispatch  = useDispatch()
   

  const [userinfo, setUserinfo] = useState({ name: '', age: '' });
   const [name ,setName]=useState('')
   const [age, setAge] = useState('')
  const [data, setData] = useState([]);
  // console.log(data,"data");
  
  const [edit, setEdit] = useState('add');
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserinfo({ ...userinfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit === 'add') {
      // setData([...data, { ...userinfo, id: Math.random(99,1)}]); // Add unique ID to each new entry
      // dispatch(setDetails( [ ...data, {Age :age, Name :name} ] ))
      dispatch(setDetails( [ ...data, {Age :age, Name :name} ] ))
      setData((prevs)=> [ ...data, {Age :age, Name :name} ] )
    } else {
      update(userinfo); // Call the update function when editing an existing entry
    }
    setUserinfo({ name: '', age: '' });
    setEdit('add'); // Reset the mode back to 'add'
    setCurrentEditIndex(null); // Reset current edit index
  };

  const handleEdit = (entry, index) => {
    // setUserinfo(entry);
    setName(entry.Name)
    setAge(entry.Age)
    
    setEdit('update');
    setCurrentEditIndex(index); 
  };

  const update = (updatedUser) => {
    setData(
      data.map((item, index) =>{
        if(index == currentEditIndex ){
          return { ... item , updatedUser}
         return   { ...item, Name :name, Age :age}
       }
          return  item
   } )
    );
  };

  const handleDelete = (index) => {
  //  dispatch(setDelete(idd))
    setData(data.filter((_, i) => i != index)); // Filter out the item at the provided index
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
              value={name}
              onChange={(e)=>setName(e.target.value)}
              name="name"
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e)=>setAge(e.target.value)}
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
          {Mapdata?.map((entry, index) => (
            <tr key={index}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{entry.Name}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{entry.Age}</td>
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

export default CRUD;

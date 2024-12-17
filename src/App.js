import { useEffect, useState } from 'react';
import './App.css';
import CRUD from './crud';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { AllDetails } from './slices/Details';

function App() {
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(AllDetails())  
  // },[])

  return (
    <Provider store={store}>
   <CRUD/>
    </Provider>

  );
}

export default App;

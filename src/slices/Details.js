// import { createSlice } from "@reduxjs/toolkit";


//  const initialState = []
//   const DetailsSlice = createSlice({
//     name: "details",
//     initialState :{
//       details :[]
//     },
//     reducers: {
//       setDetails: (state, action)=>{
//         state.details = [...state.details , ...action.payload]},
//         setDelete : (state, action) => {
//           const deleteid = action.payload;
//          state?.details.filter((item , index ) => { return ( index != deleteid)})}
//         },

//         extraReducers :{
         
    
//         }
//   });

//   export const { setDetails  } = DetailsSlice.actions;
//   export default DetailsSlice.reducer;
  

 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import axios from 'axios';


  export const AllDetails  = createAsyncThunk("details/AllDetails", async () => {
   const response = await axios.get("https://api.vizhil.com/api/group/getall?PageNumber=1&PageSize=10");
    // const data = await response;
    console.log(response , "ResultedFaya")
    return response;
  
   
  });

   
  export const Dataslice = createSlice({
    name : "details" , 
    initialState  :{
      details : [],
      White : []

    },


     reducers :{
      setDetails : ( state , actions) =>{
        state.details = [...state.details , ...actions.payload]
      }

     },
    //  extraReducers :{
     
    //   AllDetails.fulfilled : (state, action) => {
    //     state.loading = false;
    //     state.White = action.payload.data.result;
    //   },
     

    //  }
    extraReducers: builder => {
      builder.addCase(AllDetails.fulfilled, (state, action) => {
        state.White = action.payload
        state.loading = false
      })
    }

  })

   export const { setDetails } = Dataslice.actions;
   export default Dataslice.reducer;
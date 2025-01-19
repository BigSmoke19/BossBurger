import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { collection, onSnapshot,getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

initializeApp(firebaseConfig);

const dataBase = getFirestore();
const colRef = collection(dataBase,"items");

const itemsSlice = createSlice({
    name: 'data',
    initialState: {
      items: [],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getItems.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getItems.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload;
        })
        .addCase(getItems.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
    },
  });
  

export const getItems = createAsyncThunk(
    "items/getItems",
    async (_, { rejectWithValue }) => {
      try {
        return new Promise((resolve, reject) => {
          onSnapshot(
            colRef,
            (snapshot) => {
                let data = [];
                snapshot.docs.forEach((doc)=>{
                    data.push({id: doc.id, ...doc.data()})
                });
              resolve(data);
            },
            (error) => {
              reject(rejectWithValue(error.message));
            }
          );
        });
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export default itemsSlice.reducer;
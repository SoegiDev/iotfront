import { createSlice } from '@reduxjs/toolkit'
import { outletChange,outletAdd} from './actions/outletAction'
import { comChange,comCreate } from './actions/companieAction'
import { userChange,userCreate } from './actions/userAction'
import { productAdd,productChange } from './actions/productsAction'
import { importOutlet,cancelImportStore,saveImportStore,importUser,saveImportUser,importProduct,saveImportProduct,importContent,saveUpdateContent } from './actions/importAction'
import {authChangePassword,authChange} from './auths/authAction'
import { eslChange } from './actions/eslAction'
const initialState = {
    dataPush:null,
    isPushError: false,
    isPushSuccess: false,
    isPushLoading: false,
    message: ""
}

const dataPushSlice = createSlice({
  name: 'dataPushSlice',
  initialState,
  reducers: {
    resetPushApi: (state) => {
      state.dataPush = null;
      state.isPushSuccess = false;
      state.isPushError = false;
      state.isPushLoading = false;
    },
  },
  extraReducers:(builder) =>{
    
    // OUTLET PUSH
    builder.addCase(outletChange.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(outletChange.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload.data;});
    builder.addCase(outletChange.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

  // COMPANIES CHANGE 
    builder.addCase(comChange.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(comChange.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload.data;});
    builder.addCase(comChange.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

  // COMPANIES CHANGE 
    builder.addCase(comCreate.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(comCreate.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload.data;});
    builder.addCase(comCreate.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

    // USER CREATE 
    builder.addCase(userCreate.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(userCreate.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload.data;});
    builder.addCase(userCreate.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

    // USER CHANGE 
    builder.addCase(userChange.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(userChange.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload.data;});
    builder.addCase(userChange.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });


    // OUTLET ADD 
    builder.addCase(outletAdd.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(outletAdd.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload.data;});
    builder.addCase(outletAdd.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

    // IMPORT OUTLET BY XLSX 
    builder.addCase(importOutlet.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(importOutlet.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(importOutlet.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

    // IMPORT PRODUCT BY XLSX 
    builder.addCase(importProduct.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(importProduct.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(importProduct.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

    // IMPORT USER BY XLSX 
    builder.addCase(importUser.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(importUser.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(importUser.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

    
    // IMPORT CONTENT BY XLSX 
    builder.addCase(importContent.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(importContent.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(importContent.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

  // SAVE UPDATE CONTENT 
    builder.addCase(saveUpdateContent.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(saveUpdateContent.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(saveUpdateContent.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

    // SAVE IMPORT OUTLET 
    builder.addCase(saveImportStore.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(saveImportStore.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(saveImportStore.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

     // CANCEL IMPORT OUTLET 
    builder.addCase(cancelImportStore.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(cancelImportStore.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(cancelImportStore.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

    // SAVE IMPORT USER 
    builder.addCase(saveImportUser.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(saveImportUser.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(saveImportUser.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

    
    // SAVE IMPORT PRODUCT 
    builder.addCase(saveImportProduct.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(saveImportProduct.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(saveImportProduct.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

    // CHANGE PASSWORD 
    builder.addCase(authChangePassword.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(authChangePassword.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(authChangePassword.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

        // CHANGE AUTH 
    builder.addCase(authChange.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(authChange.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(authChange.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

  // PRODUCT CREATE 
    builder.addCase(productAdd.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(productAdd.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(productAdd.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

  // PRODUCT CHANGE 
    builder.addCase(productChange.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(productChange.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(productChange.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

  // ESL CHANGE 
    builder.addCase(eslChange.pending, (state) =>{
      state.isPushLoading = true;
      state.isPushError = false;});
    builder.addCase(eslChange.fulfilled, (state, action) =>{
      state.isPushSuccess = true;
      state.isPushLoading = false;
      state.isPushError = false;
      state.message = action.payload.message;
      state.dataPush = action.payload;});
    builder.addCase(eslChange.rejected, (state, action) =>{
      state.isPushLoading = false;
      state.isPushSuccess = false;
      state.isPushError = true;
      state.message = action.payload;
    });

  },
})

export const { resetPushApi } = dataPushSlice.actions
export default dataPushSlice.reducer
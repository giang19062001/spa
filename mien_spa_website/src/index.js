import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { injectStore } from "./api/api";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Mgo+DSMBaFt/QHRqVVhkVFpHaV5EQmFJfFBmRmlafFR1c0U3HVdTRHRcQl9iTX5Wc0VmXXhdcnM=;Mgo+DSMBPh8sVXJ0S0J+XE9AflRBQmJPYVF2R2BJfFRzd19DZ0wgOX1dQl9gSXxSckVmXH9bdHNRQ2c=;ORg4AjUWIQA/Gnt2VVhkQlFacldJXnxIeEx0RWFab116d1ZMZVtBNQtUQF1hSn5Rd0FjXHpedXBSQ2le;MTEyNjIzMUAzMjMwMmUzNDJlMzBoZXFNMlV2TWpFRk0vWW1OME95dWVlb1VRNlRjT1pDTXBTdU1wK3J3SUo4PQ==;MTEyNjIzMkAzMjMwMmUzNDJlMzBoZUZSV2FEUm5rUVVrMGJvZ0svaWNqNnRINVkvbEJTY3pScnZhbVhHSCtBPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFtKVmBWf1VpR2NbfE5zflZFallWVAciSV9jS31TdERnWXpbcHFRTmFZUg==;MTEyNjIzNEAzMjMwMmUzNDJlMzBhSG1ZZVhoQXcyRU1uZ3BQTXdmREdWVHVoc1lMQ1dGNnR4THFxTU0xNHMwPQ==;MTEyNjIzNUAzMjMwMmUzNDJlMzBOdXcrazRNTnFEenJUWU9WM2M1OVJ3OWNGNHdBb0NmSlhUNFkwcUNwa0Y4PQ==;Mgo+DSMBMAY9C3t2VVhkQlFacldJXnxIeEx0RWFab116d1ZMZVtBNQtUQF1hSn5Rd0FjXHpedXBdQWFU;MTEyNjIzN0AzMjMwMmUzNDJlMzBZYTdIZk1wcTJpaFZwZVhOSC9YSXJSTUd1UUJ4VFh2SVBKcEMzN0tNMWlvPQ==;MTEyNjIzOEAzMjMwMmUzNDJlMzBmc0x1dkxBOG1YNnVmK2JZa0E1ampGNEJUY3NjTEVSRExWdnhMZk5TZDFZPQ==;MTEyNjIzOUAzMjMwMmUzNDJlMzBhSG1ZZVhoQXcyRU1uZ3BQTXdmREdWVHVoc1lMQ1dGNnR4THFxTU0xNHMwPQ==');


const root = ReactDOM.createRoot(document.getElementById("root"));
injectStore(store);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

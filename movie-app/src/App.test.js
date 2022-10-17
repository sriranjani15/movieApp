import React from "react";
import ReactDOM from "react-dom/client";
import {render,screen} from '@testing-library/react';
import App from "./App";
import { Provider } from 'react-redux';
import { store } from "./features/Store";

test('renders learn react link',async()=>{
    render(
        <Provider store={store}>
           <App />
        </Provider>
    );
});
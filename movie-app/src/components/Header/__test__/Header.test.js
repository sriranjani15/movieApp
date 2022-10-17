import React from "react";
import ReactDOM from "react-dom/client";
import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from '../Header';
import { Provider } from 'react-redux';
import { store } from "../../../features/Store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import watch from "../../images/watch.png";
test('renders learn react link',async()=>{
    render(
    <Provider store={store}>
        <Router>
        <Header></Header>
        </Router>
    </Provider>);
    const headingElement = screen.getByText(/movie app/i);
    expect(headingElement).toBeInTheDocument();
});
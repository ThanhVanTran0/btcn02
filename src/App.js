import React from 'react';

import Navbar from './components/Navbar'
import List from './components/List'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <List />
            </div>
        );
    }
}
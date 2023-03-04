import React from 'react';
import AddSpice from './AddSpice';
import Spices from './Spice';

const Home = (props) => {
    const { showAlert } = props;

    return (
        <div>
            <div className='container' style={{ width: '80%' }}>
                <Spices showAlert={ showAlert }/>
            </div>
            <AddSpice showAlert={ showAlert }/>
        </div>
    );
};

export default Home;
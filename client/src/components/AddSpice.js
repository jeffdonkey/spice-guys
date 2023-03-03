import React, { useContext, useState } from 'react';
import SpiceContext from '../context/SpiceContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const AddSpice = (props) => {
    const context = useContext(SpiceContext);
    const { addSpice } = context;

    const [spice, setSpice] = useState({
        name: '',
        description: '',
        image: '',
    });

    const onChange = (e) => {
        setSpice({
            ...spice,
            [e.target.name]: e.target.value
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        addSpice(spice.name, spice.description, spice.image);
        setSpice({ name: '', description: '', image: '' });
        props.showAlert('Added new spice successfully', 'success');
    };

    return (
        <Container className='my-3' style={{ width: '80%' }}>
            <h2>Add a Spice</h2>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>Spice Name</Form.Label>
                    <Form.Control type='text' value={ spice.name } id='name' name='name' aria-describedby='emailHelp' minLength={ 2 } required onChange={ onChange } />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Content</Form.Label>
                    <Form.Control type='text' as='textarea' style={{ height: '130px' }} id='description' name='description' value={ spice.description } onChange={ onChange } />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type='text' id='image' name='image' value={ spice.image } onChange={ onChange } />
                </Form.Group>
                <Button type='submit' variant='primary' onClick={ handleClick }>Save Spice</Button>
            </Form>
        </Container>
    );
};


export default AddSpice;
import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({
        title: '',
        description: '',
        tag: '',
    });

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' });
        props.showAlert('Added new note successfully', 'success');
    };

    return (
        <Container className='my-3' style={{ width: '80%' }}>
            <h2>Add a Note</h2>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' value={ note.title } id='title' name='title' aria-describedby='emailHelp' minLength={ 2 } required onChange={ onChange } />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Content</Form.Label>
                    <Form.Control type='text' as='textarea' style={{ height: '130px' }} id='description' name='description' value={ note.description } onChange={ onChange } />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Tags/Keywords</Form.Label>
                    <Form.Control type='text' id='tag' name='tag' value={ note.tag } onChange={ onChange } />
                </Form.Group>
                <Button type='submit' variant='primary' onClick={ handleClick }>Save Note</Button>
            </Form>
        </Container>
    );
};


export default AddNote;
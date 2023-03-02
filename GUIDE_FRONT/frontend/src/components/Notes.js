import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import NoteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Container';


const Notes = (props) => {
    let navigate = useNavigate();

    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if(localStorage.getItem('authToken')) {
            getNotes();
        }
        else {
            navigate('/login');
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({
        eid: '',
        etitle: '',
        edescription: '',
        etag: ''
    });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            eid: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    };

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };

    const handleClick = (e) => {
        refClose.current.click();
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        props.showAlert('Note updated successfully!', 'success');
    };

    return (
        <>
            <div>
                <Button type="button" ref={ ref } className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </Button>
                <Modal className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className='modal-dialog'>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <Button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                            </div>
                            <div className="modal-body">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Edit Title</Form.Label>
                                        <Form.Control type="text" minLength={ 3 } required  id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={ onChange } />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Edit Content</Form.Label>
                                        <Form.Control type="text" as='textarea' style={{ height: '100px' }} id="edescription" name="edescription" value={ note.edescription } onChange={ onChange } />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Edit Tags/Keywords</Form.Label>
                                        <Form.Control type="text" id="etag" name="etag" value={ note.etag } onChange={ onChange } />
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="modal-footer">
                                <Button ref={ refClose } variant="secondary" data-bs-dismiss="modal">Close</Button>
                                <Button variant='primary' disabled={ note.etitle.length < 3 } onClick={ handleClick }>Update Note</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className='row my-3'>
                        <h2>Your Notes</h2>
                        { notes.length === 0 && 'No Notes to display' }
                        { notes.map((note) => {
                            return <NoteItem key={ note._id } updateNote={ updateNote } showAlert={ props.showAlert } note={ note } />
                        }) }
                </div>
            </div>
        </>
    )
};

export default Notes;
import React, { useContext, useEffect, useRef, useState } from 'react'
import SpiceItem from './SpiceItem';
import SpiceContext from '../context/SpiceContext';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Container';


const Spices = (props) => {
    let navigate = useNavigate();

    const context = useContext(SpiceContext);
    const { spices, getSpices, editSpice } = context;

    useEffect(() => {
        if(localStorage.getItem('authToken')) {
            getSpices();
        }
        else {
            navigate('/login');
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const [spice, setSpice] = useState({
        eid: '',
        ename: '',
        edescription: '',
        eimage: ''
    });

    const updateSpice = (currentSpice) => {
        ref.current.click();
        setSpice({
            eid: currentSpice._id,
            ename: currentSpice.name,
            edescription: currentSpice.description,
            eimage: currentSpice.image
        });
    };

    const onChange = (e) => {
        setSpice({
            ...spice,
            [e.target.name]: e.target.value
        });
    };

    const handleClick = (e) => {
        refClose.current.click();
        editSpice(spice.eid, spice.ename, spice.edescription, spice.eimage);
        props.showAlert('Spice updated successfully!', 'success');
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
                                <h5 className="modal-title" id="exampleModalLabel">Edit Spice</h5>
                                <Button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                            </div>
                            <div className="modal-body">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Edit Spice Name</Form.Label>
                                        <Form.Control type="text" minLength={ 3 } required  id="ename" name="ename" value={spice.ename} aria-describedby="emailHelp" onChange={ onChange } />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Edit Content</Form.Label>
                                        <Form.Control type="text" as='textarea' style={{ height: '100px' }} id="edescription" name="edescription" value={ spice.edescription } onChange={ onChange } />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Edit Image URL</Form.Label>
                                        <Form.Control type="text" id="eimage" name="eimage" value={ spice.eimage } onChange={ onChange } />
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="modal-footer">
                                <Button ref={ refClose } variant="secondary" data-bs-dismiss="modal">Close</Button>
                                <Button variant='primary' disabled={ spice.ename.length < 3 } onClick={ handleClick }>Update Spice</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <div className='row my-3'>
                        <h2>Your Spices</h2>
                        { spices.length === 0 && 'No Spices to display' }
                        { spices.map((spice) => {
                            return <SpiceItem key={ spice._id } updateSpice={ updateSpice } showAlert={ props.showAlert } spice={ spice } />
                        }) }
                </div>
            </div>
        </>
    )
};

export default Spices;
import React, { useContext } from 'react';
import SpiceContext from '../context/SpiceContext';
import Accordion from "react-bootstrap/Accordion";


const SpiceItem = (props) => {
    const context = useContext(SpiceContext);
    const { deleteSpice } = context;
    const { spice, updateSpice } = props;

     
    return (
        <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="1">
                <Accordion.Header style={{ fontWeight: "bold" }}>{ spice.title }</Accordion.Header>
                <Accordion.Body>
                    <p>{ spice.description }</p>
                    {/* Clicking on the trashcan icon will call the delete function and pass the spice id 
                    of that particular spice. We are getting the spice id as each and every element(object)
                    represents a card which has its id,t,d,tag*/}
                    <i className="fas fa-trash mx-2"
                        onClick={ () => {
                            deleteSpice(spice._id);
                        props.showAlert("Deleted succesfully", "success");
                        } }
                    ></i>
                    <i className="fas fa-edit mx-2"
                        onClick={ () => {
                            updateSpice(spice);
                        } }
                    ></i>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default SpiceItem
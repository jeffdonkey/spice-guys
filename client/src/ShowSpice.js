import React from 'react'
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowSpice() {
    return (
        <Card className="bg-dark text-dark">
            <Card.Img src="https://place-puppy.com/200x200" alt="Card image" />
            <Card.ImgOverlay>
                <Card.Title>InstaClone!  Cloned Food!  Delivered!</Card.Title>
                <Card.Text>
                    Dogs are not food just cute.
                </Card.Text>
            </Card.ImgOverlay>
        </Card>
    )
}

export default ShowSpice
import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import ReactPlayer from "react-player";
import {Col, Row, Container, Button, Table} from "react-bootstrap";
import logo from "../netflix.png"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";

const VideoDetails = (props) => {
    const {videoId} = useParams();
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState([]);
    const [video, setVideo] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8762/video/videoId/${videoId}`)
            .then(res => {
                setVideo(res.data);
                setLoading(false);
            })
            .catch(onerror => console.log(onerror))
    }, []);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8762/video/recommendations/${videoId}`)
            .then(response => {
                setRecommendations(response.data);
                setLoading(false);
            }).catch(onerror => console.log(onerror))
    }, [])

    const handleAddForm = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8762/video/recommendation/${videoId}`, {comment, rating, username})
        window.location.reload();
    };

    const recommendationsToDisplay = recommendations.map(recommendation => (
            <tr key={recommendation.id}>
                <td>
                    {recommendation.comment}
                </td>
                <td>
                    {recommendation.rating}
                </td>
                <td>
                    {recommendation.username}
                </td>
            </tr>
        ))


    return (
        <div>
        <img src={logo} className="video-details-logo" alt="logo" />
        <Container className="video-details">

            <div style={{textAlign: "center", marginBottom: "60px"}}>
                <h4>
                    <strong>{video.name}</strong>
                </h4>
            </div>
            <Row>
                <Col>
                    <ReactPlayer url={video.url} />
                </Col>
                <Col className="add-recommendation">
                    <Row>
                        <h5>
                        <strong>Send a recommendation: </strong>
                    </h5>
                    </Row>
                    <Form onSubmit={handleAddForm}>
                        <Row>
                            <input
                                style={{marginTop: "20px"}}
                                placeholder="Enter your name..."
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Row>
                        <Row>
                            <textarea
                                style={{marginTop: "20px"}}
                                placeholder="Leave a comment..."
                                type="text"
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)} />
                        </Row>
                        <Row style={{marginTop: "30px"}}>
                            <select className="button" value={rating} onChange={(event => setRating(event.target.value))}>
                                <option aria-label="None" value="">Rating</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <button className="button" type="submit">Submit</button>
                            <Link to={`/`}><button className="button">Go back</button></Link>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col style={{marginTop: "60px", marginRight: "22px"}}>
                {recommendations.length === 0 ? `No recommendations for ${video.name}` : (
                    <Table responsive="md" striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Comment</th>
                        <th>Rating</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recommendationsToDisplay}
                    </tbody>
                </Table>
                )}
</Col>
            </Row>
        </Container>
            </div>
    )
}
export default VideoDetails;
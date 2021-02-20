import React, {useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { Link } from "react-router-dom";


const Video = () => {

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:8762/video")
            .then(response => {
                setVideos(response.data);
                setLoading(false);
            })
    }, []);

    const contentToDisplay =
        loading ? <tr><td>loading...</td></tr>
        : videos.map((clip) => (
            <tr key={clip.id}>
                <td>
                    {clip.id}
                </td>
                <td>
                   <Link data={videos} to={`/video/${clip.id}`}>{clip.name}</Link>
                </td>
            </tr>
        ))

    return(
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>COOL VIDEOS</th>
            </tr>
            </thead>
            <tbody>
            {contentToDisplay}
            </tbody>
        </Table>
    )
}
export default Video;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ScreenShots from "../components/ScreenShots";

function ViewGame() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState({
    id: "",
    title: "",
    thumbnail: "",
    status: "",
    short_description: "",
    description: "",
    genre: "",
    platform: "",
    publisher: "",
    developer: "",
    release_date: "",
    minimum_system_requirements: "",
    screenshots: [],
  });
  var options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
    params: { id: id },
    headers: {
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      "x-rapidapi-key": "09442987e3mshf22d71033cab6ecp16a7c8jsnd854e5ca5186",
    },
  };

  useEffect(() => {
    const getGame = async () => {
      const data = await axios.request(options);
      setGame({
        id: data.data.id,
        title: data.data.title,
        thumbnail: data.data.thumbnail,
        status: data.data.status,
        short_description: data.data.short_description,
        description: data.data.description,
        genre: data.data.genre,
        platform: data.data.platform,
        publisher: data.data.publisher,
        developer: data.data.developer,
        release_date: data.data.release_date,
        minimum_system_requirements: data.data.minimum_system_requirements,
        screenshots: data.data.screenshots,
      });
      setLoading(false);
    };
    getGame();
  }, []);

  return (
    <Container className="mt-4">
      {loading ? (
        <center>
          <Spinner animation="border" variant="primary" />
        </center>
      ) : (
        <div>
          <Row>
            <Col md={8} xs={12}>
              <ScreenShots images={game.screenshots} />
              <p className="mt-3 lead" style={{textAlign: 'justify'}}>{game.short_description}</p>
            </Col>
            <Col md={4} xs={12}>
              <h2 className="display-6">{game.title}</h2>
              <p className="fw-bold fs-5 text-primary mb-4">{game.publisher}</p>
              <p className="text-muted lh-1">Platform: {game.genre}</p>
              <p className="text-muted lh-1 mb-4">Genre: {game.platform}</p>
              <Button className="w-100 btn-lg">Download</Button>
            </Col>
          </Row>
          <Row>
            <Col md={8} xs={12} className="mb-4 clearfix mt-4">
              <h3 className="mb-3">Game Description</h3>
              <Image src={game.thumbnail} fluid className="col-md-6 float-md-end mb-3 ms-md-3"/>
              <p style={{textAlign: 'justify'}}>{game.description}</p>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
}

export default ViewGame;

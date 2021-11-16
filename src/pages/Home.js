import React, { useEffect, useState } from "react";
import axios from "axios";
import GameItem from "../components/GameItem";
import {
  Button,
  Container,
  Alert,
  Spinner,
  Form,
  Row,
  Col,
} from "react-bootstrap";

function Home() {
  const count = 20; // Item count to show

  // Base states
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(count);
  const [total, setTotal] = useState(0);
  const [hideLoad, setHideLoad] = useState(false);

  // Filter state
  const [sort, setSort] = useState("popularity");

  // Options for fetching data
  var options = {
    method: "GET",
    url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
    params: { "sort-by": sort },
    headers: {
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      "x-rapidapi-key": "09442987e3mshf22d71033cab6ecp16a7c8jsnd854e5ca5186",
    },
  };

  // Fetch games
  const getGames = async () => {
    const data = await axios.request(options);
    setGames(data.data);
    setTotal(data.data.length);
    setLoading(false);
  };
  useEffect(() => {
    getGames();
  }, []);

  // Load more button logic
  const loadMore = () => {
    if (page >= total) {
      setHideLoad(true);
    } else {
      setPage(page + count);
    }
  };

  const changeSort = (e) => {
    setSort(e.target.value);
  };

  const handleSort = () => {
    setLoading(true);
    getGames();
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col md={1} xs={0}>
          Sort by
        </Col>
        <Col md={9} xs={8}>
          <Form.Select value={sort} onChange={(e) => changeSort(e)}>
            <option value="popularity">Popularity</option>
            <option value="relevance">Relevance</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="release-date">Realease date</option>
          </Form.Select>
        </Col>
        <Col md={2} xs={4}>
          <Button type="button" className="w-100" onClick={handleSort}>
            Sort
          </Button>
        </Col>
      </Row>

      {loading ? (
        <center>
          <Spinner animation="border" />
        </center>
      ) : (
        <div>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mb-4">
            {games.slice(0, page).map((game, index) => {
              return (
                <GameItem
                  key={index}
                  id={game.id}
                  title={game.title}
                  thumbnail={game.thumbnail}
                  genre={game.genre}
                  platform={game.platform}
                />
              );
            })}
          </div>
          <Row>
            <Col xs={6} md={8} lg={10}>
              {!hideLoad && (
                <Button
                  className="w-100 mb-4"
                  variant="primary"
                  onClick={loadMore}
                >
                  Load more
                </Button>
              )}
            </Col>
            <Col xs={6} md={4} lg={2}>
              <Button
                variant="outline-primary"
                className="w-100"
                onClick={() => window.scrollTo(0, 0)}
              >
                Back to top
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
}

export default Home;

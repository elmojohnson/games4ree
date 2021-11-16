import React from "react";
import {useNavigate} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function GameItem({ id, title, thumbnail, genre, platform }) {

    const navigate = useNavigate()

    const viewGame = () => {
        navigate(`/${id}`)
    }

  return (
    <div className="col" onClick={viewGame}>
      <div className="card h-100 border-0 shadow pointer upsize">
        <LazyLoadImage src={thumbnail} className="card-img-top" effect="blur" />
        <div className="card-body text-center">
        <p className="card-title">{title}</p>
        <p className="small text-muted">{genre}</p>
        </div>
        <div className="card-footer border-0 small text-muted">{platform}</div>
      </div>
    </div>
  );
}

export default GameItem;

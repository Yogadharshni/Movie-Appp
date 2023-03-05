import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import CardActions from '@mui/material/CardActions';



export function Counter() {
  const [like, setLike] = useState(0);
  const [dislike, seDistLike] = useState(0);
  return (
    <div className="like-dislike">
      <CardActions>
        <IconButton onClick={() => setLike(like + 1)} aria-label="delete" color="primary">
          <Badge badgeContent={like} color="primary">❤️</Badge>
        </IconButton>
        <IconButton onClick={() => seDistLike(dislike + 1)} aria-label="delete" color="error">
          <Badge badgeContent={dislike} color="error">👎</Badge>
        </IconButton>
      </CardActions>
    </div>
  );
}

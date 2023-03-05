import { useState } from 'react';

// event.target.value ==> to get value from input(in event)
export function Input() {

  const [color, setColor] = useState('pink');
  const styles = {
    background: color
  };
  const [list, setList] = useState(['black', 'crimson', 'blue']);
  return (
    <div>
      <input
        style={styles}
        type='text'
        onChange={(event) => setColor(event.target.value)}
        value={color} />{" "}
      <button onClick={() => setList([...list, color])}>Add Color</button>
      {list.map((cl) => (
        <Colorbox color={cl} />
      ))}

    </div>
  );
}
function Colorbox({ color }) {
  const styles = {
    height: '25px',
    width: '350px',
    margin: '5px 0px',
    background: color,
  };
  return <div style={styles}></div>;
}

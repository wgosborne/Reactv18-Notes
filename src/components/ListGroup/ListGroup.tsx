import { MouseEvent, useState } from "react";
import "./ListGroup.module.css";

interface Props {
  //lays out the shape of what we are passing around
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void; //function that takes in a string and does not return anything
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  //passing in from app.tsx

  const [selectedIndex, setSelectedIndex] = useState(0); //starting selectedIndex @ -1

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items to display</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;

//NOTES

//Fragment
//import { Fragment } from 'react'; //allows us to return multiple elements without needing a wrapper div
//we dont even need fragment we can just wrap with empty tags and react will know to use fragment

//EVENT HANDLER
//type annotation is the : MouseEvent that specifies the type to expect (this is typescript)
//   const handleClick = (event: MouseEvent) => {
//     console.log(event);
//   };

//Hooks
//   const array = useState(-1); //useState returns an array
//   array[0] //variable (selectedIndex)
//   array[1] //updater function

//Ternary Opertaors
//items.length === 0 ? <p>No Items to Display</p> : null is the same as items.length === 0 && <p>No items to display</p>

//Keys
//usually key will be something like item.id

//Vanilla Styling
//import styles from"./ListGroup.module.css"; //usually use dot notation to access each thing but if there is a hyphen...
//we must use brackets. To do multiple, pop them in an array and use join(' ')
//we use module in the styles because vite will use its own private name and make sure theres no clashing
// import "./ListGroup.module.css";
/* <ul className={[styles.listGroup, styles.container].join(" ")}> */
// <li
// className={
//   selectedIndex === index
//     ? "list-group-item active"
//     : "list-group-item"
// }
/* </li> */
/* </ul> */

//CSS IN JS
// import styled from "styled-components";
// interface ListItemProps {
//   active: boolean;
// }
// const List = styled.ul`
//   list-style: none;
//   padding: 0;
// `;
// const Item = styled.li<ListItemProps>`
//   padding: 5px 0;
//   background: ${(props) => (props.active ? "blue" : "none")};
// `;
// <List>
//   {items.map((item, index) => (
//     <Item
//       active={index === selectedIndex}
//       key={item}
//       onClick={() => {
//         setSelectedIndex(index);
//         onSelectItem(item);
//       }}
//     >
//       {item}
//     </Item>
//   ))}
// </List>;

//Inline Styling
//Bad practice so make it the last resort
//<ul className="list-group" style={{ backgroundColor: 'yellow'}}></ul>

import React from 'react'

interface Props {
    count: number
}

const NavBar = ({ count}: Props) => {
  return (
    <div>NavBar: {count}</div>
  )
};

export default NavBar;

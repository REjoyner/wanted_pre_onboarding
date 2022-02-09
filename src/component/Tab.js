import { useState } from 'react';
import styled from 'styled-components';

const TabMenu = styled.ul`
  background-color: #dcdcdc;
  color: rgba(73, 73, 73, 0.5);
  text-shadow: 0 0 2px #515151;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  margin-bottom: 7rem;
  line-height: 55px;
  text-align: center;

  .submenu {
    width: 170px;
    height: 50px;
  }

  .focused {
    background-color: #4000c7;
    color: white;
    text-shadow: 1.2px 1.2px #bbb;
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  text-align: center;
`;

export const Tab = () => {
  const [curTab, setcurTab] = useState(0)

  const menuArr = [
    { name: 'Tab1', content: 'Tab menu ONE' },
    { name: 'Tab2', content: 'Tab menu TWO' },
    { name: 'Tab3', content: 'Tab menu THREE' },
  ];

  const selectMenuHandler = (index) => {
    setcurTab(index)
  };

  return (
    <div>
      <TabMenu>
        {menuArr.map((el, index) => {
          return (
            <li 
              className={`submenu${index === curTab ? ' focused' : ''}`}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          )
        })}
      </TabMenu> 
      <Desc>
        <p>{menuArr[curTab].content}</p>
      </Desc>
    </div>
  );
};
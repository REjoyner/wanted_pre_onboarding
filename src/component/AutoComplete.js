import { useState, useEffect } from 'react';
import styled from 'styled-components';

const deselectedOptions = [
  'rustic',
  'antique',
  'vinyl',
  'vintage',
  'refurbished',
  'refresh',
  'restart',
  '신품',
  '빈티지',
  '중고A급',
  '중고B급',
  '골동품'
];

const boxShadow = '0 4px 6px rgb(32 33 36 / 28%)';
const activeBorderRadius = '1rem 1rem 0 0';

export const InputContainer = styled.div`
  margin-top: 8rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border: 1px solid rgb(223, 225, 229);
  border-radius: ${activeBorderRadius};
  z-index: 3;
  box-shadow: 0;

  &:focus-within {
    box-shadow: ${boxShadow};
  }

  > input {
    flex: 1 0 0;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    font-size: 16px;
  }

  > div.delete-button {
    cursor: pointer;
  }
`;

export const DropDownContainer = styled.ul`
  background-color: #ffffff;
  display: block;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  margin-top: -1px;
  padding: 0.5rem 0;
  border: 1px solid rgb(223, 225, 229);
  border-radius: 0 0 1rem 1rem;
  box-shadow: ${boxShadow};
  z-index: 3;

  > li {
    padding: 0 1rem;
    cursor: pointer;
  }
  li:hover {
    background-color: whitesmoke;
  }
  > li.color {
    background-color: #dcdcdc;
  }
  :focus {
    background-color: whitesmoke;
  }
`;

export const AutoComplete = () => {
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);
  const [chosen, setChosen] = useState(-1);

  useEffect(() => {
    if (inputValue === '') {
      setHasText(false);
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
    setHasText(true)
    setOptions(deselectedOptions.filter(el => el.startsWith(event.target.value)))
  };

  const handleDropDownClick = (clickedOption) => {
    setInputValue(clickedOption)
    setOptions([clickedOption])
  };

  const handleDeleteButtonClick = () => {
    setInputValue('')
  };

  const handleKeyUp = (event) => {
    if (hasText) {
      if (event.key === 'ArrowDown' && options.length - 1 > chosen) {
        setChosen(chosen + 1);
      }
      else if (chosen === options.length - 1) {
        setChosen(0)
      }
      if (event.key === 'ArrowUp' && chosen >= 0) {
        setChosen(chosen - 1);
        if(chosen === 0) {
          setChosen(options.length - 1)
        }
      }
      if (event.key === 'Enter' && chosen >= 0) {
        handleDropDownClick(options[chosen]);
        setChosen(-1);
      }
    }
  };


  return (
    <div className='autocomplete-wrapper' onKeyUp={handleKeyUp}>
      <InputContainer>
        <input type='text' value={inputValue} onChange={handleInputChange} />
        <div className='delete-button' onClick={handleDeleteButtonClick}>&times;</div>
      </InputContainer>
      {hasText ? <DropDown handleComboBox={handleDropDownClick} options={options} chosen={chosen}/> : null}
    </div>
  );
};

export const DropDown = ({ options, handleComboBox, chosen }) => {
  return (
    <DropDownContainer>
      {options.map((el, idx)=> {
        return <li key={idx} onClick={() => handleComboBox(el)} 
        className={chosen === idx ? 'color' : ''}>{el}</li>
      })}
    </DropDownContainer>
  );
};

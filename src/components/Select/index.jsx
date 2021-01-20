import React from 'react';

const Select = ({filter, onChangeSelectorHandler, options, name}) => {
    return (
        <select
            className="form-control"
            value={filter}
            onChange={onChangeSelectorHandler}
            id={name}
            name={name}
        >
            {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
        </select>
    );
};

export default Select;
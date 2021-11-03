import React from 'react';

interface NumberUpDownProps {
    up: () => void;
    down: () => void;
}
const NumberUpDown = ({
    down, up
}: NumberUpDownProps) => {
    return <div className="price-up-down">
        <i onClick={up} className="online-icon-angel-up d-block"></i>
        <i onClick={down} className="online-icon-angel-down d-block"></i>
    </div>;
};

export default NumberUpDown
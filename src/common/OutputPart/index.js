import React from 'react';

const OutputPart = (props) => {
    return (
        <div className='row-spacebetween-start'>
            <div className='left'>
                <label>原被告主张</label>
            </div>
            <div className='row-spacebetween-center right'>
                <div className='box'>原告主张</div>
                <div className='box'>被告主张</div>
            </div>
        </div>
    )
};

export default OutputPart;

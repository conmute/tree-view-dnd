import React from 'react';
import PropTypes from 'prop-types';

const DragImage = ({ count }) => (
  <div style={{ paddingLeft: '7px' }}>
    <div style={{
      width: '24px',
      height: '22px',
      lineHeight: '24px',
      borderRadius: '4px',
      backgroundColor: '#ccc',
      textAlign: 'center',
    }}>
      {count}
    </div>
  </div>
);

DragImage.propTypes = {
  count: PropTypes.number.isRequired
};

export default DragImage;

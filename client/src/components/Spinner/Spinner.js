import React, { useState } from 'react';
import { css } from '@emotion/core';
import FadeLoader from 'react-spinners/FadeLoader';

const override = css`
  margin: 0 auto;
  position: relative;
`;

const Spinner = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className='sweet-loading'>
      <FadeLoader
        css={override}
        size={75}
        color={'#123abc'}
        loading={setLoading}
      />
    </div>
  );
};

export default Spinner;

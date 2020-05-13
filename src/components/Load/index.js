
import React, { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.less';

const Loading = memo(({
  text, background, color, close
}) => {
  const loadRef = useRef();

  useEffect(() => {
    if (close) {
      return; 
    }
    const el = loadRef.current;
    const parentEl = el.parentNode;
    const { position } = window.getComputedStyle(parentEl);
    if (position === 'absolute' || position === 'relative') {
      parentEl.style.position = position;
    } else {
      parentEl.style.position = 'relative';
    }
    return () => {
      parentEl.style.position = position;
    };
  }, [close]);
  if (close) {
    return null;
  }
  return (
    <div className='y-loading' ref={loadRef} style={{ backgroundColor: background, color }}>
      <div aria-busy='true' aria-label='Loading' role='progressbar' className='container'>
        <div className='dot-carousel' />
        {
          text && (
            <p className='loading-text'>
              {text}
            </p>
          )
        }
      </div>
    </div>
  );
});

Loading.propTypes = {
  text: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  close: PropTypes.bool
};

Loading.defaultProps = {
  close: false,
  text: '',
  background: '',
  color: 'rgba(0,0,0,.7)'
};

export default Loading;

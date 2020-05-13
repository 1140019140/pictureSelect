import React, {
  memo, useEffect, useRef, useMemo
} from 'react';
import PropTypes from 'prop-types';
import { noop } from 'utils/index';
import './index.less';
import { toVw } from 'utils/rem';

const loadImage = (image) => {
  image.setAttribute('src', image.dataset.src);
  image.addEventListener('load', () => {
    image.removeAttribute('data-src');
  });
};
const LazyImg = memo(({
  src, loaded, placeholder, size, ratio, loadingText, ...props
}) => {
  const io = useRef();
  const img = useRef();
  useEffect(() => {
    io.current = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if (item.isIntersecting) {
          loadImage(item.target);
          observer.unobserve(item.target);
        }
      });
    });
    io.current.observe(img.current);
    // return () => {
    //   intersectionObserver.unobserve(img.current);
    //   intersectionObserver = null;
    // };
  }, []);

  const aspectRatio = useMemo(() => {
    if (size.height && size.width) {
      return `100:${Math.floor(size.width / size.height * 100)}`;
    }
    return `100:${Math.floor(ratio * 100)}`;
  }, [size.height, size.width, ratio]);
  return (
    <div
      style={{
        ...(size.height && size.width ? {
          height: toVw(size.height),
          width: toVw(size.width)
        } : {
          paddingBottom: `${ratio * 100}%`
        })
      }}
      className='lazyImgWrap'
    >
      <img
        ref={img}
        className='lazyImg'
        data-src={src}
        src={`${placeholder || `https://dummyimage.com/160x${aspectRatio}/e6e6e6/fff&text=${loadingText}`}`}
        alt=''
        {...props}
      />
    </div>
  );
});

LazyImg.propTypes = {
  src: PropTypes.string.isRequired,
  ratio: PropTypes.number,
  placeholder: PropTypes.string,
  loaded: PropTypes.func,
  size: PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
  }),
  loadingText: PropTypes.string
};
LazyImg.defaultProps = {
  size: {
    width: '',
    height: ''
  },
  ratio: 1, // 高度/宽度 * 100%
  loaded: noop,
  loadingText: 'Loading',
  placeholder: ''
};

export default LazyImg;

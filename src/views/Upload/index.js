import React, { useState } from 'react';
import PictureSelect from '@/components/PictureSelect';
const list = [
  {
    id: '0',
    checked: false,
    url: '',
    name: '全选'
  },
  {
    id: '1',
    checked: true,
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
  },
  {
    id: '2',
    checked: false,
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
  },
  {
    id: '3',
    checked: false,
    url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
  }
];

const Page = () => {
  const [value, setValue] = useState(['1']);
  const pictures = list; // 
  console.log(value); // 输出用户选择图片 id。
    
  return <PictureSelect pictures={pictures} value={value} onChange={(value) => setValue(value)} />;
};

export default Page;
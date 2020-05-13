/* eslint-disable jsx-quotes */
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import './index.less';

const PictureSelect = (props, ref) => {
  const [ list ] = useState(props.pictures);
  useImperativeHandle(ref, () => {
    return {
    };
  });
  const onCheck = (item) => {
    item.checked = !item.checked;
    if (item.name === '全选') { // 如果点击的是全选，就把所有的选中或全部取消勾选
      if (item.checked) {
        list.forEach(i => {
          i.checked = true;
        });
      } else {
        list.forEach(i => {
          i.checked = false;
        });
      }
    }
    // 如果全选之后，取消勾选其中的一个或多个，则会把全选也取消勾选掉
    let result = list.some(j => {
      if (!j.checked) {
        return true;
      }
      return j;
    });
    if (result) { 
      list[0].checked = false;
    }
    
    let len = list.length;
    let ev = true;
    for (let a = 1; a < len; a++) {
      if (!list[a].checked) {
        ev = false;
      }
    }
    if (ev) {
      list[0].checked = true;
    }
    const ids = []; // 存放勾选中的id集合
    for (let item of list) {
      if (item.checked === true && item.id !== '0') {
        ids.push(item.id);
      }
    }
    props.onChange([...ids]);
  };

  return (
    <div className='container'>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <label><input type="checkbox" onChange={() => onCheck(item)} checked={item.checked}/>{item.name}{item.name === '全选' ? `已选${props.value.length}个文件` : '' }</label>
            <img alt='' src={item.url}></img>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default forwardRef(PictureSelect);
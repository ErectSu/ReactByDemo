import React, { useLayoutEffect } from 'react';

const bread = [
  {
    name: '会员卡设置',
  }
]

function MembercardSettingList(props) {
  useLayoutEffect(_ => {
    props.bread(bread);
  }, [props])

  return <div>123</div>
}

export default MembercardSettingList;
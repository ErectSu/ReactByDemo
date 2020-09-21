import React, { useCallback } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { useHistory } from 'react-router-dom';

interface MenuV {
  isShow: number;
  menuId: number;
  menuName: string;
  children: MenuA;
}

type MenuA = MenuV[];

interface OptionsProp {
  value: MenuA;
  onClick(p: any): any;
}

interface HeadProp {
  menu: MenuA;
  menuCheck: number;
  onChange(v: number): any;
}

// 下拉选项组件
function Options(props: OptionsProp) {
  return (
    <Menu
      onClick={props.onClick}
      selectable={false}
      theme="dark">
      {
        props.value.map(item => {
          return (
            item.isShow === 1 &&
            <Menu.Item key={item.menuId}>
              { item.menuName }
            </Menu.Item>
          );
        })
      }
    </Menu>
  );
}

function Head(props: HeadProp) {
  let history = useHistory();

  const onClick = useCallback((item, { key }) => { // 子选项跳转
    const { children, menuId } = item;
    props.onChange(menuId);

    let data = children.find((ele: MenuV) => ele.menuId.toString() === key);
    if (data?.menuUrl) {
      history.push(data.menuUrl);
    } else if (data.children?.length) {
      history.push(data.children[0].menuUrl);
    }
    // eslint-disable-next-line
  }, []);

  const onClickMenu = useCallback(item => { // 菜单跳转
    const { menuUrl, children, menuId } = item;
    props.onChange(menuId);

    if (menuUrl) {
      history.push(menuUrl);
    } else if (children?.length) {
      history.push(children[0].menuUrl);
    }
    // eslint-disable-next-line
  }, []);

  const toGithub = () => {
    window.open('https://github.com/WuhanReganmian/ReactByDemo');
  };

  return (
    <div className="headClass">
      <div className="headOption">
        <img src={process.env.PUBLIC_URL + '/assets/menu-logo-2.png'} alt="" />
        {
          (props.menu || []).map((item: MenuV, index: number) => {
            return (
              item.isShow === 1 &&
              (item.children ?
                <Dropdown
                  overlay={() => <Options onClick={key => onClick(item, key)} value={item.children} />}
                  placement="bottomLeft"
                  key={item.menuId}>
                  <div className={`menuItem ${item.menuId === props.menuCheck ? 'menuCheck' : ''}`} onClick={() => onClickMenu(item)}>{ item.menuName }</div>
                </Dropdown>
                : <div className={`menuItem ${item.menuId === props.menuCheck ? 'menuCheck' : ''}`} key={index} onClick={() => onClickMenu(item)}>{ item.menuName }</div>)
            );
          })
        }
      </div>
      <Button type="text" style={{ color: 'rgba(255, 255, 255, 0.6)' }} onClick={toGithub}>0.0</Button>
    </div>
  );
}

export default Head;

import React, { useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Nav, NavLink as ReactstrapNavLink, Button, Modal, ModalBody, ModalFooter, Input } from 'reactstrap';
import routePaths, { routePatterns } from 'router/route-paths';
import logo from 'assets/images/logo-white-mini.svg';
import CategoryDataService from 'services/CategoryDataService';
import cn from 'classnames';
import useLiveData from 'hooks/common/useLiveData';
// import { Categories } from 'collections';
import TodoDataService from 'services/TodoDataService';
import c from './Sidebar.module.scss';

const navItems = [
  {
    path: routePaths.home,
    icon: <i className="tim-icons icon-components" />,
    title: 'All',
  },
];

const useLiveCategories = () => {
  return useLiveData({
    getData: CategoryDataService.getAll,
    listen: CategoryDataService.listenChanges,
  });
};

// function onEdit(id, title) {
//   CategoryDataService.update(id, title);
// }

function Sidebar() {
  const categories = useLiveCategories();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };
  function onDelete(id) {
    const toDoItems = TodoDataService.getAll({ categoryId: id });
    toDoItems.map((toDoItem) => TodoDataService.remove(toDoItem._id));
    CategoryDataService.remove(id);
  }
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Button className="menu-button" onClick={handleToggle}>
        {navbarOpen ? 'Close' : 'Open'}
      </Button>
      <div className={cn('sidebar', navbarOpen ? 'showMenu' : '')}>
        <div className={cn('sidebar-wrapper', c.sidebarWrapper)}>
          <div className="logo">
            <Link className="simple-text logo-mini" to={routePaths.home}>
              <div className="logo-img" />
            </Link>
            <span className="simple-text logo-normal">Categories</span>
          </div>
          <Nav className={c.nav}>
            {navItems.map((route) => (
              <li key={route.path}>
                <NavLink to={route.path} className="nav-link" activeClassName="active">
                  {route.icon}
                  <p>{route.title}</p>
                </NavLink>
              </li>
            ))}
            {categories.map((category) => (
              <li key={category._id}>
                <NavLink
                  to={routePatterns.category.stringify({ categoryId: category._id })}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={category.iconClass || 'tim-icons icon-tag'} />
                  <p>{category.title}</p>
                  {category.readonly ? null : (
                    <div>
                      <Button
                        color="default"
                        onClick={() => {
                          onDelete(category._id);
                        }}
                      >
                        Del
                      </Button>
                      <Button color="default" onClick={toggle}>
                        Edit
                      </Button>
                      <div>
                        <Modal isOpen={modal} toggle={toggle}>
                          <ModalBody>
                            <Input value={value} style={{ color: '#111' }} onChange={onChange} />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="primary"
                              onClick={() => {
                                CategoryDataService.update(category._id, { title: value });
                                setModal(!modal);
                              }}
                            >
                              Change name
                            </Button>
                            <Button color="secondary" onClick={toggle}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </div>
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </Nav>
          <Nav className={c.bottomNav}>
            <li>
              <ReactstrapNavLink
                onClick={async () => {
                  const category = await CategoryDataService.insert({ title: 'Untitled' });
                  const path = routePatterns.category.stringify({ categoryId: category._id });
                  history.push(path);
                }}
              >
                <i className="tim-icons icon-simple-add" />
                <p>Add category</p>
              </ReactstrapNavLink>
            </li>
          </Nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

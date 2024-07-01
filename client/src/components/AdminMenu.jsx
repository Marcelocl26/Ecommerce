import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <nav className="mb-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 font-bold' : 'nav-link'
            }
          >
            Órdenes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 font-bold' : 'nav-link'
            }
          >
            Productos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminMenu;

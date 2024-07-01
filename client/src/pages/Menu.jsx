import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="mb-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              isActive ? 'text-blue-500 font-bold' : 'nav-link'
            }
          >
            Perfil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/purchases"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 font-bold' : 'nav-link'
            }
          >
            Compras
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/addresses"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 font-bold' : 'nav-link'
            }
          >
            Direcciones
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;

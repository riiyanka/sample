import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/builder" className="nav-link">Form Builder</NavLink>
        <NavLink to="/active-forms" className="nav-link">Active Forms</NavLink>
        <NavLink to="/analytics" className="nav-link">Analytics</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
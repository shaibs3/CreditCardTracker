/* global window */
import React from 'react';
import { Col, Nav, NavItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { store } from '../index';
import masterCardLogo from '../../master.png'
import visaLogo from '../../visa.png'
import dinerssLogo from '../../dinerss.png'
import amexLogo from '../../amex.png'

function getCardLogo(item)
{
  let isVisa = item.includes('Visa');
  if (isVisa)
  {
    return visaLogo;
  }

  let isAmex = item.includes('American');
  if (isAmex)
  {
    return amexLogo;
  }
  let isDinerss = item.includes('Dinerss');
  if (isDinerss)
  {
    return dinerssLogo;
  }

  let isMaster = item.includes('Master');
  if (isMaster)
  {
    return masterCardLogo;
  }

}

function creditCardsLinks()
{

  let appStore = store.getState();
  return appStore.member.cards.map(function (item, i)
  {
    return (
      <NavItem>
        <Link className={`nav-link`} to={`/cards/${item}`}>
          <img src={getCardLogo(item)} style={{ "marginRight": '0.4rem' }} height="23" width="23" ></img>
          {' '}
          <span>
            {item}
          </span>
        </Link>
      </NavItem>

    )
  })
}

const SidebarNavItems = () => (
  <div>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/recipe') && 'active'}`} to="/recipes">
        <i className="icon-notebook" />
        {' '}
        <span>
          Recipes
        </span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname === '/' && 'active'}`} to="/">
        <i className="icon-home" />
        {' '}
        <span>
          Home
        </span>
      </Link>
    </NavItem>
    {creditCardsLinks()}
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/create-new-credit-card') && 'active'}`} to="/create-new-credit-card">
        <i className="icon-notebook" />
        {' '}
        <span>
          add new card
        </span>
      </Link>
    </NavItem>
  </div>
);


const Sidebar = () => (
  <div>
    <Col sm="3" md="2" className="d-none d-sm-block sidebar">
      <Nav vertical>

        {SidebarNavItems()}
      </Nav>
    </Col>
  </div>
);

export { Sidebar, SidebarNavItems };

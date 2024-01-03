import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  LiaFileInvoiceDollarSolid,
  LiaMoneyBillAlt,
  LiaMoneyBillWaveAltSolid,
  LiaListAlt,
} from "react-icons/lia";
import { HiOutlineHome, HiOutlineCog6Tooth } from "react-icons/hi2";
import { SlPeople } from "react-icons/sl";
import { PiTruck } from "react-icons/pi";
import {
  MdOutlineDashboardCustomize,
  MdOutlineDashboard,
} from "react-icons/md";
import { useState } from "react";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const ClickableDiv = styled.div`
  //font-family: "Sono";
  display: flex;
  align-items: center;
  gap: 1.2rem;

  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;

  &:hover,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const NavListInner = styled.ul`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  gap: 0.8rem;
`;

const StyledNavLinkInner = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1rem;

    color: var(--color-grey-600);
    font-size: 1.3rem;
    font-weight: 500;
    padding: 0.8rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const [toggleDB, setToggleDB] = useState(false);
  function toggleDashBoard() {
    setToggleDB((toggleDB) => !toggleDB);
  }

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/home">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <ClickableDiv onClick={toggleDashBoard}>
            <MdOutlineDashboardCustomize />
            <span>Dashboard</span>
          </ClickableDiv>
        </li>
        {toggleDB && (
          <NavListInner>
            <li>
              <StyledNavLinkInner to="/quarters">
                <MdOutlineDashboard />
                <span>FY Quarters</span>
              </StyledNavLinkInner>
            </li>
            <li>
              <StyledNavLinkInner to="/invoicesStatus">
                <MdOutlineDashboard />
                <span>Invoices Aging</span>
              </StyledNavLinkInner>
            </li>
            <li>
              <StyledNavLinkInner to="/orderStatus">
                <MdOutlineDashboard />
                <span>Order Status</span>
              </StyledNavLinkInner>
            </li>
          </NavListInner>
        )}
        <li>
          <StyledNavLink to="/orders">
            <LiaListAlt />
            <span>Orders</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/invoices">
            <LiaFileInvoiceDollarSolid />
            <span>Invoices</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/pos">
            <LiaMoneyBillAlt />
            <span>Purchase Order</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/payableInvoices">
            <LiaMoneyBillWaveAltSolid />
            <span>Payable Invoices</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/costs">
            <LiaMoneyBillWaveAltSolid />
            <span>Other Costs</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/customers">
            <SlPeople />
            <span>Customers</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/suppliers">
            <PiTruck />
            <span>Suppliers</span>
          </StyledNavLink>
        </li>

        <li></li>
        <li></li>
        <li></li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;

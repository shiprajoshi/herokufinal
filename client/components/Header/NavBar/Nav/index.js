/* eslint-disable */
import React from 'react';
import { Link } from 'react-router';

export default () =>
  <nav className="collapse navbar-collapse" uib-collapse="!isCollapsed" role="navigation">
    {/*<ul className="nav navbar-nav">
      <li ng-repeat="item in menu.items | orderBy: 'position'" ng-if="item.shouldRender(authentication.user);" ng-switch="item.type" ng-className="{ active: $state.includes(item.state), dropdown: item.type === 'dropdown' }" className="{{item.class}}" uib-dropdown="item.type === 'dropdown'">
        <a ng-switch-when="dropdown" className="dropdown-toggle" uib-dropdown-toggle role="button">{{::item.title}}&nbsp;<span className="caret"></span></a>
        <ul ng-switch-when="dropdown" className="dropdown-menu">
          <li ng-repeat="subitem in item.items | orderBy: 'position'" ng-if="subitem.shouldRender(authentication.user);" ui-sref-active="active">
            <a ui-sref="{{subitem.state}}" ng-bind="subitem.title"></a>
          </li>
        </ul>
        <a ng-switch-default ui-sref="{{item.state}}" ng-bind="item.title"></a>
      </li>
    </ul>*/}
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
      <li className="divider-vertical"></li>
      <li>
        <Link to="/signin">Sign In</Link>
      </li>
    </ul>
    {/*<ul className="nav navbar-nav navbar-right" ng-show="authentication.user">
      <li className="dropdown" uib-dropdown>
        <a className="dropdown-toggle user-header-dropdown-toggle" uib-dropdown-toggle role="button">
          <img ng-src="{{authentication.user.profileImageURL}}" alt="{{authentication.user.displayName}}" className="header-profile-image" />
          <span ng-bind="authentication.user.displayName"></span> <b className="caret"></b>
        </a>
        <ul className="dropdown-menu" role="menu">
          <li ui-sref-active="active" ng-repeat="item in accountMenu.items">
            <a ui-sref="{{item.state}}" ng-bind="item.title"></a>
          </li>
          <li className="divider"></li>
          <li>
            <a href="/api/auth/signout" target="_self">Signout</a>
          </li>
        </ul>
      </li>
    </ul>*/}
  </nav>;

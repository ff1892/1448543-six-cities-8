import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { logoutAction } from '../../../store/api-actions/user/user';
import { getAuthorizationStatus, getUserInfo } from '../../../store/reducers/user-data/selectors';

function HeaderNavigation(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userInfo = useSelector(getUserInfo);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const dispatch = useDispatch();

  const handleSignOut = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={isAuthorized ? AppRoute.Favorites : AppRoute.SignIn}
          >
            { isAuthorized ?
              <div className="header__avatar-wrapper user__avatar-wrapper"
                style={{
                  backgroundImage: `url(${userInfo?.avatarUrl})`,
                  borderRadius: '50%',
                }}
              />
              : <div className="header__avatar-wrapper user__avatar-wrapper"/> }
            { isAuthorized ?
              <span className="header__user-name user__name">{userInfo?.email}</span>
              : <span className="header__login">Sign in</span> }
          </Link>
        </li>

        { isAuthorized &&
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              to="/"
              onClick={handleSignOut}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li> }
      </ul>
    </nav>
  );
}

export default HeaderNavigation;

import { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components';
import { actions, useAppSelector, useAppDispatch, types } from '@/model';
import { StyledNav, StyledNavLeft, StyledNavRight } from './styles';

const Header = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();
  const isReady = useAppSelector((state) => state.config.isReady);

  useEffect(() => {
    if (isReady) dispatch(actions.saveLanguageAsync(language as types.Language));
  }, [language]);

  const nav = useMemo(() => {
    const isHome = ['/', '/home'].includes(pathname);
    const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      changeLanguage(e.target.value);
    };

    return (
      <StyledNav>
        <StyledNavLeft>{isHome ? null : <Link to="/home">{t('home')}</Link>}</StyledNavLeft>
        <StyledNavRight>
          {isHome ? <Link to="/settings">{t('settings')}</Link> : null}

          <select name="language" id="language" onChange={onLanguageChange} value={language}>
            <option value="en">English</option>
            <option value="zh">繁體中文</option>
          </select>
        </StyledNavRight>
      </StyledNav>
    );
  }, [pathname, language]);

  return <header>{nav}</header>;
};

export default Header;

import React, { FC, useEffect } from 'react';
import Header from "app/shared/layout/header/header";
import { IWebsite } from "app/shared/model/website.model";
import { Route, RouteChildrenProps, Switch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "app/shared/reducers";
import { getEntitiesByWebsiteUrl } from "app/entities/page/page.reducer";
import DynamicPage from "app/modules/consumer/DynamicPage";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";

interface Params {
  websiteUrl: IWebsite['url'];
}

const Consumer: FC<RouteChildrenProps> = ({ match }) => {
  const { websiteUrl } = useParams<Params>();
  const { entities: pages, loading } = useSelector<IRootState, IRootState['page']>(state => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    if (websiteUrl) {
      dispatch(getEntitiesByWebsiteUrl(websiteUrl));
    }
  }, [websiteUrl]);

  if (!websiteUrl || !pages) {
    return null;
  }

  return (
    <>
      <Header />
      <Switch>
        {pages.map((page) =>(
          <Route path={`${match.url}/${page.url}`} key={page.id} exact>
            <DynamicPage page={page} />
          </Route>
        ))}
      </Switch>
    </>
  );
};

export default Consumer;

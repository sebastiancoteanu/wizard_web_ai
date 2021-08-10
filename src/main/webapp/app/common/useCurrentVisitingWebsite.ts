import { IWebsite } from 'app/shared/model/website.model';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { useEffect } from 'react';
import { getEntitiesByWebsiteUrl } from 'app/entities/page/page.reducer';
import { IPage } from 'app/shared/model/page.model';

interface Params {
  websiteUrl: IWebsite['url'];
}

interface ReturnData {
  pages: IPage[];
  loading: boolean;
}

type Hook = () => ReturnData;

const useCurrentVisitingWebsite = () => {
  const { websiteUrl } = useParams<Params>();
  const { entities: pages, loading } = useSelector<IRootState, IRootState['page']>(state => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    if (websiteUrl) {
      dispatch(getEntitiesByWebsiteUrl(websiteUrl));
    }
  }, [websiteUrl]);

  return {
    pages,
    loading,
  };
};

export default useCurrentVisitingWebsite;

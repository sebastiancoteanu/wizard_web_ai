import { IWebsite } from 'app/shared/model/website.model';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { useEffect } from 'react';
import { getEntitiesByWebsiteUrl } from 'app/entities/page/page.reducer';
import { IPage } from 'app/shared/model/page.model';
import { getEntityByUrl } from 'app/entities/website/website.reducer';

interface Params {
  websiteUrl: IWebsite['url'];
}

interface ReturnData {
  website: IWebsite;
  pages: IPage[];
  loading: boolean;
}

type Hook = () => ReturnData;

const useCurrentVisitingWebsite: Hook = () => {
  const { websiteUrl } = useParams<Params>();
  const { website, page } = useSelector<IRootState, IRootState>(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (websiteUrl) {
      dispatch(getEntitiesByWebsiteUrl(websiteUrl));
      dispatch(getEntityByUrl(websiteUrl));
    }
  }, [websiteUrl]);

  return {
    website: website.entity,
    pages: page.entities as IPage[],
    loading: website.loading || page.loading,
  };
};

export default useCurrentVisitingWebsite;

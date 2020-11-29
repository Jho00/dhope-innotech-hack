import React from 'react';
import classNames from 'classnames';

import Inputs from './inputs';
import Profile from './profile';

import classes from '../styles/containers/main-page.scss';
import LinksSubmit from './links-submit';
import ImageSubmit from './image-submit';

const MainPage = (props) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [selectedProfileUrl, setSelectedProfileUrl] = React.useState();
  const [foundProfiles, setFoundProfiles] = React.useState([]);
  const [analyzedProfiles, setAnalyzedProfiles] = React.useState([]);

  const addFoundProfile = (profile) => {
    setFoundProfiles([...foundProfiles, profile]);
    if (foundProfiles.length === 0 && activeTab === 0) {
      setSelectedProfileUrl(profile.url);
    }
  };
  const addAnalyzedProfile = (vkId) => {
    const profile = foundProfiles.find((item) => item.url.endsWith(vkId));
    setAnalyzedProfiles([...analyzedProfiles, profile]);

    if (analyzedProfiles.length === 0 && activeTab === 1) {
      setSelectedProfileUrl(profile.url);
    }
  };

  const updateFoundProfile = (updatedProfile) => {
    const newProfiles = [...foundProfiles];
    const profileIndex = newProfiles.findIndex((item) => item.url === updatedProfile.url);
    newProfiles[profileIndex] = updatedProfile;
    setFoundProfiles(newProfiles);
  };

  const updateAnalyzedProfile = (updatedProfile) => {
    const newProfiles = [...analyzedProfiles];
    const profileIndex = newProfiles.findIndex((item) => item.url === updatedProfiles.url);
    newProfiles[profileIndex] = updatedProfile;
    setAnalyzedProfiles(newProfiles);
  };

  const profiles = activeTab === 0 ? foundProfiles : analyzedProfiles;
  const addProfile = activeTab === 0 ? addFoundProfile : addAnalyzedProfile;
  const updateProfile = activeTab === 0 ? updateFoundProfile : updateAnalyzedProfile;
  const ActiveInputComponent = activeTab === 0 ? LinksSubmit : ImageSubmit;

  const selectedProfile =
    selectedProfileUrl && profiles.find((item) => item.url === selectedProfileUrl);

  return (
    <div className={classes.mainPage}>
      <div className={classes.mainPageColumn}>
        <Inputs
          profiles={profiles}
          addProfile={addProfile}
          updateProfile={updateProfile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ActiveInputComponent={ActiveInputComponent}
          selectedProfileUrl={selectedProfileUrl}
          setSelectedProfileUrl={setSelectedProfileUrl}
        />
      </div>
      {selectedProfile && (
        <div className={classNames(classes.mainPageColumn, classes.profileColumn)}>
          <Profile profile={selectedProfile} />
        </div>
      )}
    </div>
  );
};

export default MainPage;

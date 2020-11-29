import React from 'react';
import axios from 'axios';

import TextInput from '../components/text-input';

import classes from '../styles/containers/links-submit.scss';
import ProfilePreview from '../components/profile-preview';

const LinksSubmit = (props) => {
  const { addProfile, updateProfile, profiles, selectedProfileUrl, setSelectedProfileUrl } = props;

  const submit = (link) => {
    const newProfile = {
      url: link,
      isLoading: true,
    };

    addProfile(newProfile);

    axios('http://192.168.0.125:54321/uploader_id', {
      method: 'GET',
      params: {
        url: link,
      },
    }).then((response) =>
      updateProfile({
        url: link,
        isLoading: false,
        ...response.data[0],
      })
    );
  };

  return (
    <div>
      <div className={classes.input}>
        <TextInput onSubmit={submit} />
      </div>
      {profiles.length > 0 && (
        <div>
          <div className={classes.profilesTitle}>Найдено ({profiles.length})</div>

          {profiles.map((profile) => (
            <ProfilePreview
              profile={profile}
              key={profile.url}
              isActive={profile.url === selectedProfileUrl}
              onClick={() => setSelectedProfileUrl(profile.url)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LinksSubmit;

import React from 'react';
import classNames from 'classnames';

import classes from '../styles/containers/profile.scss';
import SVGIcon from '../components/svg-icon';

const Profile = (props) => {
  const { profile } = props;
  const {
    photo_400,
    first_name,
    last_name,
    middle_name,
    bdate,
    inn,
    sex,
    relation,
    children,
    isLoading,
  } = profile;
  const profileImage = photo_400;

  const getValueClasses = (value) =>
    classNames(
      classes.fieldValue,
      isLoading && !value && classes.fieldValueLoading,
      !isLoading && !value && classes.fieldValueInvalid
    );

  const renderValue = (value) => (isLoading ? '' : value || 'Не найдено');

  const columns = [
    [
      { label: 'Имя', value: first_name },
      { label: 'Фамилия', value: last_name },
      { label: 'Отчество', value: middle_name },
      { label: 'Дата рождения', value: bdate },
    ],
    [
      { label: 'ИНН', value: inn },
      { label: 'Гендер', value: sex ? (sex === 1 ? 'Женский' : 'Мужской') : undefined },
      {
        label: 'Имеет пару',
        value: relation ? ([2, 3, 4, 7, 8].includes(relation) ? 'Да' : 'Нет') : undefined,
      },
      { label: 'Количество детей (если есть)', value: children },
    ],
  ];

  return (
    <div>
      <div className={classes.profile}>
        <div className={classes.mainInfo}>
          <div className={classNames(classes.column, classes.columnImage)}>
            <div
              className={classes.profileImage}
              style={profileImage ? { backgroundImage: `url(${profileImage})` } : undefined}
            >
              {isLoading && (
                <div>
                  <SVGIcon icon={'user'} className={classes.profileImageIcon} />
                  <div className={classes.profileImageSearching}>Идет поиск...</div>
                </div>
              )}
            </div>
          </div>
          {columns.map((item) => (
            <div className={classes.column}>
              {item.map(({ label, value }) => (
                <div className={classes.field}>
                  <span className={classes.fieldLabel}>{label}</span>
                  <div className={getValueClasses(value)}>{renderValue(value)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={classes.additionalInfo}></div>
      </div>
    </div>
  );
};

export default Profile;

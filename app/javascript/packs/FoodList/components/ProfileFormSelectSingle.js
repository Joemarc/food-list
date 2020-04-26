import React from 'react';
import Select from 'react-select';
import { Field } from 'react-final-form';

import './ProfileFormSelectSingle.scss';
import formStyles from './ProfileForm.module.scss';

const ProfileFormSelectSingle = ({ name, id, labelText, options, onChange, value, placeholder, disabled }) => (
  <Field
    name={name}
    render={({ input }) => (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label htmlFor={id} className={formStyles.profileFormLabel}>{labelText}
        <Select {...input} options={options} className="profile-form-select" classNamePrefix="profile-form-select"
                onChange={onChange} value={value} placeholder={placeholder} isDisabled={disabled} />
      </label>
    )}
  />
);

ProfileFormSelectSingle.defaultProps = { disabled: false };

export default ProfileFormSelectSingle;
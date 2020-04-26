import React from 'react';
import { Field } from 'react-final-form';

import checkboxStyles from './CheckboxInput/CheckboxInput.module.scss';

const ProfileFormCheckbox = ({ name, value, id, labelText, checked, onChange }) => (
  <Field name={name} component="input" type="checkbox" value={value}>
    {({ input }) => (
      <label className={checkboxStyles.checkboxInputLabel} htmlFor={id}>
        <input type="checkbox" className={checkboxStyles.checkboxInput} {...input}
               id={id} name={name} checked={checked} onChange={onChange} />
        <span className={checkboxStyles.checkboxInputCheckmark} />
        <span className={checkboxStyles.checkboxInputTextLabel}>{labelText}</span>
      </label>
    )}
  </Field>
);

export default ProfileFormCheckbox;
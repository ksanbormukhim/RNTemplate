import React from 'react';
import { useTranslation } from 'react-i18next';
import { SelectOptionType } from '../types';
import SelectOption from './SelectOption';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languageOptions: SelectOptionType[] = Object.entries(
    i18n.languageMap
  ).map(([code, name]) => ({
    label: name,
    value: code,
  }));

  return (
    <SelectOption
      options={languageOptions}
      value={i18n.languageMap[i18n.language]}
      onValueSelected={(option) => {
        changeLanguage(option.value);
      }}
    />
  );
};

export default LanguageSelector;

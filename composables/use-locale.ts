
import type { LocaleItem, LocaleKey, LocaledList } from "~/types";

export default function () {
  const { t } = useI18n();

  const transformLocaleItems = (list: LocaleItem[], localeKey: LocaleKey, additionalKey: LocaleKey = null): LocaledList => {
    return list.map(item => ({
      title: t(`${localeKey}${additionalKey ? `.${additionalKey}` : ''}.${item.value}`),
      ...item 
    }));
  };

  return {
    transformLocaleItems,
  };
}
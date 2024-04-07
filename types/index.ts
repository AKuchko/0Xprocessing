/* LOCALE */
export interface LocaleItem {
  value: string,
  [prop: string]: any,
};
export interface LocaledItem {
  title: string,
  value: string,
  [props: string]: any,
};
export interface ArbitraryObject {
  [props: string]: any,
};
export interface Classes {
  [props: string]: boolean,
};
export interface FeatureCompare {
  avaliable?: boolean,
  description?: string,
};

export type LocaleKey = string | null;
export type LocaleList = LocaleItem[];
export type LocaledList = LocaleItem[];

export type ArbitraryObjectList = ArbitraryObject[];
export type ClassList = Classes;

export type CompanyFeature = FeatureCompare | null;

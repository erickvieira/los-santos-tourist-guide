export enum Categories {
  SPORT = 'sport',
  FOOD = 'food',
  HEALTH_CARE = 'health care',
  FUN = 'fun',
  BUSINESS = 'business',
  RACING = 'racing',
  AVIATION = 'aviation',
  NAUTICAL = 'nautical',
  SOCIALIZING = 'socializing',
  SHOPPING = 'shopping',
  PUBLIC = 'public area',
  PRIVATE = 'private area',
}

export const categoriesToArray = () => {
  return Object.keys(Categories).filter((key: any) => typeof Categories[key] === 'string');
};

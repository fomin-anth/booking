export const CsvConfigKey = 'CSV_PROVIDER_OPTIONS';

export const CsvEntityKey = 'CSV_ENTITY_CLASS';

export const AvailableTypes = ['string', 'number'] as const;

export const CsvTypesLength: {
  [key in (typeof AvailableTypes)[number]]: number;
} = {
  number: 15,
  string: 100,
};

export const Fillers: {
  [key in (typeof AvailableTypes)[number]]: string;
} = {
  number: '0',
  string: '!',
};

export type CountryStatistics = Record<string, Statistics>;

export type StatisticsWithCountryName = {
  country: string,
} & Statistics;

export type StatisticsByYear = {
  country: string,
  iso_code: string,
} & YearStatistics;

export type Statistics = {
  iso_code: string;
  data: YearStatistics[];
};

export type YearStatistics = {
  year: number;
  population: number;
  cement_co2: number;
  cement_co2_per_capita: number;
  cumulative_cement_cp2: number;
  cumulative_luc_co2?: number;
  ghg_excluding_lucf_per_capita?: number;
  ghg_per_capita?: number;
  land_use_change_co2?: number;
  land_use_change_co2_per_capita?: number;
  methane?: number;
  methane_per_capita?: number;
  nitrous_oxide?: number;
  nitrous_oxide_per_capita?: number;
  share_global_cumulative_luc_co2?: number;
  share_global_luc_co2?: number;
  share_of_temperature_change_from_ghg?: number;
  temperature_change_from_ch4?: number;
  temperature_change_from_co2?: number;
  temperature_change_from_ghg?: number;
  temperature_change_from_n2o?: number;
  total_ghg?: number;
  total_ghg_excluding_lucf?: number;
};

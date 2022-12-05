import ea_graph from "../../images/regions/causal_graphs/east_asia_and_pacific.svg";
import eu_graph from "../../images/regions/causal_graphs/europe_and_central_asia.svg";
import la_graph from "../../images/regions/causal_graphs/latin_america_and_caribbean.svg";
import me_graph from "../../images/regions/causal_graphs/middle_east_and_north_africa.svg";
import na_graph from "../../images/regions/causal_graphs/north_america.svg";
import sa_graph from "../../images/regions/causal_graphs/south_asia.svg";
import ssa_graph from "../../images/regions/causal_graphs/sub-saharan_africa.svg";
import ea_thumbnail from "../../images/regions/thumbnails/east_asia_and_pacific.png";
import eu_thumbnail from "../../images/regions/thumbnails/europe_and_central_asia.png";
import lt_thumbnail from "../../images/regions/thumbnails/latin_america_and_caribbean.png";
import na_thumbnail from "../../images/regions/thumbnails/north_america.png";
import sa_thumbnail from "../../images/regions/thumbnails/south_asia.png";
import ssa_thumbnail from "../../images/regions/thumbnails/sub-saharan_africa.png";
import me_thumbnail from "../../images/regions/thumbnails/middle_east_and_north_africa.png";

export const regions = [
  {
    id: "east_asia_and_pacific",
    name: "East Asia and Pacific",
    image: ea_thumbnail,
    causalGraph: ea_graph,
    causalRelationship:
      "The causal graph shows the causal structure of climatological and environmental conditions that cause the armed conflict activity. Whereas the causal paths are rooted in the percentage of land that is cropland and actual evapotranspiration, only the magnitude of causal effect of actual evapotranspiration on the reported fatalities has been estimated with sufficient confidence. Specifically, the magnitude of this causal effect was established at the 0.1% statistical significance level. An increase in actual evapotranspiration causes a reduction in the reported fatalities. The causal structure also shows that the causal paths between the root causes and armed conflict activity are indirect.",
    mediatingEffects:
      "The indirect causal effects on the armed conflict activity are mediated by the remaining variables in the graph, including demographic (rural population, population density, total population) and agricultural variables (irrigated crop production, production of rice fields). Especially important for the mediation of these causal effects is the gap between observed and potential rice yield. Notably, this causes an increase in the reported fatalities. The magnitude of the causal effect of the yield gap on the total reported fatalities has been established at the 5% statistical significance level.",
    conflictOutcome:
      "The causal graph examines the causality of armed conflict activity. Armed conflict is described by the total count of armed conflict events and the reported number of fatalities from conflict events.",
    countries: [
      {
        id: "ASM",
        name: "American Samoa",
      },
      {
        id: "AUS",
        name: "Australia",
      },
      {
        id: "BRN",
        name: "Brunei",
      },
      {
        id: "KHM",
        name: "Cambodia",
      },
      {
        id: "CHN",
        name: "China",
      },
      {
        id: "FJI",
        name: "Fiji",
      },
      {
        id: "PYF",
        name: "French Polynesia",
      },
      {
        id: "GUM",
        name: "Guam",
      },
      {
        id: "HKG",
        name: "Hong Kong",
      },
      {
        id: "IDN",
        name: "Indonesia",
      },
      {
        id: "JPN",
        name: "Japan",
      },
      {
        id: "KIR",
        name: "Kiribati",
      },
      {
        id: "LAO",
        name: "Laos",
      },
      {
        id: "MAC",
        name: "Macao",
      },
      {
        id: "MYS",
        name: "Malaysia",
      },
      {
        id: "MHL",
        name: "Marshall Islands",
      },
      {
        id: "FSM",
        name: "Micronesia",
      },
      {
        id: "MNG",
        name: "Mongolia",
      },
      {
        id: "MMR",
        name: "Myanmar",
      },
      {
        id: "NRU",
        name: "Nauru",
      },
      {
        id: "NCL",
        name: "New Caledonia",
      },
      {
        id: "NZL",
        name: "New Zealand",
      },
      {
        id: "PRK",
        name: "North Korea",
      },
      {
        id: "MNP",
        name: "Northern Mariana Islands",
      },
      {
        id: "PLW",
        name: "Palau",
      },
      {
        id: "PNG",
        name: "Papua New Guinea",
      },
      {
        id: "PHL",
        name: "Philippines",
      },
      {
        id: "WSM",
        name: "Samoa",
      },
      {
        id: "SGP",
        name: "Singapore",
      },
      {
        id: "SLB",
        name: "Solomon Islands",
      },
      {
        id: "KOR",
        name: "South Korea",
      },
      {
        id: "TWN",
        name: "Taiwan",
      },
      {
        id: "THA",
        name: "Thailand",
      },
      {
        id: "TLS",
        name: "Timor-Leste",
      },
      {
        id: "TON",
        name: "Tonga",
      },
      {
        id: "TUV",
        name: "Tuvalu",
      },
      {
        id: "VUT",
        name: "Vanuatu",
      },
      {
        id: "VNM",
        name: "Vietnam",
      },
    ],
    dataDetails: [
      {
        level: "Indirect",
        step: 1,
        indicator: "Cropland2000_mean_percent_s",
        interpretation: "Less cropland",
        dataset: "Percentage of land that is cropland",
        sourceName: "USGS/EarthStat",
        sourceUrl: "http://www.earthstat.org/cropland-pasture-area-2000/",
      },
      {
        level: "Indirect",
        step: 2,
        indicator: "et_actl_m_MIN_m",
        interpretation: "Decrease in evapotranspiration",
        dataset: "Actual evapotranspiration",
        sourceName: "FewsNET",
        sourceUrl: "https://earlywarning.usgs.gov/fews/product/460",
      },
      {
        level: "Mediator",
        step: 3,
        indicator: "rurpop_s",
        interpretation: "Larger population in rural areas",
        dataset: "Population in rural areas",
        sourceName: "PBL",
        sourceUrl:
          "https://www.pbl.nl/en/publications/towards-an-urban-preview",
      },
      {
        level: "Mediator",
        step: 4,
        indicator: "yield_gap_rice_s",
        interpretation: "Active rice fields",
        dataset: "Gap between observed and potential rice yield",
        sourceName: "EarthStat/Univ. of Minnesota",
        sourceUrl: "http://www.earthstat.org/data-download/",
      },
      {
        level: "Mediator",
        step: 5,
        indicator: "spam_P_i_sum_s",
        interpretation: "Less irrigated crop production",
        dataset: "Metric tons of irrigated crops produced",
        sourceName: "IFPRI",
        sourceUrl: "http://mapspam.info/data/",
      },
      {
        level: "Mediator",
        step: 6,
        indicator: "locdensity_y",
        interpretation: "Higher population density",
        dataset: "Population density",
        sourceName: "CIESIN",
        sourceUrl:
          "https://beta.sedac.ciesin.columbia.edu/data/set/gpw-v4-population-density-adjusted-to-2015-unwpp-country-totals/data-download",
      },
      {
        level: "Mediator",
        step: 7,
        indicator: "loccount_y",
        interpretation: "Larger populations",
        dataset: "Total population count",
        sourceName: "CIESIN",
        sourceUrl:
          "https://beta.sedac.ciesin.columbia.edu/data/set/gpw-v4-population-density-adjusted-to-2015-unwpp-country-totals/data-download",
      },
      {
        level: "Outcome",
        step: 8,
        indicator: "acl_sum_event_m",
        interpretation: "Conflict fatalities",
        dataset: "Total number of conflict events",
        sourceName: "ACLED",
        sourceUrl: "https://doi.org/10.1177/0022343310378914",
      },
      {
        level: "Outcome",
        step: 9,
        indicator: "acl_sum_fatl_m",
        interpretation: "Conflict events",
        dataset: "Reported fatalities from conflict events",
        sourceName: "ACLED",
        sourceUrl: "https://doi.org/10.1177/0022343310378914",
      },
    ],
  },
  {
    id: "europe_and_central_asia",
    name: "Europe and Central Asia",
    image: eu_thumbnail,
    causalGraph: eu_graph,
    causalRelationship:
      "The causal graph shows the causal structure of climatological and environmental conditions that cause the armed conflict activity. Whereas the causal paths are rooted in the variation in evapotranspiration and presence of livestock, only the magnitude of the causal effect of livestock on the conflict events has been estimated with sufficient confidence. Specifically, the magnitude of this causal effect was established at the 0.1% statistical significance level. An increase in livestock causes a reduction in the conflict events. Whereas evapotranspiration is an important root cause, the data precluded estimation of its effect on the conflict events. The causal structure also shows that all the causal paths between these root causes and armed conflict activity are indirect.",
    mediatingEffects:
      "The indirect effects on the armed conflict activity are mediated by the remaining variables in the graph, including demographic ( rural population, population density, total population) and agricultural variables (production of barley fields, portion of calories produced for food, percentage of land that is cropland). Among these, especially important for the mediation of the causal effects are the yield gap of barley fields, percentage of cropland, and total population, as these variables also cause a change in the conflict events. Notably, the yield gap causes a decrease in the conflict events, and the percentage of land that is cropland and total population cause an increase in the conflict events. The causal effects of these variables were established at the 0.1%, 1%, and 1% statistical significance levels, respectively.",
    conflictOutcome:
      "The causal graph examines the causality of armed conflict activity. Armed conflict is described by the total count of armed conflict events and the reported number of fatalities from conflict events.",
    countries: [
      {
        id: "ALB",
        name: "Albania",
      },
      {
        id: "AND",
        name: "Andorra",
      },
      {
        id: "ARM",
        name: "Armenia",
      },
      {
        id: "AUT",
        name: "Austria",
      },
      {
        id: "AZE",
        name: "Azerbaijan",
      },
      {
        id: "BLR",
        name: "Belarus",
      },
      {
        id: "BEL",
        name: "Belgium",
      },
      {
        id: "BIH",
        name: "Bosnia and Herzegovina",
      },
      {
        id: "BGR",
        name: "Bulgaria",
      },
      {
        id: "HRV",
        name: "Croatia",
      },
      {
        id: "CYP",
        name: "Cyprus",
      },
      {
        id: "CZE",
        name: "Czech Republic",
      },
      {
        id: "DNK",
        name: "Denmark",
      },
      {
        id: "EST",
        name: "Estonia",
      },
      {
        id: "FRO",
        name: "Faroe Islands",
      },
      {
        id: "FIN",
        name: "Finland",
      },
      {
        id: "FRA",
        name: "France",
      },
      {
        id: "GUF",
        name: "French Guiana",
      },
      {
        id: "GEO",
        name: "Georgia",
      },
      {
        id: "DEU",
        name: "Germany",
      },
      {
        id: "GIB",
        name: "Gibraltar",
      },
      {
        id: "GRC",
        name: "Greece",
      },
      {
        id: "GRL",
        name: "Greenland",
      },
      {
        id: "GGY",
        name: "Guernsey",
      },
      {
        id: "HUN",
        name: "Hungary",
      },
      {
        id: "ISL",
        name: "Iceland",
      },
      {
        id: "IRL",
        name: "Ireland",
      },
      {
        id: "IMN",
        name: "Isle of Man",
      },
      {
        id: "ITA",
        name: "Italy",
      },
      {
        id: "JEY",
        name: "Jersey",
      },
      {
        id: "KAZ",
        name: "Kazakhstan",
      },
      {
        id: "XKO",
        name: "Kosovo",
      },
      {
        id: "KGZ",
        name: "Kyrgyzstan",
      },
      {
        id: "LVA",
        name: "Latvia",
      },
      {
        id: "LIE",
        name: "Liechtenstein",
      },
      {
        id: "LTU",
        name: "Lithuania",
      },
      {
        id: "LUX",
        name: "Luxembourg",
      },
      {
        id: "MKD",
        name: "Macedonia",
      },
      {
        id: "MDA",
        name: "Moldova",
      },
      {
        id: "MCO",
        name: "Monaco",
      },
      {
        id: "MNE",
        name: "Montenegro",
      },
      {
        id: "NLD",
        name: "Netherlands",
      },
      {
        id: "NOR",
        name: "Norway",
      },
      {
        id: "POL",
        name: "Poland",
      },
      {
        id: "PRT",
        name: "Portugal",
      },
      {
        id: "ROU",
        name: "Romania",
      },
      {
        id: "RUS",
        name: "Russia",
      },
      {
        id: "SMR",
        name: "San Marino",
      },
      {
        id: "SRB",
        name: "Serbia",
      },
      {
        id: "SVK",
        name: "Slovakia",
      },
      {
        id: "SVN",
        name: "Slovenia",
      },
      {
        id: "ESP",
        name: "Spain",
      },
      {
        id: "SWE",
        name: "Sweden",
      },
      {
        id: "CHE",
        name: "Switzerland",
      },
      {
        id: "TJK",
        name: "Tajikistan",
      },
      {
        id: "TUR",
        name: "Turkey",
      },
      {
        id: "TKM",
        name: "Turkmenistan",
      },
      {
        id: "UKR",
        name: "Ukraine",
      },
      {
        id: "GBR",
        name: "United Kingdom",
      },
      {
        id: "UZB",
        name: "Uzbekistan",
      },
    ],
    dataDetails: [
      {
        level: "Indirect",
        step: 1,
        indicator: "et_anom_m_STD_m",
        interpretation: "Variation in evapotranspiration",
        dataset: "Variation in evapotranspiration",
        sourceName: "FewsNET",
        sourceUrl: "https://earlywarning.usgs.gov/fews/product/460",
      },
      {
        level: "Indirect",
        step: 2,
        indicator: "chicken_number_s",
        interpretation: "Fewer livestock chickens",
        dataset: "Count of livestock chickens",
        sourceName: "FAO/Oxford",
        sourceUrl: "http://www.fao.org/livestock-systems/en/",
      },
      {
        level: "Mediator",
        step: 3,
        indicator: "yield_gap_barley_s",
        interpretation: "Under-utlized barley fields",
        dataset: "Gap between observed and potential barley yield",
        sourceName: "EarthStat/Univ. of Minnesota",
        sourceUrl: "http://www.earthstat.org/data-download/",
      },
      {
        level: "Mediator",
        step: 4,
        indicator: "DeliveredkcalFraction_s",
        interpretation: "Portion of calories produced going toward food",
        dataset: "Portion of calories produced going toward food",
        sourceName: "EarthStat/Univ. of Minnesota",
        sourceUrl:
          "http://www.earthstat.org/crop-allocation-food-feed-nonfood/",
      },
      {
        level: "Mediator",
        step: 5,
        indicator: "Cropland2000_mean_percent_s",
        interpretation: "Percentage of area that is cropland",
        dataset: "Percentage of land that is cropland",
        sourceName: "USGS/EarthStat",
        sourceUrl: "http://www.earthstat.org/cropland-pasture-area-2000/",
      },
      {
        level: "Mediator",
        step: 5,
        indicator: "locdensity_y",
        interpretation: "Higher population density",
        dataset: "Population density",
        sourceName: "CIESIN",
        sourceUrl:
          "https://beta.sedac.ciesin.columbia.edu/data/set/gpw-v4-population-density-adjusted-to-2015-unwpp-country-totals/data-download",
      },
      {
        level: "Mediator",
        step: 6,
        indicator: "rurpop_s",
        interpretation: "Rural population count",
        dataset: "Population in rural areas",
        sourceName: "PBL",
        sourceUrl:
          "https://www.pbl.nl/en/publications/towards-an-urban-preview",
      },
      {
        level: "Mediator",
        step: 7,
        indicator: "loccount_y",
        interpretation: "Larger populations",
        dataset: "Total population count",
        sourceName: "CIESIN",
        sourceUrl:
          "https://beta.sedac.ciesin.columbia.edu/data/set/gpw-v4-population-density-adjusted-to-2015-unwpp-country-totals/data-download",
      },
      {
        level: "Outcome",
        step: 8,
        indicator: "acl_sum_event_m",
        interpretation: "Conflict events",
        dataset: "Total number of conflict events",
        sourceName: "ACLED",
        sourceUrl: "https://doi.org/10.1177/0022343310378914",
      },
    ],
  },
  {
    id: "latin_america_and_caribbean",
    name: "Latin America and Caribbean",
    causalGraph: la_graph,
    causalRelationship:
      "The causal graph shows the causal structure of climatological and environmental conditions that cause the armed conflict activity. Whereas the causal paths are rooted in the variation in evapotranspiration and precipitation, as well as the presence of livestock, the magnitude of the causal effect of variation in evapotranspiration on the conflict events could not be estimated with sufficient certainty. In addition, the available data precluded the estimation of the magnitude of causal effects of precipitation and livestock on the conflict events.",
    mediatingEffects:
      "Despite the fact that the magnitude of causal effects of the root causes on the armed conflict activity could not be estimated, the causal structure still shows the importance of the remaining variables for the mediation of effects on the conflict events, including demographic (rural population, population density) and agricultural variables (count of livestock chickens, density of greenness, soybean yield).",
    conflictOutcome:
      "The causal graph examines the causality of armed conflict activity. Armed conflict is described by the total count of armed conflict events and the reported number of fatalities from conflict events.",
    image: lt_thumbnail,
    countries: [
      {
        id: "ATG",
        name: "Antigua and Barbuda",
      },
      {
        id: "ARG",
        name: "Argentina",
      },
      {
        id: "ABW",
        name: "Aruba",
      },
      {
        id: "BHS",
        name: "Bahamas",
      },
      {
        id: "BRB",
        name: "Barbados",
      },
      {
        id: "BLZ",
        name: "Belize",
      },
      {
        id: "BOL",
        name: "Bolivia",
      },
      {
        id: "BRA",
        name: "Brazil",
      },
      {
        id: "VGB",
        name: "British Virgin Islands",
      },
      {
        id: "CYM",
        name: "Cayman Islands",
      },
      {
        id: "CHL",
        name: "Chile",
      },
      {
        id: "COL",
        name: "Colombia",
      },
      {
        id: "CRI",
        name: "Costa Rica",
      },
      {
        id: "CUB",
        name: "Cuba",
      },
      {
        id: "CUW",
        name: "Curaçao",
      },
      {
        id: "DMA",
        name: "Dominica",
      },
      {
        id: "DOM",
        name: "Dominican Republic",
      },
      {
        id: "ECU",
        name: "Ecuador",
      },
      {
        id: "SLV",
        name: "El Salvador",
      },
      {
        id: "GRD",
        name: "Grenada",
      },
      {
        id: "GTM",
        name: "Guatemala",
      },
      {
        id: "GUY",
        name: "Guyana",
      },
      {
        id: "HTI",
        name: "Haiti",
      },
      {
        id: "HND",
        name: "Honduras",
      },
      {
        id: "JAM",
        name: "Jamaica",
      },
      {
        id: "MEX",
        name: "Mexico",
      },
      {
        id: "NIC",
        name: "Nicaragua",
      },
      {
        id: "PAN",
        name: "Panama",
      },
      {
        id: "PRY",
        name: "Paraguay",
      },
      {
        id: "PER",
        name: "Peru",
      },
      {
        id: "PRI",
        name: "Puerto Rico",
      },
      {
        id: "KNA",
        name: "Saint Kitts and Nevis",
      },
      {
        id: "LCA",
        name: "Saint Lucia",
      },
      {
        id: "VCT",
        name: "Saint Vincent and the Grenadines",
      },
      {
        id: "MAF",
        name: "Saint-Martin",
      },
      {
        id: "SXM",
        name: "Sint Maarten",
      },
      {
        id: "SUR",
        name: "Suriname",
      },
      {
        id: "TTO",
        name: "Trinidad and Tobago",
      },
      {
        id: "TCA",
        name: "Turks and Caicos Islands",
      },
      {
        id: "URY",
        name: "Uruguay",
      },
      {
        id: "VEN",
        name: "Venezuela",
      },
      {
        id: "VIR",
        name: "Virgin Islands, U.S.",
      },
    ],
    dataDetails: [
      {
        level: "Mediator",
        step: 1,
        indicator: "et_anom_m_STD_m",
        interpretation: "Abnormal variation in evapotranspiration",
        dataset: "Variation in evapotranspiration",
        sourceName: "FewsNET",
        sourceUrl: "https://earlywarning.usgs.gov/fews/product/460",
      },
      {
        level: "Mediator",
        step: 2,
        indicator: "spi_3_m",
        interpretation: "Variation of precipitation",
        dataset: "Variation in precipitation",
        sourceName: "ECMWF",
        sourceUrl:
          "https://www.ecmwf.int/en/newsletter/154/meteorology/ecmwfs-new-long-range-forecasting-system-seas5",
      },
      {
        level: "Mediator",
        step: 3,
        indicator: "chicken_number_s",
        interpretation: "Count of livestock chickens",
        dataset: "Count of livestock chickens",
        sourceName: "FAO/Oxford",
        sourceUrl: "http://www.fao.org/livestock-systems/en/",
      },
      {
        level: "Mediator",
        step: 4,
        indicator: "rurratio_s",
        interpretation: "Percentage of population that live in rural areas",
        dataset: "Percentage of population that live in rural areas",
        sourceName: "PBL",
        sourceUrl:
          "https://www.pbl.nl/en/publications/towards-an-urban-preview",
      },
      {
        level: "Mediator",
        step: 5,
        indicator: "ndvi_act_min_m",
        interpretation: "Lower density of greenness",
        dataset: "Density of greenness",
        sourceName: "MODIS",
        sourceUrl: "https://lpdaac.usgs.gov/products/mod13c2v006/",
      },
      {
        level: "Mediator",
        step: 6,
        indicator: "locdensity_y",
        interpretation: "Local population density",
        dataset: "Population density",
        sourceName: "CIESIN",
        sourceUrl:
          "https://beta.sedac.ciesin.columbia.edu/data/set/gpw-v4-population-density-adjusted-to-2015-unwpp-country-totals/data-download",
      },
      {
        level: "Mediator",
        step: 7,
        indicator: "yield_gap_soybean_s",
        interpretation: "Active soybean fields",
        dataset: "Gap between observed and potential soybean yield",
        sourceName: "EarthStat/Univ. of Minnesota",
        sourceUrl: "http://www.earthstat.org/data-download/",
      },
      {
        level: "Mediator",
        step: 8,
        indicator: "rurpop_s",
        interpretation: "Rural population count",
        dataset: "Population in rural areas",
        sourceName: "PBL",
        sourceUrl:
          "https://www.pbl.nl/en/publications/towards-an-urban-preview",
      },
      {
        level: "Outcome",
        step: 9,
        indicator: "acl_sum_fatl_m",
        interpretation: "Conflict fatalities",
        dataset: "Reported fatalities from conflict events",
        sourceName: "ACLED",
        sourceUrl: "https://doi.org/10.1177/0022343310378914",
      },
      {
        level: "Outcome",
        step: 10,
        indicator: "acl_sum_event_m",
        interpretation: "Conflict events",
        dataset: "Total number of conflict events",
        sourceName: "ACLED",
        sourceUrl: "https://doi.org/10.1177/0022343310378914",
      },
    ],
  },
  {
    id: "middle_east_and_north_africa",
    name: "Middle East and North Africa",
    image: me_thumbnail,
    causalGraph: me_graph,
    causalRelationship:
      "The causal graph shows the causal structure of environmental and other conditions that cause the armed conflict activity. Whereas the causal paths are rooted in vegetation coverage and rural population size, the magnitude of causal effect of the rural population size on the conflict events could not be estimated with sufficient certainty. Additionally, the density of green areas is an important root cause. However, the available data precluded estimation of its effect on the conflict events. The causal structure also shows that all the causal paths between the root causes and armed conflict activity are indirect.",
    mediatingEffects:
      "The indirect causal effects on the armed conflict activity are mediated by the remaining variables in the graph, including demographic (population density, rural population) and agricultural variables (portion of calories produced for food, count of livestock chicken, irrigated crop production, production of barley fields). Among these, especially important for the mediation of causal effects on the conflict events is the local population density. Notably, the local population density causes a decrease in the conflict events. The causal effect of the local population density was established at the 1% level of statistical significance.",
    conflictOutcome:
      "The causal graph examines the causality of armed conflict activity. Armed conflict is described by the total count of armed conflict events and the reported number of fatalities from conflict events.",
    countries: [
      {
        id: "DZA",
        name: "Algeria",
      },
      {
        id: "BHR",
        name: "Bahrain",
      },
      {
        id: "DJI",
        name: "Djibouti",
      },
      {
        id: "EGY",
        name: "Egypt",
      },
      {
        id: "IRN",
        name: "Iran",
      },
      {
        id: "IRQ",
        name: "Iraq",
      },
      {
        id: "ISR",
        name: "Israel",
      },
      {
        id: "JOR",
        name: "Jordan",
      },
      {
        id: "KWT",
        name: "Kuwait",
      },
      {
        id: "LBN",
        name: "Lebanon",
      },
      {
        id: "LBY",
        name: "Libya",
      },
      {
        id: "MLT",
        name: "Malta",
      },
      {
        id: "MAR",
        name: "Morocco",
      },
      {
        id: "OMN",
        name: "Oman",
      },
      {
        id: "PSE",
        name: "Palestina",
      },
      {
        id: "QAT",
        name: "Qatar",
      },
      {
        id: "SAU",
        name: "Saudi Arabia",
      },
      {
        id: "SYR",
        name: "Syria",
      },
      {
        id: "TUN",
        name: "Tunisia",
      },
      {
        id: "ARE",
        name: "United Arab Emirates",
      },
      {
        id: "YEM",
        name: "Yemen",
      },
    ],
    dataDetails: [
      {
        level: "Indirect",
        step: 1,
        indicator: "ndvi_act_min_m",
        interpretation: "Vegetation Index (measure of greenness)",
        dataset: "Density of greenness",
        sourceName: "MODIS",
        sourceUrl: "https://lpdaac.usgs.gov/products/mod13c2v006/",
      },
      {
        level: "Indirect",
        step: 2,
        indicator: "rurratio_s",
        interpretation: "Population in rural areas",
        dataset: "Percentage of population that live in rural areas",
        sourceName: "PBL",
        sourceUrl:
          "https://www.pbl.nl/en/publications/towards-an-urban-preview",
      },
      {
        level: "Mediator",
        step: 3,
        indicator: "locdensity_y",
        interpretation: "Lower population density",
        dataset: "Local population density",
        sourceName: "CIESIN",
        sourceUrl:
          "https://beta.sedac.ciesin.columbia.edu/data/set/gpw-v4-population-density-adjusted-to-2015-unwpp-country-totals/data-download",
      },
      {
        level: "Mediator",
        step: 4,
        indicator: "DeliveredkcalFraction_s",
        interpretation:
          "Higher proportion of calories produced going toward food",
        dataset: "Portion of calories produced going toward food",
        sourceName: "EarthStat/Univ. of Minnesota",
        sourceUrl:
          "http://www.earthstat.org/crop-allocation-food-feed-nonfood/",
      },
      {
        level: "Mediator",
        step: 5,
        indicator: "yield_gap_barley_s",
        interpretation: "Barley fields",
        dataset: "Gap between observed and potential barley yield",
        sourceName: "EarthStat/Univ. of Minnesota",
        sourceUrl: "http://www.earthstat.org/data-download/",
      },
      {
        level: "Mediator",
        step: 6,
        indicator: "chicken_number_s",
        interpretation: "Count of livestock chickens",
        dataset: "Count of livestock chickens",
        sourceName: "FAO/Oxford",
        sourceUrl: "http://www.fao.org/livestock-systems/en/",
      },
      {
        level: "Mediator",
        step: 7,
        indicator: "spam_P_i_avg_s",
        interpretation: "Average metric tons of irrigated crops produced",
        dataset: "Metric tons of irrigated crops produced",
        sourceName: "IFPRI",
        sourceUrl: "http://mapspam.info/data/",
      },
      {
        level: "Outcome",
        step: 9,
        indicator: "acl_sum_fatl_m",
        interpretation: "Conflict fatalities",
        dataset: "Reported fatalities from conflict events",
        sourceName: "ACLED",
        sourceUrl: "https://doi.org/10.1177/0022343310378914",
      },
      {
        level: "Mediator",
        step: 8,
        indicator: "rurpop_s",
        interpretation: "Population in rural areas",
        dataset: "Population in rural areas",
        sourceName: "PBL",
        sourceUrl:
          "https://www.pbl.nl/en/publications/towards-an-urban-preview",
      },
      {
        level: "Outcome",
        step: 10,
        indicator: "acl_sum_event_m",
        interpretation: "Conflict events",
        dataset: "Total number of conflict events",
        sourceName: "ACLED",
        sourceUrl: "https://doi.org/10.1177/0022343310378914",
      },
    ],
  },
  {
    id: "north_america",
    name: "North America",
    image: na_thumbnail,
    causalGraph: na_graph,
    causalRelationship:
      "The causal graph shows the causal structure of climatological, agricultural and demographic conditions that cause the protest activity. An important root cause that causes an increase in the total protests is variation of precipitation. Confirmed at 0.1% of statistical significance level, the magnitude of this causal effect is highly statistically significant. The other root causes are the rainfed and irrigated crops. The available data precluded estimation of the effect of irrigated crops on the total protest activity, and the magnitude of the causal effect of rainfed crops on the protest activity could not be confirmed. Since the protest activity is only indirectly caused by these root causes, their causal effects on the total protests are mediated by the remaining variables in the graph.",
    mediatingEffects:
      "The indirect effects on the protest activity are mediated by the remaining variables in the graph, including climatological (evapotranspiration anomalies), demographic (percentage of population in rural areas) and agricultural variables (density of greenness, production of corn fields). Among these, especially important for the mediation of causal effects is the relative rural population size. Notably, the relative rural population size itself causes a decrease in the protest activity. The magnitude of this causal effect was established at the 0.1% level of statistical significance.",
    conflictOutcome:
      "The causal graph examines the causality of the total count of protest events. While North America is not without violence, ACLED specifically tracks political violence and demonstrations, not civilian violence. Protest events were the only category with enough data points to model.",
    countries: [
      {
        id: "BMU",
        name: "Bermuda",
      },
      {
        id: "CAN",
        name: "Canada",
      },
      {
        id: "USA",
        name: "United States",
      },
    ],
    dataDetails: [
      {
        level: "Indirect",
        step: 1,
        indicator: "spi_3_m",
        interpretation: "Increaed variation in precipitation patterns",
        dataset: "Variation of precipitation",
        sourceName: "ECMWF",
        sourceUrl:
          "https://www.ecmwf.int/en/newsletter/154/meteorology/ecmwfs-new-long-range-forecasting-system-seas5",
      },
      {
        level: "Mediator",
        step: 2,
        indicator: "rainfed_s",
        interpretation: "Less rainfed production",
        dataset: "Percentage of crops grown that are rainfed",
        sourceName: "IFPRI",
        sourceUrl: "http://mapspam.info/data/",
      },
      {
        level: "Mediator",
        step: 3,
        indicator: "et_anom_m_STD_m",
        interpretation: "Abnormal variation in evapotranspiration",
        dataset: "Variation in evapotranspiration",
        sourceName: "FewsNET",
        sourceUrl: "https://earlywarning.usgs.gov/fews/product/460",
      },
      {
        level: "Mediator",
        step: 4,
        indicator: "ndvi_act_min_m",
        interpretation: "Greater density of greenness",
        dataset: "Density of greenness",
        sourceName: "MODIS",
        sourceUrl: "https://lpdaac.usgs.gov/products/mod13c2v006/",
      },
      {
        level: "Mediator",
        step: 5,
        indicator: "spam_P_i_sum_s",
        interpretation: "Total metric tons of irrigated crops produced",
        dataset: "Metric tons of irrigated crops produced",
        sourceName: "IFPRI",
        sourceUrl: "http://mapspam.info/data/",
      },
      {
        level: "Mediator",
        step: 6,
        indicator: "rurratio_s",
        interpretation: "Less rural areas",
        dataset: "Percentage of population that live in rural areas",
        sourceName: "PBL",
        sourceUrl:
          "https://www.pbl.nl/en/publications/towards-an-urban-preview",
      },
      {
        level: "Mediator",
        step: 7,
        indicator: "yield_gap_maize_s",
        interpretation: "Corn fields",
        dataset: "Gap between observed and potential corn yield",
        sourceName: "EarthStat/Univ. of Minnesota",
        sourceUrl: "http://www.earthstat.org/data-download/",
      },
      {
        level: "Outcome",
        step: 8,
        indicator: "acl_pprt_evnt_m",
        interpretation: "Peaceful Protests",
        dataset: "Number of peaceful protests",
        sourceName: "ACLED",
        sourceUrl: "https://doi.org/10.1177/0022343310378914",
      },
    ],
  },
  {
    id: "south_asia",
    name: "South Asia",
    image: sa_thumbnail,
    causalGraph: sa_graph,
    causalRelationship:
      "The causal graph shows the causal structure of climatological conditions that cause the armed conflict activity. The causal structure is rooted in variation in precipitation and evapotranspiration as the root causes. However, whereas the available data precluded the estimation of the magnitude of causal effect of precipitation on the conflict events, the magnitude of the effect of variable evapotranspiration on the conflict outcomes could not be confirmed with certainty. Since the armed conflict activity is only indirectly caused by these root causes, their effects on the conflict events are mediated by the remaining variables in the graph.",
    mediatingEffects:
      "The indirect effects on the armed conflict activity are mediated by the remaining variables in the graph, including environmental (vegetation index—or density of greenness), demographic (population in rural areas) and agricultural variables (calories produced for food, count of livestock cattle, presence of rice fields). Among these, especially important for the mediation of causal effects are the vegetation areas and livestock. The vegetation areas decrease the conflict events, and livestock increases conflict events. These causal effects were established at the 0.1% level of statistical significance.",
    conflictOutcome:
      "The causal graph examines the causality of armed conflict activity. Armed conflict is described by the total count of armed conflict events.",
    countries: [
      {
        id: "AFG",
        name: "Afghanistan",
      },
      {
        id: "BGD",
        name: "Bangladesh",
      },
      {
        id: "BTN",
        name: "Bhutan",
      },
      {
        id: "IND",
        name: "India",
      },
      {
        id: "MDV",
        name: "Maldives",
      },
      {
        id: "NPL",
        name: "Nepal",
      },
      {
        id: "PAK",
        name: "Pakistan",
      },
      {
        id: "LKA",
        name: "Sri Lanka",
      },
    ],
    dataDetails: [
      {
        level: "Indirect",
        step: 1,
        indicator: "spi_1_f2_m",
        interpretation: "Variation in forecasted precipitation patterns",
        dataset: "Variation in precipitation",
        sourceName: "ECMWF",
        sourceUrl:
          "https://www.ecmwf.int/en/newsletter/154/meteorology/ecmwfs-new-long-range-forecasting-system-seas5",
      },
      {
        level: "Indirect",
        step: 2,
        indicator: "et_anom_m_STD_m",
        interpretation: "Abnormal variation in evapotranspiration",
        dataset: "Variation in evapotranspiration",
        sourceName: "FewsNET",
        sourceUrl: "https://earlywarning.usgs.gov/fews/product/460",
      },
      {
        level: "Mediator",
        step: 3,
        indicator: "ndvi_act_med_m",
        interpretation: "Lower density of greenness",
        dataset: "Density of greenness",
        sourceName: "MODIS",
        sourceUrl: "https://lpdaac.usgs.gov/products/mod13c2v006/",
      },
      {
        level: "Mediator",
        step: 4,
        indicator: "DeliveredkcalFraction_s",
        interpretation: "Calories produced for food",
        dataset: "Portion of calories produced going toward food",
        sourceName: "EarthStat/Univ. of Minnesota",
        sourceUrl:
          "http://www.earthstat.org/crop-allocation-food-feed-nonfood/",
      },
      {
        level: "Mediator",
        step: 5,
        indicator: "cattle_number_s",
        interpretation: "More livestock cattle",
        dataset: "Count of livestock cattle",
        sourceName: "FAO/Oxford",
        sourceUrl: "http://www.fao.org/livestock-systems/en/",
      },
      {
        level: "Mediator",
        step: 6,
        indicator: "rurpop_s",
        interpretation: "Population in rural areas",
        dataset: "Population in rural areas",
        sourceName: "PBL",
        sourceUrl:
          "https://www.pbl.nl/en/publications/towards-an-urban-preview",
      },
      {
        level: "Mediator",
        step: 7,
        indicator: "yield_gap_rice_s",
        interpretation: "Rice fields",
        dataset: "Gap between observed and potential rice yield",
        sourceName: "EarthStat/Univ. of Minnesota",
        sourceUrl: "http://www.earthstat.org/data-download/",
      },
      {
        level: "Outcome",
        step: 8,
        indicator: "acl_sum_event_m",
        interpretation: "Conflict events",
        dataset: "Total number of conflict events",
        sourceName: "ACLED",
        sourceUrl: "https://doi.org/10.1177/0022343310378914",
      },
    ],
  },
  {
    id: "sub-saharan_africa",
    name: "Sub-Saharan Africa",
    image: ssa_thumbnail,
    causalGraph: ssa_graph,
    causalRelationship:
      "The causal graph shows the causal structure of climatological and agricultural conditions that cause the armed conflict activity. The causal structure is rooted in variation in precipitation and the gap in maize production as the root causes. Whereas the magnitude of these causal effects on the conflict events could not be confirmed with certainty, these causes still root the entire causal structure.",
    mediatingEffects:
      "Whereas the magnitude of the effects the remaining variables have on the conflict events could not be confirmed with certainty, climatological (actual evapotranspiration, vegetation areas), demographic (count of rural population) and agricultural variables (total agricultural value, count of livestock cattle) matter for the mediation of causal effects on the conflict events.",
    conflictOutcome:
      "The causal graph examines the causality of armed conflict activity. Armed conflict is described by the total count of armed conflict events and fatalities.",
    countries: [
      {
        id: "AGO",
        name: "Angola",
      },
      {
        id: "BEN",
        name: "Benin",
      },
      {
        id: "BWA",
        name: "Botswana",
      },
      {
        id: "BFA",
        name: "Burkina Faso",
      },
      {
        id: "BDI",
        name: "Burundi",
      },
      {
        id: "CMR",
        name: "Cameroon",
      },
      {
        id: "CPV",
        name: "Cape Verde",
      },
      {
        id: "CAF",
        name: "Central African Republic",
      },
      {
        id: "TCD",
        name: "Chad",
      },
      {
        id: "COM",
        name: "Comoros",
      },
      {
        id: "CIV",
        name: "Côte d'Ivoire",
      },
      {
        id: "COD",
        name: "Democratic Republic of the Congo",
      },
      {
        id: "GNQ",
        name: "Equatorial Guinea",
      },
      {
        id: "ERI",
        name: "Eritrea",
      },
      {
        id: "ETH",
        name: "Ethiopia",
      },
      {
        id: "GAB",
        name: "Gabon",
      },
      {
        id: "GMB",
        name: "Gambia",
      },
      {
        id: "GHA",
        name: "Ghana",
      },
      {
        id: "GIN",
        name: "Guinea",
      },
      {
        id: "GNB",
        name: "Guinea-Bissau",
      },
      {
        id: "KEN",
        name: "Kenya",
      },
      {
        id: "LSO",
        name: "Lesotho",
      },
      {
        id: "LBR",
        name: "Liberia",
      },
      {
        id: "MDG",
        name: "Madagascar",
      },
      {
        id: "MWI",
        name: "Malawi",
      },
      {
        id: "MLI",
        name: "Mali",
      },
      {
        id: "MRT",
        name: "Mauritania",
      },
      {
        id: "MUS",
        name: "Mauritius",
      },
      {
        id: "MOZ",
        name: "Mozambique",
      },
      {
        id: "NAM",
        name: "Namibia",
      },
      {
        id: "NER",
        name: "Niger",
      },
      {
        id: "NGA",
        name: "Nigeria",
      },
      {
        id: "COG",
        name: "Republic of Congo",
      },
      {
        id: "RWA",
        name: "Rwanda",
      },
      {
        id: "STP",
        name: "São Tomé and Príncipe",
      },
      {
        id: "SEN",
        name: "Senegal",
      },
      {
        id: "SYC",
        name: "Seychelles",
      },
      {
        id: "SLE",
        name: "Sierra Leone",
      },
      {
        id: "SOM",
        name: "Somalia",
      },
      {
        id: "ZAF",
        name: "South Africa",
      },
      {
        id: "SSD",
        name: "South Sudan",
      },
      {
        id: "SDN",
        name: "Sudan",
      },
      {
        id: "SWZ",
        name: "Swaziland",
      },
      {
        id: "TZA",
        name: "Tanzania",
      },
      {
        id: "TGO",
        name: "Togo",
      },
      {
        id: "UGA",
        name: "Uganda",
      },
      {
        id: "ZMB",
        name: "Zambia",
      },
      {
        id: "ZWE",
        name: "Zimbabwe",
      },
    ],
    dataDetails: [
      {
        level: "Indirect",
        step: 1,
        indicator: "spi_3_m",
        interpretation: "Increased variation in precipitation patterns",
        dataset: "Variation in precipitation",
        sourceName: "ECMWF",
        sourceUrl:
          "https://www.ecmwf.int/en/newsletter/154/meteorology/ecmwfs-new-long-range-forecasting-system-seas5",
      },
      {
        level: "Indirect",
        step: 2,
        indicator: "yield_gap_maize_s",
        interpretation: "Active corn fields",
        dataset: "Gap between observed and potential corn yield",
        sourceName: "EarthStat/Univ. of Minnesota",
        sourceUrl: "http://www.earthstat.org/data-download/",
      },
      {
        level: "Mediator",
        step: 3,
        indicator: "cattle_number_s",
        interpretation: "Count of livestock cattle",
        dataset: "Count of livestock cattle",
        sourceName: "FAO/Oxford",
        sourceUrl: "http://www.fao.org/livestock-systems/en/",
      },
      {
        level: "Mediator",
        step: 4,
        indicator: "spam_V_agg_t_sum_s",
        interpretation: "Value (USD) of crops",
        dataset: "Value (USD) of agriculture",
        sourceName: "IFPRI",
        sourceUrl: "http://mapspam.info/data/",
      },
      {
        level: "Mediator",
        step: 5,
        indicator: "et_actl_m_MAX_m",
        interpretation: "Increase in evapotranspiration",
        dataset: "Actual evapotranspiration",
        sourceName: "FewsNET",
        sourceUrl: "https://earlywarning.usgs.gov/fews/product/460",
      },
      {
        level: "Mediator",
        step: 6,
        indicator: "rurpop_s",
        interpretation: "Larger population in rural areas",
        dataset: "Population in rural areas",
        sourceName: "PBL",
        sourceUrl:
          "https://www.pbl.nl/en/publications/towards-an-urban-preview",
      },
      {
        level: "Mediator",
        step: 7,
        indicator: "ndvi_act_min_m",
        interpretation: "Greater density of greenness",
        dataset: "Density of greenness",
        sourceName: "MODIS",
        sourceUrl: "https://lpdaac.usgs.gov/products/mod13c2v006/",
      },
      {
        level: "Outcome",
        step: 8,
        indicator: "acl_sum_event_m",
        interpretation: "Conflict events",
        dataset: "Total number of conflict events",
        sourceName: "ACLED",
        sourceUrl: "https://doi.org/10.1177/0022343310378914",
      },
      {
        level: "Outcome",
        step: 9,
        indicator: "acl_sum_fatl_m",
        interpretation: "Conflict fatalities",
        dataset: "Reported fatalities from conflict events",
        sourceName: "ACLED",
        sourceUrl: "https://doi.org/10.1177/0022343310378914",
      },
    ],
  },
];

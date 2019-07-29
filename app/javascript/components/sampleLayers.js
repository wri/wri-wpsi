// 20190725155230
// http://api.resourcewatch.org/v1/dataset/098b33df-6871-4e53-a5ff-b56a7d989f9a/layer

const response = {
  "data": [
    {
      "id": "e1dc5626-c1c2-4d60-a6a9-746a33fe1cb7",
      "type": "layer",
      "attributes": {
        "name": "Political Boundaries (First Subnational Level)",
        "slug": "political-boundaries-gadm",
        "dataset": "098b33df-6871-4e53-a5ff-b56a7d989f9a",
        "description": "First-level subnational political boundaries are the largest administrative subdivisions in a country.",
        "application": [
          "rw"
        ],
        "iso": [
          "global"
        ],
        "provider": "cartodb",
        "userId": "58333dcfd9f39b189ca44c75",
        "default": true,
        "protected": false,
        "published": true,
        "env": "production",
        "layerConfig": {
          "body": {
            "layers": [
              {
                "options": {
                  "cartocss_version": "2.3.0",
                  "cartocss": "#gadm28_adm1{  polygon-fill: #3bb2d0;  polygon-opacity: 0;  line-color: #5CA2D1;  line-width: 0.5;  line-opacity: 1;}",
                  "sql": "SELECT * FROM gadm28_adm1"
                },
                "type": "cartodb"
              }
            ],
            "minzoom": 3,
            "maxzoom": 18,
            "vectorLayers": [
              {
                "paint": {
                  "line-color": " #5CA2D1",
                  "line-width": 0.5,
                  "line-opacity": 1
                },
                "source-layer": "layer0",
                "type": "line",
                "filter": [
                  "all"
                ]
              },
              {
                "paint": {
                  "fill-color": " #3bb2d0",
                  "fill-opacity": 0
                },
                "source-layer": "layer0",
                "type": "fill",
                "filter": [
                  "all"
                ]
              }
            ]
          },
          "account": "wri-01"
        },
        "legendConfig": {
          "type": "basic",
          "items": [
            {
              "name": "Subnational Political Boundaries",
              "color": "#5CA2D1"
            }
          ]
        },
        "interactionConfig": {
          "output": [
            {
              "column": "name_1",
              "format": null,
              "prefix": "",
              "property": "Name",
              "suffix": "",
              "type": "string"
            },
            {
              "column": "type_1",
              "format": null,
              "prefix": "",
              "property": "Type",
              "suffix": "",
              "type": "string"
            }
          ]
        },
        "applicationConfig": {

        },
        "staticImageConfig": {

        },
        "updatedAt": "2019-07-23T14:13:06.185Z"
      }
    },
    {
      "id": "f090245b-1b8f-414d-a3ac-6498db3b354b",
      "type": "layer",
      "attributes": {
        "name": "Political Boundaries (Second Subnational Level)",
        "slug": "Political-Boundaries-Second-Subnational-Level",
        "dataset": "098b33df-6871-4e53-a5ff-b56a7d989f9a",
        "description": "Second-level subnational political boundaries are the second-largest administrative subdivisions in a country.",
        "application": [
          "rw"
        ],
        "iso": [

        ],
        "provider": "cartodb",
        "userId": "58f63c81bd32c60206ed6b12",
        "default": false,
        "protected": false,
        "published": true,
        "env": "production",
        "layerConfig": {
          "account": "wri-01",
          "body": {
            "maxzoom": 18,
            "minzoom": 3,
            "layers": [
              {
                "type": "cartodb",
                "options": {
                  "sql": "SELECT * FROM gadm28_adm2",
                  "cartocss": "#gadm28_adm2{polygon-fill: #5CA2D1; polygon-opacity: 0; line-color: #969696; line-width: 0.5; line-opacity: 0.5; }",
                  "cartocss_version": "2.3.0"
                }
              }
            ],
            "vectorLayers": null
          }
        },
        "legendConfig": {
          "items": [
            {
              "color": "#969696",
              "name": "Administrative boundaries"
            }
          ],
          "type": "basic"
        },
        "interactionConfig": {
          "output": [
            {
              "column": "name_2",
              "format": null,
              "prefix": "",
              "property": "Name",
              "suffix": ""
            },
            {
              "column": "type_2",
              "format": null,
              "prefix": "",
              "property": "Type",
              "suffix": ""
            }
          ]
        },
        "applicationConfig": {

        },
        "staticImageConfig": {

        },
        "updatedAt": "2019-07-23T14:08:12.632Z"
      }
    },
    {
      "id": "6ca0cb14-8329-44f5-9064-13f65dcb8d32",
      "type": "layer",
      "attributes": {
        "name": "Political Boundaries (First Subnational Level)",
        "slug": "Political-Boundaries-First-Subnational-Level",
        "dataset": "098b33df-6871-4e53-a5ff-b56a7d989f9a",
        "description": "First-level subnational political boundaries are the largest administrative subdivisions in a country.",
        "application": [
          "prep"
        ],
        "iso": [

        ],
        "provider": "cartodb",
        "userId": "594a8b5b3b0f7f271d303321",
        "default": true,
        "protected": false,
        "published": true,
        "env": "production",
        "layerConfig": {
          "account": "wri-01",
          "body": {
            "maxzoom": 18,
            "minzoom": 3,
            "layers": [
              {
                "type": "cartodb",
                "options": {
                  "sql": "SELECT * FROM gadm28_adm1",
                  "cartocss": "#gadm28_adm1{  polygon-fill: #3bb2d0;  polygon-opacity: 0;  line-color: #5CA2D1;  line-width: 0.5;  line-opacity: 1;}",
                  "cartocss_version": "2.3.0"
                }
              }
            ]
          }
        },
        "legendConfig": {
          "items": [
            {
              "color": "#5CA2D1",
              "name": "Subnational Political Boundaries"
            }
          ],
          "type": "basic"
        },
        "interactionConfig": {
          "output": [
            {
              "format": null,
              "type": "text",
              "property": "Name",
              "column": "name_1"
            },
            {
              "format": null,
              "type": "text",
              "property": "Type",
              "column": "type_1"
            }
          ]
        },
        "applicationConfig": {

        },
        "staticImageConfig": {

        },
        "updatedAt": "2018-12-28T21:09:54.465Z"
      }
    },
    {
      "id": "c5e487ef-45c8-4864-99be-503c8f06de16",
      "type": "layer",
      "attributes": {
        "name": "Political Boundaries (Second Subnational Level)",
        "slug": "Political-Boundaries-Second-Subnational-Level_1",
        "dataset": "098b33df-6871-4e53-a5ff-b56a7d989f9a",
        "description": "Second-level subnational political boundaries are the second-largest administrative subdivisions in a country.",
        "application": [
          "prep"
        ],
        "iso": [

        ],
        "provider": "cartodb",
        "userId": "594a8b5b3b0f7f271d303321",
        "default": false,
        "protected": false,
        "published": true,
        "env": "production",
        "layerConfig": {
          "body": {
            "layers": [
              {
                "options": {
                  "cartocss_version": "2.3.0",
                  "cartocss": "#gadm28_adm2{polygon-fill: #969696; polygon-opacity: 0; line-color: #969696; line-width: 0.5; line-opacity: 0.5; }",
                  "sql": "SELECT * FROM gadm28_adm2"
                },
                "type": "cartodb"
              }
            ],
            "minzoom": 3,
            "maxzoom": 18
          },
          "account": "wri-01"
        },
        "legendConfig": {
          "type": "basic",
          "items": [
            {
              "name": "Administrative boundaries",
              "color": "#969696"
            }
          ]
        },
        "interactionConfig": {
          "output": [
            {
              "format": null,
              "type": "text",
              "property": "Name",
              "column": "name_2"
            },
            {
              "format": null,
              "type": "text",
              "property": "Type",
              "column": "type_2"
            }
          ]
        },
        "applicationConfig": {

        },
        "staticImageConfig": {

        },
        "updatedAt": "2018-12-28T21:10:34.439Z"
      }
    }
  ],
  "links": {
    "self": "http://api.resourcewatch.org/v1/dataset/098b33df-6871-4e53-a5ff-b56a7d989f9a/layer?page[number]=1&page[size]=10",
    "first": "http://api.resourcewatch.org/v1/dataset/098b33df-6871-4e53-a5ff-b56a7d989f9a/layer?page[number]=1&page[size]=10",
    "last": "http://api.resourcewatch.org/v1/dataset/098b33df-6871-4e53-a5ff-b56a7d989f9a/layer?page[number]=1&page[size]=10",
    "prev": "http://api.resourcewatch.org/v1/dataset/098b33df-6871-4e53-a5ff-b56a7d989f9a/layer?page[number]=1&page[size]=10",
    "next": "http://api.resourcewatch.org/v1/dataset/098b33df-6871-4e53-a5ff-b56a7d989f9a/layer?page[number]=1&page[size]=10"
  },
  "meta": {
    "total-pages": 1,
    "total-items": 4,
    "size": 10
  }
}

export const layers = response.data.map((layer) => ({
  id: layer.id,
  type: layer.type,
  ...layer.attributes,
}))

export default {
  layers
}

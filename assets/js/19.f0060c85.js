(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{467:function(e,t,a){"use strict";a.r(t);var n=a(1),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"image-player"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#image-player"}},[e._v("#")]),e._v(" Image player")]),e._v(" "),a("h2",{attrs:{id:"use"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#use"}},[e._v("#")]),e._v(" Use")]),e._v(" "),a("p",[e._v("Provide a player to display a set of images filterer by level selector and handled as frames.")]),e._v(" "),a("p",[e._v("To use this component insert the tag "),a("strong",[e._v("unidoo-player")]),e._v(" inside a "),a("strong",[e._v("v-app")]),e._v(" component.")]),e._v(" "),a("h2",{attrs:{id:"props"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[e._v("#")]),e._v(" Props")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Name")]),e._v(" "),a("th",[e._v("Type")]),e._v(" "),a("th",[e._v("Default")]),e._v(" "),a("th",[e._v("Required")]),e._v(" "),a("th",[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[a("strong",[e._v("label")])]),e._v(" "),a("td",[e._v("String")]),e._v(" "),a("td",[e._v("'frame'")]),e._v(" "),a("td",[e._v("no")]),e._v(" "),a("td",[e._v("Label used to prefix frame title")])]),e._v(" "),a("tr",[a("td",[a("strong",[e._v("data")])]),e._v(" "),a("td",[e._v("Object")]),e._v(" "),a("td",[e._v("undefined")]),e._v(" "),a("td",[e._v("no")]),e._v(" "),a("td",[e._v("Object containing data entries and level definition")])])])]),e._v(" "),a("p",[e._v("The "),a("strong",[e._v("data")]),e._v(" parameter has to be filled with an object containing fields "),a("strong",[e._v("levels")]),e._v(" and "),a("strong",[e._v("entries")]),e._v(" :")]),e._v(" "),a("ul",[a("li",[e._v("the field "),a("strong",[e._v("levels")]),e._v(" is optional, it contains an array of levels definition. Display order use the alphabetical sort of "),a("em",[e._v("name")]),e._v(" field values. Definition example :")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('    "levels": [\n      {\n        "name": "Level1",\n        "label": "Modele"\n      },\n      {\n        "name": "Level2",\n        "label": "Echelle"\n      },\n      {\n        "name": "Level3",\n        "label": "Parametre"\n      }\n    ]\n')])])]),a("ul",[a("li",[e._v("the field "),a("strong",[e._v("entries")]),e._v(" contains an array of data entries. Each entry must define fields "),a("em",[e._v("type (displayed value on graduation)")]),e._v(", "),a("em",[e._v("media.content (image location)")]),e._v(" and optionally the field "),a("em",[e._v("levels (to define entry/level associations)")]),e._v(". Basic example for one entry with levels :")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('    "entries": [\n      {\n        "type": "ech240",\n        "media": {\n          "content": "https://services.aeris-data.fr/campaigns/data/v1_0/getimage?product=Synopt_Cartes_Prevues&day=2021-08-04&file=20210804_ECMWF_CAPE-CIN_0h_Raw_MAP_Synoptic_ech240.png&campaign=MISVA"\n        },\n        "levels": [\n          {\n            "name": "Level1",\n            "value": "ECMWF"\n          },\n          {\n            "name": "Level2",\n            "value": "Synoptic"\n          },\n          {\n            "name": "Level3",\n            "value": "CAPE-CIN"\n          }\n        ]\n      }\n    ]\n')])])]),a("p",[a("em",[e._v("NB : the number of levels in entries objects must be the same as in levels definition.")])]),e._v(" "),a("h2",{attrs:{id:"example"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[e._v("#")]),e._v(" Example")]),e._v(" "),a("demo-unidoo-player")],1)}),[],!1,null,null,null);t.default=s.exports}}]);
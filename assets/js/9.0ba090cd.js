(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{440:function(e){e.exports=JSON.parse('[{"count":100,"date":"2021-07-10T00:00:00Z"},{"count":50.5,"date":"2021-07-09T00:00:00Z"},{"count":1,"date":"2021-07-08T00:00:00Z"},{"count":0,"date":"2021-01-04T00:00:00Z"},{"count":0,"date":"2021-02-14T00:00:00Z"}]')},453:function(e,o,t){"use strict";t.r(o);t(7),t(213);var s=t(440),a={data:function(){return{date:new Date(Date.UTC(2021,3,5)),showCustomColor:!1,missingAllowed:!1,maxDefinedToZero:!0,year:"2021",showCount:!1,showCustomMessage:!1,customMessage:"This is a custom message for no data",customRangeColor:["#E7FFD4","#CBFFA3","#ACFF6B","#9af356","#70ea12","#62B621"],values:s}},watch:{date:function(e){this.$unidooAlert.showSuccess("Selected date : ",e.toLocaleDateString("en-EN"))}},computed:{nextYear:function(){return((new Date).getFullYear()+1).toString()}},methods:{}},l=t(1),n=Object(l.a)(a,(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("v-app",[t("v-col",[t("v-col",[t("v-radio-group",{attrs:{row:""},model:{value:e.year,callback:function(o){e.year=o},expression:"year"}},[t("v-radio",{attrs:{label:"2020",value:"2020"}}),e._v(" "),t("v-radio",{attrs:{label:"2021",value:"2021"}}),e._v(" "),t("v-radio",{attrs:{label:e.nextYear,value:e.nextYear}})],1),e._v(" "),t("v-switch",{attrs:{label:"Allow selection on missing entry"},model:{value:e.missingAllowed,callback:function(o){e.missingAllowed=o},expression:"missingAllowed"}}),e._v(" "),t("v-switch",{attrs:{label:"Consider zero as complete value"},model:{value:e.maxDefinedToZero,callback:function(o){e.maxDefinedToZero=o},expression:"maxDefinedToZero"}}),e._v(" "),t("v-switch",{attrs:{label:"Use custom range of hexa color"},model:{value:e.showCustomColor,callback:function(o){e.showCustomColor=o},expression:"showCustomColor"}}),e._v(" "),t("v-switch",{attrs:{label:"Show count in tooltip (files is the default unit)"},model:{value:e.showCount,callback:function(o){e.showCount=o},expression:"showCount"}}),e._v(" "),t("v-switch",{attrs:{label:"Show custom message for missing entry"},model:{value:e.showCustomMessage,callback:function(o){e.showCustomMessage=o},expression:"showCustomMessage"}})],1),e._v(" "),t("unidoo-heatmap",{attrs:{values:e.values,missingAllowed:e.missingAllowed,completeValue:e.maxDefinedToZero?0:void 0,year:e.year,showCount:e.showCount,rangeColor:e.showCustomColor?e.customRangeColor:void 0,noDataText:e.showCustomMessage?e.customMessage:void 0},model:{value:e.date,callback:function(o){e.date=o},expression:"date"}}),e._v(" "),t("UnidooAlert")],1)],1)}),[],!1,null,null,null);o.default=n.exports}}]);
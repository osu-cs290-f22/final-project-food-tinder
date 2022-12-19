(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['foodCard.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<center>\n<div class=\"food-box\">\n    <div class=\"food-box-inner\">\n        <div class=\"food-box-front\">\n            <!-- Food Name-->\n            <div class=\"food-name-box\">\n                <h2 class=\"food-title\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":8,"column":20},"end":{"line":8,"column":28}}}) : helper)))
    + "\n                </h2>\n            </div>  \n            <!-- Food Box Picture -->\n            <div class=\"food-img-box\"> \n                <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"img_url") || (depth0 != null ? lookupProperty(depth0,"img_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img_url","hash":{},"data":data,"loc":{"start":{"line":13,"column":25},"end":{"line":13,"column":36}}}) : helper)))
    + " alt="
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":13,"column":41},"end":{"line":13,"column":49}}}) : helper)))
    + ">\n            </div>\n            <!-- Food Box Contents like info and cuisine-->\n            <div class=\"food-info-box\">\n                <h3 class=\"food-score\">\n                    Health Score : "
    + alias4(((helper = (helper = lookupProperty(helpers,"health_score") || (depth0 != null ? lookupProperty(depth0,"health_score") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"health_score","hash":{},"data":data,"loc":{"start":{"line":18,"column":35},"end":{"line":18,"column":51}}}) : helper)))
    + "\n                </h3>\n                <h3 class=\"food-cuisine\">\n                    Cuisine Type : "
    + alias4(((helper = (helper = lookupProperty(helpers,"cuisine") || (depth0 != null ? lookupProperty(depth0,"cuisine") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cuisine","hash":{},"data":data,"loc":{"start":{"line":21,"column":35},"end":{"line":21,"column":46}}}) : helper)))
    + "\n                </h3>\n            </div>\n        </div>\n        <div class=\"food-box-back\">\n            <h4 class=\"food-other-info\">\n                Description:  \n            </h4>\n            <p>yybuibuiybyrvtvuvtytvutvytyutvuttrxtexrexertxetrexxterxrbuioubiobuiobuio</p>\n        </div>\n    </div>\n</div>\n</center>";
},"useData":true});
})();
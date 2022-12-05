(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['foodCard.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<center>\n<div class=\"food-box\">\n    <!-- Food Name-->\n    <div class=\"food-name-box\">\n        <h2 class=\"food-title\">\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":6,"column":20}}}) : helper)))
    + "\n        </h2>\n    </div>  \n    <!-- Food Box Picture -->\n    <div class=\"food-img-box\"> \n        <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"img_url") || (depth0 != null ? lookupProperty(depth0,"img_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img_url","hash":{},"data":data,"loc":{"start":{"line":11,"column":17},"end":{"line":11,"column":28}}}) : helper)))
    + " alt="
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":11,"column":33},"end":{"line":11,"column":41}}}) : helper)))
    + ">\n    </div>\n    <!-- Food Box Contents like info and cuisine-->\n    <div class=\"inner-food-box\">\n        <div class=\"food-info-box\">\n            <h3 class=\"food-score\">\n                Health Score: "
    + alias4(((helper = (helper = lookupProperty(helpers,"health_score") || (depth0 != null ? lookupProperty(depth0,"health_score") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"health_score","hash":{},"data":data,"loc":{"start":{"line":17,"column":30},"end":{"line":17,"column":46}}}) : helper)))
    + "\n            </h3>\n            <h3 class=\"food-cuisine\">\n                Cuisine Type: "
    + alias4(((helper = (helper = lookupProperty(helpers,"cuisine") || (depth0 != null ? lookupProperty(depth0,"cuisine") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cuisine","hash":{},"data":data,"loc":{"start":{"line":20,"column":30},"end":{"line":20,"column":41}}}) : helper)))
    + "\n            </h3>\n        </div>\n        <div class=\"food-other-box\">\n            Some other food stuff\n        </div>\n    </div>\n</div>\n</center>";
},"useData":true});
templates['recents.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"recent-div\">\n\n    <h3 id=\"recent-match-header\">Last user's match:</h3>\n    <p id = \"recent-match\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"prev_name") || (depth0 != null ? lookupProperty(depth0,"prev_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"prev_name","hash":{},"data":data,"loc":{"start":{"line":4,"column":27},"end":{"line":4,"column":40}}}) : helper)))
    + "!!</p>\n\n</div>";
},"useData":true});
})();
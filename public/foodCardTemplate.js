(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['foodCard.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<center>\r\n<div class=\"food-box\">\r\n    <!-- Food Box Picture -->\r\n    <div class=\"food-img-box\"> \r\n        <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"img_url") || (depth0 != null ? lookupProperty(depth0,"img_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img_url","hash":{},"data":data,"loc":{"start":{"line":5,"column":17},"end":{"line":5,"column":28}}}) : helper)))
    + " alt="
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":5,"column":33},"end":{"line":5,"column":41}}}) : helper)))
    + ">\r\n    </div>\r\n    <!-- Food Box Contents like name and info -->\r\n    <div class=\"inner-food-box\">\r\n        <div class=\"food-name-box\">\r\n            <h2 class=\"food-title\">\r\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":11,"column":16},"end":{"line":11,"column":24}}}) : helper)))
    + "\r\n            </h2>\r\n        </div>  \r\n        <div class=\"food-info-box\">\r\n            <h3 class=\"food-score\">\r\n                Health Score: "
    + alias4(((helper = (helper = lookupProperty(helpers,"health_score") || (depth0 != null ? lookupProperty(depth0,"health_score") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"health_score","hash":{},"data":data,"loc":{"start":{"line":16,"column":30},"end":{"line":16,"column":46}}}) : helper)))
    + "\r\n            </h3>\r\n            <h3 class=\"food-cuisine\">\r\n                Cuisine Type: "
    + alias4(((helper = (helper = lookupProperty(helpers,"cuisine") || (depth0 != null ? lookupProperty(depth0,"cuisine") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cuisine","hash":{},"data":data,"loc":{"start":{"line":19,"column":30},"end":{"line":19,"column":41}}}) : helper)))
    + "\r\n            </h3>\r\n        </div>\r\n        <div class=\"food-other-box\">\r\n            Some other food stuff\r\n        </div>\r\n    </div>\r\n</div>\r\n</center>";
},"useData":true});
})();
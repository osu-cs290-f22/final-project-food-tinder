(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['results'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"results-main-box\">\n    <h2 id=\"your-results\">Your Results: Best Match</h2>\n    <!-- TODO replace with actual best match info!! -->\n    <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"img_url") || (depth0 != null ? lookupProperty(depth0,"img_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img_url","hash":{},"data":data,"loc":{"start":{"line":4,"column":13},"end":{"line":4,"column":24}}}) : helper)))
    + " alt="
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":29},"end":{"line":4,"column":37}}}) : helper)))
    + ">\n    <h3 class=\"food-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":5,"column":26},"end":{"line":5,"column":34}}}) : helper)))
    + "</h3>\n    <p class=\"health-score-text\">Average Health Score: "
    + alias4(((helper = (helper = lookupProperty(helpers,"health_score") || (depth0 != null ? lookupProperty(depth0,"health_score") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"health_score","hash":{},"data":data,"loc":{"start":{"line":6,"column":55},"end":{"line":6,"column":71}}}) : helper)))
    + "</p>\n    <p class=\"cuisine-text\">Most Liked Cuisine: "
    + alias4(((helper = (helper = lookupProperty(helpers,"cuisine") || (depth0 != null ? lookupProperty(depth0,"cuisine") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cuisine","hash":{},"data":data,"loc":{"start":{"line":7,"column":48},"end":{"line":7,"column":59}}}) : helper)))
    + "</p>\n</div>";
},"useData":true});
})();
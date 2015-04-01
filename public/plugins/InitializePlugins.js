require.config({
	paths: {
		"p_bootstrap": "/public/plugins/bootstrap/js/bootstrap",
		"p_json2": "/public/plugins/json2",
		"p_FooTable": "/public/plugins/FooTable/js/footable",
		"p_FooTable_Sort": "/public/plugins/FooTable/js/footable.sort",
		"p_searchfield": "/public/plugins/searchfield/searchfield",
		"p_SysFreightData": "/public/plugins/SysFreightData"		
	},
	shim: {
		"p_bootstrap": {
			deps: ['css!/public/plugins/bootstrap/css/bootstrap.css'],
			exports: 'BootStrap'
		},
		"p_json2": {
			exports: 'Json2'
		},
		"p_FooTable": {
			deps: ['css!/public/plugins/FooTable/css/footable.core.css'],
			exports: 'footable'
		},
		"p_FooTable_Sort": {
			deps: ['p_FooTable'],
			exports: 'FooTableSort'
		},
		"p_searchfield": {
			deps: ['css!/public/plugins/searchfield/css/searchfield.css'],
			exports: 'SearchField'
		},
		"p_SysFreightData": {
			deps: ['css!/public/plugins/Theme.css'],
			exports: 'SysFreightData'
		}
	}
});

define(["p_bootstrap","p_json2","p_FooTable","p_FooTable_Sort","p_searchfield","p_SysFreightData"], function($,BootStrap,Json2,footable,FooTableSort,SearchField,SysFreightData) {

});
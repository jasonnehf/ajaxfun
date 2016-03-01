// if you want to do something AFTER a request comes back, you need to do it in the callback function
'use strict';

$(document).ready(init);

function init(event)
{
	$("#send").click(sendRequest);
};

function sendRequest()
{
	console.log('before');

	$.ajax({
		method:'GET',
		url:"http://pokeapi.co/api/v2/pokemon",
		success: function(data){
			//console.log(data);
			// debugger;
			var $pokemon = makeListElements(data);
			$("#pokemon_entries").append($pokemon);
		},
		error: function(err) {
			console.error("error!", err);
		},
	});

	console.log('after');
}

function makeListElements(items) {

	var $lis = [];
	items.forEach(function(elt) {
		var $newli=$("<li>").html(`<a href="${elt.url}">${elt.name}</a>`);
		$lis.push($newli);
	});
	//array of jquery elements
	// debugger;
	return $lis;


}
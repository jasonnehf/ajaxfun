// if you want to do something AFTER a request comes back, you need to do it in the callback function
'use strict';
var pokedex;
$(document).ready(init);

function init(event)
{
	$('#send').click(findPokemon);
	$.ajax({
		method:'GET',
		url:"http://pokeapi.co/api/v2/pokedex/1",
		success: function(data){
			//console.log(data);
			// debugger;
			pokedex = data.pokemon_entries;
		},
		error: function(err) {
			console.error("error!", err);
		},
	});
};

function sendRequest()
{
	console.log('before');

	

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


function findPokemon()
{
	var name=$('#pokemonSearch').val().toLowerCase().trim();
	var filtered=pokedex.filter(function(pokeObj) {
		return pokeObj.pokemon_species.name===name;
	});
	var pokemon= filtered[0];
	if(pokemon)
	{
		$.get(pokemon.pokemon_species.url, function(data) {
			console.log("pokemon data:", data);
			var $card = makePokemonCard(data);
			$('#pokemon').append($card);
		});
	}
	else
	{
		console.log("pokemon not found");
	}

}


function makePokemonCard(data){
	var $card=$('#template').clone();
	$card.find('.name').text(data.name);
	$card.find('.id').text(data.id);
	$card.removeAttr('id');
	// var $card=$('<div>').addClass("card");
	// var $name=$('<div>').addClass('name');
	// $name.text(data.name);
	// var $id=$('<span>').addClass('id');
	// $id.text(data.id);
	// $card.append($name, $id);
	return $card;
}
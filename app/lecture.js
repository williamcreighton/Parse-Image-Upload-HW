var Animal = Parse.Object.extend ({
	className: "Animal"
});

var fido = new Animal;

// fido.save({
// 	name: "Fido"
// },	{
// 	success: function(){
// 		console.log('it worked!')
// 	},
// 	error: function(){
// 		console.log('whoops!')
// 	}
// });


animalQuery = new Parse.Query(Animal);

var wowoMysteryCantWait = animalQuery.get("wNoPqoEfwv", {
  success: function(animal) {
  	console.log('animal is', animal)
    // The object was retrieved successfully.
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
  }
})

// or could do ...

animalQuery = new Parse.Query(Animal);

animalQuery.get("wNoPqoEfwv")

.done(function(animal){
	console.log('animal is', animal)
})
.fail(function(object, error) {

})
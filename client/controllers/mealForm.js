app.controller('MealForm', ['$scope', '$http', '$state', 'MealForm', 'EntryEdit', 'imgur', 'imgurOptions', 
  function($scope, $http, $state, MealForm, EntryEdit, imgur, imgurOptions) {


  $scope.entriesOnPage = [];

  $scope.meal = MealForm.meal;
  $scope.mode = MealForm.mode;

  // Creates a new entry to be displayed on form
  $scope.addEntry = function() {
    console.log('Adding entry');
    $scope.entriesOnPage.push(1);
  };

  // Attaches an entry to this meal
  $scope.saveEntry = function(entry) {
    // console.log('Saving entry:', entry);
    return MealForm.meal.entries.push(entry) - 1;
  };

  // Updates an existing entry in this meal
  $scope.updateEntry = function(position, entry) {
    // console.log('Updating entry',entry,'at', position);
    MealForm.meal.entries[position] = entry;
  };


  // Has MealForm model send the meal to the server
  $scope.addMeal = function() {
    var date = +new Date($scope.meal.date);
    var meal = Object.assign({}, $scope.meal);
    meal.date = Math.floor(date / 1000);

    MealForm.addMeal(meal);
  };

  // Has MealForm model send updated meal to the server
  $scope.updateMeal = function(m) {
    // //look into this
    // $scope.meal = m;

    var date = +new Date($scope.meal.date);
    var meal = Object.assign({}, $scope.meal);
    meal.date = Math.floor(date / 1000);

    
    //adds new entries
    meal.entries.forEach(function(entry){
      entry.meal_id = meal.id;
      EntryEdit.addEntry(entry)
    });
    
    MealForm.updateMeal(meal);
  };
}]);

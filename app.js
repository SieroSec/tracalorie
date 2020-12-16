// storage ctrl
const StorageCtrl = (function (param) {

   // Public methods
   return {

   }
})();

// item ctrl
const ItemCtrl = (function (param) {
   // Item constructor

   const Item = function (id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
   }

   // Data structure / State
   const data = {
      items: [
         { id: 0, name: 'Steak Dinner', calories: 200 },
         { id: 1, name: 'Cookie', calories: 300 },
         { id: 2, name: 'Apples', calories: 100 }
      ],
      currentItem: null,
      totalCalories: 0
   }

   // Public methods
   return {
      logData: function () {
         return data;
      }
   }

})();

// UI ctrl
const UICtrl = (function (param) {


   // Public methods
   return {

   }
})();

// App ctrl
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {

   // Public methods
   return {
      init: function () {
         console.log('Initializing App...');
      }
   }
})(ItemCtrl, UICtrl, StorageCtrl);


// Initialize app

App.init();


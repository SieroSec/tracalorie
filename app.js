///////////////////// storage controller /////////////////////
const StorageCtrl = (function (param) {

   // Public methods
   return {

   }
})();

///////////////////// Item controller /////////////////////
const ItemCtrl = (function () {
   // Item constructor

   const Item = function (id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
   }

   // Data structure / State
   const data = {
      items: [
         // { id: 0, name: 'Steak Dinner', calories: 200 },
         // { id: 1, name: 'Cookie', calories: 300 },
         // { id: 2, name: 'Apples', calories: 100 }
      ],
      currentItem: null,
      totalCalories: 0
   }

   // Public methods
   return {
      getItems: function () {
         return data.items;
      },

      addItem: function (name, calories) {
         let ID;
         // create item id
         if (data.items.length > 0) {
            ID = data.items[data.items.length - 1].id + 1;
         } else {
            ID = 0;
         }

         // calories to number, create new item, add to items array
         calories = parseInt(calories);

         newItem = new Item(ID, name, calories);
         data.items.push(newItem);
         console.log(data.items);
         return newItem;
      },
      getTotalCalories: function () {
         let total = 0;

         data.items.forEach(function (just_an_argument_should_be_item) {
            total += just_an_argument_should_be_item.calories;
         });

         data.totalCalories = total;

         return data.totalCalories;
      },
      logData: function () {
         return data;
      }
   }

})();

///////////////////// UI controller /////////////////////
const UICtrl = (function (param) {
   const UISelectors = {
      itemList: '#item-list',
      addBtn: '.add-btn',
      itemNameInput: '#item-name',
      itemCaloriesInput: '#item-calories',
      totalCalories: '.total-calories'
   }

   // Public methods
   return {
      populateItemList: function (items) {
         let html = '';

         items.forEach(function (item) {
            html += `
            <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong><em>${item.calories}</em>
            <a href="#" class="secondary-content"><i class="tiny material-icons edit">edit</i></a></li>`;

            // insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;

         });
      },
      addListItem: function (item) {
         // show the list
         document.querySelector(UISelectors.itemList).style.display = 'block';
         // create li element
         const li = document.createElement('li');
         // add class, id, html and insert item
         li.className = 'collection-item';
         li.id = `item-${item.id}`;
         li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories}</em><a href="#" class="secondary-content"><i class="tiny material-icons edit">edit</i></a>`;
         document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
      },
      clearInput: function () {
         document.querySelector(UISelectors.itemNameInput).value = '';
         document.querySelector(UISelectors.itemCaloriesInput).value = '';
      },
      getItemInput: function () {
         return {
            name: document.querySelector(UISelectors.itemNameInput).value,
            calories: document.querySelector(UISelectors.itemCaloriesInput).value
         }
      },
      hideList: function () {
         document.querySelector(UISelectors.itemList).style.display = 'none';
      },
      showTotalCalores: function (totalCalories) {
         document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
      },
      getSelectors: function () {
         return UISelectors;
      }
   }
})();

///////////////////// App controller /////////////////////
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
   // load event listeners
   const loadEventListeners = function () {
      // get UI selectors
      const UISelectors = UICtrl.getSelectors();

      // add item event
      document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
   }

   // add item submit
   const itemAddSubmit = function (e) {
      // get form input from UI controller
      const input = UICtrl.getItemInput();

      // check for name and calories input
      if (input.name !== '' && input.calories !== '') {
         //check if input.calories can be converte to number
         if (!isNaN(parseInt(input.calories))) {
            // add item to array
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // add item to UI
            UICtrl.addListItem(newItem);
            // get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // add total calories to the UI
            UICtrl.showTotalCalores(totalCalories);

            // clear fields
            UICtrl.clearInput();

         } else { console.log("Calories is not integer!"); }
      }
      e.preventDefault();
   }

   // Public methods
   return {
      init: function () {
         console.log('Initializing App...');
         // Fetch items from data structure
         const items = ItemCtrl.getItems();

         // check if any items
         if (items.length === 0) {
            UICtrl.hideList();
         } else {
            // populate list of items
            UICtrl.populateItemList(items);
         }

         // get total calories
         const totalCalories = ItemCtrl.getTotalCalories();
         // add total calories to the UI
         UICtrl.showTotalCalores(totalCalories);

         // load event listeners
         loadEventListeners();
      }
   }
})(ItemCtrl, UICtrl, StorageCtrl);


// Initialize app

App.init();


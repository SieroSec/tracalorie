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
         { id: 0, name: 'Steak Dinner', calories: 200 },
         { id: 1, name: 'Cookie', calories: 300 },
         { id: 2, name: 'Apples', calories: 100 }
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
         //newItem = { id, name, calories }
         // console.log(newItem);

         data.items.push(newItem);
         console.log(data.items);
         return newItem;
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
      itemCaloriesInput: '#item-calories'
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
         // create li element
         const li = document.createElement('li');
         // add class
         li.className = 'collection-item';
         // add id
         li.id = `item-${item.id}`;

         // add html
         li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories}</em><a href="#" class="secondary-content"><i class="tiny material-icons edit">edit</i></a>`;
         // insert item
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

         // load event listeners
         loadEventListeners();

         // populate list of items
         UICtrl.populateItemList(items);
      }
   }
})(ItemCtrl, UICtrl, StorageCtrl);


// Initialize app

App.init();


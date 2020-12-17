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

      getitemById: function (id) {
         let found = null;

         // loop through the items
         data.items.forEach(function (item) {
            if (item.id === id) {
               found = item;
            }
         });
         return found;
      },

      updateItem: function (name, calories) {
         calories = parseInt(calories);
         let found = null;

         data.items.forEach(function (item) {
            // when item is in "edit" mode, data.current.id is created (filled)
            // so looping through all items in data and setting it to current
            // args passed to function (name , calories)
            if (item.id === data.currentItem.id) {
               item.name = name;
               item.calories = calories;
               found = item;
            }
         });
         return found;
      },

      deleteItem: function (id) {
         // get ids
         const ids = data.items.map(function (item) {
            return item.id;
         });

         // get index
         const index = ids.indexOf(id);

         // remove item
         data.items.splice(index, 1);
      },

      clearAllItems: function () {  
         data.items = [];
      },

      setCurrentItem: function (item) {
         data.currentItem = item;
      },

      getCurrentItem: function () {
         return data.currentItem;
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
      listItems: '#item-list li',
      addBtn: '.add-btn',
      updateBtn: '.update-btn',
      deleteBtn: '.delete-btn',
      backBtn: '.back-btn',
      clearBtn: '.clear-btn',
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
            <a href="#" class="secondary-content"><i class="tiny material-icons edit-item">edit</i></a></li>`;

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
         li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories}</em><a href="#" class="secondary-content"><i class="tiny material-icons edit-item">edit</i></a>`;
         document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
      },

      updateListItem: function (item) {
         let listItems = document.querySelectorAll(UISelectors.listItems);

         // convert node list into array
         listItems = Array.from(listItems);
         listItems.forEach(function (listItem) {
            const itemID = listItem.getAttribute('id');
            if (itemID === `item-${item.id}`) {
               document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong><em>${item.calories}</em><a href="#" class="secondary-content"><i class="tiny material-icons edit-item">edit</i></a>`;;
            }
         });
      },

      deleteListItem: function (id) {  
         const itemID = `#item-${id}`;
         const item = document.querySelector(itemID);
         item.remove();
      },

      clearInput: function () {
         document.querySelector(UISelectors.itemNameInput).value = '';
         document.querySelector(UISelectors.itemCaloriesInput).value = '';
      },

      clearAllItems: function () {
         let listItems = document.querySelectorAll(UISelectors.listItems);

         // turn node list into array
         listItems = Array.from(listItems);

         listItems.forEach(function (item) {  
            item.remove();
         });
      },

      addItemToForm: function () {
         document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
         document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
         UICtrl.showEditState();
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

      clearEditState: function () {
         UICtrl.clearInput();
         document.querySelector(UISelectors.addBtn).style.display = 'inline';
         document.querySelector(UISelectors.updateBtn).style.display = 'none';
         document.querySelector(UISelectors.deleteBtn).style.display = 'none';
         document.querySelector(UISelectors.backBtn).style.display = 'none';
      },

      showEditState: function () {
         document.querySelector(UISelectors.addBtn).style.display = 'none';
         document.querySelector(UISelectors.updateBtn).style.display = 'inline';
         document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
         document.querySelector(UISelectors.backBtn).style.display = 'inline';
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

      // disable submit on pressed enter key
      document.addEventListener('keypress', function (e) {
         if ((e.keyCode === 13) || (e.which === 13)) {
            e.preventDefault();
            return false;
         }
      });

      // edit icon click event
      document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

      // update item event
      document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

      // delete item event
      document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

      // back button event
      document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

      // clear item event
      document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
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

   // click edit icon
   const itemEditClick = function (e) {
      if (e.target.classList.contains('edit-item')) {
         // get list item id (item-0, item-1)
         const listId = e.target.parentNode.parentNode.id;

         // break item-0 into an array
         const listIdArr = listId.split('-');

         // get actual id
         const id = parseInt(listIdArr[1]);

         // get item
         const itemToEdit = ItemCtrl.getitemById(id);

         // set current item
         ItemCtrl.setCurrentItem(itemToEdit);

         // add item to form
         UICtrl.addItemToForm();
      }
      e.preventDefault();
   }

   const itemUpdateSubmit = function (e) {
      // get item input
      const input = UICtrl.getItemInput();

      // update item: input.name and input.calories parsed from the form
      const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

      // update UI 
      UICtrl.updateListItem(updatedItem);

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories to the UI
      UICtrl.showTotalCalores(totalCalories);

      UICtrl.clearEditState();

      e.preventDefault();
   }

   // delete button event
   const itemDeleteSubmit = function (e) {
      // get current item
      const currentItem = ItemCtrl.getCurrentItem();

      // delete from data structure 
      ItemCtrl.deleteItem(currentItem.id);

      // delete from UI
      UICtrl.deleteListItem(currentItem.id);

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories to the UI
      UICtrl.showTotalCalores(totalCalories);

      UICtrl.clearEditState();

      e.preventDefault();
   }

   const clearAllItemsClick = function (e) {  
      // delete all items from data structure
      ItemCtrl.clearAllItems();

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories to the UI
      UICtrl.showTotalCalores(totalCalories);

      // remove from UI
      UICtrl.clearAllItems();

      // hide ul
      UICtrl.hideList();
   }

   // Public methods
   return {
      init: function () {
         console.log('Initializing App...');

         // Clear edit state / set initial set
         UICtrl.clearEditState();

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
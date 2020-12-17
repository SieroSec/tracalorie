///////////////////// storage controller /////////////////////
const StorageCtrl = (function (param) {
   return {
      storeItem: function (item) {
         let items;
         if (localStorage.getItem('items') === null) {
            items = [];
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
         } else {
            items = JSON.parse(localStorage.getItem('items'));
            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
         }
      },

      getItemsFromStorage: function () {
         let items;
         if (localStorage.getItem('items') === null) {
            items = [];
         } else {
            items = JSON.parse(localStorage.getItem('items'));
         }
         return items;
      },

      updateItemsFromStorage: function (updatedItem) {
         let items = JSON.parse(localStorage.getItem('items'));

         items.forEach(function (item, index) {
            if (updatedItem.id === item.id) {
               items.splice(index, 1, updatedItem);
            }
         });
         localStorage.setItem('items', JSON.stringify(items));
      },

      deleteItemFromStorage: function (id) {
         let items = JSON.parse(localStorage.getItem('items'));

         items.forEach(function (item, index) {
            if (id === item.id) {
               items.splice(index, 1);
            }
         });
         localStorage.setItem('items', JSON.stringify(items));
      },

      clearItemsFromStorage: function () {
         let items = [];
         localStorage.removeItem('items');
      }
   }
})();

///////////////////// Item controller /////////////////////
const ItemCtrl = (function () {
   const Item = function (id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
   }

   const data = {
      items: StorageCtrl.getItemsFromStorage(),
      currentItem: null,
      totalCalories: 0
   }

   return {
      getItems: function () {
         return data.items;
      },

      addItem: function (name, calories) {
         let ID;
         if (data.items.length > 0) {
            ID = data.items[data.items.length - 1].id + 1;
         } else {
            ID = 0;
         }
         calories = parseInt(calories);
         newItem = new Item(ID, name, calories);
         data.items.push(newItem);
         console.log(data.items);
         return newItem;
      },

      getitemById: function (id) {
         let found = null;
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
            if (item.id === data.currentItem.id) {
               item.name = name;
               item.calories = calories;
               found = item;
            }
         });
         return found;
      },

      deleteItem: function (id) {
         const ids = data.items.map(function (item) {
            return item.id;
         });
         const index = ids.indexOf(id);
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

   return {
      populateItemList: function (items) {
         let html = '';

         items.forEach(function (item) {
            html += `
            <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong><em>${item.calories}</em>
            <a href="#" class="secondary-content"><i class="tiny material-icons edit-item">edit</i></a></li>`;

            document.querySelector(UISelectors.itemList).innerHTML = html;

         });
      },

      addListItem: function (item) {
         document.querySelector(UISelectors.itemList).style.display = 'block';
         const li = document.createElement('li');
         li.className = 'collection-item';
         li.id = `item-${item.id}`;
         li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories}</em><a href="#" class="secondary-content"><i class="tiny material-icons edit-item">edit</i></a>`;
         document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
      },

      updateListItem: function (item) {
         let listItems = document.querySelectorAll(UISelectors.listItems);
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
   const loadEventListeners = function () {
      const UISelectors = UICtrl.getSelectors();

      document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

      document.addEventListener('keypress', function (e) {
         if ((e.keyCode === 13) || (e.which === 13)) {
            e.preventDefault();
            return false;
         }
      });

      document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
      document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
      document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
      document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
      document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
   }

   const itemAddSubmit = function (e) {
      const input = UICtrl.getItemInput();

      if (input.name !== '' && input.calories !== '') {
         if (!isNaN(parseInt(input.calories))) {
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalores(totalCalories);
            StorageCtrl.storeItem(newItem);
            UICtrl.clearInput();
         } else { console.log("Calories is not integer!"); }
      }
      e.preventDefault();
   }

   const itemEditClick = function (e) {
      if (e.target.classList.contains('edit-item')) {
         const listId = e.target.parentNode.parentNode.id;
         const listIdArr = listId.split('-');
         const id = parseInt(listIdArr[1]);
         const itemToEdit = ItemCtrl.getitemById(id);
         ItemCtrl.setCurrentItem(itemToEdit);
         UICtrl.addItemToForm();
      }
      e.preventDefault();
   }

   const itemUpdateSubmit = function (e) {
      const input = UICtrl.getItemInput();
      const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
      UICtrl.updateListItem(updatedItem);
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalores(totalCalories);
      StorageCtrl.updateItemsFromStorage(updatedItem);
      UICtrl.clearEditState();
      e.preventDefault();
   }

   const itemDeleteSubmit = function (e) {
      const currentItem = ItemCtrl.getCurrentItem();
      ItemCtrl.deleteItem(currentItem.id);
      UICtrl.deleteListItem(currentItem.id);
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalores(totalCalories);
      StorageCtrl.deleteItemFromStorage(currentItem.id);
      UICtrl.clearEditState();
      e.preventDefault();
   }

   const clearAllItemsClick = function (e) {
      ItemCtrl.clearAllItems();
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalores(totalCalories);
      UICtrl.clearAllItems();
      StorageCtrl.clearItemsFromStorage();
      UICtrl.hideList();
   }

   return {
      init: function () {
         UICtrl.clearEditState();
         const items = ItemCtrl.getItems();

         if (items.length === 0) {
            UICtrl.hideList();
         } else {
            UICtrl.populateItemList(items);
         }

         const totalCalories = ItemCtrl.getTotalCalories();
         UICtrl.showTotalCalores(totalCalories);
         loadEventListeners();
      }
   }
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();
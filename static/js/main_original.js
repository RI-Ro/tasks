
function updateAllState(){
  const tasksListElement = document.querySelector(`.tasks__list1`);
  const tasksListElement2 = document.querySelector(`.tasks__list2`);
  const tasksListElement3 = document.querySelector(`.tasks__list3`);
  const tasksListElement4 = document.querySelector(`.tasks__list4`);
  const basket = document.querySelector(`#basket`);

  basket.addEventListener(`dragover`, basketover);
  basket.addEventListener(`drop`, basketDrop);

  tasksListElement.addEventListener(`dragstart`, dragStart);
  tasksListElement2.addEventListener(`dragstart`, dragStart);
  tasksListElement3.addEventListener(`dragstart`, dragStart);
  tasksListElement4.addEventListener(`dragstart`, dragStart);

  tasksListElement.addEventListener(`dragend`, dragEnd);
  tasksListElement2.addEventListener(`dragend`, dragEnd);
  tasksListElement3.addEventListener(`dragend`, dragEnd);
  tasksListElement4.addEventListener(`dragend`, dragEnd);

  tasksListElement.addEventListener(`dragover`, drag)
  tasksListElement2.addEventListener(`dragover`, drag)
  tasksListElement3.addEventListener(`dragover`, drag)
  tasksListElement4.addEventListener(`dragover`, drag)

  tasksListElement.addEventListener(`drop`, dragDrop);
  tasksListElement2.addEventListener(`drop`, dragDrop);
  tasksListElement3.addEventListener(`drop`, dragDrop);
  tasksListElement4.addEventListener(`drop`, dragDrop);

  return [tasksListElement, tasksListElement2, tasksListElement3, tasksListElement4, basket]

};

const [tasksListElement, tasksListElement2, tasksListElement3, tasksListElement4, basket] = updateAllState();

function basketover(event){
  event.preventDefault();
};

function basketDrop(event){
  let activeElement = tasksListElement.querySelector(`.selected`);
  if (!activeElement){
    activeElement = tasksListElement2.querySelector(`.selected`);
  };
  if (!activeElement){
    activeElement = tasksListElement3.querySelector(`.selected`);
  };
  if (!activeElement){
    activeElement = tasksListElement4.querySelector(`.selected`);
  };
  event.preventDefault();
  send_data1(activeElement);
  dragDrop();
};

Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
  }, false;

function create_index(){
  let index_array = new Object();

  function get_id(tle){
    let task = tle.querySelectorAll(`.tasks__item`);
    if (task.length == 0){
      const title_board = tle.querySelector(`.title_board`);
      var NewElement = document.createElement('div');
      NewElement.innerHTML = 'Задач в данной категории нет...';
      NewElement.classList.add('col-sm', 'col-sm-card', 'tasks__item', 'task')
      NewElement.id = 'NewElement';
      NewElement.appendAfter(title_board);
    };

    let tle_id = tle.id;
    let i = [];
    task.forEach((item) => {

      if (item.id == "NewElement" && task.length >= 2){
        item.remove();
      } else {
        if (item.id != "NewElement"){
        i.push(item.id);
        }
      };
    });
    if (i.length > 0){
      index_array[tle_id] = i;
    } else {
      index_array[tle_id] = false;
    };

  };

  get_id(tasksListElement);
  get_id(tasksListElement2);
  get_id(tasksListElement3);
  get_id(tasksListElement4);

  return index_array;

};

function dragStart(event){
  event.target.classList.add(`selected`);
};

function dragEnd(event){
  event.target.classList.remove(`selected`);
};

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;

  return nextElement;
};

function drag(evt) {
  evt.preventDefault();
  let activeElement = tasksListElement.querySelector(`.selected`);
  if (!activeElement){
    activeElement = tasksListElement2.querySelector(`.selected`);
  };
  if (!activeElement){
    activeElement = tasksListElement3.querySelector(`.selected`);
  };
  if (!activeElement){
    activeElement = tasksListElement4.querySelector(`.selected`);
  };
  const currentElement = evt.target;
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`tasks__item`);
  if (!isMoveable) {
    return;
  }
  const nextElement = getNextElement(evt.clientY, currentElement);
  if (
    nextElement &&
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  ) {
    return;
  }
	this.insertBefore(activeElement, nextElement);
};

function dragDrop(event){
  send_data(JSON.stringify(create_index()));
};

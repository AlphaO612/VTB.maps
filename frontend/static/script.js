
   showReg = () => {
    // Выбираем элемент на странице, получаем доступ к списку стилей и меняем нужному значение.
    
    document.getElementsByClassName('menu')[0].style.display = 'block';
    document.getElementsByClassName('menu_map')[0].style.display = 'none';
}

enterAcc = () => {
    // Выбираем элемент на странице, получаем доступ к списку стилей и меняем нужному значение.
    
    document.getElementsByClassName('menu_map4')[0].style.display = 'block';
    document.getElementsByClassName('menu')[0].style.display = 'none';
}

showOptions = () => {
    // Выбираем элемент на странице, получаем доступ к списку стилей и меняем нужному значение.
    
    document.getElementsByClassName('menu3')[0].style.display = 'block';
    document.getElementsByClassName('menu_map4')[0].style.display = 'none';
}

showInfo = () => {
    // Выбираем элемент на странице, получаем доступ к списку стилей и меняем нужному значение.
    
    document.getElementsByClassName('info_menu5')[0].style.display = 'block';
    document.getElementsByClassName('menu_map4')[0].style.display = 'none';
}

backFromMenu = () => {
    // Выбираем элемент на странице, получаем доступ к списку стилей и меняем нужному значение.
    
    document.getElementsByClassName('menu_map4')[0].style.display = 'block';
    document.getElementsByClassName('menu3')[0].style.display = 'none';
}

exitAcc = () => {
    // Выбираем элемент на странице, получаем доступ к списку стилей и меняем нужному значение.
    
    document.getElementsByClassName('menu_map')[0].style.display = 'block';
    document.getElementsByClassName('menu_map4')[0].style.display = 'none';
}

exitAcc2 = () => {
    // Выбираем элемент на странице, получаем доступ к списку стилей и меняем нужному значение.
    
    document.getElementsByClassName('menu_map')[0].style.display = 'block';
    document.getElementsByClassName('info_menu5')[0].style.display = 'none';
}

backToMenu = () => {
    // Выбираем элемент на странице, получаем доступ к списку стилей и меняем нужному значение.
    
    document.getElementsByClassName('menu_map4')[0].style.display = 'block';
    document.getElementsByClassName('info_menu5')[0].style.display = 'none';
}
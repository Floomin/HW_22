/* Эти строки кода создают три объекта с именами `Kitchen`, `Devices` и `Cosmetics`, каждый из которых
со свойством `category`. Эти объекты используются в качестве прототипов для создания новых товаров в функции
функции `createProduct`. Когда новый товар создается с помощью функции `createProduct`, он наследует
свойства от соответствующего объекта-прототипа категории. */
let Kitchen = { category: 'kitchen' };
let Devices = { category: 'devices' };
let Cosmetics = { category: 'cosmetics' };

/* Массив `let kitchenProducts` хранит список кухонных продуктов. Каждый продукт в массиве
представлен в виде объекта с такими свойствами, как `type` (название продукта), `price` (цена
продукта) и `img` (URL-адрес изображения продукта). Эти продукты будут использоваться для создания
кухонных предметов путем сопоставления с ними и вызова функции `createProduct` с объектом-прототипом `Kitchen`.
прототипом объекта `Kitchen`. */
let kitchenProducts = [
    { type: 'grater', price: 10, img: 'images/grater.svg' },
    { type: 'pastry-bag', price: 25, img: 'images/pastry-bag.svg' },
    { type: 'scale', price: 5, img: 'images/scale.svg' },
    { type: 'whisk', price: 5, img: 'images/whisk.svg' }
];

/* Массив `let devicesProducts` хранит список продуктов электронных устройств. Каждый товар в массиве
массиве представлен как объект с такими свойствами, как `type` (название товара), `price` (массив, представляющий диапазон цен) и `img` (URL изображения).
массив, представляющий диапазон цен) и `img` (URL-адрес изображения товара). Эти продукты будут
использоваться для создания элементов электронных устройств путем сопоставления с ними и вызова функции `createProduct`
с объектом-прототипом `Devices`. */
let devicesProducts = [
    { type: 'desktop', price: [10, 1000], img: 'images/desktop.svg' },
    { type: 'laptop', price: [50, 1500], img: 'images/laptop.svg' },
    { type: 'smartphone', price: [80, 2000], img: 'images/smartphone.svg' },
    { type: 'tablet', price: [20, 500], img: 'images/tablet.svg' }
];

/* Массив `cosmeticsProducts` хранит список косметических продуктов. Каждый продукт в массиве
представлен в виде объекта с такими свойствами, как `type` (название продукта), `price` (цена
продукта) и `img` (URL-адрес изображения продукта). Эти продукты будут использоваться для создания
косметических товаров путем отображения на них и вызова функции `createProduct` с объектом-прототипом `Cosmetics`
прототипом объекта. */
let cosmeticsProducts = [
    { type: 'blush', price: 100, img: 'images/blush.svg' },
    { type: 'eyeshadow', price: 50, img: 'images/eyeshadow.svg' },
    { type: 'lipstick', price: 80, img: 'images/lipstick.svg' },
    { type: 'nail-polish', price: 200, img: 'images/nail-polish.svg' },
    { type: 'perfume', price: 300, img: 'images/perfume.svg' }
];

/*
Функция `createProduct` создает новый объект продукта на основе заданного прототипа категории.
param product - Параметр `product` представляет собой объект, содержащий информацию
о товаре, такую как его тип, цена и изображение.
param categoryPrototype - Параметр `categoryPrototype` в функции `createProduct` представляет собой
объект, который служит прототипом для вновь создаваемого объекта продукта. Он используется для настройки
цепочки наследования для нового объекта продукта.
returns Возвращается новый объект продукта, созданный с помощью метода `Object.create()`
с `categoryPrototype` в качестве прототипа. Новый объект товара имеет свойства `type`, `price`,
и `img`, основанные на входном объекте `product`.
*/
function createProduct(product, categoryPrototype) {
    let newProduct = Object.create(categoryPrototype);
    newProduct.type = product.type;
    newProduct.price = product.price;
    newProduct.img = product.img;
    return newProduct;
}

/* 
Приведенные вами строки кода создают новые товарные позиции на основе существующих данных о товарах
массивов (`kitchenProducts`, `devicesProducts`, `cosmeticsProducts`) путем отображения на каждый продукт в
массива и вызова функции `createProduct` с соответствующим объектом прототипа категории
(``Кухня``, ``Устройства``, ``Косметика``)
*/
let kitchenItems = kitchenProducts.map(product => createProduct(product, Kitchen));
let devicesItems = devicesProducts.map(product => createProduct(product, Devices));
let cosmeticsItems = cosmeticsProducts.map(product => createProduct(product, Cosmetics));

/*
Функция `displayProducts` принимает идентификатор категории и массив товаров, создает HTML-элементы для
отображения изображения, названия и цены каждого товара и добавляет их к указанному элементу категории.
param categoryId - Параметр `categoryId` - это идентификатор HTML-элемента, в котором вы хотите
отображать товары. Эта функция динамически создает и добавляет элементы товаров к
указанному элементу категории на основе предоставленных данных о товарах.
param items - Параметр `items` в функции `displayProducts` представляет собой массив объектов.
представляющих товары.
*/
function displayProducts(categoryId, items) {
    let categoryDiv = document.getElementById(categoryId);
    let productsDiv = document.createElement('div');
    productsDiv.className = 'products';
    items.forEach(item => {
        let productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = ` 
        <img src="${item.img}" alt="${item.type}">
        <p>Name: <strong>${item.type}</strong></p>
        <p class='price'> Price: <strong>$${Array.isArray(item.price) ? item.price.join('-') : item.price}</strong></p>`;
        productsDiv.appendChild(productDiv);
    });
    categoryDiv.appendChild(productsDiv);
};

/*
Код `document.addEventListener('DOMContentLoaded', function () { ... });` - это слушатель события
который ожидает полной загрузки и разбора HTML-документа перед выполнением предоставленной
функцию.
*/
document.addEventListener('DOMContentLoaded', function () {
    displayProducts('kitchen', kitchenItems);
    displayProducts('devices', devicesItems);
    displayProducts('cosmetics', cosmeticsItems);
});
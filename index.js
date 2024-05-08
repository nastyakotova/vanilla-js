const createElem = (data, elemData, array = undefined, tag = 'div', className = elemData, additionalParam) => {

    const elem = document.createElement(tag);
    elem.className = className;

    switch (elemData) {
        case 'Image':
            if (additionalParam > 7) additionalParam = 1;
            elem.src = `../images/${additionalParam + 1}.jpg`;
            elem.alt = elemData;
            break;
        case 'button':
            elem.innerText = 'LeraSuper';
            break;
        case 'quantity':
            elem.innerText = data[elemData] + ' pcs';
            break;
        case 'name':
        case 'descr':
            elem.innerText = data[elemData];
            break;
        case 'dateTime':
            const date = new Date(data[additionalParam]);
            elem.innerText = getDateTime(date);
            break;
        case 'price':
            elem.innerText = `${data[additionalParam]} ${data[elemData]}`;
            break;
        default:
            elem.innerText = '';
    }

    if (array !== undefined) array.push(elem);

    return elem;
};

const twoDigits = (num) => {
    return num < 10 ? num = `0${num}` : num;
};

const shortYear = (year) => { return String(year).slice(2, 4); };

const getDateFormat = (date) => {
    return `${twoDigits(date.getDate())}.${twoDigits(date.getMonth() + 1)}.${shortYear(date.getFullYear())}`
};

const getTimeFormat = (date) => {
    return `${twoDigits(date.getUTCHours())}:${twoDigits(date.getMinutes())}`
};

const getDateTime = (date) => {
    return `${getTimeFormat(date)} ${getDateFormat(date)}`;
};

const modalWrapper = document.getElementById('modal-wrapper');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close-button');
const modalContent = document.getElementById('modal-content');

const handleClick = (data, index) => {

    modalWrapper.style.display = 'flex';
    console.log(data);

    const modalContentArray = [];

    const modalImageContent = createElem(data, 'modal-image-wrapper', modalContentArray);
    const modalTextContent = createElem(data, 'modal-text-wrapper', modalContentArray);

    appendChildFunc(modalContent, modalContentArray);

    const modalImageArray = [];

    const modalImage = createElem(data, 'Image', modalImageArray, 'img', 'modal-image', index);
    const modalQuantity = createElem(data, 'quantity', modalImageArray);

    appendChildFunc(modalImageContent, modalImageArray);

    const modalTextArray = [];

    const modalHeader = createElem(data, 'name', modalTextArray, undefined, 'modal-header');
    const modalDescription = createElem(data, 'descr', modalTextArray, undefined, 'modal-descr');
    const modalPrice = createElem(data, 'price', modalTextArray, undefined, 'modal-price', 'currency');
    const modalDateTime = createElem(data, 'dateTime', modalTextArray, undefined, 'modal-dateTime', 'deliveryDate');
    const modalButton = createElem(data, 'button', modalTextArray, 'button', 'modal-button');

    appendChildFunc(modalTextContent, modalTextArray);
};

const handleCloseModal = (event) => {
    if (event.target.id !== 'modal') {
        modalWrapper.style.display = 'none';
        modalContent.innerHTML = '';

    }
};

modalWrapper.addEventListener('click', handleCloseModal);
closeButton.addEventListener('click', handleCloseModal);

const appendChildFunc = (elem, сhildren) => {
    for (let child of сhildren) {
        elem.appendChild(child);
    }
};

async function init() {
    const kot = await fetch('https://65d46b083f1ab8c634350f7b.mockapi.io/api/items2');
    const kotContainer = document.getElementById('kot');
    if (kot.status === 200) {
        const dataKot = await kot.json();
        const kotContainer = document.getElementById('kot');
        console.log(kotContainer);
        dataKot.forEach((kot2, index) => {

            const wrapper = createElem(kot2, 'wrapper');

            const wrapperArray = [];

            const imageWrapper = createElem(kot2, 'image-wrapper', wrapperArray);
            const name = createElem(kot2, 'name', wrapperArray);
            const price = createElem(kot2, 'price', wrapperArray, undefined, undefined, 'currency');
            const button = createElem(kot2, 'button', wrapperArray, 'button');

            const imageWrapperArray = [];

            const image = createElem(kot2, 'Image', imageWrapperArray, 'img', 'image-wrapper', index);
            const quantity = createElem(kot2, 'quantity', imageWrapperArray);
            const dateTime = createElem(kot2, 'dateTime', imageWrapperArray, undefined, undefined, 'deliveryDate');

            kotContainer.appendChild(wrapper);
            appendChildFunc(wrapper, wrapperArray);
            appendChildFunc(imageWrapper, imageWrapperArray);

            button.addEventListener('click', () => handleClick(kot2, index));
        });
    } else {
        kotContainer.innerText = `Произошла ошибка ${kot.status}`;
    }
}
init();
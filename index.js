const createElem = (data, elemData, tag = 'div', className = elemData, index) => {
    const elem = document.createElement(tag);
    elem.className = className;

    if (tag === 'img') {
        if (index > 7) index = 1;
        elem.src = `../images/${index + 1}.jpg`;
        elem.alt = elemData;
    }
    else if (tag === 'button') {
        elem.innerText = 'LeraSuper';
    }
    else {
        elemData.includes('wrapper') || elemData == 'price' || elemData == 'dateTime' ?
            elem.innerText = '' : elem.innerText = data[elemData];
    }

    return elem;
};

const twoDigits = (num) => {
    return num < 10 ? num = `0${num}` : num;
};

const shortYear = (year) => { return String(year).slice(2,4); };

const modalWrapper = document.getElementById('modal-wrapper');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close-button');
const modalContent = document.getElementById('modal-content');

const handleClick = (data) => {
    modalWrapper.style.display = 'flex';
    const modalHeader = createElem(data, 'name', undefined, 'modal-header');
    modalContent.appendChild(modalHeader);
}

const handleCloseModal = (event) => {
    if (event.target.id !== 'modal') {
        modalWrapper.style.display = 'none';
        modalContent.innerHTML = '';
    }
}

modalWrapper.addEventListener('click', handleCloseModal);
closeButton.addEventListener('click', handleCloseModal);

async function init() {
    const kot = await fetch('https://65d46b083f1ab8c634350f7b.mockapi.io/api/items2');
    const kotContainer = document.getElementById('kot');
    if (kot.status === 200) {
        const dataKot = await kot.json();
        const kotContainer = document.getElementById('kot');
        console.log(kotContainer);
        dataKot.forEach((kot2, index) => {
            console.log(kot2);

            const wrapper = createElem(kot2, 'wrapper');
            kotContainer.appendChild(wrapper);

            const imageWrapper = createElem(kot2, 'image-wrapper');
            wrapper.appendChild(imageWrapper);

            const image = createElem(kot2, 'Image', 'img', 'image-wrapper', index);
            imageWrapper.appendChild(image);

            const name = createElem(kot2, 'name');
            const quantity = createElem(kot2, 'quantity');
            quantity.innerText += ' pcs';
            imageWrapper.appendChild(quantity);

            const deliveryDate = new Date(kot2.deliveryDate);
            const date = `${twoDigits(deliveryDate.getDate())}.${twoDigits(deliveryDate.getMonth() + 1)}.${
                shortYear(deliveryDate.getFullYear())}`;
            const time = `${twoDigits(deliveryDate.getUTCHours())}:${twoDigits(deliveryDate.getMinutes())}`;

            const dateTime = createElem(kot2, 'dateTime');
            dateTime.innerText = `${time} ${date}`;
            imageWrapper.appendChild(dateTime);

            const price = createElem(kot2, 'price');
            price.innerText = `${kot2.currency} ${kot2.price}`;

            const button = createElem(kot2, 'button', 'button');

            wrapper.appendChild(name);

            wrapper.appendChild(price);
            wrapper.appendChild(button);
        });
    }
    else {
        kotContainer.innerText = `Произошла ошибка ${kot.status}`;
    }
}
init();
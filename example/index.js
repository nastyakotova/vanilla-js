const container = document.getElementById('root');

async function init() {
    const response = await fetch('https://65d46b083f1ab8c634350f7b.mockapi.io/api/items');
// kot
    if (response.status === 200) {
        const data = await response.json();

        data.forEach((item, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'wrapper';
            container.appendChild(wrapper);

            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'image-wrapper';
            wrapper.appendChild(imageWrapper);

            const image = document.createElement('img');
            image.src = `../images/${index + 1}.jpg`;
            image.alt = 'Image';
            image.className = 'image-wrapper';
            imageWrapper.appendChild(image);

            const time = document.createElement('div');
            time.className = 'time';
            const deliveryDate = new Date(item.deliveryDate);
            time.innerText = `${deliveryDate.getHours()}h ${deliveryDate.getMinutes()}m ${deliveryDate.getSeconds()}s`;
            imageWrapper.appendChild(time);

            const name = document.createElement('div');
            name.className = 'name';
            name.innerText = item.name;

            const price = document.createElement('div');
            price.className = 'price';
            price.innerText = item.price;

            const button = document.createElement('button');
            button.className = 'button';
            button.innerText = 'PLACE BID';

            wrapper.appendChild(name);
            wrapper.appendChild(price);
            wrapper.appendChild(button);
        })
    } else {
        // error
    }
}

init();
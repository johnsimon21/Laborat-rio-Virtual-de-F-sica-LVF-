
function buildRulerX(axis) {
    const ruler = document.querySelector(axis);
    const markSpacing = 5;
    const lastPostion = 100;
    const startPosition = 0;

    for (let index = startPosition; index <= lastPostion; index++) {
        const mark = document.createElement("div");
        mark.className = "mark";
        mark.style.left = `${index}%`;

        if (index % markSpacing === 0)
            mark.style.backgroundColor = 'black';

        ruler.appendChild(mark);

        const number = document.createElement("div");
        number.className = "number";
        number.style.left = `${index}%`;
        if(index === 0){
            number.style.left = "-10px"
            number.style.top = "4px"
        }

        number.textContent = `${index === 0 || index % markSpacing === 0 ? index : ''}`;


        ruler.appendChild(number);
    }
}
function buildRulerY(axis) {
    const ruler = document.querySelector(axis);
    const markSpacing = 5;
    const lastPostion = 0;
    const startPosition = 100;
    let position = 0

    for (let index = startPosition; index >= lastPostion; index--) {

        const mark = document.createElement("div");
        mark.className = "mark";
        mark.style.top = `${index}%`;

        if (index % markSpacing === 0)
            mark.style.backgroundColor = 'black';

        ruler.appendChild(mark);

        const number = document.createElement("div");
        number.className = "number";
        number.style.top = `${index - 1.5}%`;
        number.textContent = `${position !== 0 && position % markSpacing === 0 ? position : ''}`;

        position++
        ruler.appendChild(number);
    }
}

buildRulerX('.ruler-x')
buildRulerY('.ruler-y')
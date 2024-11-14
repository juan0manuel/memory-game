// Escuchar cuando todo el contenido de la página haya sido cargado.
document.addEventListener("DOMContentLoaded", () => {

    // Array de objetos que contiene los nombres e imágenes de las cartas.
    const cardsArray = [
        { name: "badger", img: "img/badger.png" },
        { name: "grizzly", img: "img/grizzly.png" },
        { name: "lynx", img: "img/lynx.png" },
        { name: "mole", img: "img/mole.png" },
        { name: "vulture", img: "img/vulture.png" },
        { name: "wolf", img: "img/wolf.png" },
        { name: "badger", img: "img/badger.png" }, // Repetidas para formar parejas
        { name: "grizzly", img: "img/grizzly.png" }, // Cada pareja tiene dos objetos con el mismo nombre.
        { name: "lynx", img: "img/lynx.png" },
        { name: "mole", img: "img/mole.png" },
        { name: "vulture", img: "img/vulture.png" },
        { name: "wolf", img: "img/wolf.png" }
    ];

    // Mezclar el array de cartas de manera aleatoria.
    cardsArray.sort(() => 0.5 - Math.random());

    // Imprimir en consola las cartas mezcladas (útil para depuración).
    console.log(cardsArray);

    // Seleccionar el contenedor de la cuadrícula en el HTML.
    const grid = document.querySelector(".grid");

    // Seleccionar el marcador de puntuación en el HTML.
    const scoreDisplay = document.querySelector("#result");

    // Arrays para almacenar las cartas seleccionadas y las que ya han sido encontradas.
    var cardsChosen = []; // Nombres de las cartas seleccionadas
    var cardsChosenId = []; // IDs de las cartas seleccionadas
    var wonCards = []; // Parejas ganadas

    // Función para crear el tablero del juego
    function createBoard() {
        // Recorrer todas las cartas del array y generar elementos de imagen (img).
        for (let i = 0; i < cardsArray.length; i++) {
            var card = document.createElement("img"); // Crear un nuevo elemento <img>
            card.setAttribute("src", "img/arukay_logo.jpg"); // Imagen de reverso de la carta
            card.setAttribute("data-id", i); // Asignar un atributo data-id con el índice de la carta
            card.setAttribute("width", "100px"); // Definir el ancho de la imagen
            card.setAttribute("height", "100px"); // Definir el alto de la imagen
            card.addEventListener("click", flipCard); // Agregar un evento de clic para voltear la carta
            grid.appendChild(card); // Añadir la carta a la cuadrícula en el HTML
        }
    }

    // Llamar a la función para crear el tablero del juego.
    createBoard();

    // Función que se ejecuta para verificar si las dos cartas seleccionadas son iguales.
    function checkForMatch() {
        var cards = document.querySelectorAll("img"); // Seleccionar todos los elementos <img> de la página.
        const optionOneId = cardsChosenId[0]; // Obtener el ID de la primera carta seleccionada.
        const optionTwoId = cardsChosenId[1]; // Obtener el ID de la segunda carta seleccionada.

        // Verificar si el jugador ha hecho clic en la misma carta dos veces (mismo ID).
        if (optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute("src", "img/arukay_logo.jpg"); // Volver a ocultar la carta.
            cards[optionTwoId].setAttribute("src", "img/arukay_logo.jpg");
            alert("Hiciste clic en la misma carta."); // Aviso para el jugador.
        } 
        // Verificar si las dos cartas seleccionadas tienen el mismo nombre (es una coincidencia).
        else if (cardsChosen[0] === cardsChosen[1]) {
            alert("¡Coincidencia!"); // Aviso de que ha encontrado una coincidencia.
            cards[optionOneId].setAttribute("src", "img/white_background.jpg"); // Mostrar una carta con fondo blanco.
            cards[optionTwoId].setAttribute("src", "img/white_background.jpg"); // Mostrar la segunda carta.
            // Quitar el evento "click" de las cartas para que no puedan seleccionarse de nuevo.
            cards[optionOneId].removeEventListener("click", flipCard);
            cards[optionTwoId].removeEventListener("click", flipCard);
            wonCards.push(cardsChosen); // Añadir la pareja encontrada a la lista de cartas ganadas.
        } 
        // Si las cartas no coinciden
        else {
            cards[optionOneId].setAttribute("src", "img/arukay_logo.jpg"); // Volver a mostrar el reverso de la carta.
            cards[optionTwoId].setAttribute("src", "img/arukay_logo.jpg");
            alert("No coinciden, sigue intentando."); // Aviso de que no hubo coincidencia.
        }

        // Vaciar los arrays para que el jugador pueda seleccionar nuevas cartas.
        cardsChosen = [];
        cardsChosenId = [];

        // Actualizar el marcador en pantalla con el número de coincidencias encontradas.
        scoreDisplay.textContent = wonCards.length;

        // Verificar si el jugador ha encontrado todas las parejas de cartas.
        if (wonCards.length === cardsArray.length / 2) {
            scoreDisplay.textContent = "¡Felicidades, has ganado!"; // Mostrar mensaje de victoria.
        }
    }

    // Función que se ejecuta cuando una carta es seleccionada (clic en la carta).
    function flipCard() {
        const cardId = this.getAttribute("data-id"); // Obtener el ID de la carta seleccionada.

        // Verificar si el jugador ya seleccionó esta carta antes (para evitar seleccionar la misma carta dos veces).
        if (cardsChosenId.includes(cardId)) {
            return; // Si ya ha sido seleccionada, no hacer nada.
        }

        // Añadir el nombre e ID de la carta seleccionada a los arrays.
        cardsChosen.push(cardsArray[cardId].name); // Añadir el nombre de la carta.
        cardsChosenId.push(cardId); // Añadir el ID de la carta.

        // Mostrar la imagen de la carta seleccionada (voltear la carta).
        this.setAttribute("src", cardsArray[cardId].img);

        // Si se han seleccionado dos cartas, verificar si coinciden.
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500); // Esperar medio segundo antes de verificar la coincidencia.
        }
    }
});
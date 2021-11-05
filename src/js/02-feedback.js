// import throttle from 'lodash.throttle'
// import '../css/common.css';
// import '../css/feedback-form.css';
const STORAGE_KEY = 'feedback-msg'

const refs = {
    form: document.querySelector('.js-feedback-form'),
    textarea: document.querySelector('.js-feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', onTextareaInput);

populateTextarea();
/*
 * - Останавливаем поведение по умолчанию
 * - Убираем сообщение из хранилища
 * - Очищаем форму
 */
function onFormSubmit(event) {
    event.preventDefault();
    
    console.log("Отправить отзыв")
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY)
};


/*
 * - Получаем значение поля
 * - Сохраняем его в хранилище
 * - Можно добавить throttle
 */
function onTextareaInput(event) {
    const message = event.target.value;
    localStorage.setItem(STORAGE_KEY, message);
    
}

/*
 * - Получаем значение из хранилища
 * - Если там что-то было, обновляем DOM
 */

function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
   
    if (savedMessage) {
         console.log(savedMessage);
        refs.textarea.value = savedMessage;
    }
}
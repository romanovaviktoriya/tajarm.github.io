document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
    const toggler = document.querySelector(`.c-navbar__toggler`);
    const collapse = document.querySelector(`.c-navbar__collapse`);
    const modals = [].slice.call(document.querySelectorAll(`[data-toggle="modal"]`));
    const closeButtons = [].slice.call(document.querySelectorAll(`[data-dismiss="modal"][aria-label="Close"]`));
    const anchors = [].slice.call(document.querySelectorAll(`a[href*="#"]`));
    const animationTime = 300;
    const framesCount = 20;
    const more = document.querySelector(`.c-works__btn`);
    const icons = document.querySelectorAll(`.c-testimonials__link`);
    const testmonials = document.querySelector(`.c-testimonials__list`);
    const recalls = testmonials.querySelectorAll(`.c-testimonials__recall`);
    const formContact = document.querySelector(`#contactForm`);
    const formSubscribe = document.querySelector(`#subscribeForm`);

    //** Navbar toggle */
    const toggleMobileMenu = function() {
        toggler.classList.toggle(`collapsed`);
        toggler.classList.contains('collapsed') ? collapse.classList.add(`show`) : collapse.classList.remove(`show`);
    };

    toggler.addEventListener(`click`, toggleMobileMenu);

    //** Modal */
    const toggleShowModal = function(event) {
        event.preventDefault();

        let element = event.currentTarget;
        let mod = element.getAttribute(`data-target`);
        document.querySelector(mod).classList.add(`show`);
        document.body.classList.add(`modal--opened`);
    };

    modals.forEach(function(item) {
        item.addEventListener('click', toggleShowModal);
    });

    //** Close button modal */
    const closeModal = function(event) {
        event.preventDefault();

        let modal = event.target.closest(`.c-modal`);
        modal.classList.remove(`show`);
        document.body.classList.remove(`modal--opened`);
    }

    if(closeButtons.length) {
        closeButtons.forEach(function(item) {
            item.addEventListener('click', closeModal);
        });
    }

    //** Anchors scroll */
    anchors.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

            let scroller = setInterval(function() {
            let scrollBy = coordY / framesCount;
            if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                window.scrollBy(0, scrollBy);
            } else {
                window.scrollTo(0, coordY);
                clearInterval(scroller);
            }
            }, animationTime / framesCount);
        });
    });

    //** Works */
    const loadMoreWorks = function(event) {
        event.preventDefault();

        alert(`Заглушка. Возможна ajax-подгрузка данных и вставка на страницу`)
    };

    more.addEventListener(`click`, loadMoreWorks);

    //** Testimonials */
    const toggleRecall = function(event) {
        event.preventDefault();

        recalls.forEach((el) => {
            el.classList.remove(`c-testimonials__recall--active`);
        });

        icons.forEach((el) => {
            el.parentElement.classList.remove(`c-testimonials__avatar--active`);
        });

        let element = event.currentTarget;
        let id = element.id;
        let recall = testmonials.querySelector(`.c-testimonials__recall[data-id="${id}"]`);
        recall.classList.add(`c-testimonials__recall--active`);
        element.parentElement.classList.add(`c-testimonials__avatar--active`);
    };

    icons.forEach.call(icons,function(el){
        el.addEventListener(`click`, toggleRecall);
    });

    //** Contact form */
    const submitContactForm = function (event) {
        event.preventDefault();

        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                // success, show this.responseText here
                console.log(`SUCCESS`, this);
            }
        }

        request.open(this.method, this.action, true);
        request.setRequestHeader(`Content-Type`, `application/x-www-form-urlencoded`);

        var data = new FormData(this);
        for (var key of data.keys())
        console.log(`[${key}]: ${data.get(key)}`);

        request.send(data);
        this.reset();
    };

    formContact.addEventListener(`submit`, submitContactForm);
    formSubscribe.addEventListener(`submit`, submitContactForm);
});

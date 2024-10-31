document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to my portfolio site!");

    const projects = document.querySelectorAll('.project');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('alternate')) {
                    entry.target.classList.add('slide-in-right');
                } else {
                    entry.target.classList.add('slide-in-left');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projects.forEach(project => {
        observer.observe(project);
    });
});
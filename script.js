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

    // Scroll indicator functionality for projects page
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (scrollIndicator) {
        let hasScrolled = false;
        
        function handleScroll() {
            console.log('Scroll detected!'); // Debug log
            // Hide immediately on first scroll
            if (!hasScrolled) {
                hasScrolled = true;
                console.log('Hiding scroll indicator'); // Debug log
                scrollIndicator.classList.add('hidden');
                scrollIndicator.classList.remove('visible');
                
                // Remove scroll listener after first scroll to improve performance
                window.removeEventListener('scroll', handleScroll);
                document.removeEventListener('scroll', handleScroll);
            }
        }
        
        // Add listeners to both window and document for better coverage
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true });
        
        // Also check for any page movement
        let initialScrollY = window.scrollY || window.pageYOffset;
        
        function checkScrollPosition() {
            const currentScrollY = window.scrollY || window.pageYOffset;
            if (currentScrollY !== initialScrollY && !hasScrolled) {
                handleScroll();
            }
        }
        
        // Check scroll position periodically
        const scrollCheckInterval = setInterval(() => {
            if (hasScrolled) {
                clearInterval(scrollCheckInterval);
            } else {
                checkScrollPosition();
            }
        }, 100);
        
        // Initially show the indicator after a delay
        setTimeout(() => {
            if (!hasScrolled) {
                console.log('Showing scroll indicator'); // Debug log
                scrollIndicator.classList.add('visible');
            }
        }, 2000);
    }

    // 3D tilt effect for profile picture
    const profileImg = document.querySelector('.profile-picture img');
    
    if (profileImg) {
        profileImg.addEventListener('mousemove', (e) => {
            const rect = profileImg.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate mouse position relative to center
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            // Calculate rotation angles (opposite direction for realistic tilt)
            const rotateX = (mouseY / (rect.height / 2)) * -25; // Tilt up/down (opposite) - increased from -15 to -25
            const rotateY = (mouseX / (rect.width / 2)) * 25;   // Tilt left/right (same direction) - increased from 15 to 25
            
            // Apply the transform
            profileImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        profileImg.addEventListener('mouseleave', () => {
            // Reset to original position
            profileImg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
});
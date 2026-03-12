document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = mobileMenuToggle.querySelector('i');

    // 1. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');

        // Toggle icon between bars and times (close)
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu open

            // Add close button inside the drawer if it doesn't exist
            if (!document.getElementById('mobile-drawer-close')) {
                const closeBtn = document.createElement('button');
                closeBtn.id = 'mobile-drawer-close';
                closeBtn.className = 'mobile-drawer-close';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                navLinks.insertBefore(closeBtn, navLinks.firstChild);

                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navLinks.classList.remove('active');
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                    document.body.style.overflow = '';

                    // Close all dropdowns when main menu is closed
                    document.querySelectorAll('.dropdown, .dropdown-submenu').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                });
            }

            // Generate Mobile Contact Button if it doesn't exist
            if (!document.getElementById('mobile-contact-btn')) {
                const navBtn = document.querySelector('.nav-actions .btn-primary');
                if (navBtn) {
                    const navBtnClone = navBtn.cloneNode(true);
                    navBtnClone.id = 'mobile-contact-btn';
                    navBtnClone.classList.add('mobile-contact-btn');
                    navBtnClone.style.display = 'flex';
                    navBtnClone.style.justifyContent = 'center';
                    navLinks.appendChild(navBtnClone);
                }
            }
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            document.body.style.overflow = '';

            // Close all dropdowns when main menu is closed
            document.querySelectorAll('.dropdown, .dropdown-submenu').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // 3. Accordion Dropdown functionality for Mobile
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger, .submenu-trigger');

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();

                const parent = trigger.parentElement;

                // If it's a top-level dropdown, close other top-level dropdowns
                if (parent.classList.contains('dropdown')) {
                    document.querySelectorAll('.dropdown').forEach(dropdown => {
                        if (dropdown !== parent) {
                            dropdown.classList.remove('active');
                        }
                    });
                }

                // If it's a submenu, close other submenus inside the same dropdown
                if (parent.classList.contains('dropdown-submenu')) {
                    const siblingSubmenus = parent.parentElement.querySelectorAll('.dropdown-submenu');
                    siblingSubmenus.forEach(submenu => {
                        if (submenu !== parent) {
                            submenu.classList.remove('active');
                        }
                    });
                }

                parent.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when a direct link is clicked
    const allDirectLinks = document.querySelectorAll('.nav-links a:not(.dropdown-trigger):not(.submenu-trigger)');
    allDirectLinks.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    });

    // 4. Sequential Video Playback for Hero Section
    const heroVideo = document.getElementById('main-hero-video');
    if (heroVideo) {
        // List of video sources to loop through
        const videos = [
            'vedios/Video_Generation_Request_Fulfilled.mp4',
            'vedios/AI_Surveillance_of_Indian_Commuters.mp4',
            'vedios/Video_Generation_of_Jumping_on_Fence.mp4',
            'vedios/Video_Customization_Indian_People_Person_Display.mp4'
        ];
        let currentVideoIndex = 0;

        // When the current video ends, switch to the next one
        heroVideo.addEventListener('ended', () => {
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;

            // Fade out slightly
            heroVideo.style.opacity = 0.8;

            setTimeout(() => {
                heroVideo.src = videos[currentVideoIndex];
                heroVideo.load(); // Important: load the new source
                heroVideo.play().catch(e => console.log('Autoplay prevented:', e));

                // Fade back in
                heroVideo.style.opacity = 1;
            }, 200); // Small delay for smooth transition effect
        });
    }

    // 5. Contact Sales Form Character Counter
    const messageInput = document.getElementById('message');
    const messageCounter = document.getElementById('message-counter');

    if (messageInput && messageCounter) {
        messageInput.addEventListener('input', () => {
            const currentLength = messageInput.value.length;
            messageCounter.textContent = `${currentLength}/200`;

            if (currentLength >= 200) {
                messageCounter.style.color = '#ef4444'; // Red if maxed out
            } else {
                messageCounter.style.color = 'var(--text-muted)';
            }
        });
    }

    // 6. Contact Tabs
    const tabBtns = document.querySelectorAll('.contact-tab-btn');
    const tabContents = document.querySelectorAll('.contact-tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active to clicked button and target content
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-tab');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    // 7. Manage Personal vs Business form fields
    const userTypeRadios = document.querySelectorAll('input[name="user_type"]');
    const companySection = document.getElementById('company-details-section');
    const companyNameInput = document.getElementById('company_name');

    if (userTypeRadios.length > 0 && companySection) {
        userTypeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'personal') {
                    // Hide company section and remove required attribute
                    companySection.style.display = 'none';
                    if (companyNameInput) companyNameInput.removeAttribute('required');
                } else {
                    // Show company section and add required attribute
                    companySection.style.display = 'block';
                    if (companyNameInput) companyNameInput.setAttribute('required', 'required');
                }
            });
        });
    }

});

// 8. Product Image Gallery functionality
window.changeImage = function(thumbnailElement, imageSrc) {
    const mainImage = document.getElementById('main-product-image');
    
    // Smooth transition effect
    mainImage.style.opacity = '0.5';
    
    setTimeout(() => {
        mainImage.src = imageSrc;
        mainImage.style.opacity = '1';
    }, 150);

    // Update active state on thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnailElement.classList.add('active');
};

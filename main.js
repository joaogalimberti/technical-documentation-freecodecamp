// TechDocs - Clean & Professional
// Simple and functional interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================
    // MOBILE MENU TOGGLE
    // =====================================
    
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    }
    
    // =====================================
    // SEARCH FUNCTIONALITY
    // =====================================
    
    const searchInput = document.getElementById('searchInput');
    const sections = document.querySelectorAll('.section');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                
                if (query === '' || text.includes(query)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
    
    // =====================================
    // ACTIVE NAVIGATION
    // =====================================
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // Smooth scroll when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });
    
    // =====================================
    // COPY CODE FUNCTIONALITY
    // =====================================
    
    const copyButtons = document.querySelectorAll('.code-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const codeBlock = this.closest('.code-block');
            const code = codeBlock.querySelector('pre code');
            const text = code.textContent;
            
            try {
                await navigator.clipboard.writeText(text);
                
                // Visual feedback
                const originalText = this.innerHTML;
                this.classList.add('copied');
                this.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copiado!
                `;
                
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.innerHTML = originalText;
                }, 2000);
                
            } catch (err) {
                console.error('Erro ao copiar:', err);
            }
        });
    });
    
    // =====================================
    // BACK TO TOP BUTTON
    // =====================================
    
    const backToTop = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // =====================================
    // KEYBOARD SHORTCUTS
    // =====================================
    
    document.addEventListener('keydown', function(e) {
        // Focus search with Ctrl/Cmd + K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Clear search with Escape
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.blur();
            sections.forEach(section => section.style.display = 'block');
        }
    });
    
    // =====================================
    // SMOOTH REVEAL ON SCROLL
    // =====================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply reveal effect to sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // =====================================
    // CONSOLE MESSAGE
    // =====================================
    
    console.log('%cTechDocs', 'color: #3B82F6; font-size: 20px; font-weight: bold;');
    console.log('%cDocumentação de programação moderna e limpa', 'color: #6B7280;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #E5E7EB;');
    console.log('%cAtalhos:', 'color: #3B82F6; font-weight: bold;');
    console.log('%c  Ctrl/Cmd + K  →  Buscar', 'color: #6B7280;');
    console.log('%c  Esc           →  Limpar busca', 'color: #6B7280;');
});

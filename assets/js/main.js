// ==============================================
// main.js - BrandFunnel
// Funcionalidades principales
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    console.log('🚀 BrandFunnel iniciado');
    
    // ===== MOBILE MENU TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Cambiar ícono entre hamburguesa y X
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // ===== FAQ ACCORDION =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
            
            // Cerrar otros (opcional - descomentar si quieres solo uno abierto)
            // faqQuestions.forEach(q => {
            //     if (q !== question && q.parentElement.classList.contains('active')) {
            //         q.parentElement.classList.remove('active');
            //     }
            // });
        });
    });
    
    // ===== SCROLL SUAVE PARA ENLACES INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== NAVBAR ACTIVO POR SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function setActiveLink() {
        let current = '';
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Ejecutar al inicio
    
    // ===== VERIFICAR QUE LAS IMÁGENES CARGUEN =====
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('🖼️ Imagen no cargada:', this.src);
            // Opcional: poner imagen por defecto
            // this.src = 'assets/img/placeholder.png';
        });
    });
    
    // ===== HEADER TRANSPARENTE AL SCROLL =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.background = 'rgba(5, 7, 12, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll hacia abajo - ocultar navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba - mostrar navbar
            navbar.style.transform = 'translateY(0)';
            navbar.style.background = 'rgba(5, 7, 12, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== ANIMACIONES AL SCROLL (opcional) =====
    const animateElements = document.querySelectorAll('.servicio-card, .proceso-item, .testimonio-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
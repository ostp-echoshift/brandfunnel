// ==============================================
// utils.js - BrandFunnel
// Funciones utilitarias y helpers
// ==============================================

const BrandFunnelUtils = {
    
    // ===== FORMATEAR NÚMERO DE TELÉFONO =====
    formatPhone: (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 10) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
        }
        return phone;
    },
    
    // ===== VALIDAR EMAIL =====
    isValidEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // ===== VALIDAR TELÉFONO =====
    isValidPhone: (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length === 10;
    },
    
    // ===== SANITIZAR INPUT (evitar XSS) =====
    sanitize: (input) => {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },
    
    // ===== OBTENER PARÁMETROS DE URL =====
    getUrlParams: () => {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    },
    
    // ===== GUARDAR EN LOCALSTORAGE =====
    saveToStorage: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error guardando en localStorage:', e);
            return false;
        }
    },
    
    // ===== LEER DE LOCALSTORAGE =====
    getFromStorage: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error leyendo de localStorage:', e);
            return null;
        }
    },
    
    // ===== COPIAR AL PORTAPAPELES =====
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (e) {
            console.error('Error copiando al portapapeles:', e);
            return false;
        }
    },
    
    // ===== DETECTAR DISPOSITIVO MÓVIL =====
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // ===== SCROLL A ELEMENTO CON OFFSET =====
    scrollToElement: (elementId, offset = 0) => {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    },
    
    // ===== DEBOUNCE (para eventos de scroll/resize) =====
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// ===== EXPORTAR PARA USO GLOBAL =====
window.BrandFunnelUtils = BrandFunnelUtils;

console.log('🛠️ Utils.js cargado');
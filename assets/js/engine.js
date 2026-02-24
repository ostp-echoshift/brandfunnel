/**
 * MOTOR OSTP v1.0 - BrandFunnel
 * Implementa: Sequential Logic, Widget-Based Flow, 
 * Contextual Personalization, Closed-Loop Analytics
 */

const OSTP_Engine = {
    // ===== CONFIGURACIÓN =====
    config: {
        steps: [
            { id: 'hero', widget: 'hero-block', trigger: 'initial' },
            { id: 'valor', widget: 'value-block', trigger: 'scroll_30' },
            { id: 'social', widget: 'social-proof', trigger: 'scroll_50' },
            { id: 'conversion', widget: 'cta-block', trigger: 'scroll_70' }
        ],
        currentStep: 0,
        analytics: []
    },

    // ===== INICIALIZACIÓN =====
    init: () => {
        console.log("🚀 OSTP Engine v1.0 iniciado");
        
        // Cargar primer bloque
        OSTP_Engine.loadStep(OSTP_Engine.config.currentStep);
        
        // Activar tracking
        OSTP_Engine.trackBehavior();
        OSTP_Engine.trackScroll();
        OSTP_Engine.trackClicks();
        
        // Permanencia: restaurar estado de sesión
        OSTP_Engine.restoreSession();
    },

    // ===== SEQUENTIAL LOGIC PROCESSING =====
    loadStep: (stepIndex) => {
        const step = OSTP_Engine.config.steps[stepIndex];
        if (!step) return;
        
        console.log(`📦 Cargando: ${step.id} (${step.widget})`);
        
        // Disparar evento personalizado
        const event = new CustomEvent('ostpStepLoaded', { 
            detail: { step: step.id, widget: step.widget }
        });
        document.dispatchEvent(event);
        
        // Actualizar UI según el paso
        document.body.setAttribute('data-ostp-step', step.id);
        
        // Registrar analytics
        OSTP_Engine.logAnalytics('step_loaded', step.id);
    },

    // ===== WIDGET-BASED FLOW =====
    loadWidget: (widgetName) => {
        // Aquí se cargarían dinámicamente los componentes
        // Ejemplo: fetch(`/components/widgets/${widgetName}.html`)
        console.log(`🔄 Widget dinámico: ${widgetName}`);
    },

    // ===== CLOSED-LOOP ANALYTICS =====
    trackBehavior: () => {
        // Tiempo en página
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            OSTP_Engine.logAnalytics('time_spent', timeSpent);
        });
    },

    trackScroll: () => {
        let maxScroll = 0;
        window.addEventListener('scroll', 
            OSTP_Engine.utils.debounce(() => {
                const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
                
                if (scrollPercent > maxScroll) {
                    maxScroll = scrollPercent;
                    
                    // Disparar steps según scroll
                    if (scrollPercent > 30 && OSTP_Engine.config.currentStep < 1) {
                        OSTP_Engine.config.currentStep = 1;
                        OSTP_Engine.loadStep(1);
                    }
                    if (scrollPercent > 50 && OSTP_Engine.config.currentStep < 2) {
                        OSTP_Engine.config.currentStep = 2;
                        OSTP_Engine.loadStep(2);
                    }
                    if (scrollPercent > 70 && OSTP_Engine.config.currentStep < 3) {
                        OSTP_Engine.config.currentStep = 3;
                        OSTP_Engine.loadStep(3);
                    }
                    
                    OSTP_Engine.logAnalytics('scroll_depth', scrollPercent);
                }
            }, 100)
        );
    },

    trackClicks: () => {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button');
            if (target) {
                OSTP_Engine.logAnalytics('click', {
                    element: target.tagName,
                    text: target.innerText?.substring(0, 50),
                    href: target.href || null
                });
            }
        });
    },

    // ===== CONTEXTUAL PERSONALIZATION =====
    getContext: () => {
        return {
            device: window.innerWidth < 768 ? 'mobile' : 'desktop',
            time: new Date().getHours(),
            referrer: document.referrer || 'direct',
            scrollDepth: Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100) || 0
        };
    },

    // ===== PERMANENCIA (Session Restore) =====
    saveSession: () => {
        const session = {
            step: OSTP_Engine.config.currentStep,
            scroll: window.scrollY,
            timestamp: Date.now()
        };
        sessionStorage.setItem('ostp_session', JSON.stringify(session));
    },

    restoreSession: () => {
        try {
            const session = JSON.parse(sessionStorage.getItem('ostp_session'));
            if (session && (Date.now() - session.timestamp) < 3600000) { // 1 hora
                window.scrollTo(0, session.scroll);
                OSTP_Engine.config.currentStep = session.step;
                console.log('🔄 Sesión restaurada');
            }
        } catch (e) {
            console.log('ℹ️ Nueva sesión');
        }
        
        // Guardar cada 5 segundos
        setInterval(OSTP_Engine.saveSession, 5000);
    },

    // ===== ANALYTICS LOGGER =====
    logAnalytics: (action, data) => {
        const entry = {
            action,
            data,
            context: OSTP_Engine.getContext(),
            timestamp: new Date().toISOString()
        };
        
        OSTP_Engine.config.analytics.push(entry);
        console.log('📊 OSTP Analytics:', entry);
        
        // Aquí se enviaría a backend
        // fetch('/api/track', { method: 'POST', body: JSON.stringify(entry) })
    },

    // ===== UTILIDADES =====
    utils: {
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
    }
};

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que no haya conflicto con main.js
    if (typeof OSTP_Engine !== 'undefined') {
        OSTP_Engine.init();
    }
});

// Guardar sesión al salir
window.addEventListener('beforeunload', () => {
    OSTP_Engine.saveSession();
});

console.log('⚙️ Engine.js (OSTP Core) cargado');
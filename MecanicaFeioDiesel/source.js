document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const siteHeader = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu-principal');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const menuLinks = Array.from(document.querySelectorAll('.menu-principal a'));
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const interactiveButtons = document.querySelectorAll('.btn, .btn-submit, .menu-toggle, .whatsapp-float');
    const form = document.getElementById('contato-form');
    const telefoneInput = document.getElementById('telefone');
    const anoAtual = document.getElementById('ano-atual');
    const revealItems = document.querySelectorAll('.reveal');
    const submitButton = form ? form.querySelector('.btn-submit') : null;
    let activeSectionId = '';

    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    const setActiveLink = (sectionId) => {
        if (!sectionId || activeSectionId === sectionId) {
            return;
        }

        activeSectionId = sectionId;
        menuLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('is-active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const syncScrollState = () => {
        const scrollY = window.scrollY;

        if (siteHeader) {
            siteHeader.classList.toggle('is-scrolled', scrollY > 18);
        }

        if (hero) {
            const heroOffset = Math.min(scrollY * 0.12, 36);
            hero.style.setProperty('--hero-shift', `${heroOffset}px`);
        }
    };

    if (menuToggle && menu) {
        const setMenuState = (open) => {
            menu.classList.toggle('is-open', open);
            menuToggle.setAttribute('aria-expanded', String(open));
            menu.setAttribute('aria-hidden', String(!open));
            menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            body.classList.toggle('menu-open', open);

            if (menuBackdrop) {
                menuBackdrop.hidden = !open;
            }
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            setMenuState(!isOpen);
        });

        menuLinks.forEach((link) => {
            link.addEventListener('click', () => {
                setMenuState(false);
            });
        });

        if (menuBackdrop) {
            menuBackdrop.addEventListener('click', () => {
                setMenuState(false);
            });
        }

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setMenuState(false);
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 820) {
                setMenuState(false);
            }
        });
    }

    revealItems.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${Math.min(index * 55, 260)}ms`);
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    if ('IntersectionObserver' in window && sections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibleEntries[0]) {
                setActiveLink(visibleEntries[0].target.id);
            }
        }, {
            rootMargin: '-35% 0px -45% 0px',
            threshold: [0.2, 0.45, 0.7]
        });

        sections.forEach((section) => sectionObserver.observe(section));
    } else if (sections[0]) {
        setActiveLink(sections[0].id);
    }

    interactiveButtons.forEach((button) => {
        button.addEventListener('pointermove', (event) => {
            const rect = button.getBoundingClientRect();
            button.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
            button.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
        });
    });

    if (telefoneInput) {
        telefoneInput.addEventListener('input', (event) => {
            const numbers = event.target.value.replace(/\D/g, '').slice(0, 11);
            const parts = numbers.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

            if (!parts) {
                event.target.value = '';
                return;
            }

            const ddd = parts[1] ? `(${parts[1]}` : '';
            const prefix = parts[2] ? `) ${parts[2]}` : '';
            const suffix = parts[3] ? `-${parts[3]}` : '';

            event.target.value = `${ddd}${prefix}${suffix}`.trim();
        });
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = form.nome.value.trim();
            const telefone = form.telefone.value.trim();
            const motivo = form.motivo_contato.value.trim();
            const mensagem = form.mensagem.value.trim();

            if (nome.length < 3) {
                alert('Informe um nome mais completo para o atendimento.');
                form.nome.focus();
                return;
            }

            if (telefone.replace(/\D/g, '').length < 10) {
                alert('Preencha um telefone valido para retorno da equipe.');
                form.telefone.focus();
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Abrindo WhatsApp...';
            }

            const texto = [
                'Ola, equipe Feio Diesel.',
                `Nome/empresa: ${nome}`,
                `Telefone: ${telefone}`,
                `Area de interesse: ${motivo}`,
                `Detalhes: ${mensagem || 'Nao informado.'}`
            ].join('\n');

            const url = `https://wa.me/5518999999999?text=${encodeURIComponent(texto)}`;
            window.open(url, '_blank', 'noopener');
            form.reset();

            if (submitButton) {
                submitButton.textContent = 'Mensagem pronta no WhatsApp';
                submitButton.classList.add('is-success');

                window.setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Enviar pelo WhatsApp';
                    submitButton.classList.remove('is-success');
                }, 1800);
            }
        });
    }

    syncScrollState();
    window.addEventListener('scroll', syncScrollState, { passive: true });
});

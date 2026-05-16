document.addEventListener('DOMContentLoaded', () => {
    const WHATSAPP_NUMBER = '5518999999999';
    const body = document.body;
    const header = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu-principal');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const menuLinks = Array.from(document.querySelectorAll('.menu-principal a'));
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const revealItems = Array.from(document.querySelectorAll('.reveal'));
    const whatsappFloat = document.querySelector('.whatsapp-float');
    const year = document.getElementById('ano-atual');
    const form = document.getElementById('contato-form');
    const phoneInput = document.getElementById('telefone');
    const submitButton = form ? form.querySelector('.btn-submit') : null;
    let activeSectionId = '';

    const brandData = {
        scania: {
            label: 'Scania',
            cockpitCopy: 'Motor, potência, vazamentos e preventiva para operação pesada.',
            priority: 82,
            stopLabel: 'Baixo',
            stopValue: 42,
            system: 'Motor',
            systemValue: 88,
            kicker: 'Caminhões Scania',
            title: 'Força para estrada e carga pesada',
            description: 'Atendimento para perda de potência, vazamentos, arrefecimento, injeção e preventiva de operação intensa.',
            lineSystem: 'Motor',
            lineResponse: 'Alta',
            lineRoutine: 'Preventiva'
        },
        volvo: {
            label: 'Volvo',
            cockpitCopy: 'Confiabilidade, temperatura, sensores e disponibilidade para rotina intensa.',
            priority: 76,
            stopLabel: 'Medio',
            stopValue: 58,
            system: 'Arrefecimento',
            systemValue: 74,
            kicker: 'Caminhoes Volvo',
            title: 'Precisão para alta disponibilidade',
            description: 'Triagem para superaquecimento, consumo, sensores, sistema auxiliar e manutenção de frota.',
            lineSystem: 'Sensores',
            lineResponse: 'Rápida',
            lineRoutine: 'Frota'
        },
        mwm: {
            label: 'MWM',
            cockpitCopy: 'Montagem, retífica, alimentação e aplicação correta de peças.',
            priority: 68,
            stopLabel: 'Controle',
            stopValue: 48,
            system: 'Retifica',
            systemValue: 66,
            kicker: 'Motores MWM',
            title: 'Motor tratado com critério',
            description: 'Serviço voltado para vedação, lubrificação, alimentação, montagem técnica e reposição correta.',
            lineSystem: 'Conjunto',
            lineResponse: 'Técnica',
            lineRoutine: 'Montagem'
        }
    };

    const serviceData = {
        diagnostico: {
            code: 'Sistema 01',
            title: 'Diagnóstico diesel',
            copy: 'Análise de sintomas, histórico, comportamento do motor e risco de continuar rodando.',
            items: ['Falhas mecânicas e elétricas', 'Consumo, potência e partida', 'Plano de reparo antes da troca de peças']
        },
        motor: {
            code: 'Sistema 02',
            title: 'Motor e retífica',
            copy: 'Desmontagem, medição, retífica, montagem e conferência para motores diesel pesados.',
            items: ['Pistões, anéis e bronzinas', 'Juntas, vedadores e torque', 'Teste final do conjunto']
        },
        injecao: {
            code: 'Sistema 03',
            title: 'Injeção e alimentação',
            copy: 'Correção de falhas que afetam consumo, fumaça, partida, resposta e potência.',
            items: ['Bicos, bomba e pressão', 'Filtro, linha e entrada de ar', 'Sensores e comportamento do motor']
        },
        arrefecimento: {
            code: 'Sistema 04',
            title: 'Arrefecimento',
            copy: 'Investigação de aquecimento, vazamentos e circulação para evitar dano maior no motor.',
            items: ["Radiador, mangueiras e bomba d'água", 'Pressurização e vazamentos', 'Óleo, junta e temperatura']
        }
    };

    const partData = {
        motor: {
            kicker: 'Kits e montagem',
            title: 'Motor',
            copy: 'Pistões, anéis, bronzinas, juntas, vedadores e itens de montagem conforme aplicação.',
            tags: ['Kits', 'Juntas', 'Bronzinas', 'Vedacao']
        },
        injecao: {
            kicker: 'Alimentacao',
            title: 'Injeção',
            copy: 'Bicos, bomba, filtros, linha de combustível e componentes que influenciam consumo e potência.',
            tags: ['Bicos', 'Bomba', 'Filtros', 'Pressao']
        },
        arrefecimento: {
            kicker: 'Temperatura',
            title: 'Arrefecimento',
            copy: "Bomba d'água, radiador, mangueiras, válvulas e itens que seguram a temperatura do conjunto.",
            tags: ['Radiador', "Bomba d'água", 'Mangueiras', 'Válvulas']
        },
        revisao: {
            kicker: 'Preventiva',
            title: 'Revisão',
            copy: 'Filtros, lubrificantes, correias, sensores e itens de desgaste para reduzir parada inesperada.',
            tags: ['Filtros', 'Oleo', 'Correias', 'Sensores']
        }
    };

    const processData = {
        triagem: {
            kicker: 'Etapa 01',
            title: 'Triagem',
            copy: 'Coleta de marca, modelo, sintomas, condição do veículo e urgência para montar o primeiro caminho técnico.'
        },
        avaliacao: {
            kicker: 'Etapa 02',
            title: 'Avaliação',
            copy: 'Conferência do conjunto, leitura dos sinais de falha e separação entre causa provável e sintoma aparente.'
        },
        execucao: {
            kicker: 'Etapa 03',
            title: 'Execução',
            copy: 'Reparo, montagem, troca ou ajuste seguindo a prioridade definida no diagnóstico.'
        },
        entrega: {
            kicker: 'Etapa 04',
            title: 'Entrega',
            copy: 'Teste, orientação final e recomendações para evitar reincidência da falha.'
        }
    };

    const triageState = {
        brand: 'Scania',
        condition: 'rodando',
        conditionScore: 8,
        symptoms: new Map()
    };

    const setText = (selector, text) => {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = text;
        }
    };

    const setBar = (selector, value) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.setProperty('--bar-value', `${value}%`);
            element.style.width = `${value}%`;
        }
    };

    const renderList = (selector, items) => {
        const element = document.querySelector(selector);
        if (!element) {
            return;
        }
        element.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
    };

    const renderTags = (selector, tags) => {
        const element = document.querySelector(selector);
        if (!element) {
            return;
        }
        element.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join('');
    };

    const buildWhatsAppUrl = (message) => {
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    };

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const setMenuState = (open) => {
        if (!menuToggle || !menu) {
            return;
        }

        const desktop = window.innerWidth > 900;
        menu.classList.toggle('is-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        menu.setAttribute('aria-hidden', String(!open && !desktop));
        body.classList.toggle('menu-open', open && !desktop);

        if (menuBackdrop) {
            menuBackdrop.hidden = !open || desktop;
        }
    };

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            const open = menuToggle.getAttribute('aria-expanded') !== 'true';
            setMenuState(open);
        });

        menuLinks.forEach((link) => {
            link.addEventListener('click', () => setMenuState(false));
        });

        if (menuBackdrop) {
            menuBackdrop.addEventListener('click', () => setMenuState(false));
        }

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setMenuState(false);
            }
        });

        window.addEventListener('resize', () => setMenuState(false));
        setMenuState(false);
    }

    const setActiveLink = (sectionId) => {
        if (!sectionId || activeSectionId === sectionId) {
            return;
        }

        activeSectionId = sectionId;
        menuLinks.forEach((link) => {
            const active = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('is-active', active);

            if (active) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const syncScroll = () => {
        const scrollTop = window.scrollY;
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        document.documentElement.style.setProperty('--scroll-progress', `${(scrollTop / maxScroll) * 100}%`);

        if (header) {
            header.classList.toggle('is-scrolled', scrollTop > 18);
        }

        if (hero) {
            hero.style.setProperty('--hero-shift', `${Math.min(scrollTop * 0.08, 32)}px`);
        }

        if (whatsappFloat) {
            whatsappFloat.classList.toggle('is-visible', scrollTop > 360);
        }
    };

    revealItems.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${Math.min(index * 40, 220)}ms`);
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.16 });

        revealItems.forEach((item) => revealObserver.observe(item));

        const sectionObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visible[0]) {
                setActiveLink(visible[0].target.id);
            }
        }, {
            rootMargin: '-34% 0px -48% 0px',
            threshold: [0.18, 0.4, 0.7]
        });

        sections.forEach((section) => sectionObserver.observe(section));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
        if (sections[0]) {
            setActiveLink(sections[0].id);
        }
    }

    const selectBrand = (brandKey) => {
        const data = brandData[brandKey];
        if (!data) {
            return;
        }

        document.querySelectorAll('[data-brand]').forEach((button) => {
            const active = button.dataset.brand === brandKey;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-selected', String(active));
        });

        setText('#cockpit-brand', data.label);
        setText('#cockpit-copy', data.cockpitCopy);
        setText('#gauge-priority', `${data.priority}%`);
        setText('#gauge-stop', data.stopLabel);
        setText('#gauge-system', data.system);
        setBar('#bar-priority', data.priority);
        setBar('#bar-stop', data.stopValue);
        setBar('#bar-system', data.systemValue);

        setText('#line-kicker', data.kicker);
        setText('#line-title', data.title);
        setText('#line-description', data.description);
        setText('#line-system', data.lineSystem);
        setText('#line-response', data.lineResponse);
        setText('#line-routine', data.lineRoutine);

        triageState.brand = data.label;
        document.querySelectorAll('[data-group="brand"] .choice').forEach((button) => {
            button.classList.toggle('is-active', button.dataset.value === data.label);
        });
        updateTriage();
    };

    document.querySelectorAll('[data-brand]').forEach((button) => {
        button.addEventListener('click', () => selectBrand(button.dataset.brand));
    });

    document.querySelectorAll('.choice').forEach((button) => {
        button.addEventListener('click', () => {
            const group = button.closest('[data-group]');
            if (!group) {
                return;
            }

            group.querySelectorAll('.choice').forEach((item) => item.classList.remove('is-active'));
            button.classList.add('is-active');

            if (group.dataset.group === 'brand') {
                const key = button.dataset.value.toLowerCase();
                selectBrand(key);
            }

            if (group.dataset.group === 'condition') {
                triageState.condition = button.dataset.value;
                triageState.conditionScore = Number(button.dataset.score || 0);
                updateTriage();
            }
        });
    });

    document.querySelectorAll('.symptom-choice').forEach((button) => {
        button.addEventListener('click', () => {
            const symptom = button.dataset.symptom;
            const score = Number(button.dataset.score || 0);
            const active = !button.classList.contains('is-active');
            button.classList.toggle('is-active', active);

            if (active) {
                triageState.symptoms.set(symptom, score);
            } else {
                triageState.symptoms.delete(symptom);
            }

            updateTriage();
        });
    });

    function updateTriage() {
        const symptomScore = Array.from(triageState.symptoms.values()).reduce((total, value) => total + value, 0);
        const score = Math.min(100, 15 + triageState.conditionScore + symptomScore);
        const symptoms = Array.from(triageState.symptoms.keys());
        let label = 'Baixa';

        if (score >= 74) {
            label = 'Urgente';
        } else if (score >= 56) {
            label = 'Alta';
        } else if (score >= 34) {
            label = 'Moderada';
        }

        const symptomText = symptoms.length > 0 ? symptoms.join(', ') : 'aguardando seleção';
        const message = `Tenho um veículo ${triageState.brand}, ele está ${triageState.condition}. Sintomas: ${symptomText}. Prioridade estimada: ${label}.`;

        setText('#priority-label', label);
        setBar('#priority-fill', score);
        setText('#triage-message', message);

        const link = document.getElementById('triage-whatsapp');
        if (link) {
            link.href = buildWhatsAppUrl(`Olá, equipe Feio Diesel.\n${message}`);
        }
    }

    const copyButton = document.getElementById('copy-triage');
    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            const text = document.getElementById('triage-message')?.textContent || '';

            try {
                await navigator.clipboard.writeText(text);
                copyButton.textContent = 'Resumo copiado';
            } catch {
                copyButton.textContent = 'Copie no painel';
            }

            window.setTimeout(() => {
                copyButton.textContent = 'Copiar resumo';
            }, 1600);
        });
    }

    const selectService = (key) => {
        const data = serviceData[key];
        if (!data) {
            return;
        }

        document.querySelectorAll('.service-item').forEach((button) => {
            button.classList.toggle('is-active', button.dataset.service === key);
        });

        setText('#service-code', data.code);
        setText('#service-title', data.title);
        setText('#service-copy', data.copy);
        renderList('#service-list', data.items);
    };

    document.querySelectorAll('.service-item').forEach((button) => {
        button.addEventListener('click', () => selectService(button.dataset.service));
    });

    const selectPart = (key) => {
        const data = partData[key];
        if (!data) {
            return;
        }

        document.querySelectorAll('.part-node').forEach((button) => {
            button.classList.toggle('is-active', button.dataset.part === key);
        });

        setText('#part-kicker', data.kicker);
        setText('#part-title', data.title);
        setText('#part-copy', data.copy);
        renderTags('#part-tags', data.tags);
    };

    document.querySelectorAll('.part-node').forEach((button) => {
        button.addEventListener('click', () => selectPart(button.dataset.part));
    });

    const selectProcessStep = (key) => {
        const data = processData[key];
        if (!data) {
            return;
        }

        document.querySelectorAll('.process-step').forEach((button) => {
            button.classList.toggle('is-active', button.dataset.step === key);
        });

        setText('#process-kicker', data.kicker);
        setText('#process-title', data.title);
        setText('#process-copy', data.copy);
    };

    document.querySelectorAll('.process-step').forEach((button) => {
        button.addEventListener('click', () => selectProcessStep(button.dataset.step));
    });

    if (phoneInput) {
        phoneInput.addEventListener('input', (event) => {
            const numbers = event.target.value.replace(/\D/g, '').slice(0, 11);
            const area = numbers.slice(0, 2);
            const first = numbers.length > 10 ? numbers.slice(2, 7) : numbers.slice(2, 6);
            const second = numbers.length > 10 ? numbers.slice(7, 11) : numbers.slice(6, 10);
            let value = area ? `(${area}` : '';

            if (area.length === 2) {
                value += ')';
            }

            if (first) {
                value += ` ${first}`;
            }

            if (second) {
                value += `-${second}`;
            }

            event.target.value = value.trim();
        });
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = form.nome.value.trim();
            const phone = form.telefone.value.trim();
            const line = form.linha.value.trim();
            const message = form.mensagem.value.trim();

            if (name.length < 3) {
                alert('Informe um nome mais completo para o atendimento.');
                form.nome.focus();
                return;
            }

            if (phone.replace(/\D/g, '').length < 10) {
                alert('Preencha um telefone válido para retorno da equipe.');
                form.telefone.focus();
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Abrindo WhatsApp...';
            }

            const text = [
                'Olá, equipe Feio Diesel.',
                `Nome/empresa: ${name}`,
                `Telefone: ${phone}`,
                `Linha: ${line}`,
                `Detalhes: ${message || 'Não informado.'}`
            ].join('\n');

            window.open(buildWhatsAppUrl(text), '_blank', 'noopener');
            form.reset();

            if (submitButton) {
                submitButton.textContent = 'Mensagem pronta';
                submitButton.classList.add('is-success');

                window.setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Abrir WhatsApp';
                    submitButton.classList.remove('is-success');
                }, 1800);
            }
        });
    }

    selectBrand('scania');
    selectService('diagnostico');
    selectPart('motor');
    selectProcessStep('triagem');
    updateTriage();
    syncScroll();
    window.addEventListener('scroll', syncScroll, { passive: true });
});


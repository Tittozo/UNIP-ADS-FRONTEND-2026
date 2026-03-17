// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. SCROLL REVEAL (Animação ao rolar a página)
       Faz os cards e seções aparecerem suavemente ao rolar
    ============================================================ */
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Seleciona elementos para animar
    const targets = document.querySelectorAll('.card, .item-diferencial, #vendas article');
    targets.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });


    /* ============================================================
       2. VALIDAÇÃO DO FORMULÁRIO DE AGENDAMENTO
       Evita envios vazios e melhora a experiência do usuário
    ============================================================ */
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão para simular a validação

        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const motivo = document.getElementById('motivo_contato').value;

        if (nome.length < 3) {
            alert("Por favor, digite seu nome completo.");
            return;
        }

        // Simulação de sucesso (Aqui você integraria com sua API ou WhatsApp)
        const botao = form.querySelector('button');
        const textoOriginal = botao.innerText;
        
        botao.innerText = "ENVIANDO...";
        botao.style.backgroundColor = "#25D366"; // Muda para verde sucesso

        setTimeout(() => {
            alert(`Obrigado, ${nome}! Recebemos seu interesse em "${motivo}". Entraremos em contato no número ${telefone} em breve.`);
            form.reset();
            botao.innerText = textoOriginal;
            botao.style.backgroundColor = ""; 
        }, 1500);
    });


    /* ============================================================
       3. MÁSCARA DE TELEFONE AUTOMÁTICA
       Formata o campo (18) 99999-9999 enquanto o usuário digita
    ============================================================ */
    const inputTelefone = document.getElementById('telefone');

    inputTelefone.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });


    /* ============================================================
       4. NAVBAR DINÂMICA
       Muda a opacidade do menu ao rolar para não atrapalhar a visão
    ============================================================ */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = "10px 5%";
            navbar.style.backgroundColor = "rgba(5, 5, 5, 0.98)";
        } else {
            navbar.style.padding = "15px 5%";
            navbar.style.backgroundColor = "rgba(5, 5, 5, 0.95)";
        }
    });

});

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Rolagem suave para os links de navegação
    const linksInternos = document.querySelectorAll('nav ul li a[href^="#"]');

    linksInternos.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link
            
            const id = this.getAttribute('href');
            const sessao = document.querySelector(id);
            
            if (sessao) {
                // Calcula a altura do header para a rolagem não esconder o título da seção
                const headerHeight = document.querySelector('header').offsetHeight;
                const topo = sessao.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: topo,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Efeito visual no Header ao rolar a página (Sticky Header)
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Adiciona um fundo semi-transparente e borda neon quando rola a página
            header.style.position = "sticky";
            header.style.top = "0";
            header.style.backgroundColor = "rgba(18, 18, 18, 0.95)"; 
            header.style.borderBottom = "2px solid var(--neon-primario)";
            header.style.zIndex = "1000";
            header.style.transition = "all 0.3s ease";
        } else {
            // Retorna ao estado original no topo da página
            header.style.position = "static";
            header.style.borderBottom = "none";
            header.style.backgroundColor = "transparent";
        }
    });

    // 3. Efeito de brilho (Glow) dinâmico no botão do Instagram
    const btnInstagram = document.querySelector('.btn-instagram');
    
    if (btnInstagram) {
        btnInstagram.addEventListener('mouseenter', () => {
            btnInstagram.style.boxShadow = "0 0 20px var(--neon-primario)";
            btnInstagram.style.transition = "box-shadow 0.3s ease";
        });
        
        btnInstagram.addEventListener('mouseleave', () => {
            btnInstagram.style.boxShadow = "none";
        });
    }
});

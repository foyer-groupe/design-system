(function(){
    let collapsablePanels = document.querySelectorAll('.Panel.is-collapsable'),
        i = 1;

    collapsablePanels.forEach(function(panel){
        const header = panel.querySelector('.Panel-header'),
            panelContent = panel.querySelector('.Panel-collapse');

        if(panelContent) {
            panelContent.setAttribute('id', 'panel-content-' + i);
            panelContent.setAttribute('tabindex', '-1');
        }

        if(header) {
            header.setAttribute('aria-expanded', 'false');
            header.setAttribute('aria-controls', 'panel-content-' + i);

            header.addEventListener('click', function(){
                const parent = this.parentNode,
                    panelC = parent.querySelector('.Panel-collapse');

                if ( parent.classList.contains('is-opened') ) {
                    this.setAttribute('aria-expanded', 'false');
                    parent.classList.remove('is-opened');
                    if(panelC) panelC.setAttribute('tabindex', '-1');
                    this.focus();
                } else {
                    this.setAttribute('aria-expanded', 'true');
                    parent.classList.add('is-opened');
                    if(panelC) {
                        panelC.setAttribute('tabindex', '0');
                        panelC.focus();
                    }
                }

            });
        }
        i++;
    });
})();
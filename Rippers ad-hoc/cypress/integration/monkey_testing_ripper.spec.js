describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
    })
})
function randomClick(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            setTimeout(randomClick, 1000, monkeysLeft);
        });
    }   
}

function randomEvent(monkeysLeft){
    
    function getRandomEvent() {
        event = ['click', 'input', 'select', 'click_btn']; 
        index = Math.floor(Math.random() * event.length);
        return event[index];  
    };

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    function getRandomText() {
        var len = getRandomInt(0,12);
        var str = '';
        var ref = 'abcdefghijklmnñopqrstuvwxyz';
        for (var i=0; i<len; i++){
            str += ref.charAt(Math.floor(Math.random()*ref.length));
        }

        return str; 
    }

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        var event = getRandomEvent(); 

        if(event=='click'){
            cy.get('a').then($links => {
                var randomLink = $links.get(getRandomInt(0, $links.length));
                if(!Cypress.dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({force: true});
                }
            })
        }

        if(event=='input'){
            cy.get('input').then($inputs => {
                var random = $inputs.get(getRandomInt(0, $inputs.length));
                if(!Cypress.dom.isHidden(random)) {
                    text = getRandomText()
                    cy.wrap(random).click({force: true}).type(text,{force: true});
                }
            })
        }

        if(event=='select'){
            cy.get('select').then($selects => {
                var random = $inputs.get(getRandomInt(0, $selects.length));
                if(!Cypress.dom.isHidden(random)) {
                    var randoSelect = getRandomInt(0,cy.wrap(random).find('option').length)
                    cy.wrap(random).find('option').eq(randoSelect).then($option => cy.wrap(random).select($option.value)) 
                }
            })
        }

        if(event=='click_btn'){
            cy.get('button').then($buttons => {
                var random = $inputs.get(getRandomInt(0, $buttons.length));
                if(!Cypress.dom.isHidden(random)) {
                    cy.wrap(random).click({force: true});
                }
            })
        }

        setTimeout(randomEvent, 1000, monkeysLeft);

    }
}
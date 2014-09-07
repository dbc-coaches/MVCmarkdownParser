function ParsomaticController(view, model){
    this.view = new view(this);
    this.model = new model(this);
    this.view.listenToTextArea();
}

ParsomaticController.prototype = {
    receiveTextForParsing: function(text){
        this.model.parseMyShit(text);
    },
    receiveParsedText: function(parsedTxt){
        this.view.renderParsedText(parsedTxt);
    }
}

function ParsomaticView(delegate){
    this.delegate = delegate;
}

ParsomaticView.prototype = {
    listenToTextArea: function(){
        var txtArea = document.getElementsByTagName('textarea')[0];
        txtArea.addEventListener('keyup', function(){
            this.delegate.receiveTextForParsing(txtArea.value)
        }.bind(this))
    },
    renderParsedText: function(text){
        var preview = document.getElementsByClassName('preview')[0];
        preview.innerHTML = text;
    }
}

function ParsomaticModel(delegate){
    this.delegate = delegate;
}

ParsomaticModel.prototype = {
    parseMyShit: function(text){
        var parsedShit = marked(text);
        this.delegate.receiveParsedText(parsedShit);
    }
}



window.addEventListener('load', function(){
    new ParsomaticController(ParsomaticView, ParsomaticModel);
})
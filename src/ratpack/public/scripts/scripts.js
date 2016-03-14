var composer;

$("#myWizard").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    autoFocus: true,

    onStepChanging: function (event, currentIndex, newIndex) {
        if (currentIndex === 0) {

            var sideSize = +$("#gridSizeInput").val() || 15;
            composer = new FillwordComposer({sideSize:sideSize});

        }

        if (currentIndex === 1) {
            var words = $("#wordsInput").val().split(/[\s,]+/);
            composer.addWords(words);
            composer.fillGrid();
            composer.decorate(document.getElementById("myTable"));
        }
        return true;
    }
});
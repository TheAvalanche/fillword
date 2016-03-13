"use strict"

function FillwordComposer(options) {
    this.options = $.extend({}, FillwordComposer.DEFAULTS, options);
    this.grid = new Array(this.options.sideSize);
    for (let i = 0; i < this.grid.length; i++) {
        this.grid[i] = new Array(this.options.sideSize);
        for (let k = 0; k < this.grid[i].length; k++) {
            this.grid[i][k] = null;
        }
    }
}

FillwordComposer.DEFAULTS = {
    sideSize:15
};

FillwordComposer.prototype.fillGrid = function () {
    for (let i = 0; i < this.grid.length; i++) {
        for (let k = 0; k < this.grid[i].length; k++) {
            if (!this.grid[i][k]) {
                this.grid[i][k] = String.fromCharCode(65 + _.random(25));
            }
        }
    }
};

FillwordComposer.prototype.addWord = function (word) {
    var allowed = false;

    while (!allowed) {
        var length = word.length;
        var x = _.random(this.options.sideSize - length);
        var y = _.random(this.options.sideSize - length);
        var horizontal = Math.random()<.5;
        allowed = true;

        for (let i = 0; i < length; i++) {
            let value = this.getFromGrid(x, y, i, horizontal);
            if (value && value != word.charAt(i)) {
                allowed = false;
                break;
            }
        }
    }


    for (let i = 0; i < length; i++) {
        this.addToGrid(x, y, i, horizontal, word.charAt(i));
    }

};

FillwordComposer.prototype.addToGrid = function(x, y, offset, horizontal, char) {
    if (horizontal) {
        this.grid[x + offset][y] = char;
    } else {
        this.grid[x][y + offset] = char;
    }
};

FillwordComposer.prototype.getFromGrid = function(x, y, offset, horizontal) {
    if (horizontal) {
        return this.grid[x + offset][y];
    } else {
        return this.grid[x][y + offset];
    }
};

var composer = new FillwordComposer();
composer.addWord("HELLO");
composer.addWord("TABLE");
composer.addWord("PLANE");
composer.addWord("CUCUMBER");
composer.addWord("TOMATO");
composer.addWord("KEYBOARD");
composer.addWord("DRAFT");
composer.addWord("SETTINGS");
composer.fillGrid();

var table = document.getElementById("myTable");

for (var i = 0; i < composer.grid.length; i++) {
    var row = table.insertRow();
    for (var k = 0; k < composer.grid[i].length; k++) {
        var cell = row.insertCell();
        cell.innerHTML = composer.grid[i][k];
    }
}
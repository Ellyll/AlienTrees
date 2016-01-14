"use strict";

var app = (function() {

    function _init() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        _maximiseCanvas(canvas);

        var groundLevel = canvas.height - canvas.height/8;
        var treeSpacing = canvas.width / 10;
        var treeHeight = treeSpacing;

        drawGround(context, groundLevel, canvas.width);
        for (var i = 1; i < 10; i++) {
            var x = treeSpacing * i;
            drawTree(context, x, groundLevel, treeHeight);
        }

    }

    function drawGround(context, groundLevel, width) {
        drawLine(context, 0, groundLevel, width-1, groundLevel, 'white');
    }

    function drawTree(context, x, groundLevel, treeHeight) {
        var a = 3*(Math.PI*2)/4;
        var angle = Math.PI/2.25;
        var spacing = treeHeight / 10;
        var bubbleRadius = 5;

        drawLine(context, x, groundLevel, x, groundLevel-treeHeight, 'white');
        drawCircle(context, x, groundLevel-treeHeight, bubbleRadius, 'white');

        for (var i=1 ; i < 10 ; i++) {
            var branchLength = Math.random()*(spacing*(10-i)/2);
            var x1 = x;
            var y1 = groundLevel - spacing*i;
            var x2 = x1 + (branchLength*Math.cos(a+angle));
            var y2 = y1 + (branchLength*Math.sin(a+angle));
            var x2b = x1 + ((bubbleRadius+branchLength)*Math.cos(a+angle));
            var y2b = y1 + ((bubbleRadius+branchLength)*Math.sin(a+angle));

            var x3 = x1 + (branchLength*Math.cos(a-angle));
            var y3 = y1 + (branchLength*Math.sin(a-angle));
            var x3b = x1 + ((bubbleRadius+branchLength)*Math.cos(a-angle));
            var y3b = y1 + ((bubbleRadius+branchLength)*Math.sin(a-angle));


            drawLine(context, x1, y1, x2, y2, 'white');
            drawCircle(context, x2b, y2b, bubbleRadius, 'white');

            drawLine(context, x1, y1, x3, y3, 'white');
            drawCircle(context, x3b, y3b, bubbleRadius, 'white');
        }
    }

    function drawLine(context, x1, y1, x2, y2, strokeStyle) {
        context.beginPath();
        context.strokeStyle = strokeStyle;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }

    function drawCircle(context, x, y, radius, strokeStyle) {
        context.beginPath()
        context.strokeStyle = strokeStyle;
        context.arc(x, y, radius, 0, Math.PI*2);
        context.stroke();
    }


    function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function _maximiseCanvas(canvas) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }

    function _clearCanvas(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    return {
        init: _init
    };
})();

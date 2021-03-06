var weight   = document.getElementById('weight'),
    height   = document.getElementById('height'),
    imperial = document.getElementById('imperial'),
    metric   = document.getElementById('metric');

function changeToImperial(){
    imperial.classList.remove('btn-outline-secondary');
    imperial.classList.remove('btn-sm');
    imperial.classList.add('btn-outline-primary');
    metric.classList.add('btn-sm');
    metric.classList.add('btn-outline-secondary');
    weight.innerHTML = '<label for="inputWeight">Weight<span style="color: red;">*</span></label><input type="number" class="form-control" id="inputWeight" name="pound" placeholder="Weight(in Pounds)" required>';
    height.innerHTML = '<label for="inputHeight">Height<span style="color: red;">*</span></label><div class="form-row"><div class="form-group col-xs-6"><input type="number" class="form-control" id="inputHeight" name="feet" placeholder="feet" required></div><div class="form-group col-xs-6 inch"><input type="number" class="form-control" name="inch" placeholder="inches" required></div></div>'
}

function changeToMetric(){
    metric.classList.remove('btn-outline-secondary');
    metric.classList.remove('btn-sm');
    metric.classList.add('btn-outline-primary');
    imperial.classList.add('btn-sm');
    imperial.classList.add('btn-outline-secondary');
    weight.innerHTML = '<label for="inputWeight">Weight<span style="color: red;">*</span></label><input type="number" class="form-control" id="inputWeight" name="kg" placeholder="Weight(in Kgs)" required>'
    height.innerHTML = '<div class="form-group"><label for="inputHeight">Height<span style="color: red;">*</span></label><input type="number" class="form-control" id="inputHeight" name="cm" placeholder="Height(in cms)" required></div>'
}

imperial.addEventListener('click', changeToImperial);
metric.addEventListener('click', changeToMetric);

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.05em solid rgba(130,88,74, 0.5)}";
    document.body.appendChild(css);
};
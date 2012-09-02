$(function() {

platemath = {};

platemath.input = $('input[name=weight]');
platemath.output = $('div.output');
platemath.label = $('span.desired', platemath.output);
platemath.plate_section = $('div.bar div.plates', platemath.output);
platemath.error = $('div.error');

platemath.make_plate = function(amount) {
    if (amount == 'barbell') {
        return [$('<div class="barbell">45</div>'), $('<div class="barbell barbell_edge"></div>')];
    }
    if (amount == 'barbell_end') {
        return $('<div class="barbell barbell_end"></div>');
    }
    return $('<div class="plate plate_' + amount.toString().replace('.','_') + '">' + amount + '</div>');
}

platemath.add_plate = function(amount) {
    if(amount >= 90) {
        platemath.plate_section.append(platemath.make_plate(45));
        return platemath.add_plate(amount - 90);
    } else if(amount >= 50) {
        platemath.plate_section.append(platemath.make_plate(25));
        return platemath.add_plate(amount - 50);
    } else if(amount >= 20) {
        platemath.plate_section.append(platemath.make_plate(10));
        return platemath.add_plate(amount - 20);
    } else if(amount >= 10) {
        platemath.plate_section.append(platemath.make_plate(5));
        return platemath.add_plate(amount - 10);
    }  else if(amount >= 5) {
        platemath.plate_section.append(platemath.make_plate(2.5));
        return platemath.add_plate(amount - 5);
    }  else if(amount >= 2.5) {
        platemath.plate_section.append(platemath.make_plate(1.25));
        return platemath.add_plate(amount - 2.5);
    } else {
        platemath.plate_section.append(platemath.make_plate('barbell_end'));
        return 'done';
    }
};

platemath.do_plates = function(amount) {
    platemath.plate_section.empty();
    platemath.plate_section.append(platemath.make_plate('barbell'));
    // barbell is 45
    return platemath.add_plate(amount - 45);
};

platemath.handle_change = function() {
    var val = $(platemath.input).val();
    var intval = parseInt(val);

    var rem = intval / 2.5;
    var diff = rem - parseInt(rem);
    if(diff > 0) {
        if (diff >= 0.5) {
            intval = (parseInt(rem) + 1) * 2.5;
        } else {
            intval = (parseInt(rem) * 2.5);
        }
    }

    if(intval > 45) {
        platemath.do_plates(intval);
        platemath.label.text(intval);
        platemath.output.show();
        platemath.error.hide();

    } else {
        platemath.output.hide();
        platemath.error.show();
    }
};

platemath.wire = function() {
    $('div.output').hide();

    $(platemath.input).keyup(platemath.handle_change);
};

platemath.wire();

});
